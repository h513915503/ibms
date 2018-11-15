import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

import Overview from './views/overview/Index.vue'
import Lease from './views/lease/Index.vue'
import LeaseAdd from './views/lease/Add.vue'
import LeaseDetail from './views/lease/Detail.vue'

import ParkingLot from './views/parking-lot/Index.vue'
import ParkingLotAdd from './views/parking-lot/Add.vue'
import ParkingLotDetail from './views/parking-lot/Detail.vue'

import Proprietor from './views/proprietor/Index.vue'

import Visitor from './views/visitors/visitor.vue'
import AddNewVisitor from './views/visitors/addVisitor.vue'

import PersonnelRecord from './views/personnelRecord/personnel.vue'

import LightManagement from './views/lightManage/LightManagement.vue'
import LightAdd from './views/lightManage/lightAdd.vue'

import AirConditioner from './views/airConditionerManage/AirConditioner.vue'

import DeviceFault from './views/deviceFault/index.vue'

import PropertyManagement from './views/propertyManagement/PropertyManagement.vue'
import AddProperty from './views/propertyManagement/AddProperty.vue'

import PostManagement from './views/postManagement/PostManagement.vue'
import AddPost from './views/postManagement/AddPost.vue'

import ModifyPsw from './views/login/ModifyPsw.vue'
import Login from './views/login/Login'

import EnergyConsumption from './views/energy-consumption/Index.vue'

import Dashboard from './views/Dashboard/Dashboard.vue'

import Environment from './views/environment/Index.vue'

import NotFound from './views/not-found/index.vue'


const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				login: true
			}
		},
		{
			path: '*',
			component: NotFound
		}
	]
})

router.beforeEach((to, from, next) => {
	const token = sessionStorage.getItem('token')

	if (to.path === '/login') {
		if (token) {
			next('/')
		} else {
			next()
		}

		return
	}

	if (token) {
		if (to.path === '/login') {
			next('/')
		} else {
			next()
		}
	} else {
		next('/login')
	}
})

export const routesMap = [
	{
		type: 0,
		path: '/',
		name: 'overview',
		component: Overview
	},

	{
		type: 1,
		path: '/energy-consumption',
		nane: 'energy-consumption',
		component: EnergyConsumption
	},

	{
		type: 2,
		path: '/environment',
		name: 'environment',
		component: Environment
	},

	{
		type: 3,
		path: '/propertyManagement',
		name: 'propertyManagement',
		component: PropertyManagement
	},

	{
		type: 4,
		path: '/postManagement',
		name: 'postManagement',
		component: PostManagement
	},
	{
		type: 41,
		path: '/addPost',
		name: 'addPost',
		component: AddPost
	},

	{
		type: 5,
		path: '/lease',
		name: 'lease',
		component: Lease
	},
	{
		type: 51,
		path: '/lease/add',
		name: 'lease-add',
		component: LeaseAdd
	},
	{
		type: 52,
		path: '/lease/detail/:id',
		name: 'lease-detail',
		component: LeaseDetail
	},

	{
		type: 6,
		path: '/parking-lot',
		name: 'parking-lot',
		component: ParkingLot
	},
	{
		type: 61,
		path: '/parking-lot/add',
		name: 'parking-lot-add',
		component: ParkingLotAdd
	},
	{
		type: 62,
		path: '/parking-lot/detail/:id',
		name: 'parking-lot-detail',
		component: ParkingLotDetail
	},

	{
		type: 7,
		path: '/proprietor',
		name: 'proprietor',
		component: Proprietor
	},
	{
		type: 71,
		path: '/addProperty/:id',
		name: 'addProperty',
		component: AddProperty
	},
	{
		type: 8,
		path: '/visitor',
		name: 'visitor',
		component: Visitor
	},
	{
		type: 81,
		path: '/visitor/addVisitor',
		name: 'addVisitor',
		component: AddNewVisitor
	},
	{
		type: 9,
		path: '/personnel',
		name: 'personnel',
		component: PersonnelRecord
	},

	{
		type: 10,
		path: '/lightManagement',
		name: 'lightManagement',
		component: LightManagement
	},
	{
		type: 101,
		path: '/light/lightAdd',
		name: 'lightAdd',
		component: LightAdd
	},
	{
		type: 11,
		path: '/airConditioner',
		name: 'airConditioner',
		component: AirConditioner
	},
	{
		type: 12,
		path: '/device-fault',
		name: 'device-fault',
		component: DeviceFault
	},

	{
		type: 13,
		path: '/modifyPsw',
		name: 'modifyPsw',
		component: ModifyPsw,
		meta: {
			login: true
		}
	},
	{
		type: 14,
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		meta: {
			dashboard: true
		}
	}
]

export default router
