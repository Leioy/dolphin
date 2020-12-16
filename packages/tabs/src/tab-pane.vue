<template>
	<div class="dol-tabs__pane">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DolTabPane',
	props: {
		label: {
			type: String,
			required: true,
			validator: (val) => {
				return !!val
			},
		},
		name: {
			type: String,
			required: true,
			validator: (val) => {
				return !!val
			},
		},
	},
})
</script>
