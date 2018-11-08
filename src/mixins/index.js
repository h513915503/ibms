export default {
	computed: {
		chartxAxisData() {
			const dateType = this.dateType
			let xAxisData = {}

			if (dateType === 0) {
				let hours = []
				let num = 0

				while (num < 25) {
					hours.push(`${num}点`)
					num += 2
				}

				xAxisData = hours
			}

			if (dateType === 1) {
				xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			}

			if (dateType === 2) {
				// 设置当月天数
				let days = []
				const currentDate = new Date()
				let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate()

				while (day--) {
					days.unshift(day + 1)
				}

				xAxisData = days
			}

			if (dateType === 3) {
				let monthes = []
				let num = 1

				while (num < 13) {
					monthes.push(`${num}月`)
					num++
				}

				xAxisData = monthes
			}

			return xAxisData
		}
	}
}