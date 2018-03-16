<template>
	<div class="downLoad-wrap">
		<div class="downLoad">
			<button class="btn ios"  data-clipboard-target = '#inputcopyContent'></button>
			<button class="btn andr"  data-clipboard-target= '#inputcopyContent'></button>
		</div>
		<input id= "inputcopyContent" type="text" style="display:none" v-model = "copyContent"/>
		<div class="open_app_fail_tips"  v-show="showFailTips">
			<div class="tips_main"></div>
		</div>
	</div>
</template>
<script>
	const ua = window.navigator.userAgent;			
	import Clipboard  from 'clipboard'
	import nativeSchema from '../js/tool-native-schema'
	export default{
		name: 'y-downLoadApp',
		data() {
			let copyContent = '';
			return {
				showFailTips: false,
				copyContent,
			}
		},
		props: {
			id: '',
			routerAddr: '',
			
		},
	
		methods: {
			openApp() {
				nativeSchema.loadSchema({
					// 某个schema协议，例如login,
					schema: ua.indexOf('Android') > -1 ? `open/${this.routerAddr}/${this.id}` :  `${this.routerAddr}/${this.id}`,
					// schema头协议，
					protocal: "yryzapp",
					// 发起唤醒请求后，会等待loadWaiting时间，超时则跳转到failUrl，默认3000ms
					loadWaiting: 3000,

					// 唤起失败时的跳转链接，默认跳转到应用商店下载页
					failUrl: ua.indexOf('Android') > -1 ? "http://163.com" : 'http://baidu.com',
				});
			}
		},
		mounted() {
			if (ua.indexOf('Android') > -1 ) {
				this.copyContent = `yryzapp://open/${this.routerAddr}/${this.id}`
			} else {
				this.copyContent = `yryzapp://${this.routerAddr}/${this.id}`
			}

			// 复制剪切板
			let clipboard = new Clipboard('.btn', {
				text: function (trigger) {
					return document.getElementById('inputcopyContent').value
				},
			});
			
			clipboard.on('success', (e) => {	
				if (ua.toLowerCase().match(/micromessenger/i)) {
					this.showFailTips = true;
				} else {
					this.openApp();
				}
			});
			clipboard.on('error', (e) => {
				this.openApp();
			});
		}
	}
</script>
<style scoped>
	.downLoad-wrap {
		padding-top: 2.26rem;
	}
	.downLoad {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2.26rem;
		background: url(../assets/download-bg.jpg) center no-repeat;
		background-size: contain;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.btn {
		width: 4.8rem;
		height: 1.26rem;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
	.ios {
		background-image: url(../assets/ios.png);
	}
	.andr {
		background-image: url(../assets/android.png);
	}

</style>