import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

import Login from './views/user/login'
import ForgotPassword from './views/user/forgot-password'
import ModifyPassword from './views/user/modify-password.vue'

import Overview from './views/overview/index.vue'

import Environment from './views/environment/index.vue'

import EnergyConsumption from './views/energy-consumption/index.vue'

import Property from './views/property-management/index.vue'
import AddProperty from './views/property-management/add.vue'
import EditProperty from './views/property-management/edit.vue'

import Post from './views/post-management/index.vue'
import AddPost from './views/post-management/add.vue'
import EditPost from './views/post-management/edit.vue'

import Lease from './views/lease/index.vue'
import LeaseAdd from './views/lease/add.vue'
import LeaseEdit from './views/lease/edit.vue'
import LeaseDetail from './views/lease/detail.vue'

import ParkingLot from './views/parking-lot/index.vue'
import ParkingLotAdd from './views/parking-lot/add.vue'
import ParkingLotDetail from './views/parking-lot/detail.vue'

import Proprietor from './views/proprietor/index.vue'
import ProprietorAdd from './views/proprietor/add.vue'
import ProprietorEdit from './views/proprietor/edit.vue'
import DetailProperty from './views/proprietor/detail.vue'

import Visitor from './views/visitors/visitor.vue'
import AddNewVisitor from './views/visitors/addVisitor.vue'
import EditVisitor from './views/visitors/editVisitor'

import PersonnelRecord from './views/personnelRecord/personnel.vue'

import LightManagement from './views/lightManage/LightManagement.vue'
import LightAdd from './views/lightManage/lightAdd.vue'

import AirConditioner from './views/airConditionerManage/AirConditioner.vue'

import DeviceFault from './views/deviceFault/index.vue'

import Dashboard from './views/Dashboard/Dashboard.vue'

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
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				login: true
			}
		},
		{
			path: '/modify-password',
			name: 'modify-password',
			component: ModifyPassword,
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
		if (to.path === '/forgot-password') {
			next()
		} else {
			next('/login')
		}
	}
})

export const routesMap = [
	{
		type: '1',
		path: '/',
		name: 'overview',
		component: Overview
	},

	{
		type: '2',
		path: '/energy-consumption',
		nane: 'energy-consumption',
		component: EnergyConsumption
	},

	{
		type: '3',
		path: '/environment',
		name: 'environment',
		component: Environment
	},

	{
		type: '4',
		path: '/property',
		name: 'property',
		component: Property
	},
	{
		type: '4',
		path: '/property/add',
		name: 'property-add',
		component: AddProperty
	},
	{
		type: '4',
		path: '/property/edit/:id',
		name: 'property-edit',
		component: EditProperty
	},

	{
		type: '5',
		path: '/post',
		name: 'post',
		component: Post
	},
	{
		type: '5',
		path: '/post/add',
		name: 'post-add',
		component: AddPost
	},
	{
		type: '5',
		path: '/post/edit/:id',
		name: 'post-edit',
		component: EditPost
	},

	{
		type: '6-1',
		path: '/lease',
		name: 'lease',
		component: Lease
	},
	{
		type: '6-1',
		path: '/lease/add',
		name: 'lease-add',
		component: LeaseAdd
	},
	{
		type: '6-1',
		path: '/lease/edit/:id',
		name: 'lease-edit',
		component: LeaseEdit
	},
	{
		type: '6-1',
		path: '/lease/detail/:id',
		name: 'lease-detail',
		component: LeaseDetail
	},

	{
		type: '6-2',
		path: '/parking-lot',
		name: 'parking-lot',
		component: ParkingLot
	},
	{
		type: '6-2',
		path: '/parking-lot/add',
		name: 'parking-lot-add',
		component: ParkingLotAdd
	},
	{
		type: '6-2',
		path: '/parking-lot/detail/:id',
		name: 'parking-lot-detail',
		component: ParkingLotDetail
	},

	{
		type: '7-1',
		path: '/proprietor',
		name: 'proprietor',
		component: Proprietor
	},
	{
		type: '7-1',
		path: '/proprietor/add',
		name: 'proprietor-add',
		component: ProprietorAdd
	},
	{
		type: '7-1',
		path: '/proprietor/edit/:id',
		name: 'proprietor-edit',
		component: ProprietorEdit
	},
	{
		type: '7-1',
		path: '/proprietor/detail/:id',
		name: 'proprietor-detail',
		component: DetailProperty
	},
	{
		type: '7-2',
		path: '/visitor',
		name: 'visitor',
		component: Visitor
	},
	{
		type: '7-2',
		path: '/visitor/addVisitor',
		name: 'addVisitor',
		component: AddNewVisitor
	},
	{
		type: '7-2',
		path: '/visitor/editVisitor',
		name: 'editVisitor',
		component: EditVisitor
	},
	{
		type: '7-3',
		path: '/personnel',
		name: 'personnel',
		component: PersonnelRecord
	},

	{
		type: '8-1',
		path: '/lightManagement',
		name: 'lightManagement',
		component: LightManagement
	},
	{
		type: '8-1',
		path: '/light/lightAdd',
		name: 'lightAdd',
		component: LightAdd
	},
	{
		type: '8-2',
		path: '/airConditioner',
		name: 'airConditioner',
		component: AirConditioner
	},
	{
		type: '8-3',
		path: '/device-fault',
		name: 'device-fault',
		component: DeviceFault
	},


	{
		type: '9',
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		meta: {
			dashboard: true
		}
	}
]

export default router
