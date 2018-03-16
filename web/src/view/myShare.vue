<template>
	<div class="myShare">
		<div class="copy-text">
			{{userData.myInviteCode}}
			<button class="btn-copy" :copy-content="copyContent">复制</button>
		</div>
		<p class="invite-num" v-show="false">成功邀请:<em>12</em>人</p>
		<button class="onshare" @click.stop.prevent="clickShare">一键邀请好友</button>
		<transition name="popup">
			<div v-show="showToast" class="popup" @click="showToast = false">邀请码复制成功，快分享给好友吧</div>
		</transition>
	</div>
</template>
<script>
	import Clipboard  from 'clipboard'
	export default {
		data() {
			return {
				userData: {},
				copyContent: '',
				shareData: {},
				showToast: false,
			}
		},
		async created() {
			let res = await this.$http(`/services/app/v1/user/single/local/${this.$route.params.id}`);
			this.userData = res.data.data || {};
			this.copyContent =  `您的好友(${this.userData.nickName})邀请你加入‘武汉融众’旗下‘悠然一指’，邀请码为：${this.userData.myInviteCode}，iOS 下载：https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1108712331，Android 下载：http://android.myapp.com/myapp/detail.htm?apkName=com.rz.rz_rrz&ADTAG=mobile`
		},
		mounted() {
			// 复制邀请码
			let clipboard = new Clipboard('.btn-copy', {
				text: function (trigger) {
					let content =  trigger.getAttribute('copy-content');
					return content
				}
			});
			clipboard.on('success', (e) => {
				this.showToast = true;
				setTimeout(() => {
					this.showToast = false;
				}, 800)
			});
			clipboard.on('error', (e) => {
				let mes = {data: this.copyContent, type: 'myshareClip'};
				window.postMessage(JSON.stringify(mes), window.origin);
			})

			this.hideNativeMenu();
		},
		methods: {
			clickShare() {
				let shareData = {
					content: `您的好友(${this.userData.nickName})邀请加入‘悠然一指’`,
					url: `${window.location.origin}/shareload/${this.$route.params.id}`,
					title: '悠然一指',
					image: '',
				}
				let message = {data: shareData, type: 'share'}
				window.postMessage(JSON.stringify(message), window.origin )
			},

			hideNativeMenu() {
				window.postMessage(JSON.stringify({
					type: 'hide-menu'
				}), window.origin);
			}
		}
	}
</script>
<style scoped>
	.myShare {
		min-height: 100vh;
		min-width: 100vw;
		background: #fd574d url(../assets/mydown-bg.jpg) no-repeat center top;
		background-size: contain;
		padding-top: 58vh;
	}
	.copy-text {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 0.9rem;
		color: #fa4d3d;
	}
	.btn-copy {
		padding: 0 0.21rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background: #92bfff;
		font-size: 0.42rem;
		color: #fff;
		border-radius: 0.15rem;
		margin-left: 0.6rem;
	}
	.invite-num {
		margin-top: 1.2rem;
		text-align: center;
		font-size: 0.54rem;
		color: #331b73;

		& em {
			color: #fa4d3e;
		}
	}
	.onshare {
		position: fixed;
		bottom: 8.2vh;
		left: 50%;
		margin-left: -4.05rem;
		display: block;
		width: 8.1rem;
		height: 1.29rem;
		font-size: 0.57rem;
		color: #d51d11;
		text-align: center;
		background: #fddf59;
		border-radius: 0.27rem;
	}
	.popup {
		position: fixed;
		top: 50vh;
		left: 50%;
		width: 60vw;
		padding: 1rem 0.3rem;
		border-radius: 0.3rem;
		background: rgba(0,0,0,0.5);
		color: #fff;
		font-size: 0.45rem;
		margin-left: -30vw;
		z-index: 999;

		&.popup-enter-active,
		&.popup-leave-active {
			transition: opacity 0.4s;
		}
		&.popup-enter,
		&.popup-leave-to {
			opacity: 0;
		}

		& > :last-child {
			position: relative;
		}
	}

</style>