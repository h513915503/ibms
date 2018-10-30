<style src="@/css/overview.css" scoped></style>

<template>
	<div id="overview-wrapper">
		<template v-if="loading">
			<loading></loading>
		</template>
		<template v-else>
			<div class="bootstrap" v-if="index === 0">
				<h1>暂无概览</h1>
				<p>因当前暂未录入任何园区的信息，平台暂不显示任何概览。</p>
				<p>您可以在平台录入场地、人员信息后，再来该页面查看概览。</p>
				<el-button type="primary" @click="go">好的</el-button>
			</div>

			<div class="container" v-if="index === 1">
				<div class="box device">
					<h5>设备</h5>
					<strong>{{fault}}个故障待解决</strong>
					<div class="ratio-wrapper">
						<div class="running" :style="{width: runningWidth + '%'}"></div>
						<div class="fault" :style="{width: faultWidth + '%'}"></div>
						<div class="no-run" :style="{width: noRunWidth + '%'}"></div>
					</div>
					<div class="status-wrapper">
						<div>
							运行中
							<span>{{running | format}}</span>
						</div>
						<div>
							故障中
							<span>{{fault | format}}</span>
						</div>
						<div>
							未运行
							<span>{{noRun | format}}</span>
						</div>
					</div>
				</div>

				<div class="box env">
					<h5>环境</h5>
					<strong>{{envStatus | envFormat}}</strong>
					<div class="info-wrapper">
						<div class="left">
							<div class="item">
								室内湿度
								<span v-text="a"></span>
							</div>
							<div class="item">
								CO2
								<span v-text="b"></span>
							</div>
							<div class="item">
								CO
								<span v-text="c"></span>
							</div>
							<div class="item">
								室内温度
								<span v-text="d"></span>
							</div>
							<div class="item">
								水压
								<span v-text="e"></span>
							</div>
						</div>
						<div class="right">
							<div class="item">
								室外温度
								<span v-text="a"></span>
							</div>
							<div class="item">
								室外湿度
								<span v-text="d"></span>
							</div>
						</div>
					</div>
				</div>

				<div class="box car">
					<h5>车位出租情况</h5>
					<div class="chars">
						<svg-progress title="包月车位" color="#1890FF" :num="aaa" :progress="aProgress"></svg-progress>
						<svg-progress title="临时停放" color="#2FC25B" :num="bbb" :progress="bProgress"></svg-progress>
						<svg-progress title="空闲车位" color="#FACC14" :num="ccc" :progress="cProgress"></svg-progress>
					</div>
					<div class="num-wrapper">
						<div class="item">
							总车位
							<span v-text="aa"></span>
						</div>
						<div class="item">
							已停放
							<span v-text="bb"></span>
						</div>
						<div class="item">
							停放率
							<span v-text="cc"></span>
						</div>
					</div>
				</div>

				<div class="box people">
					<h5>人流量情况</h5>
					<div class="statistics">
						<div class="left" ref="people-chart"></div>
						<div class="right">
							<p>人流量时段排名</p>
							<ul>
								<li v-for="item of list">
									<span>{{item.start}}点~{{item.end}}点</span>
									<span>{{item.num | format}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="num-wrapper">
						<div class="item">
							当前园区总人数
							<span>{{aaaa | format}}</span>
						</div>
						<div class="item">
							今日入园人数
							<span>{{bbbb | format}}</span>
						</div>
						<div class="item">
							今日出园人数
							<span>{{cccc | format}}</span>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import svgProgress from '@/components/svg-progress'

	export default {
		data() {
			return {
				loading: false,

				index: 1,

				running: 4000,
				fault: 7000,
				noRun: 10500,

				envStatus: 0,
				a: '70%',
				b: '450ppm',
				c: '8ppm',
				d: '26%',
				e: '0.6MPa',

				aa: 580,
				bb: 310,
				cc: '55.4%',

				aaa: 280,
				bbb: 310,
				ccc: 250,
				aProgress: 40,
				bProgress: 70,
				cProgress: 20,

				aaaa: 1580,
				bbbb: 6310,
				cccc: 5543,
				list: [
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
			svgProgress
		},

		computed: {
			totalWidth() {
				return this.running + this.fault + this.noRun
			},
			runningWidth() {
				return (this.running / this.totalWidth) * 100
			},
			faultWidth() {
				return (this.fault / this.totalWidth) * 100
			},
			noRunWidth() {
				return (this.noRun / this.totalWidth) * 100
			}
		},

		filters: {
			format(value) {
				return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			},
			envFormat(value) {
				return ['暂无异常'][value]
			}
		},

		created() {
			//this.getData()
		},

		mounted() {
			const option = {
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: [6, 8, 10, 12, 14]
			    },
			     yAxis: {},
			    series: [{
			        data: [820, 932, 901, 934, 1290, 1330, 1320],
			        type: 'line',
			        areaStyle: {}
			    }],

			    smooth: true
			};

			echarts.init(this.$refs['people-chart']).setOption(option)
		},

		methods: {
			async getData() {
				this.loading = true

				setTimeout(() => {
					this.loading = false
				}, 1000)
			},
			go() {
				this.$router.push('/lease')
			}
		}
	}
</script>