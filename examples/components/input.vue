<template>
	<div class="container">
		<div>{{text}}</div>
		<dol-input class="ddd" ref="inputRef" clearable  v-model="text" placeholder="请输入...."></dol-input>
		<dol-input disabled v-model="text" size="small" placeholder="请输入...."></dol-input>
		<dol-input class="ddd" :model-value="text" @input="input" ref="inputRef" size="large"
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
		<dol-input clearable :model-value="text" @input="input" @update:modelValue="update" @clear="clear" prefix="¥" suffix="RMB">
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
import { defineComponent, ref,onMounted } from 'vue'

export default defineComponent({
	setup () {
		const text = ref('222')
		const inputRef = ref(null)
		const input = (e: InputEvent) => {
			console.log('out', e)
			text.value = e.target.value + '1111'
		}
		const focus = (e: FocusEvent) => {
			// console.log(e.target)
		}
		const clear = () =>{
			text.value = ''
		}
		const update = (a) =>{
			// text.value = a + 'hello world'
			console.log(1,a)
		}
		onMounted(() => {
			console.log(inputRef.value.inputRef.value)
		})
		return { inputRef,input, focus, text, p: ref('请输入123sss'),clear,update }
	},
})
</script>
