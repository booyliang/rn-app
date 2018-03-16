<template>
	<div class="activity-wechat-voice-wrap">
		<img src="../../assets/activity/qrcode@3x.png" alt="" class="share_img">
		<div class="add_wx" v-if="showWX" @click="showWX = false">
			<div>
				<div>领奖方式</div>
				<div>添加客服微信：yryz77</div>
			</div>
		</div>
		<div v-if="!isShowRank">
			<!-- 下架 -->
			<div class="error_404" v-if="error_404">
				<div class="content_404">
					<div><img src="../../assets/activity/404@3x.png" alt=""></div>
					<div>
						<p>Hey有才华的你 ，</p>
						<p>这次请根据我们的要求重新</p>
						<p>说出你的拜年祝福吧！</p>
					</div>
				</div>
				<div><img src="../../assets/activity/cut_line@3x.png" alt=""></div>
			</div>
			<!-- 作品详情 -->
			<div v-else>
				<div class="head_tips">
					<div>小伙伴们，我在参加</div>
					<div class="head_title">#悠然一指方言拜年赢现金#活动</div>
					<div>快来为我投票助力吧！</div>
				</div>
				<div class="user" v-if="infoData">
					<div class="user_info">
						<div class="user_img">
							<img :src="infoData.headImg" alt="">
						</div>
						<div class="user_right">
							<div class="user_name">{{infoData.nickName}}</div>
							<y-audio :src="infoData.audioUrl" :currentPlay="currentAudioUrl === infoData.audioUrl" :time="audioTime" @play="play" @pause="pause"></y-audio>
						</div>
					</div>
					<div class="user_rank">
						<div class="show_rank_tips">
							<div>
								<img src="../../assets/activity/medals.png" alt="">
								<span>当前排名 第{{infoData.nowRank}}名</span>
							</div>
							<button class="view_rank" @click="showRank">查看排行榜</button>
						</div>
						<p v-if="infoData.nowRank > 200">当前{{infoData.voteCount}}票，还差{{infoData.awardsLackVoteCount}}票就能进入前200名赢得现金</p>
						<p v-else-if="infoData.nowRank < 200 && infoData.secondVoteCount !== null">当前{{infoData.voteCount}}票，后一名{{infoData.secondVoteCount}}票</p>
						<p v-else>当前{{infoData.voteCount}}票，赶快拉票保住排名</p>
						<div class="view_friends">
							<div class="view_head" @click="showFriends">
								<div v-if="!isShowFriends">
									<img src="../../assets/activity/arrow_right@3x.png" alt="">
									<span>查看好友拜年祝福</span>
									<img src="../../assets/activity/arrow_left@3x.png" alt="">
								</div>
								<div v-else>
									<img src="../../assets/activity/arrow_down@3x.png" alt="">
									<span>收起好友拜年祝福</span>
									<img src="../../assets/activity/arrow_down@3x.png" alt="">
								</div>
							</div>
							<ul v-if="isShowFriends" class="friends_list">
								<li v-for="(item, index) of friendsList" :key="index">
									<div class="user_img">
										<img :src="item.headImg" alt="" class="">
									</div>
									<div class="user_right">
										<p>{{item.nickName}}</p>
										<y-audio :src="item.audioUrl" :currentPlay="currentAudioUrl === item.audioUrl" :time="item.audioTime / 1000" @play="play" @pause="pause"></y-audio>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div class="vote_btn">
						<button @click="shareTips">帮TA拉票</button>
						<button @click="voted">{{voteButTxt}}</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 排行榜 -->
		<div class="rank_list" v-else>
			<!-- 安卓 -->
			<div v-if="isAndroid">
				<div class="android_style">
					<img src="../../assets/activity/star@3x.png" alt="">
				</div>
				<div class="android_tips">
					<p>世界上最遥远的距离是</p>
					<p>你与大奖只差看一眼排行榜。</p>
					<p class="down_yryz">下载“悠然一指”查看榜单，</p>
					<p>榜单盯得紧，现金抱回家。</p>
				</div>
				<div class="download">
					<button @click="download">下载APP</button>
				</div>
				<div class="cut_line">
					<img src="../../assets/activity/cut_line@3x.png" alt="">
				</div>
			</div>
			<!-- IOS -->
			<div v-else>
				<div class="head_tips">
					<img src="../../assets/activity/rank@3x.png" alt="">
				</div>
				<ul>
					<li v-for="(item, index) of list" :key="index">
						<div class="user_left">
							<div class="ranking" v-if="index === 0"><img src="../../assets/activity/first@3x.png" alt=""></div>
							<div class="ranking" v-else-if="index === 1"><img src="../../assets/activity/second@3x.png" alt=""></div>
							<div class="ranking" v-else-if="index === 2"><img src="../../assets/activity/third@3x.png" alt=""></div>
							<div class="ranking" v-else>
								<span>{{index + 1}}</span>
							</div>
							<img :src="item.headImg" alt="" class="user_img">
							<div class="user_vote">
								<p>{{item.nickName}}</p>
								<p>{{item.voteCount}}票</p>
							</div>
						</div>
						<y-audio :src="item.audioUrl" :currentPlay="currentAudioUrl === item.audioUrl" :time="item.audioTime / 1000" @play="play" @pause="pause"></y-audio>
					</li>
				</ul>
				<!-- 跳转页面底部 -->
				<div class="vote_btn" @click="toPageBottom">
					<span>万元现金奖，等你来参加！</span>
					<i class="arrow_right "></i>
				</div>
			</div>
		</div>
		<!-- 二维码 -->
		<div class="activity_info">
			<div>万元现金奖等你来！</div>
			<div class="join_way">
				<p>参与方式：
					<span>关注“悠然一指”服务号</span>，</p>
				<p>发送语音拜年即可参与</p>
			</div>
			<div class="arrow" ref="arrow"><img src="../../assets/activity/arrow@3x.png" alt=""></div>
			<div class="qrcode">
				<img src="../../assets/activity/qrcode@3x.png" alt="">
			</div>
		</div>
		<!-- 分享提示 -->
		<div class="share_tips" v-show="isShowShare" @click="hideShareTips">
			<img src="../../assets/activity/share_tips.png" alt="">
		</div>
	</div>
