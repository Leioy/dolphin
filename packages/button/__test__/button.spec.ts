import { mount } from '@vue/test-utils'
import Button from '../src/index.vue'
import ButtonGroup from 'packages/button-group/src/index.vue'

const slotsText = 'click'
describe('Button', () => {
	test('render', () => {
		const wrapper = mount(Button)
		expect(wrapper.classes()).toContain('dol-button')
	})
	test('type', () => {
		const wrapper = mount(Button, {
			props: { type: 'primary' },
		})
		expect(wrapper.classes()).toContain('dol-button-primary')
	})
	test('icon', () => {
		const wrapper = mount(Button, {
			props: { icon: 'success' },
		})
		expect(wrapper.find('.dol-icon-success').exists()).toBe(true)
	})
	test('loading', async () => {
		const wrapper = mount(Button, {
			props: { loading: true },
			slots: { default: slotsText },
		})
		expect(wrapper.classes()).toContain('dol-button-loading')
		expect(wrapper.find('.dol-icon-loading').exists()).toBe(true)
		await wrapper.trigger('click')
		expect(wrapper.emitted('click')).toBeFalsy()
	})
	test('size', () => {
		const wrapper = mount(Button, {
			props: { size: 'large' },
		})
		expect(wrapper.classes()).toContain('dol-button-large')
	})
	test('round', () => {
		const wrapper = mount(Button, {
			props: { round: true },
		})
		expect(wrapper.classes()).toContain('dol-button-round')
	})
	test('disabled', async () => {
		const wrapper = mount(Button, {
			props: { disabled: true },
			slots: { default: slotsText },
		})
		expect(wrapper.classes()).toContain('dol-button-disabled')
		await wrapper.trigger('click')
		expect(wrapper.emitted('click')).toBeUndefined()
	})
	test('slot', () => {
		const wrapper = mount(Button, {
			slots: { default: slotsText },
		})
		expect(wrapper.text()).toEqual(slotsText)
	})
	test('handle click', async () => {
		const wrapper = mount(Button, {
			slots: { default: slotsText },
		})
		await wrapper.trigger('click')
		expect(wrapper.emitted()).toBeDefined()
	})
	test('handle click inside',async () =>{
		const wrapper = mount(Button,{
			slots:{
				default: `<span class="inner-slot">${slotsText}</span>`
			}
		})
		await wrapper.find('.inner-slot').trigger('click')
		expect(wrapper.emitted()).toBeDefined()
	})
})
describe('ButtonGroup',() =>{
	test('render',() =>{
		const TestComponent = {
			template: `<dol-button-group>
      <dol-button type="primary">Prev</dol-button>
      <dol-button type="primary">Next</dol-button>
    </dol-button-group>`,
			components: {
				'dol-button-group': ButtonGroup,
				'dol-button': Button,
			},
		}
		const wrapper = mount(TestComponent)
		expect(wrapper.classes()).toContain('dol-button-group')
		expect(wrapper.findAll('button').length).toBe(2)
	})
})
