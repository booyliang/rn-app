import React from 'react';
import {
	Modal,
	StyleSheet,
	Animated,
	FlatList
} from 'react-native';
import {
	View,
	Button,
	Text,
} from '@components';
import styles from '@styles';

class ActionSheet extends React.Component {
	render() {
		const maskStyle = [
			s.mask,
			{
				opacity: this.state.maskOpacity
			}
		];
		const listStyle = [
			s.list,
			{
				transform: [
					{
						translateY: this.state.listTranslateY
					}
				]
			}
		];

		return (
			<Modal transparent visible={this.state.opened} onRequestClose={this.close} onShow={this.animateIn}>
				<Animated.Text style={maskStyle} onPress={this.handlePressMask}></Animated.Text>
				<Animated.View onLayout={this.handleListLayout} style={listStyle}>
					<FlatList
						data={this.state.options}
						renderItem={this.renderItem}
						bounces={false}
						keyExtractor={this.extractKey}
						ItemSeparatorComponent={this.renderItemSeparator}
					/>
				</Animated.View>
			</Modal>
		);
	}

	renderItem = ({item, index}) => {
		return (
			<Button block onPress={this.handlePressItem(index)} style={s.item}>
				<Text style={s.itemText}>{item}</Text>
			</Button>
		);
	};

	renderItemSeparator = () => <View style={s.itemSeparator} />;

	extractKey = (item, index) => index;

	handleListLayout = (e) => {
		this.listHeight = e.nativeEvent.layout.height;
	};

	handlePressMask = () => {
		if (this.config.cancelButtonIndex) {
			this.close();
		}
	};

	handlePressItem = (index) => () => {
		this.close();

		if (this.callback) {
			this.callback(index);
		}
	};

	open = (config, callback) => {
		let options;
		({
 			options,
 			...config
 		} = config);
		this.config = config;
		this.callback = callback;
		this.setState({
			options
		}, () => {
			this.setState({
				opened: true
			});
		});
	};

	close = async () => {
		await this.animateOut();
		this.setState({
			opened: false
		});
	};

	createAnimation = (variable, value) => {
		return Animated.timing(variable, {
			toValue: value,
			duration: 200,
			useNativeDriver: true
		});
	};

	animateIn = () => {
		Animated.parallel([
			this.createAnimation(this.state.maskOpacity, 1),
			this.createAnimation(this.state.listTranslateY, -this.listHeight),
		]).start();
	};

	animateOut = () => {
		return new Promise((resolve, reject) => {
			Animated.parallel([
				this.createAnimation(this.state.maskOpacity, 0),
				this.createAnimation(this.state.listTranslateY, 0),
			]).start(resolve);
		});
	};

	state = {
		opened: false,
		options: [],
		maskOpacity: new Animated.Value(0),
		listTranslateY: new Animated.Value(0),
	};

	config = {};
	callback = null;
	listHeight = 0;

	static init(element) {
		ActionSheet.instance = element;
	}

	static show(config, callback) {
		ActionSheet.instance.open(config, callback);
	}

	static instance = null;
}

const s = StyleSheet.create({
	mask: {
		...styles.maskBackground,
		flex: 1
	},
	list: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: '100%',
	},
	item: {
		backgroundColor: 'white',
		borderRadius: 0,
		paddingTop: styles.transformSize(80),
		paddingBottom: styles.transformSize(80),
	},
	itemText: {
		color: styles.textPrimaryColor
	},
	itemSeparator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: styles.borderColor
	}
});

export default ActionSheet;