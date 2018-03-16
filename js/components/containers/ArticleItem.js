import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	Touchable,
	View,
	Text,
	Video,
	Image,
} from '../';
import {
	navigate
} from '@services';
import {
	YZhugeIo
} from '@ydk';
import styles from '../../styles';
class ArticleItem extends React.Component {

	render() {
		let { recommendTitle, title } = this.props.data;
		title = recommendTitle || title;
		return (
			<Touchable type="highlight" onPress={this.handlePress.bind(this)} style={this.props.touchableStyle}>
				<View padder style={[style.main, this.props.style]}>
					<Text numberOfLines={2} style={style.title}>{title}</Text>
					{this.renderBody()}
					{this.renderFoot()}
				</View>
			</Touchable>
		);
	}

	renderBody() {
		let { videoThumbnailUrl, imgUrl, description, videoUrl, recommend, recommendBigmap, recommendBref } = this.props.data;

		if (recommend == 1) {
			imgUrl = recommendBigmap || videoThumbnailUrl || imgUrl.split(',')[0];
			return this.renderImage(imgUrl);
		}

		if (videoThumbnailUrl && videoUrl) {
			return <Video preview poster={videoThumbnailUrl} uri={videoUrl} />;
		}

		if (imgUrl) {
			imgUrl = imgUrl.split(',')[0];
			return this.renderImage(imgUrl);
		}

		return <Text numberOfLines={3} style={style.content} >{description}</Text>;
	}

	renderImage(uri) {
		return <Image source={{ uri }} style={[style.image].concat(this.props.imageStyle)} />;
	}

	renderFoot() {
		return typeof this.props.foot !== 'undefined'
			? this.props.foot
			: <Text style={style.heat}>{this.props.data.viewCount} 浏览数</Text>;
	}

	handlePress() {
		// let { articleIdArr } = this.props;
		// navigate('Article', {
		// 	id: this.props.data.id,
		// 	articleIdArr
		// });
		YZhugeIo.track('猜你喜欢', {
			'文章标题': this.props.data.title
		});
		this.props.onPress(this.props.data);

	}
	static defaultProps = {
		onPress: (data) => {
			navigate('Article', { id: data.id });
		}
	}
	static propTypes = {
		data: PropTypes.object,
		foot: PropTypes.element,
		onPress: PropTypes.func,
	}
}

const style = StyleSheet.create({
	main: {
		paddingVertical: styles.transformSize(40),
		backgroundColor: 'white'
	},
	title: {
		fontWeight: 'bold',
		fontSize: styles.transformSize(62),
		lineHeight: styles.transformSize(72),
		marginBottom: styles.transformSize(44),
	},
	content: {
		lineHeight: styles.transformSize(72),
		marginTop: styles.transformSize(-15)
	},
	heat: {
		fontSize: styles.transformSize(40),
		color: styles.textAssistColor,
		marginTop: styles.transformSize(33),
	},
	image: {
		width: '100%',
		height: styles.transformSize(514),
		borderRadius: styles.transformSize(16),
	}
});

export default ArticleItem;