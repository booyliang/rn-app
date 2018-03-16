<template>
	<div class="ping-wrap">
		<div  class="pingxuan">
			<img src="../assets/activity/qrcode@2x.png" alt="" class="qr">
		</div>
	</div>
</template>
<script>
	export default {
		name: 'pingxuan',
	}

</script>
<style scoped>
	.ping-wrap {
		background: #fff;
		padding: 0.45rem 0.5rem 0.6rem;
	}
	.pingxuan {
		position: relative;
		height: 6.12rem;
		background: url(../assets/pingxuan-bg.png) no-repeat center;
		background-size: contain;

		& .qr {
			position: absolute;
			top: 1.64rem;
			left: 50%;
			margin-left: -5.2rem;
			width: 3.6rem;
			height: 3.6rem;
		}
	}

</style>