<style scoped>
.popover-wrapper {
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
	display: flex;
	align-items: center;

	& svg {
		width: 22px;
		height: 22px;
		padding: 4px;
		margin-right: 16px;
		box-sizing: border-box;
		border-radius: 50%;
	}
}
.close svg {
	background-color: #F5222D;
}
.question svg {
	background-color: #FAAD14;
}
p {
	width: 335px;
	padding-left: 40px;
	margin: 12px 0 24px;
	color: rgba(0, 0, 0, .65);
	line-height: 1.6;
}
.btn-wrapper {
	display: flex;
	justify-content: flex-end;
}
/* .el-button {
	width: 65px;
	padding: 0;
	line-height: 32px;
}
.el-button:last-child {
	color: #F5222D;
	border-color: #D9D9D9;
	background-color: rgba(0, 0, 0, .04);
} */
</style>

<template>
	<transition name="scale">
		<div class="popover-wrapper" v-if="popoverModalStatus" ref="popover">
			<h4 class="close" v-if="name === 'close'">
				<svg>
					<use xlink:href="#close"></use>
				</svg>
				{{title}}
			</h4>
			<h4 class="question" v-if="name === 'question'">
				<svg>
					<use xlink:href="#question"></use>
				</svg>
				{{title}}
			</h4>

			<p v-text="content"></p>
			<div class="btn-wrapper">
				<slot name="ok"></slot>
				<slot name="cancel"></slot>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ['name', 'title', 'content', 'popoverModalStatus'],

		mounted() {
			document.addEventListener('click', (e) => {
				if (! this.$refs.popover) {
					return
				}
				if (this.$refs.popover.contains(e.target)) {
					return
				}

				this.$emit('update:popoverModalStatus', false)
			}, true)
		}
	}
</script>