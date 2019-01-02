<style scoped>
.lease-detail-wrapper {
	padding: 24px;
	position: relative;

	& .btn-edit {
		margin-left: auto;
		margin-right: 14px;
	}
}
.container {
	padding: 24px;
	margin-top: 20px;
	box-sizing: border-box;
	background-color: #FFF;
}
.btn-wrapper {
	display: flex;
	margin-bottom: 32px;
}
.btn-throw-lease, .ok {
	color: #F5222D;
	border-color: #D9D9D9;
	background-color: rgba(0, 0, 0, .04);
}
.item {
	margin-bottom: 30px;
	color: #919191;
	font-size: 16px;

	& span {
		display: inline-block;
		width: 200px;
		margin-right: 15px;
		text-align: right;
	}
}
strong {
	color: #000;
}
.popover-wrapper {
	top: 140px;
	right: 50px;
}
</style>

<template>
	<div class="lease-detail-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">办公租赁</el-breadcrumb-item>
			<el-breadcrumb-item>入驻单位详情</el-breadcrumb-item>
		</el-breadcrumb>

		<loading v-if="loading"></loading>
		<div class="container" v-else>
			<div class="btn-wrapper">
				<el-button @click="back">返回</el-button>
				<el-button class="btn-edit" @click="goEdit">编辑</el-button>
				<el-button slot="reference" :disabled="disabled" class="btn-throw-lease" @click="popoverModalStatus = true">退租</el-button>
			</div>

			<popover name="close" title="该公司确定退租了吗？" content="公司退租后，该公司在园区的信息将被删除。" :popoverModalStatus.sync="popoverModalStatus" v-if="popoverModalStatus">
				<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
				<el-button type="primary" slot="cancel" class="ok" @click="throwLease">确定</el-button>
			</popover>

			<template>
				<div class="detail-content">
					<div class="item">
						<span>租赁楼层：</span>
						<strong v-text="floorNumberString"></strong>
					</div>
					<div class="item">
						<span>租赁总面积：</span>
						<strong>{{totalArea}}㎡</strong>
					</div>
					<div class="item">
						<span>租赁单位：</span>
						<strong v-text="leaseCompany"></strong>
					</div>
					<div class="item">
						<span>租赁起止日期：</span>
						<strong>{{dateStart}} - {{dateEnd}}</strong>
					</div>
					<div class="item">
						<span>单位物业负责人：</span>
						<strong v-text="propertyPerson"></strong>
					</div>
					<div class="item">
						<span>单位物业负责人联系号码：</span>
						<strong v-text="propertyPersonPhone"></strong>
					</div>
					<div class="item">
						<span>单位人事负责人：</span>
						<strong v-text="hr"></strong>
					</div>
					<div class="item">
						<span>单位人事负责人联系号码：</span>
						<strong v-text="hrPhone"></strong>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				disabled: false,

				popoverModalStatus: false,

				leaseCompany: '',
				totalArea: '',
				floorNumberString: '',
				dateStart: '',
				dateEnd: '',
				propertyPerson: '',
				propertyPersonPhone: '',
				hr: '',
				hrPhone: ''
			}
		},

		created() {
			this.getDetail()
		},

		methods: {
			async getDetail() {
				const params = {
					action: 'OfficeRental.queryRentalInfo',
					rentalId: this.$route.params.id
				}

				this.loading = true

				const data = await axios.post('/api/field/dispatcher.do', params)

				this.loading = false

				if (! data) {
					return
				}

				const {rentalCompany, propertyName, propertyPhone, personnelName, personnelPhone, rentalFloorInfos} = data.data

				this.leaseCompany = rentalCompany
				this.propertyPerson = propertyName
				this.propertyPersonPhone = propertyPhone
				this.hr = personnelName
				this.hrPhone = personnelPhone

				const dateStart = new Date(rentalFloorInfos[0].startDate)
				this.dateStart = `${dateStart.getFullYear()}/${dateStart.getMonth() + 1}/${dateStart.getDate()}`.replace(/\b(\w)\b/, '0$1')

				const dateEnd = new Date(rentalFloorInfos[0].endDate)
				this.dateEnd = `${dateEnd.getFullYear()}/${dateEnd.getMonth() + 1}/${dateEnd.getDate()}`.replace(/\b(\w)\b/, '0$1')

				this.totalArea = rentalFloorInfos.reduce((prev, next) => {
					return prev + next.rentedSize
				}, 0)

				this.floorNumberString = rentalFloorInfos.map((item) => {
					return `${item.floorNumber}层-${item.houseNumber}-${item.rentedSize}㎡`
				}).join('、')
			},
			back() {
				this.$router.back()
			},
			async throwLease() {
				const params = {
					action: 'OfficeRental.deleteRentalInfo',
					rentalId: this.$route.params.id
				}

				this.disabled = true
				this.popoverModalStatus = false

				const data = await axios.post('/api/field/dispatcher.do', params)

				this.disabled = false

				if (! data) {
					return
				}

				this.$message.success('退租成功')
				this.$router.back()
			},
			goEdit() {
				this.$router.push(`/lease/edit/${this.$route.params.id}`)
			}
		}
	}
</script>