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
</style>
<template>
    <div class="parking-chart-wrapper">
        <div class="header">
			<h2>车辆停放分析</h2>
			<el-button class="btn-export">导出</el-button>
		</div>

        <div class="content">
            <chart class="line-chart" :type="1" :data="generateChartOption"></chart>
        </div>
        
    </div>
    
</template>

<script>
import chart from '@/components/chart'

    export default {
        props: {
            // data: {
            //     type: Array,
            //     required: true
            // }
        },
        components: {
			chart
        },
        computed: {
            generateChartOption() {
                return {
                    // title: {
                    //     top: 0,
                    //     text: 'lslls'
                    // }, 
                    color: ['rgba(24, 144, 255, .2)'],
                    grid: {
                        top: 10,
                        right: 15,
                        bottom: 70,
                        left: 45,
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
							data: [1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9 ,10, 11, 12, 13,14,15,16,17]
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
                    series: [{
                        type: 'line',
                        symbol: 'none',
                        // areaStyle: {},
                        smooth: true,
                        data: [200, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24],
                    }]
                };
            },
        },
        methods: {
            
        }
    }
</script>