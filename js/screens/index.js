import React from 'react';
import { TabNavigator, StackNavigator, TabBarTop } from 'react-navigation';
import { StyleSheet, View, Toast, YIcon, Icon, Platform } from '@components';
import styles from '@styles';
import DemoScreen from './demo/DemoScreen';
import categoryRoutes from './category/routes';
import actRoutes from './act/routes';
import discoverRoutes from './discover/routes';
import profileRoutes from './profile/routes';
import searchRoutes from './search/routes';
import appRoutes from './app/routes';
import YWebViewRoutes from './webview/routes';
import HomeScreen from './home/Home';
import Act from './act/Act';
import Witkey from './discover/Witkey';
// import Discover from './discover/Discover';
import Subject from './discover/Subject';
import ProfileScreen from './profile/ProfileScreen';
import { connect } from 'react-redux';
import Category from './category/Category';
import platform from './platform';

import {
	onNavigationStateChange,
	setNavigator,
	net
} from '@services';

// 消息
let mapStateTopPorps = (state) => {
	return {
		pushCount: state.jpush.pushCount
	};
};

// 消息显示红点 我的
@connect(mapStateTopPorps)
class TabUserIcon extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View>
				{this.renderUserPushCount()}
				<YIcon
					name={this.props.focused ? 'user-s' : 'user-o'}
					size={24}
					style={{ color: this.props.tintColor }}
				/>
			</View>
		);
	}
	renderUserPushCount() {
		if (this.props.pushCount > 0) {
			return (<YIcon name='circle' size={8} style={style.circle} />);
		}
	}
}

// function tabOptions(title, iconName, focusedIcon) {
// 	focusedIcon = focusedIcon || iconName;
// 	return ({ navigation }) => {
// 		return {
// 			tabBarLabel: title,
// 			tabBarIcon: ({ tintColor, focused }) => (
// 				<YIcon
// 					name={focused ? focusedIcon : iconName}
// 					size={26}
// 					style={{ color: tintColor }}
// 				/>
// 			),
// 		};
// 	};
// }
let tabNavRouteConfig = {
	HomeTab: {
		screen: HomeScreen,
		path: '/',
		navigationOptions: {
			tabBarLabel: '首页',
			tabBarIcon: ({ tintColor, focused }) => (
				<YIcon
					name={focused ? 'home-s' : 'home-o'}
					size={24}
					style={{ color: tintColor }}
				/>
			),
		},
	},
	SubjectTab: {
		screen: Subject,
		navigationOptions: ({ navigation }) => ({
			// tabBarLabel: () => () => null,
			tabBarLabel: '专题',
			tabBarIcon: ({ tintColor, focused }) => (
				<YIcon
					name={focused ? 'category-s' : 'category-o'}
					size={22}
					style={{ color: tintColor }}
				/>
			),
		}),
	},
	CategoryTab: {
		screen: Category,
		path: '/category',
		navigationOptions: {
			tabBarLabel: '百科',
			tabBarIcon: ({ tintColor, focused }) => (
				<YIcon
					name={focused ? 'baike-s' : 'baike-o'}
					size={22}
					style={{ color: tintColor }}
				/>
			),
		},
	},
	ActTab: {
		screen: Act,
		path: '/act',
		navigationOptions: {
			tabBarLabel: '活动',
			tabBarIcon: ({ tintColor, focused }) => (
				<YIcon
					name={focused ? 'balloon-s' : 'balloon-o'}
					size={24}
					style={{ color: tintColor }}
				/>
			),
		},
	},
	// DiscoverTab: {
	// 	screen: Discover,
	// 	path: '/discover',
	// 	navigationOptions: {
	// 		tabBarLabel: '发现',
	// 		tabBarIcon: ({ tintColor, focused }) => (
	// 			<YIcon
	// 				name={focused ? 'discover-s' : 'discover-o'}
	// 				size={24}
	// 				style={{ color: tintColor }}
	// 			/>
	// 		),
	// 	},
	// },
	ProfileTab: {
		screen: ProfileScreen,
		path: '/profile/:id',
		navigationOptions: ({ navigation }) => ({
			tabBarLabel: '我的',
			tabBarIcon: ({ tintColor, focused }) => (
				<TabUserIcon tintColor={tintColor} focused={focused} />
			),
		}),
	},
};
const tabNavRoute = platform.tabs.reduce((result, tabName) => {
	return Object.assign(result, {
		[tabName]: tabNavRouteConfig[tabName]
	});
}, {});

if (__DEV__) {
	tabNavRoute.DemoTab = {
		screen: DemoScreen,
		path: '/demo',
		navigationOptions: ({ navigation }) => ({
			tabBarLabel: 'Demo',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					name="ios-basket"
					size={24}
					style={{ color: tintColor }}
				/>
			),
		}),
	};
}

// const tabNavRoute = {};
// for (let tab of tabBarConfig) {
// 	if (allTabs[tab]) {
// 		tabNavRoute[tab] = allTabs[tab]
// 	}
// }
const TabNav = TabNavigator(tabNavRoute,
	{
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: false,
		getLabel: () => { Toast.show({ text: 's' }); },
		lazy: true,
		tabBarComponent: TabBarTop,
		tabBarOptions: {
			showIcon: true,
			inactiveTintColor: '#8f8f8f',
			labelStyle: {
				fontSize: 12,
				marginTop: Platform.OS === 'android' ? 3 : 5,
			},
			style: {
				backgroundColor: '#fff',
				height: styles.homeTabBottonHeight,
				borderColor: '#e8e8e8',
				borderTopWidth: 1,
				elevation: 0,
			},
			tabStyle: {
				padding: 0,
				paddingTop: 4,
			},
			indicatorStyle: { backgroundColor: "transparent" },
			activeTintColor: styles.themeColor,
		}
	}
);

let routes = {
	Root: {
		screen: TabNav,
	},
	...actRoutes,
	...categoryRoutes,
	...discoverRoutes,
	...searchRoutes,
	...profileRoutes,
	...appRoutes,
	...YWebViewRoutes,

};

const prefix = Platform.OS === 'android' ? 'yryzapp://open/' : 'yryzapp://';
const AppNavigator = StackNavigator(routes, { headerMode: "none" });

export default class extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<AppNavigator onNavigationStateChange={onNavigationStateChange}
				ref={(nav) => { setNavigator(nav); }}
				uriPrefix={prefix} />
		);
	}

	componentDidMount() {
		net.init();
	}
};

const style = StyleSheet.create({
	circle: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: styles.themeColor,
		zIndex: 2,
		backgroundColor: 'transparent'
	}
});
