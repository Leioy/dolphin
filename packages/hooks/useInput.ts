import { useAttrs } from 'packages/hooks/useAttrs'
import { computed, nextTick, onMounted, ref, Ref, useContext, watch } from 'vue'

type TElement = HTMLInputElement | HTMLTextAreaElement
export const useInput = (modelValue: Ref<string | number | null>) => {
	const attrsRef = useAttrs()
	const { emit } = useContext()
	const inputOrTextarea = ref<TElement | null>(null)
	const isComposing = ref(false)
	const isFocused = ref(false)
	const localInputValue = computed(() => {
		return modelValue.value === null ? '' : String(modelValue.value)
	})
	const onInput = (e: InputEvent | CompositionEvent) => {
		if (isComposing.value) return
		emit('input', e)
		emit('update:modelValue', (e.target as TElement).value)
		nextTick(() => {
			setLocalInputValue()
		})
	}
	const onChange = (e: Event) => {
		emit('change', e)
	}
	const onBlur = (e: FocusEvent) => {
		isFocused.value = false
		emit('blur', e)
	}
	const onFocus = (e: FocusEvent) => {
		isFocused.value = true
		emit('focus', e)
	}
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
		inputOrTextarea.value!.value = localInputValue.value
	}
	watch(localInputValue, () => {
		setLocalInputValue()
	})
	onMounted(() => {
		setLocalInputValue()
	})
	return {
		attrsRef,
		inputOrTextarea,
		isFocused,
		onInput,
		onChange,
		onBlur,
		onFocus,
		onCompositionStart,
		onCompositionEnd,
	}
}
