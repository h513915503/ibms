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
						<el-button type="primary" @click="redirectAdd" v-if="floorList.length > 1">+ 租赁单位</el-button>
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
									<i class="icon icon-other" @click="showCopy(item.floorNumber)"></i>

									<el-popover popper-class="no-shadow" placement="bottom-end" trigger="click" @hide="popoverModalStatus = false">
									  	<div class="icon-more" slot="reference" @click="currentFloorNumber = item.floorNumber"></div>
									  	<div class="more-icon-wrapper">
											<i class="icon icon-edit" @click="editFloor(index)"></i>
											<i class="icon icon-delete" @click="popoverModalStatus = true"></i>

											<popover name="close" title="确定要删除这层楼么？" content="删除该层楼之后，该楼层的租赁信息、业主信息也会被清空。" :popoverModalStatus.sync="popoverModalStatus">
												<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
												<el-button type="primary" slot="cancel" class="ok" @click="deleteFloor(index)">确定</el-button>
											</popover>
										</div>
									</el-popover>
								</div>

								<copy-floor title="复制楼层到" v-if="copyModalStatus && currentFloorNumber === item.floorNumber" @hide="copyModalStatus = false">
									<el-button slot="ok" @click="copyModalStatus = false">取消</el-button>
									<el-button type="primary" slot="cancel" class="ok" @click="copyFloor(index)">确定</el-button>
								</copy-floor>
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
	import copyFloor from '@/components/copyFloor.vue'

	export default {
		data() {
			return {
				loading: false,
				isDelete: false,
				index: 0,

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

				currentFloorNumber: 0,
				floorList: [
					{
						isEdit: true,
						floorNumber: 1,
						totalArea: 1000,
						companyList: []
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
			copyFloor
		},

		filters: {
			format(value) {
				const date = new Date()

				return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			}
		},

		created() {
			this.save(this.floorList[0])

			this.loading = true
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
			addRoom() {
				const index = this.floorList.slice(-1)[0].floorNumber + 1

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
			showCopy(floorNumber) {
				this.copyModalStatus = true
				this.currentFloorNumber = floorNumber
			},
			copyFloor(index) {
				this.copyModalStatus = false

				const item = JSON.parse(JSON.stringify(this.floorList[index]))

				item.floorNumber = this.floorList.slice(-1)[0].floorNumber + 1

				this.floorList.push(item)
			},
			deleteFloor(index) {
				this.popoverModalStatus = false
				this.floorList.splice(index, 1)
			},
			go() {
				this.$router.push('/lease/add')
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