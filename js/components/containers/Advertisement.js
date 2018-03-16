// /广告页

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	AsyncStorage,
} from 'react-native';
import { http } from '../../services';
import { YZhugeIo } from '@ydk';
import CircleAnimation from './CircleAnimation';
import PercentageCircle from 'react-native-percentage-circle';
const platform = Platform.OS;


export default class Advertisement extends Component {
	static loadAds = async () => {
		let request = {
			url: '/services/app/v1/ad/list',
			params: {
				keyWord: '启动广告', count: '1'
			}
		};
		let res = await http(request);
		let adList = res.data.data || [];
		if (adList && adList.length) {
			let adInfo = adList[0];
			let image = await Image.prefetch(adInfo.adPicture);
			let data = JSON.stringify(adInfo);
			console.log(data);
			// alert(data)
			AsyncStorage.setItem("Advertisement", data);
		} else {
			AsyncStorage.removeItem("Advertisement");
		}
	}
	/** 广告页倒计时部分**/
	constructor(props) {
		super(props);
		this.state = { time: 4, showWebView: false };
		this.timer = null;
	}

	checkTimer = () => {
		let { time } = this.state;
		time = time - 0.1;
		if (time < 0) {
			this.gotoHome();
		} else {
			this.timer = setTimeout(this.checkTimer, 100);
			this.setState({ time });
		}
	}
	componentDidMount() {
		this.checkTimer();
		// this.reloadData();
	}
	render() {
		let imageUrl = this.props.adInfo.adPicture;
		let perent = (4 - this.state.time) * 25;

		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={this.gotoUrl}><Image onLoad={this.load} source={{ uri: imageUrl }} style={styles.image} /></TouchableWithoutFeedback>
				<View style={styles.timeView}>
					{this.iosOrAndroid()}
				</View>
			</View>
		);
	}
	gotoUrl = () => {
		let { adUrl, adDisplay } = this.props.adInfo;
		// alert(url)
		this.timer && clearTimeout(this.timer);
		YZhugeIo.track('打开启动广告页', {
			'广告位': '启动页',
			'广告URL': adUrl
		});
		this.props.onClose({ url: adUrl, adDisplay });
	}
	gotoHome = () => { // 关闭
		this.timer && clearTimeout(this.timer);
		YZhugeIo.track('跳过启动广告页', {

		});
		this.props.onClose();
	}

	componentWillUnMount() {
		this.timer && clearTimeout(this.timer);
	}

	load = () => {
		// alert('加载成功')
	}

	iosOrAndroid = () => {
		let perent = (4 - this.state.time) * 25;
		let isIOS = platform === 'ios' ? true : false;

		if (isIOS) {
			return (
				<CircleAnimation radius={17} percent={perent} color={'#FFFFFF'}>
					<Text style={styles.text} onPress={this.gotoHome}> 跳过 </Text>
				</CircleAnimation>


			);
		} else {
			return (
				<PercentageCircle radius={17} percent={perent} color={'#FF4500'}>
					<Text style={styles.text} onPress={this.gotoHome}> 跳过 </Text>
				</PercentageCircle>

			);
		}
	}
}

const styles = StyleSheet.create({
	timeView: {
		right: 15,
		top: 25,
		position: 'absolute',
		zIndex: 10001
	},
	image: {
		width: '100%',
		height: '100%',
		flex: 1
	},
	text: {
		left: 0,
		top: 8,
		width: 30,
		height: 30,
		position: 'absolute',
		fontSize: 11,
		zIndex: 10001,
	},
	container: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 10000,
		left: 0, top: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	buttonWarp: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
	},
});