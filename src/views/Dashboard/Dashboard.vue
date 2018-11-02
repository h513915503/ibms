<style src="@/css/dashboard.css" scoped></style>
<style scoped>
.one {
    width: 393px;
    height: 12px;
    background: #ffffff;
    float: left;
}
.two {
    width: 100px;
    height: 12px;
    background: #ffffff;
    float: left;
    transform: skewY(158deg);
    margin-top: -20px;
}
</style>

<template>
    <div id="dashboard-wrapper">
        <div class="left-content container">
            <div class="wheather">
                <div class="wheather-icon">
                    <p class="icon"></p>
                    <p class="temp-num">12<span>℃</span></p>
                    <p class="info">多云</p>
                </div>
                <ul class="temperature">
                    <li>室外温度 12<span>℃</span></li>
                    <li>室内温度 12<span>℃</span></li>
                    <li>CO₂ 40ppm</li>
                    <li>室外温度 60%</li>
                    <li>室内温度 70%</li>
                    <li>CO 8pm</li>
                </ul>
            </div>
            <div class="car-parking">
                <div class="parking-top">
                    <p><span class="parking-icon"></span>车位</p>
                    <div class="parking-pic">
                        <span class="picture1">
                            <span class="car-num">234</span><br />
                            <span class="rest">空闲</span>
                        </span>
                        <span class="picture2">
                            <li>包月空闲 <span class="month-rest">230</span></li>
                            <li>临时空闲 <span class="now-rest">334</span></li>
                        </span>
                    </div>
                </div>
                <div class="car-flow">
                    <p class="car-flow-title">
                        <span class="car-icon"></span>
                        <span class="car-explain">车流量</span>
                    </p>
                    <p class="chart-title">
                        <span class="total">234</span>
                        <span class="down">{{varyNum | format}}</span>
                    </p>
                    <div class="car-chart" ref="car-chart"></div>
                </div>
            </div>
        </div>
        <div class="center-content container">
            <div class="main-building">
                <p class="building-title">益展大厦数据大屏</p>
                <div class="building"></div>
                <!-- <ul class="img">
                    <li @click="getIndex(1)">1</li>
                    <li @click="getIndex(2)">3</li>
                    <li @click="getIndex(3)">2</li>
                    <li @click="getIndex(4)">4</li>
                </ul> -->
                <!-- <ul>
                    <li>
                        <div class="one"></div>
                        <div class="two"></div>
                    </li>
                    <li>
                        <div class="one"></div>
                        <div class="two"></div>
                    </li>
                    <li>
                        <div class="one"></div>
                        <div class="two"></div>
                    </li>
                </ul> -->
                
            </div>
            <div class="people-flow">
                <div class="left">
                    <h5 class="people-title">人流量</h5>
                    <div class="people-num">
                        {{peopleNum | format}}
                        <span class="down">{{varyNum | format}}</span>
                    </div>
                    <div class="people-chart" ref="people-chart"></div>
                </div>
                <div class="right ranking-list">
                    <p>人流量时段排名</p>
                    <ul>
                        <li v-for="item of list">
                            <span>{{item.start}}点~{{item.end}}点</span>
                            <span>{{item.num | format}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="right-content container">
            <div class="device-content">
                <span class="device-icon"></span>
                <span class="device-explain">设备</span>
                <div class="device-charts">
                    <div class="running">
                        <span class="running-num num">1234</span>
                        <span class="explain">运行中</span>
                    </div>
                    <div class="error">
                        <span class="error-num num">12</span>
                        <span class="explain">故障中</span>
                    </div>
                    <div class="no-run">
                        <span class="norun-num num">123</span>
                        <span class="explain">未运行</span>
                    </div>
                </div>
            </div>
            <div class="electric">
                <span class="device-explain electric-icon"></span>
                <span class="device-explain electric-explain">电能耗（KW · h）</span>
                <div class="ele-num">
                    {{peopleNum | format}}
                    <span class="down" style="margin-left:150px">{{varyNum | format}}</span>
                </div>
                <div class="electric-charts" ref="ele-chart"></div>
            </div>
            <div class="water">
                <span class="device-explain electric-icon water-icon"></span>
                <span class="device-explain electric-explain">水能耗（Ton）</span>
                <div class="ele-num">
                    {{peopleNum | format}}
                    <span class="down">{{varyNum | format}}</span>
                    <span class="water-gage">水压 0.6 MPa</span>
                </div>
                <div class="electric-charts" ref="water-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        data() {
            return {
                peopleNum: 12321,
				varyNum: 343,
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
        filters: {
            format(value) {
				return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			},
        },
        mounted() {
			this.generateCarChart();
            this.generatePersonChart();
            this.generateEleChart();
        },
        methods: {
            generateCarChart() {
                const option = {
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
                        data: [0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24]
                    }]
                };

 			    echarts.init(this.$refs['car-chart']).setOption(option);
            },
            generatePersonChart() {
                const option = {
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
                        data: [0, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24]
                    }]
                };

 			    echarts.init(this.$refs['people-chart']).setOption(option);
            },
            generateEleChart(resourceType = 0) {
                const option = {
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
							interval: 2
                        },
                        axisLine: {
                            lineStyle: false
                        },
                        boundaryGap: false,
                        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    },
                    yAxis: {
                        show: false
                    },
                    series: [
                        {
                            name:'直接访问',
                            type:'bar',
                            // barWidth: '60%',
                            data:[10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200]
                        }
                    ]
                }
                echarts.init(this.$refs['ele-chart']).setOption(option);
                echarts.init(this.$refs['water-chart']).setOption(option);
            },
            getIndex(index) {
                console.log(index)
            }
        }
    }
</script>
