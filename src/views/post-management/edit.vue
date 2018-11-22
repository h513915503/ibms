<style scoped>
    #add-post {
        padding: 24px;
    }
    .container {
        padding: 24px;
        margin-top: 20px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .el-input {
        width: 354px;
        height: 40px;
    }
    .power-list {
        & li {
            height: 60px;
        }
    }
    .delete-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        color: RGBA(245, 34, 45, 1);
        border-radius: 16px;
        border: 1px solid RGBA(245, 34, 45, 1);
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        cursor: pointer;
        margin-left: 52px;
    }
</style>

<template>
    <div id="add-post">
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/postManagement'}">岗位管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增岗位</el-breadcrumb-item>
		</el-breadcrumb>

        <loading v-if="loading"></loading>

        <div class="container" v-else>
            <el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="岗位编号：">
					<span v-text="postNumber"></span>
				</el-form-item>
				<el-form-item label="岗位名称：">
					<el-input v-model="form.postName" placeholder="如：前台"></el-input>
				</el-form-item>

                <el-form-item label="权限：">
                    <ul class="power-list">
                        <li v-for="(item, index) of authList">
                            <el-select v-model="item.auth" @change="change">
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

                authList: [],

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
                        subAuth: item.secondaryNavigation
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
                //     {
                //         parent: '场地',
                //         children: ['楼宇运营管理', '停车场管理']
                //     }
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
            },
            change(value) {
                this.postListSubAuth = this.$postListSubAuth.find((item) => item.parent === value).children
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
                            isRead: item.read,
                            isWrite: item.write,
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
            back() {
                this.$router.push('/post')
            }
        }
    }
</script>
