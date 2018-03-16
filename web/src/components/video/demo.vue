<template>
	<div class="demo">
		<y-video src="//7xjubq.com1.z0.glb.clouddn.com/89_svg02.mp4" poster="//placehold.it/800x450?text=Video"></y-video>
		<y-video poster="//placehold.it/800x450?text=Video Preview" preview></y-video>
	</div>
</template>

<script type="text/javascript">
	import Video from './video';

	export default {
		components: {
			[Video.name]: Video
		},
	};
</script>

<style type="text/css" >
	@import "#/css/var.css";
.demo{
	.video {
		@apply --margin-bottom;
	}
}

</style>