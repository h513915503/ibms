<style scoped>
.header {
    padding: 0 24px;
    background-color: #FFF;
    margin-bottom: 24px;
    
}
.container {
    padding: 24px;
    margin-top: 20px;
    box-sizing: border-box;
    background-color: #FFF;
}
.operator {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
.search-input {
    width: 208px;
    margin-left: auto;
}
.btn-search {
	margin-left: 24px;
}
.no-data {
    font-size:16px;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    line-height:22px;
}
.detail-content {
    position: relative;
	background-color: #FFF;
}
.main-content {
    display: flex;
    justify-content: flex-start;
}
.mask::after {
    content: "";
    width: 100%;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    pointer-events: none;
    background-image: linear-gradient(to bottom, #ccc, rgba(0, 0, 0, .01));
}
.all-floor {
    position: relative;
    margin: 0 24px;
    box-sizing: border-box;
    border-right: 1px solid rgba(232,232,232,1);
    width: 176px;
    height: 544px;
    /* text-align: center; */
    font-size:14px;
    overflow-y: scroll;
}
.all-floor::-webkit-scrollbar {
    display: none;
}
.activedFloor {
    /* width: 74px; */
    /* height: 38px; */
    font-weight:400;
    color:rgba(14,124,194,1);
    background: rgba(230,249,255,1);
    /* border-right: 1px solid rgba(14,124,194,1); */
}
.floor-item {
    cursor: pointer;
    min-height: 38px;
    line-height: 38px;
    text-indent: 24px;
    color: rgba(0,0,0,0.65);
}
.el-icon-arrow-down, .el-icon-arrow-up {
    float: right;
    line-height: 38px;
    margin-right: 24px;
}
.detail-video {
    clear: both;
    background: #fff;
    border-right: #fff;
    display: none;
}
.showOrNo {
    display: block;
}
.all-video {
    margin-left: -30px;

    & li:hover .icon-more {
        display: inline-block;
    }
}
.real-time-video {
    width: 100%;
}
.tab-wrapper {
    display: flex;
    margin-left: 35%;
    margin-top: -90px;
}
.tab-item {
    margin-right: 50px;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    cursor: pointer;
    line-height: 46px;
}
.tab-item.actived {
    color: #1890FF;
    position: relative;

    &::after {
        content: "";
        width: 130%;
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 50%;
        background-color: currentcolor;
        transform: translateX(-50%);
    }
}
.quick-photo {
    width: 100%;
    height: 600px;
    margin-top: 24px;
    /* background: #e7d8d8; */
}
.search-content {
    display: flex;
}
.time-picker {
    margin-right: 24px;
}
.right {
    margin-left: auto;
}
.photo-content {

}

.icon-more {
    display: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url(~@/assets/more.png) center no-repeat;
    background-size: 100%;
}
.more-icon-wrapper {
	display: flex;
	padding: 13px 21px;
	position: absolute;
	bottom: 0;
	right: 30px;
	border-radius: 4px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .15);
	background-color: #F5F5F5;

	& .icon {
		width: 24px;
		height: 24px;
	}

	& .icon-delete {
		margin-left: 25px;
	}
}
.icon-edit {
	cursor: pointer;
	background: url(~@/assets/edit.png) center no-repeat;
	background-size: 100%;
}
.icon-delete {
	cursor: pointer;
	background: url(~@/assets/delete.png) center no-repeat;
	background-size: 100%;
}

</style>
<style>
#video-container .el-checkbox__label {
    padding-left: 0;
}
</style>

