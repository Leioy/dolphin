<template>
	<div class="dol-radio-group">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue'
import { UPDATE_MODEL_EVENT } from 'packages/utils'
import radioGroupKey, { RadioGroupContext } from 'packages/radio/src/token'

export default defineComponent({
	name: 'DolRadioGroup',
	props: {
		modelValue: {
			type: [ String, Number ],
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: [ UPDATE_MODEL_EVENT, 'change' ],
	setup: (props, { emit }) => {
		const changeEvent = (val: string | number) => {
			emit(UPDATE_MODEL_EVENT, val)
			emit('change', val)
		}
		provide<RadioGroupContext>(radioGroupKey, reactive({
			name: 'DolRadioGroup',
			...toRefs(props),
			changeEvent,
		}))
	},
})
</script>
