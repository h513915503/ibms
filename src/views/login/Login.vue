<style scoped>
    #login-container {
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
    .title {
        text-align: center;
        margin-top: 41px;
        font-size: 24px;
        letter-spacing: 2px;
        display: flex;
	    align-items: center;
        justify-content: center;
    }
    .logo {
        display: inline-block;
        width:25px;
        height:24px;
        background:rgba(216,216,216,1);
        border-radius:2px;
        margin-right: 10px;
        margin-top: 2px;
    }
    .el-form {
        padding-top: 48px;
    }
    .el-input {
        width: 354px;
        height: 40px;
        border-radius:4px;
    }
    .el-button {
        width: 354px;
    }
</style>

<template>
    <div id="login-container">

        <div class="login-form">
            <p class="title">
                <img class="logo" src="https://img04.sogoucdn.com/app/a/100520020/1315e8858e0d04c126463cfd6ff4171c">
                登录中宙物业管理平台
            </p>
            <el-form
                ref="loginForm"
                :model="form"
                :rules="rules"
                label-width="140px" label-position="right">
                <el-form-item label="账号：" prop="username">
                    <el-input v-model="form.username" placeholder="请输入">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="form.username" placeholder="请输入密码">
                    </el-input>
                </el-form-item>
                <el-form-item>
					<el-button>登录</el-button>
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
                    username: '',
                    password: ''
                },
                rules: {

                }
            }
        }
    }
</script>
