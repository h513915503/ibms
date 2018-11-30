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
        padding-bottom: 24px;
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
                <el-button type="primary">+ 灯</el-button>
                <el-button>批量导入</el-button>
            </div>
            
            <div class="container">
                <ul class="all-floor">
                    <li :class="{activedFloor: floorIndex === index}" class="floor-item" v-for="(item, index) of floor" :key="index" v-text="item" @click="switchFloor(index)"></li>
                </ul>
                <div class="detail-floor">
                    <Building />
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
