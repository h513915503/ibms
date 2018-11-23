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

<template>
	<div id="lease-add-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">办公租赁</el-breadcrumb-item>
			<el-breadcrumb-item>编辑入驻单位</el-breadcrumb-item>
		</el-breadcrumb>

		<loading v-if="loading"></loading>
		<div class="container" v-else>
			<el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="租赁场地：">
					<ul class="floor-list">
						<li v-for="(item, index) of list">
							<el-select v-model="item.floorId" @change="selectChange" @focus="focus(index)">
								<el-option :label="item.floorNumber + '层'" :value="item.floorId" v-for="item of floorNumberList" :key="item.floorId"></el-option>
							</el-select>

							<span class="space">-</span>
							<el-input :disabled="! item.floorId" v-model="item.roomNumber" placeholder="门牌号"></el-input>
							<span class="space">-</span>

							<div class="el-input is-disabled" v-if="! item.floorId">
								<input class="el-input__inner" disabled v-model="item.area" placeholder="请输入租赁面积" />
							</div>
							<template v-else>
								<input class="el-input el-input__inner" v-model="item.area" placeholder="请输入租赁面积" @blur="blur(item)" @input="change($event, item)" />
							</template>
							&#x3000;㎡

							<span class="area" :class="{error: item.error}">可租面积：{{item.leaseArea}}㎡</span>
							<span class="error-tips" v-if="item.error">超出可租赁面积</span>
						</li>
					</ul>

					<div class="operation">
						<el-button type="text" @click="addFloor">添加新楼层</el-button>
						<span>总面积：{{totalArea}}㎡</span>
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
					<el-button :disabled="isDisabled" type="primary" @click="submit">确定</el-button>

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
				loading: false,
				checkArea: true,
				disabled: false,

				form: {
					leaseCompany: '',
					date: '',
					propertyPerson: '',
					propertyPersonPhone: '',
					hr: '',
					hrPhone: ''
				},

				floorNumberList: [],
				list: [
					{
						error: false,
						roomNumber: '',
						area: '',
						leaseArea: '',
						floorId: ''
					}
				]
			}
		},

		computed: {
			totalArea() {
				return this.list.map((item) => + item.area).reduce((prev, next) => {
					return prev + next
				})
			},
			isDisabled() {
				if (this.disabled) {
					return true
				}

				if (! this.checkArea) {
					return false
				}

				if (this.form.leaseCompany && this.form.date && this.form.propertyPerson && this.form.propertyPersonPhone && this.form.hr && this.form.hrPhone) {
					return false
				}

				return true
			}
		},

		filters: {
			format(value) {
				return this.floorNumberList.find((item) => value === item.floorId).leaseArea
			}
		},

		created() {
			this.loading = true

			this.getFloorNumberList().then(() => {
				this.getDetail().then(() => {
					this.loading = false
				})
			})
		},

		methods: {
			async getDetail() {
				const params = {
					action: 'OfficeRental.queryRentalInfo',
					rentalId: this.$route.params.id
				}

				this.loading = true

				const data = await axios.post('/api/dispatcher.do', params)

				this.loading = false

				if (! data) {
					return
				}

				const {rentalCompany, propertyName, propertyPhone, personnelName, personnelPhone, rentalFloorInfos} = data.data

				//this.detail = data.data
				this.form.leaseCompany = rentalCompany
				this.form.propertyPerson = propertyName
				this.form.propertyPersonPhone = propertyPhone
				this.form.hr = personnelName
				this.form.hrPhone = personnelPhone

				this.form.date = [rentalFloorInfos[0].startDate, rentalFloorInfos[0].endDate]

				this.list = rentalFloorInfos.map((item) => {
					return {
						error: false,
						roomNumber: item.houseNumber,
						area: item.rentedSize,
						floorId: this.floorNumberList.find((current) => current.floorNumber === item.floorNumber).floorId
					}
				})
			},
			async getFloorNumberList() {
				const params = {
					action: 'OfficeRental.queryAllRentalInfo'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.floorNumberList = data.data.map((item) => {
					return {
						floorId: item.floorId,
						floorNumber: item.floorNumber,
						leaseArea: item.notRentalSize
					}
				})
			},
			focus(index) {
				this.$index = index
			},
			selectChange(value) {
				this.list[this.$index].leaseArea = this.floorNumberList.find((item) => item.floorId === value).leaseArea
			},
			blur(item) {
				const leaseArea = this.floorNumberList.find((current) => current.floorId === item.floorId).leaseArea

				if (item.area > leaseArea) {
					item.error = true
					this.checkArea = false
				} else {
					item.error = false
					this.checkArea = true
				}
			},
			change(e, item) {
				item.leaseArea = e.target.value.replace(/\D/g, '')
				e.target.value = item.leaseArea
			},
			addFloor() {
				this.list.push({
					error: false,
					floorId: '',
					roomNumber: '',
					area: '',
					leaseArea: ''
				})
			},
			formatDate() {
				if (typeof this.form.date[0] !== 'object') {
					this.form.date = [new Date(this.form.date[0]), new Date(this.form.date[1])]
				}
			},
			async submit() {
				// 时间可能是 timestamp
				this.formatDate()

				const startDate = this.form.date[0]
				const endDate = this.form.date[1]

				const params = {
					action: 'OfficeRental.editRentalInfo',

					rentaldata: JSON.stringify({
						id: this.$route.params.id,
						rentalCompany: this.form.leaseCompany,
						propertyName: this.form.propertyPersonPhone,
						propertyPhone: this.form.propertyPersonPhone,
						personnelName: this.form.hr,
						personnelPhone: this.form.hrPhone,

						rentalFloorInfos: this.list.map((item) => {
							return {
								floorNumber: this.floorNumberList.find((current) => current.floorId === item.floorId).floorNumber,
								rentedSize: item.area,
								houseNumber: item.roomNumber,
								startDate: `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
								endDate: `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`,
							}
						})
					})
				}

				this.disabled = true

				const data = await axios.post('/api/dispatcher.do', params)

				this.disabled = false

				if (! data) {
					return
				}

				location.href = '/lease'
			},
			back() {
				this.$router.back()
			}
		}
	}
</script>