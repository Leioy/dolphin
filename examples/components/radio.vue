<template>
	<div class="container">
		<dol-radio disabled @change="onChange" v-model="radio" label="1">备选项1</dol-radio>
		<dol-radio v-model="radio" label="2">备选项2</dol-radio>
		<hr>
		<dol-radio-group v-model="radio2" @change="onChange">
			<dol-radio disabled :label="1">备选项11</dol-radio>
			<dol-radio :label="2">备选项22</dol-radio>
		</dol-radio-group>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup () {
		const radio = ref('1')
		const radio2 = ref(1)
		const onChange = (val: string) => {
			console.log('out', val)
		}
		return { radio, onChange, radio2 }
	},
})
</script>
