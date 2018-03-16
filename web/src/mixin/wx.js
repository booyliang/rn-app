// const sha1 = require("js-sha1");
// const APP_ID = "wxcabfd4d1be9ad0ca";
// const APP_SECRET = "782296dedca6ff6e9e2c70e0f9b46d61";
// import Utils from "./../utils";
// import axios from 'axios';
// import { Util } from "./../utils";
// export default {
// 	methods: {
// 		async wxConfig(url) {
// 			url = window.location.origin + url;
// 			let state = true;
// 			let signature = "";
// 			let yryz_wx_signature = window.localStorage.getItem("yryz_wx_signature");
// 			if (!yryz_wx_signature) {
// 				state = false;
// 			}
// 			if (yryz_wx_signature) {
// 				yryz_wx_signature = JSON.parse(yryz_wx_signature);
// 				signature = yryz_wx_signature.signature;
// 				let timeDiff = new Date() - new Date(yryz_wx_signature.date);
// 				if (timeDiff / 1000 >= 7200) {
// 					state = false;
// 				}
// 			}
// 			// 签名的时间戳
// 			const timestamp = Utils.timeStr(null, 's');
// 			// 随机串
// 			let noncestr = "";
// 			const character = "abcdefghijklmnopqrstuvwxyz012345";
// 			character.split("").forEach(() => {
// 				const index = Utils.randomScope(30, 0);
// 				noncestr += character[index];
// 			});
// 			// 签名signtrue
// 			if (!state) {
// 				// 获取(access_token) 
// 				const accessRes = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`);
// 				let accessData = accessRes.data;
// 				if (accessData.errcode) {
// 					return false;
// 				}
// 				// 获取jsapi_ticket
// 				let ticket = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessData.access_token}&type=jsapi`);
// 				ticket = ticket.data;
// 				if (ticket.errorCode === 0) {
// 					// 生成JS-SDK权限验证的签名
// 					// 2. ticket
// 					const jsapi_ticket = ticket.ticket;
// 					const string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
// 					// 获取签名
// 					signature = sha1(string1);
// 					const signatureStorage = JSON.stringify({date: Utils.timeStr(null, 's'), signature});
// 					window.localStorage.setItem("yryz_wx_signature", signatureStorage);
// 				} else {
// 					return false;
// 				}
// 			}

// 			window.wx.config({
// 				debug: true, 
// 				appId: APP_ID,
// 				timestamp: timestamp, 
// 				nonceStr: noncestr, 
// 				signature: signature,
// 				jsApiList: [
// 					'onMenuShareAppMessage'
// 				]
// 			});
// 			return true;
// 		},
// 		onMenuShareAppMessage(options) {
// 			window.wx.onMenuShareAppMessage({
// 				title: options.title || "", 
// 				desc: options.desc || "",
// 				link: options.link || "",
// 				imgUrl: options.imgUrl || "",
// 				type: options.type || "link",
// 				dataUrl: options.dataUrl || "",
// 				success: options.success || new Function(),
// 				cancel: options.cancel || new Function()
// 			});
// 		}
// 	}
// }