<style scoped>
.copy-wrapper {
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
	margin-bottom: 40px;
}

.content {
	margin-bottom: 35px;
}
.btn-wrapper {
	display: flex;
	justify-content: flex-end;
}
</style>

<template>
	<transition name="scale">
		<div class="copy-wrapper" ref="popover">
			<h4 v-text="title"></h4>

			<div class="content">
				<el-input-number v-model="start" :min="1"></el-input-number>
				~
				<el-input-number v-model="end" :min="1"></el-input-number>
				层
			</div>

			<div class="btn-wrapper">
				<slot name="ok"></slot>
				<slot name="cancel"></slot>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ['title'],

		data() {
			return {
				start: 1,
				end: 2
			}
		},

		mounted() {
			document.addEventListener('click', (e) => {
				if (! this.$refs.popover) {
					return
				}
				if (this.$refs.popover.contains(e.target)) {
					return
				}

				this.$emit('hide')
			}, true)
		}
	}
</script>