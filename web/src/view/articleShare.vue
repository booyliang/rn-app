<template>
	<div class="wrap">
		<y-forward  v-if="contentInfo.id"  :id="contentInfo.id" routerAddr="article"></y-forward>
		<h3 class="shareArticle-title">{{contentInfo.title}}</h3>
		<div class="appInfo-wrap">

			<div class="left">
				<div><img :src="appInfo.appliIcon" class="img-icon"></div>
				<div class="left-center">
					<h5 class="name">{{appInfo.appliName}}</h5>
					<div class="text">
						<!-- <span class="text-bgone">{{appInfo.downloadCount}}获取</span> -->
						<ul class="tag">
							<li  v-for="item in appInfo.labels" :key="item.id">{{item.labelName}}</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- <div class="down-btn">去关注</div> -->
		</div>
		<y-content-source :content-source="contentInfo.contentSource" :html="contentInfo.contentHtml2"></y-content-source>
		<y-pingxuan class="ping"></y-pingxuan>
		<div class="btn-openapp"></div>
	</div>
</template>
<script>
	import YForward from '@/components/forward/main'
	import YContentSource from '@/components/content-source'
	import YPingxuan from '@/components/pingxuan'
	export default {
		components: {
			YForward, YContentSource, YPingxuan
		},
		data() {
			return {
				articleData: {},
				contentInfo: {},
				appInfo: {},
			}
		},
		async created() {
			let res = await this.$http(`/services/app/v1/article/${this.$route.params.id}`);
			this.articleData = res.data.data || {};
			this.contentInfo = this.articleData.article || {};
			this.appInfo = this.articleData.appInfo || {};
			if (this.$utils.isWeiXin()) {
				this.$utils.wxShare({
					title: `【${this.appInfo.appliName}】${this.contentInfo.title}`,
					desc: this.contentInfo.description,
					link: `${window.location.origin}/articleShare/${this.contentInfo.id}`,
					imgUrl: this.contentInfo.imgUrl.split(',')[0] || this.appInfo.appliIcon,
				})
			}
		},
	}
</script>
<style scoped>
	@import '../css/var.css';
	.wrap {
		background: #fff;
		min-width: 100vw;
		min-height: 100vh;
		padding: 0.5rem;

		& .ping {
			margin: 0 -0.5rem;
		}
	}
	.shareArticle-title {
		font-size: 0.72rem;
		line-height: 1;
	}
	.appInfo-wrap {
		background: #fff5f5;
		margin-top: 0.66rem;
		padding: 0.4rem 0.3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.img-icon {
		width: 1.22rem;
		height: 1.222rem;
		border-radius: 0.24rem;
		margin-right: 0.32rem;
		border: 1px solid #e3e3e3;
	}
	.name {
		font-size: 0.52rem;
		line-height: 1;
	}
	.text {
		/* display: flex; */
		margin-top: 0.14rem;
		color: #fff;
		font-size: 0.4rem;
		line-height: 0.6rem;
	}
	.text-bgone {
		background: #36dbb9;
		padding: 0 0.15rem;
		margin-right: 0.16rem;
		border-radius: 5px;
		flex: 0 0 auto;
	}
	.tag {
		display: inline-flex;
		& li {
			max-width: 1.9rem;
			background: #ff9160;
			padding: 0 0.15rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			border-radius: 5px;

			& + li {
				margin-left: 0.16rem;
			}
		}
	}
	.viedostyle {
		width: 9.6rem;
		height: 6rem;
	}
	.down-btn {
		height: 0.81rem;
		padding: 0 0.54rem;
		font-size: 0.46rem;
		border-radius: 054rem;
		border: 1px solid #ff6f6b;
		line-height: 0.81rem;
	}
	.left {
		display: flex;
	}
	.left-center {
		display: flex;
		flex-direction: column;
	}
</style>