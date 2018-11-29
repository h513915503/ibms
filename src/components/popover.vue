<style scoped>
.popover-wrapper {
	padding: 24px;
	position: fixed;
	z-index: 10000;
	font-size: 16px;
	border-radius: 4px;
	box-shadow: 0 0px 12px rgba(0, 0, 0, .2);
	background-color: #FFF;
	transition: all .15s;
	transform-origin: 100% 0;
}
.scale-enter , .scale-leave-active  {
	opacity: 0;
	transform: scale(.7);
}
.mask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
}
.title {
	display: flex;
	align-items: center;
	margin-bottom: 16px;
}
.icon {
	width: 22px;
	height: 22px;
	padding: 4px;
	margin-right: 16px;
	box-sizing: border-box;
	border-radius: 50%;
}
.close .icon {
	background-color: #F5222D;
}
.question .icon {
	background-color: #FAAD14;
}
.content {
	width: 335px;
	padding-left: 40px;
	margin-bottom: 24px;
	color: rgba(0, 0, 0, .65);
	line-height: 1.6;
}
.btn-wrapper {
	display: flex;
	justify-content: flex-end;
}
</style>

<template>
	<transition name="scale">
			<div class="popover-wrapper" ref="popover">
				<div class="mask"></div>

				<h4 class="title close" v-if="name === 'close'">
					<svg class="icon">
						<use xlink:href="#close"></use>
					</svg>
					{{title}}
				</h4>
				<h4 class="title question" v-if="name === 'question'">
					<svg class="icon">
						<use xlink:href="#question"></use>
					</svg>
					{{title}}
				</h4>

				<p class="content" v-text="content"></p>

				<div class="btn-wrapper">
					<slot name="ok"></slot>
					<slot name="cancel"></slot>
				</div>
			</div>
	</transition>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: 'close'
			},
			title: {
				type: String,
				required: true
			},
			content: {
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

		mounted() {
			this.updatePosition()

			// 捕获事件
			document.addEventListener('click', (e) => {
				if (! this.$refs.popover) {
					return
				}

				// 点击自身不屏蔽，除了 .mask
				if (this.$refs.popover.contains(e.target) && e.target.className !== 'mask') {
					return
				}

				this.$emit('hide')
			}, true)

			// 自动更新 position
			window.addEventListener('resize', this.updatePosition)

			// 屏蔽滚动事件
			this.$mousewheelHandler = (e) => e.preventDefault()

			document.addEventListener('mousewheel', this.$mousewheelHandler)
		},

		destroyed() {
			window.removeEventListener('resize', this.updatePosition)
			document.removeEventListener('mousewheel', this.$mousewheelHandler)
		},

		methods: {
			updatePosition() {
				const {x, y, bottom} = this.followTarget.getBoundingClientRect()
				const popover = this.$refs.popover
				const width = popover.offsetWidth
				const height = popover.offsetHeight

				popover.style.transformOrigin = '100% 0'
				popover.style.left = `${x - width - this.offsetX}px`
				popover.style.top = `${y + this.offsetY}px`

				if (bottom + height + 40 > innerHeight) {
					popover.style.transformOrigin = '100% 100%'
					popover.style.top = `${y - height}px`
				}
			}
		}
	}
</script>