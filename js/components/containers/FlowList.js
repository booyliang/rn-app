
import React, { Component } from 'react';
import { Text, View, FlatList, Animated } from 'react-native';
import {  withPage } from "../hoc";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
@withPage
export default class FlowList extends Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		onEndReachedThreshold: 0.9,
		showsVerticalScrollIndicator: false,
		renderItem: ({ item }) => <View style={{ height: 60 }}><Text>没有定义renderItem</Text></View>

	}
	setNativeProps(props) { 
		this._root.setNativeProps(props);
	}
	getScrollView() { 
		return this._root;
	}
	
	render() {
		let props = this.props;
		let FlatListComponent = props.useAnimated ? AnimatedFlatList : FlatList;
		return (
			<FlatListComponent
				ref={(e) => this._root = e}
				{...this.props}
			/>
		);
	}



};
