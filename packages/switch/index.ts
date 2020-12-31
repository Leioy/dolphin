import { App } from 'vue'
import Switch from './src/index.vue'

Switch.install = (app: App) => {
	app.component(Switch.name, Switch)
}
export default Switch
