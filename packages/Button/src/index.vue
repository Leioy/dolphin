<template>
	<div class="button">button{{ a }}</div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
		name: 'Button',
		props: {
			msg: {
				type: String,
				default: 'hi',
			},
		},
		setup () {
			const a = Math.random() * 10
			if (a > 10) {
				console.log('大于')
			} else {
				console.log('小于')
			}
			return { a }
		},
	},
)
</script>

