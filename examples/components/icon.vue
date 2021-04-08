<template>
	<div class="container">
		<dol-icon ref="icon" name="success" size="18" color="red"></dol-icon>
	</div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
	setup () {
		const icon = ref(null)
		onMounted(() => {
			console.log(icon.value)
		})
		return { icon }
	},
})
</script>
