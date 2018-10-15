<style scoped>
    .container {
	    padding: 24px;
        margin: 24px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .operator {
        margin-bottom: 40px;
    }
    .search-input {
       width: 336px;
       height: 32px;
       float: right;     
    }
    .delete-btn, .delete-btn:hover, .delete-btn:active, .delete-btn:focus {
        color: #F5222D;
    }
    .page-wrapper {
        margin-top: 20px;
	    text-align: right;
    }
</style>

<template>
    <div id="light-wrapper">
        <tab-bar :list="tabs"/>

        <div class="container">
            <div class="operator">
                <el-button type="primary">+ 灯</el-button>
                <el-button>批量注册</el-button>
                <el-input
                    class="search-input"
                    placeholder="灯编号/品牌/型号"
                    prefix-icon="el-icon-search"
                    v-model="search">
                </el-input>
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
                    <el-table-column label="状态" prop="status" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" class="delete-btn" size="small">删除</el-button>
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
                        status: 0
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
                        status: 0
                    }
                ]
            }
        },
        methods: {
            filterHandler(value, row, column) {

            }
        },
        components: {
            tabBar
        }
    }
</script>
