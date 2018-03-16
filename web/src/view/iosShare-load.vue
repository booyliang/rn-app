<template>
	<div class="ios-share-load">
		<div class="top-bg"></div>
		<div class="down-bg">
			<img src="../assets/ios-loading.png"  class="loading">
			<img src="../assets/yryz-fwh-qr-code.png"  class="qrcode">
		</div>
	</div>
</template>
<style scoped>
	.top-bg {
		height: 22.75rem;
		background: url(../assets/iostop-bg.jpg) no-repeat center top;
		background-size: cover;
	}
	.down-bg{
		height: 11.89rem;
		background: url(../assets/iosdown-bg.jpg) no-repeat center top;
		background-size: cover;

	}
	.loading {
		width: 9.89rem;
		height: 2.11rem;
		display: block;
		margin: 0 auto;
	}
	.qrcode {
		display: block;
		width: 4.6rem;
		height: 4.6rem;
		margin: 3.74rem auto 0;
	}
</style>