<style scoped>
.parking-lot-wrapper {
	min-width: 1000px;
}
.container {
	padding: 24px;
	margin-top: 24px;
	box-sizing: border-box;
	background-color: #FFF;
}
.search-wrapper {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;
}
.search-content {
	display: flex;
	justify-content: space-between;
}
.btn-search {
	margin-left: 20px;
}
.calendar-label {
	display: flex;
	align-items: center;
	margin-right: 20px;

	& .label {
		flex-shrink: 0;
		margin-right: 10px;
	}
}
.page-wrapper {
	margin-top: 20px;
	text-align: right;
}
.no-data {
	margin-top: 30px;
}
</style>

<template>
	<div class="parking-lot-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<div class="container" v-if="! list.length">
				<el-button type="primary" @click="go">+包月车辆</el-button>
				<p class="no-data" >暂无包月车辆。</p>
			</div>

			<div class="container" v-else>
				<div class="search-wrapper">
					<el-button type="primary" @click="go">+包月车辆</el-button>
					<div class="search-content">
						<label class="calendar-label">
							<span class="label">租期到期时间：</span>
							<el-date-picker v-model="date" type="date" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
						</label>
						<el-input v-model="number" placeholder="车牌号"></el-input>
						<el-button type="primary" :disabled="disabled" class="btn-search" @click="search">查询</el-button>
					</div>
				</div>

				<el-table :data="list" @click.native="handleTable" @sort-change="sortChange">
					<el-table-column prop="carNumber" label="车牌号"></el-table-column>
					<el-table-column prop="masterName" label="车主姓名"></el-table-column>
					<el-table-column prop="masterPhone" label="车主手机号码"></el-table-column>
					<el-table-column prop="masterCompany" label="所在单位" width="320"></el-table-column>
					<el-table-column label="车位">
						<template slot-scope="scope">
							{{scope.row.floorNumber}}层·{{scope.row.isConfirmed === 1 ? scope.row.parkingSpaceNumber + '号' : scope.row.parkingAreaNumber}}
						</template>
					</el-table-column>
					<el-table-column label="到期时间" prop="endDate" sortable="custom">
						<template slot-scope="scope">
							{{scope.row.endDate | format}}
						</template>
					</el-table-column>
					<el-table-column label="操作">
			  			<template slot-scope="scope">
					        <el-button type="text" size="small" data-type="1" :data-id="scope.row.id" :data-index="scope.$index">续租</el-button>
					        <el-button type="text" size="small" data-type="2" :data-id="scope.row.id">查看详情</el-button>
				      </template>
				    </el-table-column>
				</el-table>

				<parking-lot-throw-lease :follow-target="followTarget" :id="currentCarId" v-if="throwLeaseModalStatus" @hide="throwLeaseModalStatus = false" @complete="complete"></parking-lot-throw-lease>

				<div class="page-wrapper" v-if="list.length">
					<el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange"></el-pagination>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import {dateFormatString} from '@/utils/util'
	import parkingLotThrowLease from '@/components/parking-lot/throw-lease'

	export default {
		data() {
			return {
				loading: false,
				loaded: false,

				followTarget: null,
				throwLeaseModalStatus: false,
				currentCarId: -1,

				disabled: false,

				date: '',
				number: '',

				page: 1,
				pageTotal: 1,
				list: []
			}
		},

		components: {
			parkingLotThrowLease
		},

		filters: {
			format(value) {
				if (typeof value === 'string') {
					return value
				}

				return dateFormatString(new Date(value))
			}
		},

		created() {
			if (this.$root.$tempData) {
				this.setData(this.$root.$tempData)
			} else {
				this.loading = true

				this.getList().then((data) => {
					this.loading = false
					this.loaded  =true

					// 保存数据
					this.setData(data)
					this.$root.$tempData = data
				})
			}
		},

		methods: {
			async search() {
				this.disabled = true

				await this.getList().then((data) => {
					// 保存数据
					this.setData(data)
					this.$root.$tempData = data
				})

				this.disabled = false
			},
			sortChange(column) {
				this.$rank = column.prop
				this.$order = column.order === 'ascending' ? false : column.order === 'descending' && true

				this.getList().then((data) => {
					// 保存数据
					this.setData(data)
					this.$root.$tempData = data
				})
			},
			async getList() {
				const params = {
					action: 'ParkingRental.queryParkingMonthRentalDetail',
					pageNo: this.page,
					condition: {}
				}

				if (this.number) {
					params.condition.carNumber = this.number
				}

				if (this.date) {
					params.condition.endDate = this.date
				}

				if (this.$order !== null && this.$rank) {
					params.sortContent = [{
						field: 'endDate',
						isDesc: this.$order
					}]
				}

				// 没有条件时去掉
				! Object.keys(params.condition).length && (params.condition = void 1)

				params.condition = JSON.stringify(params.condition)
				params.sortContent = JSON.stringify(params.sortContent)

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				return data.data
			},
			setData({total, detail}) {
				this.pageTotal = total
				this.list = detail
			},
			pageChange(value) {
				this.page = value
				this.getList()
			},
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

				const {id, type, index} = target.dataset

				if (+ type === 1) {
					this.forContinueLease(e, id, index)

					return
				}

				if (+ type === 2) {
					this.$router.push(`/parking-lot/detail/${id}`)
				}
			},
			forContinueLease(e, id, index) {
				this.$index = index
				this.currentCarId = id
				this.followTarget = e.target
				this.throwLeaseModalStatus = true

			},
			complete(value) {
				this.list[this.$index].endDate = value
				this.$index = null
			}
		}
	}
</script>