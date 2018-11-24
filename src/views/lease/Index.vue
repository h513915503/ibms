<style src="@/css/lease-index.css" scoped></style>
<style>
.el-popover.no-shadow {
	border: none;
	box-shadow: none;
	background-color: transparent;
}
</style>

<template>
	<div id="lease-wrapper">
		<template v-if="loading">
			<loading></loading>
		</template>

		<template v-else>
			<div class="bootstrap-wrapper" v-if="noData">
				<h1>办公租赁需要先维护场地信息</h1>
				<ul>
					<li class="active">
						<strong>添加房间</strong>
						<p>添加楼层、各楼层的房间数及面积</p>
					</li>
					<li>
						<strong>添加租赁单位</strong>
						<p>添加租赁单位的信息</p>
					</li>
				</ul>
				<el-button type="primary" @click="addRoom">+ 房间</el-button>
			</div>

			<div class="container" v-else>
				<div class="header">
					<tab-bar :list="tabs"></tab-bar>

					<div class="tab-wrapper">
						<div class="tab-item" :class="{actived: stage === index}" v-text="item" v-for="(item, index) of tab" @click="stage = index"></div>
					</div>
				</div>

				<template v-if="stage === 0">
					<div class="btn-wrapper">
						<el-button @click="addRoom">+ 楼层</el-button>
						<el-button type="primary" @click="redirectAdd" v-if="floorList.length > 1">+ 租赁单位</el-button>
					</div>

					<ul class="floor-list">
						<li v-for="(item, index) of floorList">
							<div class="edit-wrapper" v-if="item.isEdit">
								<div class="operation-wrapper">
									<div class="item" v-if="item.isFloorNumberEdit">
										<span>楼层号：</span>
										<el-input-number v-model="item.floorNumber" :min="1"></el-input-number>
									</div>
									<div class="item area">
										<span>总面积：</span>
										<input class="input" type="text" v-model.number="item.totalArea">
										㎡
									</div>
									<el-button type="primary" @click="handleFloorChange(item, true)">确定</el-button>
									<el-button @click="handleFloorChange(item, false, index)">取消</el-button>
								</div>
							</div>

							<div class="show-wrapper" v-else>
								<div class="floor-number">
									<p>{{item.floorNumber}}层</p>
								</div>

								<p class="no-room">
									<span>{{item.totalArea}}㎡</span>
									还未出租
								</p>
								<ul class="company-list" v-if="item.companyList.length">
									<li :class="{expires: item.rentalSurplusDay < 90}" v-for="item of item.companyList" @click="goDetail(item.rentalId)">
										<span class="split-line"></span>
										<div>
											<p>
												<span v-text="item.houseNumber"></span>
												<span class="time">{{item.endDate | format}} 到期，剩 {{item.rentalSurplusDay}} 天</span>
											</p>
											<p v-text="item.rentalCompany"></p>
										</div>
									</li>
								</ul>

								<div class="icon-wrapper">
									<i class="icon icon-other" @click="showCopy(item.floorNumber)"></i>

									<el-popover popper-class="no-shadow" placement="bottom-end" trigger="click" @hide="popoverModalStatus = false">
									  	<div class="icon-more" slot="reference" @click="currentFloorNumber = item.floorNumber"></div>
									  	<div class="more-icon-wrapper">
											<i class="icon icon-edit" @click="editFloor(index)"></i>
											<i class="icon icon-delete" @click="forDelFloor($event, index, item)"></i>


										</div>
									</el-popover>
								</div>

								<popover name="close" title="确定要删除这层楼么？" content="删除该层楼之后，该楼层的租赁信息、业主信息也会被清空。" v-if="popoverModalStatus && currentFloorNumber === item.floorNumber" @hide="popoverModalStatus = false" ref="popover">
									<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
									<el-button type="primary" slot="cancel" class="ok" @click="deleteFloor(index)">确定</el-button>
								</popover>

								<copy-floor title="复制楼层到" :copy-start="copyStart" :copy-end="copyEnd" :index="index" v-if="copyModalStatus && currentFloorNumber === item.floorNumber" @hide="copyModalStatus = false" @complete="copyFloor">
								</copy-floor>
							</div>
						</li>
					</ul>
				</template>

				<chart :chart-data="chartData" v-else></chart>
			</div>
		</template>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'
	import chart from '@/components/lease/chart.vue'
	import copyFloor from '@/components/copyFloor.vue'

	export default {
		data() {
			return {
				loaded: false,
				loading: false,

				isDelete: false,
				index: 1,

				copyStart: 1,
				copyEnd: 1,

				copyModalStatus: false,
				popoverModalStatus: false,

				stage: 0,
				tab: ['楼宇租赁', '报表分析'],

				tabs: [
					{
						number: 0,
						text: '总面积'
					},
					{
						number: 0,
						text: '可租赁面积'
					},
					{
						number: 0,
						text: '入驻单位'
					},
					{
						number: '0%',
						text: '出租率'
					}
				],

				chartData: {},

				currentFloorNumber: 0,
				floorList: [
					{
						isEdit: true,
						isFloorNumberEdit: true,
						floorNumber: 1,
						totalArea: 1000,
						companyList: []
					}
				]
			}
		},

		components: {
			tabBar,
			chart,
			copyFloor
		},

		computed: {
			noData() {
				return this.loaded && ! this.floorList.length
			}
		},

		filters: {
			format(value) {
				const date = new Date()

				return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`.replace(/\b(\w)\b/, '0$1')
			}
		},

		created() {
			this.save(this.floorList[0])

			this.loading = true

			Promise.all([this.getList(), this.getChartData()]).then(() => {
				this.loading = false
				this.loaded = true
			})
		},

		methods: {
			async getChartData() {
				const params = {
					action: 'OfficeRental.officeRentalReportInfo'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.chartData = {... data.data}

				const {usedSize, usableSize, willExpireSize, enterCompanyCount, officeRentalDetailReports} = data.data

				const totalArea = usedSize + usableSize + willExpireSize
				const ratio = ~~ (((usedSize + willExpireSize) / totalArea) * 100)

				this.tabs[0].number = totalArea
				this.tabs[1].number = usableSize
				this.tabs[2].number = enterCompanyCount
				this.tabs[3].number = `${ratio}%`
			},
			async getList() {
				const params = {
					action: 'OfficeRental.queryAllRentalInfo'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.floorList = data.data.map((item) => {
					return {
						isEdit: false,
						isFloorNumberEdit: true,
						floorId: item.floorId,
						floorNumber: + item.floorNumber,
						totalArea: item.notRentalSize,
						companyList: item.rentalDetails
					}
				})
			},
			save(item) {
				this.$floorNumber = item.floorNumber
				this.$totalArea = item.totalArea
			},
			handleFloorChange(item, value, index) {
				item.isEdit = false

				if (value) {
					if (this.$add) {
						this.addRoomService(JSON.stringify([{
							floorNumber: this.$floor.floorNumber,
							floorSize: this.$floor.totalArea
						}]))
					} else {
						this.editRoomService()
					}
				} else {
					item.totalArea = this.$totalArea
					item.floorNumber = this.$floorNumber

					if (this.$add) {
						this.floorList.splice(index, 1)
					}
				}

				this.$add = null
			},
			updateTotalArea() {
				this.totalArea = this.floorList.map((item) => item.totalArea).reduce((prev, next) => prev + next)
			},
			addRoom() {
				let index = 1

				if (this.floorList.length) {
					index = this.floorList.slice(-1)[0].floorNumber + 1
				}

				const floor = {
					isEdit: true,
					isFloorNumberEdit: true,
					floorNumber: index,
					totalArea: 1000,
					floorId: -1,
					companyList: []
				}

				this.$floors = [floor]

				this.floorList.push(floor)

				this.$add = true
			},
			async addRoomService(floorInfos) {
				const params = {
					action: 'OfficeRental.addFloors',
					floorInfos
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				data.data.idList.forEach((item, index) => {
					this.$floors[index].floorId = item
				})

				this.$floors = null
			},
			async editRoomService() {
				const currentFloor = this.floorList[this.currentFloorNumber]

				const params = {
					action: 'OfficeRental.editFloor',
					floorinfo: JSON.stringify({
						id: + currentFloor.floorId,
						floorNumber: currentFloor.floorNumber,
						floorSize: currentFloor.totalArea
					})
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					currentFloor.floorNumber = this.$floorNumber
					currentFloor.totalArea = this.$totalArea

					return
				}
			},
			editFloor(index) {
				// 保存当前楼层
				this.save(this.floorList[index])

				this.currentFloorNumber = index
				this.floorList[index].isEdit = true
				this.floorList[index].isFloorNumberEdit = false
			},
			showCopy(floorNumber) {
				this.copyModalStatus = true
				this.currentFloorNumber = floorNumber

				this.copyStart = this.floorList.slice(-1)[0].floorNumber + 1
				this.copyEnd = this.copyStart
			},
			copyFloor(value) {
				if (! value) {
					return
				}

				let {start, end, index} = value

				this.$floors = []
				this.copyModalStatus = false

				let num = end - start + 1
				const totalArea = this.floorList[index].totalArea

				while (num--) {
					this.$floors.push({
						isEdit: false,
						isFloorNumberEdit: true,
						floorNumber: start ++,
						totalArea,
						floorId: -1,
						companyList: []
					})
				}

				this.floorList = [... this.floorList, ... this.$floors]

				this.addRoomService(JSON.stringify(this.$floors.map((item) => {
					return {
						floorNumber: item.floorNumber,
						floorSize: item.totalArea
					}
				})))
			},
			forDelFloor(e, index, item) {
				this.popoverModalStatus = true
				this.$floorId = item.floorId
				this.$index = index

				// 更新组件 position
				this.$nextTick(() => {
					const popover = this.$refs.popover[0].$el

					if (popover.getBoundingClientRect().bottom > innerHeight) {
						popover.style.transformOrigin = '100% 100%'
						popover.style.top = '-140px'
					}
				})
			},
			async deleteFloor(index) {
				const params = {
					action: 'OfficeRental.deleteFloor',
					floorId: this.$floorId
				}

				//this.popoverModalStatus = false

				const data = await axios.post('/api/dispatcher.do', params)

				this.$floorId = null

				if (! data) {
					return
				}

				this.floorList.splice(this.$index, 1)
				this.$index = null
			},
			go() {
				this.$router.push('/lease/add')
			},
			goDetail(id) {
				this.$router.push(`/lease/detail/${id}`)
			},
			redirectAdd() {
				this.$router.push('/lease/add')
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