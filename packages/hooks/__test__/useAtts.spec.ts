import { mount } from '@vue/test-utils'
import type { ComponentOptions } from 'vue'
import { useAttrs } from '../useAttrs'

const CLASS = 'a'
const WIDTH = '50px'
const TEST_KEY = 'test'
const TEST_VALUE = 'fake'
const ANOTHER_TEST_VALUE = 'fake1'

const handleClick = jest.fn()

const genComp = (
	inheritAttrs = true,
	excludeKeys: string[] = [],
) => {
	return {
		template: `
			<div>
			<span v-bind="attrs"></span>
			</div>
		`,
		inheritAttrs,
		props: {},
		setup () {
			const attrs = useAttrs(excludeKeys)
			
			return {
				attrs,
			}
		},
	}
}

const _mount = (Comp: ComponentOptions) => {
	return mount({
		components: { Comp },
		template: `
			<comp
				class="${CLASS}"
				style="width: ${WIDTH}"
				${TEST_KEY}="${TEST_VALUE}"
				@click="handleClick"
			/>`,
		methods: {
			handleClick,
		},
	})
}

afterEach(() => {
	handleClick.mockClear()
})

describe('useAttrs', () => {
	test('class and style should not bind to node', async () => {
		const wrapper = _mount(genComp())
		const container = (wrapper.element) as HTMLDivElement
		const span = wrapper.find('span')
		expect(wrapper.classes(CLASS)).toBe(true)
		expect(container.style.width).toBe(WIDTH)
		expect(span.classes(CLASS)).toBe(false)
		expect(span.element.style.width).toBe('')
		expect(span.attributes(TEST_KEY)).toBe(TEST_VALUE)
		await span.trigger('click')
		expect(handleClick).toHaveBeenCalledTimes(2)
	})
	test('child node\'s attributes shoul update when props change', async () => {
		const wrapper = _mount(genComp())
		const span = wrapper.find('span')
		await wrapper.setProps({ [TEST_KEY]: ANOTHER_TEST_VALUE })
		expect(span.attributes(TEST_KEY)).toBe(ANOTHER_TEST_VALUE)
	})
	test('exclude attributes should not bind to child node',() =>{
		const wrapper = _mount(genComp(true,[TEST_KEY]))
		const span = wrapper.find('span')
		expect(span.attributes(TEST_KEY)).toBeUndefined()
	})
})
