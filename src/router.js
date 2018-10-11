import Vue from 'vue'
import Router from 'vue-router'

import Overview from './views/overview/Index.vue'

import Lease from './views/lease/Index.vue'
import LeaseAdd from './views/lease/Add.vue'
import LeaseDetail from './views/lease/Detail.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'overview',
			component: Overview
		},

		{
			path: '/lease',
			name: 'lease',
			component: Lease
		},
		{
			path: '/lease/add',
			name: 'lease-add',
			component: LeaseAdd
		},
		{
			path: '/lease/detail/:id',
			name: 'lease-detail',
			component: LeaseDetail
		}
	]
})
