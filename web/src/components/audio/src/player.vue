<template>
	<div class="audio_player" @click="playAudio">
		<div class="audio_player-button">
			<img src="../../../assets/activity/play.gif" v-if="isPlay" class="audio_icon">
			<img src="../../../assets/activity/stop.png" v-else class="audio_icon">
		</div>
		<div class="audio_player-time">{{ time + "''" }}</div>
	</div>
</template>
<script>
export default {
	props: {
		title: String,
		src: {
			type: String,
			required: true,
		},
		time: Number,
		size: {
			type: Number,
			default: 0
		},
		currentPlay: Boolean,
	},
	data() {
		return {
			isPlay: this.currentPlay,
		}
	},
	watch: {
		currentPlay(val) {
			this.isPlay = val;
		}
	},
	methods: {
		playAudio() {
			if (this.isPlay) {
				this.isPlay = false;
				this.$emit('pause');
			} else {
				this.isPlay = true;
				this.$emit('play', this.src);
			}
		}

	}
}
</script>
<style>
.audio_player {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 1rem;
	width: 4.2rem;
	padding: 0 0.2rem;
	border-radius: 1rem;
	color: #FFF;
	background-color: #6dce94;

	& .audio_player-button {
		width: 0.7rem;
		height: 0.7rem;
		margin-left: .06rem;
		& i {
			color: #fff;
			font-size: .64rem;
		}
		& .audio_icon {
			width: 0.5rem;
		}
	}

	& .audio_player-time {
		font-size: .5rem;
	}
}
</style>

