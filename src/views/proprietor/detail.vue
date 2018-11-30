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
			<el-breadcrumb-item>已离职业主详情</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
            <el-button @click="cancel">返回</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id: '',
					name: '',
					phone: '',
					company: '',
					rentalCompanyId: ''
				},
			}
		},
		created() {
			const tempEditData = this.$root.$tempEditData

			// 从列表里面取出
			if (tempEditData) {
				this.setData(tempEditData)
			} else {
				this.getDetail()
			}

			this.getCompanyList()
		},

		methods: {
			setData(data) {
				const {acountName, rentalCompany, phoneNumber, facialInformation, id, rentalCompanyId} = data

				this.form.id = id
				this.form.name = acountName
				this.form.phone = phoneNumber
				this.form.company = rentalCompany,
				this.form.rentalCompanyId = rentalCompanyId


				this.faceURL = facialInformation
				this.collectionStatus = 2
			},
			async getDetail() {
				const params = {
					id: this.$route.params.id,
					action: 'accountManagement.queryById'
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.setData(data.data)
			},
			cancel() {
				this.$router.push('/proprietor')
			}
		}
	}
</script>