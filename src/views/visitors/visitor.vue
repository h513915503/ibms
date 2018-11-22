<style scoped>
    #visitor-wrapper {
        min-width: 1000px;
    }
    .container {
        padding: 24px;
        margin-top: 20px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .operator {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    .search-content {
        display: flex;
        justify-content: space-between;
    }
    .btn-search {
        margin-left: 20px;
    }
    .separator {
        margin: 0 8px;
    }
    .calendar-label {
        display: flex;
        align-items: center;
        margin-right: 20px;

        & span {
            flex-shrink: 0;
            margin-right: 10px;
        }
    }
    .status {
        display: flex;
        align-items: center;

        &::before {
            content: "";
            width: 6px;
            height: 6px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: green;
        }
    }
    .error::before {
        background: #F5222D;
    }
    .normal::before {
        background: #52C41A;
    }
    .left::before {
        background: #BFBFBF;
    }
    .hangout::before {
        background: #F5222D;
    }
    .page-wrapper {
        margin-top: 20px;
	    text-align: right;
    }
</style>

<template>
    <div id="visitor-wrapper">
        <loading v-if="loading"></loading>

        <template v-else>
            <tab-bar :list="tabs"/>

            <div class="container">
                <div class="operator">
                    <el-button type="primary" @click="go">+ 访客</el-button>
                    <div class="search-content">
                        <label class="calendar-label">
                            <span>到访时间：</span>
                            <el-date-picker
                                v-model="date1"
                                value-format="timestamp"
                                type="datetime"
                                placeholder="开始时间">
                            </el-date-picker>
                            <span class="separator">-</span>
                            <el-date-picker
                                v-model="date2"
                                value-format="timestamp"
                                type="datetime"
                                placeholder="结束时间">
                            </el-date-picker>
                        </label>
                        <el-input placeholder="姓名/手机号码" v-model="userNameOrPhone"></el-input>
                        <el-button type="primary" class="btn-search" @click="onSearch">查询</el-button>
                    </div>
                </div>
                <div class="table-content">
                    <el-table :data="tableData" @sort-change="sortChange" @filter-change="filterHandler">
                        <el-table-column label="访客编号" prop="aid"></el-table-column>
                        <el-table-column label="访客姓名" prop="acountName"></el-table-column>
                        <el-table-column label="访客手机号码" prop="phoneNumber"></el-table-column>
                        <el-table-column label="被访单位" prop="rentalCompany"></el-table-column>
                        <el-table-column label="被访人" prop="interviewee"></el-table-column>
                        <el-table-column label="被访人手机号码" prop="intervieweeNumber"></el-table-column>
                        <el-table-column
                            label="状态"
                            prop="activeStatus"
                            :filter-multiple="false"
                            column-key="activeStatus"
                            :filters="[{text: '正常', value: '6'}, {text: '异常', value: '5'}, {text: '未进园区', value: '7'}, {text: '已离开', value: '4'}]"
                        >
                            <template slot-scope="scope">
                                <span class="status error" v-if="scope.row.activeStatus === 5">异常</span>
                                <span class="status normal" v-else-if="scope.row.activeStatus === 6">正常</span>
                                <span class="status hangout" v-else-if="scope.row.activeStatus === 7">未进园区</span>
                                <span class="status left" v-else>已离开</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="访问时间" prop="time" sortable='custom'>
                            <template slot-scope="scope">
                                <span v-if="scope.row.accessTimeStart">{{ scope.row.accessTimeStart | dateFormat }} - {{ scope.row.accessTimeEnd | timeFormat }}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="toEditPage(scope)">编辑</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                    <div class="page-wrapper">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="pageChange"
                            :total="totalItem">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </template>
        
    </div>
</template>

<script>

    export default {
        data() {
            return {
                loading: false,
                tabs: [
                    {
                        number: '',
                        text: '今日累计访客',
                    },
                    {
                        number: '',
                        text: '当前园区访客'
                    },
                    {
                        number: '',
                        text: '已离开园区访客'
                    }
                ],
                tableData: [],
                pageNum: '1',
                pageSize: '10',
                type: '访客',
                date1: '',
                date2: '',
                userNameOrPhone: '',
                totalItem: '',
                orderBy: '',
                activeStatus: ''
            }
        },
        filters: {
            // timestampToTime(val) {
            //     const date = new Date(val);
            //     const YY = date.getFullYear() + '-';
            //     const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1 ) + '-';
            //     const dd = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            //     const hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
            //     const mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
            //     const ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
            //     return YY + MM + dd + hh + mm + ss;
            // },
        },
        methods: {
            filterHandler(filter) {
                console.log(filter.activeStatus[0]);
                this.activeStatus = filter.activeStatus[0]
                this.getTableData()
            },
            sortChange(colum) {
                const order = colum.order === 'ascending' ? 'access_time_start-asc' : colum.order === 'descending' ? 'access_time_start-desc' : ''
                this.orderBy = order
                this.getTableData();
            },
            go() {
                this.$router.push('/visitor/addVisitor')
            },
            pageChange(val) {
                this.pageNum = val;
                this.getTableData();
            },
            onSearch() {
                this.getTableData();
            },
            toEditPage(scope) {
                this.$router.push(`/visitor/editVisitor#${scope.row.id}`)
            },
            async getTopData() {
                const params = {
                    action: 'accountManagement.queryFKCount'
                };
                const data = await axios.post('/api/dispatcher.do', params);

                if(! data) {
                    return;
                }

                this.tabs[0].number = data.data.allFkCount;
                this.tabs[1].number = data.data.dqFkCount;
                this.tabs[2].number = data.data.lkFkCount;
            },
            async getTableData() {
                const params = {
                    action: 'accountManagement.queryAccountManagementPage',
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    type: this.type,
                    fromTimeYZStr: this.date1,
                    toTimeYZStr: this.date2,
                    userNameOrPhone: this.userNameOrPhone,
                    orderBy: this.orderBy,
                    activeStatus: this.activeStatus
                }

                const data = await axios.post('/api/dispatcher.do', params);

                if(! data) {
                    return;
                }

                this.tableData = data.data.list;
                this.totalItem = data.data.total;
            }
        },
        created() {
            this.loading = true;

            Promise.all([this.getTableData(), this.getTopData()]).then(() => {
                this.loading = false
            })
        },
    }
</script>
