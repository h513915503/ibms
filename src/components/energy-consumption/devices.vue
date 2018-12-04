<style scoped>
.company-wrapper {
	display: flex;
	height: 624px;
}
.company-list {
	position: relative;
	border-right: 1px solid #E8E8E8;

	& .el-input {
		width: 208px;
		margin: 24px;
	}
}
.devices-list {
	height: 544px;
	padding-bottom: 24px;
	overflow-y: scroll;
	box-sizing: border-box;

	& li {
		width: 256px;
		color: rgba(0, 0, 0, .65);
		font-size: 14px;
		line-height: 38px;
		cursor: pointer;
		box-sizing: border-box;
	}

	& li.active {
		color: #0E7CC2;
		border-right: 1px solid #0E7CC2;
		background-color: #E6F9FF;
	}

	& li.actived .type-name {
		color: #0E7CC2;
		background-color: #E6F9FF;
	}

	& li.actived svg {
		transform: rotate(90deg);
	}
}
.devices-list::-webkit-scrollbar {
	display: none;
}
.type-name {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;
	position: sticky;
	top: 0px;

	& svg {
		width: 15px;
		height: 15px;
		transition: all .2s;
	}

	& path {
		fill: currentcolor;
	}
}
.model-list {
	height: 0;
	overflow: hidden;
	transition: all .2s;
}
.model-list li {
	padding-left: 48px;
}
.chart-container {
	flex: 1;
	padding: 24px;
}
.operation-wrapper {
	display: flex;
	align-items: center;
	margin-bottom: 24px;

	& h4 {
		color: rgba(0, 0, 0, .85);
		font-size: 16px;
	}
}
.operation {
	display: flex;
	align-items: center;
	margin-left: auto;

	& .btn-text {
		display: inline-block;
		margin-right: 24px;
		color: rgba(0, 0, 0, .65);
		font-size: 14px;
		cursor: pointer;
	}

	& .btn-text.actived {
		color: #1890FF;
	}

	& .btn-text:nth-child(4) {
		margin-right: 38px;
	}

	& >>> .el-input__inner {
		height: 32px;
		line-height: 32px;
	}

	& >>> .el-input__icon {
		line-height: 32px;
	}
}

& .el-input {
	width: 256px;
}
.btn-export {
	width: 74px;
	padding: 0;
	margin-left: 24px;
	line-height: 32px;
}
.unit-tips {
	display: flex;
	justify-content: space-between;
	margin-bottom: 24px;
	color: rgba(0, 0, 0, .45);
	font-size: 12px;
}
.electric::after {
	content: "";
	display: inline-block;
	width: 18px;
	height: 2px;
	margin-left: 10px;
	vertical-align: middle;
	background-color: #1890FF;
}
.water::before {
	content: "";
	display: inline-block;
	width: 18px;
	height: 2px;
	margin-right: 10px;
	vertical-align: middle;
	background-color: #9013FE;
}
.chart {
	height: 481px;
}
</style>

<template>
	<div class="content company-wrapper">
		<template v-if="loading">
			<loading></loading>
		</template>
		<template v-else>
			<div class="company-list">
				<el-input v-model="devicesName" placeholder="设备类型/型号"></el-input>
				<ul class="devices-list">
					<li :class="{actived: item.show}" v-for="(item, index) of devicesList" @click="spread(item, index)">
						<p class="type-name">
							{{item.name}}
							<svg v-if="item.list.length">
								<use xlink:href="#arrow"></use>
							</svg>
						</p>
						<ul class="model-list" ref="ul">
							<li :class="{active: devicesId === item.id}" v-for="item of item.list" @click.stop="devicesId = item.id">{{item.name}}</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="chart-container">
				<div class="operation-wrapper">
					<h4>能耗分析</h4>
					<div class="operation">
						<div class="btn-text" :class="{actived: dateType === 0}" @click="dateType = 0">今日</div>
						<div class="btn-text" :class="{actived: dateType === 1}" @click="dateType = 1">本周</div>
						<div class="btn-text" :class="{actived: dateType === 2}" @click="dateType = 2">本月</div>
						<div class="btn-text" :class="{actived: dateType === 3}" @click="dateType = 3">全年</div>
						<el-date-picker v-model="date" type="date" placeholder="选择时间"></el-date-picker>
						<el-button class="btn-export">导出</el-button>
					</div>
				</div>
				<div class="unit-tips">
					<div class="electric">电能耗（KW·h）</div>
					<div class="water">水能耗（Ton）</div>
				</div>
				<chart class="chart" :data="chartConfig"></chart>
			</div>
		</template>
	</div>
</template>

<script>
	import mixin from '@/mixins'
	// import getResponses from '@/api'
	import chart from '@/components/chart'

	export default {
		props: ['currentIndex'],

		data() {
			return {
				loading: false,
				loaded: false,

				devicesId: '',
				devicesName: '',
				devicesList: [],

				date: '',
				dateType: 0,
				chartData: []
			}
		},

		components: {
			chart
		},

		computed: {
			chartConfig() {
				const yAxisConfig = {
					type: 'value',
					splitNumber: 7,
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
				}
				const yAxis = [yAxisConfig, yAxisConfig]

				const seriesConfig = {
						name: '电能耗',
						type: 'line',
						areaStyle: null,
						smooth: true,
						data: this.chartData[0]
					}
				const series = [seriesConfig, {... seriesConfig, name: '水能耗', yAxisIndex: 1, data: this.chartData[1]}]

				return {
					color: ['#1890FF', '#9013FE'],
					title: false,
					grid: {
						top: 10,
						right: 50,
						bottom: 20,
						left: 45,
					},
					tooltip: {
						trigger: 'axis'
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
						data: this.chartxAxisData
					},
					yAxis,
					series
				}
			}
		},

		mixins: [mixin],

		watch: {
			currentIndex(value) {
				if (value === 2 && ! this.loaded) {
					this.getData()
				}
			}
		},

		methods: {
			async getData() {
				this.loading = true

				await this.getDevicesList()

				const chartData = await this.getChartData()

				this.loading = false
				this.loaded = true

				this.chartData = chartData
			},
			async getDevicesList() {
				const params = {
					companyId: 1,
					date: ''
				}

				const data = await getResponses('/getDevicesList', params)

				this.loading = false

				if (! data) {
					return
				}

				data.list.unshift({
					type: -1,
					name: '全部',
					list: []
				})

				this.devicesList = data.list.map((item) => ({... item, show: false}))

				if (data.list.length) {
					this.devicesId = data.list[0].id
				}
			},
			async getChartData() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([[0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24, 300], [3, 2, 1, 1, 2, 3, 4, 7, 6, 5, 8, 7, 5, 4]])
					}, 10)
				})
			},
			spread(item, index) {
				const ul = this.$refs.ul[index]

				if (item.show) {
					item.show = false
					ul.style.height = '0'
				} else {
					this.devicesList.forEach((current, index) => {
						current.show = false
						this.$refs.ul[index].style.height = '0'
					})

					item.show = true
					ul.style.height = `${38 * item.list.length}px`
				}
			}
		}
	}
</script>