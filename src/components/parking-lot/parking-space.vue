<style scoped>
.parking-space {
	padding: 24px;
}
.btn-add {
	margin-bottom: 24px;
}
.list li {
	margin-bottom: 24px;
	background-color: #FFF;
}
.list li.area {
	padding: 0 24px;

	& .show-wrapper {
		padding: 24px 0;
		margin-bottom: 24px;
		border-bottom: 1px dashed #E9E9E9;
	}

	& .show-wrapper:last-child {
		border-bottom: none;
	}

	& .icon-wrapper {
		right: -24px;
	}
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
	margin-bottom: 50px;

	& .item {
		margin-right: 50px;

		& > span {
			margin-right: 8px;
		}
	}
}
.info2 {
	& span {
		margin-right: 8px;
	}
}
.number-wrapper {
	margin: 16px 0 50px 53px;
}

.area-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 15px;
	margin-left: 53px;
}
.area-item {
	width: 128px;
	height: 80px;
	margin: 0 25px 25px 0;
	color: rgba(0, 0, 0, .65);
	font-size: 16px;
	border: 1px solid rgba(0, 0, 0, .15);

	& p:nth-child(1) {
		padding-left: 36px;
		box-sizing: border-box;
		border-bottom: 1px solid #D9D9D9;
	}

	& p:nth-child(2) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 7px;
	}

	& input {
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
	cursor: pointer;
	border: 1px dashed rgba(0, 0, 0, .15);
}

.ok-btn {
	margin-right: 40px;
}

.show-wrapper {
	display: flex;
	padding: 20px 24px;
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

	& p {
		margin-top: 24px;
	}
}
.show-wrapper:hover .icon-wrapper {
	display: block;
}
/* .icon-wrapper {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 50px;
	height: 100%;
	padding: 20px 0;
	position: absolute;
	top: 0;
	right: 0;
	box-sizing: border-box;
	border-left: 1px dashed #E9E9E9;
} */


.icon-wrapper {
	display: none;
	height: 100%;
	padding: 14px 12px;
	position: absolute;
	top: 0;
	right: 0;
	box-sizing: border-box;
	background-image: linear-gradient(to bottom, #E9E9E9 50%, transparent 50%);
	background-repeat: repeat-y;
	background-size: 1px 10px;

	& .icon-more {
		display: inline-block;
		width: 20px;
		height: 20px;
		cursor: pointer;
		background: url(~@/assets/more.png) center no-repeat;
		background-size: 100%;
	}
}
.icon-other {
	display: block;
	width: 20px;
	height: 20px;
	margin-bottom: 28px;
	cursor: pointer;
	background: url(~@/assets/other.png) center no-repeat;
	background-size: 100%;
}
.more-icon-wrapper {
	display: flex;
	padding: 13px 21px;
	position: absolute;
	bottom: 0;
	right: 30px;
	border-radius: 4px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .15);
	background-color: #F5F5F5;

	& .icon {
		width: 24px;
		height: 24px;
	}

	& .icon-delete {
		margin-left: 25px;
	}

	& .popover-wrapper {
		top: 80px;
		right: 0;
	}
}
.icon-edit {
	cursor: pointer;
	background: url(~@/assets/edit.png) center no-repeat;
	background-size: 100%;
}
.icon-delete {
	cursor: pointer;
	background: url(~@/assets/delete.png) center no-repeat;
	background-size: 100%;
}
.copy-wrapper {
	top: 120px;
	right: 20px;
}
</style>

