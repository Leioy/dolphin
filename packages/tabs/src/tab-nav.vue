<script lang="ts">
import { defineComponent, h, inject, PropType } from 'vue'
import TabBar from './tab-bar.vue'
import { TActiveIndex, TPane } from 'packages/tabs/src/tabs.vue'

export default defineComponent({
	name: 'DolTabNav',
	props: {
		panes: {
			type: Array as PropType<TPane[]>,
			default: () => ([] as TPane[]),
		},
		onTabClick: {
			type: Function as PropType<(name: string, index: number, e: MouseEvent) => void>,
			default: () => {},
		},
	},
	setup () {
		const activeIndex = inject<TActiveIndex>('activeIndex')!
		return { activeIndex }
	},
	render () {
		const { panes, onTabClick, activeIndex } = this
		const navList = panes.map((pane, index) => {
			const tabName = pane.props.name
			return h(
				'div',
				{
					class: [ 'dol-tabs__item', { isActive: index === activeIndex } ],
					'is-active': index === activeIndex,
					'tab-index': index,
					'tab-name': tabName,
					ref: `tab-${tabName}`,
					onClick: (e: MouseEvent) => {onTabClick(tabName, index, e)},
				},
				pane.props.label,
			)
		})
		return h(
			'div',
			{
				class: 'dol-tabs__nav-wrap',
			},
			h(
				'div',
				{
					class: 'dol-tabs__nav-scroll',
				},
				h(
					'div',
					{
						class: 'dol-tabs__nav',
						ref: '$nav',
					},
					[ h(TabBar), navList ],
				),
			),
		)
	},
})
</script>
