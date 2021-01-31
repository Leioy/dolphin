import { App } from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Tabs from './tabs'
import TabPane from './tab-pane'
import Switch from './switch'
import Input from './input'
import Textarea from './text-area'

const components = [
	Button, Icon, ButtonGroup, Tabs, TabPane,Switch,Input,Textarea
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
	Button,
	Icon,
	ButtonGroup,
	Tabs,
	TabPane,
	Switch,
	Input,
	Textarea
}
