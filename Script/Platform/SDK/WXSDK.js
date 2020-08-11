
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/SDK/WXSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40005ATOQtJOYnOTfO5njtu', 'WXSDK');
// myGame/Script/Platform/SDK/WXSDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SDK_1 = require("./SDK");
var GamePlatform_1 = require("../GamePlatform");
var GameEventType_1 = require("../../GameSpecial/GameEventType");
var EventManager_1 = require("../../Common/EventManager");
var WXSDK = /** @class */ (function (_super) {
    __extends(WXSDK, _super);
    function WXSDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiName = 'wx';
        return _this;
    }
    WXSDK.prototype.init = function () {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log("\n手机型号", this.systemInfo.model, "\n系统", this.systemInfo.system, "\n微信版本", this.systemInfo.version, "\n语言", this.systemInfo.language, "\n手机品牌", this.systemInfo.brand, "\n客户端平台", this.systemInfo.platform, "\n客户端基础库版本", this.systemInfo.SDKVersion);
        // this.api.onShareAppMessage(() => ({}));
        this.api.showShareMenu({ withShareTicket: false });
    };
    /**
     * 视频广告
     */
    WXSDK.prototype.showVideo = function (success, quit, fail) {
        var _this = this;
        var videoId = this.getVideoAdUnitId();
        if (!videoId) {
            success();
            return;
        }
        var rewardedVideoAd = this.api.createRewardedVideoAd({ adUnitId: videoId });
        rewardedVideoAd.onLoad(function () {
            console.log('激励视频 广告加载成功');
        });
        rewardedVideoAd.onError(function (err) {
            console.log('激励视频 广告拉取失败', err);
            fail && fail();
        });
        rewardedVideoAd.onClose(function (res) {
            rewardedVideoAd.offLoad();
            rewardedVideoAd.offError();
            rewardedVideoAd.offClose();
            rewardedVideoAd = null;
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                //视频正常播放结束
                success();
            }
            else {
                //视频播放中途退出
                quit && quit();
            }
        });
        //开始加载视频广告
        rewardedVideoAd.load().then(function () {
            rewardedVideoAd.show().catch(function (err) {
                console.log('视频广告播放失败', err);
                rewardedVideoAd.offLoad();
                rewardedVideoAd.offError();
                rewardedVideoAd.offClose();
                rewardedVideoAd = null;
                _this.showMessage("视频加载失败，请稍后再试~");
                fail && fail();
            });
        });
    };
    /**
     * 打开banner
     */
    WXSDK.prototype.showBanner = function () {
        var _this = this;
        var bannerId = this.getBannerId();
        if (!bannerId) {
            return;
        }
        // if (!GamePlatform.instance.Config.banner) {
        //     console.log("Banner广告开关未打开或参数未填写");
        //     return;
        // }
        this.removeBanner();
        this._bannerAd = this.api.createBannerAd({
            adUnitId: bannerId,
            style: {
                left: 0,
                top: this.systemInfo.screenHeight - 130,
                width: this.systemInfo.screenWidth + 50,
            }
        });
        this._bannerAd.onLoad(function () {
            console.log("广告拉取成功");
        });
        this._bannerAd.onError(function (err) {
            console.log("广告拉取失败", err);
        });
        this._bannerAd.show().then(function () { console.log("显示广告"); });
        // this._bannerAd.onResize(res => {
        //     this._bannerAd.style.top = this.systemInfo.screenHeight - res.height;
        //     this._bannerAd.style.width = this.systemInfo.screenWidth + 50;
        //     this.emit(EventType.SDKEvent.bannerResize, res.height);
        // });
        if (this.systemInfo.platform == "ios" && cc.visibleRect["height"] / cc.visibleRect["width"] >= 2) {
            console.log("苹果刘海屏手机调用banner");
            this._bannerAd.onResize(function (res) {
                _this._bannerAd.style.top = _this.systemInfo.screenHeight - res.height - 20;
                _this._bannerAd.style.width = _this.systemInfo.screenWidth + 50;
                EventManager_1.default.emit(GameEventType_1.EventType.SDKEvent.bannerResize, res.height + 20);
            });
        }
        else {
            this._bannerAd.onResize(function (res) {
                _this._bannerAd.style.top = _this.systemInfo.screenHeight - res.height;
                _this._bannerAd.style.width = _this.systemInfo.screenWidth + 50;
                EventManager_1.default.emit(GameEventType_1.EventType.SDKEvent.bannerResize, res.height);
            });
        }
        return this._bannerAd;
    };
    /**
     * 关闭广告
     */
    WXSDK.prototype.removeBanner = function () {
        if (this._bannerAd) {
            this._bannerAd.offLoad();
            this._bannerAd.offError();
            this._bannerAd.offResize();
            this._bannerAd.destroy(); //要先把旧的广告给销毁，不然会导致其监听的时间无法释放，影响性能
            this._bannerAd = null;
        }
    };
    //插屏广告
    WXSDK.prototype.showInterstitialAd = function () {
        if (!GamePlatform_1.default.instance.Config.interstitial || GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0] == '') {
            console.log("插屏广告开关未打开或参数未填写");
            return;
        }
        var version = this.systemInfo.SDKVersion;
        if (this.compareVersion(version, '2.6.0') >= 0) {
            var interad = this.api.createInterstitialAd({
                adUnitId: GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0]
            });
            interad.onLoad(function () {
                console.log('插屏广告加载成功');
            });
            interad.show().then(function (res) {
                console.log('显示插屏广告', res);
            });
            interad.onClose(function () {
                console.log('监听插屏广告关闭事件');
            });
            interad.onError(function (res) {
                console.log('监听插屏错误事件', res);
            });
        }
        else {
            console.log('基础库版本过低');
            //   // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            //   wx.showModal({
            //     title: '提示',
            //     content: '当前微信版本过低，无法使用插屏广告，请升级到最新微信版本后重试。'
            //   })
        }
    };
    /**
     * 判断基础库版本号
     */
    WXSDK.prototype.compareVersion = function (v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    };
    /**
     * 短震动
     */
    WXSDK.prototype.vibrateShort = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateShort({});
        }
    };
    /**
     * 长震动
     */
    WXSDK.prototype.vibrateLong = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateLong({});
        }
    };
    /**
     * 无激励分享&&带参分享
     */
    WXSDK.prototype.shareAppMessage = function (query) {
        if (query === void 0) { query = ""; }
        var index = Math.floor((Math.random() * this.shareTitleArr.length));
        var indeximg = Math.floor((Math.random() * this.shareImgArr.length));
        this.api.shareAppMessage({
            title: "" + this.shareTitleArr[index],
            imageUrl: "" + this.shareImgArr[indeximg],
            query: "" + query,
        });
    };
    /**
     * 激励分享&&带参分享
     */
    WXSDK.prototype.shareToAnyOne = function (success, fail, query) {
        if (query === void 0) { query = ''; }
        if (!GamePlatform_1.default.instance.Config.share) {
            success();
            return;
        }
        this.shareAppMessage(query);
        success();
    };
    /**
     * 消息提示
     */
    WXSDK.prototype.showMessage = function (msg, icon) {
        if (icon === void 0) { icon = 'none'; }
        // this.api.showToast({
        //     title: msg,
        //     duration: 2000,
        //     icon: icon,
        //     success: (res) => { }
        // });
        EventManager_1.default.emit(GameEventType_1.EventType.UIEvent.showTip, msg);
    };
    WXSDK.prototype.navigateToMiniProgram = function (data) {
        this.api.navigateToMiniProgram({
            appId: data.gameId,
        });
    };
    return WXSDK;
}(SDK_1.default));
exports.default = WXSDK;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxTREtcXFdYU0RLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBd0I7QUFDeEIsZ0RBQTJDO0FBQzNDLGlFQUE0RDtBQUM1RCwwREFBcUQ7QUFFckQ7SUFBbUMseUJBQUc7SUFBdEM7UUFBQSxxRUE4UEM7UUE3UFcsYUFBTyxHQUFXLElBQUksQ0FBQzs7SUE2UG5DLENBQUM7SUEzUFUsb0JBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUNQLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQ2pDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFDaEMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQ25DLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDM0MsQ0FBQztRQUVGLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRztJQUNJLHlCQUFTLEdBQWhCLFVBQWlCLE9BQWlCLEVBQUUsSUFBZSxFQUFFLElBQWU7UUFBcEUsaUJBNkNDO1FBNUNHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFB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QTlQQSxBQThQQyxDQTlQa0MsYUFBRyxHQThQckMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLIGZyb20gXCIuL1NES1wiO1xuaW1wb3J0IEdhbWVQbGF0Zm9ybSBmcm9tIFwiLi4vR2FtZVBsYXRmb3JtXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuaW1wb3J0IEV2ZW50TWFuYWdlciBmcm9tIFwiLi4vLi4vQ29tbW9uL0V2ZW50TWFuYWdlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXWFNESyBleHRlbmRzIFNESyB7XG4gICAgcHJpdmF0ZSBhcGlOYW1lOiBzdHJpbmcgPSAnd3gnO1xuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuYXBpID0gd2luZG93W3RoaXMuYXBpTmFtZV07XG5cbiAgICAgICAgdGhpcy5zeXN0ZW1JbmZvID0gdGhpcy5hcGkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBcIlxcbuaJi+acuuWei+WPt1wiLCB0aGlzLnN5c3RlbUluZm8ubW9kZWwsXG4gICAgICAgICAgICBcIlxcbuezu+e7n1wiLCB0aGlzLnN5c3RlbUluZm8uc3lzdGVtLFxuICAgICAgICAgICAgXCJcXG7lvq7kv6HniYjmnKxcIiwgdGhpcy5zeXN0ZW1JbmZvLnZlcnNpb24sXG4gICAgICAgICAgICBcIlxcbuivreiogFwiLCB0aGlzLnN5c3RlbUluZm8ubGFuZ3VhZ2UsXG4gICAgICAgICAgICBcIlxcbuaJi+acuuWTgeeJjFwiLCB0aGlzLnN5c3RlbUluZm8uYnJhbmQsXG4gICAgICAgICAgICBcIlxcbuWuouaIt+err+W5s+WPsFwiLCB0aGlzLnN5c3RlbUluZm8ucGxhdGZvcm0sXG4gICAgICAgICAgICBcIlxcbuWuouaIt+err+WfuuehgOW6k+eJiOacrFwiLCB0aGlzLnN5c3RlbUluZm8uU0RLVmVyc2lvblxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRoaXMuYXBpLm9uU2hhcmVBcHBNZXNzYWdlKCgpID0+ICh7fSkpO1xuICAgICAgICB0aGlzLmFwaS5zaG93U2hhcmVNZW51KHsgd2l0aFNoYXJlVGlja2V0OiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop4bpopHlub/lkYpcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd1ZpZGVvKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBxdWl0PzogRnVuY3Rpb24sIGZhaWw/OiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgdmlkZW9JZCA9IHRoaXMuZ2V0VmlkZW9BZFVuaXRJZCgpO1xuICAgICAgICBpZiAoIXZpZGVvSWQpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXdhcmRlZFZpZGVvQWQgPSB0aGlzLmFwaS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoeyBhZFVuaXRJZDogdmlkZW9JZCB9KTtcbiAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9uTG9hZCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuWKoOi9veaIkOWKnycpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9uRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5ouJ5Y+W5aSx6LSlJywgZXJyKTtcbiAgICAgICAgICAgIGZhaWwgJiYgZmFpbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9uQ2xvc2UocmVzID0+IHtcbiAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZMb2FkKCk7XG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQub2ZmRXJyb3IoKTtcbiAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZDbG9zZSgpO1xuICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkID0gbnVsbDtcbiAgICAgICAgICAgIC8vIOWwj+S6jiAyLjEuMCDnmoTln7rnoYDlupPniYjmnKzvvIxyZXMg5piv5LiA5LiqIHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8v6KeG6aKR5q2j5bi45pKt5pS+57uT5p2fXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+inhumikeaSreaUvuS4remAlOmAgOWHulxuICAgICAgICAgICAgICAgIHF1aXQgJiYgcXVpdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL+W8gOWni+WKoOi9veinhumikeW5v+WRilxuICAgICAgICByZXdhcmRlZFZpZGVvQWQubG9hZCgpLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLnNob3coKS5jYXRjaChcbiAgICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHlub/lkYrmkq3mlL7lpLHotKUnLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9mZkxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9mZkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZShcIuinhumikeWKoOi9veWksei0pe+8jOivt+eojeWQjuWGjeivlX5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL+W9k+WJjeW5v+WRiuOAglxuICAgIHByaXZhdGUgX2Jhbm5lckFkOiBhbnk7XG4gICAgLyoqXG4gICAgICog5omT5byAYmFubmVyXG4gICAgICovXG4gICAgcHVibGljIHNob3dCYW5uZXIoKSB7XG4gICAgICAgIGxldCBiYW5uZXJJZCA9IHRoaXMuZ2V0QmFubmVySWQoKTtcbiAgICAgICAgaWYgKCFiYW5uZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmICghR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5iYW5uZXIpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiQmFubmVy5bm/5ZGK5byA5YWz5pyq5omT5byA5oiW5Y+C5pWw5pyq5aGr5YaZXCIpO1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMucmVtb3ZlQmFubmVyKCk7XG5cbiAgICAgICAgdGhpcy5fYmFubmVyQWQgPSB0aGlzLmFwaS5jcmVhdGVCYW5uZXJBZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogYmFubmVySWQsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnN5c3RlbUluZm8uc2NyZWVuSGVpZ2h0IC0gMTMwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnN5c3RlbUluZm8uc2NyZWVuV2lkdGggKyA1MCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uTG9hZCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaLieWPluaIkOWKn1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5ouJ5Y+W5aSx6LSlXCIsIGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9iYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7IGNvbnNvbGUubG9nKFwi5pi+56S65bm/5ZGKXCIpIH0pO1xuXG4gICAgICAgIC8vIHRoaXMuX2Jhbm5lckFkLm9uUmVzaXplKHJlcyA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS50b3AgPSB0aGlzLnN5c3RlbUluZm8uc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodDtcbiAgICAgICAgLy8gICAgIHRoaXMuX2Jhbm5lckFkLnN0eWxlLndpZHRoID0gdGhpcy5zeXN0ZW1JbmZvLnNjcmVlbldpZHRoICsgNTA7XG4gICAgICAgIC8vICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNES0V2ZW50LmJhbm5lclJlc2l6ZSwgcmVzLmhlaWdodCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICBpZiAodGhpcy5zeXN0ZW1JbmZvLnBsYXRmb3JtID09IFwiaW9zXCIgJiYgY2MudmlzaWJsZVJlY3RbXCJoZWlnaHRcIl0gLyBjYy52aXNpYmxlUmVjdFtcIndpZHRoXCJdID49IDIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Iu55p6c5YiY5rW35bGP5omL5py66LCD55SoYmFubmVyXCIpO1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQub25SZXNpemUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS50b3AgPSB0aGlzLnN5c3RlbUluZm8uc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodCAtIDIwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLnN0eWxlLndpZHRoID0gdGhpcy5zeXN0ZW1JbmZvLnNjcmVlbldpZHRoICsgNTA7XG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnRUeXBlLlNES0V2ZW50LmJhbm5lclJlc2l6ZSwgcmVzLmhlaWdodCArIDIwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQub25SZXNpemUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS50b3AgPSB0aGlzLnN5c3RlbUluZm8uc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS53aWR0aCA9IHRoaXMuc3lzdGVtSW5mby5zY3JlZW5XaWR0aCArIDUwO1xuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KEV2ZW50VHlwZS5TREtFdmVudC5iYW5uZXJSZXNpemUsIHJlcy5oZWlnaHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhbm5lckFkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXreW5v+WRilxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVCYW5uZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQub2ZmTG9hZCgpO1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQub2ZmRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9mZlJlc2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuZGVzdHJveSgpOyAvL+imgeWFiOaKiuaXp+eahOW5v+WRiue7memUgOavge+8jOS4jeeEtuS8muWvvOiHtOWFtuebkeWQrOeahOaXtumXtOaXoOazlemHiuaUvu+8jOW9seWTjeaAp+iDvVxuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/mj5LlsY/lub/lkYpcbiAgICBwdWJsaWMgc2hvd0ludGVyc3RpdGlhbEFkKCkge1xuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcuaW50ZXJzdGl0aWFsIHx8IEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcuSW50ZXJzdGl0aWFsQWRVbml0SWRbMF0gPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o+S5bGP5bm/5ZGK5byA5YWz5pyq5omT5byA5oiW5Y+C5pWw5pyq5aGr5YaZXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmVyc2lvbiA9IHRoaXMuc3lzdGVtSW5mby5TREtWZXJzaW9uO1xuICAgICAgICBpZiAodGhpcy5jb21wYXJlVmVyc2lvbih2ZXJzaW9uLCAnMi42LjAnKSA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgaW50ZXJhZCA9IHRoaXMuYXBpLmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5JbnRlcnN0aXRpYWxBZFVuaXRJZFswXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGludGVyYWQub25Mb2FkKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGK5Yqg6L295oiQ5YqfJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpbnRlcmFkLnNob3coKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pi+56S65o+S5bGP5bm/5ZGKJywgcmVzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGludGVyYWQub25DbG9zZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+ebkeWQrOaPkuWxj+W5v+WRiuWFs+mXreS6i+S7ticpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaW50ZXJhZC5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55uR5ZCs5o+S5bGP6ZSZ6K+v5LqL5Lu2JywgcmVzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfln7rnoYDlupPniYjmnKzov4fkvY4nKVxuICAgICAgICAgICAgLy8gICAvLyDlpoLmnpzluIzmnJvnlKjmiLflnKjmnIDmlrDniYjmnKznmoTlrqLmiLfnq6/kuIrkvZPpqozmgqjnmoTlsI/nqIvluo/vvIzlj6/ku6Xov5nmoLflrZDmj5DnpLpcbiAgICAgICAgICAgIC8vICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIC8vICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAvLyAgICAgY29udGVudDogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqOaPkuWxj+W5v+WRiu+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreWfuuehgOW6k+eJiOacrOWPt1xuICAgICAqL1xuICAgIHByaXZhdGUgY29tcGFyZVZlcnNpb24odjEsIHYyKSB7XG4gICAgICAgIHYxID0gdjEuc3BsaXQoJy4nKVxuICAgICAgICB2MiA9IHYyLnNwbGl0KCcuJylcbiAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgodjEubGVuZ3RoLCB2Mi5sZW5ndGgpXG4gICAgICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHsgdjEucHVzaCgnMCcpIH1cbiAgICAgICAgd2hpbGUgKHYyLmxlbmd0aCA8IGxlbikgeyB2Mi5wdXNoKCcwJykgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXG4gICAgICAgICAgICBjb25zdCBudW0yID0gcGFyc2VJbnQodjJbaV0pXG4gICAgICAgICAgICBpZiAobnVtMSA+IG51bTIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgfSBlbHNlIGlmIChudW0xIDwgbnVtMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55+t6ZyH5YqoXG4gICAgICovXG4gICAgcHVibGljIHZpYnJhdGVTaG9ydCgpIHtcbiAgICAgICAgaWYgKEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlicmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hcGkudmlicmF0ZVNob3J0KHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmVv+mch+WKqFxuICAgICAqL1xuICAgIHB1YmxpYyB2aWJyYXRlTG9uZygpIHtcbiAgICAgICAgaWYgKEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlicmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hcGkudmlicmF0ZUxvbmcoe30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5peg5r+A5Yqx5YiG5LqrJibluKblj4LliIbkuqtcbiAgICAgKi9cbiAgICBzaGFyZUFwcE1lc3NhZ2UocXVlcnk6IHN0cmluZyA9IFwiXCIpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogdGhpcy5zaGFyZVRpdGxlQXJyLmxlbmd0aCkpO1xuICAgICAgICBsZXQgaW5kZXhpbWc6IG51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNoYXJlSW1nQXJyLmxlbmd0aCkpO1xuICAgICAgICB0aGlzLmFwaS5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdGl0bGU6IGAke3RoaXMuc2hhcmVUaXRsZUFycltpbmRleF19YCxcbiAgICAgICAgICAgIGltYWdlVXJsOiBgJHt0aGlzLnNoYXJlSW1nQXJyW2luZGV4aW1nXX1gLFxuICAgICAgICAgICAgcXVlcnk6IGAke3F1ZXJ5fWAsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa/gOWKseWIhuS6qyYm5bim5Y+C5YiG5LqrXG4gICAgICovXG4gICAgc2hhcmVUb0FueU9uZShzdWNjZXNzOiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uLCBxdWVyeTogc3RyaW5nID0gJycpIHtcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnNoYXJlKSB7XG4gICAgICAgICAgICBzdWNjZXNzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGFyZUFwcE1lc3NhZ2UocXVlcnkpO1xuICAgICAgICBzdWNjZXNzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5raI5oGv5o+Q56S6XG4gICAgICovXG4gICAgcHVibGljIHNob3dNZXNzYWdlKG1zZzogc3RyaW5nLCBpY29uOiBzdHJpbmcgPSAnbm9uZScpIHtcbiAgICAgICAgLy8gdGhpcy5hcGkuc2hvd1RvYXN0KHtcbiAgICAgICAgLy8gICAgIHRpdGxlOiBtc2csXG4gICAgICAgIC8vICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgLy8gICAgIGljb246IGljb24sXG4gICAgICAgIC8vICAgICBzdWNjZXNzOiAocmVzKSA9PiB7IH1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KEV2ZW50VHlwZS5VSUV2ZW50LnNob3dUaXAsIG1zZyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5hcGkubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcbiAgICAgICAgICAgIGFwcElkOiBkYXRhLmdhbWVJZCxcbiAgICAgICAgfSlcbiAgICB9XG59XG4iXX0=