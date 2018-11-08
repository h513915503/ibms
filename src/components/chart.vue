<template>
	<div class="chart-wrapper" ref="chart"></div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				required: true
			}
		},

		watch: {
			data(value) {
				this.$chart.setOption(this.generateOption())
			}
		},

		mounted() {
			this.generateChart()
		},

		destroyed() {
			window.removeEventListener('resize', this.$resizeHandler)
		},

		methods: {
			generateChart() {
				this.$chart = echarts.init(this.$refs['chart'], null, {
					renderer: 'svg'
				})

				this.$chart.setOption(this.data)

				// 监听 resize
				this.$resizeHandler = () => this.$chart.resize()
				window.addEventListener('resize', this.$resizeHandler)
			},
		}
	}
</script>