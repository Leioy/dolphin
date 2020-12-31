import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Icon from 'examples/components/icon.vue'
import Button from 'examples/components/button.vue'
import Tabs from 'examples/components/tabs.vue'
import Switch from 'examples/components/switch.vue'

const routes: RouteRecordRaw[] = [
	{ path: '/icon', component: Icon },
	{ path: '/button', component: Button },
	{ path: '/tabs', component: Tabs },
	{ path: '/switch', component: Switch },
]
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
