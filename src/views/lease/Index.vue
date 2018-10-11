<style scoped>
.container {
	margin: 24px;
}
.company-list {
	margin-top: 30px;

	& li {
		display: flex;
		align-items: flex-start;
		margin-bottom: 24px;
		color: #000;
		font-size: 16px;
		border-bottom: 1px dashed #999;
	}
}
.room-list {
	flex: 1;
}
.info {
	margin-right: 15px;

	& span {
		display: block;
		margin-bottom: 15px;
	}
}
.box {
	display: inline-block;
	min-width: 169px;
	padding: 10px;
	margin-right: 15px;
	margin-bottom: 15px;
	color: #FFF;
	font-size: 14px;
	cursor: pointer;
	box-sizing: border-box;
	background-color: green;

	& p {
		display: flex;
		justify-content: space-between;
	}
}
.company-name {
	margin-top: 10px;
}
</style>

<template>
	<div id="lease-wrapper">
		<tab-bar :list="tabs"></tab-bar>

		<div class="container">
			<el-button type="primary" @click="go">+入住单位</el-button>

			<ul class="company-list" @click="redirec">
				<li v-for="item of companyList">
					<div class="info">
						<span>{{item.floor}}层</span>
						<span>{{item.totalArea}}㎡</span>
					</div>
					<div class="room-list">
						<div class="box" data-id="10" v-for="item of item.room">
							<p>
								{{item.roomNumber}}
								<span>共{{item.area}}㎡</span>
							</p>
							<p class="company-name">{{item.companyName ? item.companyName : '暂无公司入驻'}}</p>
						</div>
					</div>
				</li>
			</ul>
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
						text: '总面积'
					},
					{
						number: 1000,
						text: '可租赁面积'
					},
					{
						number: 1000,
						text: '入驻单位'
					}
				],
				// totalArea: 1223,
				// leaseArea: 100,
				// occupancyUnit: 10,

				companyList: [
					{
						floor: 1,
						totalArea: 1000,
						room: [
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							}
						]
					},
					{
						floor: 1,
						totalArea: 1000,
						room: [
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							}
						]
					},
					{
						floor: 1,
						totalArea: 1000,
						room: [
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							}
						]
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