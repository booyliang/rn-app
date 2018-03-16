import React, { Component } from 'react';
import {  StyleSheet, withNavigation, Text, Toast} from '@components';
import { ViewPagerAndroid, View } from 'react-native';
import { cache } from './../../../utils';
import WitkeyView from './../WitkeyView';
@withNavigation
export default class ViewPager extends Component {

	constructor(props) {
		super(props);
		this.currentPage = 0;
		this.proviousOffset = 0;
		this.inited = false;
		this.toast = true;
		this.timer = null;
		this.state = {
			detailItems: {}
		};
	}

	render() {
		const { detailItems } = this.state;
		const { list } = this.props;
		return (
			<ViewPagerAndroid
				style={{flex: 1}}
				onPageScroll={this.onPageScroll.bind(this)}
				onPageSelected={this.onPageSelected.bind(this)}
				initialPage={this.currentPage}>
				{list.map(this.renderItem.bind(this))}
			</ViewPagerAndroid>
		);
	}

	renderItem(item, index) {
		const { detailItems } = this.state;
		const data = detailItems[item];
		return (
			<View key={item}>
				<WitkeyView detailData={data} changeIcon={this.changeIcon.bind(this)}/>
			</View>
		);
	}

	changeIcon(id) {
		let detailItems = this.state.detailItems;
		detailItems[id].followFlag = 1;
		this.setState({
			detailItems: {...detailItems}
		});
	}

	onPageScroll(e) {
		let offset = e.nativeEvent.offset;
		if (this.currentPage >= this.props.list.length - 1 
				&& !offset 
				&& this.toast
				&& this.props.list.length > 1 
				&& !this.proviousOffset 
				&& this.inited) {
			Toast.show({
				text: '没有更多内容了，小悠正在努力筹备'
			});
			this.toast = false;
			clearTimeout(toastTimer);
			const toastTimer = setTimeout(() => {
				console.log("触发了");
				this.toast = true;
			}, 3000);
		}
		this.inited = true;
		this.proviousOffset = offset;
	}

	componentWillMount() {
		const {id, list} = this.props;
		for (let i = 0; i < list.length; i++) {
			if (id == list[i] ) {
				this.currentPage = i;
				break;
			}
		}
		this.getPageData();
	}

	requestData(pages) {
		let { detailItems } = this.state;
		for (let i = 0; i < pages.length; i++) {
			let id = pages[i];
			if (!detailItems[id]) {
				cache(`/services/app/v1/witkey/findWitkey/${id}/0`, (res) => {
					detailItems[id] = res.data.data;
					this.setState({detailItems: {...detailItems}});
				});
			}
		}
	}

	getPageData() {
		const {list} = this.props;
		let { detailItems } = this.state;
		const id = list[this.currentPage];
		const nextId = list[this.currentPage + 1];
		const proviousId = list[this.currentPage - 1];
		let ids = [id];
		if (typeof proviousId !== 'undefined') {
			ids.unshift(proviousId);
		}
		if (typeof nextId !== 'undefined') {
			ids.push(nextId);
		}
		this.requestData(ids);
	}

	onPageSelected(e) {
		this.currentPage = e.nativeEvent.position;
		this.getPageData();
	}

}
