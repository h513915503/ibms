<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        padding: 0!important;
        /* height: 624px; */
    }
    .all-area {
        width: 104px;
        text-indent: 24px;
        font-size:14px;
        margin-right: 24px;
        padding-top: 24px;
        border-right: 1px solid rgba(232,232,232,1);
    }
    .area-item {
        cursor: pointer;
        line-height:38px;
        color: rgba(0,0,0,0.65);
    }
    .activedArea {
        height: 38px;
        font-weight:400;
        color:rgba(14,124,194,1);
        background: rgba(230,249,255,1);
        border-right: 1px solid rgba(14,124,194,1);
    }
    .right {
        width: 100%;
        padding-top: 24px;
    }
    .header {
        display: flex;
	    justify-content: space-between;
    }
    .title {
        display: flex;
        align-items: center;
        color:rgba(0,0,0,0.85);
        font-size: 16px;
    }
    .export {
        display: flex;
        margin-right: 24px;
        /* margin: 0 24px 0 auto; */
    }
    .option {
        display: flex;
        justify-content: space-between;
        margin: 0 24px 0 auto;
        line-height: 40px;
    }
    .btn-text {
        display: inline-block;
        margin-right: 24px;
        color: rgba(0, 0, 0, .65);
        font-size: 14px;
        cursor: pointer;
    }
    .actived {
        color: #1890FF;
    }
    .content {
        display: flex;
        justify-content: space-between;
        padding-bottom: 76px;
    }
    .car-port {
        width: 100%
    }
</style>

<template>
    <div class="container">
        <ul class="all-area">
            <li :class="{activedArea: areaIndex === index}" class="area-item" v-for="(item, index) of areas" :key="index" v-text="item" @click="switchArea(index)"></li>
        </ul>

        <div class="right">
            <div class="park" v-if="areaIndex === 0">
                <div class="header">
                    <p class="title">灯设备分析</p>
                    <el-button class="export">导出</el-button>
                </div>
                <div class="content">
                    <LightPieCard />
                    <LightPieCard />
                    <LightPieCard />
                </div>
            </div>
            
            <div class="car-port" v-if="areaIndex === 1">
                <div class="header">
                    <p class="title">灯设备分析</p>
                    <div class="option">
                        <div class="btn-text" :class="{actived: dateType === 0}" @click="dateType = 0">今日</div>
                        <div class="btn-text" :class="{actived: dateType === 1}" @click="dateType = 1">7天内</div>
                        <div class="btn-text" :class="{actived: dateType === 2}" @click="dateType = 2">30天内</div>
                    </div>
                    <el-button class="export">导出</el-button>
                </div>
                <div class="content">
                    <LightBarChart />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins'
    import LightPieCard from '@/components/light-management/pieChart.vue'
    import LightBarChart from '@/components/light-management/barChart.vue'

    export default {
        data() {
            return {
                areaIndex: 0,
                areas: ['园区', '地下车库', '地上楼层', '走廊', '室外'],
                dateType: 0
            }
        },
        methods: {
            switchArea(index) {
                this.areaIndex = index;
            }
        },
        mixins: [mixin],
        components: {
            LightPieCard,
            LightBarChart
        }
    }
</script>
