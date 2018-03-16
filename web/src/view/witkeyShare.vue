<template>
	<div class="witkey-wrap">
		<y-forward v-if="detailData.id"  :id="detailData.id" routerAddr="witkeyDetail"></y-forward>
		<div class="witkey-top">
			<img :src="detailData.companyLogo" alt="" class="witkey-logo">
			<p class="companyName">{{detailData.companyName}}</p>
			<div class="companyInfo">
				<p class="info-text" v-show="detailData.outSourceName">外包类型：{{detailData.outSourceName}}</p>
				<p class="info-text" v-show="detailData.commentValueName">服务领域：{{detailData.commentValueName}}</p>
				<p class="info-text" v-show="detailData.companyTypeName">公司性质：{{detailData.companyTypeName}}</p>
				<span class="addr"><span class="iconfont icon-add-a-c"></span>{{detailData.companyAddress}}</span>
				<p class="price">价格:￥<em>{{detailData.price}}</em></p>
				<p class="assist">(服务价格为参考，真实价格按实际需求定价)</p>
			</div>
			<!-- <div class="companyIntro">服务简介:{{detailData.companyBref}}</div> -->
		</div>
		<div class="witkey-content">
			<h2>服务详情</h2>
			<y-content-source :content-source="detailData.contentSource"></y-content-source>
		</div>
		<div class="witkey-content">
			<h2>服务资质</h2>
			<div><img :src="detailData.serviceQualification" alt=""></div>
		</div>
		<y-pingxuan></y-pingxuan>
		<div class="btn-openapp"></div>
	</div>
</template>

<script>
import YForward from '@/components/forward/main'
import YContentSource from '@/components/content-source'
import YPingxuan from '@/components/pingxuan'

export default{
	components: {
		YForward, YContentSource, YPingxuan
	},
	data() {
		return {
			detailData: {},
		}
	},
	
	async created() {
		// 威客详情
		let res = await this.$http(`/services/app/v1/witkey/findWitkey/${this.$route.params.id}/1`);
		this.detailData = res.data.data || {};
		if (this.$utils.isWeiXin()) {
			this.$utils.wxShare({
				title: this.detailData.companyName,
				desc: this.detailData.companyBref,
				link: `${window.location.origin}/articleShare/${this.detailData.id}`,
				imgUrl: this.detailData.companyLogo || '', 
			})
		}
	},
}
</script>

<style type="text/css" scoped>
@import "../css/var.css";
.witkey-wrap {
	position: relative;
}

.witkey-top {
	background-color: #fff;
	padding: 0.5rem 0.5rem 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center
}
.witkey-logo {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 0.45rem;
	border: 1px solid #e3e3e3;
}
.companyName {
	font-size: 0.72rem;
	line-height: 1;
	margin-top: 0.6rem;
}
.companyInfo {
	margin-top: 0.45rem;
	width: 100%;
	color: var(--text-assist-color);

	& .info-text {
		font-size: 0.45rem;
		line-height: 1.3;
	}
	& .addr {
		display: flex;
		align-items: center;
		font-size: 0.4rem;
		color: var(--text-tips-color);
		margin-top: 0.2rem;
	}
	& .iconfont {
		font-size: 0.42rem;
		margin-right: 0.2rem;
	}
	& .price {
		margin-top: 0.6rem;	
		font-size: 0.56rem;
		color: var(--text-primary-color);
		line-height: 1;

		& em {
			font-size: 0.8rem;
			color: #ff9160;
		}
	}
	& .assist {
		font-size: 0.36rem;
		color: var(--text-tips-color);
		margin-top: 0.15rem;
	}

}
.companyIntro {
	width: 100%;
	margin-top: 0.7rem;
	border-radius: 0.2rem;
	background: var(--bg-color);
	padding: 0.5rem 0.4rem;
	font-size: 0.5rem;
	color: var(--text-primary-color);
	line-height: 0.69rem;
}
.witkey-content {
	margin-top: 0.34rem;
	background: #fff;
	padding: 0.5rem;
	text-align: justify;

	& h2 {
		margin-bottom: 0.4rem;		
		padding-left: 0.2rem;
		border-left: 0.07rem solid var(--theme-color);
		font-size: 0.56rem;
		line-height: 1;
		color: var(--theme-color);

	}
}

</style>