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
        justify-content: flex-end;
        margin-bottom: 40px;
    }
    .search-content {
        display: flex;
        justify-content: flex-end;
    }
    .separator {
        margin: 0 8px;
    }
    .btn-search {
        margin-left: 20px;
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
    <div id="personnel-container">
        <loading v-if="loading"></loading>

        <template v-else>
            <tab-bar :list="tabs"/>

            <div class="container">
                <div class="operator">
                    <div class="search-content">
                        <label class="calendar-label">
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
                        <el-button type="primary" class="btn-search" @click="searchHandler">查询</el-button>
                    </div>
                </div>

                <div class="table-content">
                    <el-table :data="tableData">
                        <el-table-column label="时间" sortable>
                            <template slot-scope="scope">
                                <span v-if="scope.row.allDateTamp">{{ scope.row.allDateTamp | timestampToTime }}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" prop="accountName"></el-table-column>
                        <el-table-column label="出/入" prop="accessStatus"></el-table-column>
                        <el-table-column label="业主/访客" prop="type"></el-table-column>
                        <el-table-column label="停留时长" prop="stayTime"></el-table-column>
                        <el-table-column label="状态" :filters="[]" :filter-method="filterHandler">
                            <template slot-scope="scope">
                                <span class="status error" v-if="scope.row.activeStatus === 5">异常</span>
                                <span class="status normal" v-else-if="scope.row.activeStatus === 6">正常</span>
                                <span class="status hangout" v-else-if="scope.row.activeStatus === 7">未进园区</span>
                                <span class="status left" v-else>已离开</span>
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
    import tabBar from '@/components/tab-bar.vue'

    export default {
        data() {
            return {
                loading: false,
                date: '',
                totalItem: '',
                tabs: [
                    {
                        number: '',
                        text: '今日累计访客量'
                    },
                    {
                        number: '',
                        text: '当前园区访客'
                    },
                    {
                        number: '',
                        text: '当前开园区业主'
                    }
                ],
                tableData: [],
                pageNum: '1',
                pageSize: '10',
                date1: '',
                date2: '',
                userNameOrPhone: ''
            }
        },
        filters: {
            timestampToTime(val) {
                const date = new Date(val);
                const YY = date.getFullYear() + '-';
                const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1 ) + '-';
                const dd = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                const hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                const mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                const ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
                return YY + MM + dd + hh + mm + ss;
            },
        },
        methods: {
            filterHandler() {

            },
             pageChange(val) {
                this.pageNum = val;
                this.getTableData();
            },
            searchHandler() {
                this.getTableData();
            },
            async getTopData() {
                const params = {
                    action: 'accountManagement.queryAllCount'
                };
                const data = await axios.post('/api/dispatcher.do', params);

                if(! data) {
                    return;
                }

                this.tabs[0].number = data.data.peopleCounting;
                this.tabs[1].number = data.data.dqFkCount;
                this.tabs[2].number = data.data.dqYZCount;
            },
            async getTableData() {
                const params = {
                    action: 'accountManagement.queryAccountManagementLogPage',
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    fromTimeYZStr: this.date1,
                    toTimeYZStr: this.date2,
                    userNameOrPhone: this.userNameOrPhone
                }

                const data = await axios.post('/api/dispatcher.do', params);
                if(!data) {
                    return;
                }

                this.tableData = data.data.list;
                this.totalItem = data.data.total;
            }
        },
        created() {
            this.loading = true;

            Promise.all([this.getTopData(), this.getTableData()]).then(() => {
                this.loading = false;
            })
        }
    }
</script>