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
.popover-wrapper {
	left: 220px;
	bottom: -150px;
	box-shadow: 0 0 12px 0px rgba(0, 0, 0, .2);
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
			<parking-lot-add @ok="ok"></parking-lot-add>

			<popover name="question" title="车主已付清包月费用了吗？" content="请仔细核对车主是否已付清包月车位的车费。" :popoverModalStatus.sync="popoverModalStatus">
				<el-button slot="ok" @click="popoverModalStatus = false">还没</el-button>
				<el-button type="primary" slot="cancel" class="ok" @click="submit">付清了</el-button>
			</popover>
		</div>
	</div>
</template>

<script>
	import parkingLotAdd from '@/components/parking-lot/Add'

	export default {
		data() {
			return {
				popoverModalStatus: false
			}
		},

		components: {
			parkingLotAdd
		},

		methods: {
			ok() {
				this.popoverModalStatus = true
			},
			submit() {

			}
		}
	}
</script>