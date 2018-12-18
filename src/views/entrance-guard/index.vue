<style scoped>
.entrance-guard-wrapper {
	min-width: auto;
}
.header {
	padding: 0 24px;
	margin-bottom: 24px;
	background-color: #FFF;
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
	<div class="entrance-guard-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<div class="header">
				<tab-bar :list="tabs"></tab-bar>

				<div class="tab-wrapper">
					<div class="tab-item" :class="{actived: currentIndex === index}" v-text="item" v-for="(item, index) of tab" @click="currentIndex = index"></div>
				</div>
			</div>

			<management v-if="currentIndex === 0"></management>
			<card-statistics v-if="currentIndex === 1"></card-statistics>
		</template>
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar'
	import management from '@/components/entrance-guard/management'
	import cardStatistics from '@/components/entrance-guard/card-statistics'

	export default {
		data() {
			return {
				loading: false,

				currentIndex: 0,
				tab: ['门禁管理', '卡信息统计'],

				tabs: [
					{
						number: 0,
						text: '门禁总数'
					},
					{
						number: 0,
						text: '异常门禁'
					},
					{
						number: 0,
						text: '故障门禁'
					}
				],
			}
		},

		components: {
			tabBar,
			management,
			cardStatistics
		}
	}
</script>