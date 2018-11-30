<style scoped>
.content {
	padding: 24px 0;
	margin-top: 20px;
	background-color: #FFF;
}
.el-input {
	width: 354px;
	height: 40px;
}
.auth-item {
	margin-bottom: 16px;
}
.delete-icon {
	display: inline-block;
	width: 16px;
	margin-left: 52px;
	color: rgba(245, 34, 45, 1);
	font-size: 12px;
	text-align: center;
	cursor: pointer;
	border: 1px solid currentcolor;
	border-radius: 16px;
	line-height: 16px;
}
</style>

<template>
	<div class="edit-post-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item to="/post">岗位管理</el-breadcrumb-item>
			<el-breadcrumb-item>编辑岗位</el-breadcrumb-item>
		</el-breadcrumb>

		<loading v-if="loading"></loading>
		<div class="content" v-else>
			<el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="岗位编号：">
					<span v-text="postNumber"></span>
				</el-form-item>
				<el-form-item label="岗位名称：">
					<el-input v-model="form.postName" placeholder="如：前台"></el-input>
				</el-form-item>

				<el-form-item label="权限：">
					<ul class="auth-list">
						<li class="auth-item" v-for="(item, index) of authList">
							<el-select v-model="item.auth" @change="change" @focus="focus(index)">
								<el-option :label="item" :value="item" v-for="item of postListAuth"></el-option>
							</el-select> 一
							<el-select v-model="item.subAuth">
								<el-option :label="item" :value="item" v-for="item of postListSubAuth"></el-option>
							</el-select>

							<el-checkbox v-model="item.read" style="margin-left: 48px">读</el-checkbox>
							<el-checkbox v-model="item.write">写</el-checkbox>
							<span class="delete-icon" @click="deleteAuth(index)">一</span>
						</li>
					</ul>
					<el-button type="text" @click="addAuth">添加新权限</el-button>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" :disabled="isDisabled" @click="submit">确定</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
                loading: false,
				disabled: false,

				postNumber: '',
				form: {
					postName: ''
				},

				authList: [
					{
						auth: '',
						subAuth: '',
						read: false,
						write: false
					}
				],

				postListAuth: [],
				postListSubAuth: []
			}
		},

		computed: {
			isDisabled() {
				if (this.disabled) {
					return true
				}

				const authIndex = this.authList.findIndex((item) => item.auth.length !== 0)
				const subAuthIndex = this.authList.findIndex((item) => item.subAuth.length !== 0)

				if (this.form.postName && authIndex !== -1 && subAuthIndex !== -1) {
					return false
				}

				return true
			}
		},

		created() {
			this.loading = true

			Promise.all([this.getDetail(), this.getPostList()]).then(() => {
				this.loading = false
			})
		},

		methods: {
			back() {
				this.$router.back()
			},
			async getDetail() {
				const params = {
					action: 'administrator.getPostInfoByPostId',
					postId: this.$route.params.id
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.postNumber = data.data.postId
				this.form.postName = data.data.postName

				this.authList = data.data.postPermissionDescriptionArray.map((item) => {
					return {
						read: Boolean(item.isRead),
						write: Boolean(item.isWrite),
						auth: item.primaryNavigation,
						subAuth: item.secondaryNavigation,
						postListSubAuth: []
					}
				})
			},
			async getPostList() {
				const params = {
					action: 'administrator.getMenu'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				// 处理一级菜单
				this.postListAuth = [... new Set(data.data.map((item) => item.primaryNavigationZh))]

				// 处理二级菜单
				// [
				//   {
				//	 parent: '场地',
				//	 children: ['楼宇运营管理', '停车场管理']
				//   }
				// ]
				this.$postListSubAuth = []
				data.data.forEach((item) => {
					const index = this.$postListSubAuth.findIndex((current) => item.primaryNavigationZh === current.parent)

					if (index === -1) {
						this.$postListSubAuth.push({
							parent: item.primaryNavigationZh,
							children: [item.secondaryNavigationZh]
						})
					} else {
						this.$postListSubAuth[index].children.push(item.secondaryNavigationZh)
					}
				})

				// 更新子菜单
				this.authList.forEach((item) => {
					this.$postListSubAuth.forEach((current) => {
						if (item.auth === current.parent) {
							item.postListSubAuth = current.children
						}
					})
				})
			},
			focus(index) {
				this.$index = index
			},
			change(value) {
				this.postListSubAuth = this.$postListSubAuth.find((item) => item.parent === value).children

				// 更新子菜单
				const item = this.authList[this.$index]

				this.$postListSubAuth.forEach((current) => {
					if (value === current.parent) {
						item.subAuth = current.children[0]
						item.postListSubAuth = current.children
					}
				})
			},
			addAuth() {
				this.authList.push({
					auth: '',
					subAuth: '',
					read: false,
					write: false
				})
			},
			deleteAuth(index) {
				this.authList.splice(index, 1)
			},
			async submit() {
				const isAuth = this.authList.some((item) => {
					if (item.read === false && item.write === false) {
						return true
					}

					return false
				})

				if (isAuth) {
					this.$message.error('读写必须要选择一个')

					return
				}

				const params = {
					action: 'administrator.updatePostPermission',
					postId: this.postNumber,
					postName: this.form.postName,
					permissionInfo: JSON.stringify(this.authList.map((item) => {
						return {
							isRead: Number(item.read),
							isWrite: Number(item.write),
							primaryNavigation: item.auth,
							secondaryNavigation: item.subAuth
						}
					}))
				}

				this.disabled = true

				const data = await axios.post('/api/dispatcher.do', params)

				this.disabled = false

				if (! data) {
					return
				}

				location.href = '/post'
			}
		}
	}
</script>
