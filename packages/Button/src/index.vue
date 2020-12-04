<template>
	<button :class="classes" :disabled="disabled || loading" @click="handleClick">
		<Icon v-if="loading" name="loading"></Icon>
		<Icon v-if="icon && !loading" :name="icon"></Icon>
		<span v-if="$slots.default"><slot></slot></span>
	</button>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import Icon from 'packages/Icon/src/index.vue'

type TButtonType = PropType<'default' | 'primary' | 'info' | 'warning' | 'success' | 'error' | 'text'>
type TButtonSize = PropType<'large' | 'small'>
export default defineComponent({
		name: 'DolButton',
		components: { Icon },
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
		setup (props, { emit }) {
			const handleClick = (e: MouseEvent) => {
				emit('click', e)
			}
			const { type, size, round, loading, disabled } = props
			const classes = computed(() => {
				return [
					'dol-button',
					`dol-button-${type}`,
					size ? `dol-button-${size}` : '',
					{
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

