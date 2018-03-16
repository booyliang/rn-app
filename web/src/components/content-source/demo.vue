<template>
	<div class="demo-flow_detail">
		<y-content-source :content-source="content1"></y-content-source>
	</div>
</template>
<script>
	import YContentSource from '@/components/content-source'
	export default {
		components: {
			YContentSource
		},
		data() {
			return {
				content1: '[{"text": "You Don\'t Know JS"},{"image": "https://github.com/getify/You-Dont-Know-JS/raw/master/up%20%26%20going/cover.jpg"},{"text": "https://github.com/getify/You-Dont-Know-JS"}]'
			}
		}
	}
</script>
