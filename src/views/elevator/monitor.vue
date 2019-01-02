<style scoped>
.elevator-list {
	display: flex;
	flex-wrap: wrap;
	/* padding-bottom: 0px; */
	margin: 50px 72px 0;
}
.elevator-item {
	display: flex;
	flex-direction: column;
	width: 228px;
	margin: 0 30px 50px 0;
	position: relative;
	background-color: #FFF;
}
.video-wrapper {
	height: 278px;
}
.video {
	object-fit: contain;
}
.flag {
	position: absolute;
	top: 50%;
	left: 50%;
	color: #2FC25B;
	transform: translate(-50%, -50%);
}
.has-person {
	color: #595959;
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
		user-select: none;
		border-right: none;
	}
}
.arrow {
	width: 10px;
	height: 12px;
}
.view {
	cursor: pointer;
}
.tips {
	width: 192px;
	position: absolute;
	left: 50%;
	bottom: 65px;
	color: #FFF;
	font-size: 12px;
	text-align: center;
	line-height: 28px;
	border-radius: 32px;
	transition: all .15s;
	transform: translateX(-50%);
	background-color: rgba(0, 0, 0, .5);
}
.fade-enter , .fade-leave-active  {
	opacity: 0;
	transform: translateX(-50%) scale(.8);
}
</style>

<template>
	<div class="monitor-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<ul class="elevator-list">
				<li class="elevator-item" v-for="(item, index) of list">
					<div class="video-wrapper">
						<video class="video" ref="video" :data-index="index" v-if="item.isView"></video>

						<template v-else>
							<span class="flag has-person" v-if="item.hasPerson === 1">有人</span>
							<span class="flag ok" v-else>正常</span>
						</template>
					</div>
					<footer class="footer">
						<div class="item">
							{{item.floor}}F
							<i class="el-icon-download" v-if="item.direction === 1"></i>
							<i class="el-icon-upload2" v-if="item.direction === 2"></i>
						</div>
						<div class="item">{{item.name}}</div>
						<div class="item view" @click="view(index, item)">{{item.isView ? '关闭监控' : '查看监控'}}</div>
					</footer>
					<transition name="fade">
						<p class="tips" v-if="item.tips">最多可同时查看6个电梯的监控</p>
					</transition>
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

				list: []
			}
		},

		mounted() {
			this.$player = []

			this.getData()
		},

		beforeDestroy() {
			clearTimeout(this.$wsTimer)
			clearTimeout(this.$tipsTimer)

			// 清除播放器实例
			this.list.forEach((item) => item.player && item.player.stop())
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
						direction: 3,
						hasPerson: 0,
						isView: false,
						tips: false
					})
				})

				// 轮询更新
				this.ws()

				// 更新电梯信息
				this.$elevatorNameList = data.data.map((item) => item.registerCode)
				this.getElevatorInfo()
			},
			async ws() {
				this.$wsTimer = setTimeout(function run () {
					const arr = this.list.slice(0, 8).map((item, index) => {
						return new Promise((resolve, reject) => {
							setTimeout(() => {
								this.getMonitorInfo(item.registerCode).then(() => {
									resolve()
								})
							}, 100 * index)
						})
					})
					Promise.all([arr]).then(() => {
						this.$wsTimer = setTimeout(run.bind(this), 2000)
					})
				}.bind(this), 2000)
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

				// 可能报调用频率过高错误
				if (! data.data) {
					return
				}

				const {floor, direction, hasPerson} = data.data

				temp.floor = floor
				temp.direction = direction
				temp.hasPerson = hasPerson
			},
			async getMonitorVideoInfo(registerCode) {
				const params = {
					registerCode
				}

				const data = await axios.post(`/hapi/v2/media/getRealvideoAuthorization?access_token=${this.$accessToken}`, params)

				if (! data) {
					return
				}

				this.list.find((item) => item.registerCode === registerCode).videoURL = data.data.urls[0].httpUrl
			},
			async view(index, item) {
				if (item.isView) {
					item.isView = false
					item.player.stop()

					return
				}

				if (this.list.filter((current) => current.isView).length === 6) {
					item.tips = true

					this.$tipsTimer = setTimeout(() => {
						item.tips = false
					}, 2000)

					return
				}

				item.isView = true

				await this.getMonitorVideoInfo(item.registerCode)

				const config = {
					url: item.videoURL,
					isLive: true
				}

				this.$nextTick(() => {
					item.player = zlplayer.createPlayer(this.$refs.video.find((current) => + current.dataset.index === index), config)
					item.player.play()
				})
			}
		}
	}
</script>