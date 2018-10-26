<style scoped>
.parking-space {
	padding: 24px;
}
.el-button {
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
	display: flex;
}
.icon-wrapper {
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
}
</style>

<template>
	<div class="parking-space">
		<el-button type="primary" @click="add">+ 车位</el-button>

		<p class="no-data" v-if="! list.length">暂无车位信息。</p>
		<ul class="list" v-else>
			<li :class="{area: item.type === 1}" v-for="item of list">
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
						<el-radio v-model="item.type" :label="0">按号</el-radio>
  						<el-radio v-model="item.type" :label="1">按区</el-radio>

  						<div class="number-wrapper" v-if="item.type === 0">
  							<el-input-number v-model="item.numberStart" @change="handleNumberStartChange" :min="1" :max="item.parkingSpaceNum" label="描述文字"></el-input-number> ~
  							<el-input-number v-model="item.numberEnd" @change="handleNumberEndChange" :min="1" :max="item.parkingSpaceNum" label="描述文字"></el-input-number> 号
  						</div>

  						<ul class="area-list" v-if="item.type === 1">
  							<li class="area-item" v-for="area of item.areaList">
  								<p>
  									<input class="index" type="text" v-model="area.index"> 区
  								</p>
  								<p>
  									<input type="text" v-model="area.numberStart"> ~ <input type="text" v-model="area.numberEnd">
  								</p>
  							</li>
  							<li class="more-area" v-if="item.type === 1" @click="addArea(item)"></li>
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
							<span @click="edit(item)">编</span>
							<span @click="edit(item)">辑</span>
						</div>
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
								<span @click="edit(item)">编辑</span>
							</div>
						</div>
					</template>
				</template>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},

		methods: {
			add() {
				this.list.unshift({
					isEdit: true,
					type: 0,
					numberStart: 1,
					numberEnd: 30,
					floorNumber: 1,
					parkingSpaceNum: 30,

					num1: 0,
					num2: 0,
					num3: 30,

					areaList: [
						{
							index: 'A',
							numberStart: 1,
							numberEnd: 30
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
				let i = item.areaList.length + 1


				while (start++ < 122) {
					zi.push(String.fromCharCode(start))
				}

				zi = zi.map((item) => item.toUpperCase())

				item.areaList = []

				let average = item.parkingSpaceNum / i
				while (i--) {
					// let end = item.parkingSpaceNum
					// let start = end - average + 1

					// if (i !== 0) {
					// 	start = end + 1
					// 	end =
					// }


					item.areaList.unshift({
						index: zi[i],
						numberStart: 1,
						numberEnd: 30
					})
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