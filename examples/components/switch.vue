<template>
	<div class="container">
		<dol-switch active-text="开" inactive-text="关" v-model="value"></dol-switch>
		<dol-switch v-model="value2" active-icon="md-checkmark" inactive-icon="md-close"></dol-switch>
		<dol-switch active-text="开" disabled inactive-text="关" v-model="value3"></dol-switch>
		<dol-switch active-text="开" :loading="loading" inactive-text="关" v-model="value4" @change="change"></dol-switch>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup () {
		const value = ref(true)
		const value2 = ref(false)
		const value3 = ref(false)
		const value4 = ref(false)
		const loading = ref(false)
		const getData = () => {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(1)
				}, 3000)
			})
		}
		const change = async () => {
			loading.value = true
			await getData()
			loading.value = false
		}
		return { value, value2, value3, value4, loading, change }
	},
})
</script>
