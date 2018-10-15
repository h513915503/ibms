<style scoped>
    #light-add {
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
    <div id="light-add">
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">设备</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lightManagement'}">灯管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增灯</el-breadcrumb-item>
		</el-breadcrumb>
        <div class="container">
            <el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="灯编号：">
					<span>{{ form.lightNum }}</span>
				</el-form-item>
				<el-form-item label="品牌：">
					<el-input v-model="form.brand" placeholder="如：戴尔"></el-input>
				</el-form-item>
                <el-form-item label="型号：">
					<el-input v-model="form.model" placeholder="见灯包装盒"></el-input>
				</el-form-item>
				<el-form-item label="出厂日期：">
					 <el-date-picker v-model="form.outDate" type="date"></el-date-picker>
				</el-form-item>
				<el-form-item label="已使用：">
					<el-input-number v-model="form.usedTime" :min="0"></el-input-number> 年
				</el-form-item>
				<el-form-item label="累计故障：">
					<el-input-number v-model="form.calcErrors" :min="0"></el-input-number> 次
				</el-form-item>
				<el-form-item label="所在楼层：">
					<el-input-number v-model="form.floors" :min="0"></el-input-number> 层
				</el-form-item>
				<el-form-item label="详细位置">
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
                    lightNum: 12345678,
                    brand: '',
                    model: '',
                    outDate: '',
                    usedTime: 0,
                    calcErrors: 0,
                    floors: 0,
                    detaliPosition: ''
                }
            }
        },
        methods: {
            submit() {
                console.log(this.form)
            }
        }
    }
</script>
