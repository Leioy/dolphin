<template>
	<div class="dol-input" :class="classObj">
		<template v-if="$slots.prepend">
			<div class="dol-input__prepend">
				<slot name="prepend"></slot>
			</div>
		</template>
		<div class="dol-input__inner"
		     :class="{
					'dol-input--preSuffix': prefix || suffix || $slots.prefix || $slots.suffix || clearable,
					'dol-input--focused': isFocused
			}">
			<span v-if="prefix || $slots.prefix" class="dol-input__prefix">
				<template v-if="prefix">{{ prefix }}</template>
				<template v-else-if="$slots.prefix">
					<slot name="prefix"></slot>
				</template>
			</span>
			<input
				ref="inputRef"
				class="dol-input__action" v-bind="inputAttrs"
				:disabled="disabled" :readonly="readonly"
				@input="onInput" @change="onChange" @compositionstart="onCompositionStart"
				@compositionend="onCompositionEnd" @focus="onFocus" @blur="onBlur"
			>
			<span v-if="suffix || $slots.suffix || isClearable" class="dol-input__suffix">
				<i v-show="isClearable" class="dol-icon dol-icon-circle-close"
				   @mousedown.prevent
				   @click="clear"
				>
				</i>
				<template v-if="suffix">{{ suffix }}</template>
				<template v-else-if="$slots.suffix">
					<slot name="suffix"></slot>
				</template>
			</span>
		</div>
		<template v-if="$slots.append">
			<div class="dol-input__append">
				<slot name="append"></slot>
			</div>
		</template>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, shallowRef, toRefs, onMounted, nextTick, watch } from 'vue'

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
		clearable: {
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
		prefix: {
			type: String,
			default: '',
		},
		suffix: {
			type: String,
			default: '',
		},
	},
	emits: [ 'input', 'update:modelValue', 'change', 'blur', 'focus', 'clear' ],
	setup (props, { attrs, slots, emit }) {
		const inputAttrs = shallowRef({})
		const inputRef = ref(null)
		const { size, disabled, modelValue, readonly } = toRefs(props)
		const isComposing = ref(false)
		const isFocused = ref(false)
		const classObj = computed(() => {
			return [
				{
					[`dol-input--${size?.value}`]: size?.value,
					'is-disabled': disabled.value,
					'dol-input--prepend': slots.prepend?.(),
					'dol-input--append': slots.append?.(),
				},
				attrs.class,
			]
		})
		const isClearable = computed(() => {
			return modelValue.value && !disabled.value && !readonly.value
		})
		const localInputValue = computed(() => {
			return (props.modelValue === null || props.modelValue === undefined) ? '' : String(props.modelValue)
		})
		const getInputAttrs = () => {
			inputAttrs.value = Object.entries(attrs).reduce((acm: { [key: string]: unknown }, [ key, val ]) => {
				if (![ 'class', 'style' ].includes(key)) {
					acm[key] = val
				}
				return acm
			}, {})
		}
		getInputAttrs()
		const onCompositionStart = () => {
			isComposing.value = true
		}
		const onCompositionEnd = (e: CompositionEvent) => {
			if (isComposing.value) {
				isComposing.value = false
				onInput(e)
			}
		}
		const setLocalInputValue = () => {
			inputRef.value.value = localInputValue.value
		}
		const onInput = (e: InputEvent | CompositionEvent) => {
			if (isComposing.value) return
			emit('input', e)
			emit('update:modelValue', (e.target as HTMLInputElement).value)
			nextTick(() => {
				setLocalInputValue()
			})
		}
		const onChange = (e: Event) => {
			emit('change', e)
		}
		const onFocus = (e: FocusEvent) => {
			isFocused.value = true
			emit('focus', e)
		}
		const onBlur = (e: FocusEvent) => {
			isFocused.value = false
			emit('blur', e)
		}
		const clear = () => {
			emit('update:modelValue', '')
			emit('clear')
		}
		watch(localInputValue, () => {
			setLocalInputValue()
		})
		onMounted(() => {
			setLocalInputValue()
		})
		return {
			inputRef,
			inputAttrs,
			isClearable,
			isFocused,
			classObj,
			onInput,
			onChange,
			onCompositionStart,
			onCompositionEnd,
			onFocus,
			onBlur,
			clear,
		}
	},
})
</script>
