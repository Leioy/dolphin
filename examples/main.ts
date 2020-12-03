import { createApp } from 'vue'
import App from './app.vue';
import router from './route';
import 'packages/styles/index.less'
import Dolphin from 'packages/index'
import './index.less'

const app = createApp(App)
app.use(router)
app.use(Dolphin)
app.mount('#app')

