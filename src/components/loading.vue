<style scoped>
.loader {
	width: 100px;
	position: absolute;
	top: 35%;
	left: 50%;
	transform: translate(-50%, -50%);

	& .circular {
		position: absolute;
		top: 0;
		left: 0;
		animation: rotate 2s linear infinite;
	}

	circle {
		animation: circle-dash 1.5s ease-in-out infinite;
	}
}

@keyframes circle-dash {
	0% {
		stroke-dasharray: 1, 75;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 100, 75;
		stroke-dashoffset: -25px;
	}
	100% {
		stroke-dasharray: 100, 75;
		stroke-dashoffset: -75px;
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>

<template>
	<div class="loader">
		<svg class="circular" viewBox="0 0 50 50">
			<circle cx="25" cy="25" r="12" fill="none" stroke="#4A90E2" stroke-width="6%" stroke-linecap="round"/>
		</svg>
	</div>
</template>