
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/SDK/OPPOSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f86daLTQK9G+InHTGaPbfbl', 'OPPOSDK');
// myGame/Script/Platform/SDK/OPPOSDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SDK_1 = require("./SDK");
var GamePlatform_1 = require("../GamePlatform");
var EventManager_1 = require("../../Common/EventManager");
var GameEventType_1 = require("../../GameSpecial/GameEventType");
var OPPOSDK = /** @class */ (function (_super) {
    __extends(OPPOSDK, _super);
    function OPPOSDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiName = 'qg';
        return _this;
    }
    /**
     * 初始化
     */
    OPPOSDK.prototype.init = function () {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        //初始化信息
        var self = this;
        // this.api.setLoadingProgress({
        //     progress: 0
        // });
        this.api.setEnableDebug({
            enableDebug: false,
            // enableDebug: true, // true 为打开，false 为关闭
            success: function () {
                console.log('oppo信息', JSON.stringify(self.systemInfo));
            },
            complete: function () {
            },
            fail: function () {
            }
        });
        // 初始化广告。
        // if (GamePlatform.instance.Config.video || GamePlatform.instance.Config.videoAdUnitId[0] != '') {
        //     this.api.initAdService({
        //         appId: GamePlatform.instance.Config.videoAdUnitId[0],
        //         isDebug: true,
        //         success: function (res) {
        //             console.log("初始化广告success");
        //         },
        //         fail: function (res) {
        //             console.log("初始化广告fail:" + res.code + res.msg);
        //         },
        //         complete: function (res) {
        //             console.log("complete");
        //         }
        //     })
        // }
    };
    /**
     * 视频广告
     */
    OPPOSDK.prototype.showVideo = function (success, quit, fail) {
        var _this = this;
        if (!GamePlatform_1.default.instance.Config.video || GamePlatform_1.default.instance.Config.videoAdUnitId[0] == '') {
            console.log("广告开关未打开或参数未填写");
            success();
            return;
        }
        if (this.systemInfo.platformVersion < 1040) {
            console.log('平台版本过低');
            success();
            return;
        }
        var self = this;
        if (this.videoAd) {
            this.videoAd.destroy();
        }
        this.videoAd = this.api.createRewardedVideoAd({
            posId: GamePlatform_1.default.instance.Config.videoAdUnitId[0]
        });
        this.videoAd.load();
        this.videoAd.onLoad(function () {
            console.log("激励视频加载成功");
            _this.videoAd.show();
        });
        this.videoAd.onVideoStart(function () {
            console.log("激励视频 开始播放");
        });
        this.videoAd.onClose(function (res) {
            if (res.isEnded) {
                console.log('激励视频广告完成，发放奖励');
                success();
            }
            else {
                console.log('激励视频广告取消关闭，不发放奖励');
                quit && quit();
            }
        });
        this.videoAd.onError(function (err) {
            console.log('视频加载回调错误信息', JSON.stringify(err));
            if (err.code == '10003') {
                self.showMessage('请使用v2.6.0版本调试器测试~');
                fail && fail();
            }
            else {
                self.showMessage('视频资源请求中,请稍后再试~');
                fail && fail();
            }
        });
    };
    /**
     * 打开banner广告
     */
    OPPOSDK.prototype.showBanner = function () {
        if (!GamePlatform_1.default.instance.Config.banner || GamePlatform_1.default.instance.Config.BannerAdUnitId[0] == '') {
            console.log("Banner广告开关未打开或参数未填写");
            return;
        }
        if (this.systemInfo.platformVersion < '1031') {
            console.log('平台版本过低');
            return;
        }
        this.removeBanner();
        this._bannerAd = this.api.createBannerAd({
            posId: GamePlatform_1.default.instance.Config.BannerAdUnitId[0]
        });
        this._bannerAd.show();
        this._bannerAd.onShow(function () {
            console.log("banner 广告显示成功");
        });
        this._bannerAd.onError(function (err) {
            console.log('广告显示失败回调', JSON.stringify(err));
        });
        this._bannerAd.onHide(function () {
            console.log("banner 广告隐藏");
        });
        return this._bannerAd;
    };
    /**
     * 关闭banner广告
     */
    OPPOSDK.prototype.removeBanner = function () {
        if (this._bannerAd) {
            this._bannerAd.hide();
        }
    };
    //插屏广告
    OPPOSDK.prototype.showInterstitialAd = function () {
        if (!GamePlatform_1.default.instance.Config.interstitial || GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0] == '') {
            console.log("插屏广告开关未打开或参数未填写");
            return;
        }
        if (this.systemInfo.platformVersion < 1031) {
            console.log('平台版本过低');
            return;
        }
        console.log('显示插屏广告');
        var insertAd = this.api.createInsertAd({
            posId: GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0]
        });
        insertAd.load();
        insertAd.onLoad(function () {
            console.log("插屏广告加载");
            insertAd.show();
        });
        insertAd.onShow(function () {
            console.log("插屏广告展示");
        });
        insertAd.onError(function (err) {
            console.log('插屏广告错误', JSON.stringify(err));
        });
    };
    /**
     * 短震动
     */
    OPPOSDK.prototype.vibrateShort = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateShort({});
        }
    };
    /**
     * 长震动
     */
    OPPOSDK.prototype.vibrateLong = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateLong({});
        }
    };
    /**
     * 无激励分享&&带参分享
     */
    OPPOSDK.prototype.shareAppMessage = function (query) {
        if (query === void 0) { query = ''; }
    };
    /**
     * 激励分享&&带参分享
     */
    OPPOSDK.prototype.shareToAnyOne = function (success, fail, query) {
        if (query === void 0) { query = ''; }
    };
    /**
     * 消息提示
     */
    OPPOSDK.prototype.showMessage = function (msg, icon) {
        if (icon === void 0) { icon = 'none'; }
        // this.api.showToast({
        //     title: msg,
        //     duration: 2000,
        //     icon: icon,
        //     success: (res) => { }
        // });
        EventManager_1.default.emit(GameEventType_1.EventType.UIEvent.showTip, msg);
    };
    OPPOSDK.prototype.navigateToMiniProgram = function (data) {
        if (this.systemInfo.platformVersion < '1050') {
            console.log('平台版本过低');
            return;
        }
        this.api.navigateToMiniGame({
            pkgName: data.gameId,
        });
    };
    return OPPOSDK;
}(SDK_1.default));
exports.default = OPPOSDK;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxTREtcXE9QUE9TREsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUF3QjtBQUN4QixnREFBMkM7QUFDM0MsMERBQXFEO0FBQ3JELGlFQUE0RDtBQUU1RDtJQUFxQywyQkFBRztJQUF4QztRQUFBLHFFQTROQztRQTNOVyxhQUFPLEdBQVcsSUFBSSxDQUFDOztJQTJObkMsQ0FBQztJQXpORzs7T0FFRztJQUNJLHNCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFL0MsT0FBTztRQUNQLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixnQ0FBZ0M7UUFDaEMsa0JBQWtCO1FBQ2xCLE1BQU07UUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztZQUNwQixXQUFXLEVBQUUsS0FBSztZQUNsQiwyQ0FBMkM7WUFDM0MsT0FBTyxFQUFFO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7WUFDMUQsQ0FBQztZQUNELFFBQVEsRUFBRTtZQUNWLENBQUM7WUFDRCxJQUFJLEVBQUU7WUFDTixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsU0FBUztRQUNULG1HQUFtRztRQUNuRywrQkFBK0I7UUFDL0IsZ0VBQWdFO1FBQ2hFLHlCQUF5QjtRQUN6QixvQ0FBb0M7UUFDcEMsMkNBQTJDO1FBQzNDLGFBQWE7UUFDYixpQ0FBaUM7UUFDakMsOERBQThEO1FBQzlELGFBQWE7UUFDYixxQ0FBcUM7UUFDckMsdUNBQXVDO1FBQ3ZDLFlBQVk7UUFDWixTQUFTO1FB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SSw2QkFBVyxHQUFsQjtRQUNJLElBQUksc0JBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFlLEdBQXRCLFVBQXVCLEtBQWtCO1FBQWxCLHNCQUFBLEVBQUEsVUFBa0I7SUFFekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksK0JBQWEsR0FBcEIsVUFBcUIsT0FBaUIsRUFBRSxJQUFlLEVBQUUsS0FBa0I7UUFBbEIsc0JBQUEsRUFBQSxVQUFrQjtJQUUzRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBVyxHQUFsQixVQUFtQixHQUFXLEVBQUUsSUFBcUI7UUFBckIscUJBQUEsRUFBQSxhQUFxQjtRQUNqRCx1QkFBdUI7UUFDdkIsa0JBQWtCO1FBQ2xCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsNEJBQTRCO1FBQzVCLE1BQU07UUFDTixzQkFBWSxDQUFDLElBQUksQ0FBQyx5QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLHVDQUFxQixHQUE1QixVQUE2QixJQUFTO1FBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsTUFBTSxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztZQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdkIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNMLGNBQUM7QUFBRCxDQTVOQSxBQTROQyxDQTVOb0MsYUFBRyxHQTROdkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLIGZyb20gXCIuL1NES1wiO1xuaW1wb3J0IEdhbWVQbGF0Zm9ybSBmcm9tIFwiLi4vR2FtZVBsYXRmb3JtXCI7XG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gXCIuLi8uLi9Db21tb24vRXZlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPUFBPU0RLIGV4dGVuZHMgU0RLIHtcbiAgICBwcml2YXRlIGFwaU5hbWU6IHN0cmluZyA9ICdxZyc7XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5hcGkgPSB3aW5kb3dbdGhpcy5hcGlOYW1lXTtcbiAgICAgICAgdGhpcy5zeXN0ZW1JbmZvID0gdGhpcy5hcGkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcblxuICAgICAgICAvL+WIneWni+WMluS/oeaBr1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIHRoaXMuYXBpLnNldExvYWRpbmdQcm9ncmVzcyh7XG4gICAgICAgIC8vICAgICBwcm9ncmVzczogMFxuICAgICAgICAvLyB9KTtcbiAgICAgICAgdGhpcy5hcGkuc2V0RW5hYmxlRGVidWcoe1xuICAgICAgICAgICAgZW5hYmxlRGVidWc6IGZhbHNlLCAvLyB0cnVlIOS4uuaJk+W8gO+8jGZhbHNlIOS4uuWFs+mXrVxuICAgICAgICAgICAgLy8gZW5hYmxlRGVidWc6IHRydWUsIC8vIHRydWUg5Li65omT5byA77yMZmFsc2Ug5Li65YWz6ZetXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29wcG/kv6Hmga8nLCBKU09OLnN0cmluZ2lmeShzZWxmLnN5c3RlbUluZm8pKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8g5Yid5aeL5YyW5bm/5ZGK44CCXG4gICAgICAgIC8vIGlmIChHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnZpZGVvIHx8IEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW9BZFVuaXRJZFswXSAhPSAnJykge1xuICAgICAgICAvLyAgICAgdGhpcy5hcGkuaW5pdEFkU2VydmljZSh7XG4gICAgICAgIC8vICAgICAgICAgYXBwSWQ6IEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW9BZFVuaXRJZFswXSxcbiAgICAgICAgLy8gICAgICAgICBpc0RlYnVnOiB0cnVlLFxuICAgICAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCLliJ3lp4vljJblub/lkYpzdWNjZXNzXCIpO1xuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIneWni+WMluW5v+WRimZhaWw6XCIgKyByZXMuY29kZSArIHJlcy5tc2cpO1xuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KeG6aKR5bm/5ZGKXG4gICAgICovXG4gICAgcHVibGljIHNob3dWaWRlbyhzdWNjZXNzOiBGdW5jdGlvbiwgcXVpdD86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnZpZGVvIHx8IEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW9BZFVuaXRJZFswXSA9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrlvIDlhbPmnKrmiZPlvIDmiJblj4LmlbDmnKrloavlhplcIik7XG4gICAgICAgICAgICBzdWNjZXNzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtSW5mby5wbGF0Zm9ybVZlcnNpb24gPCAxMDQwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5bmz5Y+w54mI5pys6L+H5L2OJyk7XG4gICAgICAgICAgICBzdWNjZXNzKCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMudmlkZW9BZCkge1xuICAgICAgICAgICAgdGhpcy52aWRlb0FkLmRlc3Ryb3koKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlkZW9BZCA9IHRoaXMuYXBpLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XG4gICAgICAgICAgICBwb3NJZDogR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWRlb0FkVW5pdElkWzBdXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudmlkZW9BZC5sb2FkKClcbiAgICAgICAgdGhpcy52aWRlb0FkLm9uTG9hZCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIua/gOWKseinhumikeWKoOi9veaIkOWKn1wiKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9BZC5zaG93KCk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudmlkZW9BZC5vblZpZGVvU3RhcnQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmv4DlirHop4bpopEg5byA5aeL5pKt5pS+XCIpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnZpZGVvQWQub25DbG9zZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmlzRW5kZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKR5bm/5ZGK5a6M5oiQ77yM5Y+R5pS+5aWW5YqxJylcbiAgICAgICAgICAgICAgICBzdWNjZXNzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopHlub/lkYrlj5bmtojlhbPpl63vvIzkuI3lj5HmlL7lpZblirEnKVxuICAgICAgICAgICAgICAgIHF1aXQgJiYgcXVpdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnZpZGVvQWQub25FcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR5Yqg6L295Zue6LCD6ZSZ6K+v5L+h5oGvJywgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgICAgICBpZiAoZXJyLmNvZGUgPT0gJzEwMDAzJykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+ivt+S9v+eUqHYyLjYuMOeJiOacrOiwg+ivleWZqOa1i+ivlX4nKTtcbiAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn6KeG6aKR6LWE5rqQ6K+35rGC5LitLOivt+eojeWQjuWGjeivlX4nKTtcbiAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL+W9k+WJjWJhbm5lclxuICAgIHByaXZhdGUgX2Jhbm5lckFkOiBhbnk7XG4gICAgLyoqXG4gICAgICog5omT5byAYmFubmVy5bm/5ZGKXG4gICAgICovXG4gICAgcHVibGljIHNob3dCYW5uZXIoKSB7XG4gICAgICAgIGlmICghR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5iYW5uZXIgfHwgR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5CYW5uZXJBZFVuaXRJZFswXSA9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYW5uZXLlub/lkYrlvIDlhbPmnKrmiZPlvIDmiJblj4LmlbDmnKrloavlhplcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtSW5mby5wbGF0Zm9ybVZlcnNpb24gPCAnMTAzMScpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflubPlj7DniYjmnKzov4fkvY4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlQmFubmVyKCk7XG5cbiAgICAgICAgdGhpcy5fYmFubmVyQWQgPSB0aGlzLmFwaS5jcmVhdGVCYW5uZXJBZCh7XG4gICAgICAgICAgICBwb3NJZDogR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5CYW5uZXJBZFVuaXRJZFswXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYmFubmVyQWQuc2hvdygpXG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uU2hvdyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciDlub/lkYrmmL7npLrmiJDlip9cIik7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uRXJyb3IoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+W5v+WRiuaYvuekuuWksei0peWbnuiwgycsIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkhpZGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXIg5bm/5ZGK6ZqQ6JePXCIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9iYW5uZXJBZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61iYW5uZXLlub/lkYpcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlQmFubmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5o+S5bGP5bm/5ZGKXG4gICAgcHVibGljIHNob3dJbnRlcnN0aXRpYWxBZCgpIHtcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLmludGVyc3RpdGlhbCB8fCBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkludGVyc3RpdGlhbEFkVW5pdElkWzBdID09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuW8gOWFs+acquaJk+W8gOaIluWPguaVsOacquWhq+WGmVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN5c3RlbUluZm8ucGxhdGZvcm1WZXJzaW9uIDwgMTAzMSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+W5s+WPsOeJiOacrOi/h+S9jicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCfmmL7npLrmj5LlsY/lub/lkYonKVxuICAgICAgICB2YXIgaW5zZXJ0QWQgPSB0aGlzLmFwaS5jcmVhdGVJbnNlcnRBZCh7XG4gICAgICAgICAgICBwb3NJZDogR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5JbnRlcnN0aXRpYWxBZFVuaXRJZFswXVxuICAgICAgICB9KVxuICAgICAgICBpbnNlcnRBZC5sb2FkKClcbiAgICAgICAgaW5zZXJ0QWQub25Mb2FkKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o+S5bGP5bm/5ZGK5Yqg6L29XCIpO1xuICAgICAgICAgICAgaW5zZXJ0QWQuc2hvdygpXG4gICAgICAgIH0pXG4gICAgICAgIGluc2VydEFkLm9uU2hvdyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuWxleekulwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgaW5zZXJ0QWQub25FcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGK6ZSZ6K+vJywgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55+t6ZyH5YqoXG4gICAgICovXG4gICAgcHVibGljIHZpYnJhdGVTaG9ydCgpIHtcbiAgICAgICAgaWYgKEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlicmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hcGkudmlicmF0ZVNob3J0KHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmVv+mch+WKqFxuICAgICAqL1xuICAgIHB1YmxpYyB2aWJyYXRlTG9uZygpIHtcbiAgICAgICAgaWYgKEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlicmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hcGkudmlicmF0ZUxvbmcoe30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5peg5r+A5Yqx5YiG5LqrJibluKblj4LliIbkuqtcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hhcmVBcHBNZXNzYWdlKHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5r+A5Yqx5YiG5LqrJibluKblj4LliIbkuqtcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hhcmVUb0FueU9uZShzdWNjZXNzOiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uLCBxdWVyeTogc3RyaW5nID0gJycpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa2iOaBr+aPkOekulxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93TWVzc2FnZShtc2c6IHN0cmluZywgaWNvbjogc3RyaW5nID0gJ25vbmUnKSB7XG4gICAgICAgIC8vIHRoaXMuYXBpLnNob3dUb2FzdCh7XG4gICAgICAgIC8vICAgICB0aXRsZTogbXNnLFxuICAgICAgICAvLyAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICAgIC8vICAgICBpY29uOiBpY29uLFxuICAgICAgICAvLyAgICAgc3VjY2VzczogKHJlcykgPT4geyB9XG4gICAgICAgIC8vIH0pO1xuICAgICAgICBFdmVudE1hbmFnZXIuZW1pdChFdmVudFR5cGUuVUlFdmVudC5zaG93VGlwLCBtc2cpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuYXZpZ2F0ZVRvTWluaVByb2dyYW0oZGF0YTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnN5c3RlbUluZm8ucGxhdGZvcm1WZXJzaW9uIDwgJzEwNTAnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5bmz5Y+w54mI5pys6L+H5L2OJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcGkubmF2aWdhdGVUb01pbmlHYW1lKHtcbiAgICAgICAgICAgIHBrZ05hbWU6IGRhdGEuZ2FtZUlkLFxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==