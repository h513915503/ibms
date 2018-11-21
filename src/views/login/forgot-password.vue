<style scoped>
.content {
	width: 1000px;
	margin: 200px auto;
}
.title {
	margin-bottom: 49px;
	color: rgba(0, 0, 0, .75);
	font-size: 24px;
	text-align: center;
}
.step-list {
	display: flex;
	margin-bottom: 49px;
	counter-reset: step;
}
.step-item {
	display: inline-flex;
	align-items: center;
	color: #919191;
	font-size: 16px;
	counter-increment: step;

	&::before {
		content: counter(step);
		width: 32px;
		margin-right: 10px;
		font-size: 14px;
		text-align: center;
		line-height: 32px;
		border-radius: 50%;
		border: 1px solid currentcolor;
	}

	&::after {
		content: "";
		display: inline-block;
		width: 287px;
		height: 1px;
		margin: 0 15px;
		background-color: rgba(0, 0, 0, .15);
	}

	& .icon {
		display: none;
	}
}
.step-item.success {
	&::before {
		display: none;
	}

	& .icon {
		display: block;
		width: 32px;
		height: 32px;
		margin-right: 10px;
	}
}
.step-item.actived::before {
	color: #FFF;
	background-color: #0E7CC2;
}
.step-item.actived::after {
	background-color: #0E7CC2;
}
.step-item:last-child::after {
	display: none;
}
.phone-wrapper {
	width: 440px;
	margin: 0 auto;
}
.captcha-wrapper > .el-button {
	margin-left: 70px;
}
.password-wrapper {
	width: 485px;

	& > .el-button {
		margin-left: 130px;
	}
}
.el-input {
	width: 354px;
}
.el-button {
	width: 354px;
	margin-left: 80px;
	margin-bottom: 24px;
	box-sizing: border-box;
}
.btn-login {
	display: block;
	color: #0E7CC2;
	font-size: 14px;
	text-align: right;
}
.resend-captcha {
	width: 128px;
}
.success-wrapper {
	color: #919191;
	font-size: 20px;
	text-align: center;

	& .icon {
		width: 128px;
		height: 128px;
		margin-bottom: 40px;
	}

	& .router-link {
		color: #0E7CC2;
	}
}
</style>

