import { http } from '../services';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
export default async function cache(req, cb) {
	if (typeof req === "string") {
		req = { url: req };
	}

	let { url, params = {} } = req;
	let key = url + "?" + qs.stringify(params);
	let data = await AsyncStorage.getItem(key);
	if (data) {

		cb(JSON.parse(data), 'fromcache');
	}
	let res = await http(req);
	await AsyncStorage.setItem(key, JSON.stringify(res));
	cb(res, 'fromhttp');
}