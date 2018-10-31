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

import Visitor from './views/visitors/visitor.vue'
import AddNewVisitor from './views/visitors/addVisitor.vue'

import PersonnelRecord from './views/personnelRecord/personnel.vue'

import LightManagement from './views/lightManage/LightManagement.vue'
import LightAdd from './views/lightManage/lightAdd.vue'

import AirConditioner from './views/airConditionerManage/AirConditioner.vue'

import DeviceErrors from './views/deviceErrors/DeviceErrors.vue'

import PropertyManagement from './views/propertyManagement/PropertyManagement.vue'
import AddProperty from './views/propertyManagement/AddProperty.vue'

import PostManagement from './views/postManagement/PostManagement.vue'
import AddPost from './views/postManagement/AddPost.vue'

import ModifyPsw from './views/login/ModifyPsw.vue'
import Login from './views/login/Login'

Vue.use(Router)

const router = new Router({
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
		},
		{
			path: '/visitor',
			name: 'visitor',
			component: Visitor
		},
		{
			path: '/visitor/addVisitor',
			name: 'addVisitor',
			component: AddNewVisitor
		},
		{
			path: '/personnel',
			name: 'personnel',
			component: PersonnelRecord
		},
		{
			path: '/light/lightAdd',
			name: 'lightAdd',
			component: LightAdd
		},
		{
			path: '/airConditioner',
			name: 'airConditioner',
			component: AirConditioner
		},
		{
			path: '/deviceErrors',
			name: 'deviceErrors',
			component: DeviceErrors
		},
		{
			path: '/propertyManagement',
			name: 'propertyManagement',
			component: PropertyManagement
		},
		{
			path: '/addProperty',
			name: 'addProperty',
			component: AddProperty
		},
		{
			path: '/postManagement',
			name: 'postManagement',
			component: PostManagement
		},
		{
			path: '/addPost',
			name: 'addPost',
			component: AddPost
		},
		{
			path: '/modifyPsw',
			name: 'modifyPsw',
			component: ModifyPsw,
			meta: {
				login: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				login: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	const uid = sessionStorage.getItem('uid')

	if (to.path === '/login') {
		if (uid) {
			next('/')
		} else {
			next()
		}

		return
	}

	if (uid) {
		next()
	} else {
		next('/login')
	}
})

export default router
