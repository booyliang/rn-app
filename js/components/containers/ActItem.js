import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	Touchable,
	View,
	Image,
	Text,
} from '@components';
import styles from '@styles';
import { YZhugeIo } from '@ydk';
import { navigate } from '@services';
class ActItem extends React.Component {
	render() {
		let { title, recommendTitle, recommend, imgUrl, recommendBigmap } = this.props.data;
		if (recommend == 1) {
			title = recommendTitle;
			imgUrl = recommendBigmap;
		}
		return (
			<Touchable type="highlight" onPress={this.handlePress}>
				<View style={[style.main, this.props.style]}>
					{this.renderImage(imgUrl)}
					<Text style={style.title}>{title}</Text>
				</View>
			</Touchable>
		);
	}

	renderImage = (url) => {
		return url
			? <Image
				source={{ uri: url.split(',')[0] }}
				style={style.image}
			/>
			: null;
	};

	handlePress = () => {
		YZhugeIo.track('猜你喜欢', {
			'活动标题': this.props.data.title,
			'文章标题': this.props.data.title,
		});
		this.props.onPress(this.props.data);
	};

	static defaultProps = {
		onPress: (data) => {
			navigate('Article', { id: data.id });
		}
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		onPress: PropTypes.func
	};
}

const style = StyleSheet.create({
	main: {
		paddingHorizontal: styles.padding,
		paddingVertical: styles.transformSize(50),
		backgroundColor: 'white'
	},
	image: {
		width: '100%',
		height: styles.transformSize(543),
		borderRadius: styles.transformSize(40),
		marginBottom: styles.transformSize(20)
	},
	title: {
		fontSize: styles.transformSize(60),
		lineHeight: styles.transformSize(72),
		paddingHorizontal: styles.toPercent(34, 1142),
		color: '#000',
	}
});

export default ActItem;