</template>
<script>
import YAudio from '@/components/audio';
import Velocity from 'velocity-animate';
import sharePic from '../../../static/share.png';
export default {
	components: {
		YAudio,
	},
	data() {
		return {
			isAndroid: true,
			error_404: false,
			isShowRank: false,
			isShowFriends: false,
			friendsList: [],
			infoData: null,
			list: [],
			isVoted: false,
			isShowShare: false,
			audio: null,
			currentAudioUrl: '',
			authorId: '',
			showWX: false,
			shareImg: sharePic,
			isSrollBottom: false,
			pageSize: 0,
			loading: true,
			loaded: false,
		}
	},
	computed: {
		audioTime() {
			return this.infoData.audioTime / 1000;
		},
		voteButTxt() {
			return this.infoData.voteFalg === 1 ? '投TA一票' : '今日已投'
		}
	},
	watch: {
		isShowFriends(val) {
			if (!val) this.friendsList = [];
		}
	},
	mounted() {
		// 微信授权登录
		if (this.$utils.isWeiXin()) {
			let loginInfo = sessionStorage.getItem('loginInfo');
			if (!loginInfo) {
				this.$utils.wxOauth();
				return false;
			}
			this.$utils.setLoginInfo();
			// 微信自定义分享
			this.$utils.wxShare({
				title: '老铁！我正在参加 #悠然一指方言拜年赢现金#活动，快来为我助力，为家乡话打Call！',
				desc: '关注 “悠然一指服务号”，发送语音参加方言拜年赢现金活动，今年人更旺！',
				imgUrl: window.location.origin + this.shareImg
			});
			this.$eventBus.$on('showWX', () => {
				this.showWX = true;
			})
		}
		//
		document.title = '悠然一指方言拜年赢现金';
		this.isAndroid = this.getAndroid();
		this.authorId = this.$utils.getUrlKey('authorId');
		Velocity(this.$refs.arrow,
			{ marginTop: '.24rem' },
			{
				duration: 500,
				delay: false,
				loop: true,
				easing: 'swing'
			})
		if (this.$utils.getUrlKey('source') === 'app') {
			this.isShowRank = true;
			this.isAndroid = false;
			this.showRank();
			return false;
		}

		// 作品详情
		this.getDetailData();
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.scrollHander)
	},
	methods: {
		// 安卓
		getAndroid() {
			let userAgent = navigator.userAgent.toLowerCase();
			return /android/i.test(userAgent);
		},
		// 获取作品详情
		async getDetailData() {
			let res = await this.$opusApi.get(`/services/app/v1/activity/weixin/voice/opus/info/${this.authorId}`)
			if (res.data.code === '200') {
				this.infoData = res.data.data;
				if (this.infoData)
					this.error_404 = !!this.infoData.shelveFlag;
				return false;
			}
			this.$toast(res.data.errorMsg);
		},
		// 查看和收起好友列表
		showFriends() {
			this.isShowFriends = !this.isShowFriends;
			if (this.isShowFriends) {
				this.getFriendsList();
			} else {
				this.pageSize = 0;
				window.removeEventListener('scroll', this.scrollHander)
			}
		},
		// 获取好友列表
		async getFriendsList() {
			this.pageSize++;
			let pageSize = 20;
			let res = await this.$opusApi.get(`/services/app/v1/activity/weixin/voice/opus/voteUserList/${this.infoData.kid}/${this.pageSize}/${pageSize}`)
			let body = res.data;
			if (body.code === '200') {
				this.loaded = true;
				let list = body.data.entities || [];
				this.friendsList.push(...list);
				window.addEventListener('scroll', this.scrollHander);
				if (list.length < pageSize) {
					this.loading = false;
				}
				return false;
			}
			this.$toast(res.data.errorMsg);
		},
		// 显示排行榜
		showRank() {
			this.isShowFriends = false;
			window.removeEventListener('scroll', this.scrollHander)
			this.pause();
			//
			this.isShowRank = true;
			if (this.isAndroid) return false;
			this.list = [];
			let params = {
				orderByType: 1,
			}
			this.$opusApi.get(`/services/app/v1/activity/weixin/voice/opus/list/1/200`, { params }).then(res => {
				let body = res.data;
				if (body.code === '200') {
					this.list = body.data.entities || [];
					window.addEventListener('scroll', this.scrollHander)
					return false;
				}
				this.$toast(res.data.errorMsg);
			})
		},
		scrollHander() {
			let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			let scrollHeight = document.body.scrollHeight;
			let viewHeight = window.innerHeight;
			if (scrollHeight - scrollTop - viewHeight <= 10) {
				if (this.isShowRank) {
					this.isSrollBottom = true;
				} else {
					if (this.loading && this.loaded)
						this.getFriendsList(), this.loaded = false;

				}
			}

		},
		toPageBottom() {
			if (this.isSrollBottom) {
				window.scrollTo(0, 0);
				this.isSrollBottom = false;
				return false
			}
			window.scrollTo(0, document.body.scrollHeight);
			this.isSrollBottom = true;
		},
		shareTips() {
			this.isShowShare = true;
		},
		hideShareTips() {
			this.isShowShare = false;
		},
		voted() {
			if (this.infoData.voteFalg === 0) {
				this.$toast(this.$utils.isWeiXin()
					? '每个微信用户每天只能投一票，请明天再投'
					: '每个IP每天只能投一票，您可以明天再投，或者分享至微信投票');
				return false;
			}
			let params = { activityOpusId: this.infoData.kid, }
			this.$opusApi.post(`/services/app/v1/activity/weixin/voice/vote/single`, params).then(res => {
				if (res.data.code === '200') {
					this.getDetailData();
					this.$toast('你与大奖只差一句祝福语，想要参加请关注“悠然一指”服务号发布录音送祝福');
					// this.infoData.voteCount++;
					// if (res.data.data.voteFlag === 0)
					// 	this.infoData.voteFalg = 0;
					return false;
				}
				this.$toast(res.data.errorMsg);
			})
		},
		download() {
			window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.rz.rz_rrz';
		},
		play(url) {
			if (this.audio)
				this.pause();
			this.currentAudioUrl = url;
			this.audio = new Audio();
			this.audio.src = this.currentAudioUrl;
			this.audio.play(0);
			this.addEvent();
		},
		pause() {
			if (this.audio) {
				this.audio.pause();
				this.removeEvent();
			}
			this.currentAudioUrl = '';
		},
		addEvent() {
			this.audio.addEventListener('ended', this.pause);
		},
		removeEvent() {
			this.audio.removeEventListener('ended', this.pause);
			this.audio = null;
		}
	}
}
</script>
<style>
@import '../../css/var.css';
.activity-wechat-voice-wrap {
	min-height: 100vh;
	background-color: #ed3d37;
	background-image: url("../../assets/activity/bg@3x.jpg"), url("../../assets/activity/bg_repeat@3x.jpg");
	background-repeat: no-repeat, repeat;
	background-size: 100%, 100%;
	background-position: top center, bottom center;
	font-size: .56rem;
	color: #FFF;
	padding-top: .1rem;
	padding-bottom: 2rem;
	& .share_img {
		position: absolute;
		top: 0;
		left: -9999px;
	}
	& .add_wx {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 9999;

		&>div {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%);
			width: 8rem;
			background-color: rgba(0, 0, 0, .7);
			border-radius: .2rem;
			padding: .2rem .4rem;
			text-align: center;
			font-size: .6rem;
		}
	}

	& .error_404 {
		margin-top: 1.8rem;
		text-align: center;
		& .content_404 {
			color: #333;
			background-color: #fff;
			font-size: .6rem;
			width: 94%;
			margin: 0 auto;
			border-radius: .4rem;
			padding: .8rem 0;
		}
		& img {
			width: 4.6rem;
		}
		&>div:nth-child(2) {
			margin-top: 1rem;
			& img {
				width: 5.8rem;
			}
		}
	}
	& .head_tips {
		text-align: center;
		padding-top: .8rem;
		& .head_title {
			color: #fad86c;
			font-size: 0.72rem;
			font-weight: bold;
			margin: .24rem 0;
			text-shadow: 0 0 10px rgba(0, 0, 0, .5);
		}
		& img {
			width: 7rem;
		}
	}
	& .android_style {
		padding-top: .8rem;
		text-align: center;
		& img {
			width: 2.15rem;
		}
	}
	& .android_tips {
		text-align: center;
		font-size: .5rem;
		margin-top: .3rem;
		& p {
			margin-bottom: .2rem;
		}
		& .down_yryz {
			color: #ffe7a5;
			font-size: .6rem;
		}
	}
	& .download {
		text-align: center;
		margin-top: .8rem;
		& button {
			font-size: .6rem;
			font-weight: bold;
			border-radius: 1rem;
			width: 6.62rem;
			height: 1.32rem;
			color: #cc2d26;
			background-color: #fad86c;
			background-image: url("../../assets/activity/down_btn@3x.png");
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}
	& .cut_line {
		margin-top: .6rem;
		margin-bottom: 1rem;
		text-align: center;
		& img {
			width: 5.8rem;
		}
	}
	& .user {
		background-color: #fff6e5;
		width: 90%;
		margin: 0 auto;
		margin-top: 1rem;
		padding: .6rem .4rem;
		border-radius: .2rem;
		& .user_info {
			display: flex;
			align-items: center;
		}
		& .user_img {
			width: 2.04rem;
			height: 2.04rem;
			overflow: hidden;
			border-radius: 50%;
			margin-right: .3rem;
			background-color: #ccc;
		}
		& .user_right {
			color: #333;
			font-size: .5rem;
			& .audio_player {
				margin-top: .2rem;
			}
		}
		& .friends_list {
			background-color: #FFF;
			margin-top: .4rem;
			border-radius: .2rem;
			&>li {
				display: flex;
				align-items: center;
				text-align: left;
				border-bottom: 1px solid #eee;
				padding: .4rem;
			}
			& .user_img {
				width: 1.5rem;
				height: 1.5rem;
				margin-right: .4rem;
			}
		}

		& .user_rank {
			text-align: center;
			margin-top: .5rem;
			& .show_rank_tips,
			& .show_rank_tips>div {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: .1rem .2rem;
				color: #f2ba49;
				background-color: #FFF;
				font-weight: bold;
				& img {
					height: 1.36rem;
					margin-right: .2rem;
				}
			}
			&>p {
				font-size: .44rem;
				color: #333;
				margin-top: .4rem;
			}
			& .view_rank {
				color: #FFF;
				background-color: #f67665;
				border-radius: 1rem;
				width: 2.65rem;
				height: 1rem;
				font-size: .4rem;
			}
			& .view_friends {
				margin-top: .4rem;
				& .view_head>div {
					&>img {
						width: .46rem;
					}
					&>span {
						font-size: .5rem;
						color: #f32438;
						margin: 0 .3rem;
					}
				}
			}
		}
	}

	& .rank_list {
		& ul {
			width: 94%;
			margin: 0 auto;
			background-color: #FFF;
			border-radius: .3rem;
		}
		& li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #666;
			font-size: .4rem;
			padding: .4rem .2rem;
			& .user_left {
				display: flex;
				align-items: center;
			}
			& .ranking {
				width: 1rem;
				text-align: center;
				font-size: .4rem;
				& img {
					width: .93rem;
					display: block;
					margin: auto;
				}
			}
			& .user_vote {
				width: 4.8rem;
				font-size: .4rem;
				line-height: 1.2;
				& p:nth-child(2) {
					font-size: .5rem;
					color: #f4646d;
					margin-top: .1rem;
				}
			}
			& .user_img {
				width: 1.05rem;
				height: 1.05rem;
				overflow: hidden;
				border-radius: 50%;
				margin-left: .2rem;
				margin-right: .15rem;
			}
			& .audio_player {
				width: 3.6rem;
			}
		}
		& li:nth-child(n+4) {
			& .ranking>span {
				display: inline-block;
				width: 1rem;
				border-radius: .1rem;
				background-color: #eeeeee;
			}
		}
		& li+li {
			border-top: 1px solid #eee;
		}
	}

	& .activity_info {
		text-align: center;
		margin-top: .8rem;
		font-size: .63rem;
		& div:nth-child(1) {
			font-weight: bold;
		}
		& .join_way {
			font-size: .46rem;
			margin-top: .2rem;
			text-align: center;
			& span {
				color: #fcf0a1
			}
		}
		& .arrow {
			position: absolute;
			width: .52rem;
			left: 50%;
			margin-left: -0.26rem;
			& img {
				width: .52rem;
				display: block;
				margin: auto;
			}
		}
		& .qrcode {
			display: inline-block;
			margin-top: 1rem;
			padding: .1rem;
			background-color: #FFF;
			& img {
				width: 3.48rem;
				display: block;
			}
		}
	}
	& .vote_btn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .6rem;
		background-color: #FFF1D6;
		z-index: 99;
		& button {
			width: 50%;
			color: #ec3d37;
			font-size: .6rem;
			padding: .32rem 0;
		}
		& button:first-child {
			background-color: #FEE8B4;
		}
		& .disabled {
			color: #FFF;
			background-color: #ccc;
		}
		& span {
			color: #ec3d37;
			padding: .32rem 0;
		}
		& .arrow_right {
			font-size: 0;
			line-height: 0;
			border-width: .2rem;
			border-color: #f3b985;
			border-right-width: 0;
			border-style: dashed;
			border-left-style: solid;
			border-top-color: transparent;
			border-bottom-color: transparent;
			margin-left: .3rem;
		}
	}

	& .share_tips {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		& img {
			position: absolute;
			top: .4rem;
			right: .8rem;
			width: 7rem;
		}
	}
}
</style>
