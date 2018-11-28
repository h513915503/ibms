<style scoped>
#proprietor-wrapper {
	min-width: 1000px;
}
.container {
	padding: 24px;
	position: relative;
	box-sizing: border-box;
	background-color: #FFF;

	& .popover-wrapper {
		left: calc(100% - 585px);
	}
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
.table .btn {
	font-size: 12px;
	cursor: pointer;
}
.edit {
	margin-right: 12px;
	color: #0E7CC2;
}
.page-wrapper {
	margin-top: 20px;
	text-align: right;
}
.dimission {
	color: #F5222D;
}
.lead-in input {
	display: none;
}
.outJob {
	/* pointer-events: none; */
	/* color: #CCC; */
	display: none;
}
.detail {
	display: none;
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
					<el-button class="lead-in" @click="leadIn">
						<input type="file" ref="input" @change="change">
						批量导入
					</el-button>

					<span class="time">在职时间：</span>
					<el-date-picker type="date" placeholder="开始日期" v-model="startDate"></el-date-picker>
					<span class="separator">-</span>
					<el-date-picker type="date" placeholder="结束日期" v-model="endDate"></el-date-picker>
					<el-input class="search-input" v-model="account" placeholder="姓名/手机号码"></el-input>
					<el-button class="btn-search" type="primary" @click="search">查询</el-button>
				</div>

				<toolBar :allData="batchImportData" :status.sync="toolBarStatus" :timeText="timeText"></toolBar>
				<el-table class="table" :data="carList" @click.native="handleTable" @sort-change="sortChange" @filter-change="filterHandler">
					<!-- <el-table-column type="selection"></el-table-column> -->
					<el-table-column prop="id" label="序号"></el-table-column>
					<el-table-column prop="acountName" label="业主姓名"></el-table-column>
					<el-table-column prop="phoneNumber" label="业主手机号码"></el-table-column>
					<el-table-column prop="rentalCompany" label="所在单位" width="300" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column
						label="状态"
						column-key="jobStatus"
						:filter-multiple="false"
						prop="jobStatus"
						:filters="[{text: '在职', value: '3'}, {text: '离职', value: '2'}]"
					>
						<template slot-scope="scope">
							<span class="job-status dimission" v-if="scope.row.jobStatus === 2">离职</span>
							<span class="job-status" v-else>在职</span>
				    	</template>
					</el-table-column>
					<el-table-column
						label="人脸信息"
						column-key="facialStatus"
						:filter-multiple="false"
                        prop="facialStatus"
						:filters="[{text: '已采集', value: '1'}, {text: '未采集', value: '0'}]"
					>
						<template slot-scope="scope">
							<span class="face-info-status no" v-if="scope.row.facialStatus === 0">未采集</span>
							<span class="face-info-status" v-else-if="scope.row.facialStatus === 1">已采集</span>
							<span class="face-info-status na" v-else>——</span>
				    	</template>
					</el-table-column>
					<el-table-column label="离职日期" width="120" sortable>
						<template slot-scope="scope">
							<span v-if="scope.row.departureDateTamp">{{scope.row.departureDateTamp | format}}</span>
							<span v-else>——</span>
				    	</template>
					</el-table-column>
					<el-table-column label="操作">
			  			<template slot-scope="scope">
					        <span :class="{outJob: scope.row.jobStatus === 2}" class="btn edit" type="text" size="small" data-type="1" :data-id="scope.row.id" :data-index="scope.$index">编辑</span>
							<span :class="{detail: scope.row.jobStatus !== 2}" class="btn edit" type="text" size="small" data-type="3" :data-id="scope.row.id" :data-index="scope.$index">查看</span>
					        <span :class="{outJob: scope.row.jobStatus === 2}" class="btn dimission" type="text" size="small" data-type="2" :data-id="scope.row.id" :data-index="scope.$index">离职</span>
				      </template>
				    </el-table-column>
				</el-table>

				<div class="page-wrapper">
					<el-pagination background layout="prev, pager, next" :total="totalPage" @current-change="pageChange"></el-pagination>
				</div>

				<popover name="close" title="该员工确定离职了么？" content="将该员工设为离职之后，该员工将不能通过人脸识别进入园区。" v-if="popoverModalStatus === true" :style="{top: 185 + (currentColumnIndex * 57) + 'px'}" :popoverModalStatus.sync="popoverModalStatus">
					<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
					<el-button type="primary" slot="cancel" class="ok" @click="leaveOffice">确定</el-button>
				</popover>
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

				timeText: '10秒后关闭',

				currentColumnIndex: -1,
				popoverModalStatus: false,

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
				carList: [],
				orderBy: '',
				facialStatus: '',
				jobStatus: '',

				batchImportData: {},
				toolBarStatus: false
			}
		},

		components: {
			tabBar
		},

		filters: {
			format(value) {
				const date = new Date(value)

				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
			}
		},

		created() {
			this.loading = true

			Promise.all([this.getData(), this.getList()]).then(() => {
				this.loading = false
			})
		},

		destroyed() {
			clearTimeout(this.$timer)
		},

		methods: {
			timeBack() {
				let num = 10
				
				this.timeText = `${num}秒后自动关闭`

				this.$timer = setTimeout(function go() {
					this.timeText = `${--num}秒后自动关闭`

					if (! num) {
						this.toolBarStatus = false
					}

					this.$timer = setTimeout(go.bind(this), 1000)
				}.bind(this), 1000)

            },
			go() {
				this.$router.push('/proprietor/add')
			},
			filterHandler(filter) {
				for (let key in filter) {
					this[key] = filter[key][0]
				}
                this.getList()
            },
			sortChange(colum) {
                const order = colum.order === 'ascending' ? 'departure_date-asc' : colum.order === 'descending' ? 'departure_date-desc' : ''
                this.orderBy = order
                this.getList();
            },
			async leadIn() {
				this.$refs.input.click()
			},
			async change(e) {
				const formdata = new FormData()

				formdata.append('action', 'accountManagement.batchImport')
				formdata.append('file', e.target.files[0])

				const data = await axios.post('/api/dispatcher.do', formdata, {
					headers: {'Content-Type': 'multipart/form-data'}
				})

				if (data) {
					this.toolBarStatus = true
					this.batchImportData = data.data
					this.timeBack()
				} else {
					return
				}
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
					type: '业主',
					action: 'accountManagement.queryAccountManagementPage',
					pageNo: this.page
				}

				if (this.startDate) {
					params.fromTimeYZStr = + this.startDate
				}

				if (this.endDate) {
					params.fromTimeYZStr = + this.endDate
				}

				if (this.account) {
					params.userNameOrPhone = this.account
				}

				if (this.orderBy) {
					params.orderBy = this.orderBy
				}

				if(this.facialStatus) {
					params.facialStatus = this.facialStatus
				}

				if(this.jobStatus) {
					params.jobStatus = this.jobStatus
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.totalPage = data.data.total
				this.carList = data.data.list
			},
			async search() {
				if (this.$flag) {
					return
				}

				this.$flag = true

				await this.getList()

				this.$flag = null
			},
			pageChange(value) {
				this.page = value
				this.getList()
			},
			handleTable(e) {
				let target = e.target

				while (target.dataset && ! target.dataset.type) {
					target = target.parentNode
				}

				if (! target.dataset) {
					return
				}

				const {id, type, index} = target.dataset

				if (+ type === 1) {
					this.$root.$tempEditData = this.carList[index]
					this.$router.push(`/proprietor/edit/${id}`)

					return
				}

				if (+ type === 3) {
					this.$root.$tempEditData = this.carList[index]
					this.$router.push(`/proprietor/detail/${id}`)
				}

				if (+ type === 2) {
					this.$currentId = id
					this.currentColumnIndex = + index
					this.popoverModalStatus = true
				}
			},
			async leaveOffice() {
				const params = {
					id: this.$currentId,
					action: 'accountManagement.dimission'
				}

				this.popoverModalStatus = false

				const data = await axios.post('/api/dispatcher.do', params)

				// 更新列表
				this.getList()
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