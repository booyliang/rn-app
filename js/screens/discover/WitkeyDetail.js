import React, { Component } from 'react';
import { StyleSheet, Linking,  NativeModules, LayoutAnimation, Platform} from "react-native";
import {
	Container, Content, Left, View,
	Text, Image, YIcon, Right, Touchable, H2, Button,
	withNavigation, HeadBar, Nav, ContentSource, Loading, withUser, ActionSheet,
	Toast, Dimensions, ScrollView, WitkeyItem
} from '@components';
import { transformSize, inlineWrap, antiBlock, centerWrap, padder } from '@styles';
import { http, sign, share } from '../../services';
import { cache } from './../../utils';
import ViewPager from './components/ViewPager';
import WitkeyView from './WitkeyView';
import {
	Constants, YZhugeIo
} from '@ydk';
let { width } = Dimensions.get('window');
@withNavigation
@withUser(false)
export default class WitkeyDetail extends Component {
	constructor(props) {
		super(props),
		this.id = this.props.navigation.state.params.id;
		this.list = [];
		this.state = {
			showTitle: false,
			detailData: {},
			scrollItems: {}
		};
	}

	render() {
		if (Platform.OS === 'ios') {
			return (
				<ScrollView pagingEnabled={true}
					horizontal={true}
					scrollEventThrottle={16}
					removeClippedSubviews={true}
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={this.handleScrollEnd}
					ref={(s) => this._refScrollView = s}
					onScroll={this.handleHorizontalScroll}
				>
					{this.scrollIds.map(this.renderItem)}
				</ScrollView>	
			);
		}

		return (
			<ViewPager 
				list={this.scrollIds}
				id={this.id}
				changeIcon = {this.changeIcon.bind(this)}
			/>
		);
	}

	spliceData(list) {
		let len = list.length;
		if (len == 1) {
			return list;
		}
		let index = 0;
		for (let i = 0; i < list.length; i++) {
			if (list[i] == this.id) {
				index = i;
				break;
			}
		}
		const activeNum = 5;
		const startIndex = Math.max(0, index - activeNum);
		const endIndex = Math.min(len, index + activeNum + 1);
		return list.slice(startIndex, endIndex);
	}

	renderItem = (id) => {
		let data = this.state.scrollItems[id];
		return (
			<View key={id}>
				<WitkeyView detailData={data} changeIcon={this.changeIcon.bind(this)}/>
			</View>
		);
	}

	changeIcon(id) {
		let { scrollItems } = this.state;
		scrollItems[id].followFlag = 1;
		this.setState({
			scrollItems: {...scrollItems}
		});
	}

	componentWillMount() {
		let { scrollIds, id} = this.props.navigation.state.params;
		this.scrollIds = scrollIds || [id];
		this.scrollIds = this.spliceData(this.scrollIds);
		this.id = id;
	}

	componentDidMount() {
		if (Platform.OS === 'ios') {
			let idIndex = this.scrollIds.indexOf(this.id);
			this.offsetX = width * idIndex;
			this._refScrollView.scrollTo({ x: this.offsetX, animated: false });
			requestAnimationFrame(this.checkDataIsLoad);
		}
	}

	// loadData = (id) => {
	// 	let { scrollItems } = this.state;
	// 	let data = scrollItems[id];
	// 	if (data) {
	// 		return;
	// 	}
	// 	cache(`/services/app/v1/witkey/findWitkey/${id}/0`, (res) => {
	// 		let data = res.data.data;
	// 		if (scrollItems[id])
	// 			return;
	// 		scrollItems[id] = data;
	// 		this.setState({
	// 			scrollItems: { ...scrollItems }
	// 		});
	// 	});
	// }

	// check 左右item是否已加载
	// checkSiblingIsLoad = (idIndex) => {
	// 	let scrollIds = this.scrollIds;
	// 	let preIdIndex = idIndex - 1;
	// 	let nextIdIndex = idIndex + 1;
	// 	if (preIdIndex >= 0) {
	// 		this.loadData(scrollIds[preIdIndex]);
	// 	}
	// 	if (nextIdIndex < scrollIds.length) {
	// 		this.loadData(scrollIds[nextIdIndex]);
	// 	}
	// }

	checkDataIsLoad = () => {
		let scrollIds = this.scrollIds;
		let idIndex = parseInt(this.offsetX / width);
		const nextId = scrollIds[idIndex + 1];
		const proviousId = scrollIds[idIndex - 1];
		let id = scrollIds[idIndex];
		let ids = [id];
		if (typeof proviousId !== 'undefined') {
			ids.unshift(proviousId);
		}
		if (typeof nextId !== 'undefined') {
			ids.push(nextId);
		}
		let { scrollItems } = this.state;
		for (let i = 0; i < ids.length; i++) {
			let currentId = ids[i];
			if (!scrollItems[currentId]) {
				cache(`/services/app/v1/witkey/findWitkey/${currentId}/0`, (res) => {
					scrollItems[currentId] = res.data.data;
					this.setState({
						scrollItems: {...scrollItems}
					});
				});
			}
		}
	}


	handleHorizontalScroll = (e) => {
		let { scrollIds } = this.props.navigation.state.params;
		if (!scrollIds) {
			return;
		}
		if (e.nativeEvent.contentSize.width === 0)
			return;
		if (e.nativeEvent.contentOffset.x < -20) {
			return this.props.navigation.goBack();
		}
		if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width > e.nativeEvent.contentSize.width + 30) {
			Toast.show({ text: '没有更多内容了，小悠正在努力筹备' });
		}
	}

	handleScrollEnd = (e) => {
		this.offsetX = e.nativeEvent.contentOffset.x;
		this.checkDataIsLoad();
	}

}
