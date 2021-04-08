<script lang="ts">
import {
	Component,
	ComponentInternalInstance,
	defineComponent,
	Fragment,
	getCurrentInstance,
	h,
	nextTick,
	onMounted,
	onUpdated,
	provide,
	Ref,
	ref,
	VNode,
	watch,
} from 'vue'
import TabNav from './tab-nav.vue'
import { TPane,TPaneProps } from 'typings'


export default defineComponent({
	name: 'DolTabs',
	props: {
		modelValue: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
	},
	emits: [ 'tab-click', 'update:modelValue' ],
	setup (props, ctx) {
		const panes = ref<TPane[]>([])
		const activeIndex = ref(-1)
		const instance = getCurrentInstance()
		provide('activeIndex', activeIndex)
		const setActiveIndex = (index: number) => {
			activeIndex.value = index
		}
		const setPaneInstance = () => {
			if (ctx.slots.default?.()) {
				const children = instance?.subTree.children
				const contentVNode = Array.from((children as ArrayLike<VNode>)).find(({ props }) => props?.class === 'dol-tabs__content')
				if (!contentVNode) return
				const paneList = getPaneInstance(contentVNode)
				const activeIndex = props.modelValue ? paneList.findIndex(pane => pane.props.name === props.modelValue) : 0
				setActiveIndex(activeIndex)
				const paneInstanceList: TPane[] = getPaneInstance(contentVNode).map(pane => ({
					uid: pane.uid,
					props: pane.props as TPaneProps,
				}))
				const isPaneChanged = !(panes.value.length === paneInstanceList.length && paneInstanceList.every((pane, index) => pane.uid === panes.value[index].uid))
				if (isPaneChanged) {
					panes.value = paneInstanceList
				}
			}
		}
		const getPaneInstance = (vNode: VNode, paneInstanceList: ComponentInternalInstance[] = []) => {
			Array.from((vNode.children as ArrayLike<VNode>) || []).forEach(node => {
				let type = node.type
				type = (type as Component).name || type
				if (type === 'DolTabPane' && node.component) {
					paneInstanceList.push(node.component)
				} else if (type === Fragment || type === 'template') {
					getPaneInstance(node, paneInstanceList)
				}
			})
			return paneInstanceList
		}
		const handleTabClick = (name: string, index: number, e: MouseEvent) => {
			setActiveIndex(index)
			ctx.emit('tab-click', name, index, e)
			ctx.emit('update:modelValue', name)
		}
		const setPaneStyle = () => {
			const $content = instance?.refs.$content as HTMLDivElement
			const panesNode = $content.querySelectorAll('.dol-tabs__pane');
			panesNode.forEach(node => {
				(node as HTMLDivElement).style.visibility = 'hidden';
				(node as HTMLDivElement).style.height = '0'
			})
			$content.style.transform = `translateX(-${activeIndex.value * 100}%)`;
			(panesNode[activeIndex.value] as HTMLDivElement).style.visibility = 'visible';
			(panesNode[activeIndex.value] as HTMLDivElement).style.height = 'auto'
		}
		watch(activeIndex, () => {
			nextTick(() => {
				setPaneStyle()
			})
		})
		onUpdated(() => {
			setPaneInstance()
		})
		onMounted(() => {
			setPaneInstance()
		})
		return { panes, handleTabClick, activeIndex }
	},
	render () {
		const { panes, $slots, handleTabClick } = this
		const header = h(
			'div',
			{
				class: [ 'dol-tabs__header' ],
			},
			[
				h(
					TabNav,
					{
						panes,
						onTabClick: handleTabClick,
					},
				),
			],
		)
		const content = h(
			'div', {
				class: [ 'dol-tabs__content' ],
				ref: '$content',
			},
			$slots.default?.(),
		)
		return h(
			'div',
			{
				class: [ 'dol-tabs' ],
			},
			[ header, content ],
		)
	},
})
</script>
