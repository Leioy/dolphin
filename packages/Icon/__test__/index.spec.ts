import { mount } from '@vue/test-utils'
import Icon from 'packages/Icon/src/index.vue'

test('uses mounts', async () => {
	const wrapper = mount(Icon)
	expect(wrapper.html()).toContain('icon')
})
