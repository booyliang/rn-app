import * as navigation from './navigation';

module.exports = {
	get sign() { 
		return require('./sign').default;
	},
	get share() { 
		return require('./share').default;
	},
	get Validator() { 
		return require('./Validator').default;
	},
	get net() { 
		return require('./net').default;
	},
	get http() { 
		return require('./http').default;
	},
	get eventBus() { 
		return require('./eventBus').default;
	},
	get onNavigationStateChange() { 
		return navigation.onNavigationStateChange;
	},
	get onRouteChange() { 
		return navigation.onRouteChange;
	},
	get offRouteChange() { 
		return navigation.offRouteChange;
	},
	get setNavigator() { 
		return navigation.setNavigator;
	},
	get navigate() { 
		return navigation.navigate;
	},
	get goBack() { 
		return navigation.goBack;
	},
	
};