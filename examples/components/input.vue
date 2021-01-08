<template>
	<div class="container">
		<dol-input :maxlength="8" v-model="value" @focus="focus" @input="input" placeholder="请输入...."></dol-input>
		<dol-input disabled v-model="value" size="small" placeholder="请输入...."></dol-input>
		<dol-input class="ddd" size="large" placeholder="请输入...."></dol-input>
		<dol-input readonly :placeholder="p"></dol-input>
		<dol-input>
			<template #prepend>http://</template>
			<template #append>.com</template>
		</dol-input>
		<dol-input>
			<template #prepend>
				<dol-button>click</dol-button>
			</template>
			<template #append>
				<dol-button icon="search"></dol-button>
			</template>
		</dol-input>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup () {
		const input = (e: unknown) => {
			console.log('out', e)
		}
		const focus = (e: FocusEvent) => {
			console.log(e.target)
		}
		return { input, focus, value: ref('222'), p: ref('请输入123sss') }
	},
})
</script>
