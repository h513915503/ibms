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
                <el-date-picker v-model="date" type="date" placeholder="选择时间" value-format="timestamp" @change="change"></el-date-picker>
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

                data1: [],
                data2: [],

                date: '',
                dateType: 0,
                chartData: [[0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24, 300], [3, 2, 1, 1, 2, 3, 4, 7, 6, 5, 8, 7, 5, 4]]
            }
        },

        components: {
            chart
        },

        computed: {
            axisData() {
                if (this.dateType === 0) {
                    return [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((item) => `${item}点`)
                }

                if (this.dateType === 1) {
                    return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }

                if (this.dateType === 2) {
                    // 设置当月天数
                    let days = []
                    const currentDate = new Date()
                    let day = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()

                    while (day--) {
                        days.unshift(day + 1)
                    }

                    return days
                }

                if (this.dateType === 3) {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                }
            },
            chartConfig() {
                return {
                    color: ['#1890FF', '#9013FE'],
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
                        data: this.axisData
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
                    series: [
                        {
                            name: '包月车辆',
                            type: 'line',
                            areaStyle: null,
                            smooth: false,
                            data: this.data1,
                        },
                        {
                            name: '临时停放',
                            type: 'line',
                            areaStyle: null,
                            smooth: false,
                            data: this.data2,
                        }
                    ]
                }
            }
        },

        watch: {
            dateType(value) {
                this.data1 = []
                this.data2 = []

                this.getData().then((data) => {
                    if (! data) {
                        return
                    }

                    // 保存数据
                    this.setData(data)
                    this.$parent.$chartTempData = data
                })
            }
        },

        created() {
            if (this.$parent.$chartTempData) {
                this.setData(this.$parent.$chartTempData)
            } else {
                this.getData().then((data) => {
                    if (! data) {
                        return
                    }

                    // 保存数据
                    this.setData(data)
                    this.$parent.$chartTempData = data
                })
            }
        },

        methods: {
            async getData() {
                const params = {
                    action: 'ParkingRental.parkingRentalReportInfo',
                    flag: this.dateType + 1
                }

                if (this.$time) {
                    params.inTime = this.$time
                }

                const data = await axios.post('/api/field/dispatcher.do', params)

                if (! data) {
                    return
                }

                return data.data
            },
            setData(data) {
                this.data1 = data.map((item) => item.monthCount)
                this.data2 = data.map((item) => item.shortTimeCount)
            },
            change(value) {
                this.dateType = 0
                this.$time = value
            }
        }
    }
</script>