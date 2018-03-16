<template>
	<transition name="toast">
		<div v-if="showToast" class="toast" @click="showToast = false">{{text}}</div>
	</transition>
</template>
<script>
export default {
	props: {
		text: {
			type: String,
			default: 'success!'
		}
	},
	data() {
		return {
			showToast: false
		}
	}
}
</script>
<style scoped>
.toast {
	position: fixed;
	top: 50%;
	left: 50%;
	display: inline-block;
	min-width: 4rem;
	transform: translate(-50%);
	background: rgba(0, 0, 0, .7);
	color: #fff;
	padding: 0.2rem 0.6rem;
	border-radius: 2rem;
	font-size: 0.5rem;
	text-align: center;
	z-index: 1000;
	line-height: 1.4;
}

.toast-enter-active,
.toast-leave-active {
	transition: opacity 0.2s;
}

.toast-enter,
.toast-leave-to {
	opacity: 0;
}
</style>