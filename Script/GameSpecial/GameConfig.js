
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/GameSpecial/GameConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb1e6Bo8ulNVJoiOnzwat9r', 'GameConfig');
// myGame/Script/GameSpecial/GameConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 全局使用的游戏配置，只包含静态数据
 */
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    /**远程资源服务器地址 */
    GameConfig.resourceUrl = "";
    /**远程资源服务器上本游戏使用的文件夹名称 */
    GameConfig.serverGameName = "myGame";
    /**游戏名称字符串 */
    GameConfig.gameName = "myGame";
    /**
     * 游戏规则
     */
    GameConfig.GameRule = {};
    //触摸操作参数
    GameConfig.ctrlConfig = {};
    return GameConfig;
}());
exports.default = GameConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEdhbWVTcGVjaWFsXFxHYW1lQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNIO0lBQ0k7SUFBd0IsQ0FBQztJQUV6QixlQUFlO0lBQ0Qsc0JBQVcsR0FBVyxFQUFFLENBQUM7SUFDdkMseUJBQXlCO0lBQ1gseUJBQWMsR0FBVyxRQUFRLENBQUM7SUFFaEQsYUFBYTtJQUNDLG1CQUFRLEdBQVcsUUFBUSxDQUFDO0lBQzFDOztPQUVHO0lBQ1csbUJBQVEsR0FBRyxFQUV4QixDQUFDO0lBQ0YsUUFBUTtJQUNNLHFCQUFVLEdBQUcsRUFFMUIsQ0FBQztJQUVOLGlCQUFDO0NBckJELEFBcUJDLElBQUE7a0JBckJvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlhajlsYDkvb/nlKjnmoTmuLjmiI/phY3nva7vvIzlj6rljIXlkKvpnZnmgIHmlbDmja5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZyB7XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgLyoq6L+c56iL6LWE5rqQ5pyN5Yqh5Zmo5Zyw5Z2AICovXG4gICAgcHVibGljIHN0YXRpYyByZXNvdXJjZVVybDogc3RyaW5nID0gXCJcIjtcbiAgICAvKirov5znqIvotYTmupDmnI3liqHlmajkuIrmnKzmuLjmiI/kvb/nlKjnmoTmlofku7blpLnlkI3np7AgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNlcnZlckdhbWVOYW1lOiBzdHJpbmcgPSBcIm15R2FtZVwiO1xuXG4gICAgLyoq5ri45oiP5ZCN56ew5a2X56ym5LiyICovXG4gICAgcHVibGljIHN0YXRpYyBnYW1lTmFtZTogc3RyaW5nID0gXCJteUdhbWVcIjtcbiAgICAvKipcbiAgICAgKiDmuLjmiI/op4TliJlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEdhbWVSdWxlID0ge1xuXG4gICAgfTtcbiAgICAvL+inpuaRuOaTjeS9nOWPguaVsFxuICAgIHB1YmxpYyBzdGF0aWMgY3RybENvbmZpZyA9IHtcblxuICAgIH07XG5cbn0iXX0=