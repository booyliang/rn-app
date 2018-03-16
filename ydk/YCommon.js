import { NativeModules } from 'react-native';
const defaultCommon = {
	// deviceId: '',
	// appVersion: '',
	// deviceType: '',
	// ip: '',
	// OS: '',
	channel: 'Expo',
	closeLoadingPage() {

	},
	changeBadgeCount(count) {

	},
	async getDeviceInfo() {
		return {
			deviceId: "defaultId",
			appVersion: "1.0.0",
			deviceType: "1",
			ip: "",
			OS: ""
		}
	},
	async getCacheSize() {
		console.log('getCacheSize')
	},
	async clearCache(cacheInfo) {
		console.log('clearCache')
	},
	// async getStatusBarType() {
	// 	return status_bar_transparent
	// }

	async setMsgToClip() {
		console.log('setMsgToClip')
	},

	async getRigsterId() {
		return 'registerId';
	},

	async setWallpaper(source) {
		return 'imgPath';
	},

	async saveImage(source) {
		throw new Error('Cannot save Images in Expo.');
	}

}

const status_bar_transparent = "3";



let { YCommon = defaultCommon } = NativeModules;
export default YCommon;