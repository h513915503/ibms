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
	align-items: center;
	margin-bottom: 40px;
}
.time {
	margin-right: 10px;
	margin-left: auto;
}
.separator {
	margin: 0 8px;
}
.search-input {
	width: 128px;
	margin-left: 24px;
}
.btn-search {
	margin-left: 24px;
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
		<loading v-if="loading"></loading>

		<template v-else>
			<tab-bar :list="tabs"></tab-bar>

			<div class="container">
				<div class="search-wrapper">
					<el-button type="primary" @click="go">+业主</el-button>
					<el-button @click="go">批量导入</el-button>

					<span class="time">在职时间：</span>
					<el-date-picker type="date" placeholder="开始日期" v-model="startDate"></el-date-picker>
					<span class="separator">-</span>
					<el-date-picker type="date" placeholder="结束日期" v-model="endDate"></el-date-picker>
					<el-input class="search-input" v-model="account" placeholder="姓名/手机号码">
						<!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
					</el-input>
					<el-button class="btn-search" type="primary" @click="go">查询</el-button>
				</div>

				<el-table :data="carList" @click.native="handleTable">
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="id" label="序号"></el-table-column>
					<el-table-column prop="acountName" label="业主姓名"></el-table-column>
					<el-table-column prop="phoneNumber" label="业主手机号码"></el-table-column>
					<el-table-column prop="rentalCompany" label="所在单位"></el-table-column>
					<el-table-column label="状态" sortable>
						<template slot-scope="scope">
							<span class="job-status dimission" v-if="scope.row.jobStatus === 2">离职</span>
							<span class="job-status" v-else>在职</span>
				    	</template>
					</el-table-column>
					<el-table-column label="人脸信息" sortable>
						<template slot-scope="scope">
							<span class="face-info-status no" v-if="scope.row.facialStatus === 0">未采集</span>
							<span class="face-info-status" v-else-if="scope.row.facialStatus === 1">已采集</span>
							<span class="face-info-status na" v-else>——</span>
				    	</template>
					</el-table-column>
					<el-table-column label="离职日期" sortable>
						<template slot-scope="scope">
							<span v-text="scope.row.departureDate" v-if="scope.row.departureDate"></span>
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
					<el-pagination background layout="prev, pager, next" :total="totalPage" @current-change="pageChange"></el-pagination>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'

	export default {
		data() {
			return {
				loading: false,

				tabs: [
					{
						number: 0,
						text: '入驻单位'
					},
					{
						number: 0,
						text: '业主总人数'
					},
					{
						number: 0,
						text: '已采集人脸信息'
					},
					{
						number: 0,
						text: '未采集人脸信息'
					}
				],

				startDate: '',
				endDate: '',
				account: '',

				page: 1,
				totalPage: 1,
				carList: []
			}
		},

		components: {
			tabBar
		},

		created() {
			this.loading = true

			Promise.all([this.getData(), this.getList()]).then(() => {
				this.loading = false
			})
		},

		methods: {
			go() {
				this.$router.push('/parking-lot/add')
			},
			async getData() {
				const params = {
					action: 'accountManagement.queryYZCount'
				}

				let data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				const {rzCount, yzCount, ycjCount, wcjCount} = data.data

				this.tabs[0].number = rzCount
				this.tabs[1].number = yzCount
				this.tabs[2].number = ycjCount
				this.tabs[3].number = wcjCount
			},
			async getList() {
				const params = {
					action: 'accountManagement.queryAccountManagementPage',
					pageNum: this.page,
					type: '业主',
					pageSize: 8
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.totalPage = data.data.total
				this.carList = data.data.list
			},
			pageChange(value) {
				log(value)
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