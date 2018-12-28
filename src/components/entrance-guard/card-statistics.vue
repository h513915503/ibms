<style scoped>
.card-statistics-wrapper {
	display: flex;
	min-height: 600px;
	margin: 0 24px;
	overflow: auto;
	background-color: #FFF;
}
.company-list-wrapper {
	position: relative;
	border-right: 1px solid #E8E8E8;

	& .el-input {
		width: 208px;
		margin: 24px;
	}
}
.company-list {
	height: 544px;
	padding-bottom: 24px;
	overflow-y: scroll;
	box-sizing: border-box;
}

.company-list::-webkit-scrollbar {
	display: none;
}
.company-item {
	width: 256px;
	padding: 0 24px;
	color: rgba(0, 0, 0, .65);
	font-size: 14px;
	line-height: 38px;
	cursor: pointer;
	box-sizing: border-box;
}

.company-item.active {
	color: #0E7CC2;
	border-right: 2px solid #0E7CC2;
	background-color: #E6F9FF;
}
.mask::after {
	content: "";
	width: 100%;
	height: 100px;
	position: absolute;
	top: 80px;
	left: 0;
	pointer-events: none;
	background-image: linear-gradient(to bottom, #FFF, rgba(0, 0, 0, .01));
}
.container {
	flex: 1;
	padding: 24px;
	box-sizing: border-box;
}
.index-header {
	display: flex;
	align-items: center;
	margin-bottom: 24px;

	& .input {
		width: 128px;
		margin-left: auto;
	}

	& .search-btn {
		margin-left: 24px;
	}
}
.card--scroll-wrapper {
	height: 500px;
	overflow: auto;
}
.letter-list {
	color: #8C8C8C;
	font-size: 14px;
	user-select: none;

	& .active {
		color: #0E7CC2;
		opacity: 1;
		cursor: pointer;
		pointer-events: auto;
	}
}
.letter {
	margin-right: 10px;
	opacity: .5;
	pointer-events: none;
}
.card-index-item {
	margin-bottom: 8px;
	color: #8C8C8C;
}
.card-index {
	font-size: 14px;
}
.card-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 8px;
}
.card-item {
	width: 203px;
	height: 88px;
	padding: 24px;
	margin: 0 15px 15px 0;
	font-size: 12px;
	cursor: pointer;
	border: 1px solid transparent;
	box-sizing: border-box;
	background-color: #F5F5F5;
}
.card-item.active {
	border-color: #0E7CC2;
	background-color: #FFF;
}
.info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
	font-size: 14px;
}
.name {
	max-width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #000;
	font-size: 18px;
}
.record-wrapper {
	width: 100%;
	height: 422px;
	padding: 0 24px;
	margin-bottom: 14px;
	overflow: hidden;
	position: relative;
	box-sizing: border-box;
	border: 1px solid #0E7CC2;
	background-color: #FFF;
	transition: height .5s;

	& .title {
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		color: #000;
		font-size: 18px;
	}

	& .hide {
		color: #8C8C8C;
		font-size: 12px;
		cursor: pointer;
	}
}
.el-table {
	font-size: 12px;
}
.height-enter, .height-leave-active {
	height: 0;
}
.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
}
.export-btn {
	padding: 8px 14px;
}
</style>
<style>
.aa th {
	padding: 0;
}
</style>
<style>
.card-statistics-wrapper .el-table td, .card-statistics-wrapper .el-table th {
	padding: 6px 0;
}
</style>

