<style scoped>
.add-dialog {
    /* display: flex; */
	/* justify-content: space-between; */
	width: 600px;
	padding: 24px 20px 24px 24px;
	position: absolute;
	z-index: 1;
	top: -28px;
	left: 0;
	box-sizing: border-box;
	border: 1px solid #0E7CC2;
	background-color: #F5F5F5;

	&::after {
		content: "";
		position: absolute;
		top: -9px;
		left: 30px;
		border-bottom: 8px solid #0E7CC2;
		border-right: 8px solid transparent;
		border-left: 8px solid transparent;
	}
}
.info-content {
    /* flex: 1; */
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(217,217,217,1);

	& .floor-list {
		display: flex;
        flex-wrap: wrap;
        margin-left: 10px;
	}

	& .floor-item {
        width: 24px;
        height: 24px;
		margin: 0 8px 8px 0;
		color: rgba(0, 0, 0, .25);
		font-size: 12px;
		cursor: pointer;
		text-align: center;
		line-height: 24px;
		border-radius: 2px;
		border: 1px solid #D9D9D9;
		background-color: #FFF;
	}

	& .floor-item.actived {
		color: #FFF;
		background-color: #0E7CC2;
	}
}
.info-floor {
    /* display: block; */
    display: flex;
    justify-content: space-between;
    /* height: 200px; */
    & .svg-icon {
		width: 12px;
		height: 12px;
		margin-right: 5px;
	}
}
.item-wraper {
    display: block;
}
.info-item {
	display: flex;
    justify-content: space-between;
	margin-bottom: 24px;

	& .label {
        display: flex;
        justify-content: space-between;
		flex-shrink: 0;
		margin-right: 24px;
		color: rgba(0, 0, 0, .85);
		font-size: 14px;
	}

	& .svg-icon {
		width: 12px;
		height: 12px;
		margin-right: 5px;
	}
}
.info-item:nth-child(n+2) {
	align-items: center;
}
.btn-wraper {
    display: flex;
    justify-content: space-between;
    margin: 24px 24px 0 24px;
}
</style>

<template>
    <div>
         <div class="add-dialog">
            <div class="info-content">
                <div class="info-floor">
                    <span class="label">
                        <svg class="svg-icon">
                            <use xlink:href="#floor"></use>
                        </svg>
                        楼层
                    </span>
                    <ul class="floor-list">
                        <li class="floor-item" :class="{actived: floorNumber === item.floorNumber}" v-for="item of floorList" v-text="item.floorNumber" @click="floorNumber = item.floorNumber"></li>
                    </ul>
                </div>
                <div class="item-wraper">
                    <div class="info-item">
                        <span class="label">
                            <svg class="svg-icon">
                                <use xlink:href="#number"></use>
                            </svg>
                            名称
                        </span>
                        <el-input type="text" placeholder="监控点名称" v-model="number" size="mini"></el-input>
                    </div>
                    <div class="info-item">
                        <span class="label">
                            <svg class="svg-icon">
                                <use xlink:href="#position"></use>
                            </svg>
                            位置
                        </span>
                        <el-input type="text" placeholder="监控点详细位置" v-model="position" size="mini"></el-input>
                    </div>
                </div>
                
            </div>
            <div class="btn-wraper">
                <el-button @click="cancelAdd">取消</el-button>
                <el-button type="primary">保存</el-button>
                <el-button type="primary">保存并添加</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            floorNumber: null,
            floorList: [{floorNumber: 'B1',id: 1},{floorNumber: 'B2', id: 2},{floorNumber: 'B3',id: 1},{floorNumber: '1', id: 2},{floorNumber: '2',id: 1},{floorNumber: '3', id: 2}]
        }
    },
    methods: {
        cancelAdd() {
            this.$emit('cancelAdd', false)
        }
    }
}
</script>