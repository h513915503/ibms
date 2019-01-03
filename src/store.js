import Vue from 'vue'
import Vuex from 'vuex'

import router, {routesMap} from './router'

Vue.use(Vuex)

const aside = [
	{
		type: '1',
		title: '概览',
		index: 0,
		reg: /\/$/,
		path: '/'
	},
	{
		type: '2',
		title: '能耗',
		index: 3,
		reg: /\/energy-consumption/,
		path: '/energy-consumption'
	},
	{
		type: '3',
		title: '环境',
		index: 4,
		reg: /\/environment$/,
		path: '/environment'
	},
	{
		type: '4',
		title: '物业人员管理',
		index: 1,
		reg: /^\/property/,
		path: '/property'
	},
	{
		type: '5',
		title: '岗位管理',
		index: 2,
		reg: /^\/post/,
		path: '/post'
	},
	{
		type: '9',
		title: '门禁',
		index: 5,
		reg: /^\/entrance-guard/,
		path: '/entrance-guard'
	},
	{
		type: '9',
		title: '监控',
		index: 6,
		reg: /^\/video-record/,
		path: '/video-record'
	},

	{
		type: '9',
		title: '电梯',
		index: 5,
		reg: /^\/elevator/,
		path: '/elevator/monitor'
	},

	{
		title: '场地',
		items: [
			{
				type: '6-1',
				text: '楼宇运营管理',
				path: '/lease',
				reg: /^\/lease/,
				path: '/lease'
			},
			{
				type: '6-2',
				text: '停车场管理',
				path: '/parking-lot',
				reg: /\/parking-lot/,
				path: '/parking-lot'
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
				reg: /\/proprietor/,
				path: '/proprietor'
			},
			{
				type: '7-2',
				text: '访客登记',
				path: '/visitor',
				reg: /\/visitor/,
				path: '/visitor'
			},
			{
				type: '7-3',
				text: '人员出入记录',
				path: '/personnel',
				reg: /\/personnel/,
				path: '/personnel'
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
				reg: /\/lightManagement|\/light\/lightAdd/,
				path: '/lightManagement'
			},
			{
				type: '8-2',
				text: '空调管理',
				path: '/airConditioner',
				reg: /\/airConditioner/,
				path: '/airConditioner'
			},
			{
				type: '8-3',
				text: '设备故障',
				path: '/device-fault',
				reg: /\/device-fault/,
				path: '/device-fault'
			}
		]
	}
]

export default new Vuex.Store({
	state: {
		token: sessionStorage.getItem('token'),
		role: '',
		accountName: '',

		error500: false,

		routes: [],
		aside: [],

		// 登录后将要去的 path
		path: '',
		permissions: [],
		detailInfo: {},

		// 楼层号列表
		floorNumberList: [],

		// 公司列表
		companyList: []
	},
	mutations: {
		setToken(state, value) {
			state.token = value
		},
		setFloorNumberList(state, value) {
			state.floorNumberList = value
		},
		setAccountName(state, value) {
			state.accountName = value
		},
		setCompanyList(state, value) {
			state.companyList = value
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
		async getUserInfo({commit, state, dispatch}, userInfo) {
			let data
			const params = {
				action: 'account.getPersonnelInfo'
			}

			if (userInfo) {
				data = userInfo
			} else {
				data = await axios.post('/api/account/dispatcher.do', params)
			}

			if (! data) {
				return Promise.reject()
			}

			const {accountName, pagePermission} = data.data

			commit('setAccountName', accountName)
			commit('setPermissions', pagePermission)

			router.addRoutes(state.routes)
		},
		async getCompanyList({commit}) {
			const params = {
				action: 'accountManagement.queryRentalInfo'
			}

			const data = await axios.post('/api/account/dispatcher.do', params)

			if (! data) {
				return
			}

			commit('setCompanyList', data.data.map((item) => ({id: item.id, companyName: item.rentalCompany})))
		},
	}
})
