import { mount } from '@vue/test-utils'
import Input from '../src/index.vue'
import { ref } from 'vue'
import { sleep } from 'packages/test-utils/sleep'
import Icon from 'packages/icon/src/index.vue'

const _mount = (options: any) => mount({
	components: {
		'dol-input': Input,
	},
	...options,
})
describe('Input', () => {
	test('render', async () => {
		const handleFocus = jest.fn()
		const wrapper = _mount({
			template: `
				<dol-input placeholder="请输入内容" minlength="3" maxlength="10" :model-value="value"
				           @focus="handleFocus"></dol-input>
			`,
			setup () {
				const value = ref('input')
				return { value, handleFocus }
			},
		})
		const inputElement = wrapper.find('input')
		const nativeInput = inputElement.element
		const vm = wrapper.vm
		expect(inputElement.exists()).toBe(true)
		expect(nativeInput.placeholder).toBe('请输入内容')
		expect(nativeInput.value).toBe('input')
		expect(nativeInput.minLength).toBe(3)
		expect(nativeInput.maxLength).toBe(10)
		await inputElement.trigger('focus')
		expect(handleFocus).toHaveBeenCalled()
		vm.value = 'text'
		await sleep()
		expect(nativeInput.value).toBe('text')
	})
	test('default to empty', () => {
		const wrapper = _mount({
			template: `
			<dol-input/>
		`,
		})
		const inputElement = wrapper.find('input')
		expect(inputElement.element.value).toBe('')
	})
	test('disabled', () => {
		const wrapper = _mount({
			template: `
				<dol-input disabled/>
		`,
		})
		const inputElement = wrapper.find('input')
		expect(inputElement.element.disabled).toBe(true)
	})
	test('readonly', () => {
		const wrapper = _mount({
			template: `
				<dol-input readonly/>
		`,
		})
		const inputElement = wrapper.find('input')
		expect(inputElement.element.readOnly).toBe(true)
	})
	test('prefix and suffix', () => {
		const wrapper = _mount({
			template: `
				<dol-input prefix="¥" suffix="RMB" />
			`,
		})
		const prefixElement = wrapper.find('.dol-input__prefix')
		const suffixElement = wrapper.find('.dol-input__suffix')
		expect(prefixElement.element.textContent).toBe('¥')
		expect(suffixElement.element.textContent).toBe('RMB')
	})
	test('prefix and suffix slots', () => {
		const wrapper = mount({
			components: {
				'dol-input': Input,
				'dol-icon': Icon,
			},
			template: `
				<dol-input>
				<template #prefix>
					<dol-icon name="md-search"></dol-icon>
				</template>
				<template #suffix>
					<dol-icon name="md-eye"></dol-icon>
				</template>
				</dol-input>
			`,
		})
		const prefixIcon = wrapper.find('.dol-icon-md-search')
		const suffixIcon = wrapper.find('.dol-icon-md-eye')
		expect(prefixIcon.exists()).toBe(true)
		expect(suffixIcon.exists()).toBe(true)
	})
	test('size', () => {
		const wrapper = _mount({
			template: `
				<dol-input size="large"></dol-input>
			`,
		})
		expect(wrapper.classes('dol-input--large')).toBe(true)
	})
	test('show word limit', async () => {
		const wrapper = _mount({
			template: `
				<dol-input v-model="value1"
				           show-word-limit maxlength="10"></dol-input>
			`,
			setup () {
				const value1 = ref('')
				return { value1 }
			},
		})
		const InputCount = wrapper.find('.dol-input__count')
		expect(InputCount.exists()).toBe(true)
		expect(InputCount.text()).toContain('10')
		await wrapper.setProps({ modelValue: 'hello' })
		expect(InputCount.text()).toContain('5')
	})
	describe('event', () => {
		test('focus & blur', async () => {
			const handleFocus = jest.fn()
			const handleBlur = jest.fn()
			const wrapper = _mount({
				template: `
					<dol-input :model-value="value" @focus="handleFocus" @blur="handleBlur" />
				`,
				setup () {
					const value = ref('')
					return { value, handleFocus, handleBlur }
				},
			})
			const input = wrapper.find('input')
			await input.trigger('focus')
			expect(handleFocus).toHaveBeenCalled()
			await input.trigger('blur')
			expect(handleBlur).toHaveBeenCalled()
		})
		test('change', async () => {
			const wrapper = _mount({
				template: `
					<dol-input :model-value="val" @change="onChange"></dol-input>
				`,
				setup () {
					const val = ref('')
					const onChange = (e: Event) => {
						val.value = (e.target as HTMLInputElement).value
					}
					return { val, onChange }
				},
			})
			const inputElement = wrapper.find('input').element
			const simulateEvent = (text: string, event: string) => {
				inputElement.value = text
				inputElement.dispatchEvent(new Event(event))
			}
			expect(wrapper.vm.val).toBe('')
			simulateEvent('hello', 'change')
			await sleep()
			expect(wrapper.vm.val).toBe('hello')
		})
		test('clear', async () => {
			const handleClear = jest.fn()
			const wrapper = _mount({
				template: `
					<dol-input v-model="text" clearable @clear="handleClear"></dol-input>
				`,
				setup () {
					const text = ref('hello')
					return { text, handleClear }
				},
			})
			const clearElement = wrapper.find('.dol-input__clear')
			await clearElement.trigger('click')
			expect(wrapper.vm.text).toBe('')
			expect(handleClear).toHaveBeenCalled()
		})
		test('input', async () => {
			const handleInput = jest.fn()
			const wrapper = _mount({
				template: `
					<dol-input
						placeholder="请输入内容"
						clearable
						:model-value="input"
						@input="handleInput"
					/>
				`,
				setup () {
					const input = ref('a')
					return { input, handleInput }
				},
			})
			const vm = wrapper.vm as any
			const inputWrapper = wrapper.find('input')
			const nativeInput = inputWrapper.element
			nativeInput.value = '1'
			await inputWrapper.trigger('compositionstart')
			await inputWrapper.trigger('input')
			nativeInput.value = '2'
			await inputWrapper.trigger('input')
			await inputWrapper.trigger('compositionend')
			expect(handleInput).toBeCalledTimes(1)
			// native input value is controlled
			expect(vm.input).toEqual('a')
			expect(nativeInput.value).toEqual('a')
		})
		test('non-emits should work',async () => {
			const onKeyUp = jest.fn()
			const wrapper = mount(Input,{
				attrs:{
					onKeyUp
				}
			})
			await wrapper.find('input').trigger('keyup')
			expect(onKeyUp).toHaveBeenCalledTimes(1)
		})
	})
})
