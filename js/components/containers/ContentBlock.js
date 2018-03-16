import React, { Component} from 'react';
import { Text, View, Image, FlatList} from "react-native";
import { Video, Touchable, H3, StyleSheet, } from "./../index";   // 导入components 下面的组件
import { transformSize } from './../../styles';

export default class ContentBlock extends Component { 

	parseConfig() {
		let { bg, paddingBorder } = this.props;
		bg = bg ? {
			backgroundColor: bg
		} : {};
		paddingBorder = paddingBorder ? {
			paddingLeft: transformSize(50),
			paddingRight: transformSize(50)
		} : {};
		return StyleSheet.create({
			bg: bg,
			paddingBorder: paddingBorder
		});
	}

	_renderItem(item) {
		let config = this.parseConfig();
		const content = (item) => {
			if (item.image) {
				return <Image source = {{uri: item.image}} style = {decorate.img}/>;
			} else if (item.text) {
				return <Text style = {decorate.text}>{item.text}</Text>;
			} else if (item.video) {
				return (
					<View style = {{marginBottom: transformSize(44)}}>
						<Video style = {decorate.video} poster = {item.video.poster} duration = {item.video.duration} uri = {item.video.uri}></Video>
					</View>
				);
			}
		};
		return (
			<Touchable 
				onPress = {() => {
					if (this.props.selected) {
						this.props.selected(item);
					}	
				}}>
				<View style = {[decorate.block, config.bg, config.paddingBorder]}>
					<H3 style = {decorate.title}>{item.title}</H3>
					{ content(item) }
					<Text style = {decorate.pageview}>{item.pageView || 0}浏览数</Text>
				</View>
			</Touchable>
		);
	}

	render() {
		let { items } = this.props;
		if (!items) return <Text>未绑定items数据</Text>;
		return (
			<View>
				<FlatList
					ListFooterComponent = {
						this.props.footComponent || <Text></Text>
					}
					data= {items}
					renderItem = { ({item}) => this._renderItem(item) }
					onEndReachedThreshold = {0.5}
					{...this.props}
				/>
			</View>
		);
	}

}


const decorate = StyleSheet.create({
	block: {
		// paddingBottom: transformSize(52),
		backgroundColor: "#e1f3fe",
	},
	title: {
		color: "#000",
		fontSize: transformSize(62),
		paddingTop: transformSize(50),
		marginBottom: transformSize(54)
	},
	video: {
		height: transformSize(514),
	},
	img: {
		marginBottom: transformSize(44),
		height: transformSize(513),
		flex: 1,
		borderRadius: transformSize(30)
	},
	text: {
		fontSize: transformSize(50),
		marginBottom: transformSize(44),
		lineHeight: transformSize(78)
	},
	pageview: {
		fontSize: transformSize(40),
		color: "#999999"
	}
});