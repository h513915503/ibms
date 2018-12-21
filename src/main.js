import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import '@/css/common.css'
import '@/css/element-reset.css'

import 'element-ui/lib/theme-chalk/index.css'
import {Message, Button, Select, Option, Pagination, Input, InputNumber, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn, Popover, DatePicker, Form, Breadcrumb, BreadcrumbItem, FormItem} from 'element-ui'

Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Pagination.name, Pagination)
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Popover.name, Popover)
Vue.component(DatePicker.name, DatePicker)

Vue.prototype.$message = Message

Vue.config.productionTip = false

// 全局 loading
import loading from '@/components/loading'

Vue.component('loading', loading)

// 全局 popover
import popover from '@/components/popover'

Vue.component('popover', popover)

// 全局 tabbar
import tabBar from '@/components/tab-bar'

Vue.component('tabBar', tabBar)

// 全局 toolbar
import toolBar from '@/components/tool-bar'

Vue.component('toolBar', toolBar)

// 全局filters
import * as filters from './utils/util.js'

// Vue.filter('timeFormat', timeFormat)
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

//import all svg
const requireAllSvg = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./assets/svg', true, /\.svg$/)

requireAllSvg(req)

process.env.NODE_ENV === 'development' && (window.log = console.log.bind(console))

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
