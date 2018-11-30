<style src="@/css/dashboard.css" scoped></style>

<template>
    <div id="dashboard-wrapper">
        <div class="left-content container">
            <div class="wheather">
                <div class="wheather-icon">
                    <p class="icon"></p>
                    <p class="temp-num">{{temperature}}<span>℃</span></p>
                    <p class="info">{{weatherType}}</p>
                </div>
                <ul class="temperature">
                    <li>室外温度 12<span>℃</span></li>
                    <li>室内温度 18<span>℃</span></li>
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
                            <span class="middlle-circle"></span>
                            <span class="small-circle"></span>
                            <span class="car-num">334</span>
                            <span class="rest">空闲</span>
                        </span>
                        <span class="car-line"></span>
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
                        <span class="total">{{23134 | format}}</span>
                        <span class="down-icon">{{22 | format}}</span>
                    </p>
                    <!-- <div class="car-chart" ref="carChart"></div> -->
                    <LineChart class="car-chart" :data="carData" />
                </div>
            </div>
        </div>
        <div class="center-content container">
            <div class="main-building">
                <p class="building-title">益展大厦数据大屏</p>
                <div class="building">
                    <!-- <Building /> -->
                    <div>
                        <span class="top-floor" @click="getIndex(floor = 17, 0)"></span>
                        <ul class="center-floor">
                            <li class="floor" v-for="item of floorItem" @click="getIndex(item.floor, item.status)" :key="item.index"></li>
                        </ul>
                        <ul class="oneFour">
                            <li class="bottom-floor" v-for="item of oneToFour" @click="getIndex(item.floor, item.status)" :key="item.index"></li>
                        </ul>
                        <ul class="center-right">
                            <li class="transform" v-for="item of floorItem" @click="getIndex(item.floor, item.status)" :key="item.index"></li>
                        </ul>
                        <span class="right-top" @click="getIndex(floor = 4, 2)"></span>
                        <ul class="right-oneFour">
                            <li class="right-bottom-floor" v-for="item of oneToFour" @click="getIndex(item.floor, item.status)" :key="item.index"></li>
                        </ul>

                        <span class="basement-top" @click="getIndex(floor = -1, 1)"></span>
                        <ul class="basement">
                            <li class="basement-floor" v-for="item of bottomThree" @click="getIndex(item.floor, item.status)" :key="item.index"></li>
                        </ul>
                        <ul class="basement-right">
                            <li class="basement-right-floor" v-for="item of bottomThree" @click="getIndex(item.floor, item.status)" :key="item.index"></li>
                        </ul>
                        <span class="building-point-line">
                            
                            <img :src="require('../../assets/b3line.svg')" class="point-img" alt="">
                        </span>
                    </div>

                    <div class="detail-floor">
                        <img :src="require('../../assets/' + status + '.svg')" alt="">
                        <ul class="detail-content">
                            <li class="detail-info left-li">人员  <span>254</span></li>
                            <li class="detail-info right-li">空闲车位  <span>326</span></li>
                            <li class="detail-info left-li">电能耗  <span>641</span></li>
                            <li class="detail-info right-li">运行中设备  <span>214</span></li>
                            <li class="detail-info left-li">水能耗  <span>624</span></li>
                            <li class="detail-info right-li">故障中设备  <span>21</span></li>
                        </ul>
                    </div>
                    <div class="time-content">
                        <p class="detail-time">{{ time }}</p>
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
                    <!-- <div class="people-chart" ref="peopleChart"></div> -->
                    <LineChart class="people-chart" :data="peopleFlowData"/>
                </div>
                <div class="rank-list">
                    <p>人流量时段排名</p>
                    <ul>
                        <li class="item-li" v-for="item of list" :key="item.index">
                            <span class="people-flow-time">{{item.start}}点 ~ {{item.end}}点</span>
                            <span class="people-flow-num">{{item.num | format}}</span>
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
                        <span class="running-num num">{{3421 | format}}</span>
                        <span class="explain">运行中</span>
                    </div>
                    <div class="error">
                        <span class="error-num num">12</span>
                        <span class="explain">故障中</span>
                    </div>
                    <div class="no-run">
                        <span class="norun-num num">586</span>
                        <span class="explain">未运行</span>
                    </div>
                </div>
            </div>
            <div class="electric">
                <span class="device-explain electric-icon"></span>
                <span class="device-explain electric-explain">电能耗（KW · h）</span>
                <div class="ele-num">
                    {{35461 | format}}
                    <span class="down" style="margin-left:1.50rem">{{624 | format}}</span>
                </div>
                <!-- <div class="electric-charts" ref="eleChart"></div> -->
                <BarChart class="electric-charts" :data="electricData"/>
            </div>
            <div class="water">
                <span class="device-explain electric-icon water-icon"></span>
                <span class="device-explain electric-explain">水能耗（Ton）</span>
                <div class="ele-num">
                    {{6524 | format}}
                    <span class="down">{{437 | format}}</span>
                    <span class="water-gage">水压 0.6 MPa</span>
                </div>
                <!-- <div class="electric-charts" ref="waterChart"></div> -->
                <BarChart class="electric-charts" :data="waterData"/>
            </div>
        </div>
    </div>
