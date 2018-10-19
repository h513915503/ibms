<style scoped>
    #add-property {
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
    <div id="add-property">
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/propertyManagement'}">物业人员管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增物业人员</el-breadcrumb-item>
		</el-breadcrumb>

        <div class="container">
            <el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="物业人员编号：">
					<span>{{ form.lightNum }}</span>
				</el-form-item>
				<el-form-item label="姓名：">
					<el-input v-model="form.brand" placeholder="如：张三丰"></el-input>
				</el-form-item>
                <el-form-item label="手机号码：">
					<el-input v-model="form.model" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="所在岗位：">
					<el-checkbox v-for="item of form.checks" v-model="item.value" :key="item.value">{{ item.text }}</el-checkbox>
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
                    checks: [
                        {
                            value: false,
                            text: '场地人员管理'
                        },
                        {
                            value: false,
                            text: '人提供任何'
                        },
                        {
                            value: false,
                            text: 'hdhd'
                        },
                        {
                            value: false,
                            text: 'ERWER'
                        },
                    ]
                }
            }
        },
        methods: {
            submit() {

            },
            
        }
    }
</script>
