<style scoped>
.parking-space-wrapper {
	padding: 24px;
}
.btn-add {
	margin-bottom: 24px;
}
.edit-wrapper {
	padding: 24px;
	border: 1px solid #4A90E2;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
	box-sizing: border-box;
	background-color: #FFF;
}
.info {
	display: flex;
	align-items: center;
	padding-bottom: 24px;
	margin-bottom: 24px;
	border-bottom: 2px dashed #E9E9E9;

	& .item {
		margin-right: 50px;
	}

	& .label {
		margin-right: 8px;
	}
}
.info2 {
	display: flex;
	align-items: center;
	margin-bottom: 24px;

	& .label {
		flex-shrink: 0;
		margin-right: 8px;
	}
}
.area-list {
	display: flex;
	flex-wrap: wrap;
	margin-left: 16px;
}
.area-item {
	width: 128px;
	height: 80px;
	margin: 0 25px 25px 0;
	color: rgba(0, 0, 0, .65);
	font-size: 16px;
	border: 1px solid rgba(0, 0, 0, .15);

	& .item:nth-child(1) {
		padding-left: 36px;
		box-sizing: border-box;
		border-bottom: 1px solid #D9D9D9;
	}

	& .item:nth-child(2) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 7px;
	}

	& .input {
		width: 40px;
		height: 30px;
		margin-bottom: 5px;
		border: none;
		color: inherit;
		text-align: center;
		border-bottom: 1px solid #D9D9D9;
	}
}
.more-area {
	width: 128px;
	height: 80px;
	position: relative;
	color: rgba(0, 0, 0, .25);
	cursor: pointer;
	border: 2px dashed rgba(0, 0, 0, .15);

	&::before {
		content: "";
		width: 18px;
		height: 2px;
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: currentcolor;
		transform: translate(-50%, -50%);
	}

	&::after {
		content: "";
		width: 2px;
		height: 18px;
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: currentcolor;
		transform: translate(-50%, -50%);
	}
}

.ok-btn {
	margin-right: 40px;
}

.show-wrapper {
	display: flex;
	position: relative;
	color: rgba(0, 0, 0, .85);
	font-size: 16px;

	& .item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-right: 60px;
	}

	& .num {
		font-size: 24px;
	}

	& .label {
		margin-top: 24px;
	}
}
.show-wrapper:last-child {
	padding-bottom: 0;
	margin-bottom: 0;
	border-bottom: none;
}
.floor-item {
	padding: 20px 24px;
	margin-bottom: 24px;
	position: relative;
	background-color: #FFF;

	& > div:not(.edit-wrapper):last-of-type {
		padding-bottom: 0;
		margin-bottom: 0;
		border-bottom: none;
	}
}

.floor-item:hover .icon-wrapper {
	display: flex;
}
.floor-item.edit:hover .icon-wrapper {
	display: none;
}

