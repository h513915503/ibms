<style scoped>
.popover-wrapper {
	padding: 29px 32px;
	position: absolute;
	border-radius: 4px;
	box-shadow: 0 4px 12px 0px rgba(0, 0, 0, .2);
	background-color: #FFF;
}
p {
	width: 335px;
	margin: 12px 0 24px;
	line-height: 1.6;
}
.btn-wrapper {
	display: flex;
	justify-content: flex-end;
}
.ok {
	color: #F5222D;
	background-color: rgba(0, 0, 0, .04);
}
</style>

<template>
	<div class="popover-wrapper">
		<h4 v-text="title"></h4>
		<p v-text="content"></p>
		<div class="btn-wrapper">
			<el-button @click="cancel">取消</el-button>
			<el-button class="ok" @click="ok">确定</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['visible', 'title', 'content'],

		methods: {
			ok() {
				this.$emit('ok')
			},
			cancel() {
				this.$emit('cancel')
			}
		}
	}
</script>