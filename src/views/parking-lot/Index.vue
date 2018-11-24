<style scoped>
#parking-lot-wrapper {
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
	<div id="parking-lot-wrapper">
		<header class="header">
			<tab-bar :list="tabs"></tab-bar><br />

			<div class="tab-wrapper">
				<div class="tab-item" :class="{actived: currentIndex === index}" v-for="(item, index) of tab" v-text="item" @click="switchIndex(index)"></div>
			</div>
		</header>

		<parking-space v-show="currentIndex === 0"></parking-space>
		<car-list v-show="currentIndex === 1"></car-list>
		<car-record v-show="currentIndex === 2"></car-record>
		<car-chart v-show="currentIndex === 3"></car-chart>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'
	import parkingSpace from '@/components/parking-lot/parking-space.vue'
	import carList from '@/components/parking-lot/car-list.vue'
	import carRecord from '@/components/parking-lot/car-record.vue'
	import carChart from '@/components/parking-lot/chart.vue'

	export default {
		data() {
			return {
				currentIndex: 0,
				tab: ['车位维护', '包月车辆', '车辆出入记录', '报表分析'],

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
						text: '未租空闲车位'
					}
				],

				date: '',
				number: '',
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
			//log(this.$options)

			if (this.$root.$currentIndex) {
				this.currentIndex = this.$root.$currentIndex
			}
		},

		methods: {
			switchIndex(index) {
				this.currentIndex = index
				this.$root.$currentIndex = index
			},
			handleClick() {

			},
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