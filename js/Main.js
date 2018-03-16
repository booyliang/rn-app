import React, { Component } from 'react';
import { YCommon, YdkComponent, Constants } from '../ydk';
import { loadAssets } from './assets';
import Root from './Root';
import TransitionPage from './components/containers/TransitionPage';
import Advertisement from './components/containers/Advertisement';
import { StoreProvider } from './store';
import { navigate } from './services';
import {
	View, AsyncStorage, Modal,
	Clipboard, Linking, Platform, UIManager,
	LayoutAnimation, NativeModules,
} from 'react-native';


if (!__DEV__) {
	
	global.console = {
		info: () => { },
		log: () => { },
		warn: () => { },
		debug: () => { },
		error: () => { },
	};
}

(() => {
	if (Platform.OS === 'android') {
		UIManager.setLayoutAnimationEnabledExperimental(true);
		Object.keys(LayoutAnimation.Presets).forEach((presetName) => {
			const preset = LayoutAnimation.Presets[presetName];
			delete preset.delete;
		});
	}
})();

export default class Main extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		skipTransitionPage: true,
		adInfo: {},
		skipAds: true,
		isReady: false

	}
	componentDidMount() {
		this.init();
	}

	
	async init() {
		let skipTransitionPage = false;
		let skipAds = true;
		let adInfo = {};
		try {
			await loadAssets();
			if (NativeModules.YCommon) {
				skipTransitionPage = await AsyncStorage.getItem("skipTransitionPage");
				if (Constants.alwaysShowTransitionPage) {
					skipTransitionPage = false;
				}
				adInfo = await AsyncStorage.getItem("Advertisement");
				adInfo = (adInfo && JSON.parse(adInfo)) || {};
			} else { 
				skipTransitionPage = true;
			}
			skipAds = !adInfo.adPicture;
		
	
		} catch (ex) {
			console.error(ex);
			
		} finally {
			this.setState({ skipTransitionPage, adInfo, skipAds, isReady: true }, () => {
				YCommon.closeLoadingPage();
				Advertisement.loadAds();
			});
		}
		
	}

	gotoRoot = async () => {
		let { skipTransitionPage } = this.state;
		AsyncStorage.setItem("skipTransitionPage", "1");
		this.setState({ skipTransitionPage: "1" }, async () => {
			// 非初次安装则直接跳过
			if (skipTransitionPage)
				return;
			let contentUrl = await Clipboard.getString();		// 获取剪切板内容
			console.log('Clipboard', contentUrl);
			const scheme = 'yryzapp://open/';
			if (contentUrl && contentUrl.indexOf('yryzapp://') === 0) {  // 当剪切板有内容时  清空剪切板内容
				console.log('Clipboard', contentUrl);
				Linking.openURL(contentUrl);
				Clipboard.setString('');
			}
		});
	}
	renderTransitionPage() {
		if (this.state.skipTransitionPage)
			return null;
		return (
			<View style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				backgroundColor: '#fff',

			}}>
				<TransitionPage onPress={this.gotoRoot} />
			</View>);

	}
	renderAdvertisement() {
		if (this.state.skipAds || !this.state.skipTransitionPage)
			return null;
		return (
			<Modal transparent={false} onRequestClose={() => false}
				visible={this.state.modalVisible}>
				<Advertisement adInfo={this.state.adInfo} onClose={this.closeAds} />
			</Modal>
		);
	}
	closeAds = async (route) => {
		this.setState({ skipAds: true }, () => {
			if (!route || !route.url)
				return;
			if (route.adDisplay === 1 || route.url.indexOf('yryzapp') > -1) {
				Linking.openURL(route.url);
				return;
			}
			navigate('YWebView', route);

		});
	}
	renderRoot = () => {

		if (!this.state.isReady)
			return <View />;

		return (
			<View style={{ flex: 1 }}>
				<Root />
				<YdkComponent />
			</View>

		);
	}
	render() {
		let { isReady } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<StoreProvider>
					{ this.renderRoot()}
				</StoreProvider>
				{this.renderAdvertisement()}
				{ this.renderTransitionPage()}
			</View>
		);

	}
}