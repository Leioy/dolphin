import { App } from 'vue'
import DolButton from './button'
import DolIcon from './icon'
import DolButtonGroup from './button-group'
import Tabs from './tabs'
import TabPane from './tab-pane'
import Switch from './switch'

const components = [
	DolButton, DolIcon, DolButtonGroup, Tabs, TabPane,Switch
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
	DolButtonGroup,
	Tabs,
	TabPane,
	Switch
}
