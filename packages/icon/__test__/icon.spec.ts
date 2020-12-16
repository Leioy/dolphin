import { mount } from '@vue/test-utils'
import Icon from 'packages/icon/src/index.vue'

describe('icon.vue', () => {
	test('render',() =>{
		const wrapper = mount(Icon,{
			props:{
				name:'success'
			},
		})
		expect(wrapper.classes()).toContain('dol-icon-success')
	})
	test('accept props color', () => {
		const wrapper = mount(Icon, {
			props: {
				name: 'success',
				color: 'red',
			},
		})
		expect(wrapper.attributes('style')).toBe('color: red;')
	})
	test('accept props size', () => {
		const wrapper = mount(Icon, {
			props: {
				name: 'success',
				size: '18',
			},
		})
		expect(wrapper.attributes('style')).toBe('font-size: 18px;')
	})
})

