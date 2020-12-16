import { App } from 'vue'
import DolButton from './button'
import DolIcon from './icon'
import DolButtonGroup from './button-group'

const components = [
	DolButton, DolIcon,DolButtonGroup
]
const install = (app: App) => {
	components.forEach(component => {
		app.component(component.name, component)
	})
}
export default {
	install,
}
export {
	DolButton,
	DolIcon,
	DolButtonGroup
}
