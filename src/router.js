import Vue from 'vue'
import Router from 'vue-router'

import Overview from './views/overview/Index.vue'
import Lease from './views/lease/Index.vue'
import LeaseAdd from './views/lease/Add.vue'
import LeaseDetail from './views/lease/Detail.vue'

import ParkingLot from './views/parking-lot/Index.vue'
import ParkingLotAdd from './views/parking-lot/Add.vue'
import ParkingLotDetail from './views/parking-lot/Detail.vue'

import Proprietor from './views/proprietor/Index.vue'

import LightManagement from './views/lightManage/LightManagement.vue'

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
		},

		{
			path: '/parking-lot',
			name: 'parking-lot',
			component: ParkingLot
		},
		{
			path: '/parking-lot/add',
			name: 'parking-lot-add',
			component: ParkingLotAdd
		},
		{
			path: '/parking-lot/detail/:id',
			name: 'parking-lot-detail',
			component: ParkingLotDetail
		},

		{
			path: '/proprietor',
			name: 'proprietor',
			component: Proprietor
		},
		{
			path: '/lightManagement',
			name: 'lightManagement',
			component: LightManagement
		}
	]
})
