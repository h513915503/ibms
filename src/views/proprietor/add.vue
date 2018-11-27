<style scoped>
#proprietor-add-wrapper {
	padding: 24px;
}
.container {
	padding: 24px;
	margin-top: 20px;
	box-sizing: border-box;
	background-color: #FFF;
}
.el-input, .el-select {
	width: 354px;
}
.file-wrapper {
	display: flex;
	align-items: center;
	margin-top: 10px;
	color: rgba(0, 0, 0, .45);
	font-size: 14px;
}
.input-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 104px;
	height: 104px;
	padding: 15px 0;
	margin-right: 10px;
	cursor: pointer;
	border-radius: 4px;
	box-sizing: border-box;
	border: 2px dashed rgba(0, 0, 0, .15);;
	background-color: rgba(0, 0, 0, .02);
}
.icon {
	width: 24px;
	height: 24px;
	position: relative;

	&::before, &::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: rgba(0, 0, 0, .45);
		transform: translate(-50%, -50%);
	}

	&::before {
		width: 100%;
		height: 2px;
	}

	&::after {
		width: 2px;
		height: 100%;
	}
}
.upload {
	display: none;
}
.face-image-wrapper {
	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;
}
.face-image {
	width: 104px;
	height: 104px;
	margin-right: 12px;
	object-fit: cover;
}
.scan-icon {
	display: none;
	width: 104px;
	height: 104px;
	position: absolute;
	top: -100%;
	left: 0;
}
.animation {
	display: block;
	animation: t 2s infinite;
}
@keyframes t {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(100%);
	}
}
.recollection {
	display: block;
	color: #0E7CC2;
	font-size: 14px;
	cursor: pointer;
}
.bottom-tips {
	font-size: 16px;
}
</style>

<template>
	<div id="proprietor-add-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>人员</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/proprietor'}">业主管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增业主</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
			<el-form ref="form" :model="form" label-width="210px" label-position="right">
			<el-form-item label="业主姓名：">
				<el-input v-model="form.name" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="业主手机号码：">
				<input class="el-input el-input__inner" type="tel" v-model="form.phone" maxlength="11" placeholder="请输入手机号码" @input="phoneChange">
			</el-form-item>
			<el-form-item label="所在单位：">
				<el-select v-model="form.company">
					<el-option :label="item.rentalCompany" :value="item.id" v-for="item of companyList" :key="item.id"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="人脸信息：">
				<el-radio v-model="currentRadio" :label="0">拍照录入</el-radio>
				<el-radio v-model="currentRadio" :label="1">照片录入</el-radio>
				<el-radio v-model="currentRadio" :label="2">以后录入</el-radio>

				<div v-if="currentRadio === 1">
					<div class="file-wrapper" v-show="! faceURL">
						<label class="input-wrapper">
							<i class="icon"></i>
							<span>上传照片</span>
							<input class="upload" type="file" accept="image/*" @change="change" ref="input">
						</label>
						只支持 .jpg 格式
					</div>
					<div class="face-image-wrapper" v-show="faceURL">
						<img class="face-image" :src="faceURL">
						<svg class="scan-icon" :class="{animation: scanAnimation}">
							<use xlink:href="#scan"></use>
						</svg>

						<template v-if="collectionStatus === 0">
							采集人脸信息中...
						</template>
						<div v-if="collectionStatus === 1">
							<span class="collection-success">采集成功</span>
							<span class="recollection" @click="recollect">重新采集</span>
						</div>
						<div v-if="collectionStatus === 2">
							<span class="collection-success">采集成功</span>
							<span class="recollection" @click="recollect">重新采集</span>
						</div>
					</div>
				</div>
				<div class="tips" v-if="currentRadio === 2">录入后该业主才能使用人脸识别进入园区，建议现在拍照录入或照片录入</div>
			</el-form-item>

			<el-form-item>
				<p class="bottom-tips">请确认业主信息真实性后再点击“确定”</p>
				<el-button :disabled="isDisabled" type="primary" @click="submit" v-if="! submiting">确定</el-button>
				<el-button disabled type="primary" v-else>提交中...</el-button>

				<el-button @click="cancel">取消</el-button>
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
					name: '',
					phone: '',
					company: ''
				},

				collectionStatus: 0,
				scanAnimation: false,
				faceURL: '',
				currentRadio: 1,
				companyList: [],

				submiting: false
			}
		},

		computed: {
			isDisabled() {
				if (this.form.name && this.form.phone && this.form.company) {
					if (this.currentRadio === 2) {
						return false
					} else {
						if (this.faceURL) {
							return false
						} else {
							return true
						}
					}
					return false
				}

				return true
			}
		},

		created() {
			this.getCompanyList()
		},

		methods: {
			phoneChange(e) {
				this.form.phone = e.target.value.replace(/\D/g, '')
				e.target.value = this.form.phone
			},
			async getCompanyList() {
				const params = {
					action: 'accountManagement.queryRentalInfo'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.companyList = data.data
			},
			async submit() {
				if (this.$flag) {
					return
				}

				this.$flag = true

				if (! /1\d{10}/.test(this.form.phone)) {
					this.$message.error('手机号码格式不对')

					return
				}

				const params = {
					action: 'accountManagement.addYZEntity',
					acountName: this.form.name,
					phoneNumber: this.form.phone,
					rentalCompany: this.form.company
				}

				if (this.$faceURLRaw) {
					params.facialInformation = this.$faceURLRaw
				}

				if (this.currentRadio === 2) {
					delete params.facialInformation
				}

				const data = await axios.post('/api/dispatcher.do', params)

				this.$flag = null

				if (! data) {
					return
				}

				this.$router.push('/proprietor')
			},
			async change(e) {
				const file = e.target.files[0]
				const formdata = new FormData()

				log(file)

				// 用户取消
				if (! file) {
					return
				}

				if (! file.type.startsWith('image')) {
					this.$message.error('请选择图片文件')
					return
				}

				this.faceURL = URL.createObjectURL(file)

				formdata.append('action', 'file.upload')
				formdata.append('file', file)

				// 扫一扫动画
				this.scanAnimation = true

				const data = await axios.post('/api/dispatcher.do', formdata, {
					headers: {'Content-Type': 'multipart/form-data'}
				})

				this.scanAnimation = false

				if (! data) {
					return
				}

				this.collectionStatus = 1
				this.$faceURLRaw = data.data.uri
			},
			recollect() {
				this.$refs.input.click()
			},
			cancel() {
				this.$router.push('/proprietor')
			}
		}
	}
</script>