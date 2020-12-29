import { App } from 'vue'
import TabPane from '../tabs/src/tab-pane.vue'

TabPane.install = (app: App) => {
	app.component(TabPane.name, TabPane)
}
export default TabPane
