<style scoped>
.management-wrapper {
	padding: 24px 24px 24px 0;
	margin: 0 24px;
	position: relative;
	background-color: #FFF;

	& .popover-wrapper {
		width: 312px;
	}
}
.header {
	display: flex;
	padding-left: 24px;
	margin-bottom: 24px;

	& .el-input {
		width: 128px;
		margin-left: auto;
		margin-right: 24px;
	}

	& .add-btn, .search-btn {
		padding: 0 15px;
	}
}
.tips {
	color: rgba(0, 0, 0, .65);
	font-size: 16px;
}
.add-wrapper {
	display: flex;
	justify-content: space-between;
	width: 632px;
	padding: 24px 20px 24px 24px;
	position: absolute;
	z-index: 1;
	top: 72px;
	left: 24px;
	box-sizing: border-box;
	border: 1px solid #0E7CC2;
	background-color: #F5F5F5;

	&::after {
		content: "";
		position: absolute;
		top: -9px;
		left: 30px;
		border-bottom: 8px solid #0E7CC2;
		border-right: 8px solid transparent;
		border-left: 8px solid transparent;
	}
}
.input-wrapper {
	display: block;
	width: 282px;
	height: 282px;
	padding-top: 200px;
	position: relative;
	color: #595959;
	font-size: 20px;
	cursor: pointer;
	text-align: center;
	box-sizing: border-box;
	border: 1px dashed #D9D9D9;
	background-color: #FFF;

	&::before, &::after {
		content: "";
		position: absolute;
		left: 50%;
		background-color: #595959;
		border-radius: 10px;
		transform: translateX(-50%);
	}

	&::before {
		width: 66px;
		height: 5px;
		top: 124px;
	}

	&::after {
		width: 5px;
		height: 66px;
		top: 94px;
	}
}
.input {
	display: none;
}
.info-wrapper {
	flex: 1;
	margin-left: 50px;

	& .floor-list {
		display: flex;
		flex-wrap: wrap;
	}

	& .floor-item {
		width: 24px;
		margin: 0 8px 8px 0;
		color: rgba(0, 0, 0, .25);
		font-size: 12px;
		cursor: pointer;
		text-align: center;
		line-height: 24px;
		border-radius: 2px;
		border: 1px solid #D9D9D9;
		background-color: #FFF;
	}

	& .floor-item.actived {
		color: #FFF;
		background-color: #0E7CC2;
	}
}
.info-item {
	display: flex;
	align-items: flex-start;
	margin-bottom: 24px;

	& .label {
		flex-shrink: 0;
		margin-right: 24px;
		color: rgba(0, 0, 0, .85);
		font-size: 14px;
	}

	& .svg-icon {
		width: 12px;
		height: 12px;
		margin-right: 5px;
	}
}
.info-item:nth-child(n+2) {
	align-items: center;
}

.btn-wrapper {
	margin-left: 50px;
}

.container {
	display: flex;
	height: 600px;
}
.floor-list-wrapper {
	overflow: auto;
	border-right: 1px solid #D9D9D9;

	& .floor-item {
		width: 74px;
		text-align: center;
		color: rgba(0, 0, 0, .65);
		font-size: 14px;
		line-height: 38px;
		cursor: pointer;
	}

	& .floor-item.actived {
		color: #0E7CC2;
		background-color: #E6F9FF;
	}

	& .floor-item:hover {
		opacity: .5;
	}
}
.floor-list-wrapper::-webkit-scrollbar, .gate-list-wrapper::-webkit-scrollbar {
	display: none;
}
.gate-list-wrapper {
	flex: 1;
	padding-left: 24px;
	position: relative;
	overflow: auto;
	/* scroll-behavior: smooth; */
	box-sizing: border-box;
}
.gate-list {
	display: flex;
	flex-wrap: wrap;
}
.gate-item {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 40px;
}
.gate-item:last-child {
	margin-bottom: 0;
}
.gate-wrapper {
	display: flex;
	padding: 24px;
	margin: 0 24px 24px 0;
	cursor: pointer;
	border: 1px solid transparent;
	background-color: #F5F5F5;
}
.gate-wrapper.actived {
	position: relative;
	border-color: #0E7CC2;
	background-color: #FFF;

	&::after {
		content: "";
		position: absolute;
		bottom: -12px;
		left: 50%;
		border-top: 12px solid #0E7CC2;
		border-right: 12px solid transparent;
		border-left: 12px solid transparent;
		transform: translateX(-50%);
	}
}
.icon-wrapper {
	flex-shrink: 0;
	width: 70px;
	padding-right: 24px;
	color: #2FC25B;
	font-size: 12px;
	text-align: center;
	border-right: 1px dashed #D9D9D9;

	& .svg-icon {
		width: 70px;
		height: 70px;
	}
}
.icon-wrapper.warning {
	color: #FAAD14;
}
.icon-wrapper.fault {
	color: #F5222D;
}


