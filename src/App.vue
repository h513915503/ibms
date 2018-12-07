<style scoped>
.header {
	display: flex;
	align-items: center;
	padding: 0 24px;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 20;
	color: #FFF;
	font-size: 20px;
	background-color: #00294F;
}
.logo-wrapper {
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 24px;
}
.logo {
	width: 24px;
	height: 24px;
	margin-right: 10px;
}
.el-dropdown {
	color: inherit;
	font-size: inherit;
	cursor: pointer;
}
.container {
	padding-top: 72px;
	padding-left: 240px;
	background-color: #F5F5F5;
}
.aside-list {
	width: 240px;
	height: 100%;
	padding-top: 72px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	overflow: auto;
	overscroll-behavior: contain;
	box-sizing: border-box;
	background-color: #004175;
}
.title {
	padding-left: 24px;
	margin-top: 8px;
	color: rgba(255, 255, 255, .45);
	font-size: 20px;
	line-height: 40px;
}
.title.cursor {
	cursor: pointer;
}
.sub-title {
	display: block;
	padding-left: 48px;
	color: rgba(255, 255, 255, .85);
	font-size: 16px;
	cursor: pointer;
	line-height: 48px;
}
.title.cursor:hover, .title.actived, .sub-title:hover, .sub-title.actived {
	color: rgba(0, 0, 0, .85);
	background-color: #FFF;
}
.aside-list::-webkit-scrollbar {
	width: 6px;
	background-color: transparent;
}
.aside-list::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #AAA;
}
.content-wrapper {
	min-width: 1000px;
	min-height: calc(100vh - 72px);
	position: relative;
	box-sizing: border-box;
}
.tab {
	display: flex;
	margin: 0 70px 0 auto;
	line-height: 72px;
}
.tab-item {
	width: 128px;
	height: 72px;
	color: inherit;
	text-align: center;
	cursor: pointer;
}
.tab-item.actived {
	background: rgba(3, 92, 156, 1);
}
</style>

<template>
	<div id="app">
		<router-view v-if="$route.meta.login === true"/>

		<template v-else>
			<header class="header">
				<div class="logo-wrapper">
					<img class="logo" src="https://img04.sogoucdn.com/app/a/100520020/1315e8858e0d04c126463cfd6ff4171c">
					中宙物业 - 益展大厦
				</div>
				<div class="tab">
					<router-link class="tab-item" :class="{actived: $route.path !== '/dashboard'}" to="/">管理后台</router-link>
					<router-link class="tab-item" :class="{actived: $route.path === '/dashboard'}" to="/dashboard">数据大屏</router-link>
				</div>
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{accountName}}
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="/modify-password">修改密码</el-dropdown-item>
						<el-dropdown-item command="/logout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</header>

			<router-view v-if="$route.meta.dashboard === true"></router-view>

			<div class="container" v-else>
				<dl class="aside-list" @click="go">
					<template v-for="item of aside">
						<template v-if="item.items">
							<dt class="title" v-text="item.title"></dt>

							<dd class="sub-title" :class="{actived: item.reg.test($route.path)}" :data-path="item.path" v-text="item.text" v-for="item of item.items"></dd>
						</template>
						<template v-else>
							<dt class="title cursor" :class="{actived: item.reg.test($route.path)}" :data-path="item.path" v-text="item.title"></dt>
						</template>
					</template>
				</dl>

				<keep-alive include="parking-lot">
					<router-view class="content-wrapper"></router-view>
				</keep-alive>
			</div>
		</template>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		computed: mapState(['aside', 'accountName']),

		methods: {
			go(e) {
				this.$router.push(e.target.dataset.path)
			},
			handleCommand(command) {
				if (command === '/logout') {
					sessionStorage.removeItem('token')

					location.reload()

					return
				}

				this.$router.push(command)
			},
			goDashboard() {
				this.$router.push('/dashboard')
			}
		}
	}
</script>
