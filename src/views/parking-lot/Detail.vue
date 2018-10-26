<style scoped>
#parking-lot-detail-wrapper {
	padding: 24px;
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
#parking-lot-detail-wrapper .btn-relt {
	margin-left: auto;
	margin-right: 20px;
}
#parking-lot-detail-wrapper .btn-edit {
	margin-left: 0;
	margin-right: 20px;
}
.btn-throw-lease {
	color: red;
	background-color: #EEE;
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
	<div id="parking-lot-detail-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">车位租赁</el-breadcrumb-item>
			<el-breadcrumb-item>包月车辆详情</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<div class="btn-wrapper">
				<el-button @click="back">返回</el-button>
				<el-button class="btn-relt">续租</el-button>
				<el-button class="btn-edit">编辑</el-button>

				  <el-popover placement="bottom-end" title="该车主确定退租车位吗？" width="400" trigger="click" content="公司退租后，该公司在园区的信息将被删除。">
    					<el-button slot="reference" class="btn-throw-lease">退租</el-button>

    					<p class="popover-content">车主退租后，该车主在园区的信息将被删除。</p>
    					<div class="popover-btn-wrapper">
    						<el-button size="small">取消</el-button>
							<el-button size="small" class="btn-throw-lease">确定</el-button>
    					</div>
  				</el-popover>
			</div>

			<div class="detail-content">
				<div class="item">
					<span>车牌号：</span>
					<strong v-text="carNumber"></strong>
				</div>
				<div class="item">
					<span>车主姓名：</span>
					<strong>{{name}}</strong>
				</div>
				<div class="item">
					<span>车主号码：</span>
					<strong>{{phone}}</strong>
				</div>
				<div class="item">
					<span>所在单位：</span>
					<strong v-text="company"></strong>
				</div>
				<div class="item">
					<span>到期日期：</span>
					<strong v-text="date"></strong>
				</div>
				<div class="item">
					<span>车位：</span>
					<strong v-text="parkingPlace"></strong>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				carNumber: '浙Aml1223',
				name: '大苏打',
				phone: 18600003333,
				company: '大飒飒大飒飒',
				date: '2018-12-12',
				parkingPlace: '-1层'
			}
		},

		methods: {
			back() {
				this.$router.replace('/lease')
			}
		}
	}
</script>