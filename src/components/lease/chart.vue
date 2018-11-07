<style scoped>
.lease-chart-wrapper {
	min-height: 571px;
	padding: 24px;
	margin: 24px;
	box-sizing: border-box;
	background-color: #FFF;
}
header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 24px;
	color: rgba(0, 0, 0, .85);
	font-size: 16px;
}
.content {
	display: flex;
}
.left {
	width: 280px;
	padding-right: 40px;
	box-sizing: border-box;
	border-right: 1px solid #E8E8E8;
}
.title {
	margin-bottom: 30px;
	color: #595959;
	font-size: 16px;

	& span {
		margin-left: 40px;
		color: #000;
		font-size: 20px;
	}
}
.overview {
	display: flex;
	padding-left: 16px;
	margin-bottom: 30px;
	color: #595959;
	font-size: 14px;

	& span:nth-child(2) {
		margin-left: 19px;
	}

	& span:last-child {
		margin-left: auto;
	}
}
ul {
	margin-bottom: 30px;

	& li {
		display: flex;
		margin-bottom: 24px;
		color: #8C8C8C;
		font-size: 12px;



		& span:nth-child(2) {
			margin-left: 19px;
		}

		& span:last-child {
			margin-left: auto;
		}
	}
}
.box li::before {
	content: "";
	display: inline-block;
	width: 8px;
	height: 8px;
	margin-right: 8px;
}
.box li:nth-child(1)::before {
	background-color: #9013FE;
}

.box li:nth-child(2)::before {
	background-color: #FAAD14;
}

.box li:nth-child(3)::before {
	background-color: #2FC25B;
}
.pie-chart {
	height: 200px;
}
.tips {
	margin-top: 30px;
	color: #595959;
	text-align: center;
}

.right {
	flex: 1;
	padding-left: 24px;
}
.explain {
	display: flex;
	justify-content: space-between;
	color: #8C8C8C;
	font-size: 12px;

	& ul {
		display: flex;
	}

	& li {
		margin-left: 24px;
	}
}
.bar-chart {
	height: 350px;
}
</style>

<template>
	<div class="lease-chart-wrapper">
		<header>
			<h2>租赁分析</h2>
			<el-button class="btn-export">导出</el-button>
		</header>

		<loading v-if="loading"></loading>
		<div class="content" v-else>
			<div class="left">
				<div class="title">
					入驻单位
					<span v-text="companyNum"></span>
				</div>
				<p class="overview">
					<span>总面积</span>
					<span>{{totalArea}}㎡</span>
					<span>{{ratio}}%</span>
				</p>
				<ul class="box">
					<li v-for="item of list">
						<span v-text="item.text"></span>
						<span>{{item.area}}㎡</span>
						<span>{{item.ratio}}%</span>
					</li>
				</ul>

				<chart class="pie-chart" :type="1" :data="pieChartConfig"></chart>

				<p class="tips">整栋楼</p>
			</div>
			<div class="right">
				<div class="explain">
					面积 ㎡
					<ul class="box">
						<li>已出租</li>
						<li>即将到期</li>
						<li>未出租</li>
					</ul>
				</div>

				<chart class="bar-chart" :type="1" :data="barChartConfig"></chart>

				<p class="tips">各楼层</p>
			</div>
		</div>
	</div>
</template>

<script>
	import chart from '@/components/chart'

	export default {
		props: ['currentIndex'],

		data() {
			return {
				loading: false,
				loaded: false,

				companyNum: 10,
				totalArea: 10000,
				ratio: 88,

				list: [
					{
						text: '已出租\u3000',
						area: 6500,
						ratio: 65
					},
					{
						text: '即将到期',
						area: 2300,
						ratio: 23
					},
					{
						text: '未出租\u3000',
						area: 1200,
						ratio: 12
					}
				],

				pieChartData: [],
				barChartData: []
			}
		},

		computed: {
			pieChartConfig() {
				return {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}：{c} ({d}%)"
					},
					color: ['#9013FE', '#FAAD14', '#2FC25B'],
					series: {
						name: '租赁分析',
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						data: this.pieChartData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				}
			},
			barChartConfig() {
				return  {
					color: ['#9013FE', '#FAAD14', '#2FC25B'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						top: 10,
						right: 0,
						bottom: 20,
						left: 35,
					},
					xAxis: [
						{
							type: 'category',
							axisLabel: {
								color: '#545454'
							},
							axisLine: {
								lineStyle: {
									color: '#BFBFBF'
								}
							},
							data: [1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9 ,10, 11, 12, 13,14,15,16,17].map((item) => `${item}层`)
						}
					],
					yAxis: {
						type: 'value',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							color: '#545454'
						},
						splitLine: {
							lineStyle: {
								type: 'dashed',
								color: '#E8E8E8'
							}
						}
					},
					series: this.barChartData
				}
			}
		},

		components: {
			chart
		},

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

				setTimeout(() => {
					this.loading = false
					this.loaded = true

					this.pieChartData = [
						{
							value: 6500,
							name:'65%'
						},
						{
							value: 2300,
							name:'23%'
						},
						{
							value: 1200,
							name:'12%'
						}
					]

					this.barChartData = [
						{
							name: '已出租',
							type: 'bar',
							barGap: 0,
							data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 200, 300]
						},
						{
							name: '即将到期',
							type: 'bar',
							data: [220, 182, 191, 234, 290, 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 200, 300]
						},
						{
							name: '未出租',
							type: 'bar',
							data: [150, 232, 201, 154, 190, 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 200, 300]
						}
					]
				}, 2000)
			}
		}
	}
</script>