<style scoped>
.environment-wrapper {
	display: flex;
	flex-direction: column;
	padding-bottom: 24px;
}
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
	background-repeat: no-repeat;
	background-position: left center;
	background-size: 50px;
}
.temperature {
	display: block;
	margin-bottom: 10px;
	color: #595959;
	font-size: 36px;
}

.container {
	flex: 1;
	margin: 24px 24px 0;
	border-radius: 4px;
	background-color: #FFF;
}
.tab-bar {
	display: flex;
	align-items: center;
	padding: 0 24px;

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
		border-bottom: 2px solid currentcolor;
	}
}
.checkbox-container {
	display: flex;
	align-items: center;
	height: 32px;
	margin: 14px 24px 0;
	background-color: #FAFAFA;

	& .arrow {
		width: 32px;
		line-height: 32px;
		cursor: pointer;
		color: #595959;
		text-align: center;
		user-select: none;
		background-color: #F2F2F2;
	}
}
.checkbox-overflow {
	flex: 1;
	margin: 0 14px;
	overflow: hidden;
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
	height: 570px;
}

.co svg {
	width: 21px;
	height: 14px;
}
.co2 svg {
	width: 26px;
	height: 14px;
}

.attr-list {
	display: flex;
	align-items: center;
	transition: all .4s;
}
</style>
<style>
.echart-point {
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 10px;
	border-radius: 50%;
	vertical-align: middle;
	background-color: currentcolor;
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
						<span :class="item.cname" v-for="item of item">
							{{item.text}}
							<svg v-if="item.cname">
								<use :xlink:href="'#' + item.cname"></use>
							</svg>
							<strong v-text="item.data"></strong>
						</span>
					</div>
				</div>
				<div class="weather" :style="{backgroundImage: 'url(' + weatherImage + ')'}">
					<span class="temperature">{{temperature}}℃</span>
					<span v-text="weatherType"></span>
				</div>
			</header>

			<div class="container" ref="container">
				<div class="tab-bar">
					<div class="item" :class="{actived: currentIndex === index}" v-text="item" v-for="(item, index) of tabs" @click="currentIndex = index"></div>
				</div>
				<div class="checkbox-container">
					<span class="arrow el-icon-arrow-left" @click="slideLeft"></span>
					<div class="checkbox-overflow">
						<el-checkbox-group v-model="checkList" class="attr-list" ref="attr-list" :max="5">
						    <el-checkbox :label="item.attrId" v-for="item of attrList" ref="checkbox">{{item.attrName}}</el-checkbox>
						</el-checkbox-group>
					</div>
					<span class="arrow el-icon-arrow-right" @click="slideRight"></span>
				</div>

				<loading v-if="envLoading"></loading>
				<template v-else>
					<div class="function">
						近30天数据
						<el-button>导出</el-button>
					</div>
					<p class="type">{{type}}{{unit}}</p>

					<chart :data="chartConfig"></chart>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
	import chart from '@/components/chart'

	export default {
		data() {
			return {
				loading: false,
				envLoading: false,

				envType: 0,
				chartData: [],
				temperature: '',
				weatherType: '',
				weatherImage: '',

				attrList: [],
				checkList: [],

				datas: [
					[{
						text: '相对湿度',
						data: '70%'
					},
					{
						text: '大气压强',
						data: '26%'
					},],

					// [{
					// 	text: '',
					// 	data: '450ppm',
					// 	cname: 'co2'
					// },
					// {
					// 	text: '',
					// 	data: '8ppm',
					// 	cname: 'co'
					// },],
					// [{
					// 	text: '水压',
					// 	data: '0.6MPa'
					// },
					// {
					// 	text: '室外湿度',
					// 	data: '70%'
					// }]
				],

				currentIndex: 0,
				tabs: ['一氧化碳', '水压', '湿度', '温度'],

				series: [],
				unit: []
			}
		},

		components: {
			chart
		},

		computed: {
			currentDate() {
				const date = new Date()

				return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
			},
			type() {
				return this.tabs[this.currentIndex]
			},
			energyChartxAxisData() {
				const dateType = this.dateType
				let xAxisData = {}

				// 设置当月天数
				let days = []
				const currentDate = new Date()
				let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate()

				while (day--) {
					days.unshift(day + 1)
				}

				xAxisData = days


				return xAxisData
			},
			chartConfig() {
				return {
					color: ['#1890FF', '#F14382', '#000', '#22CC22', '#9370DB'],
					grid: {
						top: 20,
						right: 30,
						bottom: 50,
						left: 50,
					},
					tooltip: {
						trigger: 'axis',
						formatter: (params) => {
							let result = `${params[0].dataIndex}日<br/>`

							params.forEach((item) => {
								result += `<span class="echart-point" style="color: ${item.color}"></span>${item.seriesName}：${item.data}${this.unit}<br/>`
							})

							return result
						}
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
						boundaryGap: false,
						data: this.energyChartxAxisData
					},
					yAxis: {
						type: 'value',
						splitNumber: 5,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
						},
						splitLine: {
							lineStyle: {
								type: 'dashed',
								color: '#E8E8E8'
							}
						}
					},
					series: this.series
				}
			},
		},

		filters: {
			format(value) {
				return ['环境暂无异常'][value]
			}
		},

		watch: {
			currentIndex(value) {
				this.series = []
				this.unit = ''
				this.envLoading = true

				this.$refs['attr-list'].$el.style.transform = `translateX(0px)`

				this.getAttrList()
			},
			checkList(value) {
				//this.series =  this.series.filter((item) => value.includes(item.$attrId))

				this.series = []
				this.unit = ''
				this.envLoading = true

				this.getEnvData()
			}
		},

		mounted() {
			this.getWeatherInfo()
			this.getData()

			this.$containerWidth = this.$refs.container.offsetWidth
			this.$disance = 0
		},

		methods: {
			async getData() {
				this.loading = true

				const [data] = await Promise.all([this.getAttrList()]).catch(() => {
					this.loading = false
				})

				this.loading = false

				//this.chartData = data
			},
			async getAttrList() {
				const params = {
					action: 'consumer.queryConsumer1002Info',
					Id: this.currentIndex + 1
				}

				const data = await axios.post('/api/device/dispatcher.do', params)

				if (! data) {
					return
				}

				this.attrList = data.data
				this.checkList = data.data.map((item) => item.attrId).slice(0, 5)

				//this.getEnvData()
			},
			async getEnvData() {
				const params = {
					action: 'consumer.queryConsumer4002Info',
					attrId: this.checkList.join(',')
				}

				const data = await axios.post('/api/device/dispatcher.do', params)

				if (! data) {
					return
				}

				this.unit = data.data[0].unit
				this.attrList.filter(((item) => this.checkList.includes(item.attrId))).forEach((attrItem) => {
					let chartData
					let result = Array.from({length: 31}, ((item, index) => index + 1))

					chartData = result.map((item) => {
						const index = data.data.findIndex((current) => {
							if (+ current.timestamp.split('-').pop() === item && current.attrId === attrItem.attrId) {
								return true
							}
						})

						if (index !== -1) {
							return data.data[index].value
						}

						return 0
					})

					this.series.push({
						name: attrItem.attrName,
						type: 'line',
						areaStyle: null,
						smooth: false,
						data: chartData,
						$attrId: attrItem.attrId
					})
				})

				this.envLoading = false
			},
			async getWeatherInfo() {
				const params = {
					location: '115.192.119.193',
					key: '85b5120e44404f66972df1e7588aa60e'
				}

				const {HeWeather6: [{now}]} = await axios.get('https://free-api.heweather.net/s6/weather', {params})

				this.datas[0][0].data = now.hum
				this.datas[0][1].data = now.pres

				this.temperature = now.tmp
				this.weatherType = now.cond_txt
				this.weatherImage = `https://cdn.heweather.com/cond_icon/${now.cond_code}.png`
			},
			slideLeft() {
				if (this.$disance <= 0) {
					return
				}

				this.$disance -= 300
				this.$refs['attr-list'].$el.style.transform = `translateX(-${this.$disance}px)`
			},
			slideRight() {
				// 200 是侧边栏的 width 再减小点
				if (this.$refs.checkbox.slice(-1)[0].$el.getBoundingClientRect().right > this.$containerWidth + 200) {
					this.$disance += 300
					this.$refs['attr-list'].$el.style.transform = `translateX(-${this.$disance}px)`
				}


			}
		}
	}
</script>