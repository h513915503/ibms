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
        <p class="title add-title">
            新增设备
            <span class="cancel-add">×</span>
            <span class="concern-btn" @click="submitDeviceInfo">√</span>
            
        </p>
        <el-form ref="form" :model="form" label-width="84px" label-position="left" size="mini">
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {

                }
            }
        },
        methods: {
            submitDeviceInfo() {
                console.log(this.form)
            },
        }
    }
</script>