<style scoped>
#info {
    cursor: pointer;
    width: 1624px;
    height: 510px;
    background: url(~@/assets/1.png) center no-repeat
}
</style>

<template>
    <div id="info" ref="info" @click="onClick">

    </div>
</template>




<script>

export default {
    props: {
        locationObj: {
            type: Object
        },
        isEdit: {
            type: Boolean
        },
        level: {
            type: Number
        },
        detailInfo: {
            type: Array
        },
        // floorNum: {
        //     type: String
        // }
    },
    data() {
        return {
            currentMesh: null
        }
    },
    mounted() {

    },
    watch: {
        isEdit: function (val, oldVal) {
            if (!val && oldVal) {
                if (this.currentMesh) {

                }
            }
        },
        detailInfo: function (val) {
            val.forEach(({ location }) => {

            })
        }
    },
    methods: {
        onClick() {
            // console.log(this.level)
            // if (this.addLevel === 1) {
            //     this.$emit("click", 2)
            // }
        },
    }
}
    
</script>