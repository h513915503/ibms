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
.center-floor {
    margin-left: 214px;
    padding-top: 42px;
}
.floor {
    color: #ffffff;
    width: 142px;
    height: 20px;
}
.center-right {
    margin-left: 356px;
    color: #ffffff;
    margin-top: -489px;
    transform: skewY(-31deg);
} 
.transform {
    width: 56px;
    height: 20px;
}
.detail-floor {
    width: 484px;
    height: 320px;
    background: rgba(185,224,249,0.1);
    margin-left: 730px;
    margin-top: -232px;

    & img {
        margin: 40px 40px 0 40px;
    }
}
.detail-content {
    font-family: 'DashBoardNumDemo';
    font-size:24px;
    font-weight:400;
    color:rgba(185,224,249,1);
    margin: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.detail-info {
    height:54px;
    font-size:24px;
    letter-spacing:2px;
}
.lastfloor {
    width: 328px;
}
.lastRightFloor {
    margin-left: 180px;
    margin-top: 
}
.left-li {
    width: 200px;
    
    & span {
        float: right;
        margin-right: 62px;
    }
}
.right-li {
    width: 200px;

    & span {
        float: right;
        /* margin-right: 44px; */
    }
}
.time-content {
    width:356px;
    height:127px;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 80px 0 0 854px;
}
.detail-time {
    text-align: right;
    font-size: 48px;
    line-height: 72px;
}
.detail-date {
    text-align: right;
    font-size: 36px;
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
                <div class="building">
                    <div>
                        <ul class="center-floor">
                            <li class="floor" :class="{lastfloor: item.floor <= 4}" v-for="item of floorItem" @click="getIndex(item.floor, item.status)" :key="item.index">{{ item.floor }}</li>
                        </ul>
                        <ul class="center-right">
                            <li class="transform" :class="{lastRightFloor: item.floor <= 4}" v-for="item of floorItem" @click="getIndex(item.floor)" :key="item.index">{{ item.floor }}</li>
                        </ul>
                    </div>

                    <div class="detail-floor">
                        <img :src="require('../../assets/' + status + '.svg')" alt="">
                        <ul class="detail-content">
                            <li class="detail-info left-li">人员  <span>123</span></li>
                            <li class="detail-info right-li">空闲车位  <span>123</span></li>
                            <li class="detail-info left-li">电能耗  <span>123</span></li>
                            <li class="detail-info right-li">运行中设备  <span>123</span></li>
                            <li class="detail-info left-li">水能耗  <span>123</span></li>
                            <li class="detail-info right-li">故障中设备  <span>123</span></li>
                        </ul>
                    </div>
                    <div class="time-content">
                        <p class="detail-time" v-text="getTime"></p>
                        <p class="detail-date" v-text="currentDate"></p>
                    </div>
                </div>
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
                        <li v-for="item of list" :key="item.index">
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
                status: "normal",
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
                ],
                floorItem: [
                    { floor: 17, status: 0 },
                    { floor: 16, status: 1 },
                    { floor: 15, status: 2 },
                    { floor: 14, status: 2 },
                    { floor: 13, status: 1 },
                    { floor: 12, status: 0 },
                    { floor: 11, status: 0 },
                    { floor: 10, status: 1 },
                    { floor: 9, status: 2 },
                    { floor: 8, status: 2 },
                    { floor: 7, status: 1 },
                    { floor: 6, status: 0 },
                    { floor: 5, status: 0 },
                    { floor: 4, status: 1 },
                    { floor: 3, status: 2 },
                    { floor: 2, status: 2 },
                    { floor: 1, status: 1 },
                ]
            }
        },
        computed: {
            currentDate() {
                const date = new Date();
				return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`
            },
            getTime() {
                const date = new Date();
                const hour = date.getHours();
                const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
                // const seconds = date.getSeconds();
                // setTimeout(() => {
                //     console.log(`${hour} : ${minute} : ${seconds}`)
                //     return `${hour} : ${minute} : ${seconds}`
                // }, 1000)
                return `${hour} : ${minute}`
            },
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
            getIndex(index, status) {
                console.log(index)
                const objMap = [
                    { status: 0, text: 'normal' },
                    { status: 1, text: 'warning' },
                    { status: 2, text: 'notice' }
                ];
                // this.status = objMap[status].text;
            }
        }
    }
</script>
