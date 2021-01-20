<template>
	<button class="dol-switch" :disabled="disabled || loading" :class="classObj" @click="handleClick">
		<span class="dol-switch__inner">
			<i v-if="activeIcon || inactiveIcon" class="dol-icon" :class="iconClass"></i>
			{{ innerText }}
		</span>
		<span class="dol-switch__action">
			<i v-if="loading" class="dol-icon dol-icon-ios-loading"></i>
		</span>
	</button>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, watch } from 'vue'

export default defineComponent({
	name: 'DolSwitch',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		activeText: {
			type: String,
			default: '',
		},
		inactiveText: {
			type: String,
			default: '',
		},
		activeIcon: {
			type: String,
			default: '',
		},
		inactiveIcon: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	emits: [ 'change', 'update:modelValue' ],
	setup (props, ctx) {
		const { modelValue, activeText, inactiveText, activeIcon, inactiveIcon, disabled, loading } = toRefs(props)
		const classObj = computed(() => ({ isChecked: modelValue.value, disabled: disabled.value, loading: loading.value }))
		const innerText = computed(() => {
			return modelValue.value ? activeText.value : inactiveText.value
		})
		const iconClass = computed(() => {
			return modelValue.value ? { [`dol-icon-${activeIcon.value}`]: activeIcon.value } : { [`dol-icon-${inactiveIcon.value}`]: inactiveIcon.value }
		})
		const handleClick = () => {
			ctx.emit('update:modelValue', !modelValue.value)
		}
		watch(modelValue, (val) => {
			ctx.emit('change', val)
		})
		return { classObj, handleClick, innerText, iconClass }
	},
})
</script>

