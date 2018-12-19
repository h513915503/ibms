<style scoped>
    .deviceContent {
        background: #FFF;
        /* padding: 24px; */
    }
    .top-button {
        display: flex;
	    justify-content: space-between;
        padding: 24px;
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
    .mask::after {
        content: "";
        width: 100%;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
        pointer-events: none;
        background-image: linear-gradient(to bottom, #ccc, rgba(0, 0, 0, .01));
    }
    .all-floor {
        position: relative;
        margin: 0 24px;
		box-sizing: border-box;
        border-right: 1px solid rgba(232,232,232,1);
        width: 74px;
        height: 544px;
        text-align: center;
        font-size:14px;
        overflow-y: scroll;
    }
    .all-floor::-webkit-scrollbar {
        display: none;
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
        color: rgba(0,0,0,0.65);
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
        justify-content: space-between;
    }
    .detail-info {
        width: 220px;
        margin: 0 24px;
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
    .cancel-btn {
        margin-top: 24px;
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
    <div class="deviceContent">
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
            <ul class="all-floor" @scroll="scroll" :class="{mask: showMask}">
                <li :class="{activedFloor: floorIndex === index}" class="floor-item" v-for="(item, index) of floor" :key="index" v-text="item" @click="switchFloor(index)"></li>
            </ul>
            
            <div class="detail-floor">
                <Building :level="level" @click="getLevel"/>
            </div>

            <div class="detail-info" v-if="level === 0">
                <p class="title">暂无设备</p>
                <span class="about">
                    您可通过以下两种方式添加。<br /> 
                    1. 单个添加：点击【+ 灯】按钮后，在楼层平面图中点击确定灯的位置，之后输入设备的各个信息，点击确定即可。 2. 批量导入：点击【批量导入】，系统会自动导入设备及其信息。
                </span>
            </div>

            <div class="detail-info add-device" v-if="level === 1">
                <p class="title">添加新设备</p>
                <span class="about">
                    在楼层平面图中选中个点并点击即表示在该位置添加一个设备。
                </span>
                <el-button class="cancel-btn" @click="cancelAdd">取消添加</el-button>
            </div>

            <div class="detail-info device-info" v-if="level === 2">
                <!-- <p class="title add-title">
                    新增设备
                    <span class="cancel-add">×</span>
                    <span class="concern-btn" @click="commitDeviceInfo">√</span>
                    
                </p> -->
                <DetailInfo />
            </div>

            <!-- <div class="have-device detail-info" v-if="level === 1">
                <ul class="divece-info">
                    <li class="all-dvice">设备总数（台）<span>1234</span></li>
                    <li class="normal-li">运行中（台）<span>1234</span></li>
                    <li class="normal-li">故障中（台）<span>1234</span></li>
                    <li class="normal-li">未运行（台）<span>1234</span></li>
                </ul>
            </div> -->
        </div>
            
            
    </div>
</template>

<script>

    import Building from '@/components/building.vue'
    import DetailInfo from '@/components/light-management/formData.vue'

    export default {
        data() {
            return {
                showMask: false,
                level: 0,
                floorIndex: 0,
                floor: ['-3F', '-2F', '-1F', '1F', '2F', '3F', '4F', '5F', '6F', '7F', '8F', '9F', '10F', '11F', '12F', '13F', '14F', '15F', '16F', '17F'].reverse(),
            }
        },
        methods: {
            switchFloor(index) {
                this.floorIndex = index
            },
            addDevice() {
                this.level = 1
                this.$root.deviceStatus = 1
            },
            cancelAdd() {
                this.level = 0
                this.$root.deviceStatus = 0
            },
            getLevel(data) {
                console.log(data)
                this.level = data
            },
            scroll(e) {
				if (e.target.scrollTop > 12) {
					this.showMask = true
				} else {
					this.showMask = false
				}
			}
        },
        components: {
            Building,
            DetailInfo
        },
        created() {

        }
    }
</script>