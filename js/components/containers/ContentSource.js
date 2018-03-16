import React from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
	StyleSheet,
	UIManager
} from 'react-native';
import {
	View,
	Text,
	Image,
	Video,
	Touchable,
	Album
} from '../';
import styles from '@styles';

function parseStyle(string) {
	let [
		key,
		value
	] = string.split(':').map((part) => part.trim());
	return {
		[toCamel(key)]: value
	};
}

function toCamel(string) {
	return string.replace(/-(\w)/, (match, capture) => capture.toUpperCase());
}

class ContentSource extends React.Component {
	render() {
		return (
			<View onLayout={this.handleLayout}>
				{this.renderContent()}
			</View>
		);
	}

	componentWillUpdate() {
		this.images = [];
	}

	getChildContext() {
		return {
			parentWidth: this.state.width
		};
	}

	renderContent() {
		let array = [];

		try {
			array = JSON.parse(this.props.data);
		} catch (error) {
			console.error(`\`ContentSource\` format error: ${this.props.data}`);
		}

		return this.renderElements(array);
	}

	renderElements = (array) => {
		return array.map((item, index) => {
			for (typeName in this.types) {
				if (this.isType(item, typeName)) {
					return this.types[typeName](item[typeName], index, item);
				}
			}
		});
	};

	isType = (object, typeName) => {
		return object.hasOwnProperty(typeName);
	};

	handleLayout = (e) => {
		this.setState({
			width: e.nativeEvent.layout.width
		});
	};

	handlePressImage = (image) => (e) => {
		UIManager.measureInWindow(ReactNative.findNodeHandle(image.ref), (x, y, width, height) => {
			Album.open({
				images: this.images.map((image) => image.uri),
				index: this.images.indexOf(image),
				x,
				y,
				width,
				height
			});
		});
	};

	setImageRef = (image) => (element) => {
		image.ref = element;
	};

	state = {
		width: 0
	};

	types = {
		'text': (value, index, object) => {
			const style = [
				s.item,
				s.text
			];

			if (object.hasOwnProperty('style')) {
				style.push(parseStyle(object.style));
			}

			return <Text key={index} style={style}>{value}</Text>;
		},

		'image': (value, index) => {
			const image = {
				uri: value
			};
			this.images.push(image);
			const maxWidth = styles.screenWidth - styles.padding * 2;
			return (
				<Touchable key={index} type="withoutFeedback" onPress={this.handlePressImage(image)}>
					<Image
						source={{uri: value}}
						maxWidth={maxWidth}
						ref={this.setImageRef(image)}
						style={[s.item, s.image]}
					/>
				</Touchable>
			);
		},

		'video': (value, index) => {
			return <Video key={index} uri={value.url} poster={value.thumbnailImage} style={s.item} />;
		}
	};
	images = [];

	static propTypes = {
		data: PropTypes.string
	};

	static defaultProps = {
		data: '[]'
	};

	static childContextTypes = {
		parentWidth: PropTypes.number
	};
}

const s = StyleSheet.create({
	item: {
		marginBottom: styles.transformSize(40)
	},
	text: {
		fontSize: styles.transformSize(56),
		lineHeight: styles.transformSize(92),
		color: 'black'
	},
	image: {
		alignSelf: 'center'
	}
});

export default ContentSource;