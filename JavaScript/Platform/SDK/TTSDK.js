
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/SDK/TTSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd912aYxojVMKrjd+OBejaLh', 'TTSDK');
// myGame/Script/Platform/SDK/TTSDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SDK_1 = require("./SDK");
var GamePlatform_1 = require("../GamePlatform");
var TTSDK = /** @class */ (function (_super) {
    __extends(TTSDK, _super);
    function TTSDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiName = 'tt';
        //录屏错误。
        _this.IsRecordError = false;
        //视频地址
        _this.videoPath = '';
        return _this;
    }
    TTSDK.prototype.init = function () {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log("\n手机型号", this.systemInfo.model, "\n系统", this.systemInfo.system, "\n微信版本", this.systemInfo.version, "\n语言", this.systemInfo.language, "\n手机品牌", this.systemInfo.brand, "\n客户端平台", this.systemInfo.platform, "\n客户端基础库版本", this.systemInfo.SDKVersion);
        this.api.showShareMenu({ withShareTicket: false });
        this.needShowBanner = false;
        this.bannerTimer = -1;
    };
    /**
     * 视频广告
     */
    TTSDK.prototype.showVideo = function (success, quit, fail) {
        var _this = this;
        if (!GamePlatform_1.default.instance.Config.video || this.systemInfo.appName == 'devtools') {
            console.log("广告开关未打开或参数未填写");
            success();
            return;
        }
        var rewardedVideoAd = this.api.createRewardedVideoAd({ adUnitId: "29dqycn3yo5fghg3im" }); //不支持在开发工具运行，只能在真机运行 返回值是个单例
        var load = (function () {
            console.log('激励视频 广告加载成功');
        });
        rewardedVideoAd.onLoad(load);
        var error = (function (err) {
            console.log('激励视频 广告拉取失败', err);
            fail && fail();
        });
        rewardedVideoAd.onError(error);
        var closefun = (function (res) {
            rewardedVideoAd.offLoad(load);
            rewardedVideoAd.offError(error);
            rewardedVideoAd.offClose(closefun);
            rewardedVideoAd = null;
            if (res && res.isEnded || res === undefined) {
                //视频正常播放结束
                console.log('视频正常播放结束');
                success();
            }
            else {
                //视频播放中途退出
                quit && quit();
                _this.showMessage('请观看完视频');
            }
        });
        rewardedVideoAd.onClose(closefun);
        //开始加载视频广告
        rewardedVideoAd.load().then(function () {
            rewardedVideoAd.show().catch(function (err) {
                console.log('视频已播放完');
                rewardedVideoAd.offLoad(load);
                rewardedVideoAd.offError(error);
                rewardedVideoAd.offClose(closefun);
                rewardedVideoAd = null;
                fail && fail();
            });
        });
    };
    /**
     * 打开banner广告
     */
    TTSDK.prototype.showBanner = function () {
        if (!GamePlatform_1.default.instance.Config.banner) {
            console.log("Banner广告开关未打开或参数未填写");
            return;
        }
        if (this.systemInfo.appName == 'devtools') {
            console.log("头条开发者工具上无法显示banner");
            return;
        }
        if (!!this._bannerAd)
            return;
        this.needShowBanner = true;
        if (this.bannerTimer >= 0)
            return;
        this.bannerTimer = setTimeout(this.createBanner.bind(this), 500);
    };
    /**创建banner */
    TTSDK.prototype.createBanner = function () {
        var _this = this;
        this.bannerTimer = -1;
        if (!this.needShowBanner)
            return;
        var targetBannerAdWidth = 200;
        this._bannerAd = this.api.createBannerAd({
            adUnitId: "b8d277k19acf8ib8f3",
            style: {
                width: targetBannerAdWidth,
                top: this.systemInfo.windowHeight - (targetBannerAdWidth / 16 * 9),
            },
        });
        // this._bannerAd.style.left = (this.systemInfo.windowWidth - targetBannerAdWidth) / 2;
        // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        this._bannerAd.onResize(function (size) {
            // good
            console.log(size.width, size.height);
            _this._bannerAd.style.top = _this.systemInfo.windowHeight - size.height;
            _this._bannerAd.style.left = (_this.systemInfo.windowWidth - size.width) / 2;
            // bad，会触发死循环
            // bannerAd.style.width++;
        });
        this._bannerAd.onLoad(function () {
            console.log("广告拉取成功");
            _this._bannerAd.show().then(function () {
                console.log('广告显示成功');
            }).catch(function (err) {
                console.log('广告组件出现问题', err);
            });
        });
        this._bannerAd.onError(function (err) {
            console.log("广告拉取失败", err);
        });
        this.needShowBanner = false;
        return this._bannerAd;
    };
    /**
     * 关闭banner广告
     */
    TTSDK.prototype.removeBanner = function () {
        this.needShowBanner = false;
        this.destroyBanner();
    };
    /**销毁banner */
    TTSDK.prototype.destroyBanner = function () {
        if (this._bannerAd) {
            this._bannerAd.destroy(); //要先把旧的广告给销毁，不然会导致其监听的时间无法释放，影响性能
            this._bannerAd = null;
        }
    };
    /**
     * 插屏广告
     */
    TTSDK.prototype.showInterstitialAd = function () {
    };
    /**
     * 短震动
     */
    TTSDK.prototype.vibrateShort = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateShort({});
        }
    };
    /**
     * 长震动
     */
    TTSDK.prototype.vibrateLong = function () {
        if (GamePlatform_1.default.instance.Config.vibrate) {
            this.api.vibrateLong({});
        }
    };
    /**
     * 无激励分享&&带参分享
     */
    TTSDK.prototype.shareAppMessage = function (query) {
        if (query === void 0) { query = ''; }
        var index = Math.floor((Math.random() * this.shareTitleArr.length));
        var indeximg = Math.floor((Math.random() * this.shareImgArr.length));
        var self = this;
        this.api.shareAppMessage({
            title: "" + this.shareTitleArr[index],
            imageUrl: "" + this.shareImgArr[indeximg],
            query: query,
            success: function (res) {
                self.showMessage('分享成功');
            },
            fail: function (res) {
                self.showMessage('分享失败');
            },
        });
    };
    /**
     * 激励分享&&带参分享
     */
    TTSDK.prototype.shareToAnyOne = function (success, fail, query) {
        if (query === void 0) { query = ''; }
        var index = Math.floor((Math.random() * this.shareTitleArr.length));
        var indeximg = Math.floor((Math.random() * this.shareImgArr.length));
        var self = this;
        this.api.shareAppMessage({
            title: "" + this.shareTitleArr[index],
            imageUrl: "" + this.shareImgArr[indeximg],
            query: query,
            success: function (res) {
                self.showMessage('分享成功');
                success();
            },
            fail: function (res) {
                self.showMessage('分享失败');
                fail && fail();
            },
        });
    };
    /**
     * 录屏
     */
    TTSDK.prototype.recordVideo = function (type) {
        if (type === void 0) { type = 'start'; }
        this.IsRecordError = false;
        TTSDK.IsOnce = true;
        var self = this;
        var recorder = this.api.getGameRecorderManager();
        if (type == 'start') {
            recorder.start({
                duration: 120,
            });
        }
        else if (type == 'stop') {
            recorder.stop();
        }
        recorder.onStart(function (res) {
            console.log('录屏开始');
        });
        recorder.onStop(function (res) {
            console.log('监听录屏结束', res);
            self.videoPath = res.videoPath;
            // if (this.brand == 'Apple') {
            //     return
            // }
            // recorder.clipVideo({
            //     path: res.videoPath,
            //     timeRange: [120, 0], // 表示裁剪录屏中的最后120s
            //     success: (res) => {
            //         console.log('剪辑录屏成功', res.videoPath);
            //         self.videoPath = res.videoPath
            //     },
            //     fail: (e) => { }
            // })
        });
        recorder.onError(function (errMsg) {
            console.log('监听录屏错误信息', errMsg);
            self.IsRecordError = true;
        });
    };
    /**
     * 分享录屏
     */
    TTSDK.prototype.shareRecordVideo = function (success, fail) {
        console.log('视频地址', this.videoPath, this.IsRecordError);
        var self = this;
        if (this.videoPath && this.IsRecordError == false) {
            var index = Math.floor((Math.random() * this.shareTitleArr.length));
            var indeximg = Math.floor((Math.random() * this.shareImgArr.length));
            this.api.shareAppMessage({
                channel: 'video',
                title: "" + this.shareTitleArr[index],
                imageUrl: "" + this.shareImgArr[indeximg],
                extra: {
                    videoPath: this.videoPath,
                },
                success: function (res) {
                    console.log('拉起分享 成功', res);
                    self.showMessage("发布成功");
                    if (TTSDK.IsOnce) {
                        success();
                        TTSDK.IsOnce = false;
                    }
                },
                fail: function (res) {
                    console.log('拉起分享 失败', res);
                    if (self.systemInfo.appName == 'Toutiao') { //头条版
                        if (self.systemInfo.platform == "ios") { //苹果手机 安卓手机为 android
                            if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~');
                            }
                            else {
                                self.showMessage('发布取消');
                            }
                        }
                        else {
                            var msg = res.errMsg.split(',')[0];
                            console.log('msg', msg);
                            if (msg == 'shareAppMessage:fail video file is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~');
                            }
                            else {
                                self.showMessage('发布取消');
                            }
                        }
                    }
                    else if (self.systemInfo.appName == 'news_article_lite') { //头条极速版
                        if (self.systemInfo.platform == "ios") { //苹果手机 安卓手机为 android
                            if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~');
                            }
                            else {
                                self.showMessage('发布取消');
                            }
                        }
                        else {
                            var msg = res.errMsg.split(',')[0];
                            console.log('msg', msg);
                            if (msg == 'shareAppMessage:fail video file is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~');
                            }
                            else {
                                self.showMessage('发布取消');
                            }
                        }
                        // if (self.systemInfo.platform == "ios") { //苹果手机 安卓手机为 android
                        //     self.showMessage('录屏时间短于3s不能分享哦~~')
                        // } else {
                        //     self.showMessage('录屏时间短于3s不能分享哦~~')
                        // }
                    }
                    else if (self.systemInfo.appName == 'Douyin') {
                        if (self.systemInfo.platform == "ios") { //苹果手机 安卓手机为 android
                            if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~');
                            }
                            else {
                                self.showMessage('发布取消');
                            }
                        }
                        else {
                            var msg = res.errMsg.split(',')[0];
                            console.log('msg', msg);
                            if (msg == 'shareAppMessageDirectly:fail') {
                                self.showMessage('录屏时间短于3s不能分享哦~~');
                            }
                            else {
                                self.showMessage('发布取消');
                            }
                        }
                    }
                    else {
                        self.showMessage('发布取消');
                    }
                }
            });
        }
        else {
            fail && fail();
            self.showMessage('录屏错误!!!');
        }
    };
    /**
     * 消息提示
     */
    TTSDK.prototype.showMessage = function (msg, icon) {
        if (icon === void 0) { icon = 'none'; }
        this.api.showToast({
            title: msg,
            duration: 2000,
            icon: icon,
            success: function (res) { }
        });
    };
    TTSDK.prototype.navigateToMiniProgram = function (data) {
        this.api.navigateToMiniProgram({
            appId: data.gameId,
        });
    };
    //录屏分享次数
    TTSDK.IsOnce = true;
    return TTSDK;
}(SDK_1.default));
exports.default = TTSDK;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxTREtcXFRUU0RLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBd0I7QUFDeEIsZ0RBQTJDO0FBRTNDO0lBQW1DLHlCQUFHO0lBQXRDO1FBQUEscUVBd1hDO1FBdlhXLGFBQU8sR0FBVyxJQUFJLENBQUM7UUE0Ti9CLE9BQU87UUFDQyxtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUN2QyxNQUFNO1FBQ0UsZUFBUyxHQUFXLEVBQUUsQ0FBQzs7SUF3Sm5DLENBQUM7SUFyWFUsb0JBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUNQLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQ2pDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFDaEMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQ25DLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDM0MsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUxQixD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QjtnQkFDTCxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQTtZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDOUI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQkFBVyxHQUFsQixVQUFtQixHQUFXLEVBQUUsSUFBcUI7UUFBckIscUJBQUEsRUFBQSxhQUFxQjtRQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUNmLEtBQUssRUFBRSxHQUFHO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxVQUFDLEdBQUcsSUFBTyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxxQ0FBcUIsR0FBNUIsVUFBNkIsSUFBUztRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBNUpELFFBQVE7SUFDTSxZQUFNLEdBQUcsSUFBSSxDQUFDO0lBNEpoQyxZQUFDO0NBeFhELEFBd1hDLENBeFhrQyxhQUFHLEdBd1hyQztrQkF4WG9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLIGZyb20gXCIuL1NES1wiO1xuaW1wb3J0IEdhbWVQbGF0Zm9ybSBmcm9tIFwiLi4vR2FtZVBsYXRmb3JtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRUU0RLIGV4dGVuZHMgU0RLIHtcbiAgICBwcml2YXRlIGFwaU5hbWU6IHN0cmluZyA9ICd0dCc7XG5cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5hcGkgPSB3aW5kb3dbdGhpcy5hcGlOYW1lXTtcblxuICAgICAgICB0aGlzLnN5c3RlbUluZm8gPSB0aGlzLmFwaS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIFwiXFxu5omL5py65Z6L5Y+3XCIsIHRoaXMuc3lzdGVtSW5mby5tb2RlbCxcbiAgICAgICAgICAgIFwiXFxu57O757ufXCIsIHRoaXMuc3lzdGVtSW5mby5zeXN0ZW0sXG4gICAgICAgICAgICBcIlxcbuW+ruS/oeeJiOacrFwiLCB0aGlzLnN5c3RlbUluZm8udmVyc2lvbixcbiAgICAgICAgICAgIFwiXFxu6K+t6KiAXCIsIHRoaXMuc3lzdGVtSW5mby5sYW5ndWFnZSxcbiAgICAgICAgICAgIFwiXFxu5omL5py65ZOB54mMXCIsIHRoaXMuc3lzdGVtSW5mby5icmFuZCxcbiAgICAgICAgICAgIFwiXFxu5a6i5oi356uv5bmz5Y+wXCIsIHRoaXMuc3lzdGVtSW5mby5wbGF0Zm9ybSxcbiAgICAgICAgICAgIFwiXFxu5a6i5oi356uv5Z+656GA5bqT54mI5pysXCIsIHRoaXMuc3lzdGVtSW5mby5TREtWZXJzaW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hcGkuc2hvd1NoYXJlTWVudSh7IHdpdGhTaGFyZVRpY2tldDogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMubmVlZFNob3dCYW5uZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYW5uZXJUaW1lciA9IC0xO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KeG6aKR5bm/5ZGKXG4gICAgICovXG4gICAgcHVibGljIHNob3dWaWRlbyhzdWNjZXNzOiBGdW5jdGlvbiwgcXVpdD86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnZpZGVvIHx8IHRoaXMuc3lzdGVtSW5mby5hcHBOYW1lID09ICdkZXZ0b29scycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5byA5YWz5pyq5omT5byA5oiW5Y+C5pWw5pyq5aGr5YaZXCIpO1xuICAgICAgICAgICAgc3VjY2VzcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJld2FyZGVkVmlkZW9BZCA9IHRoaXMuYXBpLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7IGFkVW5pdElkOiBcIjI5ZHF5Y24zeW81ZmdoZzNpbVwiIH0pIC8v5LiN5pSv5oyB5Zyo5byA5Y+R5bel5YW36L+Q6KGM77yM5Y+q6IO95Zyo55yf5py66L+Q6KGMIOi/lOWbnuWAvOaYr+S4quWNleS+i1xuICAgICAgICBsZXQgbG9hZCA9ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuWKoOi9veaIkOWKnycpO1xuICAgICAgICB9KVxuICAgICAgICByZXdhcmRlZFZpZGVvQWQub25Mb2FkKGxvYWQpO1xuICAgICAgICBsZXQgZXJyb3IgPSAoKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrmi4nlj5blpLHotKUnLCBlcnIpO1xuICAgICAgICAgICAgZmFpbCAmJiBmYWlsKCk7XG4gICAgICAgIH0pXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5vbkVycm9yKGVycm9yKTtcbiAgICAgICAgbGV0IGNsb3NlZnVuID0gKChyZXMpID0+IHtcbiAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZMb2FkKGxvYWQpO1xuICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9mZkVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZDbG9zZShjbG9zZWZ1bik7XG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8v6KeG6aKR5q2j5bi45pKt5pS+57uT5p2fXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+inhumikeato+W4uOaSreaUvue7k+adnycpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/op4bpopHmkq3mlL7kuK3pgJTpgIDlh7pcbiAgICAgICAgICAgICAgICBxdWl0ICYmIHF1aXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKCfor7fop4LnnIvlrozop4bpopEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9uQ2xvc2UoY2xvc2VmdW4pO1xuICAgICAgICAvL+W8gOWni+WKoOi9veinhumikeW5v+WRilxuICAgICAgICByZXdhcmRlZFZpZGVvQWQubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLnNob3coKS5jYXRjaChcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKR5bey5pKt5pS+5a6MJylcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9mZkxvYWQobG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZC5vZmZDbG9zZShjbG9zZWZ1bik7XG4gICAgICAgICAgICAgICAgICAgIHJld2FyZGVkVmlkZW9BZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL+W9k+WJjeW5v+WRilxuICAgIHByaXZhdGUgX2Jhbm5lckFkOiBhbnk7XG4gICAgcHJpdmF0ZSBuZWVkU2hvd0Jhbm5lcjogYm9vbGVhbjtcbiAgICAvKirliJvlu7piYW5uZXLorqHml7blmaggKi9cbiAgICBwcml2YXRlIGJhbm5lclRpbWVyOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog5omT5byAYmFubmVy5bm/5ZGKXG4gICAgICovXG4gICAgcHVibGljIHNob3dCYW5uZXIoKSB7XG4gICAgICAgIGlmICghR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5iYW5uZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFubmVy5bm/5ZGK5byA5YWz5pyq5omT5byA5oiW5Y+C5pWw5pyq5aGr5YaZXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN5c3RlbUluZm8uYXBwTmFtZSA9PSAnZGV2dG9vbHMnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWktOadoeW8gOWPkeiAheW3peWFt+S4iuaXoOazleaYvuekumJhbm5lclwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISF0aGlzLl9iYW5uZXJBZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm5lZWRTaG93QmFubmVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYmFubmVyVGltZXIgPj0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmJhbm5lclRpbWVyID0gc2V0VGltZW91dCh0aGlzLmNyZWF0ZUJhbm5lci5iaW5kKHRoaXMpLCA1MDApO1xuICAgIH1cblxuICAgIC8qKuWIm+W7umJhbm5lciAqL1xuICAgIHByaXZhdGUgY3JlYXRlQmFubmVyKCkge1xuICAgICAgICB0aGlzLmJhbm5lclRpbWVyID0gLTE7XG4gICAgICAgIGlmICghdGhpcy5uZWVkU2hvd0Jhbm5lcikgcmV0dXJuO1xuICAgICAgICBsZXQgdGFyZ2V0QmFubmVyQWRXaWR0aCA9IDIwMDtcbiAgICAgICAgdGhpcy5fYmFubmVyQWQgPSB0aGlzLmFwaS5jcmVhdGVCYW5uZXJBZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogXCJiOGQyNzdrMTlhY2Y4aWI4ZjNcIixcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRhcmdldEJhbm5lckFkV2lkdGgsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnN5c3RlbUluZm8ud2luZG93SGVpZ2h0IC0gKHRhcmdldEJhbm5lckFkV2lkdGggLyAxNiAqIDkpLCAvLyDmoLnmja7ns7vnu5/nuqblrprlsLrlr7jorqHnrpflh7rlub/lkYrpq5jluqZcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMuX2Jhbm5lckFkLnN0eWxlLmxlZnQgPSAodGhpcy5zeXN0ZW1JbmZvLndpbmRvd1dpZHRoIC0gdGFyZ2V0QmFubmVyQWRXaWR0aCkgLyAyO1xuICAgICAgICAvLyDlsLrlr7josIPmlbTml7bkvJrop6blj5Hlm57osIPvvIzpgJrov4flm57osIPmi7/liLDnmoTlub/lkYrnnJ/lrp7lrr3pq5jlho3ov5vooYzlrprkvY3pgILphY3lpITnkIZcbiAgICAgICAgLy8g5rOo5oSP77ya5aaC5p6c5Zyo5Zue6LCD6YeM5YaN5qyh6LCD5pW05bC65a+477yM6KaB56Gu5L+d5LiN6KaB6Kem5Y+R5q275b6q546v77yB77yB77yBXG4gICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uUmVzaXplKHNpemUgPT4ge1xuICAgICAgICAgICAgLy8gZ29vZFxuICAgICAgICAgICAgY29uc29sZS5sb2coc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuc3R5bGUudG9wID0gdGhpcy5zeXN0ZW1JbmZvLndpbmRvd0hlaWdodCAtIHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuc3R5bGUubGVmdCA9ICh0aGlzLnN5c3RlbUluZm8ud2luZG93V2lkdGggLSBzaXplLndpZHRoKSAvIDI7XG4gICAgICAgICAgICAvLyBiYWTvvIzkvJrop6blj5Hmrbvlvqrnjq9cbiAgICAgICAgICAgIC8vIGJhbm5lckFkLnN0eWxlLndpZHRoKys7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrmi4nlj5bmiJDlip9cIik7XG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W5v+WRiuaYvuekuuaIkOWKnycpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflub/lkYrnu4Tku7blh7rnjrDpl67popgnLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkVycm9yKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaLieWPluWksei0pVwiLCBlcnIpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5lZWRTaG93QmFubmVyID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYW5uZXJBZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61iYW5uZXLlub/lkYpcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlQmFubmVyKCkge1xuICAgICAgICB0aGlzLm5lZWRTaG93QmFubmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVzdHJveUJhbm5lcigpO1xuICAgIH1cbiAgICAvKirplIDmr4FiYW5uZXIgKi9cbiAgICBwcml2YXRlIGRlc3Ryb3lCYW5uZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuZGVzdHJveSgpOyAvL+imgeWFiOaKiuaXp+eahOW5v+WRiue7memUgOavge+8jOS4jeeEtuS8muWvvOiHtOWFtuebkeWQrOeahOaXtumXtOaXoOazlemHiuaUvu+8jOW9seWTjeaAp+iDvVxuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+S5bGP5bm/5ZGKXG4gICAgICovXG4gICAgcHVibGljIHNob3dJbnRlcnN0aXRpYWxBZCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOefremch+WKqFxuICAgICAqL1xuICAgIHB1YmxpYyB2aWJyYXRlU2hvcnQoKSB7XG4gICAgICAgIGlmIChHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnZpYnJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXBpLnZpYnJhdGVTaG9ydCh7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDplb/pnIfliqhcbiAgICAgKi9cbiAgICBwdWJsaWMgdmlicmF0ZUxvbmcoKSB7XG4gICAgICAgIGlmIChHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnZpYnJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXBpLnZpYnJhdGVMb25nKHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaXoOa/gOWKseWIhuS6qyYm5bim5Y+C5YiG5LqrXG4gICAgICovXG4gICAgcHVibGljIHNoYXJlQXBwTWVzc2FnZShxdWVyeTogc3RyaW5nID0gJycpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogdGhpcy5zaGFyZVRpdGxlQXJyLmxlbmd0aCkpO1xuICAgICAgICBsZXQgaW5kZXhpbWc6IG51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNoYXJlSW1nQXJyLmxlbmd0aCkpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy5hcGkuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiBgJHt0aGlzLnNoYXJlVGl0bGVBcnJbaW5kZXhdfWAsXG4gICAgICAgICAgICBpbWFnZVVybDogYCR7dGhpcy5zaGFyZUltZ0FycltpbmRleGltZ119YCxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKCfliIbkuqvmiJDlip8nKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5YiG5Lqr5aSx6LSlJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmv4DlirHliIbkuqsmJuW4puWPguWIhuS6q1xuICAgICAqL1xuICAgIHB1YmxpYyBzaGFyZVRvQW55T25lKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24sIHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNoYXJlVGl0bGVBcnIubGVuZ3RoKSk7XG4gICAgICAgIGxldCBpbmRleGltZzogbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2hhcmVJbWdBcnIubGVuZ3RoKSk7XG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICB0aGlzLmFwaS5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdGl0bGU6IGAke3RoaXMuc2hhcmVUaXRsZUFycltpbmRleF19YCxcbiAgICAgICAgICAgIGltYWdlVXJsOiBgJHt0aGlzLnNoYXJlSW1nQXJyW2luZGV4aW1nXX1gLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+WIhuS6q+aIkOWKnycpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5YiG5Lqr5aSx6LSlJyk7XG4gICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8v5b2V5bGP5YiG5Lqr5qyh5pWwXG4gICAgcHVibGljIHN0YXRpYyBJc09uY2UgPSB0cnVlO1xuICAgIC8v5b2V5bGP6ZSZ6K+v44CCXG4gICAgcHJpdmF0ZSBJc1JlY29yZEVycm9yOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy/op4bpopHlnLDlnYBcbiAgICBwcml2YXRlIHZpZGVvUGF0aDogc3RyaW5nID0gJyc7XG4gICAgLyoqXG4gICAgICog5b2V5bGPXG4gICAgICovXG4gICAgcHVibGljIHJlY29yZFZpZGVvKHR5cGU6IHN0cmluZyA9ICdzdGFydCcpIHtcbiAgICAgICAgdGhpcy5Jc1JlY29yZEVycm9yID0gZmFsc2U7XG4gICAgICAgIFRUU0RLLklzT25jZSA9IHRydWU7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVjb3JkZXIgPSB0aGlzLmFwaS5nZXRHYW1lUmVjb3JkZXJNYW5hZ2VyKCk7XG4gICAgICAgIGlmICh0eXBlID09ICdzdGFydCcpIHtcbiAgICAgICAgICAgIHJlY29yZGVyLnN0YXJ0KHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTIwLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdzdG9wJykge1xuICAgICAgICAgICAgcmVjb3JkZXIuc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjb3JkZXIub25TdGFydChyZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9leWxj+W8gOWniycpO1xuICAgICAgICB9KVxuICAgICAgICByZWNvcmRlci5vblN0b3AocmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnm5HlkKzlvZXlsY/nu5PmnZ8nLCByZXMpO1xuICAgICAgICAgICAgc2VsZi52aWRlb1BhdGggPSByZXMudmlkZW9QYXRoO1xuICAgICAgICAgICAgLy8gaWYgKHRoaXMuYnJhbmQgPT0gJ0FwcGxlJykge1xuICAgICAgICAgICAgLy8gICAgIHJldHVyblxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gcmVjb3JkZXIuY2xpcFZpZGVvKHtcbiAgICAgICAgICAgIC8vICAgICBwYXRoOiByZXMudmlkZW9QYXRoLFxuICAgICAgICAgICAgLy8gICAgIHRpbWVSYW5nZTogWzEyMCwgMF0sIC8vIOihqOekuuijgeWJquW9leWxj+S4reeahOacgOWQjjEyMHNcbiAgICAgICAgICAgIC8vICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCfliarovpHlvZXlsY/miJDlip8nLCByZXMudmlkZW9QYXRoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgc2VsZi52aWRlb1BhdGggPSByZXMudmlkZW9QYXRoXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICBmYWlsOiAoZSkgPT4geyB9XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICB9KVxuICAgICAgICByZWNvcmRlci5vbkVycm9yKChlcnJNc2cpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnm5HlkKzlvZXlsY/plJnor6/kv6Hmga8nLCBlcnJNc2cpO1xuICAgICAgICAgICAgc2VsZi5Jc1JlY29yZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWIhuS6q+W9leWxj1xuICAgICAqL1xuICAgIHB1YmxpYyBzaGFyZVJlY29yZFZpZGVvKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+inhumikeWcsOWdgCcsIHRoaXMudmlkZW9QYXRoLCB0aGlzLklzUmVjb3JkRXJyb3IpXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMudmlkZW9QYXRoICYmIHRoaXMuSXNSZWNvcmRFcnJvciA9PSBmYWxzZSkge1xuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogdGhpcy5zaGFyZVRpdGxlQXJyLmxlbmd0aCkpO1xuICAgICAgICAgICAgbGV0IGluZGV4aW1nOiBudW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogdGhpcy5zaGFyZUltZ0Fyci5sZW5ndGgpKTtcblxuICAgICAgICAgICAgdGhpcy5hcGkuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBjaGFubmVsOiAndmlkZW8nLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBgJHt0aGlzLnNoYXJlVGl0bGVBcnJbaW5kZXhdfWAsXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IGAke3RoaXMuc2hhcmVJbWdBcnJbaW5kZXhpbWddfWAsXG4gICAgICAgICAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9QYXRoOiB0aGlzLnZpZGVvUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgLy8gdmlkZW9Ub3BpY3M6JydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aLiei1t+WIhuS6qyDmiJDlip8nLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKFwi5Y+R5biD5oiQ5YqfXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoVFRTREsuSXNPbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBUVFNESy5Jc09uY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5ouJ6LW35YiG5LqrIOWksei0pScsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnN5c3RlbUluZm8uYXBwTmFtZSA9PSAnVG91dGlhbycpIHsgLy/lpLTmnaHniYhcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnN5c3RlbUluZm8ucGxhdGZvcm0gPT0gXCJpb3NcIikgeyAvL+iLueaenOaJi+acuiDlronljZPmiYvmnLrkuLogYW5kcm9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09ICdzaGFyZUFwcE1lc3NhZ2U6ZmFpbCB2aWRlbyBkdXJhdGlvbiBpcyB0b28gc2hvcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+W9leWxj+aXtumXtOefreS6jjNz5LiN6IO95YiG5Lqr5ZOmfn4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+WPkeW4g+WPlua2iCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnID0gcmVzLmVyck1zZy5zcGxpdCgnLCcpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21zZycsIG1zZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNnID09ICdzaGFyZUFwcE1lc3NhZ2U6ZmFpbCB2aWRlbyBmaWxlIGlzIHRvbyBzaG9ydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5b2V5bGP5pe26Ze055+t5LqOM3PkuI3og73liIbkuqvlk6Z+ficpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5Y+R5biD5Y+W5raIJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5zeXN0ZW1JbmZvLmFwcE5hbWUgPT0gJ25ld3NfYXJ0aWNsZV9saXRlJykgeyAvL+WktOadoeaegemAn+eJiFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc3lzdGVtSW5mby5wbGF0Zm9ybSA9PSBcImlvc1wiKSB7IC8v6Iu55p6c5omL5py6IOWuieWNk+aJi+acuuS4uiBhbmRyb2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT0gJ3NoYXJlQXBwTWVzc2FnZTpmYWlsIHZpZGVvIGR1cmF0aW9uIGlzIHRvbyBzaG9ydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5b2V5bGP5pe26Ze055+t5LqOM3PkuI3og73liIbkuqvlk6Z+ficpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5Y+R5biD5Y+W5raIJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2cgPSByZXMuZXJyTXNnLnNwbGl0KCcsJylbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbXNnJywgbXNnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtc2cgPT0gJ3NoYXJlQXBwTWVzc2FnZTpmYWlsIHZpZGVvIGZpbGUgaXMgdG9vIHNob3J0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKCflvZXlsY/ml7bpl7Tnn63kuo4zc+S4jeiDveWIhuS6q+WTpn5+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKCflj5HluIPlj5bmtognKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChzZWxmLnN5c3RlbUluZm8ucGxhdGZvcm0gPT0gXCJpb3NcIikgeyAvL+iLueaenOaJi+acuiDlronljZPmiYvmnLrkuLogYW5kcm9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+W9leWxj+aXtumXtOefreS6jjNz5LiN6IO95YiG5Lqr5ZOmfn4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzZWxmLnNob3dNZXNzYWdlKCflvZXlsY/ml7bpl7Tnn63kuo4zc+S4jeiDveWIhuS6q+WTpn5+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmLnN5c3RlbUluZm8uYXBwTmFtZSA9PSAnRG91eWluJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc3lzdGVtSW5mby5wbGF0Zm9ybSA9PSBcImlvc1wiKSB7IC8v6Iu55p6c5omL5py6IOWuieWNk+aJi+acuuS4uiBhbmRyb2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT0gJ3NoYXJlQXBwTWVzc2FnZTpmYWlsIHZpZGVvIGR1cmF0aW9uIGlzIHRvbyBzaG9ydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5b2V5bGP5pe26Ze055+t5LqOM3PkuI3og73liIbkuqvlk6Z+ficpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5Y+R5biD5Y+W5raIJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2cgPSByZXMuZXJyTXNnLnNwbGl0KCcsJylbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbXNnJywgbXNnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtc2cgPT0gJ3NoYXJlQXBwTWVzc2FnZURpcmVjdGx5OmZhaWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+W9leWxj+aXtumXtOefreS6jjNz5LiN6IO95YiG5Lqr5ZOmfn4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+WPkeW4g+WPlua2iCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSgn5Y+R5biD5Y+W5raIJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoJ+W9leWxj+mUmeivryEhIScpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtojmga/mj5DnpLpcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd01lc3NhZ2UobXNnOiBzdHJpbmcsIGljb246IHN0cmluZyA9ICdub25lJykge1xuICAgICAgICB0aGlzLmFwaS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6IG1zZyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgICAgICAgICAgaWNvbjogaWNvbixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHsgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmF2aWdhdGVUb01pbmlQcm9ncmFtKGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLmFwaS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xuICAgICAgICAgICAgYXBwSWQ6IGRhdGEuZ2FtZUlkLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=