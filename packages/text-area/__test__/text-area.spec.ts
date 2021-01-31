import { mount } from '@vue/test-utils'
import Textarea from '../src/index.vue'
import { nextTick, reactive, ref } from 'vue'
import { sleep } from '../../test-utils/sleep'

const _mount = (options: any) => mount({
	components: {
		'dol-textarea': Textarea,
	},
	...options,
})
describe('text-area', () => {
	test('render', async () => {
		const wrapper = _mount({
			template: `
				<dol-textarea v-model="text"></dol-textarea>
			`,
			setup () {
				const text = ref('')
				return { text }
			},
		})
		const textarea = wrapper.find('textarea')
		const nativeTextarea = textarea.element
		expect(nativeTextarea.value).toBe('')
		wrapper.vm.text = '123'
		await nextTick()
		expect(nativeTextarea.value).toBe('123')
	})
	test('default to empty',() => {
		const wrapper= _mount({
			template:`
				<dol-textarea></dol-textarea>
			`
		})
		expect(wrapper.find('textarea').element.value).toBe('')
	})
	test('disabled',() => {
		const wrapper = _mount({
			template:`
			<dol-textarea disabled></dol-textarea>
			`
		})
		expect(wrapper.find('textarea').element.disabled).toBe(true)
	})
	test('readonly',() => {
		const  wrapper = _mount({
			template: `
				<dol-textarea readonly></dol-textarea>
			`
		})
		expect(wrapper.find('textarea').element.readOnly).toBe(true)
	})
	test('show word limit',async () =>{
		const wrapper = _mount({
			template: `
				<dol-textarea v-model="text"
				           show-word-limit maxlength="10"></dol-textarea>
			`,
			setup () {
				const text = ref('')
				return { text }
			},
		})
		const TextareaCount = wrapper.find('.dol-textarea__count')
		expect(TextareaCount.exists()).toBe(true)
		expect(TextareaCount.text()).toContain('10')
		await wrapper.setProps({ modelValue: 'hello' })
		expect(TextareaCount.text()).toContain('5')
	})
	test('methods to resize area',async() =>{
		const wrapper = _mount({
			template:`
				<dol-textarea ref="textarea" :autosize="autosize" v-model="text"></dol-textarea>
			`,
			setup (){
				const text = ref('hello world')
				const autosize =  reactive({minRows:1,maxRows:1})
				return {text,autosize}
			}
		})
		const textarea = wrapper.vm.$refs.textarea
		const originMinHeight =textarea.minHeight
		wrapper.vm.autosize.minRows = 5
		textarea.resizeTextarea()
		const nowMinHeight =textarea.textareaStyle.minHeight
		expect(originMinHeight).not.toEqual(nowMinHeight)
	})
	describe('event', () => {
		test('focus & blur', async () => {
			const handleFocus = jest.fn()
			const handleBlur = jest.fn()
			const wrapper = _mount({
				template: `
					<dol-textarea :model-value="value" @focus="handleFocus" @blur="handleBlur" />
				`,
				setup () {
					const value = ref('')
					return { value, handleFocus, handleBlur }
				},
			})
			const textarea = wrapper.find('textarea')
			await textarea.trigger('focus')
			expect(handleFocus).toHaveBeenCalled()
			await textarea.trigger('blur')
			expect(handleBlur).toHaveBeenCalled()
		})
		test('change', async () => {
			const wrapper = _mount({
				template: `
					<dol-textarea :model-value="val" @change="onChange"></dol-textarea>
				`,
				setup () {
					const val = ref('')
					const onChange = (e: Event) => {
						val.value = (e.target as HTMLInputElement).value
					}
					return { val, onChange }
				},
			})
			const textAreaElement = wrapper.find('textarea').element
			const simulateEvent = (text: string, event: string) => {
				textAreaElement.value = text
				textAreaElement.dispatchEvent(new Event(event))
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
					<dol-textarea v-model="text" clearable @clear="handleClear"></dol-textarea>
				`,
				setup () {
					const text = ref('hello')
					return { text, handleClear }
				},
			})
			const clearElement = wrapper.find('.dol-textarea__clear')
			await clearElement.trigger('click')
			expect(wrapper.vm.text).toBe('')
			expect(handleClear).toHaveBeenCalled()
		})
		test('input', async () => {
			const handleInput = jest.fn()
			const wrapper = _mount({
				template: `
					<dol-textarea
						placeholder="请输入内容"
						clearable
						:model-value="text"
						@input="handleInput"
					/>
				`,
				setup () {
					const text = ref('a')
					return { text, handleInput }
				},
			})
			const vm = wrapper.vm as any
			const textArea = wrapper.find('textarea')
			const nativeTextarea = textArea.element
			nativeTextarea.value = '1'
			await textArea.trigger('compositionstart')
			await textArea.trigger('input')
			nativeTextarea.value = '2'
			await textArea.trigger('input')
			await textArea.trigger('compositionend')
			expect(handleInput).toBeCalledTimes(1)
			// native value is controlled
			expect(vm.text).toEqual('a')
			expect(nativeTextarea.value).toEqual('a')
		})
		test('non-emits should work',async () => {
			const onKeyUp = jest.fn()
			const wrapper = mount(Textarea,{
				attrs:{
					onKeyUp
				}
			})
			await wrapper.find('textarea').trigger('keyup')
			expect(onKeyUp).toHaveBeenCalledTimes(1)
		})
	})
})
