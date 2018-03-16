import {
	Alert
} from 'react-native';
import  Constants from '../../../ydk/Constants';
import  YCommon from '../../../ydk/YCommon';

import axios from 'axios';
import store from '../../store';
function init() {
	const http = axios.create();
	let device = {};
	YCommon.getDeviceInfo().then((res) => {
		device = res;
	});

	http.interceptors.request.use((config) => {
		Object.assign(config, {
			url: handleUrl(config.url)
		});
		let { user } = store.getState();
		config.headers.common["deviceId"] = device.deviceId;
		config.headers.common["appVersion"] = device.appVersion;
		config.headers.common["deviceType"] = device.deviceType;
		config.headers.common["OS"] = device.OS;
		config.headers.common["ip"] = device.ip;
		if (user.userId) {
			config.headers.common["userId"] = user.userId;
		}
		console.log(`Request (${config.method}) to "${config.url}"`);
		return config;
	}, () => {
	});
	http.interceptors.response.use((res) => {
		const body = res.data;
		if (body.code !== '200') {
			Alert.alert('', body.errorMsg);
			console.log(body.msg, res.config.url );
			throw new Error(body);
		}
		return res;
	}, (error) => {
		// console.log(error)
		let { response = {}, config = {}, message } = error;
		warn([
			`${message}`,
			`URL: ${config.url}`,
			`Method: ${config.method}`,
			`Status: ${response.status}`,
			`Request headers:\n${formatJson(config.headers)}`,
			`Response headers:\n${formatJson(response.headers)}`,
			`Response data:\n${formatJson(response.data)}`,
		]);
		return Promise.reject(error);
	});
	return http;
}
function handleUrl(url) {
	if (isAbsoluteUrl(url)) {
		return url;
	}
	if (Constants.httpBaseUrl) {
		return `${Constants.httpBaseUrl}${url}`;
	}
	return `http://yryz-dev.yryz.com/yryz${url}`;
}
function isAbsoluteUrl(url) {
	return /^https?:/.test(url);
}
function warn(lines) {
	console.warn(lines.join('\n\n'));
}
function formatJson(object) {
	return JSON.stringify(object, null, 2);
}
export default init;