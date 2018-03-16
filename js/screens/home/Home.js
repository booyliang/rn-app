import React, { Component } from 'react';
import {
	Container,
	View, Platform, Toast
} from "@components";
import { BackHandler, ToastAndroid } from 'react-native';
import HomeHeader from './HomeHeader';
import HomeSlider from './HomeSlider';
import HomeSwiper from './HomeSwiper';
import HomeCard from './HomeCard';
import { connect } from 'react-redux';
import { YZhugeIo } from '@ydk';

let mapStateToProps = (state) => {
	return { user: state.user };
};
@connect(mapStateToProps)


class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.slider = null;
		this.swiper = null;
		this.state = {
			logo: require('../../assets/images/logo.png')
		};
	}


	flowHeader() {
		return (
			<View>
				<HomeSlider ref={(e) => this.slider = e} />
				<HomeSwiper ref={(e) => this.swiper = e} />
			</View>
		);
	}

	handleRefresh = async () => {
		// 刷新整个首页
		await this.slider.fetchAdStorage();
		// this.slider.fetchStartAdData();
		this.swiper.fetchSubjectStorage();
	}

	// fetchStartAdData = async() => {
	// 	let request = {
	// 		url: '/services/app/v1/ad/list',
	// 		params: {
	// 			keyWord: '启动广告', count: '1'
	// 		}
	// 	};

	// 	let res = await http(request);

	// 	let adList = res.data.data || [];
	// 	// Toast.show({text: JSON.stringify(adList)})

	// 	if (adList && adList.length) {

	// 		let adInfo = adList[0]
	// 		let image = await Image.prefetch(adInfo.adPicture);
	// 		let data = JSON.stringify(adInfo);
	// 		AsyncStorage.setItem("Advertisement",data)
	// 		Toast.show({text: adInfo})

	// 	}else{
	// 		// AsyncStorage.removeItem("Advertisement")
	// 	}
	// }

	render() {
		return (
			<Container>
				<HomeHeader logo={this.state.logo} />
				<HomeCard
					ListHeaderComponent={this.flowHeader()}
					onRefresh={this.handleRefresh}
				/>
			</Container>
		);
	}


	async componentDidMount() {
		// 埋点
		YZhugeIo.track('首页', {
			// 'userId': this.props.user.custId
		});
		// this.fetchStartAdData();
	}

	componentWillMount() {
		if (Platform.OS === 'android') {
			BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}

	componentWillUnmount() {
		if (Platform.OS === 'android') {
			BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}

	onBackAndroid = () => {
		if (this.lastBackPressed && this.lastBackPressed + 1000 >= Date.now()) {
			// 最近2秒内按过back键，可以退出应用。
			return false;
		}
		this.lastBackPressed = Date.now();
		Toast.show({ text: '再按一次退出悠然一指' });
		return true;
	}
}

export default HomeScreen;

