<style scoped>
#overview-wrapper {
	padding: 48px 0;
	color: #4A4A4A;
	font-size: 14px;
	text-align: center;
	background-color: #FFF;
}
h1 {
	margin-bottom: 48px;
	font-size: 20px;
}
p {
	line-height: 2;
}
.el-button {
	margin-top: 48px;
	font-size: 16px;
}
</style>

<template>
	<div id="overview-wrapper">
		<h1>暂无概览</h1>
		<p>因当前暂未录入任何园区的信息，平台暂不显示任何概览。</p>
		<p>您可以在平台录入场地、人员信息后，再来该页面查看概览。</p>
		<el-button type="primary" @click="go">好的</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		methods: {
			go() {
				this.$router.push('/lease')
			}
		}
	}
</script>