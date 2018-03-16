import {
	NativeModules
} from 'react-native';

const YShareSDK = NativeModules.YShareSDK || {
	isClientInstalled() {
		return Promise.resolve(true);
	},

	share() {
		alert('Cannot share in Expo.');
		return Promise.reject();
	},

	authorizeLogin() {
		alert('Cannot sign in by third-party in Expo.');
		return Promise.reject();
	},

};

export default YShareSDK;