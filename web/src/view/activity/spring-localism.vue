<template>
	<div class="spring">
		<div class="bg bg1"><img src="../../assets/spring-bg1.jpg"></div>
		<div class="bg bg2"><img src="../../assets/spring-bg2.jpg"></div>
		<div class="bg bg3"><img src="../../assets/spring-bg3.jpg"></div>
		<div class="bg bg4"><img src="../../assets/spring-bg4.jpg"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		async created() {
			if (this.$utils.isWeiXin()) {
				this.$utils.wxShare({
					title: '方言拜年赢万元现金',
					desc: '了解一座城市，需要读懂他的方言。每个国家， 同一句话都有不同的方言演绎。拜年，用方言更有味',
					link: `${window.location.origin}/spring-localism`,
					imgUrl: `${window.location.origin}/static/shareicon.png`,
				})
			}
		}
	}
</script>
<style>
	.spring {
		min-height: 100vh;
		width: 100vw;
		& .bg {
			width: 100%;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;

			& img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}

	}
</style>