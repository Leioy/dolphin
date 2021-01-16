<template>
	<div class="container">
		<dol-input class="ddd" v-model="text"  ref="inputRef" clearable  placeholder="请输入...."></dol-input>
		<dol-input disabled v-model="text" size="small" placeholder="请输入...."></dol-input>
		<dol-input class="ddd" v-model="text" ref="inputRef" prefix="¥" suffix="RMB" size="large"
		           placeholder="请输入...."></dol-input>
		<dol-input readonly :placeholder="p"></dol-input>
		<dol-input>
			<template #prepend>http://</template>
			<template #append>.com</template>
		</dol-input>
		<dol-input>
			<template #prepend>
				<dol-button type="primary">click</dol-button>
			</template>
			<template #append>
				<dol-button icon="search"></dol-button>
			</template>
		</dol-input>
		<dol-input clearable v-model="text" prefix="¥" suffix="RMB">
			<template #prefix>
				<dol-icon name="search"></dol-icon>
			</template>
			<template #suffix>
				<dol-icon name="search"></dol-icon>
			</template>
		</dol-input>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup () {
		const text = ref('222')
		const inputRef = ref(null)
		return { inputRef, text, p: ref('请输入123sss') }
	},
})
</script>