<template>
	<div class="parking-space">
		<el-button class="btn-add" type="primary" @click="add">+ 车位</el-button>

		<p class="no-data" v-if="! list.length">暂无车位信息。</p>
		<ul class="list" v-else>
			<li :class="{area: type === 1}" v-for="(item, index) of list">
				<div class="edit-wrapper" v-if="item.isEdit">
					<div class="info">
						<div class="item">
							<span>楼层号：</span>
							<el-input-number v-model="item.floorNumber" @change="handleFloorNumberChange" label="描述文字"></el-input-number>
						</div>
						<div class="item">
							<span>车位数：</span>
							<el-input-number v-model="item.parkingSpaceNum" @change="handleParkingSpaceNumChange" label="描述文字"></el-input-number>
						</div>
					</div>
					<div class="info2">
						<span>车位：</span>
						<el-radio v-model="type" :label="0">按号</el-radio>
  						<el-radio v-model="type" :label="1">按区</el-radio>

  						<div class="number-wrapper" v-if="item.type === 0">
  							<el-input-number v-model="item.numberStart" @change="handleNumberStartChange" :min="1" :max="item.parkingSpaceNum" label="描述文字"></el-input-number> ~
  							<el-input-number v-model="item.numberEnd" @change="handleNumberEndChange" :min="1" :max="item.parkingSpaceNum" label="描述文字"></el-input-number> 号
  						</div>

  						<ul class="area-list" v-if="type === 1">
  							<li class="area-item" v-for="area of item.areaList">
  								<p>
  									<input class="index" type="text" v-model="area.index"> 区
  								</p>
  								<p>
  									<input type="text" v-model="area.numberStart"> ~ <input type="text" v-model="area.numberEnd">
  								</p>
  							</li>
  							<li class="more-area" v-if="isAdd" @click="addArea(item)"></li>
  						</ul>

					</div>

					<el-button type="primary" class="ok-btn" @click="confirm(item)">确定</el-button>
					<el-button @click="cancel(item)">取消</el-button>
				</div>

				<template v-else>
					<div class="show-wrapper" v-if="item.type === 0">
						<div class="item">
							{{item.floorNumber}}层
						</div>
						<div class="item">
							<span class="num" v-text="item.parkingSpaceNum"></span>
							<p>总车位</p>
						</div>
						<div class="item">
							<span class="num" v-text="item.num1"></span>
							<p>包月车位</p>
						</div>
						<div class="item">
							<span class="num" v-text="item.num2"></span>
							<p>临时停放车辆</p>
						</div>
						<div class="item">
							<span class="num" v-text="item.num3"></span>
							<p>未租空闲车位</p>
						</div>

						<div class="icon-wrapper">
							<i class="icon icon-other" @click="showCopy(item.floorNumber)"></i>

							<el-popover popper-class="no-shadow" placement="bottom-end" trigger="click" @hide="isDelete = false">
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

						<copy-floor title="复制车位到" v-if="copyModalStatus && currentFloorNumber === item.floorNumber" @hide="copyModalStatus = false">
							<el-button slot="ok" @click="copyModalStatus = false">取消</el-button>
							<el-button type="primary" slot="cancel" class="ok" @click="copyFloor(index)">确定</el-button>
						</copy-floor>
					</div>
					<template v-else>
						<div class="show-wrapper" v-for="area of item.areaList">
							<div class="item">
								{{item.floorNumber}}层
								<p>{{area.index}} 区</p>
							</div>
							<div class="item">
								<span class="num" v-text="item.parkingSpaceNum"></span>
								<p>总车位</p>
							</div>
							<div class="item">
								<span class="num" v-text="item.num1"></span>
								<p>包月车位</p>
							</div>
							<div class="item">
								<span class="num" v-text="item.num2"></span>
								<p>临时停放车辆</p>
							</div>
							<div class="item">
								<span class="num" v-text="item.num3"></span>
								<p>未租空闲车位</p>
							</div>

							<div class="icon-wrapper">
								<i class="icon icon-other" @click="showCopy(item.floorNumber)"></i>

								<el-popover popper-class="no-shadow" placement="bottom-end" trigger="click" @hide="isDelete = false">
								  	<div class="icon-more" slot="reference" @click="currentFloorNumber = item.floorNumber"></div>
								  	<div class="more-icon-wrapper">
										<i class="icon icon-edit" @click="editFloor(index)"></i>
										<i class="icon icon-delete" @click="popoverModalStatus = true"></i>

										<popover name="close" title="确定要删除这层楼么？" content="删除该层楼之后，该楼层的租赁信息、业主信息也会被清空。" v-if="isDelete && item.floorNumber === currentFloorNumber">
											<el-button slot="ok" @click="isDelete = false">取消</el-button>
											<el-button type="primary" slot="cancel" class="ok" @click="deleteFloor(index)">确定</el-button>
										</popover>
									</div>
								</el-popover>
							</div>

							<!-- <copy-floor v-if="copyModalStatus && currentFloorNumber === item.floorNumber" @hide="copyModalStatus = false">
								<el-button slot="ok" @click="copyModalStatus = false">取消</el-button>
								<el-button type="primary" slot="cancel" class="ok" @click="copyFloor(index)">确定</el-button>
							</copy-floor> -->
						</div>
					</template>
				</template>
			</li>
		</ul>
	</div>
