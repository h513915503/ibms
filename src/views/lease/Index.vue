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
			<div class="bootstrap-wrapper" v-if="index === 0">
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
				<el-button type="primary" @click="index = 1">+ 房间</el-button>
			</div>

			<div class="container" v-if="index === 1">
				<div class="header">
					<tab-bar :list="tabs"></tab-bar>

					<div class="tab-wrapper">
						<div class="tab-item" :class="{actived: stage === index}" v-text="item" v-for="(item, index) of tab" @click="stage = index"></div>
					</div>
				</div>

				<template v-if="stage === 0">
					<div class="btn-wrapper">
						<el-button @click="addRoom">+ 楼层</el-button>
						<el-button type="primary" @click="redirectAdd">+ 租赁单位</el-button>
					</div>

					<ul class="floor-list">
						<li v-for="(item, index) of floorList">
							<div class="edit-wrapper" v-if="item.isEdit">
								<div class="operation-wrapper">
									<div class="item">
										<span>楼层号：</span>
										<el-input-number v-model="item.floorNumber" :min="1"></el-input-number>
									</div>
									<div class="item area">
										<span>总面积：</span>
										<input class="input" type="text" v-model.number="item.totalArea">
										㎡
									</div>
									<el-button type="primary" @click="handleFloorChange(item, true)">确定</el-button>
									<el-button @click="handleFloorChange(item, false)">取消</el-button>
								</div>
								<!-- <ul class="room-list">
									<li v-for="items of item.roomList" v-if="items.type === 0">
										<p v-text="items.roomNumber"></p>
										<p class="input-wrapper">
											<input class="input" type="text" v-model.number="items.area" @input="item.isModify = true">
											㎡
										</p>
									</li>
								</ul> -->
							</div>

							<div class="show-wrapper" v-else>
								<div class="floor-number">
									<p>{{item.floorNumber}}层</p>
									<span>剩{{item.totalArea}}㎡</span>
								</div>

								<p class="no-room" v-if="! item.companyList.length">暂未出租</p>
								<ul class="company-list">
									<li :class="{expires: item.day < 10}" v-for="item of item.companyList">
										<p>
											<span v-text="item.roomNumber"></span>
											<span class="time">{{item.expires}} 到期，剩{{item.day}}天</span>
										</p>
										<p v-text="item.companyName"></p>
									</li>
								</ul>

								<div class="icon-wrapper">
									<i class="icon icon-other"></i>
									<el-popover popper-class="no-shadow" placement="bottom-end" trigger="click" @hide="isDelete = false">
									  	<div class="icon-more" slot="reference" @click="currentFloorNumber = item.floorNumber"></div>
									  	<div class="more-icon-wrapper">
											<i class="icon icon-edit" @click="editFloor(index)"></i>
											<i class="icon icon-delete" @click="isDelete = true"></i>

											<popover name="close" title="确定要删除这层楼么？" content="删除该层楼之后，该楼层的租赁信息、业主信息也会被清空。" v-if="isDelete && item.floorNumber === currentFloorNumber">
												<el-button slot="ok" @click="isDelete = false">取消</el-button>
												<el-button type="primary" slot="cancel" class="ok" @click="deleteFloor(index)">确定</el-button>
											</popover>
										</div>
									</el-popover>
								</div>
							</div>
						</li>
					</ul>
				</template>

				<div class="statistics" v-else>
					<h1>
						详细数据
						<el-button>导出</el-button>
					</h1>
					<el-table border :data="statisticsData">
						<el-table-column prop="floorNumber" label="楼层"></el-table-column>
						<el-table-column prop="totalArea" label="总面积"></el-table-column>
						<el-table-column prop="a" label="已出租"></el-table-column>
						<el-table-column prop="b" label="即将到期"></el-table-column>
						<el-table-column prop="c" label="未出租"></el-table-column>
						<el-table-column prop="ratio" label="出租率"></el-table-column>
					</el-table>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'
	import popover from '@/components/popover.vue'

	export default {
		data() {
			return {
				loading: true,
				isDelete: false,
				index: 1,

				totalArea: 0,
				leaseableArea: 0,

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

				currentFloorNumber: 0,
				floorList: [
					{
						isEdit: true,
						floorNumber: 1,
						totalArea: 1000,
						companyList: []
					},
					{
						isEdit: false,

						floorNumber: 10,
						totalArea: 1000,
						companyList: [
							{
								roomNumber: 201,
								companyName: '杭州中毅股权投资基金管理有限公司',
								expires: '2018-12-12',
								day: 30
							},
							{
								roomNumber: 201,
								companyName: '杭州中毅股权投资基金管理有限公司',
								expires: '2018-12-12',
								day: 3
							}
						]
					}
				],

				statisticsData: [
					{
						floorNumber: 17,
						totalArea: 1000,
						a: 400,
						b: 300,
						c: 220,
						ratio: '40%'
					},
					{
						floorNumber: 17,
						totalArea: 1000,
						a: 400,
						b: 300,
						c: 220,
						ratio: '40%'
					},
					{
						floorNumber: 17,
						totalArea: 1000,
						a: 400,
						b: 300,
						c: 220,
						ratio: '40%'
					}
				]
			}
		},

		components: {
			tabBar,
			popover
		},

		computed: {
			selectRoom() {
				return this.$store.state.selectRoom
			}
		},

		filters: {
			format(value) {
				const date = new Date()

				return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			}
		},

		watch: {
			totalArea(value) {
				this.tabs[0].number = value
			}
		},

		created() {
			this.save(this.floorList[0])

			setTimeout(() => {
				this.loading = false
			}, 20)
		},

		methods: {
			save(item) {
				this.$floorNumber = item.floorNumber
				this.$totalArea = item.totalArea
			},
			handleFloorChange(item, value) {
				item.isEdit = false

				if (! value) {
					item.totalArea = this.$totalArea
					item.floorNumber = this.$floorNumber
				}
			},
			updateTotalArea() {
				this.totalArea = this.floorList.map((item) => item.totalArea).reduce((prev, next) => prev + next)
			},
			// change(it, item) {
			// 	const roomList = []

			// 	if (it.checked) {
			// 		const index = this.selectRoom.findIndex((current) => current.floorNumber === item.floorNumber)

			// 		if (index !== -1) {
			// 			this.selectRoom[index].roomList.push(it.roomNumber)
			// 			this.selectRoom[index].isAll = this.selectRoom[index].roomList.length === item.roomList.length
			// 		} else {
			// 			roomList.push(it.roomNumber)

			// 			this.selectRoom.push({
			// 				isAll: roomList.length === item.roomList.length,
			// 				floorNumber: item.floorNumber,
			// 				roomList
			// 			})
			// 		}

			// 		// 检测是否全选
			// 		const ind = this.selectRoom.findIndex((current) => current.floorNumber === item.floorNumber)

			// 		ind !== -1 && (item.allChecked = this.selectRoom[ind].isAll)
			// 	} else {
			// 		this.selectRoom.forEach((current) => {
			// 			if (current.floorNumber === item.floorNumber) {
			// 				current.isAll = false

			// 				current.roomList.splice(current.roomList.findIndex((number) => number === it.roomNumber), 1)
			// 			}
			// 		})

			// 		// 判断 roomList 是否为空
			// 		const i = this.selectRoom.findIndex((current) => current.roomList.length === 0)

			// 		i !== -1 && this.selectRoom.splice(i, 1)

			// 		// 取消全选
			// 		item.allChecked = false
			// 	}
			// },
			// handleCheckboxAll(item) {
			// 	if (item.allChecked) {
			// 		item.roomList.forEach((current) => {
			// 			current.checked = true

			// 			this.change(current, item)
			// 		})
			// 	} else {
			// 		item.roomList.forEach((current) => {
			// 			current.checked = false

			// 			this.change(current, item)
			// 		})
			// 	}
			// },
			// handleRoomNumChange(value) {
			// 	const item = this.floorList[this.currentFloorNumber]

			// 	let num = value
			// 	let roomNumber = + `${item.floorNumber}01`

			// 	if (item.isModify) {
			// 		const length = item.roomList.length

			// 		// 删除房间
			// 		if (length > value) {
			// 			item.roomList.pop()
			// 		} else {
			// 			item.roomList.push({
			// 				type: 0,
			// 				roomNumber: item.roomList[length - 1].roomNumber + 1,
			// 				area: 0,
			// 				checked: false
			// 			})
			// 		}
			// 	} else {
			// 		item.roomList = []

			// 		while (num --) {
			// 			item.roomList.push({
			// 				checked: false,
			// 				type: 0,
			// 				area: ~~ (item.totalArea / value),
			// 				roomNumber: roomNumber++
			// 			})
			// 		}
			// 	}
			// },
			addRoom() {
				const index = this.floorList.length + 1

				this.floorList.push({
					isEdit: true,
					floorNumber: index,
					totalArea: 1000,
					allChecked: false,
					isModify: false,
					companyList: []
				})
			},
			editFloor(index) {
				// 保存当前楼层
				this.save(this.floorList[index])

				this.currentFloorNumber = index
				this.floorList[index].isEdit = true
			},
			deleteFloor(index) {
				this.isDelete = false
				this.floorList.splice(index, 1)
			},
			go() {
				this.$router.push('/lease/add')
			},
			redirectAdd() {
				// 保存在本地
				localStorage.setItem('selectRoom', JSON.stringify(this.selectRoom))

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