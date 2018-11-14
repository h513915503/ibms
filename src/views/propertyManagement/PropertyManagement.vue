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
    <div id="property-wrapper">
        <div class="no-data" v-if="index === 0">
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
                <el-table :data="tableData">
                    <el-table-column prop="number" label="物业人员编号"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="phone" label="手机号码"></el-table-column>
                    <el-table-column prop="post" label="岗位"></el-table-column>
                    <el-table-column label="状态" :filters="[]" :filter-method="filterHandler">
                        <template slot-scope="scope">
                            <span class="job-status dimission" v-if="scope.row.status === 0">离职</span>
                            <span class="job-status" v-else>在职</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="入职时间" sortable>
                    </el-table-column>
                    <el-table-column label="离职时间" sortable>
                        <template slot-scope="scope">
                            <span v-text="scope.row.time" v-if="scope.row.time"></span>
                            <span v-else>暂未离职</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button class="opt-btn" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                            <el-popover placement="bottom-end" title="该员工确定离职了么？" width="400" trigger="click" content="该员工确定离职了么？">
                                <el-button class="opt-btn" type="text dimission" size="small" slot="reference" data-type="1">离职</el-button>

                                <p class="popover-content">将该员工设为离职之后，该员工的账号将被注销。</p>
                                <div class="popover-btn-wrapper">
                                    <el-button size="small">取消</el-button>
                                    <el-button size="small" class="btn-confirm">确定</el-button>
                                </div>
                            </el-popover>
                    </template>
                    </el-table-column>
                </el-table>

                <div class="page-wrapper">
                    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

    export default {
        data() {
            return {
                index: 1,
                tableData: []
            }
        },
        created() {
            this.getPropertyDataList()
        },
        methods: {
            go() {
                this.$router.push('/addProperty')
            },
            async getPropertyDataList() {
                const params = {
                    role: 0
                };
                const data = await axios.post('/getPropertyManagementList', params);
                this.tableData = data.data;
            },
            handleClick(row) {
                // console.log(row)
                this.$router.push(`/addProperty/${row.status}`);
                this.$store.state.detailInfo = row
            }
        },
        components: {
            
        }
    }
</script>
