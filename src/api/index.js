import 'whatwg-fetch'
import qs from 'qs'
import Vue from 'vue'

export default async function getResponses(url, params, method = 'POST') {
	const formdata = qs.stringify(params)
	const options = {
		method,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}

	if (method === 'POST') {
		options.credentials = 'include'
		options.body = formdata
	} else {
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