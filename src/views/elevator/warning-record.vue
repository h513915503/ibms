<style scoped>
.warning-record-wrapper {
	min-height: 734px;
	padding: 24px;
	margin: 24px 24px 0;
	box-sizing: border-box;
	background-color: #FFF;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;

	& .name-input {
		width: 128px;
		margin-right: 24px;
	}
}
.elevator-list {
	display: flex;
}
.elevator-item {
	width: 50px;
	margin-right: 16px;
	color: rgba(0, 0, 0, .65);
	font-size: 14px;
	text-align: center;
	cursor: pointer;
	line-height: 46px;
}
.elevator-item.actived {
	color: #0E7CC2;
	border-bottom: 2px solid currentcolor;
}
.el-pagination {
	text-align: right;
}
.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 24px;
}
.tips {
	color: #8C8C8C;
	font-size: 14px;
}
</style>
<style>
.warning-record-wrapper .el-table .el-table__header-wrapper th, .warning-record-wrapper .el-table .el-table__header-wrapper tr {
	background-color: #FAFAFA;
}
</style>

<template>
	<div class="warning-record-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<header class="header">
				<ul class="elevator-list">
					<li class="elevator-item" :class="{actived: currentRegisterCode === item.registerCode}" v-for="item of elevatorNameList" v-text="item.liftName" @click="currentRegisterCode = item.registerCode"></li>
				</ul>
				<el-date-picker v-model="time" type="datetimerange" value-format="timestamp" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
			</header>

			<el-table :data="list" header-row-class-name="a">
				<el-table-column prop="alarmTime" label="告警时间" sortable='custom'></el-table-column>
				<el-table-column label="告警类型">
					<template slot-scope="scope">
						{{scope.row.alarmType | format}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text">实时监控</el-button>
						<el-button type="text">下载视频</el-button>
					</template>
				</el-table-column>
			</el-table>

			<footer class="footer">
				<p class="tips">从 2018-12-12 16:59:23至今，共产生{{list.length}}条告警记录</p>
				<el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange" v-if="list.length"></el-pagination>
			</footer>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,

				time: [],
				elevatorName: '',
				disabled: false,

				currentRegisterCode: '',
				elevatorNameList: [],

				page: 1,
				pageTotal: 1,
				list: []
			}
		},

		filters: {
			format(value) {
				const temp = {
					'1000001': '超速',
					'1000002': '震动',
					'1000003': '蹲底',
					'1000004': '冲顶',
					'1000005': '基准层非平层停梯',
					'1000006': '运行中开门',
					'1000007': '关人无法开门',
					'1000008': '停电故障',
					'1000010': '遮挡门行为告警',
					'1000012': '一键呼救',
					'1000016': '烟雾报警',
					'1000017': '尖叫报警',
					'1000018': '反复开关门告警',
					'1000019': '剧烈运动告警',
					'1000050': '电瓶车入梯异常',
					'1000064': '运行中开门',
					'1000065': '长时间开门',
					'1001001': '超速且有人'
				}

				return temp[value]
			}
		},

		watch: {
			currentRegisterCode(value) {
				this.getAlarmList(value)
			}
		},

		created() {
			// 往前推 15天
			this.time = [~~ ((Date.now() - 15 * 24 * 3600 * 1000) / 1000), ~~ (Date.now() / 1000)]

			this.getData()
		},

		methods: {
			async getData() {
				this.loading = true

				await this.getToken()

				await this.getLiftRegCodes()

				this.loading = false
			},
			async getToken() {
				if (Date.now() < sessionStorage.getItem('expiresTime')) {
					this.$accessToken = sessionStorage.getItem('accessToken')

					return
				}

				const params = {
					AppKey: 'nMqbGHTSJNwqgzIRTAx56vHrqUxrhQBY',
					AppSecret: '5NR1nrbvjlbJuqymCuMjVUoGjSKa5iqS'
				}

				const data = await axios.post('/hapi/v1/getToken', params)

				if (! data) {
					return
				}

				this.$accessToken = data.data.accessToken
				this.$expiresTime = data.data.expiresTime

				sessionStorage.setItem('accessToken', this.$accessToken)
				sessionStorage.setItem('expiresTime', this.$expiresTime)
			},
			async getLiftRegCodes() {
				const params = {
					pageIndex: this.page,
					pageSize: 10,
					registerCodes: []
				}
				const data = await axios.post(`/hapi/v1/info/getLiftRegCodes?access_token=${this.$accessToken}`)

				if (! data) {
					return
				}

				this.$elevatorList = data.data.map((item) => item.registerCode)
				await this.getElevatorInfo()
			},
			async getElevatorInfo() {
				const params = {
					registerCodes: this.$elevatorList
				}
				const data = await axios.post(`/hapi/v1/info/getLiftInfo?access_token=${this.$accessToken}`, params)

				if (! data) {
					return
				}

				this.elevatorNameList = data.data.map((item) => {
					return {
						registerCode: item.registerCode,
						liftName: item.liftName
					}
				})

				this.currentRegisterCode = this.elevatorNameList[0].registerCode
			},
			async getAlarmList(registerCode) {
				const params = {
					registerCodes: [registerCode],
					pageIndex: this.page,
					pageSize: 10,
					beginTime: this.time[0],
					endTime: this.time[1],
				}
				const data = await axios.post(`/hapi/v1/alarm/getLiftHisAlarm?access_token=${this.$accessToken}`, params)

				if (! data) {
					return
				}

				if (data.data.total) {
					this.pageTotal = data.data.total
					this.list = data.data.list
				}
			},
			pageChange(value) {
				this.page = value
				this.getAlarmList(this.currentRegisterCode)
			}
		}
	}
</script>