<style scoped>
    #add-post {
        padding: 24px;
    }
    .container {
        padding: 24px;
        margin-top: 20px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .el-input {
        width: 354px;
        height: 40px;
    }
    .power-list {
        & li {
            height: 60px;
        }
    }
    .delete-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        color: RGBA(245, 34, 45, 1);
        border-radius: 16px;
        border: 1px solid RGBA(245, 34, 45, 1);
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        cursor: pointer;
        margin-left: 52px;
    }
</style>

<template>
    <div id="add-post">
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/postManagement'}">岗位管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增岗位</el-breadcrumb-item>
		</el-breadcrumb>

        <div class="container">
            <el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="岗位编号：">
					<span>000</span>
				</el-form-item>
				<el-form-item label="岗位名称：">
					<el-input placeholder="如：前台"></el-input>
				</el-form-item>
                <el-form-item label="权限：">
                    <ul class="power-list">
                        <li v-for="item of powerList" :key="item.power1">
                            <el-select v-model="item.power1" placeholder="一级导航"></el-select> 一
                            <el-select v-model="item.power2" placeholder="二级导航"></el-select>
                            <el-checkbox v-model="item.read" style="margin-left: 48px">读</el-checkbox>
                            <el-checkbox v-model="item.write">写</el-checkbox>
                            <span class="delete-icon" @click="deletePower(item)">一</span>
                        </li>
                    </ul>
                    <el-button type="text" @click="addPower">添加新权限</el-button>
					<!-- <template>
                        <el-select v-model="value" placeholder="一级导航"></el-select> 一
                        <el-select v-model="value" placeholder="二级导航"></el-select>
                        <el-checkbox v-model="checked" style="margin-left: 40px">读</el-checkbox>
                        <el-checkbox v-model="checked">写</el-checkbox><br />
                        <el-button type="text">添加新权限</el-button>
                    </template> -->
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit">确定</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                powerCount: 1,
                form: {

                },
                powerList: [
                    {
                        power1: '场地',
                        poewrs: '办公租赁',
                        read: false,
                        write: false,
                        index: 1
                    }
                ],
            }
        },
        methods: {
            submit() {

            },
            addPower() {
                this.powerCount ++;
                this.powerList.push({
                    power1: '场地' + this.powerCount,
                    poewrs: '办公租赁' + this.powerCount,
                    read: false,
                    write: false,
                    index: this.powerCount
                })
            },
            deletePower(row) {
                this.powerCount --;
                this.powerList = this.powerList.filter(item => item.index !== row.index);
            }
        },
        created() {
            console.log(this.$store.state.detailInfo)
        }
    }
</script>
