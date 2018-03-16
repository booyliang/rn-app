import React, { Component } from 'react';
import { View, Text,  YIcon, withNavigation, Touchable, H3, H2, StyleSheet, Image } from '../index';
import {transformSize, inlineWrap, padder, textAssistColor, border} from '@styles';
import PropTypes from 'prop-types';
@withNavigation
export default class WitkeyItem extends Component {

	_renderLeft(data) {
		return (
			<View style={style.iconWrap}>
				<Image source = {{uri: data.companyLogo }} style = {style.icon}/>
			</View>
		);
	}

	_renderRight(data) {
		return (
			<View style = {style.right}>
				<H2 style={style.title} numberOfLines = {1}>{data.companyName}</H2>
				<View>
					<Text note style={[style.textItem, style.outTypes]}>外包类型: {data.outSourceName || "暂无"}</Text>
					<Text note style={[style.textItem, style.serverTypes]}>服务类型: {data.commentValueName || "暂无"}</Text>
				</View>
			</View>
		);
	}

	renderBottomLine() {
		const { bottomLine } = this.props;
		if (bottomLine) {
			return (
				<View style={style.bottomWrap}>
					<View style={style.bottomline}></View>
				</View>
			);
		}
	}

	_renderFooter(data) {
		return (
			<View style={[inlineWrap]}>
				<View style={style.footerTextWrap}>
					<H3 style={style.companyNature}>{data.companyTypeName}</H3>
				</View>
				<View style={style.siteWrapper}>
					<YIcon name="add-a-c" style={style.siteIcon}></YIcon>
					<Text style={style.siteText}>{data.companyAddress || "暂无"}</Text>
				</View>
			</View>
		);
	}

	render() {
		const { data, selected, touchable } = this.props;
		if (touchable === false) {
			return (
				<View  style = {[style.wrapper]}>
					<View style={style.inner}>
						{this._renderLeft(data)}
						{this._renderRight(data)}
					</View>
					{this._renderFooter(data)}
				</View>
			);	
		}
		return (
			<Touchable
				type="highlight"
				onPress = {() => {
					if (selected) {
						selected(data);
					}
				}
				}>
				<View style={style.container}>
					<View  style = {[style.wrapper, this.props.style]}>
						<View style={style.inner}>
							{this._renderLeft(data)}
							{this._renderRight(data)}
						</View>
						{this._renderFooter(data)}
					</View>
					{this.renderBottomLine()}
				</View>
			</Touchable>
		);
	}

	static PropTypes = {
		selected: PropTypes.func
	}

}

const style = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	wrapper: {
		paddingVertical: transformSize(50),
		...padder,
	},
	inner: {
		...inlineWrap,
		marginBottom: transformSize(35)
	},
	right: {
		paddingLeft: transformSize(50),
		paddingVertical: transformSize(15),
		justifyContent: 'space-between',
		height: transformSize(250),
		flex: 1,
	},
	iconWrap: {
		width: transformSize(250),
	},
	icon: {
		width: transformSize(250),
		height: transformSize(250),
		borderRadius: transformSize(40),
		alignSelf: "flex-start",
		overlayColor: '#fff',
		...border
	},
	title: {
		fontSize: transformSize(56),
		fontWeight: '600',
		color: "black",
	},
	siteWrapper: {
		... inlineWrap,
		alignItems: "center",
		paddingLeft: transformSize(50)
	},
	siteIcon: {
		fontSize: transformSize(42),
		paddingRight: transformSize(10),
		color: "#bfbfbf",
	},
	siteText: {
		fontSize: transformSize(40),
		color: textAssistColor,
	},
	textItem: {
		fontSize: transformSize(46),
		color: "#333"
	},
	companyNature: {
		textAlign: 'center',
		fontSize: transformSize(46),
		color: "#656565", 
		fontWeight: '500', 
	},
	footerTextWrap: {
		width: transformSize(250)
	},
	footerText: {
		textAlign: 'center',
	},
	outTypes: {
		// marginBottom: transformSize(36)
	},
	serverTypes: {
		paddingTop: transformSize(18)
	},
	bottomWrap: {
		...padder,
		backgroundColor: '#fff'
	},
	bottomline: {
		height: transformSize(2), 
		backgroundColor: "#e3e3e3"
	},
	bg: {
		backgroundColor: '#fff'
	}
});