<style scoped>
    .container {
        width: 100%;
    }
    .bar-chart {
        width: 100%;
        height: 400px;
    }
</style>

<template>
    <div class="container">
        <chart class="bar-chart" :data="barChartConfig"></chart>
    </div>
    <!-- <chart class="bar-chart" :data="barChartConfig"></chart> -->
</template>

<script>
    import chart from '@/components/chart'

    export default {
        // props: ['chartData'],
        data() {
            return {
                barChartData: []
            }
        },
        computed: {
            barChartConfig() {
				return  {
					color: ['rgba(95, 226, 134, 1)', 'rgba(202, 202, 202, 1)', 'rgba(255, 203, 100, 1)'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
                    },
                    grid: {
						top: 50,
						right: 50,
						bottom: 20,
						left: 45,
                    },
                    legend: {
                        data: ['运行中', '故障中', '未运行'],
                        itemWidth: 10,
                        itemHeight: 10,
                        right: 20,
                        top: 20
					},
					xAxis: [
						{
                            type: 'category',
                            name: '层',
                            nameLocation: 'end',
							axisLabel: {
								color: '#545454'
							},
							axisLine: {
								lineStyle: {
									color: '#BFBFBF'
								}
							},
                            // data: [1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9 ,10, 11, 12, 13, 14, 15, 16, 17].map((item) => `${item}层`)
                             data: [1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9 ,10, 11, 12, 13, 14, 15, 16, 17]
						}
					],
					yAxis: {
                        type: 'value',
                        name: '台',
						axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#BFBFBF'
                            }
						},
						axisTick: {
							show: true,
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
        created() {
            this.getChartData()
        },
        methods: {
            getChartData() {
                const floors = Array.from(Array(17), (v, index) => index + 1)

				this.barChartData = [
					{
						name: '运行中',
						type: 'bar',
						barGap: 0,
                        // data: floors
                        data: [320, 332, 301]
					},
					{
						name: '故障中',
						type: 'bar',
                        // data: floors.slice()
                        data: [432,123,54]
					},
					{
						name: '未运行',
						type: 'bar',
                        // data: floors.slice()
                        data: [212, 324, 34]
					}
				]

            }
        },
        components: {
            chart
        }
    }
</script>