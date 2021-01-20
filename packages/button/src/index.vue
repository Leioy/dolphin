<template>
	<button :class="classes" :disabled="disabled || loading" @click="handleClick">
		<i v-if="loading" class="dol-icon dol-icon-ios-loading"></i>
		<i v-if="icon && !loading" class="dol-icon" :class="`dol-icon-${icon}`"></i>
		<span v-if="$slots.default"><slot></slot></span>
	</button>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

type TButtonType = PropType<'default' | 'primary' | 'info' | 'warning' | 'success' | 'error' | 'text'>
type TButtonSize = PropType<'large' | 'small'>
export default defineComponent({
		name: 'DolButton',
		props: {
			type: {
				type: String as TButtonType,
				default: 'default',
				validator: (val: string) => {
					return [ 'default', 'primary', 'info', 'warning', 'success', 'error', 'text' ].includes(val)
				},
			},
			size: {
				type: String as TButtonSize,
				validator: (val: string) => {
					return [ 'large', 'small' ].includes(val)
				},
			},
			icon: String,
			round: Boolean,
			loading: Boolean,
			disabled: Boolean,
		},
		emits: [ 'click' ],
		setup (props, { emit, slots }) {
			const handleClick = (e: MouseEvent) => {
				emit('click', e)
			}
			const { type, size, round, loading, disabled, icon } = props
			const classes = computed(() => {
				return [
					'dol-button',
					`dol-button-${type}`,
					size ? `dol-button-${size}` : '',
					{
						'dol-button-iconOnly': !slots.default?.() && (loading || icon),
						'dol-button-disabled': disabled,
						'dol-button-loading': loading,
						'dol-button-round': round,
					},
				]
			})

			return { classes, handleClick }
		},
	},
)
</script>

