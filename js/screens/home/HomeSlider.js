import React, { Component } from 'react';
import { Image, StyleSheet, Platform, Anchor } from '../../components';
import Swiper from 'react-native-swiper';

import { transformSize } from '../../styles';
import moment from 'moment';
import {cache} from './../../utils';

// when chrome debug window is open, autoplayTimeout is not working
// https://github.com/facebook/react-native/issues/4470

// for cache slider
// let mapStateToProps = (state) => {
// 	return {
// 		adList: state.home.adList,
// 	};
// };
// @connect(mapStateToProps)
export default class HomeSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adList: []
		};
	}
	state = { visibleSwiper: Platform.OS === 'ios', }

	render() {
		// let { adList = [] } = this.props;
		let { adList = [] } = this.state;
		let imgForEmpty = <Image style={style.imageWrap} source={require('../../assets/images/default.png')} />;
		// bug: https://github.com/leecade/react-native-swiper/issues/389
		// 初始取本地image

		if (!this.state.visibleSwiper || !adList.length) {
			return imgForEmpty;
		}

		// https://github.com/leecade/react-native-swiper/issues/604
		return (
			<Swiper autoplay={true} autoplayTimeout={2} showsPagination={false} style={style.sliderWrap} removeClippedSubviews={false}>
				{adList.map(this.renderItem)}
			</Swiper>
		);
	}
	componentDidMount() {
		setTimeout(this.updateVisibleSwiper, 500);
		this.fetchAdStorage();
		// this.fetchStartAdData();
	}
	updateVisibleSwiper = () => {
		this.setState({ visibleSwiper: true });
	}
	renderItem = (item) => {
		let { adPicture, adUrl, id, adTitle, adDisplay } = item;
		let adSource = adPicture;
		if (adPicture.indexOf && adPicture.indexOf('http') > -1) {
			adSource = { uri: adPicture, cache: 'force-cache' };
		}
		// adUrl='http://192.168.30.88/recruitment'
		return (
			<Anchor ontrack key={id + this._timetick} href={adUrl} webTitle={adTitle} displayType={adDisplay}>
				<Image source={adSource} style={style.imageWrap} />
			</Anchor>
		);
	}

	fetchAdStorage() {
		this._timetick = new Date();
		cache({url: '/services/app/v1/ad/list', params: {keyWord: '首页', count: '10'}}, (res) => {
			const data = res.data.data || [];
			const currentTime = new Date().getTime();
			const adList = data.filter( (item) => {
				let startTimes = moment(item.startTime);
				let endTimes = moment(item.endTime);
				return currentTime >= startTimes && currentTime <= endTimes;
			});
			this.setState({adList});
		});
	}
}
const style = StyleSheet.create({
	sliderWrap: {
		height: transformSize(480),
	},
	imageWrap: {
		width: '100%',
		height: transformSize(480),
	}
});