<template>
	<div class="container">
		<dol-textarea v-model="value1"></dol-textarea>
		<dol-textarea v-model="value2" placeholder="请输入..."></dol-textarea>
		<dol-textarea v-model="value3" placeholder="请输入..." clearable></dol-textarea>
		<dol-textarea v-model="value4" placeholder="请输入..." clearable maxlength="10" show-word-limit></dol-textarea>
		<dol-textarea v-model="value5" autosize></dol-textarea>
		<dol-textarea v-model="value6" :autosize="{minRows:2,maxRows:4}"></dol-textarea>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup: () => {
		const value1 = ref(null)
		const value2 = ref(null)
		const value3 = ref(null)
		const value4 = ref(null)
		const value5 = ref(null)
		const value6 = ref(null)
		return { value1, value2, value3, value4, value5, value6 }
	},
})
</script>
<style lang="less" scoped>
.container {
	.dol-textarea {
		margin: 8px 0;
	}
}
</style>
