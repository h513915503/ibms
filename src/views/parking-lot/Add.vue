<style scoped>
.parking-lot-add-wrapper {
	padding: 24px;
}
.container {
	padding: 24px;
	margin-top: 20px;
	position: relative;
	box-sizing: border-box;
	background-color: #FFF;
}

.el-input, .el-select {
	width: 354px;
	height: 40px;
}
.select {
	width: 160px;
}
.mr {
	margin: 0 24px 0 10px;
}
.ok-btn {
	margin-right: 40px;
}

.select-wrapper {
	width: 170px;
	margin-right: 16px;
}
.option-wrapper {
	display: flex;
	justify-content: space-between;
}
.popover-wrapper {
	left: 220px;
	bottom: -150px;
	box-shadow: 0 0 12px 0px rgba(0, 0, 0, .2);
}
</style>

<template>
	<div class="parking-lot-add-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/parking-lot'}">车位租赁</el-breadcrumb-item>
			<el-breadcrumb-item>新增包月车辆</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<el-form :model="form" label-width="200px" label-position="right">
				<el-form-item label="车牌号：">
					<el-input v-model="form.carNumber" placeholder="如：浙AMK123"></el-input>
				</el-form-item>
				<el-form-item label="车主姓名：">
					<el-input v-model="form.name" placeholder="与驾照姓名保持一致"></el-input>
				</el-form-item>
				<el-form-item label="车主手机号码：">
					<input class="el-input el-input__inner" v-model="form.phone" placeholder="手机号码" maxlength="11" @input="change" />
				</el-form-item>
				<el-form-item label="所在单位：">
					<el-select v-model="form.company" placeholder="选择所在单位">
						<el-option v-for="item of companyList" :label="item.companyName" :value="item.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="车位：">
					<el-radio v-model="form.parkingPlace" :label="0">不固定</el-radio>
					<el-radio v-model="form.parkingPlace" :label="1">固定</el-radio>
				</el-form-item>
				<el-form-item label="停车位置：" v-if="form.parkingPlace === 1">
					<el-select class="select-wrapper" v-model="form.floorId" @change="selectChange">
						<el-option :label="item.floorNumber + '层'" :value="item.floorId" v-for="item of parkingNumberList"></el-option>
					</el-select>
					<el-select class="select-wrapper" v-model="form.parkingSpace" v-if="type === 1">
						<el-option :label="item.parkingSpaceOrder + '号'" :value="item.spaceId" v-for="item of parkingSpaceList"></el-option>
					</el-select>
					<el-select class="select-wrapper" v-model="form.parkingSpace" v-else>
						<el-option :label="item.areaNumber" class="option-wrapper" :value="item.areaId" v-for="item of parkingSpaceList">
							<span v-text="item.areaNumber"></span>
							<span>可用 {{item.usableCount}}</span>
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="租期：">
					<el-date-picker v-model="form.leaseTime" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<p class="tips">请确认车主已完成缴费后再点击“确定”</p>
					<el-button type="primary" :disabled="isDisabled" class="ok-btn" @click="forAdd">确定</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>

			<popover name="question" title="车主已付清包月费用了吗？" content="请仔细核对车主是否已付清包月车位的车费。" :popoverModalStatus.sync="popoverModalStatus" v-if="popoverModalStatus">
				<el-button slot="ok" @click="popoverModalStatus = false">还没</el-button>
				<el-button type="primary" slot="cancel" class="ok" @click="add">付清了</el-button>
			</popover>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				disabled: false,
				popoverModalStatus: false,

				form: {
					carNumber: '',
					name: '',
					phone: '',
					company: '',
					parkingPlace: 0,
					leaseTime: '',
					parkingFloor: '',
					parkingNumber: '',
					parkingSpace: ''
				},

				// 区分按号和按区
				type: -1,
				parkingSpaceList: [],
				parkingNumberList: [
					{
						value: 1,
						label: '23号'
					},
					{
						value: 2,
						label: '23号'
					},
					{
						value: 3,
						label: '23号'
					}
				]
			}
		},

		computed: {
			isDisabled() {
				if (this.disabled) {
					return true
				}

				if (this.form.carNumber && this.form.name && this.form.phone && this.form.leaseTime) {
					return false
				}

				return true
			},
			companyList() {
				return this.$store.state.companyList
			}
		},

		created() {
			// 获取园区公司列表
			if (! this.companyList.length) {
				this.$store.commit('setCompanyList')
			}

			this.getFloorList()
		},

		methods: {
			async getFloorList() {
				const params = {
					action: 'ParkingRental.queryFloorParkingInfo'
				}

				const data = await axios.post('/api/field/dispatcher.do', params)

				if (! data) {
					return
				}

				this.parkingNumberList = data.data
			},
			selectChange(value) {
				const floor = this.parkingNumberList.find((item) => item.floorId === value)

				this.type = floor.numberRule

				if (floor.numberRule === 1) {
					this.parkingSpaceList = floor.selectParkingSpaceInfos
					this.form.parkingSpace = this.parkingSpaceList[0].spaceId
				} else {
					this.parkingSpaceList = floor.selectAreaInfos
					this.form.parkingSpace = this.parkingSpaceList[0].areaId
				}
			},
			back() {
				this.$router.back()
			},
			change(e) {
				this.form.phone = e.target.value.replace(/\D/g, '')
				e.target.value = this.form.phone
			},
			forAdd() {
				this.popoverModalStatus = true
			},
			async add() {
				const params = {
					action: 'ParkingRental.addParkingRentalInfo',

					parkingRentalInfo: JSON.stringify({
						carNumber: this.form.carNumber,
						masterName: this.form.name,
						masterPhone: this.form.phone,
						rentalId: this.form.company,
						isConfirmed: this.form.parkingPlace,
						startDate: this.form.leaseTime[0],
						endDate: this.form.leaseTime[1],
						floorId: this.form.floorId,
						parkingSpaceId: this.type === 1 ? this.form.parkingSpace : void 1,
						areaId: this.type === 2 ? this.form.parkingSpace : void 1
					})
				}

				this.disabled = true
				this.popoverModalStatus = false

				const data = await axios.post('/api/field/dispatcher.do', params)

				this.disabled = false

				if (! data) {
					return
				}

				location.href = '/parking-lot?type=1'
			}
		}
	}
</script>