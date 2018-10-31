import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'

import 'normalize.css'
import '@/css/common.css'
import '@/css/element-reset.css'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false

// 全局 loading
import loading from '@/components/loading'

Vue.component('loading', loading)

// 全局 popover
import popover from '@/components/popover'

Vue.component('popover', popover)

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
