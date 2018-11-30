<style scoped>
.add-property {
	padding: 24px;
}
.content {
	padding: 24px 0;
	margin-top: 24px;
	background-color: #FFF;
}
.el-input {
	width: 354px;
	height: 40px;
}
</style>

<template>
	<div class="add-property-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item to="/property">物业人员管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增物业人员</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="content">
			<el-form :model="form" label-width="210px" label-position="right">
				<el-form-item label="物业人员编号：">
					<span v-text="postNumber"></span>
				</el-form-item>
				<el-form-item label="姓名：">
					<el-input v-model="form.name" placeholder="如：张三"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：">
					<input type="text" class="el-input el-input__inner" maxlength="11" v-model="form.phone" placeholder="手机号码" @input="change">
				</el-form-item>
				<el-form-item label="所在岗位：">
					<el-checkbox-group v-model="checkList">
					   <el-checkbox v-for="item of postList" :label="item"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :disabled="isDisabled" @click="submit">确定</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				disabled: false,

				postNumber: '',
                form: {
                    name: '',
                    phone: ''
                },

				checkList: [],
				postList: []
			}
		},

		computed: {
			isDisabled() {
				if (this.disabled) {
					return true
				}

				if (this.form.name && this.form.phone) {
					return false
				}

				return true
			}
		},

		created() {
			this.getPostNumber()
			this.getPostList()
		},

		methods: {
			change(e) {
				this.form.phone = e.target.value.replace(/\D/g, '')
				e.target.value = this.form.phone
			},
			async getPostNumber() {
				const params = {
					action: 'administrator.getPmoId'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.postNumber = data.data
			},
			async getPostList() {
				const params = {
					action: 'administrator.getPostNameList'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.postList = data.data
			},
			async submit() {
				const params = {
					action: 'administrator.addPmoInfo',
					pmoId: this.postNumber,
					name: this.form.name,
					phoneNumber: this.form.phone,
					postName: JSON.stringify(this.checkList)
				}

				this.disabled = true

				const data = await axios.post('/api/dispatcher.do', params)

				this.disabled = false

				if (! data) {
					return
				}

				location.href = '/property'
			},
			back() {
				this.$router.push('/property')
			}
		}
	}
</script>
