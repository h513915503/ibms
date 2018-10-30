<style scoped>
#lease-detail-wrapper {
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
	<div id="lease-detail-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">办公租赁</el-breadcrumb-item>
			<el-breadcrumb-item>入驻单位详情</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<div class="btn-wrapper">
				<el-button @click="back">返回</el-button>
				<el-button class="btn-edit" @click="index = 1">编辑</el-button>
				<el-button slot="reference" class="btn-throw-lease" @click="popoverModalStatus = true">退租</el-button>
			</div>

			<popover name="close" title="该公司确定退租了吗？" content="公司退租后，该公司在园区的信息将被删除。" :popoverModalStatus.sync="popoverModalStatus">
				<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
				<el-button type="primary" slot="cancel" class="ok" @click="throwLease">确定</el-button>
			</popover>

			<template v-if="loading">
				<loading></loading>
			</template>
			<template v-else>
				<div class="detail-content" v-if="index === 0">
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

				<lease-add :type="1" @cancel="cancel" @complete="complete" v-else></lease-add>
			</template>
		</div>
	</div>
</template>

<script>
	import getResponses from '@/api'
	import leaseAdd from '@/components/lease/Add'

	export default {
		data() {
			return {
				loading: false,

				index: 0,

				visible: false,

				popoverModalStatus: false,

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

		components: {
			leaseAdd
		},

		created() {
			this.getDetail()
		},

		methods: {
			async getDetail() {
				const params = {
					id: this.$route.params.id
				}

				this.loading = true

				const data = await getResponses('/api/getDetail', params)

				this.loading = false

				if (! data) {
					return
				}

				//this.detail = data.data
			},
			cancel() {
				this.index = 0
			},
			complete() {

			},
			back() {
				this.$router.replace('/lease')
			},
			throwLease() {
				this.popoverModalStatus = false
			}
		}
	}
</script>