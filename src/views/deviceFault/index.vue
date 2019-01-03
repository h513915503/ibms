<style scoped>
.container {
	padding: 24px;
	margin: 24px;
	background-color: #FFF;

	& .time-select {
		width: 450px;
	}
}
.search-wrapper {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: 24px;
}
.device-number {
	width: 128px;
	margin: 0 24px;
}
.el-table >>> thead th {
	background-color: #FAFAFA;
}
.status {
	display: inline-block;
	width: 6px;
	height: 6px;
	margin-right: 9px;
	border-radius: 50%;
	vertical-align: middle;
}
.status.normal {
	background-color: #52C41A;
}
.status.fault {
	background-color: #F5222D;
}
.status.closed {
	background-color: #BFBFBF;
}
.page-wrapper {
	margin-top: 24px;
	text-align: right;
}

.no-data {
	padding-left: 24px;
	color: rgba(0, 0, 0, .65);
	font-size: 16px;
}
</style>

<template>
	<div class="device-fault-wrapper">
		<template v-if="loading">
			<loading></loading>
		</template>

		<template v-else>
			<tab-bar :list="tabs"></tab-bar>

			<div class="container" v-if="faultList.length">
				<header class="search-wrapper">
					<el-date-picker class="time-select" v-model="date" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
					<el-input class="device-number" v-model="deviceNumber" placeholder="设备编号"></el-input>
					<el-button type="primary" class="btn-search">查询</el-button>
				</header>

				<el-table :data="faultList">
					<el-table-column label="故障时间" sortable>
						<template slot-scope="scope">
							{{scope.row.faultTime | format}}
						</template>
					</el-table-column>
					<el-table-column label="设备编号" prop="deviceNumber"></el-table-column>
					<el-table-column label="设备类型" prop="deviceType"></el-table-column>
					<el-table-column label="设备型号" prop="deviceModel" width="200"></el-table-column>
					<el-table-column label="所在楼层">
						<template slot-scope="scope">
							{{scope.row.floorNumber}}层
						</template>
					</el-table-column>
					<el-table-column label="详细位置" prop="position"></el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							<span class="status" :class="{normal: scope.row.status === 0, fault: scope.row.status === 1, closed: scope.row.status === 2}"></span>
							{{scope.row.status | statusFormat}}
						</template>
					</el-table-column>
					<el-table-column label="维修说明" prop="remark" width="250"></el-table-column>
				</el-table>

				<el-pagination class="page-wrapper" background layout="prev, pager, next" :total="pageTotal"></el-pagination>
			</div>

			<p class="no-data" v-else>暂无故障记录。</p>
		</template>
	</div>
</template>

<script>
	import getResponses from '@/api'

	export default {
		data() {
			return {
				loading: false,

				tabs: [
					{
						number: 0,
						text: '总故障数'
					},
					{
						number: 0,
						text: '灯故障'
					},
					{
						number: 0,
						text: '空调故障'
					}
				],

				date: '',
				deviceNumber: '',
				faultList: [],

				page: 0,
				pageTotal: 0
			}
		},

		filters: {
			format(value) {
				const date = new Date(value)

				return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`.replace(/\b(\w)\b/, '0$1')
			},
			statusFormat(value) {
				return ['照明中', '故障中', '已关闭'][value]
			}
		},

		created() {
			// this.getData()
		},

		methods: {
			// async getData() {
			// 	this.loading = true

			// 	await this.getFaultList()

			// 	this.loading = false
			// },
			// async getFaultList() {
			// 	const params = {
			// 		pageIndex: this.page
			// 	}
			// 	const data = await axios.post('/getDeviceFaultList', params)

			// 	if (! data) {
			// 		return
			// 	}

			// 	this.page++
			// 	this.pageTotal = data.pageTotal
			// 	this.faultList = data.list
			// }
		}
	}
</script>