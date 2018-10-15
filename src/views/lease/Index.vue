<style scoped>
.bootstrap-wrapper {
	padding: 48px 0;
	background-color: #FFF;

	& h1 {
		margin-bottom: 52px;
		color: #4A4A4A;
		text-align: center;
		font-size: 20px;
	}

	& ul {
		display: flex;
		justify-content: space-between;
		width: 500px;
		margin: 0 auto 48px;
		position: relative;
		color: rgba(0, 0, 0, .45);
		font-size: 14px;

		&::after {
			content: "";
			width: 40%;
			height: 1px;
			position: absolute;
			top: 8px;
			left: 80px;
			background-color: rgba(0, 0, 0, .15);
		}
	}

	& li {
		position: relative;

		&::before {
			content: "2";
			width: 32px;
			position: absolute;
			top: -10px;
			left: -44px;
			color: rgba(0, 0, 0, .25);
			text-align: center;
			line-height: 32px;
			border-radius: 50%;
			box-sizing: border-box;
			border: 1px solid currentcolor;
			background-color: transparent;
		}

		& p {
			width: 149px;
			margin-top: 10px;
			line-height: 1.6;
		}
	}

	& li.active {

		&::before {
			content: "1";
			color: #FFF;
			border-width: 0;
			background-color: #1890FF;
		}

		& strong {
			color: rgba(0, 0, 0, .85);
		}

		& p {
			color: rgba(0, 0, 0, .65);
		}
	}

	& .el-button {
		display: block;
		margin: 0 auto;
		font-size: 16px;
	}
}
.btn-wrapper {
	margin-bottom: 24px;
}
.edit-wrapper {
	padding: 24px;
	border: 1px solid #4A90E2;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
	box-sizing: border-box;
	background-color: #FFF;
}
.operation-wrapper {
	display: flex;
	margin-bottom: 48px;
	color: rgba(0, 0, 0, .75);
	font-size: 16px;

	& .item {
		margin-right: 48px;

		& span {
			margin-right: 8px;
		}
	}

	& .item.area {
		display: flex;
		align-items: center;

		& span {
			flex-shrink: 0;
		}

		& input {
			width: 80px;
			margin-right: 15px;

		}
	}
}
.input {
	padding-bottom: 5px;
	text-align: center;
	border: none;
	border-bottom: 1px solid #D9D9D9;
}
.room-list {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 24px;

	& li {
		width: 128px;
		margin-right: 34px;
		margin-bottom: 34px;
		color: rgba(0, 0, 0, .75);
		font-size: 14px;
		text-align: center;
		border: 1px solid rgba(0, 0, 0, .15);
		border-bottom: none;
	}

	& p {
		line-height: 40px;
		border-bottom: 1px solid rgba(0, 0, 0, .15);
	}
}
.input-wrapper {
	display: flex;
	align-items: center;
	padding: 0 8px 0px;

	& input {
		width: 100%;
		margin-right: 8px;
	}
}










.company-list {
	margin-top: 30px;

	& li {
		display: flex;
		align-items: flex-start;
		margin-bottom: 24px;
		color: #000;
		font-size: 16px;
		border-bottom: 1px dashed #999;
	}
}
/* .room-list {
	flex: 1;
} */
.info {
	margin-right: 15px;

	& span {
		display: block;
		margin-bottom: 15px;
	}
}
.box {
	display: inline-block;
	min-width: 169px;
	padding: 10px;
	margin-right: 15px;
	margin-bottom: 15px;
	color: #FFF;
	font-size: 14px;
	cursor: pointer;
	box-sizing: border-box;
	background-color: green;

	& p {
		display: flex;
		justify-content: space-between;
	}
}
.company-name {
	margin-top: 10px;
}
</style>

<template>
	<div id="lease-wrapper">
		<div class="bootstrap-wrapper" v-if="index === 0">
			<h1>办公租赁需要先维护场地信息</h1>
			<ul>
				<li class="active">
					<strong>添加房间</strong>
					<p>添加楼层、各楼层的房间数及面积</p>
				</li>
				<li>
					<strong>添加租赁单位</strong>
					<p>添加租赁单位的信息</p>
				</li>
			</ul>
			<el-button type="primary" @click="index = 1">+ 房间</el-button>
		</div>

		<div class="container" v-if="index === 1">
			<tab-bar :list="tabs"></tab-bar>

			<div class="btn-wrapper">
				<el-button type="primary" @click="go">+ 房间</el-button>
			</div>

			<div class="edit-wrapper">
				<div class="operation-wrapper">
					<div class="item">
						<span>楼层号：</span>
						<el-input-number v-model="floorNumber" :min="1" label="描述文字"></el-input-number>
					</div>
					<div class="item area">
						<span>总面积：</span>
						<input class="input" type="text" v-model="totalArea">
						m
					</div>
					<div class="item">
						<span>房间数：</span>
						<el-input-number v-model="roomNumber" :min="1" label="描述文字" @change="handleRoomChange"></el-input-number>
					</div>
				</div>
				<ul class="room-list">
					<li v-for="item of roomList">
						<p v-text="item.roomNumber"></p>
						<p class="input-wrapper">
							<input class="input" type="text" v-model="item.area">
							m
						</p>
					</li>
				</ul>
				<div>
					<el-button type="primary">确定</el-button>
					<el-button>取消</el-button>
				</div>
			</div>
		</div>
		<!-- <tab-bar :list="tabs"></tab-bar>

		<div class="container">
			<el-button type="primary" @click="go">+入住单位</el-button>

			<ul class="company-list" @click="redirec">
				<li v-for="item of companyList">
					<div class="info">
						<span>{{item.floor}}层</span>
						<span>{{item.totalArea}}㎡</span>
					</div>
					<div class="room-list">
						<div class="box" data-id="10" v-for="item of item.room">
							<p>
								{{item.roomNumber}}
								<span>共{{item.area}}㎡</span>
							</p>
							<p class="company-name">{{item.companyName ? item.companyName : '暂无公司入驻'}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
	import tabBar from '@/components/tab-bar.vue'

	export default {
		data() {
			return {
				index: 1,

				floorNumber: 1,
				totalArea: 1000,
				roomNumber: 1,
				roomList: [{area: 1000, roomNumber: 101}],

				tabs: [
					{
						number: 1000,
						text: '总面积'
					},
					{
						number: 1000,
						text: '可租赁面积'
					},
					{
						number: 1000,
						text: '入驻单位'
					}
				],
				// totalArea: 1223,
				// leaseArea: 100,
				// occupancyUnit: 10,

				companyList: [
					{
						floor: 1,
						totalArea: 1000,
						room: [
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							}
						]
					},
					{
						floor: 1,
						totalArea: 1000,
						room: [
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							}
						]
					},
					{
						floor: 1,
						totalArea: 1000,
						room: [
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							},
							{
								roomNumber: 101,
								area: 1,
								companyName: ''
							}
						]
					}
				]
			}
		},

		components: {
			tabBar
		},

		methods: {
			handleRoomChange(value) {
				let i = value
				const roomNumber = 101
				const area = this.totalArea / value

				this.roomList = []

				while(i--) {
					this.roomList.unshift({
						roomNumber: roomNumber + i,
						area: ~~ (this.totalArea / value)
					})
				}



			},
			go() {
				this.$router.push('/lease/add')
			},
			redirec(e) {
				let target = e.target

				while (! target.dataset.id) {
					target = target.parentNode
				}

				this.$router.push(`/lease/detail/${target.dataset.id}`)
			}
		}
	}
</script>