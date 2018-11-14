<template>
    <div class="line-chart" ref="lineChart"></div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true
            }
        },
        mounted() {
            this.generateChart()
        },
        methods: {
            generateChartOption() {
                return {
                // title: {
                //     top: 0,
                //     text
                // },
                    color: ['rgba(24, 144, 255, .2)'],
                    grid: {
                        top: 0,
                        right: 15,
                        bottom: 70,
                        left: 45,
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: 'rgba(255,255,255,1)',
                            show: true,
							interval: 2
                        },
                        axisLine: {
                            lineStyle: false
                        },
                        boundaryGap: false,
                        data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
                    },
                    yAxis: {
                        type: 'value',
                        splitNumber : 3,
                        show: false,
                    },
                    series: [{
                        type: 'line',
                        symbol: 'none',
                        areaStyle: {},
                        smooth: true,
                        data: this.data
                    }]
                };
            },
            generateChart() {
                this.$lineChart = echarts.init(this.$refs['lineChart'], null, {
					renderer: 'svg'
                })
                
                this.$lineChart.setOption(this.generateChartOption())

                 window.addEventListener('resize', () => {
					this.$lineChart.resize()
				})
            }
        }
    }
</script>