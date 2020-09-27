
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/GameDirector/GameDirector.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b9f70zXzMFMUaRagDikwq1r', 'GameDirector');
// myGame/Script/GameDirector/GameDirector.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var AudioManager_1 = require("../Common/AudioManager");
var GameConfig_1 = require("../GameSpecial/GameConfig");
var PlayerData_1 = require("../Common/PlayerData");
var PowerManager_1 = require("../Common/PowerManager");
var GlobalPool_1 = require("../Common/GlobalPool");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var Loader_1 = require("../Common/Loader");
var GameData_1 = require("../Common/GameData");
var UIManager_1 = require("../Common/UIManager");
var LevelController_1 = require("../Level/LevelController");
//游戏流程管理器
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏流程总管理器
 *
 * 游戏流程：
 *
 * 登录:
 * 登录账号
 * 获取玩家数据
 *
 * 进入首页：
 * 加载首页资源
 * 显示首页UI
 *
 * 开始游戏：
 * 加载关卡数据
 * 加载关卡资源
 * 进入关卡
 * 隐藏首页UI
 *
 * 关卡结束：
 * 加载结算UI资源
 * 显示结算UI
 *
 * 继续下一关：
 * 退出当前关卡
 * 回收当前关卡资源
 * 加载关卡数据
 * 加载关卡资源
 * 进入关卡
 *
 * 重玩当前关：
 * 重置关卡状态
 * 进入关卡
 *
 * 返回首页：
 * 退出关卡
 * 回收关卡资源
 * 显示首页UI
 */
