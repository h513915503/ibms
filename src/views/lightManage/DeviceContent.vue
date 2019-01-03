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
        margin-top: 24px;
    }
    .light-search {
        width: 128px;
	    margin-left: 24px;
    }
    .btn-search {
        margin-left: 24px;
        height: 40px;
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
        height: 690px;
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
        width: 80%;
        height: 520px;
        margin-top: 24px;
    }
    .container {
        display: flex;
        flex-direction: row;
        /* justify-content: space-between; */
    }
    .detail-info {
        width: 220px;
        margin: 24px;
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
    .light-kind {
        font-size: 12px;
        color: rgba(140,140,140,1);
        border-top: 1px solid rgba(232, 232, 232, 1);
        & li {
            line-height: 34px;
        }
        & span {
            float: right;
        }
    }
</style>

<template>
    <div class="deviceContent">
        
        <div class="container">
            <ul class="all-floor" @scroll="scroll" :class="{mask: showMask}">
                <li :class="{activedFloor: item.id === floorId}" class="floor-item" v-for="(item) of floorData" :key="item.id" v-text="`${item.floorNumber}`" @click="switchFloor(item.id)"></li>
            </ul>
            
            <div class="detail-floor">
                <el-button type="primary" @click="addDevice">+ 灯</el-button>
                <Building
                    :isEdit="isEdit"
                    :detailInfo="detailInfo"
                    :activeId="activeDeviceId"
                    @item:select="handleDeviceSelect"
                    @item:add="handleDeviceAdd"
                    @item:modify="modifyDevicePosition"
                />
            </div>
            
            <div>
                <div class="search-content">
                    <el-input class="light-search" placeholder="编号/品牌/型号"></el-input>
                    <el-button type="primary" class="btn-search">查询</el-button>
                </div>
                <div class="detail-info" v-if="!detailInfo.length">
                    <p class="title">暂无设备</p>
                    <span class="about">
                        您可通过以下两种方式添加。<br />
                        1. 单个添加：点击【+ 灯】按钮后，在楼层平面图中点击确定灯的位置，之后输入设备的各个信息，点击确定即可。 2. 批量导入：点击【批量导入】，系统会自动导入设备及其信息。
                    </span>
                </div>

                <template v-else>
                    <div class="detail-info device-info" v-if="activeDeviceId">
                        <EditContent
                            :isEdit="isEdit"
                            :deviceInfo="activeDevice"
                            :positionList="[]"
                            @edit:cancel="setEditStatus(false, 'add')"
                            @detail:edit="setEditStatus(true)"
                            @edit:submit="submitDeviceInfo"
                        />
                    </div>
                    <template v-else>
                        <div class="detail-info add-device" v-if="isEdit">
                            <p class="title">添加新设备</p>
                            <span class="about">
                                在楼层平面图中选中个点并点击即表示在该位置添加一个设备。
                            </span>
                            <el-button class="cancel-btn" @click="setEditStatus(false)">取消添加</el-button>
                        </div>
                        <div class="detail-info" v-else>
                            <p class="title" style="marginBottom: 16px">设备统计</p>
                            <ul class="light-kind">
                                <li>常亮灯数量<span>123</span></li>
                                <li>常灭灯数量<span>123</span></li>
                                <li>休眠灯数量<span>123</span></li>
                                <li>智能灯数量<span>123</span></li>
                            </ul>
                        </div>
                    </template>
                </template>
            </div>

            

        </div>
            
            
    </div>
</template>

<script>

    import Building from '@/components/building.vue'
    // import AddDevice from '@/components/light-management/formData.vue'
    import EditContent from '@/components/light-management/editData.vue'

    export default {
        data() {
            return {
                loading: false,

                showMask: false,

                isEdit: false,

                floorData: [{floorNumber: '泛光', id: 1}, {floorNumber: '景观', id: 2}, {floorNumber: '室外1', id: 3}, {floorNumber: '室外2', id: 4}, {floorNumber: 'B1', id: 5}, {floorNumber: 'B2', id: 6}, {floorNumber: 'B3', id: 7}],
                floorId: null,
                detailInfo: [],
                activeDeviceId: null
            }
        },
        computed: {
            activeDevice: function() {
                console.log('actD')
                let activeDevice = {};
                const activeDeviceId = this.activeDeviceId;
                if (activeDeviceId) {
                    activeDevice = this.detailInfo.find(item => item.id === activeDeviceId) || {};
                }
                return JSON.parse(JSON.stringify(activeDevice))
            }
        },
        methods: {
            addDevice() {
                this.isEdit = true;
                this.activeDeviceId = null;
            },
            scroll(e) {
				if (e.target.scrollTop > 12) {
					this.showMask = true
				} else {
					this.showMask = false
				}
            },
            submitDeviceInfo(value) {
                console.log(this.activeDevice)
                this.isEdit = false;
                // const params = {
                //     action: 'Device.addDevice',
                //     deviceDescribe: {
                //         state: 1,
                //         deviceTypeId: 1,
                //         deviceNo: '',
                //         brand: this.form.brand,
                //         type: this.form.type,
                //         productionDate: this.form.productionDate,
                //         durableYears: this.form.durableYears,
                //         failureNumber: this.form.failureNumber,
                //         detailLocation: this.form.detailLocation,
                //         deviceLocationTypeId: this.form.deviceLocationTypeId
                //     },
                //     deviceLocation: {
                //         floorId: this.floorId.id,
                //         xAxis: this.locationObj.xAxis,
                //         yAxis: this.locationObj.yAxis,
                //         zAxis: this.locationObj.zAxis
                //     }
                // };
                // params.deviceDescribe = JSON.stringify(params.deviceDescribe)
                // params.deviceLocation = JSON.stringify(params.deviceLocation)
                // const data = await axios.post('/dapi/dispatcher.do', params)
                this.switchFloor(this.floorId)
            },
            async switchFloor(id) {
                // 切换楼层，获取设备列表
                if (this.handleDeviceSelect(null)) {
                    this.floorId = id;
                    this.detailInfo = [];
                    await new Promise(resolve => {
                        setTimeout(resolve, 1000);
                    });
                    this.detailInfo = [{
                        id: + new Date,
                        locationObj: {
                            x: Math.floor(Math.random() * 1000),
                            y: Math.floor(Math.random() * 700)
                        }
                    }]
                }
            },
            handleDeviceSelect(deviceId) {
                // 当前选中的是未完成的新设备
                console.log(this.activeDeviceId, deviceId)
                if (this.activeDeviceId === 'device-new') {
                    if (confirm('未完成设备添加工作，是否取消添加')) {
                        // 确认取消操作
                        this.detailInfo.pop();
                    } else {
                        // 不切换，继续补充信息
                        return false;
                    }
                }
                if (this.activeDeviceId !== deviceId) {
                    this.isEdit = false;
                    this.activeDeviceId = deviceId;
                    
                }
                return true;
            },
            handleDeviceAdd(position) {
                const id = 'device-new';
                this.detailInfo.push({
                    id,
                    locationObj: position
                });
                this.activeDeviceId = id;
                this.isEdit = true;
            },
            modifyDevicePosition(data) {
                this.activeDevice.locationObj = data.position;
            },
            setEditStatus(status, isAdd) {
                this.isEdit = status;
                if (isAdd === 'add') {
                    this.handleDeviceSelect(null)
                }
                // this.handleDeviceSelect(null)
            }
        },
        components: {
            Building,
            // AddDevice,
            EditContent
        },
        created() {
            
        },
        mounted() {
            this.switchFloor(1)
        }
    }
</script>