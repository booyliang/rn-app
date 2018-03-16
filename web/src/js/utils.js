import Vue from 'vue';
import env from './env';
import EventBus from './event-bus';
import http from './http';
import wx from 'weixin-js-sdk';
import toast from '../components/toast';

let utils = {
	getUrlKey(key) {
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) return decodeURIComponent(r[2]);
		return null;
	},
	parseQueryString(url) {
		var reg_url = /^[^\?]+\?([\w\W]+)$/,
			reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g,
			arr_url = reg_url.exec(url),
			param = {};
		if (arr_url && arr_url[1]) {
			var str_para = arr_url[1], result;
			while ((result = reg_para.exec(str_para)) !== null) {
				param[result[1]] = result[2];
			}
		}
		return param;
	},
	isWeiXin() {
		let ua = navigator.userAgent.toLowerCase();
		return !!ua.match(/micromessenger/i);
	},
	wxOauth(redirectUri) {
		if (!redirectUri) {
			console.error('redirectUri is null');
			return false;
		}
		let oauth = sessionStorage.getItem('oauth');
		if (oauth && this.getUrlKey('userId')) {
			sessionStorage.removeItem('oauth');
			sessionStorage.setItem('loginInfo', JSON.stringify(this.parseQueryString(window.location.href)));
			window.location.replace(redirectUri);
			return false;
		}
		sessionStorage.setItem('oauth', 'true');
		window.location.href = `${http.baseUrl}/services/app/v1/weixin/authorization/launch?redirectUri=${redirectUri}`
	},
	setLoginInfo() {
		let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
		env.userId = loginInfo['userId'];
	},
	async wxShare(params) {
		let _url = encodeURIComponent(window.location.href.split('#')[0]);
		// _url = _url.split('isappinstalled')[0], _url = _url.split('from')[0], _url.slice(0, _url.length - 1);
		let res = await http.get(`/services/wx/v1/api/config/getConfig?url=${_url}`);
		let body = res.data;
		if (body.code !== '200') {
			toast(body.errorMsg);
			return false;
		}
		let data = body.data;
		let shareData = {
			title: params.title || '悠然一指',
			desc: params.desc || '悠然一指',
			link: params.link,
			imgUrl: params.imgUrl || '', // 不传设置默认分享图
			trigger: params.trigger || function (res) { },
			success: params.success || function (res) {
				toast('分享成功')
			},
			cancel: params.cancel || function (res) {
				toast('取消分享')
			},
			fail: params.fail || function (res) {
				toast(JSON.stringify(res));
			}
		}

		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.appid, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.noncestr, // 必填，生成签名的随机串
			signature: data.signature, // 必填，签名，见附录1
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
			] // 必填，需要使用的JS接口列表，
		});

		wx.ready(function () {
		
			wx.onMenuShareTimeline(shareData);
			wx.onMenuShareAppMessage(shareData);
			wx.onMenuShareQQ(shareData);
			wx.onMenuShareWeibo(shareData);
		});

		wx.error(function (res) {
			// toast(JSON.stringify(res.errMsg));
		});
	}
}

utils.install = function (Vue) {
	Vue.prototype.$utils = Vue.utils = utils;
}

export default utils;