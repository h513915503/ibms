<style scoped>
    #visitor-add {
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
        height: 40px;
    }
    .separator {
        margin: 0 8px;
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
@keyframes t {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(100%);
	}
}
.animation {
	display: block;
	animation: t 2s infinite;
}
.recollection {
	display: block;
	color: #0E7CC2;
	font-size: 14px;
	cursor: pointer;
}
</style>

<style>
/* 上传组件样式 */
/* .el-form-item__content {
    line-height: 0 !important;
} */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 102px;
    height: 102px;
    line-height: 102px !important;
    text-align: center;
  }
  .avatar {
    width: 102px;
    height: 102px;
    display: block;
  }
</style>

<template>
    <div id="visitor-add">
        <loading v-if="loading"></loading>

        <template v-else>
            <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">人员</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/visitor'}">访客登记</el-breadcrumb-item>
			<el-breadcrumb-item>编辑访客</el-breadcrumb-item>
		</el-breadcrumb>

        <div class="container">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="210px" label-position="right">
				<el-form-item label="访客编号：" prop="aid">
					<span>{{ formData.aid }}</span>
				</el-form-item>
				<el-form-item label="访客姓名：" prop="acountName">
					<el-input v-model="formData.acountName" placeholder="如：张三丰"></el-input>
				</el-form-item>
                <el-form-item
                    label="访客手机号码："
                    prop="phoneNumber"
                >
					<el-input maxlength="11" v-model="formData.phoneNumber" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="被访单位：" prop="rentalCompany">
					<el-select v-model="rentalCompany" placeholder="请选择被访单位">
                        <el-option
                            v-for="item in company"
                            :key="item.id"
                            :label="item.rentalCompany"
                            :value="item.rentalCompany">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="被访人：" prop="interviewee">
					<el-input v-model="formData.interviewee" placeholder="请输入被访人"></el-input>
				</el-form-item>
				<el-form-item
                    label="被访人手机号码："
                    prop="intervieweeNumber"
                >
					<el-input v-model="formData.intervieweeNumber" maxlength="11" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="到访有效时间：">
					<el-date-picker
                        v-model="date1"
                        value-format="timestamp"
                        type="datetime"
                        placeholder="开始时间">
                    </el-date-picker>
                    <span class="separator">-</span>
                    <el-date-picker
                        v-model="date2"
                        value-format="timestamp"
                        type="datetime"
                        placeholder="结束时间">
                    </el-date-picker>
				</el-form-item>
				<el-form-item label="人脸信息">
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
				</el-form-item>
				<el-form-item>
                    <p>请确认访客信息真实性后再点击“确定”</p>
					<el-button type="primary" @click="submitInfo('formData')">确定</el-button>
					<el-button @click="cancelClick">取消</el-button>
				</el-form-item>
			</el-form>
        </div>
        </template>
        
    </div>
</template>

<script>
    export default {
        data() {
            const phoneNumRule = (rule, value, callback) => {
                if(!value) {
                    callback('手机号码不能为空');
                } else if(!(/^1[34578]\d{9}$/.test(value))) {
                    callback('请输入正确的手机号码')
                }
            }
            return {
                loading: false,
                date1: '',
                date2: '',
                formData: {},
                company: [],
                rentalCompany: '',
                faceURL: '',
                scanAnimation: false,
                collectionStatus: 0,
                rules: {
                    phoneNumber: [
                        { validator: phoneNumRule, trigger: 'blur' }
                    ],
                    intervieweeNumber: [
                        { validator: phoneNumRule, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            recollect() {
				this.$refs.input.click()
            },
            cancelClick() {
                this.$router.push('/visitor')
            },
            async change(e) {
				const file = e.target.files[0]
				const formdata = new FormData()

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
            async getDetailInfo() {
                const id = location.hash.slice(1)
                const params = {
                    action: 'accountManagement.queryById',
                    id: id
                }
                const data = await axios.post('/api/dispatcher.do', params)

                if(! data) {
                    return;
                }

                this.formData = data.data;
                this.rentalCompany = data.data.rentalCompany;
                this.date1 = data.data.accessTimeStart;
                this.date2 = data.data.accessTimeEnd;
            },
            async getCompany() {
                const params = {
                    action: 'accountManagement.queryRentalInfo'
                };
                
                const data = await axios.post('/api/dispatcher.do', params);
                this.company = data.data;

            },
            async submitInfo(formData) {
                const params = {
                    action: 'accountManagement.editFKEntity',
                    id: this.formData.id,
                    aid: this.formData.aid,
                    acountName: this.formData.acountName,
                    phoneNumber: this.formData.phoneNumber,
                    rentalCompany: this.rentalCompany,
                    interviewee: this.formData.interviewee,
                    intervieweeNumber: this.formData.intervieweeNumber,
                    accessTimeStart: this.date1,
                    accessTimeEnd: this.date2,
                    facialInformation: this.formData.facialInformation
                }

                const data = await axios.post('/api/dispatcher.do', params);
                if(data.success) {
                    this.$message.success(data.data)
                    this.$router.push('/visitor')
                }

            }
        },
        created() {
            this.loading = true;

            Promise.all([this.getDetailInfo(), this.getCompany()]).then(() => {
                this.loading = false
            })
            // this.getDetailInfo()
        }
    }
</script>
