<style scoped>
.card-statistics-wrapper {
	display: flex;
	min-height: 600px;
	margin: 0 24px;
	overflow: auto;
	background-color: #FFF;
}
.company-list-wrapper {
	position: relative;
	border-right: 1px solid #E8E8E8;

	& .el-input {
		width: 208px;
		margin: 24px;
	}
}
.company-list {
	height: 544px;
	padding-bottom: 24px;
	overflow-y: scroll;
	box-sizing: border-box;
}

.company-list::-webkit-scrollbar {
	display: none;
}
.company-item {
	width: 256px;
	padding: 0 24px;
	color: rgba(0, 0, 0, .65);
	font-size: 14px;
	line-height: 38px;
	cursor: pointer;
	box-sizing: border-box;
}

.company-item.active {
	color: #0E7CC2;
	border-right: 2px solid #0E7CC2;
	background-color: #E6F9FF;
}
.mask::after {
	content: "";
	width: 100%;
	height: 100px;
	position: absolute;
	top: 80px;
	left: 0;
	pointer-events: none;
	background-image: linear-gradient(to bottom, #FFF, rgba(0, 0, 0, .01));
}
.container {
	flex: 1;
	padding: 24px;
	box-sizing: border-box;
}
.index-header {
	display: flex;
	align-items: center;
	margin-bottom: 24px;

	& .input {
		width: 128px;
		margin-left: auto;
	}

	& .search-btn {
		margin-left: 24px;
	}
}
.card--scroll-wrapper {
	height: 500px;
	overflow: auto;
}
.letter-list {
	color: #8C8C8C;
	font-size: 14px;
	user-select: none;

	& .active {
		color: #0E7CC2;
		opacity: 1;
		cursor: pointer;
		pointer-events: auto;
	}
}
.letter {
	margin-right: 10px;
	opacity: .5;
	pointer-events: none;
}
.card-index-item {
	margin-bottom: 8px;
	color: #8C8C8C;
}
.card-index {
	font-size: 14px;
}
.card-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 8px;
}
.card-item {
	width: 203px;
	height: 88px;
	padding: 24px;
	margin: 0 15px 15px 0;
	font-size: 12px;
	cursor: pointer;
	box-sizing: border-box;
	background-color: #F5F5F5;
}
.info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
	font-size: 14px;
}
.name {
	color: #000;
	font-size: 18px;
}
.record-wrapper {
	width: 100%;
	height: 300px;
	background-color: orange;
	transition: all .3s;
}
.height-enter, .height-leave-active {
	height: 0;
}
</style>
<style>

</style>

<template>
	<div class="card-statistics-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<div class="company-list-wrapper" :class="{mask: showMask}">
				<el-input v-model="companyName" placeholder="单位名称"></el-input>
				<ul class="company-list" @scroll="scroll">
					<li class="company-item" :class="{active: companyId === item.id}" v-for="item of companyList" @click="companyId = item.id">{{item.name}}</li>
				</ul>
			</div>

			<div class="container">
				<div class="index-header">
					<div class="letter-list" @click="smoothScroll">
						<span class="letter" :class="{active: item.active}" v-for="item of letterList" :key="item.text" v-text="item.text"></span>
					</div>
					<el-input class="input" type="text" placeholder="卡号/姓名" v-model="account" @keyup.native.enter="searchCardList"></el-input>
					<el-button class="search-btn" :disabled="disabled" @click="searchCardList">查询</el-button>
				</div>

				<loading v-if="cardLoading"></loading>
				<div class="card--scroll-wrapper" v-else>
					<ul class="card-index-list">
						<li class="card-index-item" v-for="(items, indexs) of cardList" ref="aa">
							<span class="card-index" v-text="items.index"></span>
							<div class="card-list" ref="card-list">
								<template v-for="(item, index) of items.list">
									<div class="card-item" data-type="1" :data-index="indexs" @click="showDetail($event, item, index, items.list)">
										<p class="info">
											<span class="name" v-text="item.name"></span>
											{{item.type}}
										</p>
										<p class="card-id" v-text="item.id"></p>
									</div>

									<transition name="height">
										<div class="record-wrapper" v-if="item.show">
											<div @click="item.show = false">收起</div>
										</div>
									</transition>
								</template>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				cardLoading: false,

				disabled: false,

				showMask: false,
				companyName: '',
				companyId: '',
				companyList: [],

				cardList: [],

				account: ''
			}
		},

		computed: {
			letterList() {
				const list = []

				// A charCodeAt
				let startNumber = 65

				while (startNumber < 91) {
					const ll = String.fromCharCode(startNumber++)

					list.push({
						text: ll,
						active: this.cardList.find((item) => item.index === ll)
					})
				}

				return list
			}
		},

		watch: {
			companyId(value) {
				this.cardList = []
				this.cardLoading = true

				this.getCardList().then(() => {
					this.cardLoading = false
				})
			}
		},

		created() {
			this.loading = true
			this.getCompanyList().then(() => {
				this.loading = false
			})
		},

		methods: {
			async getCompanyList() {
				const params = {
					id: this.companyId
				}

				const data = await axios.post('/dapi/getCompanyList', params)

				if (! data) {
					return
				}

				this.companyList = data.list
				this.companyId = data.list[0] && data.list[0].id
			},
			async getCardList() {
				const params = {
					action: '',
					id: this.companyId,
					account: this.account
				}

				const data = await axios.post('/dapi/clist', params)

				if (! data) {
					return
				}

				data.list.forEach((item) => item.list.forEach((current) => current.show = false))
				log(data.list)

				this.cardList = data.list
			},
			async searchCardList() {
				this.cardList = []
				this.cardLoading = true
				this.disabled = true

				await this.getCardList()

				this.disabled = false
				this.cardLoading = false
			},
			scroll(e) {
				if (e.target.scrollTop > 12) {
					this.showMask = true
				} else {
					this.showMask = false
				}
			},
			smoothScroll(e) {
				const index = this.letterList.filter((item) => item.active).findIndex((item) => item.text === e.target.textContent)

				index !== -1 && this.$refs.aa[index].scrollIntoView({behavior: 'smooth', block: 'start'})
			},
			showDetail(e, item, index, list) {
				// 103 是 card-item 的 height

				let target = e.target

				while(target.className !== 'card-item') {
					target = target.parentNode
				}

				const width = this.$refs['card-list'][target.dataset.index].offsetWidth
				const height = this.$refs['card-list'][target.dataset.index].offsetHeight
				const aa = ~~ (width / (203 + 15))
				const lineNum = height / 103

				let i

				const indexArr = []
				let start = 0

				while(list.slice(start, start + aa).length) {
					indexArr.push(list.slice(start, start + aa))
					start += aa

				}

				const bb = indexArr.findIndex((items) => items.find((current) => current.id === item.id))

				indexArr[bb].slice(-1)[0].show = true
			},
			handle(e) {
				const aa = document.createElement('div')

				aa.className = 'record-wrapper'

				let pp = e.target.parentNode

				while(pp.className !== 'card-list') {
					pp = pp.parentNode
				}

				log(pp)
				pp.appendChild(aa)
			}
		}
	}
</script>