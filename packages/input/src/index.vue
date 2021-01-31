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
				ref="inputOrTextarea" :type="showPassword ? (isPasswordVisible ? 'text' : 'password') : type"
				class="dol-input__action" v-bind="attrsRef"
				:disabled="disabled" :readonly="readonly"
				@input="onInput" @change="onChange" @compositionstart="onCompositionStart"
				@compositionend="onCompositionEnd" @focus="onFocus" @blur="onBlur"
			>
			<span v-if="suffix || $slots.suffix || isClearable || showPassword || isLimitVisible" class="dol-input__suffix">
				<i v-if="isClearable" class="dol-icon dol-icon-ios-close-circle dol-input__clear"
				   @mousedown.prevent
				   @click="clear"
				>
				</i>
				<i
					v-if="showPassword"
					class="dol-icon dol-input__view"
					:class="[isPasswordVisible ? 'dol-icon-md-eye' : 'dol-icon-md-eye-off']"
					@click="isPasswordVisible = !isPasswordVisible"></i>
				<span v-if="isLimitVisible" class="dol-input__count">{{ textLength }}/{{ textLimit }}</span>
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
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import { useInput } from 'packages/hooks/useInput'

export default defineComponent({
	name: 'DolInput',
	inheritAttrs: false,
	props: {
		type: {
			type: String,
			default: 'text',
		},
		modelValue: {
			type: [ String, Number ],
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
		showPassword: {
			type: Boolean,
			default: false,
		},
		showWordLimit: {
			type: Boolean,
			default: false,
		},
	},
	emits: [ 'input', 'update:modelValue', 'change', 'blur', 'focus', 'clear' ],
	setup (props, { attrs, slots, emit }) {
		const { size, disabled, modelValue, readonly, clearable, showWordLimit, showPassword } = toRefs(props)
		const isPasswordVisible = ref(false)
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
			return clearable.value && modelValue.value && !disabled.value && !readonly.value
		})
		const isLimitVisible = computed(() => {
			return showWordLimit.value &&
				attrs.maxlength &&
				!disabled.value &&
				!readonly.value &&
				!showPassword.value
		})
		const textLimit = computed(() => attrs.maxlength)
		const textLength = computed(() => {
			return typeof modelValue.value === 'number' ? String(modelValue.value).length : (modelValue.value || '').length
		})
		const clear = () => {
			emit('update:modelValue', '')
			emit('clear')
		}
		const {
			attrsRef,
			inputOrTextarea,
			isFocused,
			onInput,
			onChange,
			onBlur,
			onFocus,
			onCompositionStart,
			onCompositionEnd,
		} = useInput(modelValue)
		return {
			attrsRef,
			inputOrTextarea,
			isClearable,
			isFocused,
			isPasswordVisible,
			isLimitVisible,
			classObj,
			textLimit,
			textLength,
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
