import { App } from 'vue'
import ButtonGroup from './src/index.vue'

ButtonGroup.install = (app: App) => {
	app.component(ButtonGroup.name, ButtonGroup)
}
export default ButtonGroup
