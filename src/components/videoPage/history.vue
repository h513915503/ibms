<style scoped>
.container {

}
.history-content {
    width: 100%;
    height: 600px;
    margin-top: 24px;
    background: #e7d8d8;
}
.search-content {
    display: flex;
}
.time-picker {
    margin-right: 24px;
}
</style>

<template>
    <div class="container">
        <div class="search-content">
            <el-date-picker v-model="startTimeStamp" value-format="timestamp" type="datetime" placeholder="开始时间" class="time-picker"></el-date-picker>
            <el-date-picker v-model="endTimeStamp" value-format="timestamp" type="datetime" placeholder="结束时间" class="time-picker"></el-date-picker>
            <el-button type="primary" @click="onSearch">查询</el-button>
        </div>
        <div class="history-content">
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
    props: ['cameraId'],
    data() {
        return {
            startTimeStamp: '',
            endTimeStamp: ''
        }
    },
    mounted() {
        this.initPlugin()
    },
    methods: {
        onSearch() {
            console.log(this.startTimeStamp, this.endTimeStamp)
        },
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
                setWndCover();
            }
        },
        onScroll() {
            // 滚动条scroll
            if (oWebControl != null) {
                oWebControl.JS_Resize(600, 400);
                setWndCover();
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
                        oWebControl.JS_CreateWnd("playWnd", 600, 400).then(function () {
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
                            initPlugin();
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
            getPubKey(function () {
                // var appkey = $("#appkey").val();
                // var secret = setEncrypt($("#secret").val());
                // var ip = $("#ip").val();
                // var port = Number.parseInt($("#port").val());
                // var snapDir = $("#snapDir").val();
                // var layout = $("#layout").val();
                var encryptedFields = ['secret'];
                $(".encryptedFields").each(function (index, item) {
                    var $item = $(item);
                    if ($item.prop('checked')) {
                        var value = $item.val();
                        if (value !== 'secret') {
                            encryptedFields.push(value);
                        }
                        
                        // secret固定加密，其它根据用户勾选加密
                        if (value == 'ip') {
                            ip = setEncrypt(ip)
                        }
                        if (value == 'appkey') {
                            appkey = setEncrypt(appkey)
                        }
                        if (value == 'snapDir') {
                            snapDir = setEncrypt(snapDir)
                        }
                        if (value == 'layout') {
                            layout = setEncrypt(layout)
                        }
                    }
                })
                encryptedFields = encryptedFields.join(",");

                // if (!appkey) {
                //     showCBInfo("appkey不能为空！", 'error');
                //     return
                // }
                // if (!$("#secret").val()) {
                //     showCBInfo("secret不能为空！", 'error');
                //     return
                // }
                // if (!ip) {
                //     showCBInfo("ip不能为空！", 'error');
                //     return
                // }
                // if (!$("#port").val()) {
                //     showCBInfo("端口不能为空！", 'error');
                //     return
                // } else if (!/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test($("#port").val())) {
                //     showCBInfo("端口填写有误！", 'error');
                //     return
                // }
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
        onPlayBack() {
            // 回放
            // var cameraIndexCode  = $("#cameraIndexCode ").val();
            // var streamMode = +$("#streamMode").val();
            // var transMode = +$("#transMode").val();
            // var gpuMode = +$("#gpuMode").val();

            if (!Number.isNaN(+startTimeStamp) || Number.isNaN(+endTimeStamp) ) {
                // showCBInfo("监控点编号不能为空！", 'error');
                return
            }

            oWebControl.JS_RequestInterface({
                funcName: "startPlayback",
                argument: JSON.stringify({
                    cameraIndexCode: cameraIndexCode,
                    startTimeStamp: Math.floor(startTimeStamp / 1000),
                    endTimeStamp: Math.floor(endTimeStamp / 1000),
                    recordLocation: recordLocation,
                    transMode: transMode,
                    gpuMode: gpuMode
                })
            }).then(function (oData) {
                // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        },
        onStopPlayBack() {
            // 停止回放
            oWebControl.JS_RequestInterface({
                funcName: "stopAllPlayback"
            }).then(function (oData) {
                // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        }
    }
}
</script>