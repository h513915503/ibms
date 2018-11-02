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

				<div class="content energy" v-if="currentIndex === 0">
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
						<chart class="chart" :type="0" :title="energyChartTitle" :grid="energyGrid" :data="energyChartData"></chart>

						<div class="ranking-list">
							<p>电能耗时段排名</p>
							<ul>
								<li v-for="item of energyRankingList">
									<span>{{item.start}}点~{{item.end}}点</span>
									<span class="num">{{item.num | format}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'
	import chart from '@/components/chart'

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
					},
					{
						text: '今日耗水设备',
						number: 10
					}
				],

				currentIndex: 0,
				tabs: ['按日期', '按单位', '按设备'],

				currentResourceType: 0,
				date: '',
				dateType: 0,
				energyChartData: [],
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
				]

			}
		},

		components: {
			tabBar,
			chart
		},

		computed: {
			energyChartTitle() {
				return {
					top: 0,
					text: ['电能耗（KW · h）', '水能耗实况（tun）'][this.currentResourceType]
				}
			},
			energyGrid() {
				return {
					top: 50,
					right: 15,
					bottom: 20,
					left: 45,
				}
			},
		},

		filters: {
			format(value) {
				return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			}
		},

		created() {
			this.energyChartData = [0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24, 300]

			this.getData()
		},

		methods: {
			async getData() {
				this.loading = true

				setTimeout(() => {
					this.loading = false
				}, 200)
			}
		}
	}
</script>