<style scoped>
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
#lease-detail-wrapper .btn-edit {
	margin-left: auto;
	margin-right: 24px;
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
	<div id="lease-detail-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">办公租赁</el-breadcrumb-item>
			<el-breadcrumb-item>入住单位详情</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<div class="btn-wrapper">
				<el-button @click="back">返回</el-button>
				<el-button class="btn-edit">编辑</el-button>

				  <el-popover placement="bottom-end" title="该公司确定退租了吗？" width="400" trigger="click" content="公司退租后，该公司在园区的信息将被删除。">
    					<el-button slot="reference" class="btn-throw-lease">退租</el-button>

    					<p class="popover-content">公司退租后，该公司在园区的信息将被删除。</p>
    					<div class="popover-btn-wrapper">
    						<el-button size="small">取消</el-button>
							<el-button size="small" class="btn-throw-lease">确定</el-button>
    					</div>
  				</el-popover>
			</div>

			<div class="detail-content">
				<div class="item">
					<span>租赁单位：</span>
					<strong v-text="leaseCompany"></strong>
				</div>
				<div class="item">
					<span>租赁房间：</span>
					<strong>{{roomNumberStart}} - {{roomNumberEnd}}</strong>
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
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leaseCompany: '韩国鍟化贸易有限公司绍兴代表处',
				roomNumberStart: '101',
				roomNumberEnd: '120',
				dateStart: '2018-12-08',
				dateEnd: '2018-12-30',
				propertyPerson: '打打阿达',
				propertyPersonPhone: 18600009999,
				hr: '啊时代发生',
				hrPhone: 18633336666
			}
		},

		methods: {
			back() {
				this.$router.replace('/lease')
			}
		}
	}
</script>