
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/SDK/XiaoMiSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3a5bfpsRe5OSKVBXLGSuGFK', 'XiaoMiSDK');
// myGame/Script/Platform/SDK/XiaoMiSDK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SDK_1 = require("./SDK");
var XiaoMiSDK = /** @class */ (function (_super) {
    __extends(XiaoMiSDK, _super);
    function XiaoMiSDK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiName = 'qg';
        return _this;
    }
    XiaoMiSDK.prototype.init = function () {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log("系统信息：", this.systemInfo);
        // this.api.showShareMenu();
        // this.api.onShareAppMessage(() => ({}));
    };
    //视频广告
    XiaoMiSDK.prototype.showVideo = function (success, quit, fail) {
        var id = this.getVideoAdUnitId();
        if (!id) {
            this.resetVideoCb();
            success();
            return;
        }
        this.videoSuccess = success;
        this.videoQuit = quit;
        this.videoFail = fail;
        if (!this.videoAd) {
            this.videoAd = this.api.createRewardedVideoAd({
                adUnitId: id
            });
            this.videoAd.onError(this.onVideoFail.bind(this));
            this.videoAd.onClose(this.onCloseVideo.bind(this));
            this.videoAd.onLoad(function () {
                console.log("视频广告加载成功");
            });
        }
        this.videoAd.show();
    };
    /**视频广告关闭回调 */
    XiaoMiSDK.prototype.onCloseVideo = function (data) {
        if (!!data && !!data.isEnded) {
            this.onVideoSuccess();
        }
        else {
            this.onVideoQuit();
        }
    };
    //插屏广告
    XiaoMiSDK.prototype.showInterstitialAd = function () {
        //todo:小米快游戏暂时未提供插屏广告功能
        return;
        if (this.systemInfo.platformVersion < '1051') {
            console.log('平台版本过低，无法显示插屏广告');
            return;
        }
        var id = this.getInsertAdUnitId();
        if (!id)
            return;
        var ad = this.api.createInterstitialAd({
            adUnitId: id
        });
        if (!ad) {
            console.log("插屏广告实例创建失败");
            return;
        }
        ad.onLoad(function () {
            console.log("插屏广告加载成功");
        });
        ad.onError(function (err) {
            console.log("插屏广告加载错误：", err);
        });
        ad.onClose(function () {
            console.log("插屏广告被关闭");
        });
        ad.show();
    };
    return XiaoMiSDK;
}(SDK_1.default));
exports.default = XiaoMiSDK;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxTREtcXFhpYW9NaVNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQXdCO0FBRXhCO0lBQXVDLDZCQUFHO0lBQTFDO1FBQUEscUVBd0VDO1FBdkVXLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBdUVuQyxDQUFDO0lBckVVLHdCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLDRCQUE0QjtRQUM1QiwwQ0FBMEM7SUFDOUMsQ0FBQztJQUVELE1BQU07SUFDQyw2QkFBUyxHQUFoQixVQUFpQixPQUFpQixFQUFFLElBQWUsRUFBRSxJQUFlO1FBQ2hFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDTCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDMUMsUUFBUSxFQUFFLEVBQUU7YUFDZixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELGNBQWM7SUFDSixnQ0FBWSxHQUF0QixVQUF1QixJQUFJO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMxQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxNQUFNO0lBQ0Msc0NBQWtCLEdBQXpCO1FBQ0ksdUJBQXVCO1FBQ3ZCLE9BQU87UUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLE1BQU0sRUFBRTtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDL0IsT0FBTztTQUNWO1FBQ0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBQ2hCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7WUFDbkMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixPQUFPO1NBQ1Y7UUFDRCxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTCxnQkFBQztBQUFELENBeEVBLEFBd0VDLENBeEVzQyxhQUFHLEdBd0V6QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTREsgZnJvbSBcIi4vU0RLXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYaWFvTWlTREsgZXh0ZW5kcyBTREsge1xyXG4gICAgcHJpdmF0ZSBhcGlOYW1lOiBzdHJpbmcgPSAncWcnO1xyXG5cclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuYXBpID0gd2luZG93W3RoaXMuYXBpTmFtZV07XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1JbmZvID0gdGhpcy5hcGkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuezu+e7n+S/oeaBr++8mlwiLCB0aGlzLnN5c3RlbUluZm8pO1xyXG4gICAgICAgIC8vIHRoaXMuYXBpLnNob3dTaGFyZU1lbnUoKTtcclxuICAgICAgICAvLyB0aGlzLmFwaS5vblNoYXJlQXBwTWVzc2FnZSgoKSA9PiAoe30pKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+inhumikeW5v+WRilxyXG4gICAgcHVibGljIHNob3dWaWRlbyhzdWNjZXNzOiBGdW5jdGlvbiwgcXVpdD86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldFZpZGVvQWRVbml0SWQoKTtcclxuICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRWaWRlb0NiKCk7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpZGVvU3VjY2VzcyA9IHN1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy52aWRlb1F1aXQgPSBxdWl0O1xyXG4gICAgICAgIHRoaXMudmlkZW9GYWlsID0gZmFpbDtcclxuICAgICAgICBpZiAoIXRoaXMudmlkZW9BZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvQWQgPSB0aGlzLmFwaS5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IGlkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvQWQub25FcnJvcih0aGlzLm9uVmlkZW9GYWlsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvQWQub25DbG9zZSh0aGlzLm9uQ2xvc2VWaWRlby5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinhumikeW5v+WRiuWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aWRlb0FkLnNob3coKTtcclxuICAgIH1cclxuICAgIC8qKuinhumikeW5v+WRiuWFs+mXreWbnuiwgyAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2VWaWRlbyhkYXRhKSB7XHJcbiAgICAgICAgaWYgKCEhZGF0YSAmJiAhIWRhdGEuaXNFbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uVmlkZW9TdWNjZXNzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vblZpZGVvUXVpdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aPkuWxj+W5v+WRilxyXG4gICAgcHVibGljIHNob3dJbnRlcnN0aXRpYWxBZCgpIHtcclxuICAgICAgICAvL3RvZG865bCP57Gz5b+r5ri45oiP5pqC5pe25pyq5o+Q5L6b5o+S5bGP5bm/5ZGK5Yqf6IO9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnN5c3RlbUluZm8ucGxhdGZvcm1WZXJzaW9uIDwgJzEwNTEnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflubPlj7DniYjmnKzov4fkvY7vvIzml6Dms5XmmL7npLrmj5LlsY/lub/lkYonKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldEluc2VydEFkVW5pdElkKCk7XHJcbiAgICAgICAgaWYgKCFpZCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhZCA9IHRoaXMuYXBpLmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcclxuICAgICAgICAgICAgYWRVbml0SWQ6IGlkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFhZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuWunuS+i+WIm+W7uuWksei0pVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrliqDovb3plJnor6/vvJpcIiwgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhZC5vbkNsb3NlKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrooqvlhbPpl61cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWQuc2hvdygpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==