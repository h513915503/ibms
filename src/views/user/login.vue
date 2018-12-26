<style scoped>
.login-wrapper {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 100vh;
	background: url(/images/a.png) center no-repeat, linear-gradient(to bottom, #4278EE 60%, #684FD8);
	background-size: cover;
}
.name {
	position: absolute;
	top: 64px;
	left: 146px;
	color: #FFF;
	font-size: 24px;
}
.login-form {
	padding: 48px;
	margin-right: 18%;
	border-radius: 2px;
	background-color: #FFF;
}
.title {
	margin-bottom: 50px;
	color: #323232;
	font-size: 24px;
}
.form-item {
	display: flex;
	align-items: center;
	margin-bottom: 50px;
	position: relative;
	border-bottom: 1px solid #D9D9D9;
}
.form-item:nth-of-type(2) {
	margin-bottom: 0;
}
.form-item::after {
	content: "";
	height: 1px;
	width: 0;
	position: absolute;
	left: 50%;
	bottom: -1px;
	background-color: #4278EE;
	transform: translateX(-50%);
	transition: all .3s;
}
.form-item.line::after {
	width: 100%;
}
.svg-wrapper {
	padding: 0 10px;
	margin-bottom: 8px;
	margin-right: 10px;
	font-size: 0;
	border-right: 1px solid #D9D9D9;
}
.icon {
	width: 18px;
	height: 18px;
}
.input {
	padding-bottom: 8px;
	border: none;
	font-size: 14px;
}
.input:-webkit-autofill {
	box-shadow: 0 0 0px 1000px white inset !important;
}
.input::placeholder {
	color: #D9D9D9;
}
.login-btn {
	width: 250px;
	border-radius: 2px;
	font-size: 20px;
	line-height: 48px;
	background-color: #4278EE;
}
.login-btn:hover {
	background-color: #3366FF;
}
.forgot-password {
	display: block;
	margin: 10px 0 48px 0;
	color: #8C8C8C;
	font-size: 14px;
	text-align: right;
}
</style>

<template>
	<div class="login-wrapper">
		<h1 class="name">中宙物业管理平台</h1>

		<div class="login-form">
			<h4 class="title">登录</h4>

			<div class="form-item" :class="{line: phoneLine}">
				<div class="svg-wrapper">
					<svg class="icon">
						<use xlink:href="#peo"></use>
					</svg>
				</div>
				<input class="input" v-model="phone" autofocus maxlength="11" placeholder="请输入" @input="change" @focus="focus('phone')" @blur="blur('phone')" />
			</div>
			<div class="form-item" :class="{line: passwordLine}">
				<div class="svg-wrapper">
					<svg class="icon">
						<use xlink:href="#lock"></use>
					</svg>
				</div>
				<input class="input" type="password" v-model="password" placeholder="请输入密码" @keyup.enter="login" @focus="focus('password')" @blur="blur('password')" />
			</div>

			<router-link class="forgot-password" to="/forgot-password">忘记密码？</router-link>

			<div class="btn login-btn" :class="{disabled: isDisabled}" @click="login">{{disabled ? '登录中...' : '登录'}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				phoneLine: false,
				passwordLine: false,

				disabled: false,

				phone: '',
				password: ''
			}
		},

		computed: {
			isDisabled() {
				if (this.disabled) {
					return true
				}

				if (this.phone.length === 11 && this.password) {
					return false
				}

				return true
			}
		},

		methods: {
			focus(type) {
				type === 'phone' ? this.phoneLine = true : this.passwordLine = true
			},
			blur(type) {
				type === 'phone' ? this.phoneLine = false : this.passwordLine = false
			},
			change(e) {
				this.phone = e.target.value.replace(/\D/g, '')
				e.target.value = this.phone
			},
			async login() {
				if (! /^1\d{10}/.test(this.phone)) {
					this.$message.error('请输入正确的手机号码')
					return
				}

				if (! this.password) {
					return
				}

				const params = {
					action: 'account.accountLogin',
					account: this.phone,
					password: this.password
				}

				this.disabled = true

				const data = await axios.post('/api/account/dispatcher.do', params)

				this.disabled = false

				if (! data) {
					return
				}

				const {token} = data.data

				sessionStorage.setItem('token', token)

				location.href = '/'
			}
		}
	}
</script>