</template>

<script>

import LineChart from '@/components/dashboard/lineChart.vue';
import BarChart from '@/components/dashboard/barChart.vue';
// import Building from '@/components/dashboard/building.vue';

    export default {
        data() {
            return {
                temperature: '',
                weatherType: '',
                time: '',
                peopleNum: 24514,
                varyNum: 343,
                status: "normal",
                carData: [200, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24],
                peopleFlowData: [100, 220, 140, 300, 400, 250, 800, 600, 900, 608, 50, 700, 24],
                electricData: [303, 62, 100, 234, 360, 330, 220, 60, 52, 200, 334, 90, 50, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 52],
                waterData: [30, 62, 150, 24, 60, 30, 720, 460, 152, 210, 34, 190, 250, 320, 210, 152, 100, 234, 390, 130, 120, 410, 152, 100, 252],
                list: [
					{
						start: 8,
						end: 10,
						num: 15234
					},
					{
						start: 16,
						end: 18,
						num: 35137
					},
					{
						start: 18,
						end: 20,
						num: 4096
					},
					{
						start: 12,
						end: 14,
						num: 2237
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
                ],
                oneToFour: [
                    { floor: 4, status: 1 },
                    { floor: 3, status: 2 },
                    { floor: 2, status: 2 },
                    { floor: 1, status: 1 },
                ],
                bottomThree: [
                    { floor: -1, status: 2 },
                    { floor: -2, status: 2 },
                    { floor: -3, status: 1 },
                ]
            }
        },
        created() {
            document.documentElement.style.fontSize  = `calc(100vw / 25.6)`;
            // this.carData = [200, 120, 140, 300, 500, 700, 800, 600, 800, 1008, 20, 500, 24]
            // this.getWheatherInfo();
            this.timeChange();
        },
        destroyed() {
            document.documentElement.style.fontSize  = "";
        },
        components: {
            LineChart,
            BarChart,
            // Building
        },
        computed: {
            currentDate() {
                const date = new Date();
				return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`
            },
        },
        filters: {
            format(value) {
				return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			},
        },
        mounted() {
			// this.generateCarChart();
            // this.generatePersonChart();
            // this.generateEleChart();
        },
        methods: {
            timeChange() {
                setInterval(this.getTime, 1000)
            },
            getIndex(index, status) {
                console.log(index)
                const mapObj = {
                    0: "normal",
                    1: "warning",
                    2: "notice"
                }
                this.status = mapObj[status];
            },
            getTime() {
                const date = new Date();
                const hour = date.getHours();
                const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
                const seconds = date.getSeconds();
                return this.time = `${hour} : ${minute}`
            },
            // async getWheatherInfo() {
            //     const params = {
            //         location: '115.236.39.114',
			// 		key: '85b5120e44404f66972df1e7588aa60e'
            //     };
            //     // const {data: {HeWeather6: [{now}]}} = await axios.get('https://free-api.heweather.com/s6/weather/now', {
			// 	// 	params
            //     // })
            //     const {HeWeather6: [{now}]} = await axios.get('https://free-api.heweather.com/s6/weather/now', {
			// 		params
            //     })
            //     this.temperature = now.tmp;
            //     this.weatherType = now.cond_txt
            // }
        }
    }
</script>
