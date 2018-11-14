<template>
    <div class="bar-chart" ref="barChart"></div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true
            },
        },
        mounted() {
            this.generateChart()
        },
        methods: {
            generateChartOption() {
                return {
                    color: ['#3398DB'],
                    grid: {
                        top: '15%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: 'rgba(255,255,255,1)',
                            show: true,
							interval: 5
                        },
                        axisLine: {
                            lineStyle: false
                        },
                        boundaryGap: false,
                        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                    },
                    yAxis: {
                        show: false
                    },
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            // barWidth: '60%',
                            data: this.data
                        }
                    ]
                }
            },
            generateChart() {
                this.$barChart = echarts.init(this.$refs['barChart'], null, {
					renderer: 'svg'
                })
                
                this.$barChart.setOption(this.generateChartOption())

                 window.addEventListener('resize', () => {
					this.$barChart.resize()
				})
            }
        }
    }
</script>