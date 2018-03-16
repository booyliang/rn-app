<template>
	<y-content-source
		:content-source="contentSource"
		:html="html"
		@click-image="handleClickImage"
		class="article-content"
	></y-content-source>
</template>

<script>
	import ContentSource from '@/components/content-source';

	export default {
		components: {
			[ContentSource.name]: ContentSource
		},

		data() {
			return {
				data: {},
				observedElement: document.body,
				heightTimer: null,
				height: 0
			};
		},

		computed: {
			contentSource() {
				try {
					return this.data.article.contentSource;
				} catch (error) {
					return;
				}
			},

			html() {
				try {
					return this.data.article.contentHtml2;
				} catch (error) {
					return '';
				}
			}
		},

		methods: {
			observeHeight() {
				this.heightTimer = setInterval(this.updateHeight, 500);
			},

			updateHeight() {
				const height = this.observedElement.offsetHeight;

				if (height === this.height) {
					return;
				}

				window.postMessage(JSON.stringify({
					type: 'height-change',
					data: height
				}), window.origin);
				this.height = height;
			},

			listenImageLoad(image) {
				image.addEventListener('load', () => {
					this.updateHeight(this.observedElement.offsetHeight);
				});
			},

			async fetchData() {
				this.data = (await this.$http.get(`/services/app/v1/article/${this.$route.params.id}`)).data.data;
			},

			handleClickImage(data) {
				window.postMessage(JSON.stringify({
					type: 'preview-images',
					data
				}), window.origin);
			}
		},

		mounted() {
			this.observeHeight();
			this.fetchData();
		},

		beforeDestroy() {
			clearInterval(this.heightTimer);
		}
	};
</script>

<style scoped>
	.article-content {
		background: white;
	}
</style>