<template>
	<div class="forgot-password-wrapper">
		<div class="content">
			<h1 class="title">找回密码</h1>
			<ul class="step-list">
				<li class="step-item" :class="{actived: currentIndex === 0, success: currentIndex > 0}">
					<svg class="icon">
						<use xlink:href="#success-1"></use>
					</svg>
					输入手机
				</li>
				<li class="step-item" :class="{actived: currentIndex === 1, success: currentIndex > 1}">
					<svg class="icon">
						<use xlink:href="#success-1"></use>
					</svg>
					验证手机
				</li>
				<li class="step-item" :class="{actived: currentIndex === 2, success: currentIndex > 2}">重置密码</li>
			</ul>

			<div class="phone-wrapper" v-if="currentIndex === 0">
				<el-form ref="form" :model="stepForm1" @submit.native.prevent>
					<el-form-item label="手机号码：">
						<input class="el-input el-input__inner" v-model="stepForm1.phone" maxlength="11" placeholder="请输入手机号码" @input="change" @keyup.enter="verifyPhone" />
					</el-form-item>
				</el-form>
				<el-button type="primary" :disabled="isDisabledStep1" @click="verifyPhone">下一步</el-button>
				<router-link class="btn-login" to="/login">去登录</router-link>
			</div>

			<div class="phone-wrapper captcha-wrapper" v-if="currentIndex === 1">
				<el-form ref="form" :model="stepForm2" @submit.native.prevent>
					<el-form-item label="验证码：">
						<el-input v-model="stepForm2.captcha" autofocus placeholder="请输入验证码" @keyup.native.enter="verifyCaptcha">
							<el-button class="resend-captcha" slot="append" v-text="text" @click="postCaptcha"></el-button>
						</el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" :disabled="isDisabledStep2" @click="verifyCaptcha">下一步</el-button>
			</div>

			<div class="phone-wrapper password-wrapper" v-if="currentIndex === 2">
				<el-form ref="form" :model="stepForm3"  label-width="130px" label-position="right" @submit.native.prevent>
					<el-form-item label="新密码：">
						<el-input type="password" v-model="stepForm3.password" autofocus placeholder="请输入您的新密码"></el-input>
					</el-form-item>
					<el-form-item label="再次输入新密码：">
						<el-input type="password" v-model="stepForm3.passwordCopy" placeholder="请再次输入您的新密码" @keyup.native.enter="resetPassword"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" :disabled="isDisabledStep3" @click="resetPassword">下一步</el-button>
			</div>

			<div class="success-wrapper" v-if="currentIndex === 3">
				<svg class="icon">
					<use xlink:href="#success"></use>
				</svg>
				<p>
					重置成功，{{backTime}}s 后返回登陆页
					<a class="router-link" href="/login">立即返回</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,

				// 禁用按钮
				disabled: false,

				stepForm1: {
					phone: ''
				},

				text: '重新发送',
				stepForm2: {
					captcha: ''
				},

				stepForm3: {
					password: '',
					passwordCopy: ''
				},

				backTime: 3
			}
		},

		computed: {
			isDisabledStep1() {
				if (this.disabled) {
					return true
				}

				return ! this.stepForm1.phone
			},
			isDisabledStep2() {
				if (this.disabled) {
					return true
				}

				return ! this.stepForm2.captcha
			},
			isDisabledStep3() {
				if (this.disabled) {
					return true
				}

				if (this.stepForm3.password && this.stepForm3.passwordCopy) {
					return false
				}

				return true
			}
		},

		destoryed() {
			clearTimeout(this.$timer)
		},

		methods: {
			change(e) {
                this.stepForm1.phone = e.target.value.replace(/\D/g, '')
                e.target.value = this.stepForm1.phone
            },
            async verifyPhone() {
            	if (! /^1\d{10}$/.test(this.stepForm1.phone)) {
            		this.$message.error('请输入正确的手机号码')

            		return
            	}

            	this.disabled = true

            	const data = await this.postCaptcha()

            	this.disabled = false

            	if (data) {
            		this.currentIndex = 1
            		this.startTimer()
            	}
            },
            async postCaptcha() {
            	const params = {
            		action: 'account.SendVerificationCode',
            		phoneNumber: this.stepForm1.phone
            	}

            	const data = await axios.post('/api/dispatcher.do', params)

            	if (! data) {
            		return
            	}

            	this.$message('验证码已发送')
            	this.startTimer()

            	return true
            },
            startTimer() {
            	let num = 59

            	this.text = `${num}s后可重发`

            	this.$timer = setTimeout(function go() {
            		this.text = `${--num}s后可重发`

            		if (! num) {
            			this.text = '重新发送'

            			return
            		}

            		this.$timer = setTimeout(go.bind(this), 1000)
            	}.bind(this), 1000)
            },
            async verifyCaptcha() {
            	const params = {
            		action: 'account.checkVerificationCode',
            		phoneNumber: this.stepForm1.phone,
            		verificationCode: this.stepForm2.captcha
            	}

            	this.disabled = true

            	const data = await axios.post('/api/dispatcher.do', params)

            	this.disabled = false

            	if (! data) {
            		return
            	}

            	this.currentIndex = 2
            },
            async resetPassword() {
            	const params = {
            		action: 'account.getBackPassword',
            		password: this.stepForm3.password,
            		phoneNumber: this.stepForm1.phone,
            		passwordRepeat: this.stepForm3.passwordCopy
            	}

            	this.disabled = true

            	const data = await axios.post('/api/dispatcher.do', params)

            	this.disabled = false

            	if (! data) {
            		return
            	}

            	this.$message('密码重置成功')
            	this.currentIndex = 3

            	this.back()
            },
            back() {
            	setTimeout(function go () {
            		this.backTime--

            		if (this.backTime === 1) {
            			location.href = '/login'

            			return
            		}

            		setTimeout(go.bind(this), 1000)
            	}.bind(this), 1000)
            }
		}
	}
</script>