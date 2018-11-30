<style scoped>
    .container {
	    padding: 24px;
        margin-top: 20px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .header {
        padding: 0 24px;
        background-color: #FFF;
        margin-bottom: 24px;
    }
    .tabs {
        margin-bottom: 10px;
    }

    .tab-wrapper {
        display: flex;
    }
    .tab-item {
        margin-right: 50px;
        color: rgba(0, 0, 0, .65);
        font-size: 14px;
        cursor: pointer;
        line-height: 46px;
    }
    .tab-item.actived {
        color: #1890FF;
        position: relative;

        &::after {
            content: "";
            width: 130%;
            height: 2px;
            position: absolute;
            bottom: 0;
            left: 50%;
            background-color: currentcolor;
            transform: translateX(-50%);
        }
    }
    .deviceContent {
        background: #FFF;
        padding: 24px;
    }
    .top-button {
        display: flex;
	    justify-content: space-between;
        padding-bottom: 24px;
    }
    .search-content {
        display: flex;
	    justify-content: space-between;
    }
    .light-search {
        width: 128px;
	    margin-left: 24px;
    }
    .btn-search {
        margin-left: 24px;
    }
    .all-floor {
        /* width: 74px; */
        text-align: center;
        font-size:14px;
        /* display: inline-block; */
        margin-right: 24px;
        /* float: left; */
        border-right: 1px solid rgba(232,232,232,1);
    }
    .activedFloor {
        /* width: 74px; */
        height: 38px;
        font-weight:400;
        color:rgba(14,124,194,1);
        background: rgba(230,249,255,1);
        border-right: 1px solid rgba(14,124,194,1);
    }
    .floor-item {
        cursor: pointer;
        line-height:38px;
    }
    .detail-floor {
        display: inline-block;
        /* float: right; */
        /* width: 70%; */
        height: 520px;
    }
    .container {
        display: flex;
        flex-direction: row;
    }
    .all-floor {
        width: 74px;
    }
    .detail-floor {

    }
    .detail-info {
        width: 260px;
        margin-left: 24px;
    }
    .title {
        margin-bottom: 24px;
        font-size:14px;
        color:rgba(0,0,0,1);
    }
    .about {
        font-size:12px;
        color:rgba(140,140,140,1);
        line-height:24px;
    }
    .all-dvice {
        margin-bottom: 24px;
        font-size:14px;
        line-height: 50px;
        color:rgba(0,0,0,1);
        border-bottom: 1px solid rgba(232, 232, 232, 1);
        & span {
            float: right;
        }
    }
    .normal-li {
        font-size: 12px;
        line-height: 50px;
        color: rgba(140,140,140,1);
        & span {
            float: right;
        }
    }
</style>

<template>
    <div id="light-wrapper">
        <header class="header">
			<tab-bar :list="tabs"></tab-bar><br />

			<div class="tab-wrapper">
				<div class="tab-item" :class="{actived: currentIndex === index}" v-for="(item, index) of tab" v-text="item" @click="switchIndex(index)"></div>
			</div>
		</header>

        <div class="deviceContent" v-if="currentIndex === 0">
            <div class="top-button">
                <div class="left-content">
                    <el-button type="primary" @click="addDevice">+ 灯</el-button>
                    <el-button>批量导入</el-button>
                </div>
                

                <div class="search-content">
                    <el-input class="light-search" placeholder="编号/品牌/型号"></el-input>
                    <el-button type="primary" class="btn-search">查询</el-button>
                </div>
                
            </div>
            
            <div class="container">
                <ul class="all-floor">
                    <li :class="{activedFloor: floorIndex === index}" class="floor-item" v-for="(item, index) of floor" :key="index" v-text="item" @click="switchFloor(index)"></li>
                </ul>
                <div class="detail-floor">
                    <Building />
                </div>

                <div class="detail-info" v-if="level === 0">
                    <p class="title">暂无设备</p>
                    <span class="about">
                        您可通过以下两种方式添加。<br /> 
                        1. 单个添加：点击【+ 灯】按钮后，在楼层平面图中点击确定灯的位置，之后输入设备的各个信息，点击确定即可。 2. 批量导入：点击【批量导入】，系统会自动导入设备及其信息。
                    </span>
                </div>

                <div class="have-device detail-info" v-if="level === 1">
                    <ul class="divece-info">
                        <li class="all-dvice">设备总数（台）<span>1234</span></li>
                        <li class="normal-li">运行中（台）<span>1234</span></li>
                        <li class="normal-li">故障中（台）<span>1234</span></li>
                        <li class="normal-li">未运行（台）<span>1234</span></li>
                    </ul>
                </div>
            </div>
            
            
        </div>
    </div>
</template>
    
<script>
    import tabBar from '@/components/tab-bar.vue'
    import Building from '@/components/building.vue'

    export default {
        data() {
            return {
                search: '',
                currentIndex: 0,
                level: 0,
                floorIndex: 0,
                floor: ['1F', '2F', '3F', '4F', '5F', '6F', '7F', '8F', '9F', '10F', '11F', '12F', '13F'],
				tab: ['设备维护', '报表分析'],
                tabs: [
                    {
                        number: 123,
                        text: '灯总数'
                    },
                    {
                        number: 321,
                        text: '正常开启'
                    },
                    {
                        number: 432,
                        text: '正常关闭'
                    },
                    {
                        number: 542,
                        text: '故障中'
                    }
                ],
                tableData: [
                    {
                        lightNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-19',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 0
                    },
                    {
                        lightNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-29',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 1
                    },
                    {
                        lightNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-09',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 2
                    }
                ]
            }
        },
        methods: {
            switchIndex(index) {
				this.currentIndex = index
            },
            switchFloor(index) {
                this.floorIndex = index
            },
            addDevice() {
                this.level = 1
            },
            filterHandler(value, row, column) {

            },
            go() {
                this.$router.push('/light/lightAdd')
            }
        },
        components: {
            tabBar,
            Building
        }
    }
</script>
