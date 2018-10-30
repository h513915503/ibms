<style scoped>
#lease-add-wrapper {
	padding: 24px;
}
.container {
	padding: 24px;
	margin-top: 20px;
	box-sizing: border-box;
	background-color: #FFF;
}
</style>

<template>
	<div id="lease-add-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>场地</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/lease'}">办公租赁</el-breadcrumb-item>
			<el-breadcrumb-item>新增入驻单位</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<lease-add @complete="complete"></lease-add>
		</div>
	</div>
</template>

<script>
	import leaseAdd from '@/components/lease/Add'

	export default {
		data() {
			return {

			}
		},

		components: {
			leaseAdd
		},

		methods: {
			complete() {
				this.$router.push('/lease')
			}
		}
	}
</script>