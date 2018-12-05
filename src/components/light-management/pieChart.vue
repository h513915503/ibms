<style scoped>
.light-card {
    width: 340px;
    height: 100%;
}
.title {
    width: 240px;
    text-align: center;
    font-size:14px;
    color:rgba(140,140,140,1);
}
.pie-chart {
    width: 500px;
	height: 400px;
}
.top {
    font-size:14px;
    color:rgba(89,89,89,1);
    line-height: 32px;
    margin-left: 46px;
}
.item {
    font-size:12px;
    line-height: 32px;
    margin-left: 24px;
    color:rgba(140,140,140,1);

    &::before {
        content: "";
        display: inline-block;
        margin-right: 12px;
        width: 10px;
        height: 10px;
    }
}
.running::before {
    background-color: rgba(95, 226, 134, 1);
}
.error::before {
    background: rgba(255, 203, 100, 1);
}
.stop::before {
    background: rgba(202, 202, 202, 1);
}
.top-num {
    display: inline-block;
    margin: 0 36px 0 30px;
}
.num {
    display: inline-block;
    margin: 0 34px;
    width: 40px;
    text-align: right;
}
.explain {
    width: 70px;
    display: inline-block;
    text-align: right;
}
</style>

<template>
    <div class="light-card">
        <p class="title">今日</p>
        <chart class="pie-chart" :data="pieChartConfig"></chart>

        <ul class="detail-info">
            <li class="top">总设备<span class="top-num">12344</span><span>故障率 23%</span></li>
            <li class="item running">运行中<span class="num">12344</span><span class="explain">占比 23%</span></li>
            <li class="item error">故障中<span class="num">12344</span><span class="explain">占比 23%</span></li>
            <li class="item stop">未运行<span class="num">12344</span><span class="explain">占比 23%</span></li>
        </ul>
    </div>
</template>

<script>
    import chart from '@/components/chart'

    export default {
        // props: ['chartData'],
        data() {
            return {
                pieChartData: [{ value: 45, name: '运行中'},{ value: 12, name: '故障中'},{ value: 63, name: '未运行'}],
            }
        },
        computed: {
            pieChartConfig() {
				return {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}：{c} ({d}%)"
                    },
					color: ['rgba(95, 226, 134, 1)', 'rgba(202, 202, 202, 1)', 'rgba(255, 203, 100, 1)'],
					series: [{
						name: '灯设备分析',
						type: 'pie',
						radius: 100,
						center: ['25%', '50%'],
						data: this.pieChartData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
                        },
                        label: false
					}]
				}
			},
        },
        components: {
            chart
        }
    }
    
</script>