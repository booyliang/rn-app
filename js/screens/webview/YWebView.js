import React, { Component } from 'react';
import { WebView, Clipboard} from 'react-native';
import { StyleSheet, View, Nav, Toast, Button, Text } from '../../components';
import PropTypes from 'prop-types';
import { share } from '@services';
import { YCommon } from '@ydk';
export default class YWebView extends Component {
	constructor(props) {
		super(props);
		let { url } = props.navigation.state.params;
		url = decodeURIComponent(url);
		this.state = { title: '载入中...', url, menuVisible: this.shouldShowMenu(url) };
	}


	handleLoadEnd = () => {

	}

	handleLoadStart= () => {
		var script = 'window.__yryz=true';
		this._webView && this._webView.injectJavaScript(script);
	}
	handleNavigationStateChange = (e) => {
		console.log('onNavigationStateChange', e);
		this.canGoBack = e.canGoBack;
		this.setState({ title: e.title });
	}
	handleBack = () => {
		return true
	}
	render() {

		return (
			<View style={[style.container]}>
				<Nav title={this.state.title} rightComponent={this.state.menuVisible && this.renderNavRight()} handleBack={this.handleBack}></Nav>
				<WebView source={{ uri: this.state.url }}
					onLoadStart={this.handleLoadStart}
					onNavigationStateChange={this.handleNavigationStateChange}
					ref={ref => { this._webView = ref;}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					onMessage={this.handleMessage}
					renderError={() => {
						{/* if (e === 'WebKitErrorDomain') {
							return
						} */}
					}}
					onLoadEnd={this.handleLoadEnd}
					// for android: WebView应该允许https页面中加载非安全http的内容
					mixedContentMode={'always'}
				></WebView>
			</View>

		);
	}
	static propTypes = {
		url: PropTypes.string,
	}
	handleMessage = async (event) => {
		let data = event.nativeEvent.data;
		if (typeof data === 'string') {
			data = JSON.parse(data);
		}
		if (data.type === 'share') {
			share.open(data.data);
		} else if (data.type === 'myshareClip') {
			Clipboard.setString(data.data);
			// YCommon.setMsgToClip(data.data);
		} else if (data.type === 'saveImage') {
			YCommon.saveImage({ uri: data.data }).then(res => {
				Toast.show({ text: '保存成功!' });
			}).catch(err => {
				Toast.show({ text: '保存失败!' });
			});
		}
	}

	renderNavRight = () => {
		return (
			<Button transparent onPress={this.defaultShare}>
				<Text>分享</Text>
			</Button>
		);
	};

	shouldShowMenu = (url) => {
		return !/m.+\.yryz\.com\/myShare/.test(url);
	};

	defaultShare = () => {
		share.open({
			title: this.state.title,
			content: '',
			url: this.state.url
		});
	};
}
const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	viewWrap: {
		backgroundColor: 'red',
	}
});