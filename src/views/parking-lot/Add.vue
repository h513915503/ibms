<style scoped>
#parking-lot-add-wrapper {
	padding: 24px;
}
.container {
	padding: 24px;
	margin-top: 20px;
	box-sizing: border-box;
	background-color: #FFF;
}
.el-input, .el-select {
	width: 354px;
	height: 40px;
}
.lease-list {
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
	margin-left: 200px;
	box-shadow: 0 0 12px 0px rgba(0, 0, 0, .2);
}
</style>
<style>
#parking-lot-add-wrapper .el-form-item__label {
	color: #000;
	font-size: 14px;
	font-weight: bold;
}
</style>

<template>
	<div id="parking-lot-add-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/parking-lot'}">车位租赁</el-breadcrumb-item>
			<el-breadcrumb-item>新增包月车辆</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<el-form ref="form" :model="form" label-width="200px" label-position="right">
				<el-form-item label="车牌号：">
					<el-input v-model="form.carNumber" placeholder="如：浙AMK123"></el-input>
				</el-form-item>
				<el-form-item label="车主姓名：">
					<el-input v-model="form.name" placeholder="与驾照姓名保持一致"></el-input>
				</el-form-item>
				<el-form-item label="车主手机号码：">
					<el-input v-model="form.phone" placeholder="手机号码" maxlength="11"></el-input>
				</el-form-item>
				<el-form-item label="所在单位：">
					<el-select v-model="form.company" placeholder="选择所在单位">
						<el-option v-for="item of companyList" :key="item.id" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车位：">
					<el-radio v-model="form.parkingPlace" :label="0">不固定</el-radio>
					<el-radio v-model="form.parkingPlace" :label="1">固定</el-radio>
				</el-form-item>
				<el-form-item label="停车位置：" v-if="form.parkingPlace === 1">
					<el-input-number v-model="form.parkingFloor" @change="handleChange"></el-input-number>
					<span class="mr">层</span>
					<el-select class="select" v-model="form.parkingNumber" placeholder="请选择">
						<el-option v-for="item of parkingNumberList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>


				<el-form-item label="租期：">
					<ul class="lease-list">
						<li :class="{actived: leaseTime === item}" v-for="item of leaseList" @click="leaseTime = item">{{item}}个月</li>
					</ul>
					 <el-date-picker v-model="form.lease" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<p class="tips">请确认车主已完成缴费后再点击“确定”</p>
					<el-button type="primary" :disabled="! isDisabled" class="ok-btn" @click="popoverModalStatus = true">确定</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>

			<popover title="车主已付清包月费用了吗？" content="请仔细核对车主是否已付清包月车位的车费。" v-if="popoverModalStatus">
				<el-button slot="ok" @click="popoverModalStatus = false">还没</el-button>
				<el-button type="primary" slot="cancel" class="ok" @click="submit">付清了</el-button>
			</popover>
		</div>
	</div>
</template>

<script>
	import popover from '@/components/popover'

	export default {
		data() {
			return {
				popoverModalStatus: false,

				leaseTime: '',

				form: {
					carNumber: '',
					name: '',
					phone: '',
					company: '',
					parkingPlace: 0,
					lease: '',
					parkingFloor: '',
					parkingNumber: '',
				},
				companyList: [
					{
						id: 1,
						label: '大河',
						value: 1
					},
					{
						id: 2,
						label: '大河按时打算',
						value: 2
					},
					{
						id: 3,
						label: '大的说法都是',
						value: 3
					}
				],
				leaseList: [1, 2, 3],
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
				return this.form.carNumber && this.form.name && this.form.phone && this.form.company && this.form.lease
			}
		},

		components: {
			popover
		},

		methods: {
			handleRoomChange() {
				const number = this.form.roomNumber

				if (! number) {
					return
				}

				this.rooms.push(number)

				this.form.roomNumber = ''
			},
			removeRoom(e) {
				const {tagName, dataset: {index}} = e.target

				tagName === 'SPAN' && this.rooms.splice(index, 1)
			},
			submit() {

			}
		}
	}
</script>