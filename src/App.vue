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
		padding-left: 24px;
		color: rgba(255, 255, 255, .45);
		font-size: 20px;
		line-height: 48px;
	}

	& dt.cursor {
		cursor: pointer;
	}



	& dd {
		color: rgba(255, 255, 255, .85);
		font-size: 16px;
		cursor: pointer;
	}

	& a {
		display: block;
		padding-left: 48px;
		color: inherit;
		line-height: 48px;
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
	position: relative;
	box-sizing: border-box;
	background-color: #F5F5F5;
}
.tab {
	display: flex;
	line-height: 72px;
}
.tab-item {
	width: 128px;
	height: 72px;
	text-align: center;
	cursor: pointer;
}
.tabActived {
	background: rgba(3,92,156,1);
}
</style>

<template>
	<div id="app">
		<router-view v-if="$route.meta.login === true"/>
		<!-- <router-view v-else-if="$route.meta.dashboard === true" /> -->
		<template v-else>
			<el-header class="header" height="72px">
				<div class="info">
					<img class="logo" src="https://img04.sogoucdn.com/app/a/100520020/1315e8858e0d04c126463cfd6ff4171c">
					中宙物业 - 益展大厦
				</div>
				<div class="tab">
					<div class="tab-item" :class="{ tabActived: tabType === 0}" @click="tabType = 0">管理后台</div>
					<div class="tab-item" :class="{ tabActived: tabType === 1}" @click="tabType = 1">控制大屏</div>
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
			</el-header>

			<el-main v-if="$route.meta.dashboard === true">
				<router-view/>
			</el-main>
			<el-container v-else>
				<el-aside class="aside" width="240px">
					<dl>
						<template v-for="item of aside">
							<template v-if="item.items">
								<dt v-text="item.title"></dt>

								<dd v-for="item of item.items">
									<router-link :to="item.path" :class="{actived: item.reg.test($route.path)}" v-text="item.text"></router-link>
								</dd>
							</template>
							<template v-else>
								<dt class="cursor" :class="{actived: item.reg.test($route.path)}" v-text="item.title" @click="go(item.index)"></dt>
							</template>

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
				tabType: 0
			}
		},

		computed: {
			accountName() {
				return this.$store.state.accountName
			},
			aside() {
				return this.$store.state.aside
			}
		},
		watch: {
			tabType(value) {
				if(value === 0) {
					this.$router.push('/')
				} else if(value === 1) {
					this.$router.push('/dashboard')
				}
			}
		},
		created() {
			this.tabType = location.href.includes('dashboard') ? 1 : 0;
		},
		methods: {
			go(type) {
				const types = ['/', '/property', '/post', '/energy-consumption', '/environment']

				this.$router.push(types[type])
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
