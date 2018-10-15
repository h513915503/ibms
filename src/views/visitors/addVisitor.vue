<style scoped>
    #visitor-add {
        padding: 24px;
    }
    .container {
        padding: 24px;
        margin-top: 20px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .el-input {
        width: 354px;
        height: 40px;
    }
</style>

<template>
    <div id="visitor-add">
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">人员</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/visitor'}">访客登记</el-breadcrumb-item>
			<el-breadcrumb-item>新增访客</el-breadcrumb-item>
		</el-breadcrumb>

        <div class="container">
            <el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="访客编号：">
					<span>{{ form.lightNum }}</span>
				</el-form-item>
				<el-form-item label="访客姓名：">
					<el-input v-model="form.brand" placeholder="如：张三丰"></el-input>
				</el-form-item>
                <el-form-item label="访客手机号码：">
					<el-input v-model="form.model" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="被访单位：">
					<el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="被访人：">
					<el-input v-model="form.model" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="被访人手机号码：">
					<el-input v-model="form.model" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="到访有效时间：">
					<el-date-picker
                        v-model="date"
                        type="datetimerange"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>
				</el-form-item>
				<el-form-item label="人脸信息">
					<el-input v-model="form.detaliPosition" placeholder="如：走廊，茶水间，楼梯间等"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit">确定</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
        </div>
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
