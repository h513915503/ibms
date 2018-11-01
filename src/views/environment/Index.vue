<style scoped>
.header {
	display: flex;
	align-items: center;
	padding: 24px;
	background-color: #FFF;
}
.status strong {
	color: rgba(0, 0, 0, .85);
	font-size: 30px;
}
.time {
	margin-bottom: 16px;
}
.data {
	margin-left: auto;
	color: rgba(0, 0, 0, .45);
	font-size: 14px;

	& .item {
		margin-right: 48px;
		display: inline-block;
		vertical-align: middle;
	}

	& span {
		display: block;
	}

	& span:first-child {
		margin-bottom: 24px;
	}

	/* & span:nth-child(3n) {
		margin-right: 0;
	} */

	& strong {
		margin-left: 8px;
		color: rgba(0, 0, 0, .85);
	}
}
.weather {
	padding-left: 70px;
	color: #595959;
	font-size: 16px;
	background: url(https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/aladdin/img/new_weath/bigicon/5.png) no-repeat left center;
	background-size: 50px;
}
.temperature {
	display: block;
	margin-bottom: 10px;
	color: #595959;
	font-size: 36px;
}

.container {
	margin: 24px;
	border-radius: 4px;
	background-color: #FFF;
}
.tab-bar {
	display: flex;
	align-items: center;
	padding: 0 24px;
	border-bottom: 1px solid #E8E8E8;

	& .item {
		width: 88px;
		height: 46px;
		margin-right: 16px;
		color: rgba(0, 0, 0, .65);
		font-size: 14px;
		text-align: center;
		line-height: 46px;
		cursor: pointer;
		box-sizing: border-box;
	}

	& .actived {
		color: #0E7CC2;
		border-bottom: 1px solid currentcolor;
	}
}
.function {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 24px 24px 14px;
	color: #000;
	font-size: 16px;
}
.type {
	padding-left: 24px;
	margin-bottom: 20px;
	color: rgba(0, 0, 0, .45);
	font-size: 12px;
}
.chart-wrapper {
	height: 600px;
}
</style>

<template>
	<div class="environment-wrapper">
		<template v-if="loading">
			<loading></loading>
		</template>

		<template v-else>
			<header class="header">
				<div class="status">
					<p class="time" v-text="currentDate"></p>
					<strong>{{envType | format}}</strong>
				</div>
				<div class="data">
					<div class="item" v-for="item of datas">
						<span v-for="item of item">
							{{item.text}}
							<strong v-text="item.data"></strong>
						</span>
					</div>
				</div>
				<div class="weather">
					<span class="temperature">{{temperature}}℃</span>
					<span v-text="weatherType"></span>
				</div>
			</header>

			<div class="container">
				<div class="tab-bar">
					<div class="item" :class="{actived: currentIndex === index}" v-text="item" v-for="(item, index) of tabs" @click="currentIndex = index"></div>
				</div>
				<div class="function">
					近30天数据
					<el-button>导出</el-button>
				</div>
				<p class="type" v-text="type"></p>

				<div class="chart-wrapper" ref="chart"></div>
			</div>
		</template>
	</div>
</template>

<script>
	import getResponses from '@/api'

	export default {
		data() {
			return {
				loading: false,

				envType: 0,
				temperature: '',
				weatherType: '',

				datas: [
					[{
						text: '室内湿度',
						data: '70%'
					},
					{
						text: '室内温度',
						data: '26%'
					},],

					[{
						text: 'CO2',
						data: '450ppm'
					},
					{
						text: 'CO',
						data: '8ppm'
					},],
					[{
						text: '水压',
						data: '0.6MPa'
					},
					{
						text: '室外湿度',
						data: '70%'
					}]
				],

				currentIndex: 0,
				tabs: ['室外温度', '室外湿度', '室内温度', '室内湿度', 'CO2', 'CO', '水压']
			}
		},

		computed: {
			currentDate() {
				const date = new Date()

				return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
			},
			type() {
				return ['温度℃', '湿度%', '温度℃', '湿度%', 'CO2 ppm', 'CO ppm', '水压 MPa'][this.currentIndex]
			}
		},

		filters: {
			format(value) {
				return ['环境暂无异常'][value]
			}
		},

		watch: {
			currentIndex(value) {
				this.$chart.setOption(this.generateOption(this.$d.reverse()))
			}
		},

		created() {
			this.loading = true

			Promise.all([this.getWeatherInfo(), this.getData()]).then(() => {
				this.loading = false

				this.$d = [9, 8, 6, 5, 2, 2, 2, 6, 8, 10, 15, 17, 19, 24, 27, 22, 18, 10, 20]

				this.$nextTick(() => {
					this.generateEnergyChart(this.$d)
				})
			})
		},

		methods: {
			async getWeatherInfo() {
				const params = {
					location: '115.236.39.114',
					key: '85b5120e44404f66972df1e7588aa60e'
				}

				const {HeWeather6: [{now}]} = await getResponses('https://free-api.heweather.com/s6/weather/now', params, 'GET')

				this.temperature = now.tmp
				this.weatherType = now.cond_txt
			},
			async getData() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve()
					}, 1000)
				})
			},
			generateOption(data) {
				// 设置当月天数
				let monthes = []
				const currentDate = new Date()
				let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate()

				while (day--) {
					monthes.unshift(day + 1)
				}

				return {
					title: false,
				    color: ['#0E7CC2'],
					grid: {
						top: 20,
						right: 30,
						bottom: 50,
						left: 50,
					},
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
				        data: monthes
				    },
					yAxis: {
				        type: 'value',
				        splitNumber : 5,
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
						    	color: '#e8e8e8'
						    }
				        }
				    },
				    series: [{
				        type: 'line',
				        data
				    }]
				}
			},
			generateEnergyChart(data) {
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