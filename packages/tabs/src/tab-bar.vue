<template>
	<div class="dol-tabs__active-bar" ref="tabBar"></div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, inject, nextTick, ref, watch } from 'vue'
import { TActiveIndex } from 'typings'

export default defineComponent({
	name: 'DolTabBar',
	setup () {
		const activeIndex = inject<TActiveIndex>('activeIndex')!
		const tabBar = ref<HTMLDivElement | null>(null)
		const instance = getCurrentInstance()
		const getUnActiveNavWidth = (navList: NodeListOf<Element>) => {
			let offsetWidth = 0
			if (activeIndex.value === 0) {
				return offsetWidth
			} else {
				for (let i = 0; i < activeIndex.value; i++) {
					offsetWidth += parseFloat(getComputedStyle(navList[i]).width)
				}
				return offsetWidth
			}
		}
		const setBarStyle = () => {
			const $nav = instance?.parent?.refs.$nav as HTMLDivElement
			const navList = $nav.querySelectorAll('.dol-tabs__item')
			const activeNav = navList[activeIndex.value]
			const { width, paddingLeft, paddingRight } = getComputedStyle(activeNav);
			(tabBar.value as HTMLDivElement).style.width = parseFloat(width) - parseFloat(paddingLeft) - parseFloat(paddingRight) + 'px';
			(tabBar.value as HTMLDivElement).style.transform = `translateX(${getUnActiveNavWidth(navList) + parseFloat(paddingLeft)}px)`
		}
		watch(() => activeIndex.value, () => {
			nextTick(() => {
				setBarStyle()
			})
		})
		return { tabBar }
	},
})
</script>
