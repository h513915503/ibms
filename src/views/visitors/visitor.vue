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
        <tab-bar :list="tabs"/>

        <div class="container">
            <div class="operator">
                <el-button type="primary" @click="go">+ 访客</el-button>
                <div class="search-content">
					<label class="calendar-label">
						<span>到访时间：</span>
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
                    <el-table-column label="访客编号" prop="visitorNum"></el-table-column>
                    <el-table-column label="访客姓名" prop="visitorName"></el-table-column>
                    <el-table-column label="访客手机号码" prop="visitorPhone"></el-table-column>
                    <el-table-column label="被访单位" prop="company"></el-table-column>
                    <el-table-column label="被访人" prop="name"></el-table-column>
                    <el-table-column label="被访人手机号码" prop="phone"></el-table-column>
                    <el-table-column label="状态" prop="status" :filters="[]" :filter-method="filterHandler">
                        <template slot-scope="scope">
                            <span class="status error" v-if="scope.row.status === 0">异常</span>
                            <span class="status normal" v-else-if="scope.row.status === 1">正常</span>
                            <span class="status hangout" v-else-if="scope.row.status === 2">乱走</span>
                            <span class="status left" v-else>已离开</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="访问时间" prop="time" sortable></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
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
                        text: '今日累计访客',
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
                        visitorNum: 123,
                        visitorName: 'duan shilei',
                        visitorPhone: '1234545666',
                        company: 'alibaba group',
                        name: 'song yang',
                        phone: '1234245353',
                        status: 0,
                        time: '2432441',
                    },
                    {
                        visitorNum: 123,
                        visitorName: 'duan shilei',
                        visitorPhone: '1234545666',
                        company: 'alibaba group',
                        name: 'song yang',
                        phone: '1234245353',
                        status: 1,
                        time: '2432441',
                    },
                    {
                        visitorNum: 123,
                        visitorName: 'duan shilei',
                        visitorPhone: '1234545666',
                        company: 'alibaba group',
                        name: 'song yang',
                        phone: '1234245353',
                        status: 2,
                        time: '2432441',
                    },
                    {
                        visitorNum: 123,
                        visitorName: 'duan shilei',
                        visitorPhone: '1234545666',
                        company: 'alibaba group',
                        name: 'song yang',
                        phone: '1234245353',
                        status: 3,
                        time: '2432441',
                    }
                ],
            }
        },
        methods: {
            filterHandler() {

            },
            go() {
                this.$router.push('/visitor/addVisitor')
            }
        },
        components: {
            tabBar
        }
    }
</script>
