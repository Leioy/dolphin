import { App } from 'vue'
import DolButton from 'packages/Button'
import DolIcon from 'packages/Icon'
import DolButtonGroup from 'packages/ButtonGroup'
import 'packages/utils/importAll'

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
