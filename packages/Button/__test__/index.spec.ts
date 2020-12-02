import { mount } from '@vue/test-utils'
import Button from 'packages/Button/src/index.vue'

test('uses mounts', () => {
	const wrapper = mount(Button)
	expect(wrapper.text()).toBe('button')
})
