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
        <tab-bar :list="tabs"/>

        <div class="container">
            <div class="operator">
                <div class="search-content">
					<label class="calendar-label">
						<el-date-picker
                            v-model="date"
                            type="datetimerange"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间">
                        </el-date-picker>
					</label>
					<el-input placeholder="姓名/手机号码"></el-input>
					<el-button type="primary" class="btn-search">查询</el-button>
				</div>
            </div>

            <div class="table-content">
                <el-table :data="tableData">
                    <el-table-column label="时间" prop="time" sortable></el-table-column>
                    <el-table-column label="姓名" prop="name"></el-table-column>
                    <el-table-column label="出/入" prop="outOrIn"></el-table-column>
                    <el-table-column label="业主/访客" prop="role"></el-table-column>
                    <el-table-column label="停留时长" prop="behind"></el-table-column>
                    <el-table-column label="状态" prop="status" :filters="[]" :filter-method="filterHandler">
                        <template slot-scope="scope">
                            <span class="status error" v-if="scope.row.status === 0">异常</span>
                            <span class="status normal" v-else-if="scope.row.status === 1">正常</span>
                            <span class="status hangout" v-else-if="scope.row.status === 2">乱走</span>
                            <span class="status left" v-else>已离开</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-wrapper">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tabBar from '@/components/tab-bar.vue'

    export default {
        data() {
            return {
                date: '',
                tabs: [
                    {
                        number: 300,
                        text: '今日累计访客量'
                    },
                    {
                        number: 200,
                        text: '当前园区访客'
                    },
                    {
                        number: 100,
                        text: '已离开园区访客'
                    }
                ],
                tableData: [
                    {
                        time: '2012/2/3 4:32',
                        name: 'duan shilei',
                        outOrIn: '出',
                        role: '业主',
                        behind: '89',
                        status: 0
                    },
                    {
                        time: '2012/2/3 4:32',
                        name: 'duan shilei',
                        outOrIn: '出',
                        role: '业主',
                        behind: '89',
                        status: 1
                    },
                    {
                        time: '2012/2/3 4:32',
                        name: 'duan shilei',
                        outOrIn: '出',
                        role: '业主',
                        behind: '89',
                        status: 2
                    },
                    {
                        time: '2012/2/3 4:32',
                        name: 'duan shilei',
                        outOrIn: '出',
                        role: '业主',
                        behind: '89',
                        status: 3
                    },
                ]
            }
        },
        methods: {
            filterHandler() {

            },
        },
        components: {
            tabBar
        }
    }
</script>