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
    .forgot-password {
        display: block;
        margin-right: 60px;
        color: rgba(0, 0, 0, .65);
        font-size: 14px;
        text-align: right;
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
                <el-form-item label="手机号：" prop="username">
                    <input class="el-input el-input__inner" v-model="form.phone" autofocus maxlength="11" placeholder="请输入" @input="change" />
                </el-form-item>
                <el-form-item :label="label" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" @keyup.native.enter="login"></el-input>
                    <router-link class="forgot-password" to="/forgot-password">找回密码</router-link>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="isDisabled" type="primary" v-if="! logining" @click="login">登录</el-button>
					<el-button disabled type="primary" v-else>登录中...</el-button>
				</el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                label: '密码：\u3000',

                form: {
                    phone: '',
                    password: ''
                },
                rules: {

                },

                logining: false
            }
        },

        computed: {
            isDisabled() {
                if (this.form.phone.length === 11 && this.form.password) {
                    return false
                }

                return true
            }
        },

        methods: {
            change(e) {
                this.form.phone = e.target.value.replace(/\D/g, '')
                e.target.value = this.form.phone
            },
            async login() {
                if (! /^1\d{10}/.test(this.form.phone)) {
                    this.$message.error('请输入正确的手机号码')
                    return
                }

                const params = {
                    action: 'account.accountLogin',
                    account: this.form.phone,
                    password: this.form.password
                }

                this.logining = true

                const data = await axios.post('/api/dispatcher.do', params)

                this.logining = false

                if (! data) {
                    return
                }

                sessionStorage.setItem('token', data.data.token)
                this.$store.commit('setToken', data.data.token)

                await this.$store.dispatch('getUserInfo')

                const path = this.$store.state.path

                if (path) {
                    this.$router.replace(path)
                } else {
                    sessionStorage.removeItem('token')
                    this.$store.commit('setToken', '')

                    this.$message.error('抱歉，你没有任何权限访问该系统')
                }
            }
        }
    }
</script>
