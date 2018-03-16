import React from 'react';
import { View, Text, Image, StyleSheet, TagGroup, Tag, withNavigation, Touchable, YIcon } from '@components';
import styles from '@styles';
import { YZhugeIo } from '@ydk';
let defaultIcon = require('../../../assets/images/no-pic.jpg');

@withNavigation
export default class CategoryAppItem extends React.Component {
	render = () => {
		let item = this.props.data;
		let appliIcon = { uri: item.appliIcon };
		if (!item.appliIcon) {
			item.appliIcon = defaultIcon;
		}
		return (
			<Touchable
				type="highlight"
				// key={item.id}
				onPress={() => this.props.navigation.navigate('App', {
					id: item.id
				})}
			>
				<View style={[style.ItemWrap, this.props.style]}>
					<View style={style.topContent}>
						<Image style={style.imageIcon} source={appliIcon} />
						<View>
							<Text style={style.appName}  numberOfLines={1} >{item.appliName}</Text>
							<Text style={style.textAssist}>{item.slog}</Text>
						</View>
					</View>
					{this.appInfo(item)}
					{this.getTag(item.labels)}
					{this.giftActivity(item.latestActivity)}
				</View>
			</Touchable>
		);
	}
	tagClick(labelItem) {
		YZhugeIo.track('标签', {
			'标签': labelItem.labelName
		});

		this.props.navigation.navigate('TagPage', {
			tagId: labelItem.id
		});
	}

	tagItem = (labelItem) => {
		return (
			<Tag
				key={labelItem.id}
				onPress={() => this.tagClick(labelItem)}
			>{labelItem.labelName}</Tag>
		);
	}

	appInfo = (item) => {
		if (item.description) {
			return (
				<View style={style.textareaWrap}><Text style={style.textarea} numberOfLines={3} >{item.description}</Text></View>
			);
		}
	}

	getTag = (tags) => {
		if (tags) {
			return (
				<TagGroup style={style.tagGroup} >
					{tags.map((labelItem) => this.tagItem(labelItem))}
				</TagGroup>
			);
		}
	}

	giftActivity = (activity) => {
		if (activity && activity.title) {
			return (
				<Touchable
					onPress={() => this.props.navigation.navigate('Article', {
						id: activity.id
					})}
				>
					<View style={style.giftWrap}>
						<YIcon name="gift" style={style.giftIcon} />
						<Text style={style.giftInfo} numberOfLines={1}>{activity.title}</Text>
					</View>
				</Touchable>
			);
		}
	}
}

const style = StyleSheet.create({
	ItemWrap: {
		paddingHorizontal: styles.transformSize(30),
		paddingBottom: styles.transformSize(60),

		backgroundColor: '#fff'
	},
	topContent: {
		...styles.inlineWrap,
		marginTop: styles.transformSize(66),
		width: '70%',
	},
	imageIcon: {
		width: styles.transformSize(210),
		height: styles.transformSize(210),
		borderRadius: styles.transformSize(51),
		marginRight: styles.transformSize(48),
		overlayColor: '#fff',
		...styles.border,

	},
	appName: {
		fontSize: styles.transformSize(56),
		color: styles.textPrimaryColor,
	},
	textAssist: {
		fontSize: styles.transformSize(40),
		color: styles.textSecondaryColor,
		marginTop: styles.transformSize(48),
	},
	textareaWrap: {
	},
	textarea: {
		marginTop: styles.transformSize(36),
		fontSize: styles.transformSize(46),
		lineHeight: styles.transformSize(66),
		color: styles.textPrimaryColor,
		textAlign: 'justify',
	},
	tagGroup: {
		// marginVertical: styles.transformSize(36),
		marginTop: styles.transformSize(36),
	},
	giftIcon: {
		color: '#9ac7ff',
		fontSize: styles.transformSize(60),
		marginRight: styles.transformSize(32),
	},
	giftWrap: {
		...styles.inlineWrap,
		alignItems: 'center',
		marginTop: styles.transformSize(36),
	},
	giftInfo: {
		width: '90%',
		color: styles.themeColor,
		fontSize: styles.transformSize(46),
	}
});