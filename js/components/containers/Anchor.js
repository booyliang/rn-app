/**
 * Author: AiQingmin
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Touchable, withNavigation } from '../../components';
import { Linking } from 'react-native';
import { YZhugeIo } from '@ydk';
@withNavigation
export default class Anchor extends Component {
	static propTypes = {
		href: PropTypes.string,
		onAnchorTouch: PropTypes.func,
		webTitle: PropTypes.string,
		ontrack: PropTypes.any
	};

	render() {
		let { children } = this.props;
		return (
			<Touchable onPress={this.onAnchorTouch} type="highlight">{children}</Touchable>
		);

	}
	onAnchorTouch = () => {
		let { href, onAnchorTouch, webTitle, navigation, displayType, ontrack } = this.props;
		if (ontrack) {
			YZhugeIo.track('首页广告', {
				'广告位': '首页',
				'广告URL': href
			});
		}
		if (onAnchorTouch) {
			return onAnchorTouch();
		}
		if (!href) {
			return;
		}
		if (href.indexOf('http' || 'mv') > -1) {
			if (displayType === 1) {
				Linking.canOpenURL(href).then(supported => {
					if (!supported) {
						console.log('Can\'t handle url: ' + href);
					} else {
						Linking.openURL(href);
					}
				}).catch(err => console.error('open url error', err));
				return;
			} 
			navigation.navigate('YWebView', { url: href, title: webTitle });
			return;
		}
		if (href.indexOf('yryzapp') > -1) {
			Linking.openURL(href);
		}

	}

}