<style scoped>
.elevator-list {
	display: flex;
	flex-wrap: wrap;
	margin: 50px 72px;
}
.elevator-item {
	display: flex;
	flex-direction: column;
	width: 455px;
	margin: 0 50px 50px 0;
	background-color: orange;
}
.video-wrapper {
	height: 556px;
}
.video {
	object-fit: contain;
}
.footer {
	display: flex;
	justify-content: space-between;
	line-height: 40px;
	background-color: #FFF;

	& .item {
		flex: 1;
		text-align: center;
		font-size: 14px;
		border-right: 1px solid #E8E8E8;
	}

	& .item:nth-child(1) {
		color: #0E7CC2;
	}

	& .item:nth-child(2) {
		color: #000;
	}

	& .item:nth-child(3) {
		color: #595959;
		border-right: none;
	}
}
.arrow {
	width: 10px;
	height: 12px;
}
</style>

<template>
	<div class="monitor-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<!-- <video :src="src"></video> -->
			<ul class="elevator-list">
				<li class="elevator-item" v-for="item of list">
					<div class="video-wrapper">
						<video class="video" ref="video"></video>
					</div>
					<footer class="footer">
						<div class="item">
							{{item.floor}}F
							<svg class="svg-icon arrow" v-if="item.direction === 1">
								<use xlink:href="#success"></use>
							</svg>
							<svg class="svg-icon arrow" v-if="item.direction === 2">
								<use xlink:href="#peo"></use>
							</svg>
						</div>
						<div class="item">{{item.name}}</div>
						<div class="item">正常</div>
					</footer>
				</li>
			</ul>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,

				list: [],
				src: ''
			}
		},

		mounted() {
			this.getData()
		},

		methods: {
			async getData() {
				this.loading = true

				await this.getToken()

				await this.getList()

				this.loading = false
			},
			async getToken() {
				if (Date.now() < sessionStorage.getItem('expiresTime')) {
					this.$accessToken = sessionStorage.getItem('accessToken')

					return
				}

				const params = {
					AppKey: 'ysCnNgumu2Fr8bNrpDvfFGjLuLjAkeCC',
					AppSecret: '6og6jUFIXHCKMKmJUIh66Das6Vnjo0CQ'
				}

				const data = await axios.post('/hapi/v1/getToken', params)

				if (! data) {
					return
				}

				this.$accessToken = data.data.accessToken
				this.$expiresTime = data.data.expiresTime

				sessionStorage.setItem('accessToken', this.$accessToken)
				sessionStorage.setItem('expiresTime', this.$expiresTime)
			},
			async getList() {
				const data = await axios.post(`/hapi/v1/info/getLiftRegCodes?access_token=${this.$accessToken}`)

				if (! data) {
					return
				}

				data.data.forEach((item) => {
					this.list.push({
						registerCode: item.registerCode,
						floor: '',
						name: '',
						videoURL: '',
						direction: 3
					})
				})

				let index = 0

				const getVideo = () => {
					log(index)
					this.getMonitorInfo(data.data[index].registerCode)
					this.getMonitorVideoInfo(index, data.data[index].registerCode)

					index++
					if (index < 8) {
						setTimeout(() => {
							getVideo()
						}, 1000)
					}
				}

				getVideo()
				// setTimeout(() => {
				// 	getVideo()
				// }, 2000)

				this.$elevatorNameList = data.data.map((item) => item.registerCode)
				this.getElevatorInfo()
			},
			async getElevatorInfo() {
				const params = {
					registerCodes: this.$elevatorNameList
				}
				const data = await axios.post(`/hapi/v1/info/getLiftInfo?access_token=${this.$accessToken}`, params)

				if (! data) {
					return
				}

				data.data.forEach((item) => {
					this.list.find((current) => current.registerCode === item.registerCode).name = item.liftName

					//log(this.list)
					//this.list.sort((a, b) => parseInt(a.name) - parseInt(b.name))
				})
			},
			async getMonitorInfo(registerCode) {
				const params = {
					registerCode
				}

				const data = await axios.post(`/hapi/v1/status/getLiftStatus?access_token=${this.$accessToken}`, params)

				if (! data) {
					return
				}

				const temp = this.list.find((item) => item.registerCode === registerCode)

				temp.floor = data.data.floor
				temp.direction = data.data.direction
			},
			async getMonitorVideoInfo(index, registerCode) {
				const params = {
					registerCode
				}

				const data = await axios.post(`/hapi/v2/media/getRealvideoAuthorization?access_token=${this.$accessToken}`, params)

				if (! data) {
					return
				}

				this.list.find((item) => item.registerCode === registerCode).videoURL = data.data.urls[0].httpUrl

				const config = {
					url: data.data.urls[0].httpUrl,

				}

				const player = zlplayer.createPlayer(this.$refs.video[index], config)

				player.play()
			}
		}
	}
</script>