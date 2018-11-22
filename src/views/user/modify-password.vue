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
            <el-form :model="form" label-width="140px" label-position="right">
                <el-form-item label="旧密码：" prop="oldpassword">
                    <el-input type="password" v-model="form.passwordOld" autofocus placeholder="请输入旧密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="password">
                    <el-input type="password" v-model="form.passwordNew" placeholder="请输入新密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="password">
                    <el-input type="password" v-model="form.passwordRepeat" placeholder="请再次输入新密码" @keyup.native.enter="updatePassword">
                    </el-input>
                </el-form-item>
                <el-form-item>
					<el-button type="primary" :disabled="isDisabled" @click="updatePassword">确定</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                disabled: false,

                form: {
                    passwordOld: '',
                    passwordNew: '',
                    passwordRepeat: ''
                }
            }
        },

        computed: {
            isDisabled() {
                if (this.disabled) {
                    return true
                }

                if (this.form.passwordOld && this.form.passwordNew && this.form.passwordRepeat) {
                    return false
                }

                return true
            }
        },

        methods: {
            back() {
                this.$router.back()
            },
            async updatePassword() {
                const params = {
                    action: 'account.updatePassword',
                    oldPwd: this.form.passwordOld,
                    newPwd: this.form.passwordNew,
                    newPwdT: this.form.passwordRepeat
                }

                this.disabled = true

                const data = await axios.post('/api/dispatcher.do', params)

                this.disabled = false

                if (! data) {
                    return
                }

                sessionStorage.removeItem('token')
                location.href = '/login'
            }
        }
    }
</script>
