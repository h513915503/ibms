<style scoped>
#parking-lot-add-wrapper {
	padding: 24px;
}
.container {
	padding: 24px;
	margin-top: 20px;
	position: relative;
	box-sizing: border-box;
	background-color: #FFF;
}

/* .lease-list {
	display: flex;
	margin-bottom: 20px;

	& li {
		width: 80px;
		margin-right: 15px;
		line-height: 40px;
		cursor: pointer;
		text-align: center;
		border-radius: 4px;
		border: 1px solid #D9D9D9;
		background-color: #F5F5F5;
	}

	& li.actived {
		border-color: #91D5FF;
		background-color: #E6F7FF;
	}
} */
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

.popover-wrapper {
	left: 220px;
	bottom: -150px;
	box-shadow: 0 0 12px 0px rgba(0, 0, 0, .2);
}
</style>

<template>
	<div id="parking-lot-add-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/parking-lot'}">车位租赁</el-breadcrumb-item>
			<el-breadcrumb-item>编辑包月车辆</el-breadcrumb-item>
		</el-breadcrumb>

		<loading v-if="loading"></loading>
		<div class="container" v-else>
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
					<el-input-number v-model="form.parkingFloor" @change="handleParkingFloorChange"></el-input-number>
					<span class="mr">层</span>
					<el-select class="select" v-model="form.parkingNumber" placeholder="请选择">
						<el-option v-for="item of parkingNumberList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
	import {dateFormatString} from '@/utils/util'

	export default {
		data() {
			return {
				loading: false,
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
				},
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
			this.loading = true

			this.getDetail().then(() => {
				this.loading = false
			})
		},

		methods: {
			async getDetail() {
				const params = {
					action: 'ParkingRental.queryRentalById',
					parkingRentalId: this.$route.params.id
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				const {carNumber, rentalId, masterName, masterPhone, isConfirmed, startDate, endDate} = data.data

				this.form.carNumber = carNumber
				this.form.name = masterName
				this.form.phone = masterPhone
				this.form.company = rentalId
				this.form.parkingPlace = isConfirmed

				this.form.leaseTime = [dateFormatString(new Date(startDate)), dateFormatString(new Date(endDate))]
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
			formatDate() {
				if (typeof this.form.leaseTime[0] === 'number') {
					this.form.leaseTime = [dateFormatString(new Date(this.form.leaseTime[0])), dateFormatString(new Date(this.form.leaseTime[1]))]
				}
			},
			async add() {
				// 时间可能是 timestamp
				this.formatDate()

				const params = {
					action: 'ParkingRental.editParkingRentalInfo',

					parkingRentalInfo: JSON.stringify({
						id: this.$route.params.id,
						carNumber: this.form.carNumber,
						masterName: this.form.name,
						masterPhone: this.form.phone,
						rentalId: this.form.company,
						isConfirmed: this.form.parkingPlace,
						startDate: this.form.leaseTime[0],
						endDate: this.form.leaseTime[1]
					})
				}

				this.disabled = true
				this.popoverModalStatus = false

				const data = await axios.post('/api/dispatcher.do', params)

				this.disabled = false

				if (! data) {
					return
				}

				location.href = '/parking-lot?type=1'
			}
		}
	}
</script>