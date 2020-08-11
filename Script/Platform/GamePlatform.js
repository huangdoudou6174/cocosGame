
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Platform/GamePlatform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3de2sLG2lCR4GQeWSEh34p', 'GamePlatform');
// myGame/Script/Platform/GamePlatform.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GamePlatformConfig_1 = require("./GamePlatformConfig");
var GamePlatformType_1 = require("./GamePlatformType");
var SDK_1 = require("./SDK/SDK");
var WXSDK_1 = require("./SDK/WXSDK");
var TTSDK_1 = require("./SDK/TTSDK");
var OPPOSDK_1 = require("./SDK/OPPOSDK");
var VIVOSDK_1 = require("./SDK/VIVOSDK");
var QQSDK_1 = require("./SDK/QQSDK");
var XiaoMiSDK_1 = require("./SDK/XiaoMiSDK");
var GamePlatform = /** @class */ (function () {
    function GamePlatform() {
        this._config = null;
        this._sdk = null;
    }
    Object.defineProperty(GamePlatform, "instance", {
        get: function () {
            if (!GamePlatform._instance) {
                GamePlatform._instance = new GamePlatform();
            }
            return GamePlatform._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamePlatform.prototype, "Config", {
        /**
         * 平台设置参数
         */
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamePlatform, "SDK", {
        /**
         * SDK
         */
        get: function () {
            if (!GamePlatform.instance._sdk) {
                GamePlatform.instance.setDefaultSdk();
            }
            return GamePlatform.instance._sdk;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化SDK
     */
    GamePlatform.prototype.init = function (param) {
        console.log(param);
        this._config = param;
        switch (param.type) {
            case GamePlatformType_1.GamePlatformType.PC:
                this._sdk = new SDK_1.default(); //默认不继承。
                break;
            case GamePlatformType_1.GamePlatformType.WX:
                this._sdk = new WXSDK_1.default();
                break;
            case GamePlatformType_1.GamePlatformType.TT:
                this._sdk = new TTSDK_1.default();
                break;
            case GamePlatformType_1.GamePlatformType.QQ:
                this._sdk = new QQSDK_1.default();
                break;
            case GamePlatformType_1.GamePlatformType.OPPO:
                this._sdk = new OPPOSDK_1.default();
                break;
            case GamePlatformType_1.GamePlatformType.VIVO:
                this._sdk = new VIVOSDK_1.default();
                break;
            case GamePlatformType_1.GamePlatformType.XiaoMi: {
                this._sdk = new XiaoMiSDK_1.default();
                break;
            }
        }
        this._sdk.init();
        this._sdk.onEvents();
    };
    /**
     * 设置默认sdk[PC];
     */
    GamePlatform.prototype.setDefaultSdk = function () {
        var param = new GamePlatformConfig_1.default();
        param.type = GamePlatformType_1.GamePlatformType.PC;
        param.appId = "";
        param.secret = "";
        param.share = true;
        param.video = true;
        param.banner = false;
        param.interstitial = false;
        param.vibrate = true;
        param.videoAdUnitId = [""];
        param.BannerAdUnitId = [""];
        param.InterstitialAdUnitId = [""];
        this.init(param);
    };
    return GamePlatform;
}());
exports.default = GamePlatform;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFBsYXRmb3JtXFxHYW1lUGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUN0RCx1REFBc0Q7QUFDdEQsaUNBQTRCO0FBQzVCLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFDaEMseUNBQW9DO0FBQ3BDLHlDQUFvQztBQUNwQyxxQ0FBZ0M7QUFDaEMsNkNBQXdDO0FBR3hDO0lBQUE7UUFlWSxZQUFPLEdBQXVCLElBQUksQ0FBQztRQVduQyxTQUFJLEdBQVEsSUFBSSxDQUFDO0lBd0Q3QixDQUFDO0lBaEZHLHNCQUFrQix3QkFBUTthQUExQjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFO2dCQUN6QixZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7YUFDL0M7WUFDRCxPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVyxnQ0FBTTtRQUhqQjs7V0FFRzthQUNIO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBTUQsc0JBQWtCLG1CQUFHO1FBSHJCOztXQUVHO2FBQ0g7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQzdCLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDekM7WUFDRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBR0Q7O09BRUc7SUFDSSwyQkFBSSxHQUFYLFVBQVksS0FBeUI7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEIsS0FBSyxtQ0FBZ0IsQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBRyxFQUFFLENBQUMsQ0FBQyxRQUFRO2dCQUMvQixNQUFNO1lBQ1YsS0FBSyxtQ0FBZ0IsQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU07WUFDVixLQUFLLG1DQUFnQixDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztnQkFDeEIsTUFBTTtZQUNWLEtBQUssbUNBQWdCLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO2dCQUN4QixNQUFNO1lBQ1YsS0FBSyxtQ0FBZ0IsQ0FBQyxJQUFJO2dCQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxtQ0FBZ0IsQ0FBQyxJQUFJO2dCQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztnQkFDNUIsTUFBTTthQUNUO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssb0NBQWEsR0FBckI7UUFDSSxJQUFJLEtBQUssR0FBdUIsSUFBSSw0QkFBa0IsRUFBRSxDQUFDO1FBQ3pELEtBQUssQ0FBQyxJQUFJLEdBQUcsbUNBQWdCLENBQUMsRUFBRSxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixLQUFLLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQWxGQSxBQWtGQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVQbGF0Zm9ybUNvbmZpZyBmcm9tIFwiLi9HYW1lUGxhdGZvcm1Db25maWdcIjtcbmltcG9ydCB7IEdhbWVQbGF0Zm9ybVR5cGUgfSBmcm9tIFwiLi9HYW1lUGxhdGZvcm1UeXBlXCI7XG5pbXBvcnQgU0RLIGZyb20gXCIuL1NESy9TREtcIjtcbmltcG9ydCBXWFNESyBmcm9tIFwiLi9TREsvV1hTREtcIjtcbmltcG9ydCBUVFNESyBmcm9tIFwiLi9TREsvVFRTREtcIjtcbmltcG9ydCBPUFBPU0RLIGZyb20gXCIuL1NESy9PUFBPU0RLXCI7XG5pbXBvcnQgVklWT1NESyBmcm9tIFwiLi9TREsvVklWT1NES1wiO1xuaW1wb3J0IFFRU0RLIGZyb20gXCIuL1NESy9RUVNES1wiO1xuaW1wb3J0IFhpYW9NaVNESyBmcm9tIFwiLi9TREsvWGlhb01pU0RLXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBsYXRmb3JtIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVQbGF0Zm9ybTtcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBHYW1lUGxhdGZvcm0ge1xuICAgICAgICBpZiAoIUdhbWVQbGF0Zm9ybS5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEdhbWVQbGF0Zm9ybS5faW5zdGFuY2UgPSBuZXcgR2FtZVBsYXRmb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEdhbWVQbGF0Zm9ybS5faW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bmz5Y+w6K6+572u5Y+C5pWwXG4gICAgICovXG4gICAgcHVibGljIGdldCBDb25maWcoKTogR2FtZVBsYXRmb3JtQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICB9XG4gICAgcHJpdmF0ZSBfY29uZmlnOiBHYW1lUGxhdGZvcm1Db25maWcgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU0RLXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXQgU0RLKCk6IFNESyB7XG4gICAgICAgIGlmICghR2FtZVBsYXRmb3JtLmluc3RhbmNlLl9zZGspIHtcbiAgICAgICAgICAgIEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5zZXREZWZhdWx0U2RrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEdhbWVQbGF0Zm9ybS5pbnN0YW5jZS5fc2RrO1xuICAgIH1cbiAgICBwcml2YXRlIF9zZGs6IFNESyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZTREtcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdChwYXJhbTogR2FtZVBsYXRmb3JtQ29uZmlnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtKTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gcGFyYW07XG4gICAgICAgIHN3aXRjaCAocGFyYW0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBHYW1lUGxhdGZvcm1UeXBlLlBDOlxuICAgICAgICAgICAgICAgIHRoaXMuX3NkayA9IG5ldyBTREsoKTsgLy/pu5jorqTkuI3nu6fmib/jgIJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgR2FtZVBsYXRmb3JtVHlwZS5XWDpcbiAgICAgICAgICAgICAgICB0aGlzLl9zZGsgPSBuZXcgV1hTREsoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgR2FtZVBsYXRmb3JtVHlwZS5UVDpcbiAgICAgICAgICAgICAgICB0aGlzLl9zZGsgPSBuZXcgVFRTREsoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgR2FtZVBsYXRmb3JtVHlwZS5RUTpcbiAgICAgICAgICAgICAgICB0aGlzLl9zZGsgPSBuZXcgUVFTREsoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgR2FtZVBsYXRmb3JtVHlwZS5PUFBPOlxuICAgICAgICAgICAgICAgIHRoaXMuX3NkayA9IG5ldyBPUFBPU0RLKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEdhbWVQbGF0Zm9ybVR5cGUuVklWTzpcbiAgICAgICAgICAgICAgICB0aGlzLl9zZGsgPSBuZXcgVklWT1NESygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBHYW1lUGxhdGZvcm1UeXBlLlhpYW9NaToge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NkayA9IG5ldyBYaWFvTWlTREsoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Nkay5pbml0KCk7XG4gICAgICAgIHRoaXMuX3Nkay5vbkV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rum7mOiupHNka1tQQ107XG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXREZWZhdWx0U2RrKCkge1xuICAgICAgICB2YXIgcGFyYW06IEdhbWVQbGF0Zm9ybUNvbmZpZyA9IG5ldyBHYW1lUGxhdGZvcm1Db25maWcoKTtcbiAgICAgICAgcGFyYW0udHlwZSA9IEdhbWVQbGF0Zm9ybVR5cGUuUEM7XG4gICAgICAgIHBhcmFtLmFwcElkID0gXCJcIjtcbiAgICAgICAgcGFyYW0uc2VjcmV0ID0gXCJcIjtcbiAgICAgICAgcGFyYW0uc2hhcmUgPSB0cnVlO1xuICAgICAgICBwYXJhbS52aWRlbyA9IHRydWU7XG4gICAgICAgIHBhcmFtLmJhbm5lciA9IGZhbHNlO1xuICAgICAgICBwYXJhbS5pbnRlcnN0aXRpYWwgPSBmYWxzZTtcbiAgICAgICAgcGFyYW0udmlicmF0ZSA9IHRydWU7XG4gICAgICAgIHBhcmFtLnZpZGVvQWRVbml0SWQgPSBbXCJcIl07XG4gICAgICAgIHBhcmFtLkJhbm5lckFkVW5pdElkID0gW1wiXCJdO1xuICAgICAgICBwYXJhbS5JbnRlcnN0aXRpYWxBZFVuaXRJZCA9IFtcIlwiXTtcblxuICAgICAgICB0aGlzLmluaXQocGFyYW0pO1xuICAgIH1cbn1cbiJdfQ==