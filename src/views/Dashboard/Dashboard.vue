<style scoped>
#dashboard-wrapper {
    width:2560px;
    height:1080px;
    background:rgba(15,15,25,1);
    /* padding: 20px; */
}
.container {
    float: left;
    height: 1080px;
    /* border: 1px solid #ffffff; */
}
.left-content {
    width: 25%;
}
.center-content {
    width: 50%;
}
.right-content {
    width: 25%;
}
.wheather {
    width:600px;
    height:319px;
    background: url(~@/assets/wheatherbg.svg) center no-repeat;
    background-size: 100% 100%;
}
.wheather-icon {
    width: 100%;
    height: 120px;
    float: left;
}
.icon {
    background: url(~@/assets/duoyun.svg) center no-repeat;
    width: 120px;
    height: 120px;
    margin: 40px 0 0 40px;
    float: left;
}
.temp-num {
    color: #ffffff;
    font-size: 49px;
    line-height: 195px;
    float: left;
    margin-left: 20px;
    & span {
        font-size: 28px;
        margin-left: 16px;
    }
}
.info {
    font-size: 36px;
    color: #ffffff;
    float: right;
    margin: 77px 107px;
}
.temperature {
    color: #ffffff;
    font-size: 24px;
    padding: 185px 0 0 0;
    & li {
        display: inline-block;
        margin-left: 38px;
        width: 160px;
        line-height: 50px;
        & span {
            font-size: 18px;
        }
    }
}
</style>

<template>
    <div id="dashboard-wrapper">
        <div class="left-content container">
            <div class="wheather">
                <div class="wheather-icon">
                    <p class="icon"></p>
                    <p class="temp-num">12<span>℃</span></p>
                    <p class="info">多云</p>
                </div>
                <ul class="temperature">
                    <li>室外温度 12<span>℃</span></li>
                    <li>室内温度 12<span>℃</span></li>
                    <li>CO₂ 40ppm</li>
                    <li>室外温度 60%</li>
                    <li>室内温度 70%</li>
                    <li>CO 8pm</li>
                </ul>
            </div>
            <div class="car-parking"></div>
        </div>
        <div class="center-content container">
            <div class="main-building"></div>
            <div class="people-flow"></div>
        </div>
        <div class="right-content container">

        </div>
    </div>
</template>

<script>
    
    export default {
        data() {

        }
    }
</script>
