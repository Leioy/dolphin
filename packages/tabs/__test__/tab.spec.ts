import { mount } from '@vue/test-utils'
import { nextTick} from 'vue'
import Tabs from '../src/tabs.vue'
import TabPane from '../src/tab-pane.vue'
import Tab from '../src/tabs.vue'

describe('Tab', () => {
	test('render without modelValue', async () => {
		const wrapper = mount({
			components: {
				'dol-tabs': Tabs,
				'dol-tab-pane': TabPane,
			},
			template: `
				<dol-tabs>
					<dol-tab-pane name="tab1" label="tab1"></dol-tab-pane>
					<dol-tab-pane name="tab2" label="tab2"></dol-tab-pane>
					<dol-tab-pane name="tab3" label="tab3"></dol-tab-pane>
				</dol-tabs>
			`,
		})
		const tabsWrapper  = wrapper.findComponent(Tabs)
		const panesWrapper = wrapper.findAllComponents(TabPane)
		expect(tabsWrapper.vm.activeIndex).toBe(0)
		expect(panesWrapper[0].find('.dol-tabs__pane').isVisible()).toBe(true)
		await nextTick()
		const navItem = tabsWrapper.findAll('.dol-tabs__item')
		expect(navItem[0].classes()).toContain('isActive')
	})
	test('render with modelValue', async () => {
		const wrapper = mount({
			components: {
				'dol-tabs': Tabs,
				'dol-tab-pane': TabPane,
			},
			template: `
				<dol-tabs model-value="tab2">
					<dol-tab-pane name="tab1" label="tab1"></dol-tab-pane>
					<dol-tab-pane name="tab2" label="tab2"></dol-tab-pane>
					<dol-tab-pane name="tab3" label="tab3"></dol-tab-pane>
				</dol-tabs>
			`,
		})
		const tabsWrapper  = wrapper.findComponent(Tabs)
		const panesWrapper = wrapper.findAllComponents(TabPane)
		expect(tabsWrapper.vm.activeIndex).toBe(1)
		expect(panesWrapper[0].find('.dol-tabs__pane').isVisible()).toBe(true)
		await nextTick()
		const navItem = tabsWrapper.findAll('.dol-tabs__item')
		expect(navItem[1].classes()).toContain('isActive')
	})
	test('click', async () => {
		const wrapper = mount({
			components: {
				'dol-tabs': Tabs,
				'dol-tab-pane': TabPane,
			},
			template: `
				<dol-tabs model-value="tab1">
					<dol-tab-pane name="tab1" label="tab1"></dol-tab-pane>
					<dol-tab-pane name="tab2" label="tab2"></dol-tab-pane>
					<dol-tab-pane name="tab3" label="tab3"></dol-tab-pane>
				</dol-tabs>
			`,
		})
		const tabsWrapper  = wrapper.findComponent(Tabs)
		await nextTick()
		const navItem = tabsWrapper.findAll('.dol-tabs__item')
		navItem[1].trigger('click')
		expect(tabsWrapper.emitted()).toHaveProperty('tab-click')
		expect(tabsWrapper.emitted()).toHaveProperty('update:modelValue')
		expect(tabsWrapper.vm.activeIndex).toBe(1)
	})
})

