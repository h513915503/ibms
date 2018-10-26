<style scoped>
#parking-lot-wrapper {
	min-width: 1000px;
}
.container {
	padding: 24px;
	margin-top: 24px;
	box-sizing: border-box;
	background-color: #FFF;
}
.search-wrapper {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 40px;
}
.car-number {
	width: 128px;
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
.mr {
	margin: 0 10px;
}
.no-data {
	margin-top: 30px;
}
</style>

<template>
	<div id="parking-lot-wrapper">
		<div class="container" v-if="! list.length">
			<el-button type="primary" @click="go">+包月车辆</el-button>
			<p class="no-data" >暂无包月车辆。</p>
		</div>

		<div class="container" v-else>
			<div class="search-wrapper">
				<label class="calendar-label">
					<span>在场时间：</span>
					<el-date-picker v-model="date" type="date" placeholder="入场时间"></el-date-picker>
					<span class="mr">-</span>
					<el-date-picker v-model="date" type="date" placeholder="出场时间"></el-date-picker>
				</label>
				<el-input class="car-number" v-model="number" placeholder="车牌号"></el-input>
				<el-button type="primary" class="btn-search" @click="go">查询</el-button>
			</div>

			<el-table :data="list">
				<el-table-column prop="time" label="时间" sortable></el-table-column>
				<el-table-column prop="carNumber" label="车牌号"></el-table-column>
				<el-table-column prop="isEnter" label="出/入场"></el-table-column>
				<el-table-column prop="isMonth" label="包月/非包月"></el-table-column>
				<el-table-column prop="parkingTime" label="停车时长"></el-table-column>
				<el-table-column prop="parkingPrice" label="停车费用（元）"></el-table-column>
			</el-table>

			<div class="page-wrapper">
				<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				date: '',
				number: '',

				list: [
					{
						time: '2018-12-12',
						carNumber: '浙A · RM33V',
						isEnter: 0,
						isMonth: 0,
						parkingTime: 100,
						parkingPrice: 10,
					},
					{
						time: '2018-12-12',
						carNumber: '浙A · RM33V',
						isEnter: 0,
						isMonth: 0,
						parkingTime: 100,
						parkingPrice: 10,
					},
					{
						time: '2018-12-12',
						carNumber: '浙A · RM33V',
						isEnter: 0,
						isMonth: 0,
						parkingTime: 100,
						parkingPrice: 10,
					}
				]
			}
		},

		methods: {
			go() {
				this.$router.push('/parking-lot/add')
			},
			handleTable(e) {
				let target = e.target

				while (target.dataset && ! target.dataset.type) {
					target = target.parentNode
				}

				if (! target.dataset) {
					return
				}

				const {type} = target.dataset

				if (+ type === 1) {
					this.$router.push(`/parking-lot/detail/${100}`)
				}
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