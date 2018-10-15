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

process.env.NODE_ENV === 'development' && (window.log = console.log.bind(console))

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
