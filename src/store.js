import Vue from 'vue'
import Vuex from 'vuex'

import router, {routesMap} from './router'

Vue.use(Vuex)

const aside = [
	{
		type: '1',
		title: '概览',
		index: 0,
		reg: /\/$/
	},
	{
		type: '2',
		title: '能耗',
		index: 3,
		reg: /\/energy-consumption/
	},
	{
		type: '3',
		title: '环境',
		index: 4,
		reg: /\/environment$/
	},
	{
		type: '4',
		title: '物业人员管理',
		index: 1,
		reg: /^\/property/
	},
	{
		type: '5',
		title: '岗位管理',
		index: 2,
		reg: /^\/post/
	},

	{
		title: '场地',
		items: [
			{
				type: '6-1',
				text: '楼宇运营管理',
				path: '/lease',
				reg: /^\/lease/,
			},
			{
				type: '6-2',
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
				type: '7-1',
				text: '业主管理',
				path: '/proprietor',
				reg: /\/proprietor/
			},
			{
				type: '7-2',
				text: '访客登记',
				path: '/visitor',
				reg: /\/visitor/
			},
			{
				type: '7-3',
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
				type: '8-1',
				text: '灯管理',
				path: '/lightManagement',
				reg: /\/lightManagement|\/light\/lightAdd/
			},
			{
				type: '8-2',
				text: '空调管理',
				path: '/airConditioner',
				reg: /\/airConditioner/
			},
			{
				type: '8-3',
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
		accountName: '',

		routes: [],
		aside: [],

		// 登录后将要去的 path
		path: '',
		permissions: [],
		detailInfo: {}
	},
	mutations: {
		setToken(state, value) {
			state.token = value
		},
		setAccountName(state, value) {
			state.accountName = value
		},
		setRole(state, value) {
			state.role = value
		},
		setPermissions(state, value) {
			if (! value.length) {
				return
			}

			state.permissions = value

			state.routes = routesMap.filter((item) => value.includes(item.type))
			state.path = state.routes.find((item) => item.type === value[0]).path

			// 更新侧边栏
			state.aside = aside.filter((item) => {
				if (item.items) {
					item.items = item.items.filter((current) => state.permissions.includes(current.type))

					if (item.items.length) {
						return true
					} else {
						return false
					}
				} else {
					return state.permissions.includes(item.type)
				}
			})
		}
	},
	actions: {
		async getUserInfo({commit, state}) {
			const params = {
				action: 'account.getPersonnelInfo'
			}
			const data = await axios.post('/api/dispatcher.do', params)

			if (! data) {
				return
			}

			commit('setAccountName', data.data.accountName)

			//commit('setRole', 'admin')
			commit('setPermissions', data.data.pagePermission)

			router.addRoutes(state.routes)
		}
	}
})
