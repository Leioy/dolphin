import { mount } from '@vue/test-utils'
import Switch from '../src/index.vue'

describe('Switch', () => {
	test('render', async () => {
		const wrapper = mount({
			components: { 'dol-switch': Switch },
			template: `
				<dol-switch v-model="value"></dol-switch>
			`,
			data () {
				return {
					value: false,
				}
			},
		})
		const vm = wrapper.vm
		expect(vm.value).toBe(false)
		await wrapper.find('.dol-switch').trigger('click')
		expect(vm.value).toBe(true)
		await wrapper.find('.dol-switch').trigger('click')
		expect(vm.value).toBe(false)
	})
	test('accept text', async () => {
		const wrapper = mount({
			components: { 'dol-switch': Switch },
			template: `
				<dol-switch v-model="value" active-text="开" inactive-text="关"></dol-switch>
			`,
			data () {
				return { value: false }
			},
		})
		expect(wrapper.text()).toBe('关')
		expect(wrapper.vm.value).toBe(false)
		await wrapper.find('.dol-switch').trigger('click')
		expect(wrapper.text()).toBe('开')
		expect(wrapper.vm.value).toBe(true)
	})
	test('accept icon', async () => {
		const wrapper = mount({
			components: { 'dol-switch': Switch },
			template: `
				<dol-switch v-model="value" active-icon="check" inactive-icon="close"></dol-switch>
			`,
			data () {
				return { value: false }
			},
		})
		expect(wrapper.find('.dol-icon-close').exists()).toBe(true)
		expect(wrapper.vm.value).toBe(false)
		await wrapper.find('.dol-switch').trigger('click')
		expect(wrapper.find('.dol-icon-check').exists()).toBe(true)
		expect(wrapper.vm.value).toBe(true)
	})
	test('loading', async () => {
		const wrapper = mount({
			components: { 'dol-switch': Switch },
			template: `
				<dol-switch v-model="value" loading></dol-switch>
			`,
			data () {
				return { value: true }
			},
		})
		expect(wrapper.find('.dol-icon-loading').exists()).toBe(true)
		expect(wrapper.vm.value).toBe(true)
		await wrapper.find('.dol-switch').trigger('click')
		expect(wrapper.vm.value).toBe(true)
	})
	test('disabled', async() => {
		const wrapper = mount({
			components: { 'dol-switch': Switch },
			template: `
				<dol-switch v-model="value" disabled></dol-switch>
			`,
			data () {
				return { value: true }
			},
		})
		expect(wrapper.vm.value).toBe(true)
		await wrapper.find('.dol-switch').trigger('click')
		expect(wrapper.vm.value).toBe(true)
	})
})
