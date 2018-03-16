<template>
	<div class="showForward">
		<y-downLoadApp :id="id" :routerAddr="routerAddr" @set-tip="setTip"></y-downLoadApp>
		<div class="openApp" @click="handleOpenApp">从悠然一指APP内打开</div>
		<div class="open_app_fail_tips"  v-show="showFailTips" @click="showFailTips = false">
			<div class="tips_main"></div>
		</div>
	</div>
</template>
<script>
	const ua = window.navigator.userAgent;	
	import YDownLoadApp from './downLoadApp';
	import nativeSchema from '../../js/tool-native-schema';

	export default {
		name: 'y-forward',
		components: {
			YDownLoadApp,
		},
		props: {
			id: '',
			routerAddr: '',
		},
		data() {
			return {
				showFailTips: false,
			}
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
					failUrl: ua.indexOf('Android') > -1 ? "http://android.myapp.com/myapp/detail.htm?apkName=com.rz.rz_rrz&ADTAG=mobile" : 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1108712331',
				});
			},
			handleOpenApp() {
				if (this.hasClickOnce)
					return;
				this.hasClickOnce = true;
				if (ua.toLowerCase().match(/micromessenger/i) || ua.toLowerCase().match(/WeiBo/i)) {
					this.showFailTips = true;
				} else {
					this.openApp()
				}
			},
			setTip(status) {
				this.showFailTips = status;
			}
		}
	}
</script>
<style scoped>
	.openApp {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		height: 1.59rem;
		background: #fe5f5f;
		text-align: center;
		font-size: 0.57rem;
		color: #fff;
		line-height: 1.59rem;
		z-index: 999;
	}
</style>