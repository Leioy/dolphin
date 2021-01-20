import { mount } from '@vue/test-utils'
import Icon from 'packages/icon/src/index.vue'

describe('icon.vue', () => {
	test('render',() =>{
		const wrapper = mount(Icon,{
			props:{
				name:'ios-checkmark-circle'
			},
		})
		expect(wrapper.classes()).toContain('dol-icon-ios-checkmark-circle')
	})
	test('accept props color', () => {
		const wrapper = mount(Icon, {
			props: {
				name: 'ios-checkmark-circle',
				color: 'red',
			},
		})
		expect(wrapper.attributes('style')).toBe('color: red;')
	})
	test('accept props size', () => {
		const wrapper = mount(Icon, {
			props: {
				name: 'ios-checkmark-circle',
				size: '18',
			},
		})
		expect(wrapper.attributes('style')).toBe('font-size: 18px;')
	})
})

