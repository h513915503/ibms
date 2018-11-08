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

	& ul {
		height: 544px;
		padding-bottom: 24px;
		overflow-y: scroll;
		box-sizing: border-box;
	}

	& ul::-webkit-scrollbar {
		display: none;
	}

	& li {
		width: 256px;
		padding: 0 24px;
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
}
.mask::after {
	content: "";
	width: 100%;
	height: 100px;
	position: absolute;
	top: 80px;
	left: 0;
	opacity: 0;
	pointer-events: none;
	background-image: linear-gradient(to bottom, #FFF, rgba(0, 0, 0, .01));
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
			<div class="company-list" :class="{mask: showMask}">
				<el-input v-model="companyName" placeholder="单位名称"></el-input>
				<ul @scroll="scroll">
					<li :class="{active: companyId === item.id}" v-for="item of companyList" @click="companyId = item.id">{{item.name}}</li>
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
	import getResponses from '@/api'
	import chart from '@/components/chart'

	export default {
		props: ['currentIndex'],

		data() {
			return {
				loading: false,
				loaded: false,

				showMask: false,

				companyId: '',
				companyName: '',
				companyList: [],

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
				if (value === 1 && ! this.loaded) {
					this.getData()
				}
			}
		},

		methods: {
			async getData() {
				this.loading = true

				await this.getCompanyList()

				const chartData = await this.getChartData()

				this.loading = false
				this.loaded = true

				this.chartData = chartData
			},
			async getCompanyList() {
				const params = {
					companyId: 1,
					date: ''
				}

				const data = await getResponses('/getCompanyList', params)

				this.loading = false

				if (! data) {
					return
				}

				this.companyList = data.list

				if (data.list.length) {
					this.companyId = data.list[0].id
				}
			},
			async getChartData() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([[0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24, 300], [3, 2, 1, 1, 2, 3, 4, 7, 6, 5, 8, 7, 5, 4]])
					}, 10)
				})
			},
			scroll(e) {
				if (e.target.scrollTop > 12) {
					this.showMask = true
				} else {
					this.showMask = false
				}
			}
		}
	}
</script>