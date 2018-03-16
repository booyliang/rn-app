import { emit, off, on } from './eventBus';
import { NativeModules } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { YZhugeIo } from '@ydk';

function getCurrentRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if (route.routes) {
		return getCurrentRouteName(route);
	}
	return route.routeName;
}

export function onNavigationStateChange(prevState, currentState) {
	const currentScreen = getCurrentRouteName(currentState);
	const prevScreen = getCurrentRouteName(prevState);
	if (prevScreen === currentScreen)
		return;
	console.log('current screen ' + currentScreen);
	emit('onNavigationStateChange', currentScreen, prevScreen);
	if (currentScreen == 'DiscoverTab') {
		YZhugeIo.track('发现', {
			// 'userId': ''
		});


	}
	if (currentScreen == 'CategoryTab') {
		YZhugeIo.track('首页_百科', {
			// 'userId': ''
		});


	}
	if (currentScreen == 'ActTab') {
		YZhugeIo.track('活动', {
			// 'userId': ''
		});


	}

}
export function onRouteChange(listener) {
	on('onNavigationStateChange', listener);

}
export function offRouteChange(listener) {
	off('onNavigationStateChange', listener);
}

let navigator = null;
export function setNavigator(nav) {
	navigator = nav;
}
export function navigate(routeName, params) {
	if (navigator) {
		const action = NavigationActions.navigate({ routeName, params });
		navigator.dispatch(action);
	}
}

export function goBack() {
	if (navigator) {
		const action = NavigationActions.back({});
		navigator.dispatch(action);
	}
}