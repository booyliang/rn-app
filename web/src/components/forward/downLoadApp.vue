<template>
	<div class="appdownload" v-show="showDownLoad">
		<div class="logo"><img src="../../assets/yryz@3x.png" ></div>
		<div class="right">
			<button class="btn" :copy-conent="clipboardUrl">立即下载</button>
			<div class="iconfont icon-close" @click="handleShowDownLoad"></div>
		</div>
	</div>
</template>
<script>
	const ua = window.navigator.userAgent;
	import Clipboard  from 'clipboard';
	export default {
		name: 'y-downLoadApp',
		props: {
			id: '',
			routerAddr: '',
		},
		data() {
			return {
				showDownLoad: true,
				clipboardUrl: '',
				showFailTips: false,
			}
		},
		methods: {
			handleShowDownLoad() {
				this.showDownLoad = false;
			},
			handleDownLoad() {
				if ( ua.indexOf('Android') > -1 ) {
					window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.rz.rz_rrz&ADTAG=mobile'
				} else {
					window.location.href = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1108712331'
				}
			}
		},
		mounted() {
			if (ua.indexOf('Android') > -1 ) {
				this.clipboardUrl = `yryzapp://open/${this.routerAddr}/${this.id}`
			} else {
				this.clipboardUrl = `yryzapp://${this.routerAddr}/${this.id}`
			}

			let clipboard = new Clipboard('.btn', {
				text: function (trigger) {
					let copyUrl =  trigger.getAttribute('copy-conent');
					return copyUrl;
				},
			});

			clipboard.on('success', (e) => {
				this.handleDownLoad();
			});
			clipboard.on('error', (e) => {
				this.handleDownLoad();
			});
		}
	}
</script>
<style scoped>
	@import '../../css/var.css';
	.appdownload {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		height: 1.71rem;
		border-bottom: 1px solid #e7e7e7;
		padding: 0 0.5rem;
		background: #fff url(../../assets/logo-new@3x.png) no-repeat  0.5rem center;
		background-size: 0.67rem 0.66rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

 	.logo {
		width: 2.2rem;
		height: 0.47rem;
		margin-left: 0.8rem;

		& img {
			width: 100%;
			height: 100%;
		}
	}

	.right {
		display: flex;
	}

	.btn {
		width: 2.16rem;
		height: 0.78rem;
		background: #fe5f5f;
		font-size: 0.42rem;
		color: #fff;
		text-align: center;
		line-height: 0.78rem;
		border-radius: 0.12rem;
	}

	.icon-close {
		font-size: 0.6rem;
		color:#ddd;
		margin-left: 0.45rem;
	}
</style>