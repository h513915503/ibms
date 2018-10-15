import 'whatwg-fetch'
import qs from 'qs'
import Vue from 'vue'

export default async function getResponses(url, params) {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params && qs.stringify(params)
	}).catch((error) => {
		console.log(error)
	})

	const data = await response.json().catch((error) => {
		console.log(error)
	})

	let msg

	if (data) {
		msg = data.msg
	} else {
		msg = '系统错误，请稍候重试'
	}

	if (! data || data.code !== 0) {
		Vue.prototype.$message.error(msg)

		return null
	}

	return data
}