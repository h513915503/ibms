<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;
	color: #FFF;
	font-size: 24px;
	background-color: #222;
}
.info {
	display: flex;
	align-items: center;
}
.logo {
	width: 24px;
	height: 24px;
	margin-right: 10px;
}
.el-dropdown {
	color: inherit;
	font-size: 20px;
	cursor: pointer;
}
.aside {
	width: 240px;
	height: calc(100vh - 72px);
	padding-top: 16px;
	overflow: auto;
	box-sizing: border-box;
	background-color: #404040;

	& dt {
		margin-bottom: 16px;
		padding-left: 24px;
		color: #999;
		font-size: 20px;
		line-height: 36px;
	}

	& dt.cursor {
		cursor: pointer;
	}

	& dd {
		margin-bottom: 16px;
		color: #FFF;
		font-size: 16px;
		cursor: pointer;
	}

	& a {
		display: block;
		padding-left: 48px;
		color: inherit;
		line-height: 36px;
	}

	& a:hover, & a.actived, & dt.actived, & dt.cursor:hover {
		color: #000;
		background-color: #FFF;
	}
}
.aside::-webkit-scrollbar {
	width: 6px;
	background-color: transparent;
}
.aside::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #AAA;
}
.el-main {
	padding: 0;
	background-color: #F5F5F5;
}
</style>

<template>
	<div id="app">
		<el-header class="header" height="72px">
			<div class="info">
				<img class="logo" src="https://img04.sogoucdn.com/app/a/100520020/1315e8858e0d04c126463cfd6ff4171c">
				中宙物业 - 益展大厦
			</div>

			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item>螺蛳粉</el-dropdown-item>
					<el-dropdown-item>双皮奶</el-dropdown-item>
					<el-dropdown-item>蚵仔煎</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>

		<el-container>
			<el-aside class="aside" width="240px">
				<dl>
					<template v-for="item of aside">
						<dt class="cursor" :class="{actived: item.allPath.includes($route.path)}" v-text="item.title" v-if="item.title === '概述'" @click="go"></dt>
						<dt v-text="item.title" v-else></dt>

						<dd v-for="item of item.items">
							<router-link :to="item.path" :class="{actived: item.allPath.includes($route.path)}" v-text="item.text"></router-link>
						</dd>
					</template>
				</dl>
			</el-aside>

			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				aside: [
					{
						title: '概述',
						items: [],
						allPath: ['/']
					},
					{
						title: '场地',
						items: [
							{
								text: '办公租赁',
								path: '/lease',
								allPath: ['/lease', '/lease/add']
							},
							{
								text: '停车场管理',
								path: '/ab',
								allPath: ['/lease1111']
							}
						]
					},
					{
						title: '人员',
						items: [
							{
								text: '业主管理',
								path: '/ac',
								allPath: ['/lea232se']
							},
							{
								text: '访客登记',
								path: '/as',
								allPath: ['/le234ase']
							},
							{
								text: '人员出入记录',
								path: '/asdf',
								allPath: ['/le23423ase']
							}
						]
					},
					{
						title: '设备',
						items: [
							{
								text: '灯管理',
								path: '/adfs',
								allPath: ['/le234ase']
							},
							{
								text: '空调管理',
								path: '/asdsdffds',
								allPath: ['/le23423ase']
							},
							{
								text: '新风管理',
								path: '/asdfgfdds',
								allPath: ['/le234ase']
							},
							{
								text: '设备故障',
								path: '/asfsdfds',
								allPath: ['/le2342ase']
							}
						]
					}

				]
			}
		},

		methods: {
			go() {
				this.$router.push('/')
			}
		}
	}
</script>