</template>

<script>
	import copyFloor from '@/components/copyFloor.vue'

	export default {
		data() {
			return {
				currentFloorNumber: 0,
				isDelete: false,

				copyModalStatus: false,
				popoverModalStatus: false,

				type: 0,
				list: []
			}
		},

		computed: {
			isAdd() {
				return this.type === 1
			}
		},

		components: {
			copyFloor
		},

		methods: {
			add() {
				const floorNumber = this.list.length ? this.list.slice(0)[0].floorNumber + 1 : 1

				this.list.unshift({
					isEdit: true,
					type: 0,
					numberStart: 1,
					numberEnd: 10,
					floorNumber,
					parkingSpaceNum: 10,

					num1: 0,
					num2: 0,
					num3: 30,

					areaList: [
						{
							index: 'A',
							numberStart: 1,
							numberEnd: 10
						}
					]
				})
			},
			edit(item) {
				item.isEdit = true

				// 保存信息
				this.$type = item.type
				this.$floorNumber = item.floorNumber
				this.$parkingSpaceNum = item.parkingSpaceNum
				this.$numberStart = item.numberStart
				this.$numberEnd = item.numberEnd
			},
			editFloor(index) {
				this.list[index].isEdit = true
			},
			deleteFloor() {

			},
			showCopy(floorNumber) {
				this.copyModalStatus = true
				this.currentFloorNumber = floorNumber
			},
			copyFloor(index) {
				this.copyModalStatus = false

				const item = JSON.parse(JSON.stringify(this.list[index]))

				item.floorNumber = this.list.slice(0)[0].floorNumber + 1

				this.list.unshift(item)
			},
			handleFloorNumberChange() {

			},
			handleParkingSpaceNumChange() {

			},
			handleNumberStartChange() {

			},
			handleNumberEndChange() {

			},
			addArea(item) {
				let start = 96
				let zi = []
				let i = 0//item.areaList.length + 1
				let max = item.areaList.length + 1


				while (start++ < 122) {
					zi.push(String.fromCharCode(start))
				}

				zi = zi.map((item) => item.toUpperCase())

				item.areaList = []

				let average = Math.ceil(item.parkingSpaceNum / max)

				while (i < max) {
					let start = 1
					let end = average

					if (i !== 0) {
						// start = average + 1
						// end = start + average

						start = item.areaList[i - 1].numberEnd + 1
						end = start + average - 1
					}

					if (i === max - 1) {
						end = item.parkingSpaceNum
					}


					item.areaList.push({
						index: zi[i],
						numberStart: start,
						numberEnd: end
					})

					i++
				}
			},
			confirm(item) {
				item.isEdit = false
			},
			cancel(item) {
				item.isEdit = false

				// 撤销修改
				item.type = this.$type
				item.floorNumber = this.$floorNumber
				item.parkingSpaceNum = this.$parkingSpaceNum
				item.numberStart = this.$numberStart
				item.numberEnd = this.$numberEnd
			}
		}
	}
</script>