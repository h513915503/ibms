import 'whatwg-fetch'
import qs from 'qs'
import Vue from 'vue'

import store from '@/store'

import Hashes from 'jshashes'
import axios from 'axios'

const SHA1 = new Hashes.SHA1
const accessKeyId = 'APId1482c4fc9'
const accessKeySecret = 'f96de898642941ee8401bce20a076f18'

window.axios = axios

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use((config) => {
	const timestamp = Date.now()
	const action = config.data.action

	// 安全相关
	config.data.timestamp = timestamp
	config.data.accessKeyId = accessKeyId
	config.data.signature = SHA1.hex(`${accessKeySecret}_${accessKeyId}_${timestamp}_${action}`)

	//  user token
	config.headers['x-sam-Token'] = store.state.token

	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}

	return config
}, (error) => {
	log(error)
})

axios.interceptors.response.use((res) => {
	const {success, msg} = res.data

	if (! success) {
		Vue.prototype.$message.error(msg)

		res.data = null
	}

	return res.data
}, (error) => {
	Vue.prototype.$message.error('请求失败')

	return null
})

export default async function getResponses(url, params, method = 'POST') {
	const formdata = qs.stringify(params)
	const options = {
		method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: formdata
	}

	if (method === 'GET') {
		delete options.headers
		delete options.credentials
		delete options.body

		url += '?' + formdata
	}

	const response = await fetch(url, options).catch((error) => {
		console.log(error)
	})

	const data = await response.json().catch((error) => {
		console.log(error)
	})

	let msg = ''

	if (data) {
		msg = data.msg
	} else {
		msg = '系统错误，请稍候重试'
	}

	// 天气接口
	if (data.HeWeather6) {
		data.code = 0
	}

	if (! data || data.code !== 0) {
		Vue.prototype.$message.error(msg)

		return null
	}

	return data
}