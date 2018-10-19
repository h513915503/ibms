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
        <div class="no-data" v-if="index === 0">
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
                <el-table :data="tableData">
                    <el-table-column prop="number" label="岗位编号"></el-table-column>
                    <el-table-column prop="name" label="岗位名称"></el-table-column>
                    <el-table-column prop="power" label="权限"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button class="opt-btn" type="text" size="small">编辑</el-button>
                            <el-popover placement="bottom-end" title="确定删除该岗位么？" width="400" trigger="click" content="确定删除该岗位么？">
                                <el-button class="opt-btn" type="text dimission" size="small" slot="reference" data-type="1">删除</el-button>

                                <p class="popover-content">仅删除该岗位，该岗位的员工不会被删除。</p>
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
                tableData: [
                    {
                        number: 123,
                        name: '前台专员',
                        power: '人员 - 访客登记（读，写）'
                    },
                    {
                        number: 123,
                        name: '前台专员',
                        power: '人员 - 访客登记（读，写）'
                    },
                    {
                        number: 123,
                        name: '前台专员',
                        power: '人员 - 访客登记（读，写）'
                    }
                ]
            }
        },
        methods: {
            go() {
                this.$router.push('/addPost')
            }
        }
    }
</script>