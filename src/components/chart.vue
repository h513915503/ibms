<template>
	<div class="chart-wrapper" ref="chart"></div>
</template>

<script>
	export default {
		props: {
			// 0: 小时
			// 1: 星期
			// 2: 日期
			// 3: 月份
			// 4: 自定义
			type: {
				type: Number,
				default: 0
			},
			title: {
				type: [Boolean, Object],
				default: false
			},
			color: {
				type: String,
				default: 'rgba(24, 144, 255, .2)'
			},
			smooth: {
				type: Boolean,
				default: true
			},
			splitNumber: {
				type: Number,
				default: 0
			},
			grid: {
				type: Object,
				required: true
			},
			yShow: {
				type: Boolean,
				default: true
			},
			xAxisData: {
				type: Array
			},
			areaStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			data: {
				type: Array,
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

		methods: {
			generateOption() {
				let xAxisData

				if (this.type === 0) {
					let hours = []
					let num = 0

					while (num < 25) {
						hours.push(`${num}点`)
						num += 2
					}

					xAxisData = hours
				}

				if (this.type === 1) {
					xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				}

				if (this.type === 2) {
					// 设置当月天数
					let days = []
					const currentDate = new Date()
					let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate()

					while (day--) {
						days.unshift(day + 1)
					}

					xAxisData = days
				}

				if (this.type === 3) {
					let monthes = []
					let num = 1

					while (num < 13) {
						monthes.push(`${num}月`)
						num++
					}

					xAxisData = monthes
				}

				if (this.type === 4) {
					xAxisData = this.xAxisData
				}

				return {
					title: this.title,
				    color: [this.color],
					grid: this.grid,
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
					yAxis: {
				        type: 'value',
				        show: this.yShow,
				        splitNumber: this.splitNumber,
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
				    },
				    series: [{
				        type: 'line',
				        areaStyle: this.areaStyle,
				        smooth: this.smooth,
				        data: this.data
				    }]
				}
			},
			generateChart(data) {
				this.$chart = echarts.init(this.$refs['chart'], null, {
					renderer: 'svg'
				})

				this.$chart.setOption(this.generateOption(data))

				window.addEventListener('resize', () => {
					this.$chart.resize()
				})
			},
		}
	}
</script>