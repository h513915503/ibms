<style scoped>
#proprietor-detail-wrapper {
	padding: 24px;
}
.container {
	padding: 24px;
	margin-top: 20px;
	box-sizing: border-box;
	background-color: #FFF;
}
.detail {
	margin-top: 24px;
}
.item {
	margin-bottom: 40px;
	color: #919191;
	font-size: 16px;

	& span {
		display: inline-block;
		width: 200px;
		margin-right: 15px;
		text-align: right;
	}
}
strong {
	color: #000;
}
</style>

<template>
	<div id="proprietor-detail-wrapper">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>人员</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/proprietor'}">业主管理</el-breadcrumb-item>
			<el-breadcrumb-item>已离职业主详情</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="container">
            <el-button @click="cancel">返回</el-button>

			<div class="detail">
				<div class="item">
					<span>序号:</span>
					<strong v-text="form.id"></strong>
				</div>
				<div class="item">
					<span>业主姓名:</span>
					<strong v-text="form.name"></strong>
				</div>
				<div class="item">
					<span>业主手机号码:</span>
					<strong v-text="form.phone"></strong>
				</div>
				<div class="item">
					<span>所在单位:</span>
					<strong v-text="form.company"></strong>
				</div>
				<div class="item">
					<span>人脸信息:</span>
					<img class="face-image" :src="faceURL">
				</div>
			</div>
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
				faceURL: ''
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