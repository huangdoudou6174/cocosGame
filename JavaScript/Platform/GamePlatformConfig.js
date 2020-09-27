
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/GamePlatformConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e157cWBuOBJoLEoRrAWFq0q', 'GamePlatformConfig');
// myGame/Script/Platform/GamePlatformConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GamePlatformType_1 = require("./GamePlatformType");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamePlatformConfig = /** @class */ (function (_super) {
    __extends(GamePlatformConfig, _super);
    function GamePlatformConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //平台。
        _this.type = GamePlatformType_1.GamePlatformType.PC;
        _this.appId = "";
        _this.secret = "";
        _this.ServiceAdress = "";
        _this.videoAdUnitId = [""];
        _this.BannerAdUnitId = [""];
        _this.InterstitialAdUnitId = [""];
        _this.share = true;
        _this.video = true;
        _this.banner = true;
        _this.interstitial = true;
        _this.vibrate = true;
        return _this;
    }
    __decorate([
        property({ type: cc.Enum(GamePlatformType_1.GamePlatformType) })
    ], GamePlatformConfig.prototype, "type", void 0);
    __decorate([
        property({
            displayName: "项目appId",
        })
    ], GamePlatformConfig.prototype, "appId", void 0);
    __decorate([
        property({
            displayName: "项目secret",
        })
    ], GamePlatformConfig.prototype, "secret", void 0);
    __decorate([
        property({
            displayName: "项目远程服务器地址",
        })
    ], GamePlatformConfig.prototype, "ServiceAdress", void 0);
    __decorate([
        property({
            displayName: "视频广告Id",
            type: [cc.String],
        })
    ], GamePlatformConfig.prototype, "videoAdUnitId", void 0);
    __decorate([
        property({
            displayName: "BannerId",
            type: [cc.String],
        })
    ], GamePlatformConfig.prototype, "BannerAdUnitId", void 0);
    __decorate([
        property({
            displayName: "插屏Id",
            type: [cc.String],
        })
    ], GamePlatformConfig.prototype, "InterstitialAdUnitId", void 0);
    __decorate([
        property({
            displayName: "开启激励分享",
            tooltip: "是否关闭激励分享，图标也会隐藏"
        })
    ], GamePlatformConfig.prototype, "share", void 0);
    __decorate([
        property({
            displayName: "开启视频广告",
            tooltip: "是否关闭视频广告，图标也会隐藏"
        })
    ], GamePlatformConfig.prototype, "video", void 0);
    __decorate([
        property({
            displayName: "开启Banner",
            tooltip: "是否关闭Banner"
        })
    ], GamePlatformConfig.prototype, "banner", void 0);
    __decorate([
        property({
            displayName: "开启插屏",
            tooltip: "是否关闭插屏"
        })
    ], GamePlatformConfig.prototype, "interstitial", void 0);
    __decorate([
        property({
            displayName: "开启震动",
            tooltip: "是否开启震动"
        })
    ], GamePlatformConfig.prototype, "vibrate", void 0);
    GamePlatformConfig = __decorate([
        ccclass
    ], GamePlatformConfig);
    return GamePlatformConfig;
}(cc.Component));
exports.default = GamePlatformConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxHYW1lUGxhdGZvcm1Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFzRDtBQUVoRCxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQWdELHNDQUFZO0lBRDVEO1FBQUEscUVBb0VDO1FBbEVHLEtBQUs7UUFFRSxVQUFJLEdBQXFCLG1DQUFnQixDQUFDLEVBQUUsQ0FBQztRQUs3QyxXQUFLLEdBQVcsRUFBRSxDQUFDO1FBS25CLFlBQU0sR0FBVyxFQUFFLENBQUM7UUFLcEIsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFNM0IsbUJBQWEsR0FBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBTS9CLG9CQUFjLEdBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQU1oQywwQkFBb0IsR0FBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBTXRDLFdBQUssR0FBWSxJQUFJLENBQUM7UUFNdEIsV0FBSyxHQUFZLElBQUksQ0FBQztRQU10QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBTXZCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBTTdCLGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBQ25DLENBQUM7SUFoRUc7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyxFQUFFLENBQUM7b0RBQ007SUFLcEQ7UUFIQyxRQUFRLENBQUM7WUFDTixXQUFXLEVBQUUsU0FBUztTQUN6QixDQUFDO3FEQUN3QjtJQUsxQjtRQUhDLFFBQVEsQ0FBQztZQUNOLFdBQVcsRUFBRSxVQUFVO1NBQzFCLENBQUM7c0RBQ3lCO0lBSzNCO1FBSEMsUUFBUSxDQUFDO1lBQ04sV0FBVyxFQUFFLFdBQVc7U0FDM0IsQ0FBQzs2REFDZ0M7SUFNbEM7UUFKQyxRQUFRLENBQUM7WUFDTixXQUFXLEVBQUUsUUFBUTtZQUNyQixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ3BCLENBQUM7NkRBQ29DO0lBTXRDO1FBSkMsUUFBUSxDQUFDO1lBQ04sV0FBVyxFQUFFLFVBQVU7WUFDdkIsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNwQixDQUFDOzhEQUNxQztJQU12QztRQUpDLFFBQVEsQ0FBQztZQUNOLFdBQVcsRUFBRSxNQUFNO1lBQ25CLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDcEIsQ0FBQztvRUFDMkM7SUFNN0M7UUFKQyxRQUFRLENBQUM7WUFDTixXQUFXLEVBQUUsUUFBUTtZQUNyQixPQUFPLEVBQUUsaUJBQWlCO1NBQzdCLENBQUM7cURBQzJCO0lBTTdCO1FBSkMsUUFBUSxDQUFDO1lBQ04sV0FBVyxFQUFFLFFBQVE7WUFDckIsT0FBTyxFQUFFLGlCQUFpQjtTQUM3QixDQUFDO3FEQUMyQjtJQU03QjtRQUpDLFFBQVEsQ0FBQztZQUNOLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLE9BQU8sRUFBRSxZQUFZO1NBQ3hCLENBQUM7c0RBQzRCO0lBTTlCO1FBSkMsUUFBUSxDQUFDO1lBQ04sV0FBVyxFQUFFLE1BQU07WUFDbkIsT0FBTyxFQUFFLFFBQVE7U0FDcEIsQ0FBQzs0REFDa0M7SUFNcEM7UUFKQyxRQUFRLENBQUM7WUFDTixXQUFXLEVBQUUsTUFBTTtZQUNuQixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDO3VEQUM2QjtJQWxFZCxrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQW1FdEM7SUFBRCx5QkFBQztDQW5FRCxBQW1FQyxDQW5FK0MsRUFBRSxDQUFDLFNBQVMsR0FtRTNEO2tCQW5Fb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVBsYXRmb3JtVHlwZSB9IGZyb20gXCIuL0dhbWVQbGF0Zm9ybVR5cGVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVQbGF0Zm9ybUNvbmZpZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgLy/lubPlj7DjgIJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKEdhbWVQbGF0Zm9ybVR5cGUpIH0pXG4gICAgcHVibGljIHR5cGU6IEdhbWVQbGF0Zm9ybVR5cGUgPSBHYW1lUGxhdGZvcm1UeXBlLlBDO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi6aG555uuYXBwSWRcIixcbiAgICB9KVxuICAgIHB1YmxpYyBhcHBJZDogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIumhueebrnNlY3JldFwiLFxuICAgIH0pXG4gICAgcHVibGljIHNlY3JldDogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIumhueebrui/nOeoi+acjeWKoeWZqOWcsOWdgFwiLFxuICAgIH0pXG4gICAgcHVibGljIFNlcnZpY2VBZHJlc3M6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLop4bpopHlub/lkYpJZFwiLFxuICAgICAgICB0eXBlOiBbY2MuU3RyaW5nXSxcbiAgICB9KVxuICAgIHB1YmxpYyB2aWRlb0FkVW5pdElkOiBzdHJpbmdbXSA9IFtcIlwiXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIkJhbm5lcklkXCIsXG4gICAgICAgIHR5cGU6IFtjYy5TdHJpbmddLFxuICAgIH0pXG4gICAgcHVibGljIEJhbm5lckFkVW5pdElkOiBzdHJpbmdbXSA9IFtcIlwiXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuaPkuWxj0lkXCIsXG4gICAgICAgIHR5cGU6IFtjYy5TdHJpbmddLFxuICAgIH0pXG4gICAgcHVibGljIEludGVyc3RpdGlhbEFkVW5pdElkOiBzdHJpbmdbXSA9IFtcIlwiXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuW8gOWQr+a/gOWKseWIhuS6q1wiLFxuICAgICAgICB0b29sdGlwOiBcIuaYr+WQpuWFs+mXrea/gOWKseWIhuS6q++8jOWbvuagh+S5n+S8mumakOiXj1wiXG4gICAgfSlcbiAgICBwdWJsaWMgc2hhcmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5byA5ZCv6KeG6aKR5bm/5ZGKXCIsXG4gICAgICAgIHRvb2x0aXA6IFwi5piv5ZCm5YWz6Zet6KeG6aKR5bm/5ZGK77yM5Zu+5qCH5Lmf5Lya6ZqQ6JePXCJcbiAgICB9KVxuICAgIHB1YmxpYyB2aWRlbzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLlvIDlkK9CYW5uZXJcIixcbiAgICAgICAgdG9vbHRpcDogXCLmmK/lkKblhbPpl61CYW5uZXJcIlxuICAgIH0pXG4gICAgcHVibGljIGJhbm5lcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLlvIDlkK/mj5LlsY9cIixcbiAgICAgICAgdG9vbHRpcDogXCLmmK/lkKblhbPpl63mj5LlsY9cIlxuICAgIH0pXG4gICAgcHVibGljIGludGVyc3RpdGlhbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLlvIDlkK/pnIfliqhcIixcbiAgICAgICAgdG9vbHRpcDogXCLmmK/lkKblvIDlkK/pnIfliqhcIlxuICAgIH0pXG4gICAgcHVibGljIHZpYnJhdGU6IGJvb2xlYW4gPSB0cnVlO1xufVxuIl19