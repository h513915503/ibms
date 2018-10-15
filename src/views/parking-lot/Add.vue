<style scoped>
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
		padding: 0 15px;
		margin-right: 15px;
		line-height: 40px;
		cursor: pointer;
		background-color: #EEE;
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
</style>
<style>
#parking-lot-add .el-form-item__label {
	color: #000;
	font-size: 16px;
	font-weight: bold;
}
</style>

<template>
	<div id="parking-lot-add">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/parking-lot'}">车位租赁</el-breadcrumb-item>
			<el-breadcrumb-item>新增包月车辆</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="车牌号：">
					<el-input v-model="form.carNumber" placeholder="如：浙AMK123"></el-input>
				</el-form-item>
				<el-form-item label="车主姓名：">
					<el-input v-model="form.name" placeholder="与驾照姓名保持一致"></el-input>
				</el-form-item>
				<el-form-item label="车主手机号码：">
					<el-input v-model="form.phone" placeholder="手机号码"></el-input>
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


				<el-form-item label="租期：">
					<ul class="lease-list">
						<li v-for="item of leaseList">{{item}}个月</li>
					</ul>
					 <el-date-picker v-model="form.lease" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<p class="tips">请确认车主已完成缴费后再点击“确定”</p>
					<el-button :class="{disabled: ! isDisabled}" type="primary" @click="submit">确定</el-button>
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
					carNumber: '',
					name: '',
					phone: '',
					company: '',
					parkingPlace: 0,
					lease: '',
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
				leaseList: [1, 2, 3]
			}
		},

		computed: {
			isDisabled() {
				return this.form.carNumber && this.form.name && this.form.phone && this.form.company && this.form.lease
			}
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