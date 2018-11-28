<style scoped>
    .tool-content {
        width: 100%;
        height: 40px;
        background:rgba(230,249,255,1);
        border-radius:4px;
        border:1px solid rgba(186, 231, 255, 1);
        line-height: 40px;
        font-size:14px;
        padding-left: 40px;
    }
    .tooltip {
        display: inline-block;
        color: rgba(0,0,0,0.65);

    }
    .close {
        display: inline-block;
        color: rgba(14, 124, 194, 1);
        margin-left: 19px;
        cursor: pointer;
    }
    .closeContent {
        display: none;
        /* animation: fadenum 2s infinite; */
        /* height: 0; */
    }
    @keyframes fadenum{ /*设置内容由显示变为隐藏*/

        /* 0%{transform: translateY(50px);opacity: 0;}
	100%{ transform: translateY(0px);opacity: 1;} */


        /* 0%{opacity: 1; transform: translate(40px, 0)}

        50%{opacity: 0; transform: translate(40px, 0)} */

        /* 100%{opacity: 1;} */

    }
</style>

<template>
    <div class="tool-content" :class="{closeContent: status === false}">
        <span class="tooltip success">成功导入{{ allData.successCount}}条数据， </span>
        <span class="tooltip repeat">导入{{ allData.repeatCount }}条数据重复， </span>
        <span class="tooltip error">导入{{ allData.failCount }}条数据失败</span>
        
        <span class="close" @click="closeTooltip">关闭（{{ timeText }}）</span>
    </div>
</template>

<script>
    export default {
        props: {
            allData: {
                type: Object,
                required: true
            },
            status: {
                type: Boolean,
                required: true
            },
            timeText: {
                type: String,
                required: false
            }
        },
        // created() {
        //     this.timeBack()
        // },
        // destroyed(){
        //     clearTimeout(this.$timer)
        // },
        methods: {
            closeTooltip() {
                this.$emit('update:status', false)
            },
            // timeBack() {
            //     this.$timer = setTimeout(function go() {
            //         this.times --
            //         console.log(this.times)
            //         if (! times) {
            //             this.closeTooltip()
            //         }

            //         this.$timer = setTimeout(go.bind(this), 1000)
            //     }, 1000)   
            // }
        }
    }
</script>