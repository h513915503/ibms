<style scoped>
#lease-add-wrapper {
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
.room-list {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 15px;

	& li {
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		box-sizing: border-box;
		line-height: 40px;
		margin-right: 10px;
		margin-bottom: 10px;
		border-radius: 5px;
		cursor: pointer;
		background-color: #EEE;
	}

	& span {
		margin-left: 10px;
	}
}

.floor-list {
	margin-bottom: 15px;

	& li {
		display: flex;
		margin-bottom: 32px;
		position: relative;
	}

	& .space {
		margin: 0 10px;
		color: rgba(0, 0, 0, .25);
	}

	& .el-select, .el-input {
		width: 160px;
	}

	& .area {
		margin-left: 30px;
		color: #595959;
		font-size: 14px;
	}

	& .area.error {
		color: red;
	}
}
.error-tips {
	position: absolute;
	top: 40px;
	right: 430px;
	color: red;
}
.operation {
	display: flex;
	justify-content: space-between;
	width: 540px;
}
</style>
<style>
#lease-add-wrapper .el-form-item__label {
	color: #000;
	font-size: 16px;
	font-weight: bold;
}
</style>

<template>
	<div id="lease-add-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">办公租赁</el-breadcrumb-item>
			<el-breadcrumb-item>新增入住单位</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="租赁场地：">
					<ul class="floor-list">
						<li v-for="item of list">
							<el-select v-model="item.floorNumber">
								<el-option :label="item.number + '层'" :value="item.id" v-for="item of item.floorList"></el-option>
							</el-select>
							<span class="space">-</span>
							<el-input v-model="item.roomNumber" placeholder="门牌号"></el-input>
							<span class="space">-</span>
							<input class="el-input el-input__inner" v-model="item.area" placeholder="可租面积：1000㎡" @blur="blur(item)" @input="change($event, item)" />㎡
							<span class="area" :class="{error: item.error}">可租面积：{{item.leaseArea}}㎡</span>
							<span class="error-tips" v-if="item.error">超出可租赁面积</span>
						</li>
					</ul>
					<div class="operation">
						<el-button type="text" @click="addFloor">添加新楼层</el-button>
						<span>总面积：{{1000}}㎡</span>
					</div>
				</el-form-item>
				<el-form-item label="租赁单位：">
					<el-input v-model="form.leaseCompany" placeholder="租赁单位全称"></el-input>
				</el-form-item>
				<el-form-item label="租约起止日期：">
					 <el-date-picker v-model="form.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="单位物业负责人：">
					<el-input v-model="form.propertyPerson" placeholder="负责除单位所属人员的人脸维护外的工作"></el-input>
				</el-form-item>
				<el-form-item label="单位物业负责人联系号码：">
					<el-input v-model="form.propertyPersonPhone" placeholder="手机号码或座机"></el-input>
				</el-form-item>
				<el-form-item label="单位人事负责人：">
					<el-input v-model="form.hr" placeholder="负责单位所属人员的人脸维护工作"></el-input>
				</el-form-item>
				<el-form-item label="单位人事负责人联系号码：">
					<el-input v-model="form.hrPhone" placeholder="手机号码或座机"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :disabled="! isDisabled" type="primary" @click="submit" v-if="! submiting">确定</el-button>
					<el-button disabled type="primary" v-else>提交中...</el-button>

					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import getResponses from '@/api'

	export default {
		data() {
			return {
				checkArea: true,

				submiting: false,
				form: {
					leaseCompany: '',
					date: '',
					propertyPerson: '',
					propertyPersonPhone: '',
					hr: '',
					hrPhone: ''
				},
				list: [
					{
						error: false,
						leaseArea: 1000,
						roomNumber: '',
						area: 1000,
						floorNumber: 1,
						floorList: [
							{
								id: 1,
								number: 1
							},
							{
								id: 2,
								number: 2
							},
							{
								id: 3,
								number: 3
							},
							{
								id: 4,
								number: 4
							},
							{
								id: 5,
								number: 5
							}
						]
					}
				]
			}
		},

		computed: {
			isDisabled() {
				if (! this.checkArea) {
					return false
				}

				return this.form.leaseCompany && this.form.date && this.form.propertyPerson && this.form.propertyPersonPhone && this.form.hr && this.form.hrPhone
			}
		},

		created() {

		},

		methods: {
			blur(item) {
				//item.area > item.leaseArea ? item.error = true : item.error = false

				if (item.area > item.leaseArea) {
					item.error = true
					this.checkArea = false
				} else {
					item.error = false
					this.checkArea = true
				}
			},
			change(e, item) {
				item.area = e.target.value.replace(/\D/g, '')
				e.target.value = item.area
			},
			addFloor() {
				const floorNumber = this.list.length + 1

				this.list.push({
					leaseArea: 1000,
					roomNumber: '',
					area: '',
					floorNumber,
					floorList: [
						{
							id: 1,
							number: 1
						},
						{
							id: 2,
							number: 2
						},
						{
							id: 3,
							number: 3
						},
						{
							id: 4,
							number: 4
						},
						{
							id: 5,
							number: 5
						}
					]
				})
			},
			async submit() {
				const params = {
					leaseCompany: this.leaseCompany,
					propertyPerson: this.propertyPersonPhone,
					propertyPersonPhone: this.propertyPersonPhone,
					hr: this.hr,
					date: this.date,
					hrPhone: this.hrPhone
				}

				this.submiting = true

				const data = await getResponse('/', params)

				this.submiting = false

				if (! data) {
					return
				}

				this.back()
			},
			back() {
				this.$router.push('/lease')
			}
		}
	}
</script>