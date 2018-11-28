<style scope>
    .parking-chart-wrapper {
        min-height: 571px;
        padding: 24px;
        margin: 24px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .header {
        color: RGBA(0, 0, 0, 0.85);
        & h2 {
            display: inline;
        }
    }
    .btn-export {
        float: right;
    }
    .content {
        padding-top: 20px;
    }
    .line-chart {
        /* flex: 1; */
        height: 624px;
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
			margin-right: 48px;
		}
    }
</style>
<template>
    <div class="parking-chart-wrapper">
        <div class="header">
			<h2>车辆停放分析</h2>
			<el-button class="btn-export">导出</el-button>
            <div class="operation">
                <div class="btn-text" :class="{actived: dateType === 0}" @click="dateType = 0">今日</div>
                <div class="btn-text" :class="{actived: dateType === 1}" @click="dateType = 1">本周</div>
                <div class="btn-text" :class="{actived: dateType === 2}" @click="dateType = 2">本月</div>
                <div class="btn-text" :class="{actived: dateType === 3}" @click="dateType = 3">全年</div>
                <el-date-picker v-model="date" type="date" placeholder="选择时间"></el-date-picker>
            </div>
		</div>
        
        <loading v-if="loading"></loading>
        <div class="content" v-else>
            <chart class="line-chart" :type="1" :data="generateChartOption"></chart>
        </div>
        
    </div>
    
</template>

<script>
    import mixin from '@/mixins'
    import chart from '@/components/chart'

    export default {
        props: {
            // data: {
            //     type: Array,
            //     required: true
            // }
        },
        data() {
            return {
                chartData: [],
                loading: false,
                dateType: 0,
                date: ''
            }
        },
        components: {
			chart
        },
        mixins: [mixin],
        computed: {
            currentDate() {
				const date = new Date()

				return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
            },
            // chartxAxisData() {
			// 	const dateType = this.dateType
			// 	let xAxisData = {}

			// 	// 设置当月天数
			// 	let days = []
			// 	const currentDate = new Date()
			// 	let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate()

			// 	while (day--) {
			// 		days.unshift(day + 1)
			// 	}

			// 	xAxisData = days


			// 	return xAxisData
			// },
            generateChartOption() {
                
                return {
                    // title: {
                    //     top: 0,
                    //     text: 'lslls'
                    // }, 
                    color: ['rgba(24, 144, 255, .2)', '#9013FE'],
                    grid: {
                        top: 10,
                        right: 15,
                        bottom: 70,
                        left: 45,
                    },
                    tooltip: {
						trigger: 'axis'
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
                            boundaryGap: false,
							data: this.chartxAxisData
						}
					],
                    yAxis: {
                        type: 'value',
                        show: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#BFBFBF'
                            }
                            
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
                    series: this.chartData,
                    // {
                        // type: 'line',
                        // symbol: 'none',
                        // // areaStyle: {},
                        // smooth: true,
                        // data: this.chartData,
                    // }
                };
            },
        },
        created() {
            this.getData()
        },
        methods: {
            async getData() {
                this.loading = true
                const [data] = await Promise.all([this.getChartData()]).catch(() => {
                    this.loading = false
                    
                })
                this.loading = false
                
                this.chartData = data
            },
            async getChartData() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
                        this.$d = [
						{
							name: '已出租',
							type: 'line',
                            // barGap: 0,
                            smooth: true,
							data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 200, 300]
						},
						{
							name: '即将到期',
                            type: 'line',
                            smooth: true,
							data: [220, 182, 191, 234, 290, 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 200, 300]
						}
					]
                        resolve(this.$d)
						// resolve([200, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24])
					}, 1000)
				})
			},
        }
    }
</script>