<template>
	<div class="dol-textarea" :class="[{'is-disabled':disabled},$attrs.class]" :style="$attrs.style">
		<div :class="['dol-textarea__inner',{'dol-textarea--focused':isFocused}]">
			<textarea ref="inputOrTextarea" v-bind="attrsRef" class="dol-textarea__action"
			          :disabled="disabled" :readonly="readonly" :style="textareaStyle"
			          @input="onInput" @change="onChange" @blur="onBlur" @focus="onFocus"
			          @compositionstart="onCompositionStart" @compositionend="onCompositionEnd"
			></textarea>
			<i v-if="isClearable" @click="clear" class="dol-icon dol-icon-ios-close-circle dol-textarea__clear"></i>
			<span v-if="isLimitVisible" class="dol-textarea__count">{{ textLength }}/{{ textLimit }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, PropType, shallowRef, toRefs, watch } from 'vue'
import { useInput } from 'packages/hooks/useInput'
import { calcTextareaHeight } from 'packages/utils/calcTextareaHeight'
import { isObject } from '@vue/shared'

type TAutosize = {
	minRows?: number
	maxRows?: number
} | boolean
export default defineComponent({
	name: 'DolTextarea',
	inheritAttrs: false,
	props: {
		modelValue: {
			type: String,
			default: '',
		},
		clearable: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		showWordLimit: {
			type: Boolean,
			default: false,
		},
		autosize: {
			type: [ Boolean, Object ] as PropType<TAutosize>,
			default: false,
		},
	},
	emits: [ 'update:modelValue', 'input', 'change', 'blur', 'focus','clear' ],
	setup: (props, { attrs,emit }) => {
		const { modelValue, autosize, clearable, readonly, disabled, showWordLimit } = toRefs(props)
		const textareaStyle = shallowRef({})
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
		const isClearable = computed(() => {
			return clearable.value && modelValue.value && !disabled.value && !readonly.value
		})
		const isLimitVisible = computed(() => {
			return showWordLimit.value &&
				attrs.maxlength &&
				!disabled.value &&
				!readonly.value
		})
		const textLimit = computed(() => attrs.maxlength)
		const textLength = computed(() => {
			return (modelValue.value || '').length
		})
		const clear = () => {
			emit('update:modelValue','')
			emit('clear')
		}
		const resizeTextarea = () => {
			if (autosize.value) {
				const minRows = isObject(autosize.value) ? autosize.value.minRows : void 0
				const maxRows = isObject(autosize.value) ? autosize.value.maxRows : void 0
				textareaStyle.value = calcTextareaHeight(inputOrTextarea.value, minRows, maxRows)
			} else {
				textareaStyle.value = {
					minHeight: calcTextareaHeight(inputOrTextarea.value).minHeight,
				}
			}
		}
		watch(modelValue, () => {
			resizeTextarea()
		})
		onMounted(() => {
			nextTick(() => {
				resizeTextarea()
			})
		})
		return {
			attrsRef,
			inputOrTextarea,
			textareaStyle,
			isClearable,
			isFocused,
			isLimitVisible,
			textLimit,
			textLength,
			resizeTextarea,
			onInput,
			onChange,
			onBlur,
			onFocus,
			onCompositionStart,
			onCompositionEnd,
			clear
		}
	},
})
</script>