<template>
	<div class="card-statistics-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<div class="company-list-wrapper" :class="{mask: showMask}">
				<el-input v-model="companyName" placeholder="单位名称" @keyup.native.enter="getCompanyList"></el-input>
				<ul class="company-list" @scroll="scroll">
					<li class="company-item" :class="{active: companyId === item.chainid}" v-for="item of companyList" @click="companyId = item.chainid">{{item.rentalCompany}}</li>
				</ul>
			</div>

			<div class="container">
				<div class="index-header">
					<div class="letter-list" @click="smoothScroll">
						<span class="letter" :class="{active: item.active}" v-for="item of letterList" :key="item.text" v-text="item.text"></span>
					</div>
					<el-input class="input" type="text" placeholder="卡号/姓名" v-model="account" @keyup.native.enter="searchCardList"></el-input>
					<el-button class="search-btn" :disabled="disabled" @click="searchCardList">查询</el-button>
				</div>

				<loading v-if="cardLoading"></loading>
				<div class="card--scroll-wrapper" v-else>
					<ul class="card-index-list">
						<li class="card-index-item" v-for="(items, indexs) of cardList" ref="aa">
							<span class="card-index" v-text="items.index"></span>
							<div class="card-list" ref="card-list">
								<template v-for="(item, index) of items.list">
									<div class="card-item" :class="{active: currentCardId === item.chainId}" data-type="1" :data-index="indexs" @click="showDetail($event, item, index, items.list)">
										<p class="info">
											<span class="name" v-text="item.accountName"></span>
											{{item.type}}
										</p>
										<p class="card-id" v-text="item.cardNo"></p>
									</div>

									<transition name="height">
										<div class="record-wrapper" v-if="item.show" ref="record-wrapper">
											<h1 class="title">
												{{recordName}}的通行记录
												<div class="hide" @click="item.show = false">收起</div>
											</h1>

											<loading v-if="recordLoading"></loading>
											<template v-else>
												<el-table class="aa" :data="recordList" @sort-change="sortChange">
													<el-table-column label="时间" sortable='custom' width="200">
														<template slot-scope="scope">
																<span>{{scope.row.punchTime | timeFormat}}</span>
															</template>
													</el-table-column>
													<el-table-column prop="childName" label="通行门禁编号" width="200"></el-table-column>
													<el-table-column prop="address" label="通行门禁位置"></el-table-column>
													<el-table-column label="通行方式">
															<template slot-scope="scope">
																<span>{{scope.row.travelWay | format}}</span>
															</template>
														</el-table-column>
													<el-table-column label="出/入">
															<template slot-scope="scope">
																<span>{{scope.row.direction === 1 ? '入' : '出'}}</span>
															</template>
														</el-table-column>
												</el-table>
												<footer class="footer" v-if="recordList.length">
													<el-button class="export-btn">导出</el-button>
													<el-pagination small layout="prev, pager, next" :page-size="8" :current-page="page" :total="pageTotal" @current-change="pageChange"></el-pagination>
												</footer>
											</template>
										</div>
									</transition>
								</template>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				cardLoading: false,

				disabled: false,

				showMask: false,
				companyName: '',
				companyId: '',
				companyList: [],

				cardList: [],
				currentCardId: '',

				account: '',

				recordName: '',
				recordLoading: false,
				recordList: [],

				page: 1,
				pageTotal: 50
			}
		},

		computed: {
			letterList() {
				const list = []

				// A charCodeAt
				let startNumber = 65

				while (startNumber < 91) {
					const ll = String.fromCharCode(startNumber++)

					list.push({
						text: ll,
						active: this.cardList.find((item) => item.index === ll)
					})
				}

				return list
			}
		},

		filters: {
			format(value) {
				const map = {
					3: '人脸识别',
					4: '刷卡',
					5: '二维码'
				}

				return map[value]
			},
			timeFormat(value) {
				const date = new Date(value)

				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`.replace(/\b(\w)\b/g, '0$1')
			}
		},

		watch: {
			companyId(value) {
				this.cardList = []
				this.cardLoading = true

				this.getCardList().then(() => {
					this.cardLoading = false
				})
			}
		},

		created() {
			this.loading = true

			this.getCompanyList().then(() => {
				this.loading = false
			})
		},

		methods: {
			async getCompanyList() {
				if (this.$searchCompanyFlag) {
					return
				}

				this.$searchCompanyFlag = true

				const params = {
					action: 'accountManagement.queryRentalInfo',
				}

				if (this.companyName) {
					params.rentalCompany = this.companyName
				}

				const data = await axios.post('/api/account/dispatcher.do', params)

				this.$searchCompanyFlag = null

				if (! data) {
					return
				}

				if (! data.data.length) {
					this.$message.error('没有数据')

					return
				}

				this.companyList = data.data
				this.companyId = data.data[0] && data.data[0].chainid
			},
			async getCardList() {
				if (this.$searchFlag) {
					return
				}

				this.$searchFlag = true

				const params = {
					action: 'door.queryCard',
					rentalCompany: this.companyId
				}

				if (this.account) {
					params.nameOrCard = this.account
				}

				const data = await axios.post('/api/device/dispatcher.do', params)

				this.$searchFlag = null

				if (! data) {
					return
				}

				if (! data.data.length) {
					this.$message.error('没有数据')

					return
				}

				let result = []

				// 排序
				data.data = data.data.sort((a, b) => a.firstChar.charCodeAt() - b.firstChar.charCodeAt())

				data.data.forEach((item) => {
					const index = result.findIndex((current) => current.index === item.firstChar)

					if (index !== -1) {
						result[index].list.push({... item, show: false})
					} else {
						result.push({
							index: item.firstChar,
							list: [{... item, show: false}]
						})
					}
				})

				this.cardList = result
			},
			async searchCardList() {
				this.cardList = []
				this.cardLoading = true
				this.disabled = true

				await this.getCardList()

				this.disabled = false
				this.cardLoading = false
			},
			sortChange(column) {
				this.$order = column.order === 'ascending' ? 'allDate_asc ' : column.order === 'descending' ? 'allDate_desc ' : ''

				this.getRecordList()
			},
			pageChange(value) {
				this.page = value
				this.getRecordList(value)
			},
			scroll(e) {
				if (e.target.scrollTop > 12) {
					this.showMask = true
				} else {
					this.showMask = false
				}
			},
			smoothScroll(e) {
				const index = this.letterList.filter((item) => item.active).findIndex((item) => item.text === e.target.textContent)

				index !== -1 && this.$refs.aa[index].scrollIntoView({behavior: 'smooth', block: 'start'})
			},
			async getRecordList() {
				if (this.$searchFlag) {
					return
				}

				this.$searchFlag = true

				const params = {
					action: 'door.queryYZDoorPunch',
					rentalCompany: this.companyId,
					pageNo: this.page,
					pageSize: 8,
					chainId: this.currentCardId
					//orderBy
				}

				if (this.$order) {
					params.orderBy = this.$order
				}

				const data = await axios.post('/api/device/dispatcher.do', params)

				this.$searchFlag = null

				if (! data) {
					return
				}

				this.recordLoading = false
				this.pageTotal = data.data.total
				this.recordList = data.data.list
			},
			showDetail(e, item, index, list) {
				// 全部隐藏
				this.cardList.forEach((card) => card.list.forEach((item) => item.show = false))

				this.recordName = item.accountName
				this.currentCardId = item.chainId

				this.recordLoading = true
				this.page = 1
				this.getRecordList()

				// 103 是 card-item 的 height
				let target = e.target

				while(target.className !== 'card-item') {
					target = target.parentNode
				}

				const width = this.$refs['card-list'][target.dataset.index].offsetWidth
				const height = this.$refs['card-list'][target.dataset.index].offsetHeight
				const aa = ~~ (width / (203 + 15))
				const lineNum = height / 103

				let i

				const indexArr = []
				let start = 0

				while(list.slice(start, start + aa).length) {
					indexArr.push(list.slice(start, start + aa))
					start += aa

				}

				const bb = indexArr.findIndex((items) => items.find((current) => current.chainId === item.chainId))

				indexArr[bb].slice(-1)[0].show = true

				// this.$nextTick(() => {
				// 	this.$refs['record-wrapper'][0].scrollIntoView({behavior: 'smooth', block: 'center'})
				// })
			},
			handle(e) {
				const aa = document.createElement('div')

				aa.className = 'record-wrapper'

				let pp = e.target.parentNode

				while(pp.className !== 'card-list') {
					pp = pp.parentNode
				}

				log(pp)
				pp.appendChild(aa)
			}
		}
	}
</script>