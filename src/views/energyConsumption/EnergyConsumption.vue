<style scoped>
    .container {
	    /* padding: 24px; */
        margin-top: -24px;
        box-sizing: border-box;
        /* background-color: #FFF; */
    }
    .page-wrapper {
	    text-align: right;
        background: #fff;
        padding: 24px;
    }
    .search-content {
        display: flex;
        justify-content: flex-end;
        background: #fff;
        padding: 30px 25px 20px 0;
        margin: 0 24px;
    }
    .table-content {
        margin: 0 24px;
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
    .btn-search {
        margin-left: 20px;
    }
    .el-input {
        width:128px !important;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
</style>

<style>
#energy-wrapper .el-tabs .el-tabs__nav-wrap::after {
    background: none;
}

.el-tabs .el-tabs__header {
    padding: 24px 0 0 50px;
    background: #fff;
}
</style>


<template>
    <div id="energy-wrapper">
        <Tab-bar :list="tabs" />

        <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="按园区" name="park">
                    <div class="search-content">
                        <label class="calendar-label">
                            <el-date-picker
                                v-model="date"
                                type="datetimerange"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间">
                            </el-date-picker>
                        </label>
                        <el-button type="primary" class="btn-search">查询</el-button>
                        <el-button type="primary" class="btn-search">导出</el-button>
                    </div>
                    <div class="table-content">
                        <el-table :data="tableData">
                            <el-table-column label="时间" prop="time" sortable></el-table-column>
                            <el-table-column label="电能耗（KW·h）" prop="eleEnergy"></el-table-column>
                            <el-table-column label="水能耗（L）" prop="water"></el-table-column>
                            <el-table-column label="最后更新时间" prop="lastUpdate"></el-table-column>
                        </el-table>
                    </div>
                    <div class="page-wrapper">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="100">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="按公司" name="company">
                    <div class="search-content">
                        <el-input placeholder="单位名称"></el-input>
                        <el-button type="primary" class="btn-search">查询</el-button>
                        <el-button type="primary" class="btn-search">导出</el-button>
                    </div>
                    <div class="table-content">
                        <el-table :data="tableData">
                            <el-table-column label="单位名称" prop="time"></el-table-column>
                            <el-table-column label="电能耗（KW·h）" prop="eleEnergy"></el-table-column>
                            <el-table-column label="水能耗（L）" prop="water"></el-table-column>
                            <el-table-column label="开始计算时间" prop="lastUpdate" sortable></el-table-column>
                            <el-table-column label="最后更新时间" prop="lastUpdate"></el-table-column>
                        </el-table>
                    </div>
                    <div class="page-wrapper">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="100">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="按设备" name="device">
                    <div class="search-content">
                        <el-input placeholder="设备编号/型号"></el-input>
                        <el-button type="primary" class="btn-search">查询</el-button>
                        <el-button type="primary" class="btn-search">导出</el-button>
                    </div>
                    <div class="table-content">
                        <el-table :data="tableData">
                            <el-table-column label="设备编号" prop="time"></el-table-column>
                            <el-table-column label="设备类型" prop="eleEnergy" :filters="[]" :filter-method="filterHandler"></el-table-column>
                            <el-table-column label="设备型号" prop="water"></el-table-column>
                            <el-table-column label="电能耗（KW·h）" prop="lastUpdate"></el-table-column>
                            <el-table-column label="水能耗（L）" prop="lastUpdate"></el-table-column>
                            <el-table-column label="开始计算时间" prop="lastUpdate" sortable></el-table-column>
                            <el-table-column label="最后更新时间" prop="lastUpdate"></el-table-column>
                        </el-table>
                    </div>
                    <div class="page-wrapper">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="100">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- <p>暂无能耗记录</p> -->
    </div>
    
</template>

<script>
    import TabBar from '../../components/tab-bar.vue';

    export default {
        data() {
            return {
                activeName: 'park',
                tabs: [
                    {
                        number: 123,
                        text: '今日耗电（度）'
                    },
                    {
                        number: 321,
                        text: '今日耗水'
                    },
                    {
                        number: 22,
                        text: '今日耗电设备'
                    },
                    {
                        number: 32,
                        text: '今日耗水设备'
                    }
                ],
                tableData: [
                    {
                        time: '2017-12-30',
                        eleEnergy: '223',
                        water: '23',
                        lastUpdate: '2018/1/3'
                    },
                    {
                        time: '2017-12-30',
                        eleEnergy: '223',
                        water: '23',
                        lastUpdate: '2018/1/3'
                    },
                    {
                        time: '2017-12-30',
                        eleEnergy: '223',
                        water: '23',
                        lastUpdate: '2018/1/3'
                    },
                ]
            }
        },
        methods: {
            handleClick() {

            }
        },
        components: {
            TabBar
        }
    }
</script>
