
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/SDK/SDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9eaec78ShFKa5xhMQa5RJgB', 'SDK');
// myGame/Script/Platform/SDK/SDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = require("../../Common/EventManager");
var GameEventType_1 = require("../../GameSpecial/GameEventType");
var GamePlatform_1 = require("../GamePlatform");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SDK = /** @class */ (function (_super) {
    __extends(SDK, _super);
    function SDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 分享游戏时的描述
         */
        _this.shareTitleArr = [
            '',
            ''
        ];
        /**
         * 分享游戏时的图片
         */
        _this.shareImgArr = [
            '',
            ''
        ];
        return _this;
    }
    /**
     * 初始化
     */
    SDK.prototype.init = function () { };
    SDK.prototype.onEvents = function () {
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.showBanner, this.showBanner, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.hideBanner, this.removeBanner, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.showVideo, this.showVideo, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.startRecord, this.startRecord, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.stopRecord, this.stopRecord, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.shareRecord, this.shareRecord, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.showMsg, this.showMessage, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.showInsertAd, this.showInterstitialAd, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.navigateToMiniProgram, this.navigateToMiniProgram, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.vibrateLong, this.vibrateLong, this);
        EventManager_1.default.on(GameEventType_1.EventType.SDKEvent.vibrateShort, this.vibrateShort, this);
    };
    SDK.prototype.startRecord = function () {
        this.recordVideo("start");
    };
    SDK.prototype.stopRecord = function () {
        this.recordVideo("stop");
    };
    SDK.prototype.shareRecord = function (success, fail) {
        if (fail === void 0) { fail = null; }
        this.shareRecordVideo(success, fail);
    };
    /**
     * 视频广告
     * @param success   广告观看完毕的回调
     * @param quit      中途退出广告观看的回调
     * @param fail      广告加载失败的回调
     */
    SDK.prototype.showVideo = function (success, quit, fail) { success(); };
    /**获取视频广告id */
    SDK.prototype.getVideoAdUnitId = function () {
        if (!GamePlatform_1.default.instance.Config.video) {
            console.log("广告开关未打开");
            return null;
        }
        if (!GamePlatform_1.default.instance.Config.videoAdUnitId || !GamePlatform_1.default.instance.Config.videoAdUnitId[0]) {
            console.log("广告参数未填写");
            return null;
        }
        return GamePlatform_1.default.instance.Config.videoAdUnitId[0];
    };
    SDK.prototype.onVideoSuccess = function () {
        var cb = this.videoSuccess;
        this.resetVideoCb();
        if (!!cb) {
            cb();
        }
    };
    SDK.prototype.onVideoFail = function (err) {
        console.log("视频广告加载出错：", err);
        var cb = this.videoFail;
        this.resetVideoCb();
        if (!!cb) {
            cb();
        }
    };
    SDK.prototype.onVideoQuit = function () {
        var cb = this.videoQuit;
        this.resetVideoCb();
        if (!!cb) {
            cb();
        }
    };
    SDK.prototype.resetVideoCb = function () {
        this.videoSuccess = null;
        this.videoQuit = null;
        this.videoFail = null;
    };
    /**
     * 打开banner广告
     */
    SDK.prototype.showBanner = function () { };
    /**
     * 关闭banner广告
     */
    SDK.prototype.removeBanner = function () { };
    SDK.prototype.getBannerId = function () {
        if (!GamePlatform_1.default.instance.Config.banner) {
            console.log("banner开关未打开");
            return null;
        }
        if (!GamePlatform_1.default.instance.Config.BannerAdUnitId || !GamePlatform_1.default.instance.Config.BannerAdUnitId[0]) {
            console.log("banner ID 未填写");
            return null;
        }
        return GamePlatform_1.default.instance.Config.BannerAdUnitId[0];
    };
    /**
     * 插屏广告
     */
    SDK.prototype.showInterstitialAd = function () { };
    /**获取插屏广告id */
    SDK.prototype.getInsertAdUnitId = function () {
        if (!GamePlatform_1.default.instance.Config.interstitial) {
            console.log("插屏广告开关未打开");
            return null;
        }
        if (!GamePlatform_1.default.instance.Config.InterstitialAdUnitId || !GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0]) {
            console.log("插屏广告参数未填写");
            return null;
        }
        return GamePlatform_1.default.instance.Config.InterstitialAdUnitId[0];
    };
    /**
     * 短震动
     */
    SDK.prototype.vibrateShort = function () { };
    /**
     * 长震动
     */
    SDK.prototype.vibrateLong = function () { };
    /**
     * 无激励分享&&带参分享
     */
    SDK.prototype.shareAppMessage = function (query) {
        if (query === void 0) { query = ''; }
    };
    /**
     * 激励分享&&带参分享
     */
    SDK.prototype.shareToAnyOne = function (success, fail, query) {
        if (query === void 0) { query = ''; }
        success();
    };
    /**
     * 弹出消息
     */
    SDK.prototype.showMessage = function (msg, icon) {
        if (icon === void 0) { icon = 'none'; }
    };
    /**
     * 录屏功能。[抖音]
     */
    SDK.prototype.recordVideo = function (type) {
        if (type === void 0) { type = 'start'; }
    };
    /**
     * 录屏分享[抖音]
     */
    SDK.prototype.shareRecordVideo = function (success, fail) { };
    /**
     * 游戏自定义打点。
     */
    SDK.prototype.aldSdkSendEvent = function (eventName, data) { };
    /**
     * 游戏开始打点
     */
    SDK.prototype.aldSdkOnStart = function (data) { };
    /**
     * 游戏进行中打点
     */
    SDK.prototype.aldSdkOnRunning = function (data) { };
    /**
     * 游戏结束打点
     */
    SDK.prototype.aldSdkOnEnd = function (data) { };
    /**跳转到其他小游戏 */
    SDK.prototype.navigateToMiniProgram = function (data) {
        console.log("跳转小游戏，子类实现，data:", data);
    };
    SDK = __decorate([
        ccclass
    ], SDK);
    return SDK;
}(cc.Component));
exports.default = SDK;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxTREtcXFNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQXFEO0FBQ3JELGlFQUE0RDtBQUM1RCxnREFBMkM7QUFJckMsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUFpQyx1QkFBWTtJQUQ3QztRQUFBLHFFQWdOQztRQTlNRzs7V0FFRztRQUNPLG1CQUFhLEdBQUc7WUFDdEIsRUFBRTtZQUNGLEVBQUU7U0FDTCxDQUFBO1FBQ0Q7O1dBRUc7UUFDTyxpQkFBVyxHQUFHO1lBQ3BCLEVBQUU7WUFDRixFQUFFO1NBQ0wsQ0FBQTs7SUFpTUwsQ0FBQztJQXJMRzs7T0FFRztJQUNJLGtCQUFJLEdBQVgsY0FBZ0IsQ0FBQztJQUVWLHNCQUFRLEdBQWY7UUFDSSxzQkFBWSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxzQkFBWSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxzQkFBWSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxzQkFBWSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxzQkFBWSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxzQkFBWSxDQUFDLEVB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LFVBQW1CLElBQUksSUFBSSxDQUFDO0lBRTVCLGNBQWM7SUFDUCxtQ0FBcUIsR0FBNUIsVUFBNkIsSUFBUztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUE5TWdCLEdBQUc7UUFEdkIsT0FBTztPQUNhLEdBQUcsQ0ErTXZCO0lBQUQsVUFBQztDQS9NRCxBQStNQyxDQS9NZ0MsRUFBRSxDQUFDLFNBQVMsR0ErTTVDO2tCQS9Nb0IsR0FBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSBcIi4uLy4uL0NvbW1vbi9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcclxuaW1wb3J0IEdhbWVQbGF0Zm9ybSBmcm9tIFwiLi4vR2FtZVBsYXRmb3JtXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTREsgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiDliIbkuqvmuLjmiI/ml7bnmoTmj4/ov7BcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNoYXJlVGl0bGVBcnIgPSBbXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAgJydcclxuICAgIF1cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5ri45oiP5pe255qE5Zu+54mHXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzaGFyZUltZ0FyciA9IFtcclxuICAgICAgICAnJyxcclxuICAgICAgICAnJ1xyXG4gICAgXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omL5py65L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzeXN0ZW1JbmZvOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3lubPlj7BhcGlcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFwaTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KCkgeyB9XHJcblxyXG4gICAgcHVibGljIG9uRXZlbnRzKCkge1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUuU0RLRXZlbnQuc2hvd0Jhbm5lciwgdGhpcy5zaG93QmFubmVyLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLlNES0V2ZW50LmhpZGVCYW5uZXIsIHRoaXMucmVtb3ZlQmFubmVyLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLlNES0V2ZW50LnNob3dWaWRlbywgdGhpcy5zaG93VmlkZW8sIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUuU0RLRXZlbnQuc3RhcnRSZWNvcmQsIHRoaXMuc3RhcnRSZWNvcmQsIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUuU0RLRXZlbnQuc3RvcFJlY29yZCwgdGhpcy5zdG9wUmVjb3JkLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLlNES0V2ZW50LnNoYXJlUmVjb3JkLCB0aGlzLnNoYXJlUmVjb3JkLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLlNES0V2ZW50LnNob3dNc2csIHRoaXMuc2hvd01lc3NhZ2UsIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUuU0RLRXZlbnQuc2hvd0luc2VydEFkLCB0aGlzLnNob3dJbnRlcnN0aXRpYWxBZCwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS5TREtFdmVudC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0sIHRoaXMubmF2aWdhdGVUb01pbmlQcm9ncmFtLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLlNES0V2ZW50LnZpYnJhdGVMb25nLCB0aGlzLnZpYnJhdGVMb25nLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLlNES0V2ZW50LnZpYnJhdGVTaG9ydCwgdGhpcy52aWJyYXRlU2hvcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRSZWNvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRWaWRlbyhcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RvcFJlY29yZCgpIHtcclxuICAgICAgICB0aGlzLnJlY29yZFZpZGVvKFwic3RvcFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNoYXJlUmVjb3JkKHN1Y2Nlc3M6IEZ1bmN0aW9uLCBmYWlsOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLnNoYXJlUmVjb3JkVmlkZW8oc3VjY2VzcywgZmFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZpZGVvQWQ6IGFueTtcclxuICAgIC8qKlxyXG4gICAgICog6KeG6aKR5bm/5ZGKXHJcbiAgICAgKiBAcGFyYW0gc3VjY2VzcyAgIOW5v+WRiuingueci+WujOavleeahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIHF1aXQgICAgICDkuK3pgJTpgIDlh7rlub/lkYrop4LnnIvnmoTlm57osINcclxuICAgICAqIEBwYXJhbSBmYWlsICAgICAg5bm/5ZGK5Yqg6L295aSx6LSl55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93VmlkZW8oc3VjY2VzczogRnVuY3Rpb24sIHF1aXQ/OiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uKSB7IHN1Y2Nlc3MoKSB9XHJcbiAgICAvKirojrflj5bop4bpopHlub/lkYppZCAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFZpZGVvQWRVbml0SWQoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW8pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrlvIDlhbPmnKrmiZPlvIBcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW9BZFVuaXRJZCB8fCAhR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWRlb0FkVW5pdElkWzBdKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5Y+C5pWw5pyq5aGr5YaZXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcudmlkZW9BZFVuaXRJZFswXTtcclxuICAgIH1cclxuICAgIC8qKuinhumikeW5v+WRiuingueci+WujOavleWbnuiwgyAqL1xyXG4gICAgcHJvdGVjdGVkIHZpZGVvU3VjY2VzczogRnVuY3Rpb247XHJcbiAgICAvKirop4bpopHlub/lkYrliqDovb3lpLHotKXlm57osIMgKi9cclxuICAgIHByb3RlY3RlZCB2aWRlb0ZhaWw6IEZ1bmN0aW9uO1xyXG4gICAgLyoq6KeG6aKR5bm/5ZGK5Lit6YCU6YCA5Ye65Zue6LCDICovXHJcbiAgICBwcm90ZWN0ZWQgdmlkZW9RdWl0OiBGdW5jdGlvbjtcclxuICAgIHByb3RlY3RlZCBvblZpZGVvU3VjY2VzcygpIHtcclxuICAgICAgICBsZXQgY2IgPSB0aGlzLnZpZGVvU3VjY2VzcztcclxuICAgICAgICB0aGlzLnJlc2V0VmlkZW9DYigpO1xyXG4gICAgICAgIGlmICghIWNiKSB7XHJcbiAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmlkZW9GYWlsKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5bm/5ZGK5Yqg6L295Ye66ZSZ77yaXCIsIGVycik7XHJcbiAgICAgICAgbGV0IGNiID0gdGhpcy52aWRlb0ZhaWw7XHJcbiAgICAgICAgdGhpcy5yZXNldFZpZGVvQ2IoKTtcclxuICAgICAgICBpZiAoISFjYikge1xyXG4gICAgICAgICAgICBjYigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZpZGVvUXVpdCgpIHtcclxuICAgICAgICBsZXQgY2IgPSB0aGlzLnZpZGVvUXVpdDtcclxuICAgICAgICB0aGlzLnJlc2V0VmlkZW9DYigpO1xyXG4gICAgICAgIGlmICghIWNiKSB7XHJcbiAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlc2V0VmlkZW9DYigpIHtcclxuICAgICAgICB0aGlzLnZpZGVvU3VjY2VzcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52aWRlb1F1aXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmlkZW9GYWlsID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gGJhbm5lcuW5v+WRilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0Jhbm5lcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6ZetYmFubmVy5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVCYW5uZXIoKSB7IH1cclxuICAgIHByb3RlY3RlZCBnZXRCYW5uZXJJZCgpIHtcclxuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5Db25maWcuYmFubmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVy5byA5YWz5pyq5omT5byAXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkJhbm5lckFkVW5pdElkIHx8ICFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkJhbm5lckFkVW5pdElkWzBdKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIElEIOacquWhq+WGmVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkJhbm5lckFkVW5pdElkWzBdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWxj+W5v+WRilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0ludGVyc3RpdGlhbEFkKCkgeyB9XHJcbiAgICAvKirojrflj5bmj5LlsY/lub/lkYppZCAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEluc2VydEFkVW5pdElkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLmludGVyc3RpdGlhbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuW8gOWFs+acquaJk+W8gFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5JbnRlcnN0aXRpYWxBZFVuaXRJZCB8fCAhR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy5JbnRlcnN0aXRpYWxBZFVuaXRJZFswXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuWPguaVsOacquWhq+WGmVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLkludGVyc3RpdGlhbEFkVW5pdElkWzBdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnn63pnIfliqhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHZpYnJhdGVTaG9ydCgpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZW/6ZyH5YqoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2aWJyYXRlTG9uZygpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5peg5r+A5Yqx5YiG5LqrJibluKblj4LliIbkuqtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNoYXJlQXBwTWVzc2FnZShxdWVyeTogc3RyaW5nID0gJycpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5r+A5Yqx5YiG5LqrJibluKblj4LliIbkuqtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNoYXJlVG9BbnlPbmUoc3VjY2VzczogRnVuY3Rpb24sIGZhaWw/OiBGdW5jdGlvbiwgcXVlcnk6IHN0cmluZyA9ICcnKSB7IHN1Y2Nlc3MoKSB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvLnlh7rmtojmga9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dNZXNzYWdlKG1zZzogc3RyaW5nLCBpY29uOiBzdHJpbmcgPSAnbm9uZScpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2V5bGP5Yqf6IO944CCW+aKlumfs11cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlY29yZFZpZGVvKHR5cGU6IHN0cmluZyA9ICdzdGFydCcpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2V5bGP5YiG5LqrW+aKlumfs11cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNoYXJlUmVjb3JkVmlkZW8oc3VjY2VzczogRnVuY3Rpb24sIGZhaWw/OiBGdW5jdGlvbikgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/oh6rlrprkuYnmiZPngrnjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFsZFNka1NlbmRFdmVudChldmVudE5hbWUsIGRhdGEpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP5byA5aeL5omT54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbGRTZGtPblN0YXJ0KGRhdGEpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP6L+b6KGM5Lit5omT54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbGRTZGtPblJ1bm5pbmcoZGF0YSkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/nu5PmnZ/miZPngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFsZFNka09uRW5kKGRhdGEpIHsgfVxyXG5cclxuICAgIC8qKui3s+i9rOWIsOWFtuS7luWwj+a4uOaIjyAqL1xyXG4gICAgcHVibGljIG5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWwj+a4uOaIj++8jOWtkOexu+WunueOsO+8jGRhdGE6XCIsIGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==