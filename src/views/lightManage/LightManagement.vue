<style scoped>
    .container {
	    padding: 24px;
        margin-top: 20px;
        box-sizing: border-box;
        background-color: #FFF;
    }
    .header {
        padding: 0 24px;
        background-color: #FFF;
        margin-bottom: 24px;
    }
    .tabs {
        margin-bottom: 10px;
    }

    .tab-wrapper {
        display: flex;
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
    
</style>

<template>
    <div id="light-wrapper">
        <header class="header">
			<tab-bar :list="tabs"></tab-bar><br />

			<div class="tab-wrapper">
				<div class="tab-item" :class="{actived: currentIndex === index}" v-for="(item, index) of tab" v-text="item" @click="switchIndex(index)"></div>
			</div>
		</header>

        <DeviceContent v-if="currentIndex === 0" />
        <ChartsContent v-if="currentIndex === 1"/>
    </div>
</template>
    
<script>
    import DeviceContent from './DeviceContent.vue'
    import ChartsContent from './ChartsContent.vue'

    export default {
        data() {
            return {
                search: '',
                currentIndex: 0,
                
				tab: ['设备维护', '报表分析'],
                tabs: [
                    {
                        number: 123,
                        text: '灯总数'
                    },
                    {
                        number: 321,
                        text: '正常开启'
                    },
                    {
                        number: 432,
                        text: '正常关闭'
                    },
                    {
                        number: 542,
                        text: '故障中'
                    }
                ]
            }
        },
        methods: {
            switchIndex(index) {
				this.currentIndex = index
            },
            go() {
                // this.$router.push('/light/lightAdd')
            }
        },
        components: {
            DeviceContent,
            ChartsContent
            // Building
        }
    }
</script>
