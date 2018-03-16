/**
*	Author: yefan
*
*/
<template>
	<div class="content_source" @click="handleClick">
		<div v-if="html" v-html="html" class="content_source-html"></div>
		<div v-else>
			<template v-for="item in metaData">
				<p class="content_source-text" v-if="'text' in item">{{ item.text | convertSpacing }}</p>
				<div v-else-if="Object.keys(item)[0] == 'image'" class="image-box">
					<img max-width="100%" :src="item.image | imageResize(6)">
				</div>
				<div v-else-if="Object.keys(item)[0] == 'video' && !hasThumbnailVideo" class="video-box">
					<y-video width="100%" :src="item.video.url" :poster="item.video.thumbnailImage | imageResize(3)"></y-video>
				</div>
				<div v-else-if="Object.keys(item)[0] == 'audio'" class="audio-box">
					<y-audio :src="item.audio.url" :time="item.audio.time"></y-audio>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import YVideo from '@/components/video'
import YAudio from '@/components/audio'
import ImageResize from '@/filters/imageResize'
export default {
	name: 'y-content-source',
	props: {
		contentSource: {
			type: String,
			default: '[]'
		},
		hasThumbnailVideo: {
			type: Boolean,
			default: false,
		},
		html: {
			type: String,
			default: ''
		}
	},
	components: {
		YVideo,
		YAudio
	},
	computed: {
		metaData() {
			try {
				let metaData = JSON.parse(this.contentSource);

				if (!Array.isArray(metaData)) {
					throw new Error(`${metaData} is not an array.`);
				}

				return metaData;
			} catch (error) {
				console.error(error);
				console.error('组件content-source：请传入正确的contentSource格式')
			}
		}
	},
	filters: {
		convertSpacing(value) {
			let result = value.replace(/\&nbsp;/g, " ");
			return result;
		}
	},
	methods: {
		handleClick(e) {
			const target = e.target;

			if (target.nodeName !== 'IMG') {
				return;
			}

			const images = [...e.currentTarget.querySelectorAll('img')];
			this.$emit('click-image', {
				images: images.map((image) => image.getAttribute('src')),
				index: images.indexOf(target)
			});
		}
	}
}
</script>
<style>
.content_source {
	background: #fff;
	padding-top: 0.5rem;
	font-size: .56rem;
	line-height: 1.64;
	& h1 {
		font-size: 2em;
	}
	& h2 {
		font-size: 1.5em;
	}
	& h3 {
		font-size: 1.17em;
	}
	& h4 {
		font-size: 1em;
	}
	& h5 {
		font-size: 0.83em;
	}
	& h6 {
		font-size: 0.67em;
	}
	& .image-box,
	& .audio-box,
	& .video-box {
		margin: 0.24rem 0;

		&:first-child {
			margin-top: 0;
		}
	}
	& .image-box {
		& img {
			vertical-align: top;
		}
	}
	& b, & strong {
		font-weight: bold;
	}
	& i, & em {
		font-style: italic;
	}
}
.content_source-text {
	margin: 0.24rem 0;
	min-height: .92rem;
	white-space: pre-wrap;

	&:first-child {
		margin-top: 0;
	}
}
.content_source-html {
	& video {
		height: 5.58rem;
	}
}
</style>

