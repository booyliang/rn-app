import Vue from 'vue';

let env = {
	// sign: "", // 未知
	// token: "", // 接口访问凭证
	// appVersion: "", // APP版本
	// v: "", // 未知
	// deviceType: "3", // 1： IOS，2：安卓
	// deviceId: "", // 设备名称
	// devId: "", // 当前访问设备id
	// ip: "", // 当前网络ip
	// OS: "", // 网络环境
	// custId: "", // 765npt1huu 0u66cgvpvk 8qjl93ryu3  0m8xwqgrxd  r3l7bbgi 7onb1acsux 2mladd0xal 4qqcxnbnht
	userId: '', // 66
	// cityCode: "",
	// gps: ""
};

env.install = function (Vue) {
	Vue.prototype.$env = Vue.env = env;
}

export default env;