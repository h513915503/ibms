<style scoped>
.bootstrap-wrapper {
	padding: 48px 0;
	background-color: #FFF;

	& h1 {
		margin-bottom: 52px;
		color: #4A4A4A;
		text-align: center;
		font-size: 20px;
	}

	& ul {
		display: flex;
		justify-content: space-between;
		width: 500px;
		margin: 0 auto 48px;
		position: relative;
		color: rgba(0, 0, 0, .45);
		font-size: 14px;

		&::after {
			content: "";
			width: 40%;
			height: 1px;
			position: absolute;
			top: 8px;
			left: 80px;
			background-color: rgba(0, 0, 0, .15);
		}
	}

	& li {
		position: relative;

		&::before {
			content: "2";
			width: 32px;
			position: absolute;
			top: -10px;
			left: -44px;
			color: rgba(0, 0, 0, .25);
			text-align: center;
			line-height: 32px;
			border-radius: 50%;
			box-sizing: border-box;
			border: 1px solid currentcolor;
			background-color: transparent;
		}

		& p {
			width: 149px;
			margin-top: 10px;
			line-height: 1.6;
		}
	}

	& li.active {

		&::before {
			content: "1";
			color: #FFF;
			border-width: 0;
			background-color: #1890FF;
		}

		& strong {
			color: rgba(0, 0, 0, .85);
		}

		& p {
			color: rgba(0, 0, 0, .65);
		}
	}

	& .el-button {
		display: block;
		margin: 0 auto;
		font-size: 16px;
	}
}
.btn-wrapper {
	margin-bottom: 24px;
}
.edit-wrapper {
	padding: 24px;
	border: 1px solid #4A90E2;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
	box-sizing: border-box;
}
.operation-wrapper {
	display: flex;
	margin-bottom: 48px;
	color: rgba(0, 0, 0, .75);
	font-size: 16px;

	& .item {
		margin-right: 48px;

		& span {
			margin-right: 8px;
		}
	}

	& .item.area {
		display: flex;
		align-items: center;

		& span {
			flex-shrink: 0;
		}

		& input {
			width: 80px;
			margin-right: 15px;

		}
	}
}
.input {
	padding-bottom: 5px;
	text-align: center;
	border: none;
	border-bottom: 1px solid #D9D9D9;
}
.room-list {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 24px;

	& li {
		width: 128px;
		margin-right: 34px;
		margin-bottom: 34px;
		color: rgba(0, 0, 0, .75);
		font-size: 14px;
		text-align: center;
		border: 1px solid rgba(0, 0, 0, .15);
		border-bottom: none;
	}

	& p {
		line-height: 40px;
		border-bottom: 1px solid rgba(0, 0, 0, .15);
	}
}
.input-wrapper {
	display: flex;
	align-items: center;
	padding: 0 8px 0px;

	& input {
		width: 100%;
		margin-right: 8px;
	}
}
.floor-list li {
	margin-bottom: 16px;
	color: rgba(0, 0, 0, .65);
	font-size: 16px;
	background-color: #FFF;
}
.show-wrapper {
	display: flex;
	align-items: flex-start;
	padding: 17px 24px 0;
	position: relative;

	& .floor-number {
		margin-right: 64px;

		& p {
			margin-bottom: 15px;
		}
	}
}
.show-wrapper:hover .icon-wrapper {
	display: block;
}
.room-wrapper {
	display: flex;
	flex-wrap: wrap;
}
.room-item {
	padding: 15px 12px;
	margin-right: 12px;
	margin-bottom: 17px;
	position: relative;
	border: 1px solid rgba(0, 0, 0, .15);

	& p {
		margin-top: 15px;
	}

	& .el-checkbox {
		position: absolute;
		right: 0;
		top: 0;
	}
}
.icon-wrapper {
	display: none;
	position: absolute;
	top: 17px;
	right: 17px;

	& .icon-more {
		display: inline-block;
		width: 20px;
		height: 20px;
		cursor: pointer;
		background-color: teal;
	}
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
		height: 23px;
	}

	& .icon-delete {
		margin-left: 25px;
	}
}










