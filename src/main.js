import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import '@/css/common.css'
import '@/css/element-reset.css'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

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

// 登录后才需要异步挂载应用
store.state.token ? store.dispatch('getUserInfo').then(() => {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
}) : new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
