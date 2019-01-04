<style src="@/css/energy.css" scoped></style>

<template>
	<div id="energy-consumption-wrapper">
		<template v-if="loading">
			<loading></loading>
		</template>

		<template v-else>
			<div class="container">
				<header class="header">
					<tab-bar :list="tabBarList"></tab-bar>

					<div class="tab-bar">
					   <div class="item" :class="{actived: currentIndex === index}" v-text="item" v-for="(item, index) of tabs" @click="currentIndex = index"></div>
					</div>
				</header>

				<div class="content energy" v-show="currentIndex === 0">
					<div class="bar">
						<div class="tab-bar">
							<div class="item" :class="{actived: currentResourceType === 0}" @click="currentResourceType = 0">电能耗</div>
							<div class="item" :class="{actived: currentResourceType === 1}" @click="currentResourceType = 1">水能耗</div>
						</div>
						<div class="operation">
							<div class="btn-text" :class="{actived: dateType === 0}" @click="dateType = 0">今日</div>
							<div class="btn-text" :class="{actived: dateType === 1}" @click="dateType = 1">本周</div>
							<div class="btn-text" :class="{actived: dateType === 2}" @click="dateType = 2">本月</div>
							<div class="btn-text" :class="{actived: dateType === 3}" @click="dateType = 3">全年</div>
							<el-date-picker v-model="date" type="date" placeholder="选择时间"></el-date-picker>
						</div>
					</div>
					<div class="chart-wrapper">
						<chart class="chart" :data="chartConfig"></chart>

						<div class="ranking-list">
							<p>{{currentResourceType === 0 ? '电' : '水'}}能耗时段排名</p>
							<ul>
								<li v-for="item of rankingList">
									<span>{{item.start}}点~{{item.end}}点</span>
									<span class="num">{{item.num | format}}</span>
								</li>
							</ul>
						</div>
					</div>
					<el-button class="btn-export">导出</el-button>
				</div>

                <company :currentIndex="currentIndex" v-show="currentIndex === 1"></company>
				<devices :currentIndex="currentIndex" v-show="currentIndex === 2"></devices>
			</div>
		</template>
	</div>
</template>

<script>
	import mixin from '@/mixins'
	import tabBar from '@/components/tab-bar.vue'
	import chart from '@/components/chart'
    import company from '@/components/energy-consumption/company.vue'
	import devices from '@/components/energy-consumption/devices.vue'

	export default {
		data() {
			return {
				loading: false,

				tabBarList: [
					{
						text: '今日耗电（度）',
						number: 10
					},
					{
						text: '今日耗水（L）',
						number: 10
					},
					{
						text: '今日耗电设备',
						number: 10
					}
				],

				currentIndex: 0,
				tabs: ['按日期', '按单位', '按设备'],

				currentResourceType: 0,
				date: '',
				dateType: 0,
				chartData: [],
				energyRankingList: [
					{
						start: 8,
						end: 10,
						num: 15234
					},
					{
						start: 8,
						end: 10,
						num: 15234
					},
					{
						start: 8,
						end: 10,
						num: 15234
					},
					{
						start: 8,
						end: 10,
						num: 15234
					}
				],
				waterRankingList: [
					{
						start: 8,
						end: 10,
						num: 15234
					},
					{
						start: 8,
						end: 10,
						num: 15234
					},
					{
						start: 8,
						end: 10,
						num: 15234
					},
					{
						start: 8,
						end: 10,
						num: 15234
					}
				]

			}
		},

		components: {
			tabBar,
			chart,
			company,
            devices
		},

		computed: {
			chartConfig() {
				return {
					color: ['rgba(24, 144, 255, .2)'],
					title: {
						top: 0,
						textStyle: {
							color: 'rgba(0, 0, 0, .85)',
							fontSize: '14'
						},
						text: ['电能耗（KW · h）', '水能耗实况（Tun）'][this.currentResourceType]
					},
					grid: {
						top: 60,
						right: 15,
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
					yAxis: {
						type: 'value',
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
					series: {
						name: ['电能耗', '水能耗'][this.currentResourceType],
						type: 'line',
						areaStyle: {},
						smooth: true,
						data: this.chartData
					}
				}
			},
			rankingList() {
				if (this.currentResourceType === 0) {
					return this.energyRankingList
				}

				return this.waterRankingList
			}
		},

		filters: {
			format(value) {
				return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			}
		},

		mixins: [mixin],

		watch: {
			currentResourceType(value) {
				this.energyChartData = this.$d.reverse()
			}
		},

		created() {
			this.$d = [0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24, 300]
			this.chartData  = this.$d

			this.loading = true

			Promise.all([this.getTabData(), this.getEnergyData()]).then(() => {
				this.loading = false
			})
		},

		methods: {
			async getTabData() {
                const params = {
                    action: 'ParkingRental.parkingRentalReportInfo'
                }

                const data = await axios.post('/api/field/dispatcher.do', params)

                if (! data) {
                    return
                }

                return
                const {a, b, c} = data.data

                this.tabBarList[0].number = a
                this.tabBarList[1].number = b
                this.tabBarList[2].number = c
            },
			async getEnergyData() {
                const params = {
                    action: 'ParkingRental.parkingRentalReportInfo',
                    flag: this.dateType + 1,
                    type: 0
                }

                const data = await axios.post('/api/field/dispatcher.do', params)

                if (! data) {
                    return
                }

                return data.data
            }
		}
	}
</script>