.company-list {
	margin-top: 30px;

	& li {
		display: flex;
		align-items: flex-start;
		margin-bottom: 24px;
		color: #000;
		font-size: 16px;
		border-bottom: 1px dashed #999;
	}
}
/* .room-list {
	flex: 1;
} */
.info {
	margin-right: 15px;

	& span {
		display: block;
		margin-bottom: 15px;
	}
}
.box {
	display: inline-block;
	min-width: 169px;
	padding: 10px;
	margin-right: 15px;
	margin-bottom: 15px;
	color: #FFF;
	font-size: 14px;
	cursor: pointer;
	box-sizing: border-box;
	background-color: green;

	& p {
		display: flex;
		justify-content: space-between;
	}
}
.company-name {
	margin-top: 10px;
}
</style>
<style>
#lease-wrapper .el-checkbox__inner {
	width: 20px;
	height: 20px;
}
#lease-wrapper .room-item .el-checkbox__inner {
	border-top: none;
	border-right: none;
}
.a{
	border: none !important;
	box-shadow: none !important;
	background-color: transparent !important;

	& .popover-wrapper {
		top: 60px;
		right: 0;
	}
}
</style>

<template>
	<div id="lease-wrapper">
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
			<tab-bar :list="tabs"></tab-bar>

			<div class="btn-wrapper">
				<el-button type="primary" @click="addRoom">+ 房间</el-button>
				<el-button :disabled="! selectRoom.length" @click="redirectAdd">+ 租赁单位</el-button>
			</div>

			<ul class="floor-list">
				<li v-for="(item, index) of floorList">
					<div class="edit-wrapper" v-if="item.isEdit">
						<div class="operation-wrapper">
							<div class="item">
								<span>楼层号：</span>
								<el-input-number v-model="item.floorNumber" :min="1" label="描述文字"></el-input-number>
							</div>
							<div class="item area">
								<span>总面积：</span>
								<input class="input" type="text" v-model="item.totalArea">
								m
							</div>
							<div class="item">
								<span>房间数：</span>
								<el-input-number v-model="item.roomNum" :min="1" label="描述文字" @change="handleRoomChange"></el-input-number>
							</div>
						</div>
						<ul class="room-list">
							<li v-for="items of item.roomList">
								<p v-text="items.roomNumber"></p>
								<p class="input-wrapper">
									<input class="input" type="text" v-model="items.area" @input="handleInputChange(item)">
									m
								</p>
							</li>
						</ul>
						<div>
							<el-button type="primary" @click="handleFloorChange(item, true)">确定</el-button>
							<el-button @click="handleFloorChange(item, false)">取消</el-button>
						</div>
					</div>

					<div class="show-wrapper" v-else>
						<div class="floor-number">
							<p>{{item.floorNumber}}层</p>
							<el-checkbox v-model="item.allChecked" @change="handleCheckboxAll"></el-checkbox>
						</div>
						<div class="room-wrapper">
							<div class="room-item" v-for="it of item.roomList">
								<span v-text="it.roomNumber"></span>
								<p>{{it.area}} m</p>
								<!-- <el-checkbox v-model="item.checked"></el-checkbox> -->
								<input type="checkbox" class="el-checkbox" v-model="it.checked" @change="change(it, item, $event)">
							</div>
						</div>
						<div class="icon-wrapper">
							<el-popover popper-class="a" placement="bottom-end" width="0" trigger="click" @hide="handleDeleteChange(item)">
							  	<div class="icon-more" slot="reference"></div>
							  	<div class="more-icon-wrapper">
									<i class="icon" @click="editFloor(index)">编</i>
									<i class="icon icon-delete" @click="item.isDelete = true">删</i>

									<popover title="确定要删除这层楼么？" content="删除该层楼之后，该楼层的租赁信息、业主信息也会被清空。" v-if="item.isDelete" @ok="deleteFloor(index, item)" @cancel="handleDeleteChange(item)"></popover>
								</div>
							</el-popover>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'
	import popover from '@/components/popover.vue'

	export default {
		data() {
			return {
				index: 0,

				currentFloorNumber: 0,
				floorList: [
					{
						isEdit: true,
						floorNumber: 1,
						totalArea: 1000,
						roomNum: 1,
						allChecked: false,
						isCustom: false,
						isDelete: false,
						roomList: [
							{
								area: 1000,
								roomNumber: 101,
								checked: false
							}
						]
					}
				],

				tabs: [
					{
						number: 1000,
						text: '总面积'
					},
					{
						number: 1000,
						text: '可租赁面积'
					},
					{
						number: 1000,
						text: '入驻单位'
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

		created() {
			//this.$currentFloor = {... this.floorList[0]}
			this.$totalArea = this.floorList[0].totalArea
			this.$roomNum = this.floorList[0].roomNum
			this.$roomList = this.floorList[0].roomList.slice()
		},

		methods: {
			change(it, item, e) {
				const roomList = []

				if (it.checked) {
					const index = this.selectRoom.findIndex((current) => current.floorNumber === item.floorNumber)

					if (index !== -1) {
						this.selectRoom[index].roomList.push(it.roomNumber)
						this.selectRoom[index].isAll = this.selectRoom[index].roomList.length === item.roomList.length
					} else {
						roomList.push(it.roomNumber)

						this.selectRoom.push({
							isAll: roomList.length === item.roomList.length,
							floorNumber: item.floorNumber,
							roomList
						})
					}
				} else {
					this.selectRoom.forEach((current) => {
						if (current.floorNumber === item.floorNumber) {
							current.roomList.splice(current.roomList.findIndex((number) => number === it.roomNumber), 1)
						}
					})

					this.selectRoom.splice(this.selectRoom.findIndex((current) => current.roomList.length === 0), 1)
				}
			},
			handleRoomChange(value) {
				const item = this.floorList[this.currentFloorNumber]

				let num = value
				let roomNumber = + `${item.floorNumber}01`

				if (item.isCustom) {
					const length = item.roomList.length

					// 删除房间
					if (length > value) {
						item.roomList.pop()
					} else {
						item.roomList.push({
							roomNumber: item.roomList[length - 1].roomNumber + 1,
							area: 0,
							checked: false
						})
					}
				} else {
					item.roomList = []

					while (num --) {
						item.roomList.push({
							checked: false,
							area: ~~ (item.totalArea / value),
							roomNumber: roomNumber++
						})
					}
				}
			},
			handleFloorChange(item, value) {
				item.isEdit = false
				item.isCustom = false

				// 撤销更改
				if (! value) {
					item.totalArea = this.$totalArea
					item.roomNum = this.$roomNum
					item.roomList = this.$roomList
				}
			},
			addRoom() {
				this.currentFloorNumber++

				this.floorList.push({
					isEdit: true,
					floorNumber: this.floorList.length + 1,
					totalArea: 1000,
					roomNum: 1,
					allChecked: false,
					isCustom: false,
					isDelete: false,
					roomList: [
						{
							area: 1000,
							roomNumber: + `${this.currentFloorNumber + 1}01`,
							checked: false
						}
					]
				})
			},
			handleInputChange(item) {
				item.isCustom = true
			},
			editFloor(index) {
				// 保存当前楼层
				this.$totalArea = this.floorList[index].totalArea
				this.$roomNum = this.floorList[index].roomNum
				this.$roomList = this.floorList[index].roomList.slice()

				this.currentFloorNumber = index
				this.floorList[index].isEdit = true
			},
			deleteFloor(index, item) {
				this.handleDeleteChange(item)
				this.floorList.splice(index, 1)
			},
			handleCheckboxAll(value) {
				this.floorList[this.currentFloorNumber].roomList.forEach((item) => item.checked = value)
			},
			handleDeleteChange(item) {
				item.isDelete = false
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