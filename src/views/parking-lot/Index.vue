<style scoped>
#parking-lot-wrapper {
	min-width: 1000px;
}
.container {
	padding: 24px;
	margin: 24px;
	box-sizing: border-box;
	background-color: #FFF;
}
.search-wrapper {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;
}
.search-content {
	display: flex;
	justify-content: space-between;
}
.btn-search {
	margin-left: 20px;
}
.calendar-label {
	display: flex;
	align-items: center;
	margin-right: 20px;

	& span {
		flex-shrink: 0;
		margin-right: 10px;
	}
}
.page-wrapper {
	margin-top: 20px;
	text-align: right;
}
</style>

<template>
	<div id="parking-lot-wrapper">
		<tab-bar :list="tabs"></tab-bar>

		<div class="container">
			<div class="search-wrapper">
				<el-button type="primary" @click="go">+包月车辆</el-button>
				<div class="search-content">
					<label class="calendar-label">
						<span>租期到期时间：</span>
						<el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
					</label>
					<el-input v-model="number" placeholder="车牌号"></el-input>
					<el-button type="primary" class="btn-search" @click="go">查询</el-button>
				</div>
			</div>

			<el-table :data="carList">
				<el-table-column prop="number" label="车牌号"></el-table-column>
				<el-table-column prop="name" label="车主姓名"></el-table-column>
				<el-table-column prop="phone" label="车主手机号码"></el-table-column>
				<el-table-column prop="company" label="所在单位" width="320"></el-table-column>
				<el-table-column prop="place" label="车位"></el-table-column>
				<el-table-column prop="time" label="到期时间" sortable></el-table-column>
				<el-table-column label="操作">
		  			<template slot-scope="scope">
				        <el-button type="text" size="small">续租</el-button>
				        <el-button type="text" size="small">查看详情</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<div class="page-wrapper">
				<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'

	export default {
		data() {
			return {
				tabs: [
					{
						number: 1000,
						text: '总车位'
					},
					{
						number: 1000,
						text: '包月车位'
					},
					{
						number: 1000,
						text: '临时停放车辆'
					},
					{
						number: 1000,
						text: '临时停放车辆'
					}
				],

				date: '',
				number: '',

				carList: [
					{
						number: '浙A · RM33V',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						place: '-2 层 · A区',
						time: '2018-12-12'
					},
					{
						number: '浙A · RM33V',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						place: '-2 层 · A区',
						time: '2018-12-12'
					},
					{
						number: '浙A · RM33V',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						place: '-2 层 · A区',
						time: '2018-12-12'
					},
					{
						number: '浙A · RM33V',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						place: '-2 层 · A区',
						time: '2018-12-12'
					},
					{
						number: '浙A · RM33V',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						place: '-2 层 · A区',
						time: '2018-12-12'
					},
					{
						number: '浙A · RM33V',
						name: '大河',
						phone: 18603771499,
						company: '浙江澜海知识产权服务有限公司',
						place: '-2 层 · A区',
						time: '2018-12-12'
					}
				]
			}
		},

		components: {
			tabBar
		},

		methods: {
			go() {
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