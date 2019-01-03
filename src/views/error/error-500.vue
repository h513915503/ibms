<style scoped>
.error-500-wrapper {
	height: 100vh;
	padding-top: 65px;
	box-sizing: border-box;
	text-align: center;
	background-color: #E8EEFB;
}
.title {
	margin-bottom: 40px;
	color: #4278EE;
	font-size: 24px;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 602px;
	height: 740px;
	padding-bottom: 108px;
	margin: 0 auto;
	box-sizing: border-box;
	background: url(~@/assets/error-500.png) no-repeat;
	background-size: 100% 444px;
}
.tips {
	margin-bottom: 33px;
	color: #8C8C8C;
	font-size: 12px;
}
.btn {
	align-self: center;
	width: 120px;
	border-radius: 20px;
	color: #4278EE;
	border: 1px solid currentcolor;
	background-color: transparent;
}
</style>

<template>
	<div class="error-500-wrapper">
		<h1 class="title">中宙物业管理平台</h1>
		<div class="content">
			<p class="tips">服务器错误，请过一会儿刷新</p>
			<el-button class="btn" @click="refresh">刷新</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			refresh() {
				location.reload()
			}
		}
	}
</script>