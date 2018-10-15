<style scoped>
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
    .page-wrapper {
        margin-top: 20px;
	    text-align: right;
    }
</style>

<template>
    <div class="device-error-wrapper">
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
                    <el-input placeholder="设备编号"></el-input>
			        <el-button type="primary" class="btn-search">查询</el-button>
                </div>
            </div>

            <div class="table-content">
                <el-table :data="tableData">
                    <el-table-column label="故障时间" prop="errorTime" sortable></el-table-column>
                    <el-table-column label="设备编号" prop="deviceNum"></el-table-column>
                    <el-table-column label="设备类型" prop="deviceType" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="所在楼层" prop="floor" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="详细位置" prop="position" :filters="[]" :filter-method="filterHandler"></el-table-column>
                    <el-table-column label="状态" prop="status" :filters="[]" :filter-method="filterHandler">
                        <template slot-scope="scope">
                            <span class="status closed" v-if="scope.row.status === 0">已关闭</span>
                            <span class="status error" v-else-if="scope.row.status === 1">故障中</span>
                            <span class="status lighting" v-else>照明中</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="维修说明" prop="serviceTips"></el-table-column>
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
                        text: '总故障数'
                    },
                    {
                        number: 32,
                        text: '灯故障'
                    },
                    {
                        number: 32,
                        text: '空调故障'
                    },
                ],
                tableData: [
                    {
                        errorTime: '2019/2/2 23:21',
                        deviceNum: 'DE23123',
                        deviceType: '灯',
                        deviceModel: 'M16A4',
                        floor: '3层',
                        position: '楼梯间',
                        status: 0,
                        serviceTips: '暂未修复'
                    },
                    {
                        errorTime: '2019/2/2 23:21',
                        deviceNum: 'DE23123',
                        deviceType: '灯',
                        deviceModel: 'M16A4',
                        floor: '3层',
                        position: '楼梯间',
                        status: 0,
                        serviceTips: '暂未修复'
                    },
                    {
                        errorTime: '2019/2/2 23:21',
                        deviceNum: 'DE23123',
                        deviceType: '灯',
                        deviceModel: 'M16A4',
                        floor: '3层',
                        position: '楼梯间',
                        status: 0,
                        serviceTips: '暂未修复'
                    },
                ]
            }
        },
        components: {
            tabBar
        }
    }
</script>