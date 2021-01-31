import { App } from 'vue'
import Textarea from './src/index.vue'

Textarea.install = (app: App) => {
	app.component(Textarea.name, Textarea)
}
export default Textarea
