<template>
	<div class="recruitment">
		<div class="img-container img01"></div>
		<div class="img-container img02"></div>
		<div class="img-container img03"></div>
		<div class="img-container img04"></div>
		<div class="img-container img05"></div>
		<div class="img-container img06" @click="viewArticle"></div>
		<div class="img-container img07"></div>
		<div class="img-container img08">
			<a class="btn" @click="showPopup = true"></a>
		</div>
		<div class="img-container img09"></div>
		<div class="img-container img10">
			<img :src="imgUrl" class="qrcode" alt="">
			<a class="join_btn" :class="{disabled: fullFlag}" @click="toJoin">{{btnText}} <span>剩余名额{{memberCount}}</span></a>
		</div>
		<transition name="popup">
			<div class="popup" v-if="showPopup">
				<div class="popup-body">
					<span class="close_btn" @click="showPopup = !showPopup"></span>
					<img :src="imgUrl" alt="">
					<a class="btn" @click="saveImg" v-show='showSaveButton'>保存二维码</a>
					<div class="text">
						<p>1、保存二维码至手机，在微信中识别</p>
						<p>2、或直接添加小悠微信： <span class="copy-text">{{copyContent}}</span> <span class="copy_btn" :copy-content="copyContent">点击复制</span></p>
					</div>
				</div>
			</div>
		</transition>
		<div class="mask" v-if="showPopup"></div>
	</div>
</template>
<script>
	import Clipboard  from 'clipboard'
	export default {
		data() {
			return {
				showPopup: false,
				memberCount: 0,
				fullFlag: false,
				copyContent: 'yryz77',
				imgUrl: '/static/qrcode.png',
				showSaveButton: typeof window === "undefined" // window.__yryz
			}
		},
		computed: {
			btnText() {
				return this.fullFlag ? "名额已满" : "我要参加";
			}
		},
		async mounted() {
			let clipboard = new Clipboard('.copy_btn', {
				text: function (trigger) {
					let content =  trigger.getAttribute('copy-content');
					return content
				}
			});
			clipboard.on('success', (e) => {
				this.$toast('复制成功！');
			});
			clipboard.on('error', (e) => {
				let mes = {data: this.copyContent, type: 'myshareClip'};
				window.postMessage(JSON.stringify(mes), window.origin);
			});

			let res = await this.$http(`/services/app/v1/company/activityCompanyCount`);
			this.resData = res.data.data || {};
			this.memberCount = this.resData.memberCount;
			this.fullFlag = this.resData.fullFlag;
		},
		methods: {
			saveImg() {
				let imgUrl = `${window.location.origin}/static/qrcode.png`;
				let imgData = {data: imgUrl, type: 'saveImage'}
				window.postMessage(JSON.stringify(imgData), window.origin )
				// this.$toast('保存成功！');
			},
			viewArticle() {
				this.$router.push({'name': 'articleSpec'});
			},
			toJoin() {
				if (this.fullFlag) return;
				window.location.href = "http://youranyizhi.mikecrm.com/MHkpPar";
			}
		}
	}
</script>
<style scoped>
	.recruitment {
		min-height: 100vh;
		min-width: 100vw;
		& .img-container {
			position: relative;
			background-size: cover;
			background-position: center;
			&.img01 {
				height: 7.19rem;
				background-image: url(../assets/zm_01.png);
			}
			&.img02 {
				height: 7.18rem;
				background-image: url(../assets/zm_02.png);
			}
			&.img03 {
				height: 7.19rem;
				background-image: url(../assets/zm_03.png);
			}
			&.img04 {
				height: 7.18rem;
				background-image: url(../assets/zm_04.png);
			}
			&.img05 {
				height: 8.38rem;
				background-image: url(../assets/zm_05.png);
			}
			&.img06 {
				height: 1.48rem;
				background-image: url(../assets/zm_06.png);
			}
			&.img07 {
				height: 11.73rem;
				background-image: url(../assets/zm_07.png);
			}
			&.img08 {
				height: 7.18rem;
				background-image: url(../assets/zm_08.png);
				& .btn{
					position: absolute;
					top: 1.8rem;
					left: 50%;
					margin-left: -2.26rem;
					display: inline-block;
					width: 4.52rem;
					height: 1rem;
				}
			}
			&.img09 {
				height: 7.19rem;
				background-image: url(../assets/zm_09.png);
			}
			&.img10 {
				height: 7.18rem;
				background-image: url(../assets/zm_10.png);
				& .qrcode{
					position: absolute;
					top: 0.6rem;
					left: 50%;
					margin-left: -1.77rem;
					width: 3.53rem;
					height: 3.53rem;
				}
				& .join_btn{
					position: absolute;
					right: 0.6rem;
					bottom: 3.6rem;
					display: flex;
					justify-content: center;
					flex-direction: column;
					width: 2.78rem;
					height: 2.78rem;
					background-color: #6091ff;
					color: #fff;
					font-size: 0.5rem;
					text-align: center;
					border-radius: 100%;
					& > span {
						font-size: 0.34rem;
					}
					&.disabled {
						background-color: #ccc;
					}
				}
			}
		}
	}
	.popup, .mask{
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, .5);
		z-index: 998;
	}
	.popup {
		display: flex;
		justify-content: center;
		z-index: 999;
		& .popup-body{
			position: relative;
    		z-index: 1000;
			align-self: center;
			padding: 1.43rem 0.6rem;
			background: #fff;
			color: #56387c;
			font-size: 0.46rem;
			text-align: center;
			min-height: 11rem;
			width: 10.56rem;
			border-radius: 0.5rem;
			& .btn{
				position: relative;
				display: inline-block;
				width: 4.48rem;
				height: 0.99rem;
				line-height: 0.99rem;
				color: #fff;
				background: url(../assets/btn.png) center no-repeat;
				background-size: 100% auto;
				margin-bottom: 1.2rem;
				line-height: 0.99rem;
			}
			& img{
				width: 6.04rem;
				display: block;
				margin: auto;
				border: .08rem solid #f5f5f5;
				margin-bottom: 0.66rem;
			}
			& p {
				text-align: left;
			}
			& .copy_btn {
				color: #6091ff;
			}
			& .close_btn{
				position: absolute;
				top: -1.99rem;
				right: 0.3rem;
			}
		}
	}
	.popup-enter-active,
	.popup-leave-active {
		transition: opacity 0.2s;
		transform: translateY(0);
	}
	.popup-enter,
	.popup-leave-to {
		opacity: 0;
		transform: translateY(50);
	}
	.close_btn{
		display: inline-block;
		width: 1.05rem;
		height: 2.01rem;
		background-image: url(../assets/closeBtn.png);
		background-repeat: no-repeat;
		background-size: contain;
	}
</style>