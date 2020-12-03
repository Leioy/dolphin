<template>
	<svg class="dol-icon" :style="style">
		<use :xlink:href="`#icon-${name}`"></use>
	</svg>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'DolIcon',
	props: {
		name: {
			type: String,
			required: true,
		},
		color: String,
		size: String,
	},
	setup (props) {
		const style = computed(() => {
			return {
				fontSize: `${props.size}px`,
				color: props.color,
			}
		})
		return { style }
	},
})
</script>
