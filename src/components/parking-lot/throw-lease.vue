<style scoped>
.throw-lease-wrapper {
	padding: 24px;
	position: absolute;
	font-size: 16px;
	border-radius: 4px;
	box-shadow: 0 0px 12px rgba(0, 0, 0, .2);
	background-color: #FFF;
	transition: all .15s;
	transform-origin: 100% 0;
}
.scale-enter, .scale-leave-active {
	opacity: 0;
	transform: scale(.7);
}
h4 {
	color: rgba(0, 0, 0, .85);
	font-size: 16px;
}
.date-wrapper {
	margin: 24px 0;
}
p {
	margin-bottom: 8px;
	text-align: right;
}
.btn-wrapper {
	display: flex;
	justify-content: flex-end;
}
.el-button {
	width: 65px;
	padding: 0;
	line-height: 32px;
}
.el-button:last-child {
	color: #F5222D;
	border-color: #D9D9D9;
	background-color: rgba(0, 0, 0, .04);
}
</style>

<template>
	<transition name="scale">
		<div class="throw-lease-wrapper" v-if="throwLeaseModalStatus" ref="throw-lease">
			<h4>要续租几个月？</h4>

			<el-date-picker class="date-wrapper" v-model="time" type="daterange" range-separator="--" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

			<p>请确认车主已完成缴费后再点击“确定”</p>
			<div class="btn-wrapper">
				<el-button>取消</el-button>
				<el-button type="primary">确定</el-button>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ['name', 'title', 'content', 'throwLeaseModalStatus'],

		data() {
			return {
				time: ''
			}
		},

		mounted() {
			document.addEventListener('click', (e) => {
				if (! this.$refs['throw-lease']) {
					return
				}
				if (this.$refs['throw-lease'].contains(e.target)) {
					return
				}

				this.$emit('update:throwLeaseModalStatus', false)
			}, true)
		}
	}
</script>