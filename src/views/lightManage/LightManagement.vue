<style scoped>
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
    .delete-btn, .delete-btn:hover, .delete-btn:active, .delete-btn:focus {
        color: #F5222D;
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
    .lighting::before {
        background: #52C41A;
    }
    .closed::before {
        background: #BFBFBF;
    }
    .page-wrapper {
        margin-top: 20px;
	    text-align: right;
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
    .lighting::before {
        background: #52C41A;
    }
    .closed::before {
        background: #BFBFBF;
    }
</style>

<template>
    <div id="light-wrapper">
        <tab-bar :list="tabs"/>

        <div class="container">
            <div class="operator">
                <!-- <el-button type="primary" @click="go">+ 灯</el-button> -->
                <!-- <el-button type="primary"><i class="el-icon-upload2" /> 导入</el-button> -->
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-exceed="handleExceed">
                    <el-button type="primary"><i class="el-icon-upload2" /> 导入</el-button>
                </el-upload>
                <div class="search-content">
                    <el-input placeholder="姓名/手机号码"></el-input>
			        <el-button type="primary" class="btn-search">查询</el-button>
                </div>
                <!-- <div>导入12345个灯失败</div> -->
            </div>
            <div class="table-content">
                <el-table :data="tableData">
                    <el-table-column label="灯编号" prop="lightNum"></el-table-column>
                    <el-table-column label="品牌" prop="brand"></el-table-column>
                    <el-table-column label="型号" prop="model"></el-table-column>
                    <el-table-column label="出厂日期" sortable prop="outDate"></el-table-column>
                    <el-table-column label="已使用" prop="usedTime" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="累计故障" prop="calcFail" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="所在楼层" prop="floor" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="详细位置" prop="floor" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="状态" prop="status" :filters="[]" :filter-method="filterHandler">
                        <template slot-scope="scope">
                            <span class="status closed" v-if="scope.row.status === 0">已关闭</span>
                            <span class="status error" v-else-if="scope.row.status === 1">故障中</span>
                            <span class="status lighting" v-else>照明中</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" class="delete-btn" size="small">删除</el-button>
                        </template>
                    </el-table-column> -->

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
                search: '',
                tabs: [
                    {
                        number: 123,
                        text: '灯总数'
                    },
                    {
                        number: 321,
                        text: '正常开启'
                    },
                    {
                        number: 432,
                        text: '正常关闭'
                    },
                    {
                        number: 542,
                        text: '故障中'
                    }
                ],
                tableData: [
                    {
                        lightNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-19',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 0
                    },
                    {
                        lightNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-29',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 1
                    },
                    {
                        lightNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-09',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 2
                    }
                ]
            }
        },
        methods: {
            filterHandler(value, row, column) {

            },
            go() {
                this.$router.push('/light/lightAdd')
            }
        },
        components: {
            tabBar
        }
    }
</script>