<template>
    <div id="video-container">
        <loading v-if="loading"></loading>

        <template v-else>
            <tab-bar :list="tabs"></tab-bar>

            <div class="container">
                <div class="operator">
                    <el-button type="primary" @click="addVideo">+ 监控</el-button>
                    <el-button>批量导入</el-button>
                    <el-input class="search-input" placeholder="监控点名称/设备编号/位置"></el-input>
					<el-button class="btn-search" type="primary" @click="search">查询</el-button>
                </div>

                <div class="detail-content">
                    <p v-if="hadVideo" class="no-data">暂无监控，点击上方按钮添加监控。</p>

                    <AddDialog v-if="showAddDialog" @cancelAdd="cancelAdd"/>
                    <div class="main-content">
                        <ul class="all-floor" @scroll="scroll" :class="{mask: showMask}">
                            <li :class="{activedFloor: item.floorNumber === floorIndex}" class="floor-item" v-for="(item) of floorList" :key="item.id" @click="switchFloor(item)">
                                {{item.floorNumber}}F
                                
                                <span class="right-icon">
                                    <i v-if="item.floorNumber !== floorIndex" class="el-icon-arrow-down"></i>
                                    <i v-else-if="item.floorNumber === floorIndex" class="el-icon-arrow-up"></i>
                                </span>
                                <template>
                                    <div :class="{showOrNo: item.floorNumber === floorIndex}" class="detail-video">
                                        <ul class="all-video">
                                            <li v-for="item of allCamera" :key="item.id" @click="chooseOneCamera(item)">
                                                <el-checkbox>{{item.key}}</el-checkbox>

                                                <el-popover popper-class="no-shadow" placement="bottom-end" trigger="click" @hide="popoverModalStatus = false">
                                                    <div class="icon-more" slot="reference"></div>
                                                    <div class="more-icon-wrapper">
                                                        <i class="icon icon-edit" @click="editDevice"></i>
                                                        <i class="icon icon-delete" @click="delDevice"></i>


                                                    </div>
                                                </el-popover>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </template>
                            </li>
                        </ul>

                        <div class="real-time-video">
                            <div class="tab-wrapper">
                                <div class="tab-item" :class="{actived: currentIndex === index}" v-for="(item, index) of tab" v-text="item" @click="switchIndex(index)"></div>
                            </div>
                            
                            <Preview :cameraId="cameraId" v-if="currentIndex === 0" :currentIndex="currentIndex"/>
                            <History :cameraId="cameraId" v-else-if="currentIndex === 1" :currentIndex="currentIndex"/>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        
    </div>
</template>

<script>
import AddDialog from '@/components/videoPage/addDialog.vue'
import Preview from '@/components/videoPage/preview.vue'
import History from '@/components/videoPage/history.vue'

export default {
    data() {
        return {
            loading: false,
            hadVideo: false,
            showMask: false,
            showAddDialog: false,
            showVideo: false,
            popoverModalStatus: false,
            currentIndex: 0,
            cameraId: '',
            // currentChoose: 0,
            tab: ["实时预览", "历史回放"],
            // allChoose: ["lskf", "fsd", "fdsf"],
            tabs: [
                {
                    number: 123,
                    text: '监控总数'
                },
                {
                    number: 321,
                    text: '离线监控'
                }
            ],
            floorIndex: 10,
            floorList: [{floorNumber: 1, id: 1},{floorNumber: 2},{floorNumber: 3},{floorNumber: 4},{floorNumber: 5},{floorNumber: 6},{floorNumber: 7},{floorNumber: 8},{floorNumber: 9},{floorNumber: 10}].reverse(),
            allCamera: [{key: '监控1', value: '1'}, {key: '监控2', value: '2'}, {key: '监控3', value: '3'}]
        }
    },
    methods: {
        editDevice() {

        },
        delDevice() {

        },
        search() {

        },
        addVideo() {
            this.showAddDialog = true
        },
        cancelAdd() {
            this.showAddDialog = false
        },
        scroll(e) {
            if (e.target.scrollTop > 12) {
                this.showMask = true
            } else {
                this.showMask = false
            }
        },
        switchIndex(index) {
            console.log(index)
            this.currentIndex = index
        },
        switchFloor(val) {
            console.log(val)
            this.floorIndex = val.floorNumber
            this.showVideo = ! this.showVideo
        },
        chooseOneCamera(val) {
            console.log(val)
            this.cameraId = val.id
        }
    },
    components: {
        AddDialog,
        Preview,
        History
    }
}
</script>