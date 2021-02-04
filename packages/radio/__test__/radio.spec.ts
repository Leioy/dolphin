import { mount } from '@vue/test-utils'
import Radio from '../src/radio.vue'
import RadioGroup from '../src/radio-group.vue'
import { nextTick, ref } from 'vue'

const _mount = (options: any) => mount({
	components: {
		'dol-radio': Radio,
		'dol-radio-group': RadioGroup,
	},
	...options,
})
describe('radio', () => {
	test('render', async () => {
		const wrapper = _mount({
			template: `
				<dol-radio v-model="radio" label="a"></dol-radio>
			`,
			setup () {
				const radio = ref('')
				return { radio }
			},
		})
		expect(wrapper.classes()).toContain('dol-radio')
		expect(wrapper.classes()).not.toContain('is-checked')
		await wrapper.trigger('click')
		expect(wrapper.classes()).toContain('is-checked')
	})
	test('disabled', async () => {
		const wrapper = _mount({
			template: `
				<dol-radio v-model="radio" disabled label="a"></dol-radio>
			`,
			setup () {
				const radio = ref('')
				return { radio }
			},
		})
		await wrapper.trigger('click')
		expect(wrapper.vm.radio).toBe('')
		expect(wrapper.classes()).toContain('is-disabled')
	})
	test('emit change', async () => {
		const wrapper = _mount({
			template: `
				<dol-radio v-model="radio" @change="onChange" label="a"></dol-radio>
			`,
			setup () {
				const radio = ref('')
				const testData = ref('')
				const onChange = (val: string) => {
					testData.value = val
				}
				return { radio, testData, onChange }
			},
		})
		await wrapper.trigger('click')
		expect(wrapper.vm.testData).toBe('a')
	})
	test('change event only triggers on user input', async () => {
		const wrapper = _mount({
			template: `
				<dol-radio v-model="radio" @change="onChange" label="a"></dol-radio>
			`,
			setup () {
				const radio = ref('')
				const testData = ref('')
				const onChange = (val: string) => {
					testData.value = val
				}
				return { radio, testData, onChange }
			},
		})
		const vm = wrapper.vm
		vm.radio = 'hello'
		await nextTick()
		expect(vm.testData).toBe('')
		expect(vm.radio).toBe('hello')
	})
})
describe('radio group', () => {
	test('render', async () => {
		const wrapper = _mount({
			template: `
				<dol-radio-group v-model="radio">
				<dol-radio :label="3" ref="radio1"></dol-radio>
				<dol-radio :label="6" ref="radio2"></dol-radio>
				<dol-radio :label="9"></dol-radio>
				</dol-radio-group>
			`,
			setup () {
				const radio = ref(3)
				return { radio }
			},
		})
		const radio1 = wrapper.findComponent({ ref: 'radio1' })
		expect(radio1.classes()).toContain('is-checked')
		const radio2 = wrapper.findComponent({ ref: 'radio2' })
		await radio2.trigger('click')
		expect(radio2.classes()).toContain('is-checked')
		expect(wrapper.vm.radio).toBe(6)
	})
	test('disabled', async () => {
		const wrapper = _mount({
			template: `
				<dol-radio-group v-model="radio" disabled>
				<dol-radio :label="3" ref="radio1"></dol-radio>
				<dol-radio :label="6" ref="radio2"></dol-radio>
				<dol-radio :label="9"></dol-radio>
				</dol-radio-group>
			`,
			setup () {
				const radio = ref(3)
				return { radio }
			},
		})
		const radio1 = wrapper.findComponent({ ref: 'radio1' })
		const radio2 = wrapper.findComponent({ ref: 'radio2' })
		expect(wrapper.find('label.is-disabled').exists()).toBe(true)
		expect(radio1.classes()).toContain('is-checked')
		await radio2.trigger('click')
		expect(wrapper.vm.radio).toBe(3)
		expect(radio1.classes()).toContain('is-checked')
	})
	test('emit change', async () => {
		const wrapper = _mount({
			template: `
				<dol-radio-group v-model="radio" @change="onChange">
				<dol-radio :label="3" ref="radio1"></dol-radio>
				<dol-radio :label="6" ref="radio2"></dol-radio>
				<dol-radio :label="9"></dol-radio>
				</dol-radio-group>
			`,
			setup () {
				const radio = ref(3)
				const testData = ref(0)
				const onChange = (val: number) => {
					testData.value = val
				}
				return { radio, testData, onChange }
			},
		})
		const radio2 = wrapper.findComponent({ ref: 'radio2' })
		await radio2.trigger('click')
		expect(wrapper.vm.testData).toBe(6)
	})
	test('change event only triggers on user input',async() =>{
		const wrapper = _mount({
			template: `
				<dol-radio-group v-model="radio" @change="onChange">
				<dol-radio :label="3" ref="radio1"></dol-radio>
				<dol-radio :label="6" ref="radio2"></dol-radio>
				<dol-radio :label="9"></dol-radio>
				</dol-radio-group>
			`,
			setup () {
				const radio = ref(3)
				const testData = ref(0)
				const onChange = (val: number) => {
					testData.value = val
				}
				return { radio, testData, onChange }
			},
		})
		const vm = wrapper.vm
		vm.radio = 6
		expect(vm.testData).toBe(0)
	})
})
