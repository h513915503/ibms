<style scoped>
    #modify-password-container {
        width: 100%;
        height: 100vh;
        background:rgba(245,245,245,1);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-form {
        width: 552px;
        height: 352px;
        background:rgba(255,255,255,1);
        border-radius:2px;
    }
    .el-form {
        padding-top: 48px;
    }
    .el-input {
        width: 354px;
        height: 40px;
        border-radius:4px;
    }
</style>

<template>
    <div id="modify-password-container">

        <div class="login-form">
            <el-form
                ref="loginForm"
                :model="form"
                :rules="rules"
                label-width="140px" label-position="right">
                <el-form-item label="旧密码：" prop="oldpassword">
                    <el-input v-model="form.username" placeholder="请输入旧密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="password">
                    <el-input v-model="form.username" placeholder="请输入新密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="password">
                    <el-input v-model="form.username" placeholder="请输入新密码">
                    </el-input>
                </el-form-item>
                <el-form-item>
					<el-button type="info">确定</el-button>
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
                form: {
                    oldpassword: '',
                    password: ''
                },
                rules: {

                }
            }
        }
    }
</script>
