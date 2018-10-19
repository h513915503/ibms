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
</style>

<template>
    <div id="air-conditioner-wrapper">
        <tab-bar :list="tabs"/>

        <div class="container">
            <div class="operator">
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
                    <el-input placeholder="编号/品牌/型号"></el-input>
			        <el-button type="primary" class="btn-search">查询</el-button>
                </div>
            </div>

            <div class="table-content">
                <el-table :data="tableData">
                    <el-table-column label="空调编号" prop="airNum"></el-table-column>
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
                            <span class="status lighting" v-else>服务中</span>
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
                tabs: [
                    {
                        number: 213,
                        text: '空调总数'
                    },
                    {
                        number: 123,
                        text: '正常开启'
                    },
                    {
                        number: 432,
                        text: '正常关闭'
                    },
                    {
                        number: 312,
                        text: '故障中'
                    }
                ],
                tableData: [
                    {
                        airNum: '01',
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
                        airNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-19',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 1
                    },
                    {
                        airNum: '01',
                        brand: '公牛',
                        model: 'v100',
                        outDate: '2012-3-19',
                        usedTime: 2323,
                        calcFail: 3,
                        floor: 5,
                        position: '楼梯间',
                        status: 2
                    },
                ]
            }
        },
        methods: {
            filterHandler(value, row, column) {

            },
        },
        components: {
            tabBar
        }
    }
</script>
