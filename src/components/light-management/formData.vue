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
        }
    }
</script>