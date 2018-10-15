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
    .el-input {
        width: 354px;
        height: 40px;
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
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/'}">人员</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/visitor'}">访客登记</el-breadcrumb-item>
			<el-breadcrumb-item>新增访客</el-breadcrumb-item>
		</el-breadcrumb>

        <div class="container">
            <el-form ref="form" :model="form" label-width="210px" label-position="right">
				<el-form-item label="访客编号：">
					<span>{{ form.lightNum }}</span>
				</el-form-item>
				<el-form-item label="访客姓名：">
					<el-input v-model="form.brand" placeholder="如：张三丰"></el-input>
				</el-form-item>
                <el-form-item label="访客手机号码：">
					<el-input v-model="form.model" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="被访单位：">
					<el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="被访人：">
					<el-input v-model="form.model" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="被访人手机号码：">
					<el-input v-model="form.model" placeholder="手机号码"></el-input>
				</el-form-item>
				<el-form-item label="到访有效时间：">
					<el-date-picker
                        v-model="date"
                        type="datetimerange"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>
				</el-form-item>
				<el-form-item label="人脸信息">
					<el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
				</el-form-item>
				<el-form-item>
                    <p>请确认访客信息真实性后再点击“确定”</p>
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
                form: {

                }
            }
        }
    }
</script>
