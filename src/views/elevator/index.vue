<style scoped>
.header {
	display: flex;
	padding: 0 24px;
	font-size: 14px;
	line-height: 46px;
	background-color: #FFF;
}
.item {
	width: 88px;
	margin-right: 24px;
	color: rgba(0, 0, 0, .65);
	text-align: center;
}
.item:hover {
	opacity: .7;
}
.item.router-link-active {
	color: #0E7CC2;
	border-bottom: 2px solid currentcolor;
}
</style>

<template>
	<div class="monitor-wrapper">
		<header class="header">
			<router-link class="item" v-for="item of tabs" :key="item.path" :to="item.path" v-text="item.text"></router-link>
		</header>

		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [
					{
						path: '/elevator/monitor',
						text: '实时监控'
					},
					{
						path: '/elevator/warning-record',
						text: '事件告警记录'
					}
				]
			}
		}
	}
</script>