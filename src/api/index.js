import 'whatwg-fetch'
import qs from 'qs'
import Vue from 'vue'

import axios from 'axios'

window.axios = axios

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use((config) => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}

	return config
}, (error) => {
	log(error)
})

axios.interceptors.response.use((res) => {
	let {code, msg} = res.data

	if (code !== 0) {
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