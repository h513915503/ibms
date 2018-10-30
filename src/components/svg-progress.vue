<style scoped>
.progress-wrapper {
	width: 128px;
	height: 128px;
	padding-top: 40px;
	position: relative;
	color: #0E7CC2;
	font-size: .24rem;
	text-align: center;
	box-sizing: border-box;

	& svg {
		position: absolute;
		top: 0;
		left: 0;
		transform: rotate(-0.05deg);
	}
}
span {
	display: block;
	margin-bottom: 8px;
	font-size: 14px;
	color: rgba(0, 0, 0, .45);
}
strong {
	font-size: 20px;
	color: rgba(0, 0, 0, .85);
}
</style>

<template>
	<div class="progress-wrapper">
		<span v-text="title"></span>
		<strong v-text="num"></strong>
		<svg>
		    <circle :cx="cx" :cy="cx" :r="r" stroke-width="12" stroke="#F0F2F5" fill="none"></circle>
		    <circle :cx="cx" :cy="cx" :r="r" stroke-width="12" :stroke="color" fill="none" :transform="transform" :stroke-dasharray="dasharray"></circle>
		</svg>
	</div>
</template>

<script>
	export default {
		props: ['title', 'num', 'progress', 'color'],

		computed: {
			r() {
				return 52
			},
			cx() {
				return 64
			},
			transform() {
				return `matrix(0, -1, 1, 0, 0, 128)`
			},
			dasharray() {
				const perimeter = Math.PI * 2 * this.r

				return `${perimeter * (this.progress / 100)} ${perimeter * (1 - (this.progress) / 100)}`
			}
		},
	}
</script>