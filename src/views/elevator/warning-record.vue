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
				<el-date-picker v-model="time" type="datetimerange" value-format="timestamp" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="change"></el-date-picker>
			</header>

			<loading v-if="tableLoading"></loading>
			<template v-else>
				<el-table :data="list" header-row-class-name="a">
					<el-table-column label="告警时间">
						<template slot-scope="scope">
							{{scope.row.alarmTime | timeFormat}}
						</template>
					</el-table-column>
					<el-table-column label="告警类型">
						<template slot-scope="scope">
							{{scope.row.alarmType | format}}
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="back">实时监控</el-button>
							<el-button type="text" @click="download(scope.row.alarmCode)">下载视频</el-button>
						</template>
					</el-table-column>
				</el-table>

				<footer class="footer">
					<p class="tips">从 {{beginTimeFormat}} 至今，共产生{{pageTotal}}条告警记录</p>
					<el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange" v-if="list.length"></el-pagination>
				</footer>
			</template>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				tableLoading: false,

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

		computed: {
			beginTime() {
				return this.time[0] ? this.time[0] / 1000 : ~~ ((Date.now() - 15 * 24 * 3600 * 1000) / 1000)
			},
			beginTimeFormat() {
				const date = new Date(this.beginTime * 1000)

				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`.replace(/\b(\w)\b/g, '0$1')
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

					'1000035': '屏离线告警',
					'1000036': '陀螺仪速度不变',
					'1000054': '长时间速度为零',
					'1000055': '长时间楼层不变',
					'1000039': '轿厢内人感故障',
					'1100007': '疑似困人',
					'1000030': '网关离线告警',
					'1001022': '长时间运行告警',

					'1000050': '电瓶车入梯异常',
					'1000064': '运行中开门',
					'1000065': '长时间开门',
					'1001001': '超速且有人',
					'1001003': '蹲底且有人',
					'1001004': '冲顶且有人',
					'1001005': '门区外停梯且有人',
					'1001006': '运行中开门且有人',
					'1001021': '电梯电源故障且有人',
					'3000047': '轿厢顶高温报警',
					'3000048': '轿厢内高温报警',
					'4000001': '消防栓水压过高告警',
					'4000002': '消防栓水压过低告警',
					'4000003': '喷淋水压过高告警',
					'4000004': '喷淋水压过低告警',
					'4000005': '液位水位过低告警',
					'5000017': '小孩单独乘梯',
					'5000018': '逆行告警',
					'5000019': '方向不一致',
					'5000020': '扶梯静止',
					'5000030': '跌倒告警',
					'6000000': '消除报警',
					'6000001': '运行时门锁回路断开',
					'6000002': '驱动故障',
					'6000003': '电梯运行方向与指令相反',
					'6000004': '开闸故障(抱闸接触器反馈异常)',
					'6000005': '平层信号异常',
					'6000006': '编码器脉冲过少',
					'6000007': '运行接触器故障',
					'6000008': '急停回路断开',
					'6000009': '上限位异常',
					'6000010': '下限位异常',
					'6000011': '电梯位置异常',
					'6000012': '发出运行指令后，没有驱动信号',
					'6000013': '目标层换速距离不够,无法正常换速',
					'6000014': '换速后,速度无下降',
					'6000015': '单次运行时间超过限定值',
					'6000016': '快车运行时检修信号输入(维修故障)',
					'6000017': '制动电阻/电机过热或者地震信号异常',
					'6000018': '门联锁故障',
					'6000019': '急停故障',
					'6000020': '端站粘连',
					'6000021': '通讯干扰过大',
					'6000022': '开门故障',
					'6000023': '关门故障',
					'6000024': '楼层计数出错保护',
					'6000025': '封星接触器故障',
					'6000026': '外部开关电源24V跌落故障',
					'6000027': '系统运行主时钟异常',
					'6000028': '系统内部供电5V异常',
					'6000029': '开闸运行过程中运行接触器抖动',
					'6000030': '开闸运行过程中封星接触器抖动',
					'6000031': '抱闸力自检测失败',
					'6000032': '抱闸失效门区开门溜车故障',
					'6000033': '发生意外溜车故障后成功自救并且制动力已恢复',
					'6000034': '抱闸制动力失效(应急运行下)',
					'6000035': '再平层运行时门区丢失',
					'6000036': '上限位信号抖动（溜车疏散期间）',
					'6000037': '下限位信号抖动（溜车疏散期间）',
					'6000038': '上端站信号抖动（溜车疏散期间）',
					'6000039': '下端站信号抖动（溜车疏散期间）',
					'6000040': '意外溜车保护参数设置错误',
					'6000041': '安全门区信号丢失（溜车期间）',
					'6000042': '电梯参数设置不当',
					'6000043': '驱动模块过温保护',
					'6000044': 'CAN通讯失败',
					'6000045': '楼层编码比对不相等(错层)',
					'6000046': '楼层编码自检异常(编码楼层超过总楼层)',
					'6000047': '抱闸反馈开关X15/X19异常',
					'6000048': 'UCMP故障',
					'6000049': '轿厢门检测时异常',
					'6000050': '强迫减速开关异常',
					'6000051': '检修时开关门到位信号同时有效',
					'6000052': '门锁回路旁路运行信号检出故障',
					'6000053': '门锁短接故障',
					'6000054': '安全电路板动作异常，门锁短接无法使用',
					'6000055': '换层停靠故障（单层无法停靠）',
					'6000056': '门锁回路异常，抖动超过20次以上',
					'6000057': '通讯协议不一致，不能内选与外呼',
					'6000058': '驱动侧程序锁定',
					'6000059': '逻辑侧程序锁定',
					'6000060': '开锁区域外停止',
					'6000061': '加速过电流',
					'6000062': '减速过电流',
					'6000063': '恒速过电流',
					'6000064': '加速过电压',
					'6000065': '减速过电压',
					'6000066': '恒速过电压',
					'6000067': '维保提醒故障',
					'6000068': '欠电压故障',
					'6000069': '控制器过载',
					'6000070': '电机过载',
					'6000071': '输入侧缺相',
					'6000072': '输出侧缺相',
					'6000073': '输出侧异常',
					'6000074': '电流控制故障',
					'6000075': '电流检测故障',
					'6000076': '调谐时编码器干扰',
					'6000077': '电机调谐故障',
					'6000078': '速度反馈错误',
					'6000079': '存储数据异常',
					'6000080': '专机故障',
					'6000081': '电梯速度异常',
					'6000082': '逻辑故障',
					'6000083': '井道自学习异常',
					'6000084': '旋转编码器信号异常',
					'6000085': '短路故障',
					'6000086': '外召通讯故障',
					'6000087': '检修启动过电流',
					'6000088': '开关门信号故障',
					'6000089': 'SPI通讯故障',
					'6000090': '位置保护开关异常',
					'6000091': '模拟量断线',
					'6000092': '外部故障',
					'6000093': 'STO故障',
					'7000001': '里程告警 新梯预警',
					'7000002': '速度告警 新梯预警',
					'7000003': '厅门开关次数告警 新梯预警',
					'7000004': '人数统计告警 新梯预警',
					'7000005': '电梯运行次数告警 新梯预警',
					'9999999': '电梯故障 怡达演示'
				}

				return temp[value]
			},
			timeFormat(value) {
				const date = new Date(value * 1000)

				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`.replace(/\b(\w)\b/g, '0$1')
			}
		},

		watch: {
			currentRegisterCode(value) {
				this.page = 1
				this.list = []
				this.tableLoading = true

				this.getAlarmList(value)
			}
		},

		created() {
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
					beginTime: this.beginTime,
					endTime: this.time[1] ? this.time[1] / 1000 : ~~ (Date.now() / 1000)
				}
				const data = await axios.post(`/hapi/v1/alarm/getLiftHisAlarm?access_token=${this.$accessToken}`, params)

				this.tableLoading = false

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
			},
			change(value) {
				this.getAlarmList(this.currentRegisterCode)
			},
			back() {
				this.$router.push('/elevator/monitor')
			},
			async download(alarmCode) {
				const params = {
					alarmCode,
					authType: 'token'
				}

				const data = await axios.post(`/hapi/v1/media/getAlarmvideoAuthorization?access_token=${this.$accessToken}`, params)

				if (! data) {
					return
				}

				const a = document.createElement('a')

				a.href = data.data.url
				a.download = `${alarmCode}.flv`

				a.click()
			}
		}
	}
</script>