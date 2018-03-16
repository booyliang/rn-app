import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	View,
	Text,
	Image,
	StarRating
} from '@components';
import styles from '@styles';
import defaultAvatar from '@assets/images/default-avatar.png';

class ReviewItem extends React.Component {
	render() {
		const data = this.props.data;
		const avatar = data.headImg ? {
			uri: data.headImg
		} : defaultAvatar;

		return (
			<View padder style={[style.main, this.props.style]}>
				<View style={style.author}>
					<Image source={avatar} style={style.authorAvatar} />
					<Text style={style.authorNickname}>{data.nickName}</Text>
				</View>
				<View style={style.text}>
					<StarRating rating={data.starLevel} disabled style={style.rating} />
					<Text style={style.content}>{data.comment}</Text>
					<Text style={style.date}>{data.createDate}</Text>
				</View>
			</View>
		);
	}

	static propTypes = {
		data: PropTypes.object,
	};

	static defaultProps = {
		data: {}
	};
}

const style = (() => {
	const authorAvatarSize = styles.transformSize(80);
	const authorAvatarMargin = styles.transformSize(34);
	return StyleSheet.create({
		author: {
			...styles.inlineWrap,
			alignItems: 'center',
			marginBottom: styles.transformSize(7)
		},
		authorNickname: {
			fontSize: styles.transformSize(44)
		},
		authorAvatar: {
			width: authorAvatarSize,
			height: authorAvatarSize,
			borderRadius: authorAvatarSize / 2,
			marginRight: authorAvatarMargin
		},
		text: {
			paddingLeft: authorAvatarSize + authorAvatarMargin
		},
		rating: {
			fontSize: styles.transformSize(34),
			paddingRight: 0,
			marginRight: styles.transformSize(18),
			marginBottom: styles.transformSize(24)
		},
		content: {
			lineHeight: styles.transformSize(72)
		},
		date: {
			fontSize: styles.transformSize(40),
			color: styles.textAssistColor,
			marginTop: styles.transformSize(20)
		}
	});
})();

export default ReviewItem;