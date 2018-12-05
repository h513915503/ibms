<style scoped>
.property-wrapper {
	padding: 24px;
}
.no-data-wrapper {
	padding: 48px 0;
	color: #4A4A4A;
	font-size: 16px;
	text-align: center;
	background-color: #FFF;
}
.title {
	margin-bottom: 48px;
	font-size: 20px;
}
.tips {
	line-height: 2;
}
.tips:last-of-type {
	margin-bottom: 48px;
}
.el-button {
	font-size: inherit;
}
.content {
	padding: 24px;
	background-color: #FFF;
}
.search-wrapper {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;
}
.page-wrapper {
	margin-top: 20px;
	text-align: right;
}
.opt-btn {
	display: inline-block;
	color: #0E7CC2;
	font-size: 12px;
	cursor: pointer;
	margin-right: 10px;
}
.opt-btn.dimission {
	color: #F5222D;
}
</style>

<template>
	<div class="property-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<div class="no-data-wrapper" v-if="noData">
				<h1 class="title">暂无物业人员</h1>
				<p class="tips">您还没有维护物业人员信息，</p>
				<p class="tips">点击下方【+ 物业人员】按钮添加新的物业人员。</p>
				<el-button type="primary" @click="addProperty">+ 物业人员</el-button>
			</div>

			<div class="content" v-else>
				<div class="search-wrapper">
					<el-button type="primary" @click="addProperty">+ 物业人员</el-button>
				</div>

				<el-table :data="list" @sort-change="sortChange" @filter-change="filterHandler">
					<el-table-column prop="accountId" label="物业人员编号"></el-table-column>
					<el-table-column prop="accountName" label="姓名"></el-table-column>
					<el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
					<el-table-column label="岗位">
						<template slot-scope="scope">
							<ul>
								<li v-text="item" v-for="item of scope.row.postNameArray"></li>
							</ul>
						</template>
					</el-table-column>

					<el-table-column prop="status" label="状态" :filter-multiple="false" column-key="status" :filters="filtersArray"></el-table-column>

					<el-table-column label="入职时间" prop="hireDate" sortable='custom'></el-table-column>

					<el-table-column label="离职时间" prop="termDate" sortable='custom'>
						<template slot-scope="scope">
							<span v-if="scope.row.termDate">{{scope.row.termDate}}</span>
							<span v-else>暂未离职</span>
						</template>
					</el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<div class="opt-btn" type="text" size="small" @click="goEdit(scope.row)">编辑</div>
							<div class="opt-btn dimission" type="text" size="small" @click="forLeaveOffice($event, scope.row, scope.$index)">离职</div>
						</template>
					</el-table-column>
				</el-table>

				<div class="page-wrapper">
					<el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange"></el-pagination>
				</div>
			</div>
		</template>

		<popover name="close" title="该员工确定离职了么？" content="将该员工设为离职之后，该员工的账号将被注销。" :follow-target="followTarget" v-if="popoverModalStatus" @hide="popoverModalStatus = false">
			<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
			<el-button type="primary" slot="cancel" @click="leaveOffice">确定</el-button>
		</popover>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				loading: false,
				loaded: false,

				page: 1,
				pageTotal: 1,
				list: [],

				filtersArray: [
					{
						text: '在职',
						value: 0
					},
					{
						text: '离职',
						value: 1
					}
				],

				followTarget: null,
				popoverModalStatus: false
			}
		},

		computed: {
			noData() {
				return this.loaded && ! this.list.length
			}
		},

		created() {
			this.loading = true

			this.getList().then(() => {
				this.loaded = true
				this.loading = false
			})
		},

		methods: {
			addProperty() {
				this.$router.push('/property/add')
			},
			filterHandler(filter) {
				this.$status = filter.status[0]

				this.getList()
			},
			sortChange(column) {
				this.$rank = column.prop
				this.$order = column.order === 'ascending' ? '0' : column.order === 'descending' ? '1' : ''

				this.getList()
			},
			async getList() {
				const params = {
					action: 'administrator.getPmoInfo',
					pageNo: this.page,
					rank: this.$rank,
					order: this.$order,
					status: this.$status
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				const {total, accountInfoResList} = data.data

				this.pageTotal = total
				this.list = accountInfoResList
			},
			pageChange(value) {
				this.page = value
				this.getList()
			},
			goEdit(item) {
				this.$router.push(`/property/edit/${item.accountId}`)
			},
			forLeaveOffice(e, item, index) {
				this.$item = item
				this.$index = index
				this.popoverModalStatus = true

				this.followTarget = e.target
			},
			async leaveOffice() {
				const {accountId, accountName} = this.$item
				const params = {
					action: 'administrator.dimissionOpreate',
					pmoId: accountId,
					name: accountName
				}

				this.popoverModalStatus = false

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.list.splice(this.$index, 1)

				// 释放内存
				this.$index = null
				this.$item = null
			}
		}
	}
</script>
