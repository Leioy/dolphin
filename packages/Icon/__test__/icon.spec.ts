import { mount } from '@vue/test-utils'
import Icon from 'packages/Icon/src/index.vue'

describe('Icon.vue', () => {
	test('render',() =>{
		const wrapper = mount(Icon,{
			props:{
				name:'add'
			},
		})
		expect(wrapper.find('.dol-icon').exists()).toBe(true)
	})
	test('accept name props', () => {
		const wrapper = mount(Icon, {
			props: {
				name: 'add',
			},
		})
		expect(wrapper.find('use').attributes('href')).toBe('#icon-add')
	})
	test('accept props color', () => {
		const wrapper = mount(Icon, {
			props: {
				name: 'add',
				color: 'red',
			},
		})
		expect(wrapper.find('.dol-icon').attributes('style')).toBe('color: red;')
	})
	test('accept props size', () => {
		const wrapper = mount(Icon, {
			props: {
				name: 'add',
				size: '18',
			},
		})
		expect(wrapper.attributes('style')).toBe('font-size: 18px;')
	})
})

