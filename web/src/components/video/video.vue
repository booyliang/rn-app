/**
*	Author: wangboning
*
*/
<template>
	<div class="video" :class="{'video--playing': isPlaying}" @click="handleClick" :style="style">
		<video :src="src" v-if="!isNative" ref="video"></video>
		<div class="video-control">
			<span class="iconfont icon-play"></span>
		</div>
		<y-mask class="video_mask"></y-mask>
	</div>
</template>

<script type="text/javascript">
	import YMask from '@/components/mask';
	export default {
		name: 'y-video',
		components: {
			YMask
		},
		props: {
			src: String,
			poster: String,
			preview: Boolean
		},

		data() {
			return {
				isNative: false,
				isPlaying: false
			}
		},
		computed: {
			style() {
				if ( !this.isPlaying ) {
					return { 'background-image': `url("${this.poster}")` }
				}
				return null;
			}
		},

		methods: {
			handleClick(event) {
				if (this.preview) {
					return false;
				}

				this.play();
			},

			play() {
				if (this.isNative) {
					this.$yryz.playVideo({
						videoUrl: this.src
					});
				} else {
					this.isPlaying = true;
					this.$refs.video.play();
				}
			}
		}
	};
</script>

<style type="text/css">
	@import '../../css/var.css';

	.video {
		@apply --no-tap-highlight;
		position: relative;
		background: black;
		padding-bottom: 44.92%;
		background-size: cover;
		overflow: hidden;
		& video {
			@apply --full;
			height: 100%;
			width: 100%;
			opacity: 0;
		}

	}
	.video--playing {
		& .video-control{
			opacity: 0
		}
		& video {
			opacity: 1
		}
		& .video_mask {
			background: none
		}
	}

	.video-control {
		@apply --full;
		@apply --display-flex;
		/*@apply --bg-alpha;*/
		@apply --circle;
		content: "";
		justify-content: center;
		width: 0.72rem;
		height: 0.72rem;
		margin: auto;
		z-index: 19;
		& .iconfont {
			font-size: 0.56rem;
			color: #fff;
		}
	}
	.video_mask {
		background: linear-gradient(to bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, .3) 40%);
	}
</style>