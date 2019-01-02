<style scoped>
.parking-lot-wrapper {
	min-width: 1000px;
}
.header {
	padding: 0 24px;
	background-color: #FFF;
}
.tabs {
	margin-bottom: 10px;
}

.tab-wrapper {
	display: flex;
}
.tab-item {
	margin-right: 50px;
	color: rgba(0, 0, 0, .65);
	font-size: 14px;
	cursor: pointer;
	line-height: 46px;
}
.tab-item.actived {
	color: #1890FF;
	position: relative;

	&::after {
		content: "";
		width: 130%;
		height: 2px;
		position: absolute;
		bottom: 0;
		left: 50%;
		background-color: currentcolor;
		transform: translateX(-50%);
	}
}
</style>

<template>
	<div class="parking-lot-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<header class="header">
				<tab-bar :list="tabs"></tab-bar><br />

				<div class="tab-wrapper">
					<div class="tab-item" :class="{actived: currentIndex === index}" v-for="(item, index) of tab" v-text="item" @click="switchIndex(index)"></div>
				</div>
			</header>

			<parking-space v-if="currentIndex === 0"></parking-space>
			<car-list v-if="currentIndex === 1"></car-list>
			<car-record v-if="currentIndex === 2"></car-record>
			<car-chart v-if="currentIndex === 3"></car-chart>
		</template>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'
	import parkingSpace from '@/components/parking-lot/parking-space.vue'
	import carList from '@/components/parking-lot/car-list.vue'
	import carRecord from '@/components/parking-lot/car-record.vue'
	import carChart from '@/components/parking-lot/chart.vue'

	export default {
		name: 'parking-lot',

		data() {
			return {
				loading: false,

				currentIndex: 0,
				tab: ['车位维护', '包月车辆', '车辆出入记录', '报表分析'],

				tabs: [
					{
						number: 0,
						text: '总车位'
					},
					{
						number: 0,
						text: '包月车位'
					},
					{
						number: 0,
						text: '临时停放车辆'
					},
					{
						number: 0,
						text: '未租空闲车位'
					}
				]
			}
		},

		components: {
			tabBar,
			parkingSpace,
			carList,
			carRecord,
			carChart
		},

		created() {
			this.loading = true

			this.getOverview().then(() => {
				this.loading = false
			})
		},

		methods: {
			async getOverview() {
				const params = {
					action: 'ParkingRental.queryAllCount'
				}

				const data = await axios.post('/api/field/dispatcher.do', params)

				if (! data) {
					return
				}

				const {allParkingSpaceCount, rentalParkingSpaceCount, temporaryUseParkingSpaceCount, unusedParkingSpaceCount} = data.data

				this.tabs[0].number = allParkingSpaceCount
				this.tabs[1].number = rentalParkingSpaceCount
				this.tabs[2].number = temporaryUseParkingSpaceCount
				this.tabs[3].number = unusedParkingSpaceCount
			},
			switchIndex(index) {
				this.currentIndex = index
			}
		}
	}
</script>