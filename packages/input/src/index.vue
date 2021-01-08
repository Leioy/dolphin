<template>
	<div class="dol-input" :class="classObj">
		<template v-if="$slots.prepend">
			<div class="dol-input__prepend">
				<slot name="prepend"></slot>
			</div>
		</template>
		<input
			class="dol-input__inner" v-bind="$attrs"
			:disabled="disabled" :value="modelValue" :readonly="readonly"
			@input="onInput" @change="onChange" @compositionstart="onCompositionStart"
			@compositionend="onCompositionEnd" @focus="onFocus" @blur="onBlur"
		>
		<template v-if="$slots.append">
			<div class="dol-input__append">
				<slot name="append"></slot>
			</div>
		</template>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

export default defineComponent({
	name: 'DolInput',
	inheritAttrs: false,
	props: {
		modelValue: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String as PropType<ComponentSize>,
			validator: (val: string) => [ 'large', 'small' ].includes(val),
		},
	},
	emits: [ 'input', 'update:modelValue', 'change', 'blur', 'focus' ],
	setup (props, { attrs, slots, emit }) {
		const { size, disabled } = props
		const isComposing = ref(false)
		const classObj = computed(() => {
			return [
				{
					[`dol-input--${size}`]: size,
					'is-disabled': disabled,
					'dol-input--prepend': slots.prepend?.(),
					'dol-input--append': slots.append?.(),
				},
				attrs.class,
			]
		})
		const onCompositionStart = () => {
			isComposing.value = true
		}
		const onCompositionEnd = (e: CompositionEvent) => {
			if (isComposing.value) {
				isComposing.value = false
				onInput(e)
			}
		}
		const onInput = (e: InputEvent | CompositionEvent) => {
			if (isComposing.value) return
			emit('input', e)
			emit('update:modelValue', (e.target as HTMLInputElement).value)
		}
		const onChange = (e: Event) => {
			emit('change', e)
		}
		const onFocus = (e: FocusEvent) => {
			emit('focus', e)
		}
		const onBlur = (e: FocusEvent) => {
			emit('blur', e)
		}
		return {
			classObj,
			onInput,
			onChange,
			onCompositionStart,
			onCompositionEnd,
			onFocus,
			onBlur,
		}
	},
})
</script>
