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
            <el-form ref="formField" :model="formField" :rules="rules" label-width="210px" label-position="right">
				<el-form-item label="物业人员编号：" prop="lightNum">
					<span>{{ formField.lightNum }}</span>
				</el-form-item>
				<el-form-item label="姓名：" prop="name">
					<el-input v-model="formField.name" placeholder="如：张三丰"></el-input>
				</el-form-item>
                <el-form-item
                    label="手机号码："
                    prop="phoneNum"
                >
					<el-input v-model="formField.phoneNum" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="所在岗位：" prop="checks">
					<el-checkbox v-for="item of formField.checks" v-model="item.value" :key="item.text">{{ item.text }}</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit('formField')">确定</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            const phoneNumRule = (rule, value, callback) => {
                if(!value) {
                    callback(new Error('电话不能为空'));
                } else if(!(/^1[34578]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号'))
                }

            }
            return {
                formField: {
                    lightNum: '',
                    name: '',
                    phoneNum: '',
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
                },
                rules: {
                    phoneNum: [
                        { validator: phoneNumRule, trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            console.log(this.$store.state.detailInfo)
        },
        methods: {
            submit(formField) {
                // const params = {
                //     num: values.lightNum,
                //     name: values.name,
                //     phoneNum: values.phoneNum,
                //     checks: values.checks
                // }
                this.$refs[formField].validate((valid) => {
                    if(valid) {
                        console.log(this.formField)
                    } else {
                        return
                    }
                })
                // console.log(params)
            },
            
        }
    }
</script>
