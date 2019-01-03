<style scoped>
.preview {

}
/* .three-choose {
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
} */
.preview-content {
    width: 100%;
    height: 600px;
    margin-top: 24px;
    background: #cccccc;
}
</style>

<template>
    <div class="preview">
        <!-- <div class="three-choose">
            <div class="tab-choose" :class="{choosen: currentChoose === index}" v-for="(item, index) of allChoose" v-text="item" @click="switchChoose(index)"></div>
        </div> -->
        <div class="preview-content">
            <button @click="onInit">初始化</button>
            <button @click="onPreview">预览</button>
            <button @click="onStopView">停止预览</button>
            <button @click="uninit">反初始化</button>
            <div class="only-one" id="playWnd"></div>
        </div>
    </div>
</template>

<script>

let oWebControl = null;// 插件对象
let bIE = (!!window.ActiveXObject || 'ActiveXObject' in window);// 是否为IE浏览器
let pubKey = '';

let iLastCoverLeft = 0;
let iLastCoverTop = 0;
let iLastCoverRight = 0;
let iLastCoverBottom = 0;
let initCount = 0;

export default {
    props: ['cameraId', 'currentIndex', 'cameraInfo'],
    data() {
        return {
            // currentChoose: 0,
            locationHref: location.pathname,
            // allChoose: ["lskf", "fsd", "fdsf"],
            currentTab: this.currentIndex,
            requestInfo: {}
        }
    },
    watch: {
        currentTab: function(val) {
            console.log(val)
            if(val !== 0) {
                this.onUnload()
                this.uninit()
                this.onStopView()
            }
        },
        locationHref: function(val) {
            if(val !== '/video-record' ) {
                
            }
        },
        cameraInfo: function(val) {
            this.requestInfo = val
            console.log(this.requestInfo)
            this.onInit()
        }
    },
    created() {
        
    },
    mounted() {
        this.initPlugin()
    },
    destroyed() {
        console.log(111)
        this.onUnload()
        this.uninit()
        this.onStopView()
    },
    methods: {
        onUnload() {
            // 标签关闭
            this.uninit()

            // 销毁
            oWebControl.JS_RequestInterface({
                funcName: "destroyWnd"
            }).then(function (oData) {
                // showCBInfo(JSON.stringify(oData));
            });

            if (bIE) {
                if (oWebControl != null) {
                    oWebControl.JS_Disconnect().then(function () {
                        console.log("JS_Disconnect");
                    }, function () {});
                }
            } else{
                if (oWebControl != null) {
                    oWebControl.JS_DestroyWnd().then(function () {
                        console.log("JS_DestroyWnd");
                    }, function () {});
                    oWebControl.JS_StopService("window").then(function () {
                        oWebControl.JS_Disconnect().then(function () {
                            console.log("JS_Disconnect");
                        }, function () {});
                    });
                }
            }
        },
        onResize() {
            // 窗口resize
            if (oWebControl != null) {
                oWebControl.JS_Resize(600, 400);
                this.setWndCover();
            }
        },
        onScroll() {
            if (oWebControl != null) {
                oWebControl.JS_Resize(600, 400);
                this.setWndCover();
            }
        },
        setWndCover() {
            // 设置窗口遮挡
            var iWidth = $(window).width();
            var iHeight = $(window).height();
            var PlayWnd = document.getElementById('playWnd')
            var oDivRect = PlayWnd.get(0).getBoundingClientRect();

            var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
            var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
            var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
            var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

            iCoverLeft = (iCoverLeft > 600) ? 600 : iCoverLeft;
            iCoverTop = (iCoverTop > 400) ? 400 : iCoverTop;
            iCoverRight = (iCoverRight > 600) ? 600 : iCoverRight;
            iCoverBottom = (iCoverBottom > 400) ? 400 : iCoverBottom;

            if (iLastCoverLeft != iCoverLeft) {
                console.log("iCoverLeft: " + iCoverLeft);
                iLastCoverLeft = iCoverLeft;
                oWebControl.JS_SetWndCover("left", iCoverLeft);
            }
            if (iLastCoverTop != iCoverTop) {
                console.log("iCoverTop: " + iCoverTop);
                iLastCoverTop = iCoverTop;
                oWebControl.JS_SetWndCover("top", iCoverTop);
            }
            if (iLastCoverRight != iCoverRight) {
                console.log("iCoverRight: " + iCoverRight);
                iLastCoverRight = iCoverRight;
                oWebControl.JS_SetWndCover("right", iCoverRight);
            }
            if (iLastCoverBottom != iCoverBottom) {
                console.log("iCoverBottom: " + iCoverBottom);
                iLastCoverBottom = iCoverBottom;
                oWebControl.JS_SetWndCover("bottom", iCoverBottom);
            }
        },
        initPlugin () {
            // 初始化插件
            oWebControl = new WebControl({
                szPluginContainer: "playWnd",
                iServicePortStart: 15900,
                iServicePortEnd: 15909,
                cbConnectSuccess: function () {

                    oWebControl.JS_StartService("window", {
                        dllPath: "./VideoPluginConnect.dll"
                        //dllPath: "./DllForTest-Win32.dll"
                    }).then(function () {
                        oWebControl.JS_CreateWnd("playWnd", 800, 600).then(function () {
                            console.log("JS_CreateWnd success");
                        });
                    }, function () {
                    
                    });
                },
                cbConnectError: function () {
                    console.log("cbConnectError");
                    oWebControl = null;
                    $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
                    WebControl.JS_WakeUp("VideoWebPlugin://");
                    initCount ++;
                    if (initCount < 3) {
                        setTimeout(function () {
                            this.initPlugin();
                        }, 3000)
                    } else {
                        $("#playWnd").html("插件启动失败，请检查插件是否安装！");
                    }
                },
                cbConnectClose: function () {
                    console.log("cbConnectClose");
                    oWebControl = null;
                }
            });
            console.log(oWebControl.JS_RequestInterface)
        },
        getPubKey (callback) {
            // 获取公钥
            oWebControl.JS_RequestInterface({
                funcName: "getRSAPubKey",
                argument: JSON.stringify({
                    keyLength: 1024
                })
            }).then(function (oData) {
                console.log(oData)
                if (oData.responseMsg.data) {
                    pubKey = oData.responseMsg.data
                    callback()
                }
            })
        },
        setEncrypt (value) {
            // RSA加密
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(pubKey);
            return encrypt.encrypt(value);
        },
        onInit() {
            // 初始化
            const that = this
            // console.log(this)
            this.getPubKey(function () {
                var appkey = "28859432";
                var secret = that.setEncrypt('vnNh32VMcA89eOyaBFa6');
                var ip ="122.224.240.78";
                var port = Number.parseInt(36100);
                var snapDir = "D:\SnapDir";
                var layout = "1x1";
                var encryptedFields = ['secret'];
                encryptedFields = encryptedFields.join(",");

                console.log({
                    appkey: appkey,
                    secret: secret,
                    ip: ip,
                    playMode: 0, // 预览
                    port: port,
                    snapDir: snapDir,
                    layout: layout,
                    encryptedFields: encryptedFields
                })

                oWebControl.JS_RequestInterface({
                    funcName: "init",
                    argument: JSON.stringify({
                        appkey: appkey,
                        secret: secret,
                        ip: ip,
                        playMode: 0, // 预览
                        port: port,
                        snapDir: snapDir,
                        layout: layout,
                        encryptedFields: encryptedFields
                    })
                }).then(function (oData) {
                    // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
                });
            })
        },
        uninit () {
            // 反初始化
            oWebControl.JS_RequestInterface({
                funcName: "uninit"
            }).then(function (oData) {
                // 显示回调信息
                // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        },
        onPreview() {
            // 预览
            var cameraIndexCode  = "98d3d1287e124097a7a711d726871502";
            var streamMode = 0;
            var transMode = 1;
            var gpuMode = 0;

            oWebControl.JS_RequestInterface({
                funcName: "startPreview",
                argument: JSON.stringify({
                    cameraIndexCode : cameraIndexCode ,
                    streamMode: streamMode,
                    transMode: transMode,
                    gpuMode: gpuMode
                })
            }).then(function (oData) {
                // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        },
        onStopView() {
            // 停止预览
            oWebControl.JS_RequestInterface({
                funcName: "stopAllPreview"
            }).then(function (oData) {
                // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        }
        
    }
}
</script>