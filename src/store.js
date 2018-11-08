import Vue from 'vue'
import Vuex from 'vuex'

import router, {routesMap} from './router'
import getResponses from '@/api'

Vue.use(Vuex)

const aside = [
	{
		type: 0,
		title: '概览',
		index: 0,
		reg: /\/$/
	},
	{
		type: 3,
		title: '物业人员管理',
		index: 1,
		reg: /\/propertyManagement|\/addProperty/
	},
	{
		type: 4,
		title: '岗位管理',
		index: 2,
		reg: /\/postManagement|\/addPost/
	},
	{
		type: 1,
		title: '能耗',
		index: 3,
		reg: /\/energy-consumption/
	},
	{
		type: 2,
		title: '环境',
		index: 4,
		reg: /\/environment$/
	},
	{
		title: '场地',
		items: [
			{
				type: 5,
				text: '楼宇运营管理',
				path: '/lease',
				reg: /^\/lease/,
			},
			{
				type: 6,
				text: '停车场管理',
				path: '/parking-lot',
				reg: /\/parking-lot/
			}
		]
	},
	{
		title: '人员',
		items: [
			{
				type: 7,
				text: '业主管理',
				path: '/proprietor',
				reg: /\/proprietor/
			},
			{
				type: 8,
				text: '访客登记',
				path: '/visitor',
				reg: /\/visitor/
			},
			{
				type: 9,
				text: '人员出入记录',
				path: '/personnel',
				reg: /\/personnel/
			}
		]
	},
	{
		title: '设备',
		items: [
			{
				type: 10,
				text: '灯管理',
				path: '/lightManagement',
				reg: /\/lightManagement|\/light\/lightAdd/
			},
			{
				type: 11,
				text: '空调管理',
				path: '/airConditioner',
				reg: /\/airConditioner/
			},
			{
				type: 12,
				text: '设备故障',
				path: '/device-fault',
				reg: /\/device-fault/
			}
		]
	}
]

export default new Vuex.Store({
	state: {
		token: sessionStorage.getItem('token'),
		role: '',
		routes: [],
		aside: [],

		// 登录后将要去的 path
		path: '',
		permissions: []
	},
	mutations: {
		setRole(state, value) {
			state.role = value
		},
		setPermissions(state, value) {
			state.permissions = value

			state.routes = state.role === 'admin' ? routesMap : routesMap.filter((item) => value.includes(item.type))
			state.path = state.role === 'admin' ? '/' : state.routes.find((item) => item.type === value[0]).path

			// 更新侧边栏
			state.aside = state.role === 'admin' ? aside : aside.filter((item) => {
				if (item.items) {
					return item.items.filter((current) => state.permissions.includes(current.type)).length
				} else {
					return state.permissions.includes(item.type)
				}
			})
		}
	},
	actions: {
		async getUserInfo({commit, state}) {
			const data = await getResponses('/getUserPermission')

			if (! data) {
				return
			}

			commit('setRole', data.role)
			commit('setPermissions', data.permissions)

			console.log(state.routes)
			router.addRoutes(state.routes)
		}
	}
})