.gate-info {
	flex: 1;
	padding-left: 16px;
	color: #595959;
	font-size: 14px;
	box-sizing: border-box;
}
.gate-title {
	margin-bottom: 10px;
	color: #000;
	font-size: 18px;
}
.gate-position {
	margin-bottom: 24px;
	color: #8C8C8C;
	font-size: 12px;
}
.gate-detail {
	display: flex;
	justify-content: space-between;
}
.gate-box-wrapper {
	display: flex;
	width: 100%;
	height: 400px;
	padding: 0 24px;
	margin-top: -14px;
	margin-bottom: 14px;
	overflow: hidden;
	box-sizing: border-box;
	border: 1px solid #0E7CC2;
	background-color: #FFF;
	transition: height .5s;

	& .info {
		margin-right: 24px;
	}

	& .record {
		flex: 1;
	}

	& .el-table {
		background-color: #F5F5F5;
	}
}
.height-enter, .height-leave-active {
	height: 0;
}

.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	color: rgba(0, 0, 0, .85);
	font-size: 14px;
}
.open-btn {
	padding: 5px 10px;
}
.gate-image {
	width: 282px;
	height: 282px;
	margin-bottom: 10px;
	background-color: orange;
}
.info-footer {
	display: flex;
	justify-content: space-between;
	position: relative;
	color: #8C8C8C;
	font-size: 12px;

	& .btn {
		display: inline-block;
		width: 30px;
		height: 30px;
		margin-left: 10px;
		cursor: pointer;
		border-radius: 2px;
		border: 1px solid #0E7CC2;
	}

	& .cancel-btn {
		margin-left: auto;
		border-color: #E8E8E8;
	}
}
.edit .info-footer {
	align-items: center;
}
.edit .title .el-input {
	margin-left: 14px;
}
.operation-wrapper {
	padding: 10px 13px;
	position: absolute;
	top: 50%;
	right: 40px;
	filter: drop-shadow(0 2px 8px rgba(0, 0, 0, .15));
	background-color: #F5F5F5;
	transform: translateY(-50%);

	& span:nth-child(n+2) {
		margin-left: 16px;
	}
}
.record-header {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 50px;
	color: #8C8C8C;
	font-size: 12px;
}
.record-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 16px;
	background-color: #F5F5F5;

	& .el-button, & .el-pagination {
		background-color: transparent;
	}
}
.export-btn {
	padding: 8px 14px;
}

.position-input-wrapper {
	width: 180px;
	height: 24px;
	padding: 5px;
	padding-left: 20px;
	border-radius: 4px;
	box-sizing: border-box;
	border: 1px solid rgba(0, 0, 0, .15);

	& input {
		height: 100%;
		font-size: 12px;
		border: none;
	}
}
.ok-btn {
	background-color: #0E7CC2;
}
</style>
<style>
.management-wrapper .info-wrapper .el-input__inner {
	width: 180px;
	height: 30px;
	line-height: 30px;
}
.management-wrapper .header .el-input__inner {
	width: 128px;
	height: 32px;
	line-height: 32px;
}
.management-wrapper .btn-wrapper .el-button {
	padding: 10px 15px;
}
.management-wrapper .el-table th, .management-wrapper .el-table tr {
	background-color: transparent;
}
.management-wrapper .edit .title .el-input__inner {
	height: 24px;
	line-height: 24px;
}
</style>

