import * as VueRouter from 'vue-router'
import Icon from 'examples/components/icon.vue'
import Button from 'examples/components/button.vue'

const routes = [
	{ path: '/icon', component: Icon },
	{ path: '/button', component: Button },
]
const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
})

export default router
