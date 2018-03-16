import React, { Component } from 'react';
import {
	StyleSheet, Text, View,
	withNavigation,
	Tag, TagGroup, YIcon, Touchable, Image
} from '@components';
import { transformSize, inlineWrap, padder, textPrimaryColor, border } from '@styles';
import { YZhugeIo } from '@ydk';
import PropTypes from 'prop-types';
let defaultLogo = require('../../assets/images/no-pic.jpg');
@withNavigation
export default class AppItem extends Component {

	_renderActivity(active) {
		if (active && active.title) {
			return (
				<Touchable onPress={() => this.props.navigation.navigate("Article", { id: active.id })}>
					<View style={styles.activityWrapper}>
						<YIcon name="gift" style={styles.giftIcon} />
						<Text style={styles.activityContent} numberOfLines={1}>{active.title}</Text>
					</View>
				</Touchable>
			);
		}
	}

	avg(a, b) {
		var res = parseInt((a / b) * 10) / 10;// 保留两位、三位小数 同理
		return res;
	}

	_renderContent(data) {
		let logoSource = { uri: data.appliIcon };
		let iconSize = this.props.iconSize;
		iconSize = {
			width: transformSize(iconSize),
			height: transformSize(iconSize)
		};
		if (!data.appliIcon) {
			logoSource = defaultLogo;
		}

		return (
			<View style={styles.inner}>
				<View style={iconSize}>
					<Image style={[styles.icon, iconSize]} source={logoSource} />
				</View>
				<View style={styles.contentWrap}>
					<Text style={styles.title} numberOfLines={1}>{data.appliName}</Text>
					<Text style={styles.description} numberOfLines={this.props.contentOfLines}>
						{data.description}
					</Text>
				</View>
			</View>
		);
	}

	_renderTag(data) {
		const { tagColor, tagClick } = this.props;
		try {
			data.labels = data.labels || data.labelName || [];
			// 后端部分结构不同, 有的用的label数组有的用的labelName,  兼容转换
			if (typeof data.labels === "string") {
				// 和dest 属性对应
				const dest = data.labelDesp.split(",");
				data.labels = data.labels.split(",").map((text, index) => {
					return {
						labelName: text,
						id: dest[index]
					};
				});
			}
		} catch (e) {
			data.labels = [];
		}
		if (data.appStatictis) {
			data.downloadCount = data.appStatictis.downloadCount;
		}
		if (data.downloadCount > 9999) {
			data.downloadCount = this.avg(data.downloadCount, 10000) + "w";
		}
		const iconSize = {
			width: transformSize(this.props.iconSize)
		};
		return (
			<View style={styles.tagWrap}>
				<View style={[styles.browse, iconSize]}>
					{/* <Text style={styles.browseText}>{data.downloadCount} 次{this.props.scalarType}</Text> */}
				</View>
				<TagGroup style={{ flexWrap: 'wrap', flex: 1 }}>
					{
						data.labels.map((label, index) => {
							return (
								<Tag style={{ backgroundColor: tagColor }}
									key={index}
									onPress={this.onTagPress.bind(this, label)}
								>
									{label.labelName}
								</Tag>
							);
						})
					}
				</TagGroup>
			</View>
		);
	}

	renderBottomLine() {
		const { bottomLine } = this.props;
		if (bottomLine) {
			return (
				<View style={[padder, styles.bg]}>
					<View style={styles.bottomline}></View>
				</View>
			);
		}
	}

	render() {
		let { data, style = {}, selected } = this.props;
		return (
			<Touchable
				type="highlight"
				onPress={this.onSelect.bind(this)}>
				<View style={styles.container}>
					<View style={[styles.wrapper, style]}>
						{this._renderContent(data)}
						{this._renderTag(data)}
						{this._renderActivity(data.latestActivity)}
					</View>
					{this.renderBottomLine()}
				</View>
			</Touchable>
		);
	}

	onTagPress(label) {
		this.props.navigation.navigate("TagPage", { tagId: label.id });
	}

	onSelect() {
		let { data, style, selected } = this.props;
		this.props.navigation.navigate('App', { id: data.id });
		YZhugeIo.track('猜你喜欢', {
			'应用名称': data.appliName,
		});
	}

	static PropTypes = {
		bottomLine: PropTypes.boolean,   // 是否显示下划线
		tagColor: PropTypes.string,		 // 定制标签的颜色
		selected: PropTypes.func,		 // 选中的回调
		scalarType: PropTypes.string,     // 显示下载数或者关注数等需要显示的文字,
		contentOfLines: PropTypes.number,
		iconSize: PropTypes.number,
	}

	static defaultProps = {
		scalarType: '获取',
		bottom: 0,
		tagColor: '#ff9160',
		bottomLine: false,
		contentOfLines: 2,
		iconSize: 250
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	wrapper: {
		paddingVertical: transformSize(50),
		...padder,
	},
	inner: {
		...inlineWrap,
		marginBottom: transformSize(48)
	},
	icon: {
		borderRadius: transformSize(40),
		overlayColor: '#fff',
		// width: transformSize(300),
		// height: transformSize(300),
		...border
	},
	title: {
		fontSize: transformSize(56),
		color: textPrimaryColor,
		marginBottom: transformSize(40),
		marginLeft: transformSize(50),
	},
	contentWrap: {
		flex: 1,
		paddingTop: transformSize(15)
	},
	description: {
		fontSize: transformSize(46),
		lineHeight: transformSize(70),
		minHeight: transformSize(176),
		marginLeft: transformSize(50),
	},
	tagWrap: {
		...inlineWrap
	},
	browse: {
		marginRight: transformSize(50)
	},
	browseText: {
		textAlign: "center",
		fontSize: transformSize(40),
		color: '#666'
	},
	giftIcon: {
		fontSize: transformSize(46),
		color: "#9ac7ff"
	},
	activityWrapper: {
		...inlineWrap,
		paddingTop: transformSize(51),
		alignItems: 'center'
	},
	activityContent: {
		fontSize: transformSize(46),
		color: "#ff9bb0",
		paddingLeft: transformSize(38)
	},
	bottomline: {
		height: transformSize(2),
		backgroundColor: "#e3e3e3"
	},
	bg: {
		backgroundColor: 'white'
	}
});