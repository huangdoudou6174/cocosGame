
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/SDK/VIVOSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c1a1agLiVGaYPD2dZeFl7T', 'VIVOSDK');
// myGame/Script/Platform/SDK/VIVOSDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SDK_1 = require("./SDK");
var GamePlatform_1 = require("../GamePlatform");
var EventManager_1 = require("../../Common/EventManager");
var GameEventType_1 = require("../../GameSpecial/GameEventType");
var VIVOSDK = /** @class */ (function (_super) {
    __extends(VIVOSDK, _super);
    function VIVOSDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiName = 'qg';
        return _this;
    }
    /**
     * 初始化
     */
    VIVOSDK.prototype.init = function () {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log(this.systemInfo);
    };
    /**
     * 视频广告
     */
    VIVOSDK.prototype.showVideo = function (success, quit, fail) {
        var _this = this;
        if (!GamePlatform_1.default.instance.Config.video || GamePlatform_1.default.instance.Config.videoAdUnitId[0] == '') {
            console.log("广告开关未打开或参数未填写");
            success();
            return;
        }
        if (this.systemInfo.platformVersionCode < 1041) {
            console.log('基础库版本过低，不能使用视频功能');
            success();
            return;
        }
        var rewardedAd = this.api.createRewardedVideoAd({
            posId: GamePlatform_1.default.instance.Config.videoAdUnitId[0],
            style: {}
        });
        rewardedAd.onClose(function (res) {
            if (res && res.isEnded) {
                console.log("正常播放结束，可以下发游戏奖励");
                !!success && success();
            }
            else {
                console.log("播放中途退出，不下发游戏奖励");
            }
        });
        rewardedAd.onError(function (err) {
            switch (err.errCode) {
                case -3: {
                    console.log("激励广告加载失败---调用太频繁", JSON.stringify(err));
                    break;
                }
                case -4: {
                    console.log("激励广告加载失败--- 一分钟内不能重复加载", JSON.stringify(err));
                    break;
                }
                case 30008: {
                    // 当前启动来源不支持激励视频广告，请选择其他激励策略
                    break;
                }
                default: {
                    // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                    console.log("激励广告展示失败");
                    console.log(JSON.stringify(err));
                    break;
                }
            }
            _this.showMessage("视频加载失败，请稍后再试~");
        });
        var adLoad = rewardedAd.load(); //第一次调用 可能会报-3  广告能正常展示就可以忽略
        // 捕捉load失败的错误
        !!adLoad && adLoad.catch(function (err) {
            console.log("激励广告load失败" + JSON.stringify(err));
        });
        rewardedAd.onLoad(function () {
            var adshow = rewardedAd.show();
            // 捕捉show失败的错误
            adshow && adshow.catch(function (err) {
                console.log("激励广告展示失败" + JSON.stringify(err));
            });
        });
    };
    /**
     * 打开banner广告
     */
    VIVOSDK.prototype.showBanner = function () {
        if (!GamePlatform_1.default.instance.Config.banner || GamePlatform_1.default.instance.Config.BannerAdUnitId[0] == '') {
            console.log("Banner广告开关未打开或参数未填写");
            return;
        }
        if (this.systemInfo.platformVersionCode < 1031) {
            console.log("基础库版本过低，不能使用广告功能");
            return;
        }
        this.removeBanner();
        //style内无需设置任何字段，banner会在屏幕底部居中显示，
        // 没有style字段，banner会在上边显示
        var bannerAd = this.api.createBannerAd({
            posId: GamePlatform_1.default.instance.Config.BannerAdUnitId[0],
            style: {}
        });
        console.log("是否创建banner成功：", !!bannerAd);
        this._bannerAd = bannerAd;
        var adshow = bannerAd.show();
        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
        if (!adshow) {
            console.log("banner show fail");
        }
        adshow && adshow.then(function () {
            console.log("banner广告展示成功");
        }).catch(function (err) {
            switch (err.code) {
                case 30003: {
                    console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                    break;
                }
                case 30009: {
                    console.log("10秒内调用广告次数超过1次，10秒后再调用");
                    break;
                }
                case 30002: {
                    console.log("加载广告失败，重新加载广告");
                    break;
                }
                default: {
                    // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                    console.log("banner广告展示失败");
                    console.log(JSON.stringify(err));
                    break;
                }
            }
        });
    };
    /**
     * 关闭banner广告
     */
    VIVOSDK.prototype.removeBanner = function () {
        if (this._bannerAd) {
            var addestroy = this._bannerAd.destroy();
            addestroy && addestroy.then(function () {
                console.log("banner广告销毁成功");
            }).catch(function (err) {
                console.log("banner广告销毁失败", err);
            });
            this._bannerAd = null;
        }
    };
    /**
     * 插屏广告
     */
    VIVOSDK.prototype.showInterstitialAd = function () {
        if (!GamePlatform_1.default.instance.Config.interstitial || GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0] == '') {
            console.log("插屏广告开关未打开或参数未填写");
            return;
        }
        if (this.systemInfo.platformVersionCode < 1031) {
            console.log("基础库版本过低，不能使用插屏广告功能");
            return;
        }
        var interstitialAd = this.api.createInterstitialAd({
            posId: GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0],
            style: {}
        });
        var adshow = interstitialAd.show();
        if (!adshow) {
            console.log("insertAd show fail");
        }
        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
        !!adshow && adshow.then(function () {
            console.log("插屏广告展示成功");
        }).catch(function (err) {
            switch (err.code) {
                case 30003: {
                    console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                    break;
                }
                case 30009: {
                    console.log("10秒内调用广告次数超过1次，10秒后再调用");
                    break;
                }
                case 30002: {
                    console.log("load广告失败，重新加载广告");
                    break;
                }
                default: {
                    // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                    console.log("插屏广告展示失败");
                    console.log(JSON.stringify(err));
                    break;
                }
            }
        });
    };
    /**
     * 短震动
     */
    VIVOSDK.prototype.vibrateShort = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateShort({});
        }
    };
    /**
     * 长震动
     */
    VIVOSDK.prototype.vibrateLong = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateLong({});
        }
    };
    /**
     * 无激励分享&&带参分享
     */
    VIVOSDK.prototype.shareAppMessage = function (query) {
        if (query === void 0) { query = ''; }
    };
    /**
     * 激励分享&&带参分享
     */
    VIVOSDK.prototype.shareToAnyOne = function (success, fail, query) {
        if (query === void 0) { query = ''; }
    };
    /**
     * 消息提示
     */
    VIVOSDK.prototype.showMessage = function (msg, icon) {
        if (icon === void 0) { icon = 'none'; }
        // this.api.showToast({
        //     title: msg,
        //     duration: 2000,
        //     icon: icon,
        //     success: (res) => { }
        // });
        EventManager_1.default.emit(GameEventType_1.EventType.UIEvent.showTip, msg);
    };
    return VIVOSDK;
}(SDK_1.default));
exports.default = VIVOSDK;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxTREtcXFZJVk9TREsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUF3QjtBQUN4QixnREFBMkM7QUFDM0MsMERBQXFEO0FBQ3JELGlFQUE0RDtBQUU1RDtJQUFxQywyQkFBRztJQUF4QztRQUFBLHFFQTJPQztRQTFPVyxhQUFPLEdBQVcsSUFBSSxDQUFDOztJQTBPbkMsQ0FBQztJQXhPRzs7T0FFRztJQUNJLHNCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQVMsR0FBaEIsVUFBaUIsT0FBaUIsRUFBRSxJQUFlLEVBQUUsSUFBZTtRQUFwRSxpQkEwREM7UUF6REcsSUFBSSxDQUFDLHNCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksc0JBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLEVBQUU7WUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTztTQUNWO1FBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxx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QUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBVyxHQUFsQjtRQUNJLElBQUksc0JBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFlLEdBQXRCLFVBQXVCLEtBQWtCO1FBQWxCLHNCQUFBLEVBQUEsVUFBa0I7SUFFekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksK0JBQWEsR0FBcEIsVUFBcUIsT0FBaUIsRUFBRSxJQUFlLEVBQUUsS0FBa0I7UUFBbEIsc0JBQUEsRUFBQSxVQUFrQjtJQUUzRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBVyxHQUFsQixVQUFtQixHQUFXLEVBQUUsSUFBcUI7UUFBckIscUJBQUEsRUFBQSxhQUFxQjtRQUNqRCx1QkFBdUI7UUFDdkIsa0JBQWtCO1FBQ2xCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsNEJBQTRCO1FBQzVCLE1BQU07UUFDTixzQkFBWSxDQUFDLElBQUksQ0FBQyx5QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQTNPQSxBQTJPQyxDQTNPb0MsYUFBRyxHQTJPdkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLIGZyb20gXCIuL1NES1wiO1xuaW1wb3J0IEdhbWVQbGF0Zm9ybSBmcm9tIFwiLi4vR2FtZVBsYXRmb3JtXCI7XG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gXCIuLi8uLi9Db21tb24vRXZlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWSVZPU0RLIGV4dGVuZHMgU0RLIHtcbiAgICBwcml2YXRlIGFwaU5hbWU6IHN0cmluZyA9ICdxZyc7XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5hcGkgPSB3aW5kb3dbdGhpcy5hcGlOYW1lXTtcbiAgICAgICAgdGhpcy5zeXN0ZW1JbmZvID0gdGhpcy5hcGkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zeXN0ZW1JbmZvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop4bpopHlub/lkYpcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd1ZpZGVvKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBxdWl0PzogRnVuY3Rpb24sIGZhaWw/OiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW8gfHwgR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWRlb0FkVW5pdElkWzBdID09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuW8gOWFs+acquaJk+W8gOaIluWPguaVsOacquWhq+WGmVwiKTtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zeXN0ZW1JbmZvLnBsYXRmb3JtVmVyc2lvbkNvZGUgPCAxMDQxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Z+656GA5bqT54mI5pys6L+H5L2O77yM5LiN6IO95L2/55So6KeG6aKR5Yqf6IO9Jyk7XG4gICAgICAgICAgICBzdWNjZXNzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJld2FyZGVkQWQgPSB0aGlzLmFwaS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgcG9zSWQ6IEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW9BZFVuaXRJZFswXSxcbiAgICAgICAgICAgIHN0eWxlOiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgcmV3YXJkZWRBZC5vbkNsb3NlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcIik7XG4gICAgICAgICAgICAgICAgISFzdWNjZXNzICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXdhcmRlZEFkLm9uRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyLmVyckNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIC0zOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5r+A5Yqx5bm/5ZGK5Yqg6L295aSx6LSlLS0t6LCD55So5aSq6aKR57mBXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAtNDoge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIua/gOWKseW5v+WRiuWKoOi9veWksei0pS0tLSDkuIDliIbpkp/lhoXkuI3og73ph43lpI3liqDovb1cIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIDMwMDA4OiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOW9k+WJjeWQr+WKqOadpea6kOS4jeaUr+aMgea/gOWKseinhumikeW5v+WRiu+8jOivt+mAieaLqeWFtuS7lua/gOWKseetlueVpVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAvLyDlj4LogIMgaHR0cHM6Ly9taW5pZ2FtZS52aXZvLmNvbS5jbi9kb2N1bWVudHMvIy9sZXNzb24vb3Blbi1hYmlsaXR5L2FkP2lkPeW5v+WRiumUmeivr+eggeS/oeaBryDlr7nplJnor6/noIHlgZrliIbnsbvlpITnkIZcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmv4DlirHlub/lkYrlsZXnpLrlpLHotKVcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZShcIuinhumikeWKoOi9veWksei0pe+8jOivt+eojeWQjuWGjeivlX5cIik7XG4gICAgICAgIH0pXG4gICAgICAgIGxldCBhZExvYWQgPSByZXdhcmRlZEFkLmxvYWQoKTsvL+esrOS4gOasoeiwg+eUqCDlj6/og73kvJrmiqUtMyAg5bm/5ZGK6IO95q2j5bi45bGV56S65bCx5Y+v5Lul5b+955WlXG4gICAgICAgIC8vIOaNleaNiWxvYWTlpLHotKXnmoTplJnor69cbiAgICAgICAgISFhZExvYWQgJiYgYWRMb2FkLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIua/gOWKseW5v+WRimxvYWTlpLHotKVcIiArIEpTT04uc3RyaW5naWZ5KGVycikpXG4gICAgICAgIH0pXG4gICAgICAgIHJld2FyZGVkQWQub25Mb2FkKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBhZHNob3cgPSByZXdhcmRlZEFkLnNob3coKTtcbiAgICAgICAgICAgIC8vIOaNleaNiXNob3flpLHotKXnmoTplJnor69cbiAgICAgICAgICAgIGFkc2hvdyAmJiBhZHNob3cuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIua/gOWKseW5v+WRiuWxleekuuWksei0pVwiICsgSlNPTi5zdHJpbmdpZnkoZXJyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy/lvZPliY1iYW5uZXJcbiAgICBwcml2YXRlIF9iYW5uZXJBZDogYW55O1xuICAgIC8qKlxuICAgICAqIOaJk+W8gGJhbm5lcuW5v+WRilxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93QmFubmVyKCkge1xuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcuYmFubmVyIHx8IEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcuQmFubmVyQWRVbml0SWRbMF0gPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFubmVy5bm/5ZGK5byA5YWz5pyq5omT5byA5oiW5Y+C5pWw5pyq5aGr5YaZXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN5c3RlbUluZm8ucGxhdGZvcm1WZXJzaW9uQ29kZSA8IDEwMzEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Z+656GA5bqT54mI5pys6L+H5L2O77yM5LiN6IO95L2/55So5bm/5ZGK5Yqf6IO9XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQmFubmVyKCk7XG4gICAgICAgIC8vc3R5bGXlhoXml6DpnIDorr7nva7ku7vkvZXlrZfmrrXvvIxiYW5uZXLkvJrlnKjlsY/luZXlupXpg6jlsYXkuK3mmL7npLrvvIxcbiAgICAgICAgLy8g5rKh5pyJc3R5bGXlrZfmrrXvvIxiYW5uZXLkvJrlnKjkuIrovrnmmL7npLpcbiAgICAgICAgbGV0IGJhbm5lckFkID0gdGhpcy5hcGkuY3JlYXRlQmFubmVyQWQoe1xuICAgICAgICAgICAgcG9zSWQ6IEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcuQmFubmVyQWRVbml0SWRbMF0sXG4gICAgICAgICAgICBzdHlsZToge31cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5piv5ZCm5Yib5bu6YmFubmVy5oiQ5Yqf77yaXCIsICEhYmFubmVyQWQpO1xuICAgICAgICB0aGlzLl9iYW5uZXJBZCA9IGJhbm5lckFkO1xuICAgICAgICBsZXQgYWRzaG93ID0gYmFubmVyQWQuc2hvdygpO1xuICAgICAgICAvLyDosIPnlKh0aGVu5ZKMY2F0Y2jkuYvliY3pnIDopoHlr7lzaG9355qE57uT5p6c5YGa5LiL5Yik56m65aSE55CG77yM6Ziy5q2i5Ye66ZSZ77yI5aaC5p6c5rKh5pyJ5Yik56m677yM5Zyo5bmz5Y+w54mI5pys5Li6MTA1MuS7peWPiuS7peS4i+eahOaJi+acuuS4iuWwhuS8muWHuueOsOmUmeivr++8iVxuICAgICAgICBpZiAoIWFkc2hvdykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXIgc2hvdyBmYWlsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGFkc2hvdyAmJiBhZHNob3cudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lcuW5v+WRiuWxleekuuaIkOWKn1wiKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlcnIuY29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMzAwMDM6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlrDnlKjmiLc35aSp5YaF5LiN6IO95pud5YWJQmFubmVy77yM6K+35bCG5omL5py65pe26Ze06LCD5pW05Li6N+WkqeWQju+8jOmAgOWHuua4uOaIj+mHjeaWsOi/m+WFpVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgMzAwMDk6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIxMOenkuWGheiwg+eUqOW5v+WRiuasoeaVsOi2hei/hzHmrKHvvIwxMOenkuWQjuWGjeiwg+eUqFwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgMzAwMDI6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3lub/lkYrlpLHotKXvvIzph43mlrDliqDovb3lub/lkYpcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWPguiAgyBodHRwczovL21pbmlnYW1lLnZpdm8uY29tLmNuL2RvY3VtZW50cy8jL2xlc3Nvbi9vcGVuLWFiaWxpdHkvYWQ/aWQ95bm/5ZGK6ZSZ6K+v56CB5L+h5oGvIOWvuemUmeivr+eggeWBmuWIhuexu+WkhOeQhlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lcuW5v+WRiuWxleekuuWksei0pVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6ZetYmFubmVy5bm/5ZGKXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUJhbm5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Jhbm5lckFkKSB7XG4gICAgICAgICAgICBsZXQgYWRkZXN0cm95ID0gdGhpcy5fYmFubmVyQWQuZGVzdHJveSgpO1xuICAgICAgICAgICAgYWRkZXN0cm95ICYmIGFkZGVzdHJveS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lcuW5v+WRiumUgOavgeaIkOWKn1wiKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXLlub/lkYrplIDmr4HlpLHotKVcIiwgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+S5bGP5bm/5ZGKXG4gICAgICovXG4gICAgcHVibGljIHNob3dJbnRlcnN0aXRpYWxBZCgpIHtcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLmludGVyc3RpdGlhbCB8fCBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkludGVyc3RpdGlhbEFkVW5pdElkWzBdID09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuW8gOWFs+acquaJk+W8gOaIluWPguaVsOacquWhq+WGmVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zeXN0ZW1JbmZvLnBsYXRmb3JtVmVyc2lvbkNvZGUgPCAxMDMxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWfuuehgOW6k+eJiOacrOi/h+S9ju+8jOS4jeiDveS9v+eUqOaPkuWxj+W5v+WRiuWKn+iDvVwiKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBpbnRlcnN0aXRpYWxBZCA9IHRoaXMuYXBpLmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcbiAgICAgICAgICAgIHBvc0lkOiBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkludGVyc3RpdGlhbEFkVW5pdElkWzBdLFxuICAgICAgICAgICAgc3R5bGU6IHt9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYWRzaG93ID0gaW50ZXJzdGl0aWFsQWQuc2hvdygpO1xuICAgICAgICBpZiAoIWFkc2hvdykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNlcnRBZCBzaG93IGZhaWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6LCD55SodGhlbuWSjGNhdGNo5LmL5YmN6ZyA6KaB5a+5c2hvd+eahOe7k+aenOWBmuS4i+WIpOepuuWkhOeQhu+8jOmYsuatouWHuumUme+8iOWmguaenOayoeacieWIpOepuu+8jOWcqOW5s+WPsOeJiOacrOS4ujEwNTLku6Xlj4rku6XkuIvnmoTmiYvmnLrkuIrlsIbkvJrlh7rnjrDplJnor6/vvIlcbiAgICAgICAgISFhZHNob3cgJiYgYWRzaG93LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrlsZXnpLrmiJDlip9cIik7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyLmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDMwMDAzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5paw55So5oi3N+WkqeWGheS4jeiDveabneWFiUJhbm5lcu+8jOivt+WwhuaJi+acuuaXtumXtOiwg+aVtOS4ujflpKnlkI7vvIzpgIDlh7rmuLjmiI/ph43mlrDov5vlhaVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIDMwMDA5OiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMTDnp5LlhoXosIPnlKjlub/lkYrmrKHmlbDotoXov4cx5qyh77yMMTDnp5LlkI7lho3osIPnlKhcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIDMwMDAyOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZOW5v+WRiuWksei0pe+8jOmHjeaWsOWKoOi9veW5v+WRilwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5Y+C6ICDIGh0dHBzOi8vbWluaWdhbWUudml2by5jb20uY24vZG9jdW1lbnRzLyMvbGVzc29uL29wZW4tYWJpbGl0eS9hZD9pZD3lub/lkYrplJnor6/noIHkv6Hmga8g5a+56ZSZ6K+v56CB5YGa5YiG57G75aSE55CGXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o+S5bGP5bm/5ZGK5bGV56S65aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnn63pnIfliqhcbiAgICAgKi9cbiAgICBwdWJsaWMgdmlicmF0ZVNob3J0KCkge1xuICAgICAgICBpZiAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWJyYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS52aWJyYXRlU2hvcnQoe30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6ZW/6ZyH5YqoXG4gICAgICovXG4gICAgcHVibGljIHZpYnJhdGVMb25nKCkge1xuICAgICAgICBpZiAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWJyYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS52aWJyYXRlTG9uZyh7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDml6Dmv4DlirHliIbkuqsmJuW4puWPguWIhuS6q1xuICAgICAqL1xuICAgIHB1YmxpYyBzaGFyZUFwcE1lc3NhZ2UocXVlcnk6IHN0cmluZyA9ICcnKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmv4DlirHliIbkuqsmJuW4puWPguWIhuS6q1xuICAgICAqL1xuICAgIHB1YmxpYyBzaGFyZVRvQW55T25lKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24sIHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5raI5oGv5o+Q56S6XG4gICAgICovXG4gICAgcHVibGljIHNob3dNZXNzYWdlKG1zZzogc3RyaW5nLCBpY29uOiBzdHJpbmcgPSAnbm9uZScpIHtcbiAgICAgICAgLy8gdGhpcy5hcGkuc2hvd1RvYXN0KHtcbiAgICAgICAgLy8gICAgIHRpdGxlOiBtc2csXG4gICAgICAgIC8vICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgLy8gICAgIGljb246IGljb24sXG4gICAgICAgIC8vICAgICBzdWNjZXNzOiAocmVzKSA9PiB7IH1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KEV2ZW50VHlwZS5VSUV2ZW50LnNob3dUaXAsbXNnKTtcbiAgICB9XG59XG4iXX0=