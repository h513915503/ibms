<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0 24px;
	position: fixed;
	top: 0;
	z-index: 2;
	color: #FFF;
	font-size: 24px;
	background-color: #00294F;
}
.info {
	display: flex;
	align-items: center;
	cursor: pointer;
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
.el-container {
	padding-top: 72px;
	padding-left: 240px;
}
.aside {
	width: 240px;
	height: 100%;
	padding-top: 88px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	overflow: auto;
	box-sizing: border-box;
	background-color: #004175;

	& dt {
		margin-bottom: 16px;
		padding-left: 24px;
		color: rgba(255, 255, 255, .45);
		font-size: 20px;
		line-height: 36px;
	}

	& dt.cursor {
		cursor: pointer;
	}

	& dd {
		margin-bottom: 16px;
		color: rgba(255, 255, 255, .85);
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
		color: rgba(0, 0, 0, .85);
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
	padding: 0px;
	min-height: calc(100vh - 72px);
	box-sizing: border-box;
	background-color: #F5F5F5;
}
</style>

<template>
	<div id="app">
		<router-view v-if="$route.meta.login === true"/>
		<template v-else>
			<el-header class="header" height="72px">
				<div class="info" @click="go">
					<img class="logo" src="https://img04.sogoucdn.com/app/a/100520020/1315e8858e0d04c126463cfd6ff4171c">
					中宙物业 - 益展大厦
				</div>

				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						张宇<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="/modifyPsw">修改密码</el-dropdown-item>
						<el-dropdown-item command="/login">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>

			<el-container>
				<el-aside class="aside" width="240px">
					<dl>
						<template v-for="item of aside">
							<dt class="cursor" :class="{actived: item.reg.test($route.path)}" v-text="item.title" v-if="item.title === '概览'" @click="go"></dt>
							<!-- <dt class="cursor" :class="{actived: item.allPath.includes($route.path)}" v-text="item.title" v-if="item.title === '物业人员管理'" @click="go"></dt>
							<dt class="cursor" :class="{actived: item.allPath.includes($route.path)}" v-text="item.title" v-if="item.title === '岗位管理'" @click="go"></dt> -->
							<dt class="cursor" :class="{actived: item.reg.test($route.path)}" v-text="item.title" v-else-if="item.title === '物业人员管理'" @click="goProperty"></dt>
							<dt class="cursor" :class="{actived: item.reg.test($route.path)}" v-text="item.title" v-else-if="item.title === '岗位管理'" @click="goPost"></dt>
							<dt v-text="item.title" v-else></dt>

							<dd v-for="item of item.items">
								<router-link :to="item.path" :class="{actived: item.reg.test($route.path)}" v-text="item.text"></router-link>
							</dd>
						</template>
					</dl>
				</el-aside>

				<el-main>
					<router-view/>
				</el-main>
			</el-container>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				aside: [
					{
						title: '概览',
						items: [],
						reg: /\/$/
					},
					{
						title: '物业人员管理',
						items: [],
						reg: /\/propertyManagement|\/addProperty/
					},
					{
						title: '岗位管理',
						items: [],
						reg: /\/postManagement|\/addPost/
					},
					{
						title: '场地',
						items: [
							{
								text: '楼宇运营管理',
								path: '/lease',
								reg: /^\/lease/,
							},
							{
								text: '停车场管理',
								path: '/parking-lot',
								reg: /\/parking-lot/
							}
						]
					},
					{
						title: '人员',
						items: [
							{
								text: '业主管理',
								path: '/proprietor',
								reg: /\/proprietor/
							},
							{
								text: '访客登记',
								path: '/visitor',
								reg: /\/visitor/
							},
							{
								text: '人员出入记录',
								path: '/personnel',
								reg: /\/personnel/
							}
						]
					},
					{
						title: '设备',
						items: [
							{
								text: '灯管理',
								path: '/lightManagement',
								reg: /\/lightManagement|\/light\/lightAdd/
							},
							{
								text: '空调管理',
								path: '/airConditioner',
								reg: /\/airConditioner/
							},
							{
								text: '设备故障',
								path: '/deviceErrors',
								reg: /\/deviceErrors/
							}
						]
					}

				]
			}
		},

		methods: {
			go() {
				this.$router.push('/')
			},
			goProperty() {
				this.$router.push('/propertyManagement')
			},
			goPost() {
				this.$router.push('/postManagement')
			},
			handleCommand(command) {
				log(123)
				this.$router.push(command)
			}
		}
	}
</script>
