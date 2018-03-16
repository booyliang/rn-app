<template>
	<div class="myShare">
		<p class="share-info">{{userData.nickName}}<br/>邀请你加入悠然一指<br/>邀请码为</p>
		<div class="copy-text">{{userData.myInviteCode}}</div>
		<button class="onshare" :copy-content="inviteNum" >接受邀请并下载安装'悠然一指'</button>
		<div class="open_app_fail_tips"  v-show="showFailTips"  @click="showFailTips = false">
			<div class="tips_main"></div>
		</div>
	</div>
</template>
<script>
	const ua = window.navigator.userAgent;
	import Clipboard  from 'clipboard'
	export default {
		data() {
			return {
				userData: {},			// 分享者用户数据
				inviteNum: '',			// 邀请码 
				showFailTips: false,	// 在微信环境中true遮罩层显示
			}
		},
		async created() {
			let res = await this.$http(`/services/app/v1/user/single/local/${this.$route.params.id}`);
			this.userData = res.data.data || {};
			this.inviteNum =  this.userData.myInviteCode || '...';
			if (this.$utils.isWeiXin()) {
				this.$utils.wxShare({
					title: `【悠然一指】您的好友(${this.userData.nickName})邀请加入‘悠然一指’`,
					desc: `您的好友(${this.userData.nickName})邀请加入‘悠然一指’`,
					link: `${window.location.origin}/shareLoad/${this.$route.params.id}`,
					imgUrl: `${window.location.origin}/static/shareicon.png`, 
				})
			}
		},
		
		methods: {
			// 下载地址
			openDownAppUrl() {
				if (ua.indexOf('Android') > -1) { // 安卓手机
					window.location.href = "http://android.myapp.com/myapp/detail.htm?apkName=com.rz.rz_rrz&ADTAG=mobile";
				} else { // 苹果手机
					window.location.href = "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1108712331";
				}
			}
		},
		mounted() {
			// 复制剪切板内容
			let clipboard = new Clipboard('.onshare', {
				text: function (trigger) {
					return trigger.getAttribute('copy-content');
				}
			});

			// 复制成功后 下载app 
			clipboard.on('success',  (e) => {
				if (ua.toLowerCase().match(/micromessenger/i) || ua.toLowerCase().match(/WeiBo/i)) {
					this.showFailTips = true;
				} else {
					this.openDownAppUrl();
				}
			});
			clipboard.on('error', (e) => {
				if (ua.toLowerCase().math(/micromessenger/i) || ua.toLowerCase().match(/WeiBo/i)) {
					this.showFailTips = true;
				} else {
					this.openDownAppUrl();
				}
			});
			
		},
	}
</script>
<style scoped>
	.myShare {
		min-height: 100vh;
		min-width: 100vw;
		background: #fd574d url(../assets/mydownload-bg.jpg) no-repeat center top;
		background-size: contain;
		padding-top: 52vh;
	}
	.share-info {
		text-align: center;
		font-size: 0.54rem;
		line-height: 0.72rem;
		color: #331b73;
	}
	.copy-text {
		margin-top: 0.75rem;
		text-align: center;
		font-size: 0.9rem;
		color: #fa4d3d;
	}
	.btn-copy {
		display: block;
		line-height: 0;
		width: 6rem;
		height: 1.05rem;
		background: url(../assets/copy-text.png) no-repeat center;
		background-size: contain;
		margin: 0.6rem auto 0;
	}
	.onshare {
		position: fixed;
		bottom: 8.2vh;
		left: 50%;
		margin-left: -4.5rem;
		display: block;
		width: 9rem;
		height: 1.29rem;
		font-size: 0.57rem;
		color: #d51d11;
		text-align: center;
		background: #fddf59;
		border-radius: 0.27rem;
	}
</style>