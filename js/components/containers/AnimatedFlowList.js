import React, { Component } from 'react';
import {  View, Animated, Platform} from 'react-native';
import FlowList  from './FlowList';
export default class AnimatedFlowList extends Component {
	static defaultProps = {
		renderHeader: () => (<View />) 
	}
	state = {
		
		headerHeight: 0,
	}
	componentDidMount() { 
	
	}
	componentWillMount() { 
		this.scrollY = new Animated.Value(0);
	}
	_renderHeader = () => {
		let { headerHeight, maxScrollHeaderHeight } = this.props;
		maxScrollHeaderHeight = maxScrollHeaderHeight || headerHeight;
		const headerTranslate = this.scrollY.interpolate({
			inputRange: [0, maxScrollHeaderHeight],
			outputRange: [0, -maxScrollHeaderHeight],
			extrapolate: 'clamp',
		});
		// const headerElement =this.props.renderHeader()
		return (<Animated.View
			style={[{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				overflow: 'hidden',
				zIndex: 1
				
			},
			{ transform: [{ translateY: headerTranslate }] }, ]}
		>
			<View >	
				{this.props.renderHeader()}	
			</View>
		</Animated.View>);

	}
	// _handleHeaderLayout = (e) => { 
	// 	const { nativeEvent: { layout: { width, height } } } = e;
	// 	// console.log('headerHeight',height)
	// 	if (!this.didMount || height === 0)
	// 		return;
	// 	requestAnimationFrame(() => { 
	// 		this.setState({ headerHeight: height }, () => { 
	// 			this.marginTop = height;
	// 		});
	// 	});

	// }
	_onScroll = (e) => { 
		if (Platform.OS === 'android') { 
		
		}
		// let currOffsetY = e.nativeEvent.contentOffset.y;
		// if (currOffsetY < 0) return;
		// let marginTop = -Math.min(currOffsetY, this.state.headerHeight);
		// this._scrollView.setNativeProps({ style: {marginTop}})
	}
	renderListHeader = () => { 
		if (Platform.OS !== 'android') { 
			return null;
		}
		return <View style={{
			height: this.props.headerHeight
		}} ref={component => { this._listHeader = component; }}/>;
	}
	getFlowListStyle = () => { 
		let { headerHeight, maxScrollHeaderHeight } = this.props;
		let flowListStyle =  {
			flex: 1,
			backgroundColor: 'transparent',
			overflow: 'visible'
		};
		if (Platform.OS !== 'android') { 
			flowListStyle.marginTop = headerHeight;
		}
		return flowListStyle;
	}
	render() {
	// marginTop
		return (<View 	style={{ flex: 1, overflow: 'hidden' }}
		>
			{this._renderHeader()} 
			<FlowList {...this.props}
				useAnimated={true}
				refreshControlOptions={{progressViewOffset: this.props.headerHeight}}	
				
				style={this.getFlowListStyle()}
				ListHeaderComponent={this.renderListHeader}
				ref={component => { this._scrollView = component; }}
				
				scrollEventThrottle={1}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
					{ useNativeDriver: true, listener: this._onScroll.bind(this)},
				)}
			/>
		</View>
		);	
	}
}


