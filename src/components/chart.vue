<template>
	<div class="chart-wrapper" ref="chart"></div>
</template>

<script>
	export default {
		props: {
			// data.xAxisType
			// 0: 小时
			// 1: 星期
			// 2: 日期
			// 3: 月份
			// 4: 自定义
			data: {
				type: Object,
				required: true
			}
		},

		watch: {
			data(value) {
				this.$chart.setOption(this.generateOption())
			}
		},

		mounted() {
			this.generateChart()
		},

		destroyed() {
			window.removeEventListener('resize', this.$resizeHandler)
		},

		methods: {
			generateOption() {
				return this.data

				let {xAxisType, double, xAxisData, title, smooth, areaStyle, splitNumber, show, color, grid, data} = this.data

				if (xAxisType === 0) {
					let hours = []
					let num = 0

					while (num < 25) {
						hours.push(`${num}点`)
						num += 2
					}

					xAxisData = hours
				}

				if (xAxisType === 1) {
					xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				}

				if (xAxisType === 2) {
					// 设置当月天数
					let days = []
					const currentDate = new Date()
					let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate()

					while (day--) {
						days.unshift(day + 1)
					}

					xAxisData = days
				}

				if (xAxisType === 3) {
					let monthes = []
					let num = 1

					while (num < 13) {
						monthes.push(`${num}月`)
						num++
					}

					xAxisData = monthes
				}

				let yAxis = {
			        type: 'value',
			        show,
			        splitNumber,
			        axisLine: {
			        	show: false
			        },
			        axisTick: {
			        	show: false,
			        	interval: 0,
			        	length: 10
			        },
			        splitLine: {
					    lineStyle: {
					    	type: 'dashed',
					    	color: '#E8E8E8'
					    }
			        }
			    }
			    let series = {
			        type: 'line',
			        areaStyle,
			        smooth,
			        data,
		    	}

			    if (double) {
			    	yAxis = [yAxis, yAxis]

			    	series.data = data[0]
			    	series = [series, {... series, yAxisIndex: 1, data: data[1]}]
			    }

				return {
					title,
				    color,
					grid,
				    xAxis: {
				        type: 'category',
				        axisLabel: {
				        	color: 'rgba(0, 0, 0, .65)'
				        },
				        axisLine: {
				        	lineStyle: {
				        		color: '#D9D9D9'
				        	}
				        },
				        axisPointer: {
				        	label: {
				        		formatter: (params) => {
				        			return params.value
				        		}
				        	}
				        },
				        boundaryGap: false,
				        data: xAxisData
				    },
				    tooltip: {
				        trigger: 'axis',
				        //backgroundColor: '#000'
				   	},
					yAxis,
				    series
				}
			},
			generateChart() {
				this.$chart = echarts.init(this.$refs['chart'], null, {
					renderer: 'svg'
				})

				this.$chart.setOption(this.generateOption())

				// 监听 resize
				this.$resizeHandler = () => this.$chart.resize()
				window.addEventListener('resize', this.$resizeHandler)
			},
		}
	}
</script>