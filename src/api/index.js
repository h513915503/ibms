import qs from 'qs'
import Vue from 'vue'

import store from '@/store'

import Hashes from 'jshashes'
import axios from 'axios'

const SHA1 = new Hashes.SHA1
const accessKeyId = 'APId1482c4fc9'
const accessKeySecret = 'f96de898642941ee8401bce20a076f18'

window.axios = axios

axios.defaults.timeout = 30 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use((config) => {
	if (config.url.startsWith('/hapi')) {
		config.headers['Content-Type'] = 'application/json'

		return config
	}

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
	let timer
	const {code, success, message, errorMessage, statusCode} = res.data

	if (res.config.url.startsWith('/hapi')) {
		if (code !== 0) {
			Vue.prototype.$message.error(message)

			return null
		}


		return res.data
	}

	// Token 过期
	if (statusCode === 401 && ! timer) {
		Vue.prototype.$message.error('登录已过期, 2s 后跳转登录页面')

		timer = setTimeout(() => {
			sessionStorage.removeItem('token')
			location.href = '/login'
		}, 2000)

		res.data = null

		return res.data
	}

	if (! success) {
		Vue.prototype.$message.error(errorMessage)

		res.data = null
	}

	return res.data
}, (error) => {
	if (! isShowErrors) {
		isShowErrors = true

		Vue.prototype.$message.error('服务君挂了，稍后重试')
	}

	return null
})