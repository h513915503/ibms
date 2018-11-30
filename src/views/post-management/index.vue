<style scoped>
.no-data-wrapper {
	padding: 48px 0;
	color: #4A4A4A;
	font-size: 16px;
	text-align: center;
	background-color: #FFF;
}
.title {
	margin-bottom: 48px;
	font-size: 20px;
}
.tips {
	line-height: 2;
}
.tips:last-of-type {
	margin-bottom: 48px;
}
.el-button {
	font-size: inherit;
}
.content {
	padding: 24px;
	background-color: #FFF;
}
.search-wrapper {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;
}
.page-wrapper {
	margin-top: 20px;
	text-align: right;
}
.opt-btn {
	display: inline-block;
	color: #0E7CC2;
	font-size: 12px;
	cursor: pointer;
	margin-right: 10px;
}
.opt-btn.dimission {
	color: #F5222D;
}
</style>

<template>
	<div class="post-wrapper">
		<loading v-if="loading"></loading>

		<template v-else>
			<div class="no-data-wrapper" v-if="noData">
				<h1 class="title">暂无岗位</h1>
				<p class="tips">您还没有维护岗位，</p>
				<p class="tips">点击下方【+ 岗位】按钮添加新的岗位。</p>
				<el-button type="primary" @click="addPost">+ 岗位</el-button>
			</div>

			<div class="content" v-else>
				<div class="search-wrapper">
					<el-button type="primary" @click="addPost">+ 岗位</el-button>
				</div>

				<div class="table-content">
					<el-table :data="list">
						<el-table-column prop="postId" label="岗位编号"></el-table-column>
						<el-table-column prop="postName" label="岗位名称"></el-table-column>
						<el-table-column label="权限">
							<template slot-scope="scope">
								<ul>
									<li v-for="item of scope.row.permissionArray">
										{{item.primaryNavigation}} - {{item.secondaryNavigation}}

										<template v-if="item.isRead === 1 && item.isWrite === 1">（读，写）</template>

										<template v-else-if="item.isRead === 1">（读）</template>

										<template v-else-if="item.isWrite === 1">（写）</template>
									</li>
								</ul>
							</template>
						</el-table-column>

						<el-table-column label="操作">
							<template slot-scope="scope">
								<div class="opt-btn" type="text" size="small" @click="goEdit(scope.row)">编辑</div>
								<div class="opt-btn dimission" type="text" size="small" @click="forDel($event, scope.row, scope.$index)">删除</div>
							</template>
						</el-table-column>
					</el-table>

					<div class="page-wrapper">
						<el-pagination background layout="prev, pager, next" :total="pageTotal" @current-change="pageChange"></el-pagination>
					</div>
				</div>
			</div>
		</template>

		<popover name="close" title="确定删除该岗位么？" content="仅删除该岗位，该岗位的员工不会被删除。" :follow-target="followTarget" ref="popover" v-if="popoverModalStatus" @hide="popoverModalStatus = false">
			<el-button slot="ok" @click="popoverModalStatus = false">取消</el-button>
			<el-button type="primary" slot="cancel" @click="del">确定</el-button>
		</popover>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				loaded: false,

				followTarget: null,
				popoverModalStatus: false,

				page: 1,
				pageTotal: 1,
				list: []
			}
		},

		computed: {
			noData() {
				return this.loaded && ! this.list.length
			}
		},

		created() {
			this.loading = true

			this.getList().then(() => {
				this.loaded = true
				this.loading = false
			})
		},

		methods: {
			addPost() {
				this.$router.push('/post/add')
			},
            goEdit(item) {
                this.$router.push(`/post/edit/${item.postId}`)
            },
			async getList() {
				const params = {
					action: 'administrator.getPostInfo',
					pageNo: this.page
				}

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

                const {total, postInfoRespList} = data.data

                this.pageTotal = total
				this.list = postInfoRespList
			},
			pageChange(value) {
				this.page = value
				this.getList()
			},
			forDel(e, item, index) {
				this.$item = item
				this.$index = index
				this.popoverModalStatus = true

				this.followTarget = e.target
			},
			async del() {
				const params = {
					action: 'administrator.deletePostInfo',
					postId: this.$item.postId
				}

				this.popoverModalStatus = false

				const data = await axios.post('/api/dispatcher.do', params)

				if (! data) {
					return
				}

                this.list.splice(this.$index, 1)

                // 释放内存
                this.$index = null
                this.$item = null
			}
		}
	}
</script>