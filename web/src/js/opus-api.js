import axios from 'axios';
import qs from 'qs';
// import Toast from '@/components/toast'
import env from './env'

let axiosInst = axios.create({ timeout: 20000 });
let baseUrl = '';
axiosInst.install = function (Vue) {
	let baseUrls = {
		'localhost': 'http://yryz-dev.yryz.com',
		'dev': 'http://yryz-dev.yryz.com',
		'mo': 'https://yryz-mo.yryz.com',
		'm': 'https://yryz.yryz.com',
		'test': 'http://yryz-test.yryz.com'
	};

	let match = window.location.origin.match(/([A-Za-z]+)?\./)
	if (match && match.length > 1 && match[1]) {
		baseUrl = baseUrls[match[1].toLowerCase()];
	} else {
		baseUrl = baseUrls['localhost'] || '';
	}
	baseUrl += '/yryz';
	this.baseUrl = baseUrl;
	Vue.opusApi = Vue.prototype.$opusApi = this;
	this.interceptors.request.use(function (config) {
		if (config.methods === 'get')
			config.data = qs.stringify(config.data);

		if (!config.url)
			console.log('services请求地址出错', this, config)

		if (config.url.indexOf('http') !== 0)
			config.url = baseUrl + config.url;

		for (let i in env) {
			if (i === 'install')
				continue;
			config.headers.common[i] = env[i];
		}
		return config;
	});

	this.interceptors.response.use(function (res) {
		if (res.data.code !== '200') {
			console.log(res.data.msg);
		}
		return res;
	}, function (error) {
		if (window.location.href.indexOf('web.') === -1 && window.location.href.indexOf('m.') === -1) {
			if (error.message.indexOf('timeout') > -1) {
				alert('操作超时！')
			} else {
				alert(error.toString());
			}
		}
		return Promise.reject(error);
	});
}

export default axiosInst;