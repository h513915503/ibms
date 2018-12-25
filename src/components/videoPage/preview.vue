<style scoped>
.preview {

}
.three-choose {
    display: flex;
    margin-left: 35%;
    margin-top: 44px;
}
.tab-choose {
    margin-right: 50px;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    cursor: pointer;
    line-height: 46px;
}
.choosen {
    color: #1890FF;
    position: relative;
}
.preview-content {
    width: 100%;
    height: 540px;
    /* background: #1890FF; */
}
</style>

<template>
    <div class="preview">
        <div class="three-choose">
            <div class="tab-choose" :class="{choosen: currentChoose === index}" v-for="(item, index) of allChoose" v-text="item" @click="switchChoose(index)"></div>
        </div>
        <div class="preview-content">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentChoose: 0,
            allChoose: ["lskf", "fsd", "fdsf"],
        }
    },
    methods: {
        switchChoose(index) {
            this.currentChoose = index
        },
    }
}
</script>