<style scoped>
.tabs {
	display: flex;
	align-items: center;
	padding: 12px 0;
	margin: 24px;
	color: #000;
	font-size: 16px;
	background-color: #FFF;
}
.tabs-item {
	margin: 0 30px;
	text-align: center;

	& i {
		display: block;
		margin-bottom: 15px;
		font-size: 24px;
	}
}
</style>

<template>
	<div class="tabs">
		<div class="tabs-item" v-for="item of list">
			<i v-text="item.number"></i>
			<span v-text="item.text"></span>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['list'],

		data() {
			return {

			}
		}
	}
</script>