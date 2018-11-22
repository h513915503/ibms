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
    .popover-wrapper {
        width: 440px;
    }
</style>

<template>
    <div id="property-wrapper">
        <loading v-if="loading"></loading>

        <template v-else>
            <div class="no-data" v-if="noData">
                <h1>暂无物业人员</h1>
                <p>您还没有维护物业人员信息，</p>
                <p class="bottom-tip">点击下方【+ 物业人员】按钮添加新的物业人员。</p>
                <el-button type="primary" @click="go">+ 物业人员</el-button>
            </div>

            <div class="container" v-else>
                <div class="search-wrapper">
                    <el-button type="primary" @click="go">+ 物业人员</el-button>
                </div>

                <div class="table-content">
                    <el-table :data="list" @sort-change="sortChange" @filter-change="filterHandler">
                        <el-table-column prop="accountId" label="物业人员编号"></el-table-column>
                        <el-table-column prop="accountName" label="姓名"></el-table-column>
                        <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
                        <el-table-column label="岗位">
                            <template slot-scope="scope">
                                <ul>
                                    <li v-for="item of scope.row.postNameArray">
                                        {{item}}
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态"
                            :filter-multiple="false"
                            column-key="status"
                            :filters="[{text: '在职', value: '0'}, {text: '离职', value: '1'}]"
                        ></el-table-column>
                        <el-table-column label="入职时间" prop="hireDate" sortable='custom'></el-table-column>
                        <el-table-column label="离职时间" prop="termDate" sortable='custom'>
                            <template slot-scope="scope">
                                <span v-if="scope.row.termDate">{{scope.row.termDate}}</span>
                                <span v-else>暂未离职</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="opt-btn" type="text" size="small" @click="goEdit(scope.row)">编辑</el-button>
                                <el-button class="opt-btn dimission" type="text" size="small" @click="forLeaveOffice($event, scope.row, scope.$index)">离职</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="page-wrapper">
                        <el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange"></el-pagination>
                    </div>
                </div>
            </div>
        </template>

        <popover name="close" title="该员工确定离职了么？" content="将该员工设为离职之后，该员工的账号将被注销。" :popoverModalStatus.sync="popoverModalStatus" ref="popover">
            <el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
            <el-button type="primary" slot="cancel" class="ok" @click="leaveOffice">确定</el-button>
        </popover>
	</div>
</template>

<script>

    export default {
        data() {
            return {
                loading: false,
                loaded: false,

                page: 1,
                pageTotal: 1,
                list: [],

                popoverModalStatus: false,

                status: '',
                rank: '',
                order: ''
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
            go() {
                this.$router.push('/propertyManagement/add')
            },
            filterHandler(filter) {
                this.status = filter.status[0]
                this.getList()
            },
            sortChange(colum) {
                this.rank = colum.prop;
                this.order = colum.order === 'ascending' ? '0' : colum.order === 'descending' ? '1' : '';
                this.getList()
            },
            async getList() {
                const params = {
                    action: 'administrator.getPmoInfo',
                    pageNo: this.page,
                    pageSize: 10,
                    rank: this.rank ? this.rank : undefined,
                    order: this.order ? this.order : undefined,
                    status: this.status ? this.status : undefined
                }

                const data = await axios.post('/api/dispatcher.do', params)

                if (! data) {
                    return
                }

                this.pageTotal = + data.data.total
                this.list = data.data.accountInfoResList
            },
            pageChange(value) {
                this.page = value
                this.getList()
            },
            goEdit(item) {
                this.$tempData = item

                this.$router.push(`/propertyManagement/edit/${item.accountId}`)
            },
            forLeaveOffice(e, item, index) {
                this.$item = item
                this.$index = index
                this.popoverModalStatus = true

                this.$nextTick(() => {
                    const {x, y} = e.target.getBoundingClientRect()

                    this.$refs.popover.$el.style.left = `${x - 750}px`
                    this.$refs.popover.$el.style.top = `${y - 75}px`
                })
            },
            async leaveOffice() {
                const params = {
                    action: 'administrator.dimissionOpreate',
                    pmoId: this.$item.accountId,
                    name: this.$item.accountName
                }

                // 不等请求返回，直接关闭弹窗，提高用户体验走一波
                this.popoverModalStatus = false
                const temp = this.list.splice(this.$index, 1)

                const data = await axios.post('/api/dispatcher.do', params)

                if (! data) {
                    this.list.splice(this.$index, 0, temp[0])

                    return
                }

                this.list.splice(this.$index, 1)

                // 释放内存
                this.$index = null
                this.$item = null
            }
        }
    }
</script>