var GameDirector = /** @class */ (function (_super) {
    __extends(GameDirector, _super);
    function GameDirector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiLayer = null;
        _this.bg = null;
        /**出没遮罩层，阻挡玩家触摸操作 */
        _this.touchMask = null;
        //UI:
        //只能在首页中时才显示的UI
        _this.lobbyUIs = [];
        //只能在关卡中时才显示的UI
        _this.levelUIs = [];
        //可在任意情况下显示的UI
        _this.persistUIs = [];
        //关卡数据
        _this.levelMng = null;
        _this.levelData = null;
        //脚本自身需要使用的数据：
        _this.levelCount = 0; //记录玩家玩的关卡次数，用于判定结算界面是显示banner还是插屏广告
        return _this;
    }
    GameDirector.prototype.start = function () {
        this.init();
        this.loadGameData();
    };
    GameDirector.prototype.init = function () {
        this.levelCount = 0;
        this.initUIConfig();
        this.initTouchMask();
        this.initModels();
        this.onEvents();
    };
    GameDirector.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.DirectorEvent.startGame, this.onStartGame, this);
        this.on(GameEventType_1.EventType.DirectorEvent.enterLobby, this.enterGameLobby, this);
        this.on(GameEventType_1.EventType.DirectorEvent.playNextLevel, this.onPlayNextLevel, this);
        this.on(GameEventType_1.EventType.DirectorEvent.replayCurLevel, this.onReplayCurLevel, this);
        this.on(GameEventType_1.EventType.DirectorEvent.playerWin, this.onLevelWin, this);
        this.on(GameEventType_1.EventType.DirectorEvent.playerLose, this.onLevelLose, this);
        this.on(GameEventType_1.EventType.DirectorEvent.hideGameLobby, this.hideGameLobbyUI, this);
        this.on(GameEventType_1.EventType.UIEvent.showTouchMask, this.showTouchMask, this);
        this.on(GameEventType_1.EventType.UIEvent.hideTouchMask, this.hideTouchMask, this);
    };
    GameDirector.prototype.initUIConfig = function () {
        this.lobbyUIs = [];
        this.lobbyUIs.push(GlobalEnum_1.GlobalEnum.UI.lobby);
        this.lobbyUIs.push(GlobalEnum_1.GlobalEnum.UI.shop);
        this.levelUIs = [];
        this.levelUIs.push(GlobalEnum_1.GlobalEnum.UI.levelInfo);
        this.levelUIs.push(GlobalEnum_1.GlobalEnum.UI.levelTeach);
        this.levelUIs.push(GlobalEnum_1.GlobalEnum.UI.winUI);
        this.levelUIs.push(GlobalEnum_1.GlobalEnum.UI.loseUI);
        this.persistUIs = [];
        this.persistUIs.push(GlobalEnum_1.GlobalEnum.UI.playerAssetBar);
        this.persistUIs.push(GlobalEnum_1.GlobalEnum.UI.tipPower);
        this.persistUIs.push(GlobalEnum_1.GlobalEnum.UI.getPower);
    };
    GameDirector.prototype.initModels = function () {
        //UI
        UIManager_1.default.init(this.node.getChildByName("UI"));
        //todo:测试：重置玩家数据，需要再次重置时，将needResetPlayerData字符串最后一位数字加1
        var resetPlayerData = cc.sys.localStorage.getItem(GameConfig_1.default.gameName + "needResetPlayerData1");
        if (!resetPlayerData) {
            cc.sys.localStorage.setItem(GameConfig_1.default.gameName + "needResetPlayerData1", JSON.stringify(true));
        }
        PlayerData_1.default.init();
        AudioManager_1.default.init();
        GameData_1.default.init();
        Loader_1.default.init();
        PowerManager_1.default.init();
    };
    GameDirector.prototype.initTouchMask = function () {
        this.touchMask.active = false;
        this.touchMaskCount = 0;
    };
    /**加载全部游戏数据（json文件） */
    GameDirector.prototype.loadGameData = function () {
        var _this = this;
        Loader_1.default.loadResDir("myGame/GameData", function (res) {
            var urls = [];
            for (var i = 0, c = res.length; i < c; ++i) {
                urls.push(res[i].name);
            }
            _this.onLoadGameDataFinish(res, urls);
        }, cc.JsonAsset);
    };
    /**游戏数据加载完毕，分别保存 */
    GameDirector.prototype.onLoadGameDataFinish = function (res, urls) {
        GameData_1.default.setData(res, urls);
        this.enterGameLobby();
    };
    GameDirector.prototype.getUrlsIndex = function (name, urls) {
        for (var i = urls.length - 1; i >= 0; --i) {
            if (urls[i].indexOf(name) >= 0) {
                return i;
            }
        }
        return -1;
    };
    /**显示一层遮罩，阻挡玩家操作 */
    GameDirector.prototype.showTouchMask = function (count) {
        if (count === void 0) { count = 1; }
        this.touchMaskCount += count;
        this.touchMask.active = true;
    };
    /**移除一层遮罩，遮罩层数为0时玩家才能进行操作 */
    GameDirector.prototype.hideTouchMask = function (count) {
        if (count === void 0) { count = 1; }
        this.touchMaskCount -= count;
        if (this.touchMaskCount <= 0) {
            this.touchMaskCount = 0;
            this.touchMask.active = false;
        }
    };
    /**暂停关卡 */
    GameDirector.prototype.pauseLevel = function () {
        this.emit(GameEventType_1.EventType.DirectorEvent.pauseLevel);
    };
    /**恢复关卡 */
    GameDirector.prototype.resumeLevel = function () {
        this.emit(GameEventType_1.EventType.DirectorEvent.resumeLevel);
    };
    GameDirector.prototype.reset = function () {
        this.exitLevel();
        this.resetTouchMask();
    };
    GameDirector.prototype.resetTouchMask = function () {
        this.touchMask.active = false;
        this.touchMaskCount = 0;
    };
    GameDirector.prototype.showUI = function (ui, data) {
        this.emit(GameEventType_1.EventType.UIEvent.enter, ui, data);
    };
    GameDirector.prototype.showUIs = function (uis) {
        for (var i = uis.length - 1; i >= 0; --i) {
            this.emit(GameEventType_1.EventType.UIEvent.enter, uis[i]);
        }
    };
    GameDirector.prototype.hideUI = function (ui) {
        this.emit(GameEventType_1.EventType.UIEvent.exit, ui);
    };
    GameDirector.prototype.hideUIs = function (uis) {
        for (var i = uis.length - 1; i >= 0; --i) {
            this.emit(GameEventType_1.EventType.UIEvent.exit, uis[i]);
        }
    };
    //进入首页
    GameDirector.prototype.enterGameLobby = function () {
        if (!!this.levelMng) {
            this.levelMng.exit();
        }
        this.showGameLobbyUI();
    };
    //显示首页UI
    GameDirector.prototype.showGameLobbyUI = function () {
        this.hideUIs(this.levelUIs);
        this.hideUIs(this.persistUIs);
        this.showUI(GlobalEnum_1.GlobalEnum.UI.lobby);
        this.showUI(GlobalEnum_1.GlobalEnum.UI.playerAssetBar);
    };
    //隐藏首页UI 
    GameDirector.prototype.hideGameLobbyUI = function () {
        this.bg.active = false;
        this.hideUIs(this.lobbyUIs);
        this.hideUIs(this.persistUIs);
        this.hideUI(GlobalEnum_1.GlobalEnum.UI.lobby);
    };
    //开始游戏：
    GameDirector.prototype.onStartGame = function () {
        if (!this.levelMng) {
            // Loader.loadSubpackage("Level", this.loadLevelCommonAsset.bind(this), true);
            this.loadLevelCommonAsset();
        }
        else {
            this.enterLevel();
        }
    };
    //加载关卡场景所需的通用资源并创建对象池
    GameDirector.prototype.loadLevelCommonAsset = function () {
        var _this = this;
        Loader_1.default.loadResDir("myGame/Prefab/LevelAsset", function (assets) {
            for (var i = assets.length - 1; i >= 0; --i) {
                var prefab = assets[i];
                GlobalPool_1.default.createPool(prefab.name, prefab, prefab.name);
            }
            _this.loadLevelManager();
        });
    };
    //加载关卡场景管理器
    GameDirector.prototype.loadLevelManager = function () {
        var _this = this;
        Loader_1.default.loadRes("myGame/Prefab/LevelManager", function (res) {
            var node = cc.instantiate(res);
            _this.node.getChildByName("LevelManager").addChild(node);
            _this.levelMng = node.getComponent("LevelManager");
            _this.levelMng.init();
            // this.enterLevel();
            _this.loadLevelController();
        });
    };
    GameDirector.prototype.loadLevelController = function () {
        var _this = this;
        Loader_1.default.loadRes("myGame/Prefab/UI/LevelController", function (res) {
            var node = cc.instantiate(res);
            _this.uiLayer.getChildByName("LevelController").addChild(node);
            var js = node.getComponent(LevelController_1.default);
            js.init();
            js.setDisable();
            _this.enterLevel();
        });
    };
    //进入关卡
    GameDirector.prototype.enterLevel = function (level) {
        if (!level) {
            level = this.getCurLevel();
        }
        //todo:测试
        level = 1;
        //进入关卡:
        this.hideGameLobbyUI();
        this.hideUIs(this.levelUIs);
        var levelData = this.getLevelData(level);
        this.levelMng.enterLevel(levelData);
        this.showUI(GlobalEnum_1.GlobalEnum.UI.levelInfo, levelData);
        this.showTeachAnim();
    };
    //获取玩家当前能进入的关卡
    GameDirector.prototype.getCurLevel = function () {
        return PlayerData_1.default.getData("gameData.curLevel");
    };
    //获取关卡数据
    GameDirector.prototype.getLevelData = function (level) {
        level = 1; //todo
        // let data = GameData.getLevelData(level);
        var data = {
            id: 1,
        };
        return data;
    };
    //显示教学动画
    GameDirector.prototype.showTeachAnim = function () {
        var teached = cc.sys.localStorage.getItem(GameConfig_1.default.gameName + "teached");
        if (!!teached && !!JSON.parse(teached))
            return;
        this.showUI(GlobalEnum_1.GlobalEnum.UI.levelTeach);
    };
    //关卡胜利
    GameDirector.prototype.onLevelWin = function () {
        this.addCurLevel();
        this.showUI(GlobalEnum_1.GlobalEnum.UI.winUI);
    };
    //关卡进度+1
    GameDirector.prototype.addCurLevel = function () {
        this.emit(GameEventType_1.EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData.curLevel",
            value: 1,
            mode: "+",
        });
    };
    //关卡失败
    GameDirector.prototype.onLevelLose = function () {
        this.showUI(GlobalEnum_1.GlobalEnum.UI.loseUI);
    };
    //继续下一关
    GameDirector.prototype.onPlayNextLevel = function () {
        this.exitCurLevel();
        this.putBackCurLevelAsset();
        this.enterLevel();
    };
    //退出当前关卡
    GameDirector.prototype.exitCurLevel = function () {
        this.levelMng.exit();
    };
    //回收当前关卡使用的资源
    GameDirector.prototype.putBackCurLevelAsset = function () {
    };
    //重玩当前关卡
    GameDirector.prototype.onReplayCurLevel = function () {
        this.resetCurLevel();
        this.putBackCurLevelAsset();
        this.enterLevel();
    };
    //重置当前关卡状态
    GameDirector.prototype.resetCurLevel = function () {
        this.levelMng.reset();
    };
    //返回首页
    GameDirector.prototype.onComeBackGameLobby = function () {
        this.exitLevel();
        this.putBackLevelAsset();
        this.showGameLobbyUI();
    };
    //彻底退出关卡场景
    GameDirector.prototype.exitLevel = function () {
        if (!!this.levelMng)
            this.levelMng.exit();
    };
    //回收关卡场景的全部资源
    GameDirector.prototype.putBackLevelAsset = function () {
    };
    __decorate([
        property(cc.Node)
    ], GameDirector.prototype, "uiLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameDirector.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], GameDirector.prototype, "touchMask", void 0);
    GameDirector = __decorate([
        ccclass
    ], GameDirector);
    return GameDirector;
}(yyComponent_1.default));
exports.default = GameDirector;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEdhbWVEaXJlY3RvclxcR2FtZURpcmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFaEQsOERBQXlEO0FBQ3pELHVEQUFrRDtBQUNsRCx3REFBbUQ7QUFDbkQsbURBQThDO0FBQzlDLHVEQUFrRDtBQUNsRCxtREFBOEM7QUFDOUMsd0RBQXVEO0FBQ3ZELDJDQUFzQztBQUN0QywrQ0FBMEM7QUFDMUMsaURBQTRDO0FBQzVDLDREQUF1RDtBQUV2RCxTQUFTO0FBQ0gsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFFSDtJQUEwQyxnQ0FBVztJQURyRDtRQUFBLHFFQWlVQztRQTlUYSxhQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFDN0Isb0JBQW9CO1FBRVYsZUFBUyxHQUFZLElBQUksQ0FBQztRQUlwQyxLQUFLO1FBQ0wsZUFBZTtRQUNMLGNBQVEsR0FBb0IsRUFBRSxDQUFDO1FBQ3pDLGVBQWU7UUFDTCxjQUFRLEdBQW9CLEVBQUUsQ0FBQztRQUN6QyxjQUFjO1FBQ0osZ0JBQVUsR0FBb0IsRUFBRSxDQUFDO1FBQzNDLE1BQU07UUFDSSxjQUFRLEdBQWlCLElBQUksQ0FBQztRQUM5QixlQUFTLEdBQVEsSUFBSSxDQUFDO1FBRWhDLGNBQWM7UUFDSixnQkFBVSxHQUFXLENBQUMsQ0FBQyxDQUFBLG9DQUFvQzs7SUF5U3pFLENBQUM7SUF2U0csNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sMkJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLElB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QVBuQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBZ1VoQztJQUFELG1CQUFDO0NBaFVELEFBZ1VDLENBaFV5QyxxQkFBVyxHQWdVcEQ7a0JBaFVvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcbmltcG9ydCBMZXZlbE1hbmFnZXIgZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSBcIi4uL0NvbW1vbi9BdWRpb01hbmFnZXJcIjtcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HYW1lQ29uZmlnXCI7XG5pbXBvcnQgUGxheWVyRGF0YSBmcm9tIFwiLi4vQ29tbW9uL1BsYXllckRhdGFcIjtcbmltcG9ydCBQb3dlck1hbmFnZXIgZnJvbSBcIi4uL0NvbW1vbi9Qb3dlck1hbmFnZXJcIjtcbmltcG9ydCBHbG9iYWxQb29sIGZyb20gXCIuLi9Db21tb24vR2xvYmFsUG9vbFwiO1xuaW1wb3J0IHsgR2xvYmFsRW51bSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HbG9iYWxFbnVtXCI7XG5pbXBvcnQgTG9hZGVyIGZyb20gXCIuLi9Db21tb24vTG9hZGVyXCI7XG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL0NvbW1vbi9HYW1lRGF0YVwiO1xuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vQ29tbW9uL1VJTWFuYWdlclwiO1xuaW1wb3J0IExldmVsQ29udHJvbGxlciBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxDb250cm9sbGVyXCI7XG5cbi8v5ri45oiP5rWB56iL566h55CG5ZmoXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipcbiAqIOa4uOaIj+a1geeoi+aAu+euoeeQhuWZqFxuICogXG4gKiDmuLjmiI/mtYHnqIvvvJpcbiAqIFxuICog55m75b2VOlxuICog55m75b2V6LSm5Y+3XG4gKiDojrflj5bnjqnlrrbmlbDmja5cbiAqIFxuICog6L+b5YWl6aaW6aG177yaXG4gKiDliqDovb3pppbpobXotYTmupBcbiAqIOaYvuekuummlumhtVVJXG4gKiBcbiAqIOW8gOWni+a4uOaIj++8mlxuICog5Yqg6L295YWz5Y2h5pWw5o2uXG4gKiDliqDovb3lhbPljaHotYTmupBcbiAqIOi/m+WFpeWFs+WNoVxuICog6ZqQ6JeP6aaW6aG1VUlcbiAqIFxuICog5YWz5Y2h57uT5p2f77yaXG4gKiDliqDovb3nu5PnrpdVSei1hOa6kFxuICog5pi+56S657uT566XVUlcbiAqIFxuICog57un57ut5LiL5LiA5YWz77yaXG4gKiDpgIDlh7rlvZPliY3lhbPljaFcbiAqIOWbnuaUtuW9k+WJjeWFs+WNoei1hOa6kFxuICog5Yqg6L295YWz5Y2h5pWw5o2uXG4gKiDliqDovb3lhbPljaHotYTmupBcbiAqIOi/m+WFpeWFs+WNoVxuICogXG4gKiDph43njqnlvZPliY3lhbPvvJpcbiAqIOmHjee9ruWFs+WNoeeKtuaAgVxuICog6L+b5YWl5YWz5Y2hXG4gKiBcbiAqIOi/lOWbnummlumhte+8mlxuICog6YCA5Ye65YWz5Y2hXG4gKiDlm57mlLblhbPljaHotYTmupBcbiAqIOaYvuekuummlumhtVVJXG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGlyZWN0b3IgZXh0ZW5kcyB5eUNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIHVpTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByb3RlY3RlZCBiZzogY2MuTm9kZSA9IG51bGw7XG4gICAgLyoq5Ye65rKh6YGu572p5bGC77yM6Zi75oyh546p5a626Kem5pG45pON5L2cICovXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIHRvdWNoTWFzazogY2MuTm9kZSA9IG51bGw7XG4gICAgLyoq6K6w5b2V6ZyA6KaB5pi+56S66YGu572p55qE5qyh5pWw77yM5qyh5pWw5Li6MOaXtumakOiXj+mBrue9qeWxgiAqL1xuICAgIHByb3RlY3RlZCB0b3VjaE1hc2tDb3VudDogbnVtYmVyO1xuXG4gICAgLy9VSTpcbiAgICAvL+WPquiDveWcqOmmlumhteS4reaXtuaJjeaYvuekuueahFVJXG4gICAgcHJvdGVjdGVkIGxvYmJ5VUlzOiBHbG9iYWxFbnVtLlVJW10gPSBbXTtcbiAgICAvL+WPquiDveWcqOWFs+WNoeS4reaXtuaJjeaYvuekuueahFVJXG4gICAgcHJvdGVjdGVkIGxldmVsVUlzOiBHbG9iYWxFbnVtLlVJW10gPSBbXTtcbiAgICAvL+WPr+WcqOS7u+aEj+aDheWGteS4i+aYvuekuueahFVJXG4gICAgcHJvdGVjdGVkIHBlcnNpc3RVSXM6IEdsb2JhbEVudW0uVUlbXSA9IFtdO1xuICAgIC8v5YWz5Y2h5pWw5o2uXG4gICAgcHJvdGVjdGVkIGxldmVsTW5nOiBMZXZlbE1hbmFnZXIgPSBudWxsO1xuICAgIHByb3RlY3RlZCBsZXZlbERhdGE6IGFueSA9IG51bGw7XG5cbiAgICAvL+iEmuacrOiHqui6q+mcgOimgeS9v+eUqOeahOaVsOaNru+8mlxuICAgIHByb3RlY3RlZCBsZXZlbENvdW50OiBudW1iZXIgPSAwOy8v6K6w5b2V546p5a62546p55qE5YWz5Y2h5qyh5pWw77yM55So5LqO5Yik5a6a57uT566X55WM6Z2i5piv5pi+56S6YmFubmVy6L+Y5piv5o+S5bGP5bm/5ZGKXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMubG9hZEdhbWVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMubGV2ZWxDb3VudCA9IDA7XG5cbiAgICAgICAgdGhpcy5pbml0VUlDb25maWcoKTtcbiAgICAgICAgdGhpcy5pbml0VG91Y2hNYXNrKCk7XG4gICAgICAgIHRoaXMuaW5pdE1vZGVscygpO1xuXG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uRXZlbnRzKCkge1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnN0YXJ0R2FtZSwgdGhpcy5vblN0YXJ0R2FtZSwgdGhpcyk7XG4gICAgICAgIHRoaXMub24oRXZlbnRUeXBlLkRpcmVjdG9yRXZlbnQuZW50ZXJMb2JieSwgdGhpcy5lbnRlckdhbWVMb2JieSwgdGhpcyk7XG4gICAgICAgIHRoaXMub24oRXZlbnRUeXBlLkRpcmVjdG9yRXZlbnQucGxheU5leHRMZXZlbCwgdGhpcy5vblBsYXlOZXh0TGV2ZWwsIHRoaXMpO1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnJlcGxheUN1ckxldmVsLCB0aGlzLm9uUmVwbGF5Q3VyTGV2ZWwsIHRoaXMpO1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnBsYXllcldpbiwgdGhpcy5vbkxldmVsV2luLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuRGlyZWN0b3JFdmVudC5wbGF5ZXJMb3NlLCB0aGlzLm9uTGV2ZWxMb3NlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuRGlyZWN0b3JFdmVudC5oaWRlR2FtZUxvYmJ5LCB0aGlzLmhpZGVHYW1lTG9iYnlVSSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuVUlFdmVudC5zaG93VG91Y2hNYXNrLCB0aGlzLnNob3dUb3VjaE1hc2ssIHRoaXMpO1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5VSUV2ZW50LmhpZGVUb3VjaE1hc2ssIHRoaXMuaGlkZVRvdWNoTWFzaywgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBpbml0VUlDb25maWcoKSB7XG4gICAgICAgIHRoaXMubG9iYnlVSXMgPSBbXTtcbiAgICAgICAgdGhpcy5sb2JieVVJcy5wdXNoKEdsb2JhbEVudW0uVUkubG9iYnkpO1xuICAgICAgICB0aGlzLmxvYmJ5VUlzLnB1c2goR2xvYmFsRW51bS5VSS5zaG9wKTtcblxuICAgICAgICB0aGlzLmxldmVsVUlzID0gW107XG4gICAgICAgIHRoaXMubGV2ZWxVSXMucHVzaChHbG9iYWxFbnVtLlVJLmxldmVsSW5mbyk7XG4gICAgICAgIHRoaXMubGV2ZWxVSXMucHVzaChHbG9iYWxFbnVtLlVJLmxldmVsVGVhY2gpO1xuICAgICAgICB0aGlzLmxldmVsVUlzLnB1c2goR2xvYmFsRW51bS5VSS53aW5VSSk7XG4gICAgICAgIHRoaXMubGV2ZWxVSXMucHVzaChHbG9iYWxFbnVtLlVJLmxvc2VVSSk7XG5cbiAgICAgICAgdGhpcy5wZXJzaXN0VUlzID0gW107XG4gICAgICAgIHRoaXMucGVyc2lzdFVJcy5wdXNoKEdsb2JhbEVudW0uVUkucGxheWVyQXNzZXRCYXIpO1xuICAgICAgICB0aGlzLnBlcnNpc3RVSXMucHVzaChHbG9iYWxFbnVtLlVJLnRpcFBvd2VyKTtcbiAgICAgICAgdGhpcy5wZXJzaXN0VUlzLnB1c2goR2xvYmFsRW51bS5VSS5nZXRQb3dlcik7XG4gICAgfVxuICAgIHByb3RlY3RlZCBpbml0TW9kZWxzKCkge1xuICAgICAgICAvL1VJXG4gICAgICAgIFVJTWFuYWdlci5pbml0KHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlVJXCIpKTtcblxuICAgICAgICAvL3RvZG865rWL6K+V77ya6YeN572u546p5a625pWw5o2u77yM6ZyA6KaB5YaN5qyh6YeN572u5pe277yM5bCGbmVlZFJlc2V0UGxheWVyRGF0YeWtl+espuS4suacgOWQjuS4gOS9jeaVsOWtl+WKoDFcbiAgICAgICAgbGV0IHJlc2V0UGxheWVyRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShHYW1lQ29uZmlnLmdhbWVOYW1lICsgXCJuZWVkUmVzZXRQbGF5ZXJEYXRhMVwiKTtcbiAgICAgICAgaWYgKCFyZXNldFBsYXllckRhdGEpIHtcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShHYW1lQ29uZmlnLmdhbWVOYW1lICsgXCJuZWVkUmVzZXRQbGF5ZXJEYXRhMVwiLCBKU09OLnN0cmluZ2lmeSh0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgUGxheWVyRGF0YS5pbml0KCk7XG5cbiAgICAgICAgQXVkaW9NYW5hZ2VyLmluaXQoKTtcbiAgICAgICAgR2FtZURhdGEuaW5pdCgpO1xuICAgICAgICBMb2FkZXIuaW5pdCgpO1xuICAgICAgICBQb3dlck1hbmFnZXIuaW5pdCgpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgaW5pdFRvdWNoTWFzaygpIHtcbiAgICAgICAgdGhpcy50b3VjaE1hc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG91Y2hNYXNrQ291bnQgPSAwO1xuICAgIH1cbiAgICAvKirliqDovb3lhajpg6jmuLjmiI/mlbDmja7vvIhqc29u5paH5Lu277yJICovXG4gICAgcHJvdGVjdGVkIGxvYWRHYW1lRGF0YSgpIHtcblxuICAgICAgICBMb2FkZXIubG9hZFJlc0RpcihcIm15R2FtZS9HYW1lRGF0YVwiLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJscyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSByZXMubGVuZ3RoOyBpIDwgYzsgKytpKSB7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKHJlc1tpXS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25Mb2FkR2FtZURhdGFGaW5pc2gocmVzLCB1cmxzKTtcbiAgICAgICAgfSwgY2MuSnNvbkFzc2V0KTtcbiAgICB9XG4gICAgLyoq5ri45oiP5pWw5o2u5Yqg6L295a6M5q+V77yM5YiG5Yir5L+d5a2YICovXG4gICAgcHJvdGVjdGVkIG9uTG9hZEdhbWVEYXRhRmluaXNoKHJlczogYW55W10sIHVybHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIEdhbWVEYXRhLnNldERhdGEocmVzLCB1cmxzKTtcblxuICAgICAgICB0aGlzLmVudGVyR2FtZUxvYmJ5KCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXRVcmxzSW5kZXgobmFtZTogc3RyaW5nLCB1cmxzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gICAgICAgIGZvciAobGV0IGkgPSB1cmxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBpZiAodXJsc1tpXS5pbmRleE9mKG5hbWUpID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoq5pi+56S65LiA5bGC6YGu572p77yM6Zi75oyh546p5a625pON5L2cICovXG4gICAgcHJvdGVjdGVkIHNob3dUb3VjaE1hc2soY291bnQ6IG51bWJlciA9IDEpIHtcbiAgICAgICAgdGhpcy50b3VjaE1hc2tDb3VudCArPSBjb3VudDtcbiAgICAgICAgdGhpcy50b3VjaE1hc2suYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoq56e76Zmk5LiA5bGC6YGu572p77yM6YGu572p5bGC5pWw5Li6MOaXtueOqeWutuaJjeiDvei/m+ihjOaTjeS9nCAqL1xuICAgIHByb3RlY3RlZCBoaWRlVG91Y2hNYXNrKGNvdW50OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHRoaXMudG91Y2hNYXNrQ291bnQgLT0gY291bnQ7XG4gICAgICAgIGlmICh0aGlzLnRvdWNoTWFza0NvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hNYXNrQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy50b3VjaE1hc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmmoLlgZzlhbPljaEgKi9cbiAgICBwcm90ZWN0ZWQgcGF1c2VMZXZlbCgpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnBhdXNlTGV2ZWwpO1xuICAgIH1cbiAgICAvKirmgaLlpI3lhbPljaEgKi9cbiAgICBwcm90ZWN0ZWQgcmVzdW1lTGV2ZWwoKSB7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuRGlyZWN0b3JFdmVudC5yZXN1bWVMZXZlbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmV4aXRMZXZlbCgpO1xuICAgICAgICB0aGlzLnJlc2V0VG91Y2hNYXNrKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZXNldFRvdWNoTWFzaygpIHtcbiAgICAgICAgdGhpcy50b3VjaE1hc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG91Y2hNYXNrQ291bnQgPSAwO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93VUkodWk6IEdsb2JhbEVudW0uVUksIGRhdGE/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5VSUV2ZW50LmVudGVyLCB1aSwgZGF0YSk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBzaG93VUlzKHVpczogR2xvYmFsRW51bS5VSVtdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSB1aXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5lbnRlciwgdWlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgaGlkZVVJKHVpOiBHbG9iYWxFbnVtLlVJKSB7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5leGl0LCB1aSk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBoaWRlVUlzKHVpczogR2xvYmFsRW51bS5VSVtdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSB1aXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5leGl0LCB1aXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/ov5vlhaXpppbpobVcbiAgICBwcm90ZWN0ZWQgZW50ZXJHYW1lTG9iYnkoKSB7XG4gICAgICAgIGlmICghIXRoaXMubGV2ZWxNbmcpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxNbmcuZXhpdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0dhbWVMb2JieVVJKCk7XG4gICAgfVxuICAgIC8v5pi+56S66aaW6aG1VUlcbiAgICBwcm90ZWN0ZWQgc2hvd0dhbWVMb2JieVVJKCkge1xuICAgICAgICB0aGlzLmhpZGVVSXModGhpcy5sZXZlbFVJcyk7XG4gICAgICAgIHRoaXMuaGlkZVVJcyh0aGlzLnBlcnNpc3RVSXMpO1xuICAgICAgICB0aGlzLnNob3dVSShHbG9iYWxFbnVtLlVJLmxvYmJ5KTtcbiAgICAgICAgdGhpcy5zaG93VUkoR2xvYmFsRW51bS5VSS5wbGF5ZXJBc3NldEJhcik7XG4gICAgfVxuICAgIC8v6ZqQ6JeP6aaW6aG1VUkgXG4gICAgcHJvdGVjdGVkIGhpZGVHYW1lTG9iYnlVSSgpIHtcbiAgICAgICAgdGhpcy5iZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlVUlzKHRoaXMubG9iYnlVSXMpO1xuICAgICAgICB0aGlzLmhpZGVVSXModGhpcy5wZXJzaXN0VUlzKTtcbiAgICAgICAgdGhpcy5oaWRlVUkoR2xvYmFsRW51bS5VSS5sb2JieSk7XG4gICAgfVxuXG4gICAgLy/lvIDlp4vmuLjmiI/vvJpcbiAgICBwcm90ZWN0ZWQgb25TdGFydEdhbWUoKSB7XG4gICAgICAgIGlmICghdGhpcy5sZXZlbE1uZykge1xuICAgICAgICAgICAgLy8gTG9hZGVyLmxvYWRTdWJwYWNrYWdlKFwiTGV2ZWxcIiwgdGhpcy5sb2FkTGV2ZWxDb21tb25Bc3NldC5iaW5kKHRoaXMpLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMubG9hZExldmVsQ29tbW9uQXNzZXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW50ZXJMZXZlbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8v5Yqg6L295YWz5Y2h5Zy65pmv5omA6ZyA55qE6YCa55So6LWE5rqQ5bm25Yib5bu65a+56LGh5rGgXG4gICAgcHJvdGVjdGVkIGxvYWRMZXZlbENvbW1vbkFzc2V0KCkge1xuICAgICAgICBMb2FkZXIubG9hZFJlc0RpcihcIm15R2FtZS9QcmVmYWIvTGV2ZWxBc3NldFwiLCAoYXNzZXRzKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXNzZXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZWZhYjogY2MuUHJlZmFiID0gYXNzZXRzW2ldO1xuICAgICAgICAgICAgICAgIEdsb2JhbFBvb2wuY3JlYXRlUG9vbChwcmVmYWIubmFtZSwgcHJlZmFiLCBwcmVmYWIubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRMZXZlbE1hbmFnZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8v5Yqg6L295YWz5Y2h5Zy65pmv566h55CG5ZmoXG4gICAgcHJvdGVjdGVkIGxvYWRMZXZlbE1hbmFnZXIoKSB7XG4gICAgICAgIExvYWRlci5sb2FkUmVzKFwibXlHYW1lL1ByZWZhYi9MZXZlbE1hbmFnZXJcIiwgKHJlcykgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiTGV2ZWxNYW5hZ2VyXCIpLmFkZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5sZXZlbE1uZyA9IG5vZGUuZ2V0Q29tcG9uZW50KFwiTGV2ZWxNYW5hZ2VyXCIpO1xuICAgICAgICAgICAgdGhpcy5sZXZlbE1uZy5pbml0KCk7XG4gICAgICAgICAgICAvLyB0aGlzLmVudGVyTGV2ZWwoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZExldmVsQ29udHJvbGxlcigpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgbG9hZExldmVsQ29udHJvbGxlcigpIHtcbiAgICAgICAgTG9hZGVyLmxvYWRSZXMoXCJteUdhbWUvUHJlZmFiL1VJL0xldmVsQ29udHJvbGxlclwiLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHJlcyk7XG4gICAgICAgICAgICB0aGlzLnVpTGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJMZXZlbENvbnRyb2xsZXJcIikuYWRkQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICBsZXQganM6IExldmVsQ29udHJvbGxlciA9IG5vZGUuZ2V0Q29tcG9uZW50KExldmVsQ29udHJvbGxlcik7XG4gICAgICAgICAgICBqcy5pbml0KCk7XG4gICAgICAgICAgICBqcy5zZXREaXNhYmxlKCk7XG4gICAgICAgICAgICB0aGlzLmVudGVyTGV2ZWwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8v6L+b5YWl5YWz5Y2hXG4gICAgcHJvdGVjdGVkIGVudGVyTGV2ZWwobGV2ZWw/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFsZXZlbCkge1xuICAgICAgICAgICAgbGV2ZWwgPSB0aGlzLmdldEN1ckxldmVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy90b2RvOua1i+ivlVxuICAgICAgICBsZXZlbCA9IDE7XG4gICAgICAgIC8v6L+b5YWl5YWz5Y2hOlxuICAgICAgICB0aGlzLmhpZGVHYW1lTG9iYnlVSSgpO1xuICAgICAgICB0aGlzLmhpZGVVSXModGhpcy5sZXZlbFVJcyk7XG4gICAgICAgIGxldCBsZXZlbERhdGEgPSB0aGlzLmdldExldmVsRGF0YShsZXZlbCk7XG4gICAgICAgIHRoaXMubGV2ZWxNbmcuZW50ZXJMZXZlbChsZXZlbERhdGEpO1xuICAgICAgICB0aGlzLnNob3dVSShHbG9iYWxFbnVtLlVJLmxldmVsSW5mbywgbGV2ZWxEYXRhKTtcbiAgICAgICAgdGhpcy5zaG93VGVhY2hBbmltKCk7XG4gICAgfVxuXG4gICAgLy/ojrflj5bnjqnlrrblvZPliY3og73ov5vlhaXnmoTlhbPljaFcbiAgICBwcm90ZWN0ZWQgZ2V0Q3VyTGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIFBsYXllckRhdGEuZ2V0RGF0YShcImdhbWVEYXRhLmN1ckxldmVsXCIpO1xuICAgIH1cbiAgICAvL+iOt+WPluWFs+WNoeaVsOaNrlxuICAgIHByb3RlY3RlZCBnZXRMZXZlbERhdGEobGV2ZWw6IG51bWJlcikge1xuICAgICAgICBsZXZlbCA9IDE7Ly90b2RvXG4gICAgICAgIC8vIGxldCBkYXRhID0gR2FtZURhdGEuZ2V0TGV2ZWxEYXRhKGxldmVsKTtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLy/mmL7npLrmlZnlrabliqjnlLtcbiAgICBwcm90ZWN0ZWQgc2hvd1RlYWNoQW5pbSgpIHtcbiAgICAgICAgbGV0IHRlYWNoZWQgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oR2FtZUNvbmZpZy5nYW1lTmFtZSArIFwidGVhY2hlZFwiKTtcbiAgICAgICAgaWYgKCEhdGVhY2hlZCAmJiAhIUpTT04ucGFyc2UodGVhY2hlZCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zaG93VUkoR2xvYmFsRW51bS5VSS5sZXZlbFRlYWNoKTtcbiAgICB9XG5cbiAgICAvL+WFs+WNoeiDnOWIqVxuICAgIHByb3RlY3RlZCBvbkxldmVsV2luKCkge1xuICAgICAgICB0aGlzLmFkZEN1ckxldmVsKCk7XG4gICAgICAgIHRoaXMuc2hvd1VJKEdsb2JhbEVudW0uVUkud2luVUkpO1xuICAgIH1cbiAgICAvL+WFs+WNoei/m+W6pisxXG4gICAgcHJvdGVjdGVkIGFkZEN1ckxldmVsKCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBsYXllckRhdGFFdmVudC51cGRhdGVQbGF5ZXJEYXRhLCB7XG4gICAgICAgICAgICB0eXBlOiBcImdhbWVEYXRhXCIsXG4gICAgICAgICAgICBhdHRyaWJ1dGU6IFwiZ2FtZURhdGEuY3VyTGV2ZWxcIixcbiAgICAgICAgICAgIHZhbHVlOiAxLFxuICAgICAgICAgICAgbW9kZTogXCIrXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5YWz5Y2h5aSx6LSlXG4gICAgcHJvdGVjdGVkIG9uTGV2ZWxMb3NlKCkge1xuICAgICAgICB0aGlzLnNob3dVSShHbG9iYWxFbnVtLlVJLmxvc2VVSSk7XG4gICAgfVxuXG4gICAgLy/nu6fnu63kuIvkuIDlhbNcbiAgICBwcm90ZWN0ZWQgb25QbGF5TmV4dExldmVsKCkge1xuICAgICAgICB0aGlzLmV4aXRDdXJMZXZlbCgpO1xuICAgICAgICB0aGlzLnB1dEJhY2tDdXJMZXZlbEFzc2V0KCk7XG4gICAgICAgIHRoaXMuZW50ZXJMZXZlbCgpO1xuICAgIH1cbiAgICAvL+mAgOWHuuW9k+WJjeWFs+WNoVxuICAgIHByb3RlY3RlZCBleGl0Q3VyTGV2ZWwoKSB7XG4gICAgICAgIHRoaXMubGV2ZWxNbmcuZXhpdCgpO1xuICAgIH1cbiAgICAvL+WbnuaUtuW9k+WJjeWFs+WNoeS9v+eUqOeahOi1hOa6kFxuICAgIHByb3RlY3RlZCBwdXRCYWNrQ3VyTGV2ZWxBc3NldCgpIHtcblxuICAgIH1cblxuICAgIC8v6YeN546p5b2T5YmN5YWz5Y2hXG4gICAgcHJvdGVjdGVkIG9uUmVwbGF5Q3VyTGV2ZWwoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDdXJMZXZlbCgpO1xuICAgICAgICB0aGlzLnB1dEJhY2tDdXJMZXZlbEFzc2V0KCk7XG4gICAgICAgIHRoaXMuZW50ZXJMZXZlbCgpO1xuICAgIH1cbiAgICAvL+mHjee9ruW9k+WJjeWFs+WNoeeKtuaAgVxuICAgIHByb3RlY3RlZCByZXNldEN1ckxldmVsKCkge1xuICAgICAgICB0aGlzLmxldmVsTW5nLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgLy/ov5Tlm57pppbpobVcbiAgICBwcm90ZWN0ZWQgb25Db21lQmFja0dhbWVMb2JieSgpIHtcbiAgICAgICAgdGhpcy5leGl0TGV2ZWwoKTtcbiAgICAgICAgdGhpcy5wdXRCYWNrTGV2ZWxBc3NldCgpO1xuICAgICAgICB0aGlzLnNob3dHYW1lTG9iYnlVSSgpO1xuICAgIH1cbiAgICAvL+W9u+W6lemAgOWHuuWFs+WNoeWcuuaZr1xuICAgIHByb3RlY3RlZCBleGl0TGV2ZWwoKSB7XG4gICAgICAgIGlmICghIXRoaXMubGV2ZWxNbmcpIHRoaXMubGV2ZWxNbmcuZXhpdCgpO1xuICAgIH1cbiAgICAvL+WbnuaUtuWFs+WNoeWcuuaZr+eahOWFqOmDqOi1hOa6kFxuICAgIHByb3RlY3RlZCBwdXRCYWNrTGV2ZWxBc3NldCgpIHtcblxuICAgIH1cbn1cbiJdfQ==