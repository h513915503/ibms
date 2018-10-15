import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		selectRoom: []
	},
	mutations: {
		setSelectRoom(state, value) {
			state.selectRoom = value
		}
	},
	actions: {

	}
})
