<style scoped>
#parking-lot-wrapper {
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
	justify-content: flex-end;
	margin-bottom: 40px;
}
.car-number {
	width: 128px;
}
.btn-search {
	margin-left: 20px;
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
.page-wrapper {
	margin-top: 20px;
	text-align: right;
}
.mr {
	margin: 0 10px;
}
.no-data {
	margin-top: 30px;
}
</style>

<template>
	<div id="parking-lot-wrapper">
		<template v-if="loading">
			<loading></loading>
		</template>

		<template v-else>
			<div class="container" v-if="count < 2 && ! list.length">
				<el-button type="primary" @click="go">+包月车辆</el-button>
				<p class="no-data" >暂无车辆出入记录。</p>
			</div>

			<div class="container" v-else>
				<div class="search-wrapper">
					<label class="calendar-label">
						<span>在场时间：</span>
						<el-date-picker v-model="startDate" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="入场时间"></el-date-picker>
						<span class="mr">-</span>
						<el-date-picker v-model="endDate" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="出场时间"></el-date-picker>
					</label>
					<el-input class="car-number" v-model="number" placeholder="车牌号" @keyup.native.enter="search"></el-input>
					<el-button type="primary" class="btn-search" :disabled="disabled" @click="search">查询</el-button>
				</div>

				<el-table :data="list" @sort-change="sortChange">
					<el-table-column prop="isDesc" label="时间" sortable="custom">
						<template slot-scope="scope">
							<span>{{scope.row.accessTime | format}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="carNumber" label="车牌号"></el-table-column>
					<el-table-column label="出/入场">
						<template slot-scope="scope">
							<span>{{scope.row.accessFlag === 1 ? '入' : '出'}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="isMonth" label="包月/非包月">
						<template slot-scope="scope">
							<span>{{scope.row.monthly ? '包月' : '非包月'}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="stayLasts" label="停车时长"></el-table-column>
					<el-table-column prop="cashAmount" label="停车费用（元）"></el-table-column>
				</el-table>

				<div class="page-wrapper">
					<el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange"></el-pagination>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import {dateFormatString} from '@/utils/util'

	export default {
		data() {
			return {
				loading: false,
				count: 0,

				startDate: '',
				endDate: '',
				number: '',

				disabled: false,

				page: 1,
				pageTotal: 1,
				list: []
			}
		},

		filters: {
			format(value) {
				return dateFormatString(new Date(value), 1)
			}
		},

		created() {
			if (this.$parent.$cardRecordTempData) {
				this.setData(this.$parent.$cardRecordTempData)
			} else {
				this.loading = true

				this.getList().then((data) => {
					this.loading = false

					if (! data) {
						return
					}

					// 保存数据
					this.setData(data)
					this.$parent.$cardRecordTempData = data
				})
			}
		},

		methods: {
			async getList() {
				const params = {
					action: 'ParkingRental.queryCarAccessRecord',
					pageNo: this.page,
					condition: {}
				}

				if (this.number) {
					params.condition.carNumber = this.number
				}

				if (this.startDate) {
					params.condition.accessTimeStart = this.startDate
				}

				if (this.endDate) {
					params.condition.accessTimeEnd = this.endDate
				}

				if (this.$order !== null && this.$rank) {
					params.sortContent = [{
						field: 'accessTime',
						isDesc: this.$order
					}]
				}

				// 没有条件时去掉
				! Object.keys(params.condition).length && (params.condition = void 1)

				params.condition = JSON.stringify(params.condition)
				params.sortContent = JSON.stringify(params.sortContent)

				const data = await axios.post('/api/field/dispatcher.do', params)

				this.count++

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
			async search() {
				if (this.$flag) {
					return
				}

				this.$flag = true
				this.disabled = true

				await this.getList().then((data) => {
					this.loading = false

					if (! data) {
						return
					}

					// 保存数据
					this.setData(data)
					this.$parent.$cardRecordTempData = data
				})

				this.$flag = null
				this.disabled = false
			},
			async sortChange(column) {
				if (this.$flag) {
					return
				}

				this.$flag = true

				this.$rank = column.prop
				this.$order = column.order === 'ascending' ? true : column.order === 'descending' ? false : ''

				await this.getList()

				this.$flag = null
			},
			go() {
				this.$router.push('/parking-lot/add')
			}
		}
	}
</script>