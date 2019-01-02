<style scoped>
.parking-lot-detail-wrapper {
	padding: 24px;
	position: relative;

	& .popover-wrapper {
		right: 48px;
		top: 140px;
	}

	& .throw-lease-wrapper {
		right: 240px;
		top: 140px;
	}
}
.container {
	padding: 24px;
	margin-top: 20px;
	box-sizing: border-box;
	background-color: #FFF;

	& .btn-relt {
		margin-left: auto;
		margin-right: 20px;
	}

	& .btn-edit {
		margin-left: 0;
		margin-right: 20px;
	}
}
.btn-wrapper {
	display: flex;
	margin-bottom: 32px;
}
.btn-throw-lease {
	color: red;
	background-color: rgba(0, 0, 0, .04);
}
.item {
	margin-bottom: 40px;
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

.el-popover {
	padding: 24px;
}
.popover-content {
	margin-bottom: 45px;
	color: #999;
	font-size: 14px;
}
.popover-btn-wrapper {
	text-align: right;
}
</style>

<template>
	<div class="parking-lot-detail-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">车位租赁</el-breadcrumb-item>
			<el-breadcrumb-item>包月车辆详情</el-breadcrumb-item>
		</el-breadcrumb>

		<loading v-if="loading"></loading>
		<div class="container" v-else>
			<div class="btn-wrapper">
				<el-button @click="back">返回</el-button>

				<el-button class="btn-relt" @click="throwLeaseModalStatus = true">续租</el-button>
				<el-button class="btn-edit" @click="goEdit">编辑</el-button>
				<el-button slot="reference" class="btn-throw-lease" @click="popoverModalStatus = true">退租</el-button>

				<popover name="close" title="该车主确定退租车位吗？" content="公司退租后，该公司在园区的信息将被删除。" :popoverModalStatus.sync="popoverModalStatus" v-if="popoverModalStatus">
					<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
					<el-button type="primary" slot="cancel" class="ok" @click="throwLease">确定</el-button>
				</popover>
			</div>

			<div class="detail-content">
				<div class="item">
					<span>车牌号：</span>
					<strong v-text="detail.carNumber"></strong>
				</div>
				<div class="item">
					<span>车主姓名：</span>
					<strong>{{detail.masterName}}</strong>
				</div>
				<div class="item">
					<span>车主号码：</span>
					<strong>{{detail.masterPhone}}</strong>
				</div>
				<div class="item">
					<span>所在单位：</span>
					<strong v-text="detail.masterCompany"></strong>
				</div>
				<div class="item">
					<span>到期日期：</span>
					<strong>{{detail.endDate | format}}</strong>
				</div>
				<div class="item">
					<span>车位：</span>
					<strong>{{detail.floorNumber}}层·{{detail.isConfirmed === 1 ? detail.parkingSpaceNumber + '号' : detail.parkingAreaNumber}}</strong>
				</div>
			</div>
		</div>

		<parking-lot-throw-lease :id="$route.params.id" :throwLeaseModalStatus.sync="throwLeaseModalStatus" v-if="throwLeaseModalStatus"></parking-lot-throw-lease>
	</div>
</template>

<script>
	import {dateFormatString} from '@/utils/util'
	import parkingLotThrowLease from '@/components/parking-lot/throw-lease'

	export default {
		data() {
			return {
				loading: false,
				popoverModalStatus: false,
				throwLeaseModalStatus: false,

				detail: {}
			}
		},

		components: {
			parkingLotThrowLease
		},

		filters: {
			format(value) {
				return dateFormatString(new Date(value))
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

				const data = await axios.post('/api/field/dispatcher.do', params)

				if (! data) {
					return
				}

				this.detail = data.data
			},
			back() {
				this.$router.back()
			},
			goEdit() {
				this.$router.push(`/parking-lot/edit/${this.$route.params.id}`)
			},
			cancel() {
				this.index = 0
			},
			async throwLease() {
				const params = {
					action: 'ParkingRental.deleteParkingRentalInfo',
					parkingRentalId: this.$route.params.id
				}

				this.popoverModalStatus = false

				const data = await axios.post('/api/field/dispatcher.do', params)

				if (! data) {
					return
				}

				this.$message.success('退租成功')
				this.back()
			}
		}
	}
</script>