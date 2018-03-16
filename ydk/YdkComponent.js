import React, { Component } from 'react';
import { View } from 'react-native'
import JPushActivity from './JPushActivity'
import { NativeModules } from 'react-native'; 
export default class extends Component {
	render() {
		if(NativeModules.YCommon)
			return (<JPushActivity />) 
		return null;
	}

}