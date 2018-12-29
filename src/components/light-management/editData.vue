<style scoped>
#container {
    font-size: 12px !important;
    
    & .el-form-item {
        margin-bottom: 0;
        font-size: 12px !important;

        & .el-form-item__label {
            color: red;
            font-size: 12px !important;
            font-weight: 100 !important;
        }

        & .el-input__inner {
            height: 22px !important;
        }
    }
    
}
.title {
    margin-bottom: 24px;
    font-size:14px;
    color:rgba(0,0,0,1);
}
.add-title {
    display: flex;
    height: 36px;
    position: relative;
    line-height: 24px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(232,232,232,1);

    & span {
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 1px solid rgba(232,232,232,1);
        border-radius: 2px;
        font-size: 18px;
        color: #ccc;
        text-align: center;
        cursor: pointer;
    }
}
.icon-more {
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url(~@/assets/more.png) center no-repeat;
    background-size: 100%;
}
.more-icon-wrapper {
	display: flex;
	padding: 13px 21px;
	position: absolute;
	bottom: 0;
	right: 30px;
	border-radius: 4px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .15);
	background-color: #F5F5F5;

	& .icon {
		width: 24px;
		height: 24px;
	}

	& .icon-delete {
		margin-left: 25px;
	}
}
.icon-edit {
	cursor: pointer;
	background: url(~@/assets/edit.png) center no-repeat;
	background-size: 100%;
}
.icon-delete {
	cursor: pointer;
	background: url(~@/assets/delete.png) center no-repeat;
	background-size: 100%;
}
    .cancel-add {
        margin-left: 100px;
        color: rgba(0, 0, 0, 0.45);
    }
    .concern-btn {
        background:rgba(191,191,191,1);
        color: rgba(255, 255, 255, 1);
    }
</style>
<style>
    #light-container .el-form-item__label {
        font-size: 12px !important;
        font-weight: 100 !important;
    }
    #light-container .el-form-item {
        margin-bottom: 10px;
    }
</style>
<template>
    <div class="content" id="light-container">
        <template v-if="editStatus === 0">
            <p class="title add-title">
                设备详情
                <!-- <span class="icon-more" slot="reference"></span> -->
                <el-popover popper-class="no-shadow" placement="bottom-end" trigger="click" @hide="popoverModalStatus = false">
                    <div class="icon-more" slot="reference"></div>
                    <div class="more-icon-wrapper">
                        <i class="icon icon-edit" @click="editDevice"></i>
                        <i class="icon icon-delete" @click="delDevice"></i>


                    </div>
                </el-popover>
            </p>
            <el-form ref="form" :model="form" label-width="84px" label-position="left">
                <el-form-item label="状态">
                    <el-select v-model="form.status" size="mini">
                        <el-option>w</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="form.brand" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="型号">
                    <el-input v-model="form.mode" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="出场日期">
                    <el-input v-model="form.date" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="使用年限(年)">
                    <el-input v-model="form.long" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="累计故障次数">
                    <el-input v-model="form.alltime" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="详细位置">
                    <el-select v-model="form.status" size="mini">
                        <el-option>w</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.position" placeholder="" size="mini"></el-input>
                </el-form-item>
            </el-form>
        </template>

        <template v-else>
            <p class="title add-title">
                编辑设备
                <span class="cancel-add" @click="cancelAdd">×</span>
                <span class="concern-btn" @click="submitDeviceInfo">√</span>
                
            </p>
            <el-form ref="form" :model="form" label-width="84px" label-position="left">
                <el-form-item label="状态">
                    <el-select v-model="form.state" size="mini">
                        <el-option value="1" label="正常运行"></el-option>
                        <el-option value="2" label="正常关闭"></el-option>
                        <el-option value="3" label="故障中"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="form.brand" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="型号">
                    <el-input v-model="form.type" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="出场日期">
                    <el-input v-model="form.productionDate" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="使用年限(年)">
                    <el-input v-model="form.durableYears" placeholder="" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="累计故障次数">
                    <el-input v-model="form.failureNumber" placeholder="" size="mini"></el-input>
                </el-form-item>
                
                <el-form-item label="详细位置">
                    <el-select v-model="form.deviceLocationTypeId" size="mini">
                        <el-option :label="item.className" :value="item.id" v-for="item of positionList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-formitem->
                    <el-input v-model="form.detailLocation" placeholder="" size="mini"></el-input>
                </el-formitem->
            </el-form>
        </template>
        

        <popover name="close" title="确定要删除该设备么？" content="删除该设备后，该设备的所有数据将被清空。" :follow-target="followTarget" :offsetX="100" :offsetY="100" v-if="popoverModalStatus" @hide="popoverModalStatus = false">
			<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
			<el-button type="primary" slot="cancel" class="ok" @click="deleteDevice">确定</el-button>
		</popover>
    </div>
</template>

<script>
    export default {
        porps:['detailInfo', 'floorId'],
        data() {
            return {
                form: {

                },
                editStatus: 0,
                followTarget: null,
                popoverModalStatus: false,
            }
        },
        methods: {
            // submitDeviceInfo() {
            //     this.$root.isAdd = 1
                
            //     console.log(this.form)
            // },
            cancelAdd() {
                this.$root.deviceStatus = 0
                this.$emit('click', 0)
            },
            editDevice() {
                this.editStatus = 1
            },
            delDevice() {
                this.popoverModalStatus = true
            },
            async deleteDevice() {
                const params = {
                    action: 'Device.delDevice',
                    devId: 1
                }
                const data = await axios.post('/dapi/dispatcher.do', params)
                if (!data) {
                    return
                }
            },
            async submitDeviceInfo() {
                console.log(this.floorId)
                const params = {
                    action: 'Device.editDevice',
                    deviceDescribe: {
                        id: 1,
                        state: 1,
                        deviceTypeId: 1,
                        deviceNo: '',
                        brand: this.form.brand,
                        type: this.form.type,
                        productionDate: this.form.productionDate,
                        durableYears: this.form.durableYears,
                        failureNumber: this.form.failureNumber,
                        detailLocation: this.form.detailLocation,
                        deviceLocationTypeId: this.form.deviceLocationTypeId
                    },
                    deviceLocation: {
                        // floorId: this.floorId.id || 41,
                        floorId: 41,
                        xAxis: "153.875456556",
                        yAxis: "149.36566564564",
                        zAxis: "184.65566556"
                    }
                };
                params.deviceDescribe = JSON.stringify(params.deviceDescribe)
                params.deviceLocation = JSON.stringify(params.deviceLocation)
                const data = await axios.post('/dapi/dispatcher.do', params)

                if (!data.data) {
                    return
                }
            }
        }
    }
</script>