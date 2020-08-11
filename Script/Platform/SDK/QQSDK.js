
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/SDK/QQSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'be33ek3jKVEkpvmGRQy/fe8', 'QQSDK');
// myGame/Script/Platform/SDK/QQSDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SDK_1 = require("./SDK");
var GamePlatform_1 = require("../GamePlatform");
var QQSDK = /** @class */ (function (_super) {
    __extends(QQSDK, _super);
    function QQSDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiName = 'qq';
        return _this;
    }
    QQSDK.prototype.init = function () {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log("\n手机型号", this.systemInfo.model, "\n系统", this.systemInfo.system, "\n微信版本", this.systemInfo.version, "\n语言", this.systemInfo.language, "\n手机品牌", this.systemInfo.brand, "\n客户端平台", this.systemInfo.platform, "\n客户端基础库版本", this.systemInfo.SDKVersion);
    };
    /**
     * 视频广告
     */
    QQSDK.prototype.showVideo = function (success, quit, fail) {
        if (!GamePlatform_1.default.instance.Config.video || GamePlatform_1.default.instance.Config.videoAdUnitId[0] == '') {
            console.log("广告开关未打开或参数未填写");
            success();
            return;
        }
        var rewardedVideoAd = this.api.createRewardedVideoAd({ adUnitId: GamePlatform_1.default.instance.Config.videoAdUnitId[0] }); //不支持在开发工具运行，只能在真机运行 返回值是个单例
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
                fail && fail();
            });
        });
    };
    /**
     * 打开banner
     */
    QQSDK.prototype.showBanner = function () {
        var _this = this;
        if (!GamePlatform_1.default.instance.Config.banner || GamePlatform_1.default.instance.Config.BannerAdUnitId[0] == '') {
            console.log("Banner广告开关未打开或参数未填写");
            return;
        }
        this.removeBanner();
        //banner默认隐藏，调用show方法显示
        this._bannerAd = this.api.createBannerAd({
            adUnitId: GamePlatform_1.default.instance.Config.BannerAdUnitId[0],
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
        this._bannerAd.onResize(function (res) {
            _this._bannerAd.style.top = _this.systemInfo.screenHeight - res.height;
            _this._bannerAd.style.width = _this.systemInfo.screenWidth + 50;
        });
        return this._bannerAd;
    };
    /**
     * 关闭广告
     */
    QQSDK.prototype.removeBanner = function () {
        if (this._bannerAd) {
            this._bannerAd.offLoad();
            this._bannerAd.offError();
            this._bannerAd.offResize();
            this._bannerAd.destroy(); //要先把旧的广告给销毁，不然会导致其监听的时间无法释放，影响性能
            this._bannerAd = null;
        }
    };
    /**
     * 插屏广告
     */
    QQSDK.prototype.showInterstitialAd = function () {
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
    QQSDK.prototype.compareVersion = function (v1, v2) {
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
    QQSDK.prototype.vibrateShort = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateShort({});
        }
    };
    /**
     * 长震动
     */
    QQSDK.prototype.vibrateLong = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateLong({});
        }
    };
    /**
     * 无激励分享&&带参分享
     */
    QQSDK.prototype.shareAppMessage = function (query) {
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
    QQSDK.prototype.shareToAnyOne = function (success, fail, query) {
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
    QQSDK.prototype.showMessage = function (msg, icon) {
        if (icon === void 0) { icon = 'none'; }
        this.api.showToast({
            title: msg,
            duration: 2000,
            icon: icon,
            success: function (res) { }
        });
    };
    return QQSDK;
}(SDK_1.default));
exports.default = QQSDK;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxTREtcXFFRU0RLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBd0I7QUFDeEIsZ0RBQTJDO0FBRTNDO0lBQW1DLHlCQUFHO0lBQXRDO1FBQUEscUVBb09DO1FBbk9XLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBbU9uQyxDQUFDO0lBak9VLG9CQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FDUCxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQy9CLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUNqQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUNuQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQzNDLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSSx5QkFBUyxHQUFoQixVQUFpQixPQUFpQixFQUFFLElBQWUsRUFBRSxJQUFlO1FBQ2hFLElBQUksQ0FBQyxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLHNCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFD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cUI7UUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDZixLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsVUFBQyxHQUFHLElBQU8sQ0FBQztTQUN4QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsWUFBQztBQUFELENBcE9BLEFBb09DLENBcE9rQyxhQUFHLEdBb09yQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTREsgZnJvbSBcIi4vU0RLXCI7XG5pbXBvcnQgR2FtZVBsYXRmb3JtIGZyb20gXCIuLi9HYW1lUGxhdGZvcm1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUVFTREsgZXh0ZW5kcyBTREsge1xuICAgIHByaXZhdGUgYXBpTmFtZTogc3RyaW5nID0gJ3FxJztcblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmFwaSA9IHdpbmRvd1t0aGlzLmFwaU5hbWVdO1xuXG4gICAgICAgIHRoaXMuc3lzdGVtSW5mbyA9IHRoaXMuYXBpLmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCJcXG7miYvmnLrlnovlj7dcIiwgdGhpcy5zeXN0ZW1JbmZvLm1vZGVsLFxuICAgICAgICAgICAgXCJcXG7ns7vnu59cIiwgdGhpcy5zeXN0ZW1JbmZvLnN5c3RlbSxcbiAgICAgICAgICAgIFwiXFxu5b6u5L+h54mI5pysXCIsIHRoaXMuc3lzdGVtSW5mby52ZXJzaW9uLFxuICAgICAgICAgICAgXCJcXG7or63oqIBcIiwgdGhpcy5zeXN0ZW1JbmZvLmxhbmd1YWdlLFxuICAgICAgICAgICAgXCJcXG7miYvmnLrlk4HniYxcIiwgdGhpcy5zeXN0ZW1JbmZvLmJyYW5kLFxuICAgICAgICAgICAgXCJcXG7lrqLmiLfnq6/lubPlj7BcIiwgdGhpcy5zeXN0ZW1JbmZvLnBsYXRmb3JtLFxuICAgICAgICAgICAgXCJcXG7lrqLmiLfnq6/ln7rnoYDlupPniYjmnKxcIiwgdGhpcy5zeXN0ZW1JbmZvLlNES1ZlcnNpb25cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop4bpopHlub/lkYpcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd1ZpZGVvKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBxdWl0PzogRnVuY3Rpb24sIGZhaWw/OiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW8gfHwgR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWRlb0FkVW5pdElkWzBdID09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuW8gOWFs+acquaJk+W8gOaIluWPguaVsOacquWhq+WGmVwiKTtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXdhcmRlZFZpZGVvQWQgPSB0aGlzLmFwaS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoeyBhZFVuaXRJZDogR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWRlb0FkVW5pdElkWzBdIH0pIC8v5LiN5pSv5oyB5Zyo5byA5Y+R5bel5YW36L+Q6KGM77yM5Y+q6IO95Zyo55yf5py66L+Q6KGMIOi/lOWbnuWAvOaYr+S4quWNleS+i1xuICAgICAgICByZXdhcmRlZFZpZGVvQWQub25Mb2FkKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295oiQ5YqfJyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXdhcmRlZFZpZGVvQWQub25FcnJvcihlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrmi4nlj5blpLHotKUnLCBlcnIpO1xuICAgICAgICAgICAgZmFpbCAmJiBmYWlsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXdhcmRlZFZpZGVvQWQub25DbG9zZShyZXMgPT4ge1xuICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9mZkxvYWQoKTtcbiAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZFcnJvcigpO1xuICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9mZkNsb3NlKCk7XG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQgPSBudWxsO1xuICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy/op4bpopHmraPluLjmkq3mlL7nu5PmnZ9cbiAgICAgICAgICAgICAgICBzdWNjZXNzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v6KeG6aKR5pKt5pS+5Lit6YCU6YCA5Ye6XG4gICAgICAgICAgICAgICAgcXVpdCAmJiBxdWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8v5byA5aeL5Yqg6L296KeG6aKR5bm/5ZGKXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQuc2hvdygpLmNhdGNoKFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopHlub/lkYrmkq3mlL7lpLHotKUnLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQub2ZmTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQub2ZmRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9mZkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5b2T5YmN5bm/5ZGK44CCXG4gICAgcHJpdmF0ZSBfYmFubmVyQWQ6IGFueTtcbiAgICAvKipcbiAgICAgKiDmiZPlvIBiYW5uZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd0Jhbm5lcigpIHtcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLmJhbm5lciB8fCBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkJhbm5lckFkVW5pdElkWzBdID09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhbm5lcuW5v+WRiuW8gOWFs+acquaJk+W8gOaIluWPguaVsOacquWhq+WGmVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUJhbm5lcigpO1xuXG4gICAgICAgIC8vYmFubmVy6buY6K6k6ZqQ6JeP77yM6LCD55Soc2hvd+aWueazleaYvuekulxuICAgICAgICB0aGlzLl9iYW5uZXJBZCA9IHRoaXMuYXBpLmNyZWF0ZUJhbm5lckFkKHtcbiAgICAgICAgICAgIGFkVW5pdElkOiBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkJhbm5lckFkVW5pdElkWzBdLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5zeXN0ZW1JbmZvLnNjcmVlbkhlaWdodCAtIDEzMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zeXN0ZW1JbmZvLnNjcmVlbldpZHRoICsgNTAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uTG9hZCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaLieWPluaIkOWKn1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5ouJ5Y+W5aSx6LSlXCIsIGVycik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLnNob3coKS50aGVuKCgpID0+IHsgY29uc29sZS5sb2coXCLmmL7npLrlub/lkYpcIikgfSk7XG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uUmVzaXplKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS50b3AgPSB0aGlzLnN5c3RlbUluZm8uc2NyZWVuSGVpZ2h0IC0gcmVzLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLnN0eWxlLndpZHRoID0gdGhpcy5zeXN0ZW1JbmZvLnNjcmVlbldpZHRoICsgNTA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9iYW5uZXJBZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lub/lkYpcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlQmFubmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fYmFubmVyQWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9mZkxvYWQoKTtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9mZkVycm9yKCk7XG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vZmZSZXNpemUoKTtcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLmRlc3Ryb3koKTsgLy/opoHlhYjmiorml6fnmoTlub/lkYrnu5nplIDmr4HvvIzkuI3nhLbkvJrlr7zoh7Tlhbbnm5HlkKznmoTml7bpl7Tml6Dms5Xph4rmlL7vvIzlvbHlk43mgKfog71cbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaPkuWxj+W5v+WRilxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93SW50ZXJzdGl0aWFsQWQoKSB7XG4gICAgICAgIGlmICghR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5pbnRlcnN0aXRpYWwgfHwgR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5JbnRlcnN0aXRpYWxBZFVuaXRJZFswXSA9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrlvIDlhbPmnKrmiZPlvIDmiJblj4LmlbDmnKrloavlhplcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gdGhpcy5zeXN0ZW1JbmZvLlNES1ZlcnNpb247XG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmVWZXJzaW9uKHZlcnNpb24sICcyLjYuMCcpID49IDApIHtcbiAgICAgICAgICAgIGxldCBpbnRlcmFkID0gdGhpcy5hcGkuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xuICAgICAgICAgICAgICAgIGFkVW5pdElkOiBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkludGVyc3RpdGlhbEFkVW5pdElkWzBdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaW50ZXJhZC5vbkxvYWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmj5LlsY/lub/lkYrliqDovb3miJDlip8nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGludGVyYWQuc2hvdygpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmmL7npLrmj5LlsY/lub/lkYonLCByZXMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaW50ZXJhZC5vbkNsb3NlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55uR5ZCs5o+S5bGP5bm/5ZGK5YWz6Zet5LqL5Lu2JylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpbnRlcmFkLm9uRXJyb3IoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnm5HlkKzmj5LlsY/plJnor6/kuovku7YnLCByZXMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WfuuehgOW6k+eJiOacrOi/h+S9jicpXG4gICAgICAgICAgICAvLyAgIC8vIOWmguaenOW4jOacm+eUqOaIt+WcqOacgOaWsOeJiOacrOeahOWuouaIt+err+S4iuS9k+mqjOaCqOeahOWwj+eoi+W6j++8jOWPr+S7pei/meagt+WtkOaPkOekulxuICAgICAgICAgICAgLy8gICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgLy8gICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIC8vICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So5o+S5bGP5bm/5ZGK77yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgICAgICAgICAgLy8gICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yik5pat5Z+656GA5bqT54mI5pys5Y+3XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21wYXJlVmVyc2lvbih2MSwgdjIpIHtcbiAgICAgICAgdjEgPSB2MS5zcGxpdCgnLicpXG4gICAgICAgIHYyID0gdjIuc3BsaXQoJy4nKVxuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcbiAgICAgICAgd2hpbGUgKHYxLmxlbmd0aCA8IGxlbikgeyB2MS5wdXNoKCcwJykgfVxuICAgICAgICB3aGlsZSAodjIubGVuZ3RoIDwgbGVuKSB7IHYyLnB1c2goJzAnKSB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG51bTEgPSBwYXJzZUludCh2MVtpXSlcbiAgICAgICAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSlcbiAgICAgICAgICAgIGlmIChudW0xID4gbnVtMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bTEgPCBudW0yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnn63pnIfliqhcbiAgICAgKi9cbiAgICBwdWJsaWMgdmlicmF0ZVNob3J0KCkge1xuICAgICAgICBpZiAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWJyYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS52aWJyYXRlU2hvcnQoe30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6ZW/6ZyH5YqoXG4gICAgICovXG4gICAgcHVibGljIHZpYnJhdGVMb25nKCkge1xuICAgICAgICBpZiAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWJyYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS52aWJyYXRlTG9uZyh7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDml6Dmv4DlirHliIbkuqsmJuW4puWPguWIhuS6q1xuICAgICAqL1xuICAgIHNoYXJlQXBwTWVzc2FnZShxdWVyeTogc3RyaW5nID0gXCJcIikge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNoYXJlVGl0bGVBcnIubGVuZ3RoKSk7XG4gICAgICAgIGxldCBpbmRleGltZzogbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2hhcmVJbWdBcnIubGVuZ3RoKSk7XG4gICAgICAgIHRoaXMuYXBpLnNoYXJlQXBwTWVzc2FnZSh7XG4gICAgICAgICAgICB0aXRsZTogYCR7dGhpcy5zaGFyZVRpdGxlQXJyW2luZGV4XX1gLFxuICAgICAgICAgICAgaW1hZ2VVcmw6IGAke3RoaXMuc2hhcmVJbWdBcnJbaW5kZXhpbWddfWAsXG4gICAgICAgICAgICBxdWVyeTogYCR7cXVlcnl9YCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5r+A5Yqx5YiG5LqrJibluKblj4LliIbkuqtcbiAgICAgKi9cbiAgICBzaGFyZVRvQW55T25lKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24sIHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcuc2hhcmUpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlQXBwTWVzc2FnZShxdWVyeSk7XG4gICAgICAgIHN1Y2Nlc3MoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtojmga/mj5DnpLpcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd01lc3NhZ2UobXNnOiBzdHJpbmcsIGljb246IHN0cmluZyA9ICdub25lJykge1xuICAgICAgICB0aGlzLmFwaS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6IG1zZyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgICAgICAgICAgaWNvbjogaWNvbixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHsgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=