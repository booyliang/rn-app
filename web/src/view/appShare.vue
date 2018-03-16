<template>
	<div class="appWrap">
		<y-forward :id="appData.id" v-if="appData.id" routerAddr="app"></y-forward>
		<div class="shareApp-top">
			<img :src="appData.appliIcon" class="app-icon">
			<h3 class="app-name">{{appData.appliName}}</h3>
			<div class="text-label">
				<span v-for="item in appData.labels" :key="item.index">{{item.labelName}}</span>
			</div>
			<p class="text-assist">{{appData.companyName}}</p>
		</div>
		<y-content-source :content-source="brandData.contentSource"></y-content-source>
		<y-pingxuan></y-pingxuan>
		<div class="btn-openapp"></div>
	</div>
</template>
<script>
import YForward from '@/components/forward'
import YContentSource from '@/components/content-source'
import YPingxuan from '@/components/pingxuan'
export default {
	components: {
		YForward, YContentSource, YPingxuan
	},
	data() {
		return {
			appData: {},
			brandData: {},
		}
	},
	async created() {
		let res = await this.$http(`/services/app/v1/application/base/${this.$route.params.id}`);
		this.appData = res.data.data || {};
		let brandres = await this.$http(`/services/app/v1/application/brand/${this.$route.params.id}`);
		this.brandData = brandres.data.data || {};
		// this.contentSource = this.brandData.contentSource || '[]'
		if (this.$utils.isWeiXin()) {
			this.$utils.wxShare({
				title: `【${this.appData.appliName}】${this.appData.description}`,
				desc: this.appData.description,
				link: `${window.location.origin}/appShare/${this.appData.id}`,
				imgUrl: this.appData.appliIcon || '',
			})
		}
	}
}
</script>
<style>
@import '../css/var.css';
.shareApp-top {
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	padding: 0.5rem 0.5rem 0.6rem;
}

.app-icon {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 0.45rem;
	border: 1px solid #e3e3e3;
}

.app-name {
	font-size: 0.72rem;
	line-height: 1;
	margin-top: 0.36rem;
}

.text-label {
	margin-top: 0.42rem;
	& span {
		font-size: 0.44rem;
		color: var(--text-secondary-color);
		margin: 0 0.15rem;
	}
}

.text-assist {
	margin-top: 0.26rem;
	font-size: 0.4rem;
	color: var(--text-tips-color);
}

.appWrap .content_source {
	padding: 0.5rem;
	margin-top: 0.34rem;
}
</style>