<template>
	<div>
		<loading v-if="loading"></loading>

		<template v-else>
			<div class="management-wrapper">
				<header class="header">
					<el-button class="add-btn" type="primary" @click="addShow = true">+ 门禁</el-button>

					<template v-if="list.length">
						<el-input type="text" placeholder="门禁编号" v-model="searchNumber"></el-input>
						<el-button class="search-btn">查询</el-button>
					</template>
				</header>
				<p class="tips" v-if="! list.length">暂无门禁，点击上方按钮添加门禁。</p>

				<div class="add-wrapper" v-if="addShow">
					<label class="input-wrapper">
						<input class="input" type="file" accept="image/*">
						添加点位图
					</label>
					<div class="info-wrapper">
						<div class="info-item">
							<span class="label">
								<svg class="svg-icon">
									<use xlink:href="#floor"></use>
								</svg>
								楼层
							</span>
							<ul class="floor-list">
								<li class="floor-item" :class="{actived: floorNumber === item.floorNumber}" v-for="item of floorList" v-text="item.floorNumber" @click="floorNumber = item.floorNumber"></li>
							</ul>
						</div>
						<div class="info-item">
							<span class="label">
								<svg class="svg-icon">
									<use xlink:href="#number"></use>
								</svg>
								编号
							</span>
							<el-input type="text" placeholder="请输入门禁编号" v-model="number"></el-input>
						</div>
						<div class="info-item">
							<span class="label">
								<svg class="svg-icon">
									<use xlink:href="#position"></use>
								</svg>
								位置
							</span>
							<el-input type="text" placeholder="请输入电梯的详细位置" v-model="position"></el-input>
						</div>
						<div class="btn-wrapper">
							<el-button class="add-btn" type="primary" :disabled="addEntranceGuardBtnDisabled" @click="addEntranceGuard">保存</el-button>
							<el-button class="add-btn" @click="addShow = false">取消</el-button>
						</div>
					</div>
				</div>

				<div class="container">
					<div class="floor-list-wrapper">
						<ul class="floor-list">
							<li class="floor-item" v-for="item of floorList" @click="translateGateList(item.floorNumber)">{{item.floorNumber}}F</li>
						</ul>
					</div>

					<div class="gate-list-wrapper" ref="gate-list-wrapper">
						<ul class="gate-list">
							<li class="gate-item" v-for="(items, indexs) of gateList" :data-number="items.floorNumber" ref="gate-item">
								<template v-for="(item, index) of items.list">
									<div class="gate-wrapper" :class="{actived: currentGateId === item.id}" :data-index="indexs" @click="showDetail($event, item, index, items.list)">
										<div class="icon-wrapper">
											<svg class="svg-icon success">
												<use xlink:href="#type-3-success"></use>
											</svg>
											正常通行
										</div>
										<div class="gate-info">
											<h4 class="gate-title" v-text="item.number"></h4>
											<p class="gate-position" v-text="item.position"></p>
											<p class="gate-detail">
												人流量（人/分钟）
												<span v-text="item.ren"></span>
											</p>
										</div>
									</div>

									<transition name="height">
										<div class="gate-box-wrapper" v-if="item.show">

											<div class="info edit" v-if="item.isEdit">
												<h4 class="title">
													{{item.floorNumber}}F
													<el-input type="text" v-model="numberEdit" placeholder="回车确认"></el-input>
												</h4>
												<div class="gate-image"></div>
												<div class="info-footer">
													<div class="position-input-wrapper">
														<input type="text" v-model="positionEdit" placeholder="回车确认" />
													</div>
													<div class="btn cancel-btn" @click="item.isEdit = false">取消</div>
													<div class="btn ok-btn">确定</div>
												</div>
											</div>
											<div class="info" v-else>
												<h4 class="title">
													{{item.number}}
													<el-button class="open-btn">开门</el-button>
												</h4>
												<div class="gate-image"></div>
												<div class="info-footer">
													{{item.position}}
													<div class="operation-wrapper" v-if="operationModalStatus" ref="operation-wrapper">
														<span>编辑</span>
														<span @click="forDelGate">删除</span>
													</div>
													<span class="more-btn" @click="showOperation">更多</span>
												</div>
											</div>

											<div class="record">
												<span class="record-header" @click="hideDetail(item)">收起</span>

												<el-table :data="recordList">
													<el-table-column prop="time" label="卡号" sortable='custom'></el-table-column>
													<el-table-column prop="number" label="姓名"></el-table-column>
													<el-table-column prop="position" label="所在单位/到访单位" width="200"></el-table-column>
													<el-table-column prop="way" label="通行方式"></el-table-column>
													<el-table-column prop="out" label="出/入"></el-table-column>
												</el-table>
												<footer class="record-footer">
													<el-button class="export-btn">导出</el-button>
													<el-pagination small layout="prev, pager, next" :total="pageTotal"></el-pagination>
												</footer>
											</div>
										</div>
									</transition>
								</template>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</template>

		<popover name="close" title="确定要删除该门禁么？" :offsetX="0" :offsetY="0" content="删除该门禁后，该门禁的所有数据将被清空。" :follow-target="followTarget" ref="popover" v-if="popoverModalStatus" @hide="popoverModalStatus = false">
			<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
			<el-button type="primary" slot="cancel" @click="delGate">确定</el-button>
		</popover>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,

				addShow: false,

				searchNumber: '',

				followTarget: null,
				popoverModalStatus: false,

				floorNumber: '',
				number: '',
				position: '',
				floorList: [],

				list: [
					{
						number: '10F - 1号门 - 1号闸机',
						position: '10F 电梯左侧'
					}
				],

				numberEdit: '',
				positionEdit: '',

				operationModalStatus: false,

				currentGateId: '',
				recordList: [
					{
						time: '00E2E63120',
						number: '10F - 1号门 - 3号闸机',
						position: '10F 电梯右侧',
						way: '人脸识别',
						out: '出'
					},
					{
						time: '00E2E63120',
						number: '10F - 1号门 - 3号闸机',
						position: '10F 电梯右侧',
						way: '人脸识别',
						out: '出'
					},
					{
						time: '00E2E63120',
						number: '10F - 1号门 - 3号闸机',
						position: '10F 电梯右侧',
						way: '人脸识别',
						out: '出'
					}
				],
				page: 1,
				pageTotal: 100,
				gateList: [
					{
						floorNumber: 10,
						list: [{
							number: '10F - 1号门 - 1号闸机',
							id: 1,
							show: false,
							isEdit: false,
							position: '10F 电梯左侧',
							ren: 123,
							floorNumber: 10
						},
						{
							number: '10F - 1号门 - 1号闸机',
							id: 12,
							show: false,
							isEdit: false,
							position: '10F 电梯左侧',
							ren: 123,
							floorNumber: 10
						},
						{
							number: '10F - 1号门 - 1号闸机',
							id: 13,
							show: false,
							isEdit: false,
							position: '10F 电梯左侧',
							ren: 123,
							floorNumber: 10
						},
						{
							number: '10F - 1号门 - 1号闸机',
							id: 14,
							show: false,
							isEdit: false,
							position: '10F 电梯左侧',
							ren: 123,
							floorNumber: 10
						},
						{
							number: '10F - 1号门 - 1号闸机',
							id: 15,
							show: false,
							isEdit: false,
							position: '10F 电梯左侧',
							ren: 123,
							floorNumber: 10
						}]
					},
				 	{
				 		floorNumber: 9,
				 		list: [{
							number: '9F - 1号门 - 1号闸机',
							id: 65453,
							show: false,
							isEdit: false,
							position: '9F 电梯左侧',
							ren: 123,
							floorNumber: 9
						},
						{
							number: '9F - 1号门 - 1号闸机',
							id: 623,
							show: false,
							isEdit: false,
							position: '9F 电梯左侧',
							ren: 123,
							floorNumber: 9
						},
						{
							number: '9F - 1号门 - 1号闸机',
							id: 67,
							show: false,
							isEdit: false,
							position: '9F 电梯左侧',
							ren: 123,
							floorNumber: 9
						},
						{
							number: '9F - 1号门 - 1号闸机',
							id: 65,
							show: false,
							isEdit: false,
							position: '9F 电梯左侧',
							ren: 123,
							floorNumber: 9
						},
						{
							number: '9F - 1号门 - 1号闸机',
							id: 63,
							show: false,
							isEdit: false,
							position: '9F 电梯左侧',
							ren: 123,
							floorNumber: 9
						},
						{
							number: '9F - 1号门 - 1号闸机',
							id: 62,
							show: false,
							isEdit: false,
							position: '9F 电梯左侧',
							ren: 123,
							floorNumber: 9
						},
						{
							number: '9F - 1号门 - 1号闸机',
							id: 61,
							show: false,
							isEdit: false,
							position: '9F 电梯左侧',
							ren: 123,
							floorNumber: 9
						}],
				 	},
				 	{
				 		floorNumber: 11,
				 		list: [{
							number: '11F - 1号门 - 1号闸机',
							id: 654444,
							show: false,
							isEdit: false,
							position: '11F 电梯左侧',
							ren: 123,
							floorNumber: 11
						},
						{
							number: '11F - 1号门 - 1号闸机',
							id: 65422,
							show: false,
							isEdit: false,
							position: '11F 电梯左侧',
							ren: 123,
							floorNumber: 11
						},
						{
							number: '11F - 1号门 - 1号闸机',
							id: 6546,
							show: false,
							isEdit: false,
							position: '11F 电梯左侧',
							ren: 123,
							floorNumber: 11
						},
						{
							number: '11F - 1号门 - 1号闸机',
							id: 6543,
							show: false,
							isEdit: false,
							position: '11F 电梯左侧',
							ren: 123,
							floorNumber: 11
						},
						{
							number: '11F - 1号门 - 1号闸机',
							id: 6542,
							show: false,
							isEdit: false,
							position: '11F 电梯左侧',
							ren: 123,
							floorNumber: 11
						}]
				 	}]
			}
		},

		computed: {
			addEntranceGuardBtnDisabled() {
				if (this.floorNumber && this.number && this.position) {
					return false
				}

				return true
			}
		},

		created() {
			this.loading = true

			this.getFloorList().then(() => {
				this.loading = false
			})
		},

		methods: {
			async getFloorList() {
				const params = {
					action: 'OfficeRental.queryAllRentalInfo'
				}

				const data = await axios.post('/capi/dispatcher.do', params)

				if (! data) {
					return
				}

				this.floorList = data.data
			},
			addEntranceGuard() {
				this.list.push({
					number: this.number,
					floorNumber: this.floorNumber,
					position: this.position
				})

				//this.addEntranceGuardService()
				this.addShow = false
			},
			translateGateList(floorNumber) {
				let start = 0
				const during = 40
				const maxTop = this.$refs['gate-item'].find((item) => item.dataset.number === floorNumber).offsetTop
				const scrollTop = this.$refs['gate-list-wrapper'].scrollTop

				const run = () => {
					start++

					this.$refs['gate-list-wrapper'].scrollTop = this.easeInOut(start, scrollTop, maxTop - scrollTop,  during)

					if (start < during) {
						requestAnimationFrame(run)
					}
				}

				run()
			},
			easeInOut: function(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	            return -c / 2 * ((--t) * (t-2) - 1) + b;
	        },
	        showDetail(e, item, index, list) {
				// 全部隐藏
				this.gateList.forEach((gate) => gate.list.forEach((item) => item.show = false))

				this.currentGateId = item.id

				// 103 是 card-item 的 height
				let target = e.target

				while(target.className !== 'gate-wrapper') {
					target = target.parentNode
				}

				const width = this.$refs['gate-item'][target.dataset.index].offsetWidth
				const height = this.$refs['gate-item'][target.dataset.index].offsetHeight
				const aa = ~~ (width / (330 + 24))
				const lineNum = height / 157

				let i

				const indexArr = []
				let start = 0

				while(list.slice(start, start + aa).length) {
					indexArr.push(list.slice(start, start + aa))
					start += aa

				}

				const bb = indexArr.findIndex((items) => items.find((current) => current.id === item.id))

				indexArr[bb].slice(-1)[0].show = true

				// this.$nextTick(() => {
				// 	this.$refs['record-wrapper'][0].scrollIntoView({behavior: 'smooth', block: 'center'})
				// })
			},
			hideDetail(item) {
				item.show = false
				this.currentGateId = -1
			},
			forEdit(item) {
				item.isEdit = true

				this.numberEdit = item.number
				this.positionEdit = item.position
			},
			showOperation() {
				this.operationModalStatus = true

				this.$nextTick(() => {
					const clickHandler = (e) => {
						if (this.$refs['operation-wrapper'][0].contains(e.target)) {
							return
						}

						this.operationModalStatus = false

						document.removeEventListener('click', clickHandler, true)
					}

					document.addEventListener('click', clickHandler, true)
				})
			},
			forDelGate(e) {
				this.popoverModalStatus = true
				this.followTarget = e.target
			},
			delGate() {

			}
		}
	}
</script>