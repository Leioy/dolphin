import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Icon from 'examples/components/icon.vue'
import Button from 'examples/components/button.vue'
import Tabs from 'examples/components/tabs.vue'

const routes: RouteRecordRaw[] = [
	{ path: '/icon', component: Icon },
	{ path: '/button', component: Button },
	{ path: '/tabs', component: Tabs },
]
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
