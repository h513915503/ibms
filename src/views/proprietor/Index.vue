<style scoped>
#proprietor-wrapper {
	min-width: 1000px;
}
.container {
	padding: 24px;
	box-sizing: border-box;
	background-color: #FFF;
}
.search-wrapper {
	display: flex;
	margin-bottom: 40px;
}
.search-input {
	width: 336px;
	height: 32px;
	margin-left: auto;
}
.calendar-label {
	display: flex;
	align-items: center;
	margin-right: 20px;

	& span {
		flex-shrink: 0;
		margin-right: 10px;
	}
}
.job-status, .face-info-status {
	display: flex;
	align-items: center;

	&::before {
		content: "";
		width: 6px;
		height: 6px;
		margin-right: 10px;
		border-radius: 50%;
		background-color: green;
	}
}
.job-status.dimission::before {
	background-color: #CCC;
}
.face-info-status::before {
	background-color: #CCC;
}
.face-info-status.no::before {
	background-color: red;
}
.face-info-status.na::before {
	display: none;
}
.page-wrapper {
	margin-top: 20px;
	text-align: right;
}
.el-button.dimission {
	color: red;
}
</style>

<template>
	<div id="proprietor-wrapper">
		<tab-bar :list="tabs"></tab-bar>

		<div class="container">
			<div class="search-wrapper">
				<el-button type="primary" @click="go">+业主</el-button>
				<el-button @click="go">批量导入</el-button>
				<el-input class="search-input" v-model="number" placeholder="业主姓名/手机号码/所在单位">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</div>

			<el-table :data="carList" @click.native="handleTable">
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="number" label="序号"></el-table-column>
				<el-table-column prop="name" label="业主姓名"></el-table-column>
				<el-table-column prop="phone" label="业主手机号码"></el-table-column>
				<el-table-column prop="company" label="所在单位" width="320"></el-table-column>
				<el-table-column label="状态" sortable>
					<template slot-scope="scope">
						<span class="job-status dimission" v-if="scope.row.status === 0">离职</span>
						<span class="job-status" v-else>在职</span>
			    	</template>
				</el-table-column>
				<el-table-column label="人脸信息" sortable>
					<template slot-scope="scope">
						<span class="face-info-status no" v-if="scope.row.faceInfo === 0">未采集</span>
						<span class="face-info-status" v-else-if="scope.row.faceInfo === 1">已采集</span>
						<span class="face-info-status na" v-else>——</span>
			    	</template>
				</el-table-column>
				<el-table-column label="离职日期" sortable>
					<template slot-scope="scope">
						<span v-text="scope.row.time" v-if="scope.row.time"></span>
						<span v-else>——</span>
			    	</template>
				</el-table-column>
				<el-table-column label="操作">
		  			<template slot-scope="scope">
				        <el-button type="text" size="small">编辑</el-button>
				        <el-button type="text dimission" size="small" data-type="1">离职</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<div class="page-wrapper">
				<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'

	export default {
		data() {
			return {
				tabs: [
					{
						number: 1000,
						text: '入驻单位'
					},
					{
						number: 1000,
						text: '业主总人数'
					},
					{
						number: 1000,
						text: '已采集人脸信息'
					},
					{
						number: 1000,
						text: '未采集人脸信息'
					}
				],

				date: '',
				number: '',

				carList: [
					{
						number: '12',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						status: 0,
						faceInfo: 0,
						time: '2018-12-12'
					},
					{
						number: '12',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						status: 1,
						faceInfo: 1,
						time: ''
					},
					{
						number: '12',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						status: 1,
						faceInfo: 1,
						time: ''
					},
					{
						number: '12',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						status: 0,
						faceInfo: 0,
						time: '2018-12-12'
					},
					{
						number: '12',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						status: 0,
						faceInfo: 2,
						time: '2018-12-12'
					},

				]
			}
		},

		components: {
			tabBar
		},

		methods: {
			go() {
				this.$router.push('/parking-lot/add')
			},
			handleTable(e) {
				let target = e.target

				while (target.dataset && ! target.dataset.type) {
					target = target.parentNode
				}

				if (! target.dataset) {
					return
				}

				const {type} = target.dataset

				if (+ type === 1) {
					this.$router.push(`/parking-lot/detail/${100}`)
				}
			},
			redirec(e) {
				let target = e.target

				while (! target.dataset.id) {
					target = target.parentNode
				}

				this.$router.push(`/lease/detail/${target.dataset.id}`)
			}
		}
	}
</script>