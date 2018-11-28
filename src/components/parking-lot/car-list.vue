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

	& span {
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
	<div id="parking-lot-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<!-- <div class="container" v-if="! list.length">
				<el-button type="primary" @click="go">+包月车辆</el-button>
				<p class="no-data" >暂无包月车辆。</p>
			</div> -->

			<div class="container">
				<div class="search-wrapper">
					<el-button type="primary" @click="go">+包月车辆</el-button>
					<div class="search-content">
						<label class="calendar-label">
							<span>租期到期时间：</span>
							<el-date-picker v-model="date" type="date" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
						</label>
						<el-input v-model="number" placeholder="车牌号"></el-input>
						<el-button type="primary" :disabled="disabled" class="btn-search" @click="search">查询</el-button>
					</div>
				</div>

				<el-table :data="list" @click.native="handleTable">
					<el-table-column prop="carNumber" label="车牌号"></el-table-column>
					<el-table-column prop="masterName" label="车主姓名"></el-table-column>
					<el-table-column prop="masterPhone" label="车主手机号码"></el-table-column>
					<el-table-column prop="masterCompany" label="所在单位" width="320"></el-table-column>
					<el-table-column label="车位">
						<template slot-scope="scope">
							{{scope.row.floorNumber}}层·{{scope.row.isConfirmed === 1 ? scope.row.parkingSpaceNumber + '号' : scope.row.parkingAreaNumber}}
						</template>
					</el-table-column>
					<el-table-column label="到期时间" sortable>
						<template slot-scope="scope">
							{{scope.row.endDate | format}}
						</template>
					</el-table-column>
					<el-table-column label="操作">
			  			<template slot-scope="scope">
					        <el-button type="text" size="small" @click="forContinueLease($event, scope.row.id, scope.$index)">续租</el-button>
					        <el-button type="text" size="small" data-type="1" :data-id="scope.row.id">查看详情</el-button>
				      </template>
				    </el-table-column>
				</el-table>

				<!-- <popover name="close" title="确定要删除这层楼么？" content="删除该层楼之后，该楼层的租赁信息、业主信息也会被清空。" v-if="popoverModalStatus" @hide="popoverModalStatus = false" ref="popover">
					<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
					<el-button type="primary" slot="cancel" class="ok" @click="continueLease">确定</el-button>
				</popover> -->

				<parking-lot-throw-lease :id="currentCarId" :throwLeaseModalStatus.sync="throwLeaseModalStatus" ref="popover" v-if="throwLeaseModalStatus" @complete="complete"></parking-lot-throw-lease>

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

				throwLeaseModalStatus: false,
				currentCarId: -1,
				//popoverModalStatus: false,

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
					this.$root.$tempData = data
				})
			}
		},

		methods: {
			async search() {
				this.disabled = true

				await this.getList()

				this.disabled = false
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

				// 没有条件时去掉
				! Object.keys(params.condition).length && (params.condition = void 1)

				params.condition = JSON.stringify(params.condition)

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.setData(data.data)

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
			forContinueLease(e, id, index) {
				this.$index = index
				this.currentCarId = id
				this.throwLeaseModalStatus = true

				this.$nextTick(() => {
                    const {x, y} = e.target.getBoundingClientRect()

                    this.$refs.popover.$el.style.left = `${x - 650}px`
                    this.$refs.popover.$el.style.top = `${y - 55}px`
                })
			},
			continueLease() {

			},
			complete(value) {
				this.list[this.$index].endDate = value
				this.$index = null
			},
			handleTable(e) {
				let target = e.target

				while (target.dataset && ! target.dataset.type) {
					target = target.parentNode
				}

				if (! target.dataset) {
					return
				}

				const {id, type} = target.dataset

				if (+ type === 1) {
					this.$router.push(`/parking-lot/detail/${id}`)
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