.floor-item .icon-wrapper.show-icon-wrapper {
	display: flex;
}
.areas-item {
	padding-bottom: 16px;
	margin-bottom: 16px;
	margin-right: 30px;
	border-bottom: 2px dashed #EEE;
}
.icon-wrapper {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding: 14px 12px;
	position: absolute;
	top: 0;
	right: 0;
	box-sizing: border-box;
	background-image: linear-gradient(to bottom, #E9E9E9 50%, transparent 50%);
	background-repeat: repeat-y;
	background-size: 1px 10px;

	& .icon {
		width: 24px;
		height: 24px;
		cursor: pointer;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
	}
}
.icon-edit {
	background-image: url(~@/assets/edit.png);
}
.icon-delete {
	background-image: url(~@/assets/delete.png);
}
</style>

<template>
	<div class="parking-space-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<el-button class="btn-add" type="primary" @click="forAddParkingPlace">+ 车位</el-button>

			<p class="no-data" v-if="! list.length">暂无车位信息。</p>
			<ul class="list" v-else>
				<li class="floor-item" :class="{edit: item.isEdit}" v-for="(item, index) of list">
					<div class="edit-wrapper" v-if="item.isEdit">
						<div class="info">
							<div class="item">
								<span class="label">楼层号：</span>
								<el-input-number v-model="item.floorNumber" label="描述文字"></el-input-number>
							</div>
							<div class="item">
								<span class="label">车位编排方式：</span>
								<el-radio v-model="item.numberRule" :label="1">按号</el-radio>
	  							<el-radio v-model="item.numberRule" :label="2">按区</el-radio>
							</div>
							<div class="item">
								<span class="label">车位数：</span>
								{{item.numberRule === 1 ? item.endOrder - item.startOrder + 1 : 0}}
							</div>
						</div>
						<div class="info2">
							<span class="label">车位：</span>

	  						<div class="number-wrapper" v-if="item.numberRule === 1">
	  							<el-input-number v-model="item.startOrder" :min="1" label="描述文字"></el-input-number> ~
	  							<el-input-number v-model="item.endOrder" :min="1" label="描述文字"></el-input-number> 号
	  						</div>

	  						<ul class="area-list" v-if="item.numberRule === 2">
	  							<li class="area-item" v-for="area of item.areaList">
	  								<p class="item">
	  									<input class="input index" type="text" v-model="area.areaStr"> 区
	  								</p>
	  								<p class="item">
	  									<input class="input" type="text" v-model="area.startOrder"> ~ <input class="input" type="text" v-model="area.endOrder">
	  								</p>
	  							</li>
	  							<li class="more-area" @click="addArea(item)"></li>
	  						</ul>

						</div>

						<el-button type="primary" :disabled="disabledAdd" class="ok-btn" @click="addParkingPlace(item)">确定</el-button>
						<el-button @click="cancelParkingPlace(item)">取消</el-button>
					</div>

					<template v-else>
						<div class="show-wrapper" v-if="item.numberRule === 1">
							<div class="item">
								{{item.floorNumber}} 层
							</div>
							<div class="item">
								<span class="num" v-text="item.allParkingSpaceCount"></span>
								<p class="label">总车位</p>
							</div>
							<div class="item">
								<span class="num" v-text="item.rentalParkingSpaceCount"></span>
								<p class="label">包月车位</p>
							</div>
							<div class="item">
								<span class="num" v-text="item.temporaryUseParkingSpaceCount"></span>
								<p class="label">临时停放车辆</p>
							</div>
							<div class="item">
								<span class="num" v-text="item.unusedParkingSpaceCount"></span>
								<p class="label">未租空闲车位</p>
							</div>
						</div>
						<template v-else>
							<div class="show-wrapper areas-item" v-for="(area, i) of item.areaList">
								<div class="item">
									{{item.floorNumber}} 层
									<p class="label">{{area.areaStr}} 区</p>
								</div>
								<div class="item">
									<span class="num" v-text="area.allParkingSpaceCount"></span>
									<p class="label">总车位</p>
								</div>
								<div class="item">
									<span class="num" v-text="area.rentalParkingSpaceCount"></span>
									<p class="label">包月车位</p>
								</div>
								<div class="item">
									<span class="num" v-text="area.temporaryUseParkingSpaceCount"></span>
									<p class="label">临时停放车辆</p>
								</div>
								<div class="item">
									<span class="num" v-text="area.unusedParkingSpaceCount"></span>
									<p class="label">未租空闲车位</p>
								</div>
							</div>
						</template>
					</template>

					<section class="icon-wrapper" :class="{'show-icon-wrapper': isShowIconWrapper && currentId === item.floorId}">
						<i class="icon icon-edit" @click="editFloor(item)"></i>
						<i class="icon icon-delete" @click="forDeleteFloor($event, item, index)"></i>
					</section>
				</li>
			</ul>
		</template>

		<popover name="close" title="确定要删除这层楼么？" content="删除该层楼之后，该楼层的车位信息会被清空。" :follow-target="followTarget" v-if="popoverModalStatus" @hide="cancelDeleteFloor">
			<el-button slot="ok" @click="cancelDeleteFloor">取消</el-button>
			<el-button type="primary" slot="cancel" class="ok" @click="deleteFloorService">确定</el-button>
		</popover>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,

				disabledAdd: false,

				currentId: -1,

				isShowIconWrapper: false,
				followTarget: null,
				popoverModalStatus: false,

				list: []
			}
		},

		created() {
			this.loading = true

			this.getList().then(() => {
				this.loading = false
			})
		},

		methods: {
			async getList() {
				const params = {
					action: 'ParkingRental.queryFloorAreaCount'
				}

				const data = await axios.post('/api/field/dispatcher.do', params)

				if (! data) {
					return
				}

				let result = []

				data.data.forEach((item) => {
					if (item.numberRule === 1) {
						item.isEdit = false

						result.push(item)

						return
					}

					const index = result.findIndex((current) => current.floorId === item.floorId)
					const area = {
						areaId: item.areaId,
						areaStr: item.areaStr,
						startOrder: item.startOrder,
						endOrder: item.endOrder,

						allParkingSpaceCount: item.allParkingSpaceCount,
						rentalParkingSpaceCount: item.rentalParkingSpaceCount,
						temporaryUseParkingSpaceCount: item.temporaryUseParkingSpaceCount,
						unusedParkingSpaceCount: item.unusedParkingSpaceCount
					}

					if (index === -1) {
						result.push({
							isEdit: false,
							floorId: item.floorId,
							floorNumber: item.floorNumber,
							numberRule: 2,
							areaList: [area]
						})

					} else {
						result[index].areaList.push(area)
					}
				})

				this.list = result
			},
			forAddParkingPlace() {
				const floorNumber = this.list.length ? Number(this.list.slice(-1)[0].floorNumber) + 1 : 1

				this.$parkingSpace = {
					isEdit: true,
					floorNumber,

					numberRule: 1,
					startOrder: 1,
					endOrder: 10,

					allParkingSpaceCount: 0,
					rentalParkingSpaceCount	: 0,
					temporaryUseParkingSpaceCount: 0,
					unusedParkingSpaceCount: 0,

					areaList: [
						{
							areaStr: '',
							numberStart: '',
							numberEnd: '',

							allParkingSpaceCount: 0,
							rentalParkingSpaceCount	: 0,
							temporaryUseParkingSpaceCount: 0,
							unusedParkingSpaceCount: 0
						}
					]
				}
				this.list.unshift(this.$parkingSpace)

				// 标记是新增
				this.$add = true
			},
			addParkingPlace(item) {
				if (this.$add) {
					// 更新总车位
					if (item.numberRule === 1) {
						item.allParkingSpaceCount = item.endOrder - item.startOrder + 1
					} else {
						item.areaList.forEach((current) => {
							current.allParkingSpaceCount = Number(current.endOrder) - Number(current.startOrder) + 1
						})
					}

					this.addParkingPlaceService()

					return
				}

				if (item.numberRule === 1) {
					item.allParkingSpaceCount = item.endOrder - item.startOrder + 1
				} else {
					item.areaList.forEach((current) => {
						current.allParkingSpaceCount = Number(current.endOrder) - Number(current.startOrder) + 1
					})
				}

				this.editParkingPlaceService(item)
			},
			async addParkingPlaceService() {
				const {floorNumber, numberRule, startOrder, endOrder, areaList} = this.$parkingSpace
				const params = {
					action: 'ParkingRental.addParkingInfo',

					parkingFloorInfo: {
						floorNumber,
						numberRule
					}
				}

				if (numberRule === 1) {
					params.parkingFloorInfo.parkingSpaceInfos = [
						{
							parkingSpaceStartOrder: startOrder,
							parkingSpaceEndOrder: endOrder
						}
					]
				}

				if (numberRule === 2) {
					params.parkingFloorInfo.parkingAreaInfos = areaList.map((item) => {
						return {
							areaNumber: item.areaStr,
							parkingSpaceStartOrder: item.startOrder,
							parkingSpaceEndOrder: item.endOrder
						}
					})
				}

				params.parkingFloorInfo = JSON.stringify(params.parkingFloorInfo)

				this.disabledAdd = true

				const data = await axios.post('/api/field/dispatcher.do', params)

				this.disabledAdd = false

				if (! data) {
					return
				}

				this.$parkingSpace.floorId = data.data.floorId
				this.$parkingSpace.isEdit = false
			},
			async editParkingPlaceService(item) {
				const {floorId, numberRule, startOrder, endOrder, areaList} = item
				const params = {
					action: 'ParkingRental.editParkingInfo',

					parkingFloorInfo: {
						id: floorId,
						numberRule
					}
				}

				if (numberRule === 1) {
					params.parkingFloorInfo.parkingSpaceInfos = [
						{
							parkingSpaceStartOrder: startOrder,
							parkingSpaceEndOrder: endOrder
						}
					]
				}

				if (numberRule === 2) {
					params.parkingFloorInfo.parkingAreaInfos = areaList.map((item) => {
						return {
							areaNumber: item.areaStr,
							id: item.areaId,
							parkingSpaceStartOrder: item.startOrder,
							parkingSpaceEndOrder: item.endOrder
						}
					})
				}

				params.parkingFloorInfo = JSON.stringify(params.parkingFloorInfo)

				this.disabledAdd = true

				const data = await axios.post('/api/field/dispatcher.do', params)

				this.disabledAdd = false

				if (! data) {
					return
				}

				item.isEdit = false
			},
			cancelParkingPlace(item) {
				if (this.$add) {
					this.list.splice(0, 1)

					return
				}

				item.isEdit = false

				// 撤销修改
				item.numberRule = this.$numberRule
				item.floorNumber = this.$floorNumber
				item.startOrder = this.$startOrder
				item.endOrder = this.$endOrder
				item.areaList = JSON.parse(this.$areaList)
			},
			forDeleteFloor(e, item, index) {
				this.isShowIconWrapper = true
				this.$index = index
				this.popoverModalStatus = true
				this.currentId = item.floorId

				this.followTarget = e.target
			},
			async deleteFloorService() {
				const params = {
					action: 'ParkingRental.deleteParkingInfo',
					floorId: this.currentId
				}

				this.popoverModalStatus = false
				this.isShowIconWrapper = false

				const data = await axios.post('/api/field/dispatcher.do', params)

				if (! data) {
					return
				}

				this.list.splice(this.$index, 1)

				this.$index = null
			},
			cancelDeleteFloor() {
				this.popoverModalStatus = false
				this.isShowIconWrapper = false
			},
			editFloor(item) {
				item.isEdit = true

				// 保存信息
				this.$numberRule = item.numberRule
				this.$floorNumber = item.floorNumber
				this.$startOrder = item.startOrder
				this.$endOrder = item.endOrder
				this.$areaList = JSON.stringify(item.areaList)
			},
			addArea(item) {
				item.areaList.push({
					index: '',
					numberStart: '',
					numberEnd: '',

					allParkingSpaceCount: 0,
					rentalParkingSpaceCount	: 0,
					temporaryUseParkingSpaceCount: 0,
					unusedParkingSpaceCount: 0
				})
			}
		}
	}
</script>