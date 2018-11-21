<style scoped>
    #property-wrapper {
        min-width: 1000px;
    }
    .no-data {
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
    .bottom-tip {
        margin-bottom: 48px
    }
    .el-button {
        /* margin-top: 48px; */
        font-size: 16px;
    }

    .container {
        padding: 24px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .search-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    .page-wrapper {
        margin-top: 20px;
        text-align: right;
    }

    .popover-btn-wrapper {
        text-align: right;
    }
    .btn-confirm, .btn-confirm:hover, .btn-confirm:focus, .btn-confirm:active {
        color: rgba(245,34,45,1);
    }
    .el-button.dimission {
        color: red;
    }
    .opt-btn {
        font-size: 12px;
        margin-right: 10px;
    }
</style>

<template>
    <div id="post-wrapper">
        <loading v-if="loading"></loading>

        <template v-else>
            <div class="no-data" v-if="noData">
                <h1>暂无岗位</h1>
                <p>您还没有维护岗位，</p>
                <p class="bottom-tip">点击下方【+ 物业人员】按钮添加新的岗位。</p>
                <el-button type="primary" @click="go">+ 岗位</el-button>
            </div>

            <div class="container" v-else>
                <div class="search-wrapper">
    				<el-button type="primary" @click="go">+ 岗位</el-button>
    			</div>

                <div class="table-content">
                    <el-table :data="list">
                        <el-table-column prop="postId" label="岗位编号"></el-table-column>
                        <el-table-column prop="postName" label="岗位名称"></el-table-column>
                        <el-table-column label="权限">
                            <template slot-scope="scope">
                                <ul>
                                    <li v-for="item of scope.row.permissionArray">
                                        {{item.primaryNavigation}} - {{item.secondaryNavigation}}

                                        <template v-if="item.isRead === 1 && item.isWrite === 1">（读，写）</template>

                                        <template v-else-if="item.isRead === 1">（读）</template>

                                        <template v-else-if="item.isWrite === 1">（写）</template>
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="opt-btn" type="text" size="small" @click="goEdit(scope.row)">编辑</el-button>
                                <el-button class="opt-btn dimission" type="text" size="small" @click="forDel($event, scope.row, scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="page-wrapper">
                        <el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange"></el-pagination>
                    </div>
                </div>
            </div>
        </template>

        <popover name="close" title="确定删除该岗位么？" content="仅删除该岗位，该岗位的员工不会被删除。" :popoverModalStatus.sync="popoverModalStatus" ref="popover">
            <el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
            <el-button type="primary" slot="cancel" class="ok" @click="del">确定</el-button>
        </popover>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                loaded: false,

                popoverModalStatus: false,

                page: 1,
                pageTotal: 1,
                list: []
            }
        },

        computed: {
            noData() {
                return this.loaded && ! this.list.length
            }
        },

        created() {
            this.loading = true

            this.getList().then(() => {
                this.loaded = true
                this.loading = false
            })
        },

        methods: {
            async getList() {
                const params = {
                    action: 'administrator.getPostInfo',
                    pageNo: this.page
                }

                const data = await axios.post('/api/dispatcher.do', params)

                if (! data) {
                    return
                }


                this.pageTotal = data.data.total
                this.list = data.data.postInfoRespList
            },
            pageChange(value) {
                this.page = value
                this.getList()
            },
            forDel(e, item, index) {
                this.$item = item
                this.$index = index
                this.popoverModalStatus = true

                this.$nextTick(() => {
                    const {x, y} = e.target.getBoundingClientRect()

                    this.$refs.popover.$el.style.left = `${x - 680}px`
                    this.$refs.popover.$el.style.top = `${y - 75}px`
                })
            },
            async del() {
                const params = {
                    action: 'administrator.deletePostInfo',
                    postId: this.$item.postId
                }

                // 不等请求返回，直接关闭弹窗，提高用户体验走一波
                this.popoverModalStatus = false
                const temp = this.list.splice(this.$index, 1)

                const data = await axios.post('/api/dispatcher.do', params)

                if (! data) {
                    this.list.splice(this.$index, 0, temp[0])

                    return
                }
            },
            goEdit(item) {
                this.$tempData = item

                this.$router.push(`/postManagement/edit/${item.postId}`)
            },
            go() {
                this.$router.push('/addPost')
            }
        }
    }
</script>