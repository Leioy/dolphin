import { mount } from '@vue/test-utils'
import Button from 'packages/Button/src/index.vue'
test('uses mounts', async () => {
	const wrapper = mount(Button)
	expect(wrapper.html()).toContain('button')
})
