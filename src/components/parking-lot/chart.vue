<style scoped>
.chart-analysis-wrapper {
    padding: 24px 24px 0;
    margin: 24px;
    background-color: #FFF;
}
.operation-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    & h4 {
        color: rgba(0, 0, 0, .85);
        font-size: 16px;
    }
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
        margin-right: 38px;
    }

    & >>> .el-input__inner {
        height: 32px;
        line-height: 32px;
    }

    & >>> .el-input__icon {
        line-height: 32px;
    }
}

& .el-input {
    width: 256px;
}
.btn-export {
    width: 74px;
    padding: 0;
    margin-left: 24px;
    line-height: 32px;
}
.unit-tips {
    display: flex;
    justify-content: center;
    margin-bottom: 14px;
    color: rgba(0, 0, 0, .45);
    font-size: 12px;

    & .item::before {
        content: "";
        display: inline-block;
        width: 18px;
        height: 2px;
        margin-right: 10px;
        vertical-align: middle;
    }
}
.electric {
    margin-right: 50px;
}
.electric::before {
    background-color: #1890FF;
}
.water::before {
    background-color: #9013FE;
}
.chart {
    height: 481px;
}
</style>

<template>
    <div class="chart-analysis-wrapper">
        <div class="operation-wrapper">
            <h4>车辆停放分析</h4>
            <div class="operation">
                <div class="btn-text" :class="{actived: dateType === 0}" @click="dateType = 0">今日</div>
                <div class="btn-text" :class="{actived: dateType === 1}" @click="dateType = 1">本周</div>
                <div class="btn-text" :class="{actived: dateType === 2}" @click="dateType = 2">本月</div>
                <div class="btn-text" :class="{actived: dateType === 3}" @click="dateType = 3">全年</div>
                <el-date-picker v-model="date" type="date" placeholder="选择时间"></el-date-picker>
                <el-button class="btn-export">导出</el-button>
            </div>
        </div>
        <div class="unit-tips">
            <div class="item electric">包月车辆</div>
            <div class="item water">临时停放</div>
        </div>
        <chart class="chart" :data="chartConfig"></chart>
    </div>
</template>

<script>
    import chart from '@/components/chart'

    export default {
        data() {
            return {
                loading: false,
                loaded: false,

                devicesId: '',
                devicesName: '',
                devicesList: [],

                date: '',
                dateType: 0,
                chartData: [[0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24, 300], [3, 2, 1, 1, 2, 3, 4, 7, 6, 5, 8, 7, 5, 4]]
            }
        },

        components: {
            chart
        },

        computed: {
            energyChartxAxisData() {
                const dateType = this.dateType
                let xAxisData = {}

                // 设置当月天数
                let days = []
                const currentDate = new Date()
                let day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate()

                while (day--) {
                    days.unshift(day + 1)
                }

                xAxisData = days


                return xAxisData
            },
            chartConfig() {
                return {
                    color: ['#1890FF', '#F14382', '#000', '#22CC22', '#9370DB'],
                    grid: {
                        top: 20,
                        right: 30,
                        bottom: 50,
                        left: 50,
                    },
                    tooltip: {
                        trigger: 'axis',
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
                        data: this.energyChartxAxisData
                    },
                    yAxis: {
                        type: 'value',
                        splitNumber: 5,
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
                    series:{
                        name: '萨达萨达',
                        type: 'line',
                        areaStyle: null,
                        smooth: false,
                        data: [[0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24, 300], [3, 2, 1, 1, 2, 3, 4, 7, 6, 5, 8, 7, 5, 4]],
                    }
                }
            }
        },
    }
</script>