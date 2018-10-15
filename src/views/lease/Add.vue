<style scoped>
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
</style>
<style>
#lease-add .el-form-item__label {
	color: #000;
	font-size: 16px;
	font-weight: bold;
}
</style>

<template>
	<div id="lease-add">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">办公租赁</el-breadcrumb-item>
			<el-breadcrumb-item>新增入住单位</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="租赁房间：">
					<span v-text="selectRooms"></span>
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
				submiting: false,
				form: {
					leaseCompany: '',
					date: '',
					propertyPerson: '',
					propertyPersonPhone: '',
					hr: '',
					hrPhone: ''
				},
				rooms: [],
			}
		},

		computed: {
			isDisabled() {
				return this.form.leaseCompany && this.form.date && this.form.propertyPerson && this.form.propertyPersonPhone && this.form.hr && this.form.hrPhone
			},
			selectRoom() {
				return this.$store.state.selectRoom
			},
			selectRooms() {
				log(JSON.stringify(this.selectRoom))
				return this.selectRoom.map((item) => {
					if (item.isAll) {
						return `${item.floorNumber}层`
					} else {
						return item.roomList.join('、')
					}
				}).join('、')
				//return this.$store.state.selectRoom.join('、')
			}
		},

		created() {
			const selectRoom = localStorage.getItem('selectRoom')

			if (selectRoom) {
				this.$store.commit('setSelectRoom', JSON.parse(selectRoom))
			}
		},

		methods: {
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

				// 移除数据
				localStorage.removeItem('selectRoom')

				this.back()
			},
			back() {
				this.$router.push('/lease')
			}
		}
	}
</script>