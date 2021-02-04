<template>
	<label class="dol-radio" :class="{'is-checked':model === label,'is-disabled':isDisabled}">
		<span class="dol-radio__inner" :class="{'is-checked':model === label,'is-disabled':isDisabled}">
			<span class="dol-radio__circle"></span>
			<input v-model="model" :value="label" class="dol-radio__input"
			       type="radio" :disabled="isDisabled" @change="onChange">
		</span>
		<span class="dol-radio__label">
			<slot>{{ label }}</slot>
		</span>
	</label>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { UPDATE_MODEL_EVENT } from 'packages/utils'
import radioGroupKey, { RadioGroupContext } from 'packages/radio/src/token'

export default defineComponent({
	name: 'DolRadio',
	props: {
		modelValue: {
			type: [ String, Number ],
			default: '',
		},
		label: {
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
		const radioGroup = inject<RadioGroupContext>(radioGroupKey, {} as RadioGroupContext)
		const isGroup = computed(() => radioGroup?.name === 'DolRadioGroup')
		const isDisabled = computed(() => {
			return isGroup.value ? (radioGroup.disabled || props.disabled) : props.disabled
		})
		const model = computed<string | number>({
			get () {
				return isGroup.value ? radioGroup?.modelValue : props.modelValue
			},
			set (val) {
				if (isGroup.value) {
					radioGroup.changeEvent(val)
				} else {
					emit(UPDATE_MODEL_EVENT, val)
				}
			},
		})
		const onChange = (e: Event) => {
			emit('change', (e.target as HTMLInputElement).value)
		}
		return { onChange, model, isDisabled }
	},
})
</script>
