import qs from 'qs'
import Vue from 'vue'

import store from '@/store'

import Hashes from 'jshashes'
import axios from 'axios'

const SHA1 = new Hashes.SHA1
const accessKeyId = 'APId1482c4fc9'
const accessKeySecret = 'f96de898642941ee8401bce20a076f18'

window.axios = axios

axios.defaults.timeout = 10 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use((config) => {
	const isFormData = config.data instanceof FormData

	const timestamp = Date.now()
	const action = isFormData ? config.data.get('action') : config.data.action
	const signature = SHA1.hex(`${accessKeySecret}_${accessKeyId}_${timestamp}_${action}`)


	if (isFormData) {
		config.data.append('timestamp', timestamp)
		config.data.append('accessKeyId', accessKeyId)
		config.data.append('signature', signature)
	}
	// 安全相关
	config.data.timestamp = timestamp
	config.data.accessKeyId = accessKeyId
	config.data.signature = signature

	//  user token
	store.state.token && (config.headers['x-sam-Token'] = store.state.token)

	if (config.method === 'post' && ! isFormData) {
		config.data = qs.stringify(config.data)
	}

	return config
}, (error) => {
	log(error)
})

let isShowErrors = false

axios.interceptors.response.use((res) => {
	const {success, errorMessage} = res.data

	if (! success) {
		Vue.prototype.$message.error(errorMessage)

		res.data = null
	}

	return res.data
}, (error) => {
	if (! isShowErrors) {
		isShowErrors = true

		Vue.prototype.$message.error({
			title: '提示',
			message: '服务君挂了，稍后重试'
		})
	}

	return null
})