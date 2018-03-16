import React from 'react';
import { Dimensions, Platform } from 'react-native';

const { width, height} = Dimensions.get('window');
module.exports = {
	tranformNum(num) { 
		if (num >= 10000) {
			return Math.floor(num / 10000) + 'W';
		}
		return num;
	},
	get cache() { 
		return require('./cache').default;
	},
	parseResponse(res) {
		let result = res.data.data;
		if (!result) return [];
		if (Array.isArray(result.data))
			return result.data;
		if (Array.isArray(result.entities))
			return result.entities;
		if (Array.isArray(result))
			return result;
	},

	isIphoneX() { 
		return Platform.OS === "ios" && width === 375 && height === 812;
	}
};
