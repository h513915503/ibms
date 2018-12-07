<style scoped>
.throw-lease-wrapper {
	padding: 24px;
	position: absolute;
	z-index: 1;
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
.title {
	color: rgba(0, 0, 0, .85);
	font-size: 16px;
}
.date-wrapper {
	margin: 24px 0;
}
.tips {
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
</style>

<template>
	<transition name="scale">
		<div class="throw-lease-wrapper" ref="throw-lease">
			<h4 class="title">要续租几个月？</h4>

			<el-date-picker class="date-wrapper" v-model="date" value-format="yyyy-MM-dd" type="daterange" range-separator="--" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

			<p class="tips">请确认车主已完成缴费后再点击“确定”</p>
			<div class="btn-wrapper">
				<el-button @click="complete(false)">取消</el-button>
				<el-button type="primary" :disabled="disabled" @click="complete(true)">确定</el-button>
			</div>
		</div>
	</transition>
</template>

<script>
	import {updatePosition} from '@/utils/util'

	export default {
		props: {
			id: {
				type: String,
				required: true
			},
			followTarget: {
				type: HTMLElement,
				required: true
			},
			offsetX: {
				type: Number,
				default: 20
			},
			offsetY: {
				type: Number,
				default: 20
			}
		},

		data() {
			return {
				date: ''
			}
		},

		computed: {
			disabled() {
				return ! this.date
			}
		},

		mounted() {
			this.updatePosition()

			document.addEventListener('click', (e) => {
				if (! this.$refs['throw-lease']) {
					return
				}
				if (this.$refs['throw-lease'].contains(e.target)) {
					return
				}

				// element 日期选择面板
				const elPickerPanel = document.querySelector('.el-picker-panel')

				if (elPickerPanel && elPickerPanel.contains(e.target)) {
					return
				}

				this.$emit('hide')
			}, true)
		},

		methods: {
			updatePosition() {
				updatePosition(this.followTarget.getBoundingClientRect(), this.$refs['throw-lease'], this.offsetX, this.offsetY)
			},
			complete(value) {
				if (value) {
					this.$emit('complete', this.date[1])
					this.containueLease()
				}

				this.$emit('hide')
			},
			async containueLease() {
				const params = {
					action: 'ParkingRental.continueParkingRental',
					id: this.id,
					startDate: this.date[0],
					endDate: this.date[1]
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

				this.$message.success('续租成功')
			}
		}
	}
</script>