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
.uploading-image {
	width: 282px;
	height: 282px;
	object-fit: cover;
}
.uploading {
	width: 282px;
	line-height: 282px;
	color: #8C8C8C;
	text-align: center;
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
	width: 327px;
	padding: 24px;
	margin: 0 24px 24px 0;
	box-sizing: border-box;
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
	align-items: center;

	& .count {
		margin-left: auto;
	}
}
.gate-box-wrapper {
	display: flex;
	width: 100%;
	height: 410px;
	padding: 0 24px 24px;
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
		position: relative;
		overflow: auto;
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
	object-fit: cover;
}
.info-footer {
	display: flex;
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
	cursor: pointer;
	filter: drop-shadow(0 2px 8px rgba(0, 0, 0, .15));
	background-color: #F5F5F5;
	transform: translateY(-50%);

	& span:nth-child(n+2) {
		margin-left: 16px;
	}
}
.more-btn {
	margin-left: auto;
	cursor: pointer;
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
.no-data {
	flex: 1;
	padding-top: 100px;
	text-align: center;
}
.call-input {
	display: block;
	margin: -5px 0 5px 0;
	color: #595959;
	font-size: 12px;
	text-align: center;
	cursor: pointer;
}
.svg-icon {
	width: 14px;
	height: 10px;
	margin-right: 8px;
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
.management-wrapper .el-table td {
	padding: 10px 0;
	border-bottom: none;
}
.management-wrapper .el-table .el-date-editor.el-input {
	width: 68px;
	padding: 0;
}
#app .management-wrapper .el-table .el-input__inner {
	width: 68px;
	padding: 0 0 0 27px;
	height: 24px;
	line-height: 24px;
	font-size: 10px;
}
.management-wrapper .date-picker {
	display: inline-block;
	margin-right: 5px;
	vertical-align: middle;
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
						<el-input type="text" placeholder="门禁编号" v-model="searchNumber" @keyup.native.enter="search"></el-input>
						<el-button :disabled="disabled" class="search-btn" @click="search">查询</el-button>
					</template>
				</header>
				<p class="tips" v-if="! list.length">暂无门禁，点击上方按钮添加门禁。</p>

				<div class="add-wrapper" v-if="addShow">
					<label class="input-wrapper" v-if="uploadingIndex === 0">
						<input class="input" type="file" accept="image/*" @change="handleChange">
						添加点位图
					</label>
					<p class="uploading" v-if="uploadingIndex === 1">上传中...</p>
					<img class="uploading-image" :src="image" v-if="uploadingIndex === 2">

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
							<el-button class="add-btn" @click="cancelAddEntranceGuard">取消</el-button>
						</div>
					</div>
				</div>

				<div class="container">
					<div class="floor-list-wrapper">
						<ul class="floor-list">
							<li class="floor-item" :class="{actived: currentFloorNumber === + item.floorNumber}" v-for="item of floorList" @click="translateGateList(item.floorNumber)">{{item.floorNumber}}F</li>
						</ul>
					</div>

					<div class="gate-list-wrapper" ref="gate-list-wrapper" v-if="gateList.length">
						<ul class="gate-list">
							<li class="gate-item" v-for="(items, indexs) of gateList" :data-number="items.floorNumber" ref="gate-item">
								<template v-for="(item, index) of items.list">
									<div class="gate-wrapper" :class="{actived: currentGateId === item.recordId}" :data-index="indexs" @click="showDetail($event, item, index, indexs, items.list)">
										<div class="icon-wrapper" :class="{warning: ! item.online, fault: item.online && item.alarmstate}">
											<svg class="svg-icon success">
												<use xlink:href="#type-3-success"></use>
											</svg>
											正常通行
										</div>
										<div class="gate-info">
											<h4 class="gate-title">{{item.floorId}}F-{{item.childName}}</h4>
											<p class="gate-position">
												<svg class="svg-icon">
													<use xlink:href="#location"></use>
												</svg>
												{{item.floorId}}F {{item.address}}</p>
											<p class="gate-detail">
												<svg class="svg-icon">
													<use xlink:href="#people"></use>
												</svg>
												人流量（人/分钟）
												<span class="count" v-text="item.peopleCount"></span>
											</p>
										</div>
									</div>

									<transition name="height">
										<div class="gate-box-wrapper" v-if="item.show">

											<div class="info edit" v-if="currentGate.isEdit">
												<h4 class="title">
													{{currentGate.floorId}}F
													<el-input type="text" v-model="numberEdit" placeholder="回车确认"></el-input>
												</h4>
												<img :src="currentGate.imageUrl" class="gate-image">
												<label class="call-input">
													<input class="input" type="file" accept="image/*" @change="handleChange($event, 1)">
													更换点位图
												</label>
												<div class="info-footer">
													<div class="position-input-wrapper">
														<input type="text" v-model="positionEdit" placeholder="回车确认" />
													</div>
													<div class="btn cancel-btn" @click="currentGate.isEdit = false">取消</div>
													<div class="btn ok-btn" @click="editGateService">确定</div>
												</div>
											</div>
											<div class="info" v-else>
												<h4 class="title">
													{{currentGate.childName}}
													<el-button class="open-btn" :disabled="item.disabled" @click="openDoor(item)">开门</el-button>
												</h4>
												<img :src="currentGate.imageUrl" class="gate-image">
												<div class="info-footer">
													<svg class="svg-icon">
														<use xlink:href="#location"></use>
													</svg>
													{{item.floorId}}F {{currentGate.address}}
													<div class="operation-wrapper" v-if="operationModalStatus" ref="operation-wrapper">
														<span @click="forEdit(item)">编辑</span>
														<span @click="forDelGate">删除</span>
													</div>
													<span class="more-btn" @click="showOperation">更多</span>
												</div>
											</div>

											<div class="record">
												<span class="record-header" @click="hideDetail(item)">收起</span>

												<loading v-if="recordLoading"></loading>
												<template v-else>
													<el-table :data="recordList" @sort-change="sortChange">
														<el-table-column sortable='custom' width="140" :render-header="renderHeader">
															<template slot-scope="scope">
																{{scope.row.punchTime | timeFormat}}
															</template>
														</el-table-column>

														<el-table-column prop="accountName" label="姓名"></el-table-column>
														<el-table-column prop="rentalCompany" label="所在单位/到访单位" :show-overflow-tooltip="true"></el-table-column>
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
													<footer class="record-footer" v-if="recordList.length">
														<el-button class="export-btn">导出</el-button>
														<el-pagination small layout="prev, pager, next" :page-size="5" :current-page="page" :total="recordPageTotal" @current-change="pageChange"></el-pagination>
													</footer>
												</template>
											</div>
										</div>
									</transition>
								</template>
							</li>
						</ul>
					</div>

					<p class="no-data" v-if="noData !== -1">大哥，没有数据</p>
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

				clickDisabled: false,
				disabled: false,
				addShow: false,

				searchNumber: '',

				followTarget: null,
				popoverModalStatus: false,

				currentFloorNumber: '',
				floorNumber: '',

				// 点位图
				image: '',
				uploadingIndex: 0,

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
				currentGate: {},
				recordList: [],
				recordPageTotal: 1,
				recordTime: '',
				recordLoading: false,

				noData: -1,
				page: 1,
				pageTotal: 100,
				gateList: []
			}
		},

		computed: {
			addEntranceGuardBtnDisabled() {
				if (this.clickDisabled) {
					return true
				}

				if (this.image && this.floorNumber && this.number && this.position) {
					return false
				}

				return true
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

				return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`.replace(/\b(\w)\b/g, '0$1')
			}
		},

		watch: {
			recordTime(value) {
				this.getRecordList()
			}
		},

		created() {
			this.loading = true

			Promise.all([this.getFloorList(), this.getGateList()]).then(() => {
				this.loading = false
			})
		},

		methods: {
			renderHeader(h, c) {
				return (
            		<p class="date-picker" onClick={(e) => e.stopPropagation()}>
		           		<el-date-picker type="date" clearable={false} format="MM-dd" value={this.recordTime} onInput={(e) => this.recordTime = e} value-format="timestamp" placeholder="">
		           		</el-date-picker>
		            </p>
         		)
    		},
			async getFloorList() {
				const params = {
					action: 'OfficeRental.queryAllRentalInfo'
				}

				const data = await axios.post('/api/field/dispatcher.do', params)

				if (! data) {
					return
				}

				this.floorList = data.data
			},
			async getGateList() {
				const params = {
					action: 'door.queryDoor'
				}

				this.searchNumber && (params.childName = this.searchNumber)

				this.noData = -1

				const data = await axios.post('/api/device/dispatcher.do', params)

				if (! data) {
					return
				}

				// 处理数据
				let result = []

				data.data.forEach((item) => {
					item.isEdit = false
					item.show = false

					// 开门按钮
					item.disabled = false

					const index = result.findIndex((current) => current.floorNumber === item.floorId)

					if (index !== -1) {
						result[index].list.push(item)
					} else {
						result.push({
							floorNumber: item.floorId,
							list: [item]
						})
					}
				})

				this.gateList = result

				result[0] && (this.currentFloorNumber = result[0].floorNumber)

				if (! data.data.length) {
					this.noData = 1
				}
			},
			async search() {
				if (this.$searchFlag) {
					return
				}

				this.$searchFlag = true

				this.disabled = true
				this.currentFloorNumber = ''

				await this.getGateList()

				this.$searchFlag = null

				this.disabled = false
			},
			async handleChange(e, type) {
				const file = e.target.files[0]

				if (! file.type.includes('image')) {
					this.$message.error('请选择图片')

					return
				}

				const formdata = new FormData()

				formdata.append('action', 'file.upload')
				formdata.append('file', file)

				if (type === 1) {
					this.currentGate.imageUrl = URL.createObjectURL(file)
				} else {
					this.uploadingIndex = 1
					this.image = URL.createObjectURL(file)
				}

				const data = await axios.post('/api/account/dispatcher.do', formdata)

				// 上传失败
				this.uploadingIndex = 0

				if (! data) {
					return
				}

				if (type === 1) {
					this.currentGate.imageUrl = data.data.url
				} else {
					this.uploadingIndex = 2
					this.image = data.data.url
				}
			},
			async addEntranceGuard() {
				const params = {
					action: 'door.addDoor',
					floorId: this.floorNumber,
					childName: this.number,
					address: this.position
				}

				this.clickDisabled = true

				const data = await axios.post('/api/device/dispatcher.do', params)

				this.clickDisabled = false

				if (! data) {
					return
				}

				const index = this.gateList.findIndex((item) => item.floorNumber === + this.floorNumber)

				if (index === -1) {
					this.gateList.push({
						floorNumber: this.floorNumber,
						list: [{
							isEdit: false,
							show: false,
							disabled: false,
							floorId: this.floorNumber,
							childName: this.number,
							address: this.position,
							peopleCount: 0,
							online: true,
							alarmstate: false,
							recordId: data.data.recordId
						}]
					})
				} else {
					this.gateList[index].list.push({
						isEdit: false,
						show: false,
						disabled: false,
						floorId: this.floorNumber,
						childName: this.number,
						address: this.position,
						peopleCount: 0,
						online: true,
						alarmstate: false,
						recordId: data.data.recordId
					})
				}

				this.addShow = false
			},
			cancelAddEntranceGuard() {
				this.addShow = false

				this.position = ''
				this.number = ''
				this.floorNumber = ''

				this.image = ''
				this.uploadingIndex = 0
			},
			translateGateList(floorNumber) {
				if (! this.gateList.length) {
					return
				}

				this.currentFloorNumber = + floorNumber

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
	        showDetail(e, item, index, indexs, list) {
	        	this.recordLoading = true
				this.currentGate = item
	        	this.getRecordList()

				// 全部隐藏
				this.gateList.forEach((gate) => gate.list.forEach((item) => item.show = false))

				this.currentGateId = item.recordId

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

				const bb = indexArr.findIndex((items) => items.find((current) => current.recordId === item.recordId))

				this.$index = index
				this.$indexs = indexs
				this.$gateDetailTemp = indexArr[bb].slice(-1)[0]
				this.$gateDetailTemp.show = true

				// this.$nextTick(() => {
				// 	this.$refs['record-wrapper'][0].scrollIntoView({behavior: 'smooth', block: 'center'})
				// })
			},
			async getRecordList(page = 1) {
				const params = {
					action: 'door.queryDoorPunch',
					deviceId: this.currentGate.deviceId,
					childId: this.currentGate.childId,
					pageNo: page,
					pageSize: 5
				}

				if (this.$order) {
					params.orderBy = this.$order
				}

				if (this.recordTime) {
					params.punchTimeTamp = this.recordTime
				}

				const data = await axios.post('/api/device/dispatcher.do', params)

				if (! data) {
					return
				}

				this.recordList = data.data.list
				this.recordPageTotal = data.data.total
				this.recordLoading = false
			},
			sortChange(column) {
				this.$order = column.order === 'ascending' ? 'allDate_asc ' : column.order === 'descending' ? 'allDate_desc' : ''

				this.getRecordList()
			},
			pageChange(value) {
				this.recordLoading = true
				this.page = value
				this.getRecordList(value)
			},
			hideDetail(item) {
				item.show = false
				this.currentGateId = -1
			},
			forEdit() {
				const item = this.currentGate

				item.isEdit = true

				this.operationModalStatus = false
				this.numberEdit = item.childName
				this.positionEdit = item.address
			},
			async editGateService() {
				const params = {
					action: 'door.editDoor',
					recordId: this.currentGate.recordId,
					childName: this.numberEdit,
					address: this.positionEdit,
					imageUrl: this.currentGate.imageUrl
				}

				const data = await axios.post('/api/device/dispatcher.do', params)

				if (! data) {
					return
				}

				this.currentGate.isEdit = false

				this.currentGate.childName = this.numberEdit
				this.currentGate.address = this.positionEdit

				this.$message.success('修改成功')
			},
			showOperation() {
				this.operationModalStatus = true

				this.$nextTick(() => {
					const clickHandler = (e) => {
						document.removeEventListener('click', clickHandler, true)

						if (this.$refs['operation-wrapper'][0].contains(e.target)) {
							return
						}

						this.operationModalStatus = false
					}

					document.addEventListener('click', clickHandler, true)
				})
			},
			forDelGate(e) {
				this.popoverModalStatus = true
				this.followTarget = e.target
			},
			async delGate() {
				const params = {
					action: 'door.removeDoor',
					recordId: this.currentGate.recordId
				}

				this.popoverModalStatus = false
				this.$gateDetailTemp.show = false
				this.currentGateId = ''
				this.gateList[this.$indexs].list.splice(this.$index, 1)

				const data = await axios.post('/api/device/dispatcher.do', params)

				if (! data) {
					return
				}
			},
			async openDoor(item) {
				const params = {
					action: 'door.remoteOpenDoor',
					devIp: item.devIp,
					childId: item.childId
				}

				item.disabled = true

				const data = await axios.post('/api/device/dispatcher.do', params)

				item.disabled = false

				if (! data) {
					return
				}

				this.$message.success('开门成功')
			}
		}
	}
</script>