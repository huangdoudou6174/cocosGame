
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/LevelInfoUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '469echCPitCC5RWcLd0eT0X', 'LevelInfoUI');
// myGame/Script/UI/LevelInfoUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var GameEventType_1 = require("../GameSpecial/GameEventType");
//关卡进度分数等信息UI
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelInfoUI = /** @class */ (function (_super) {
    __extends(LevelInfoUI, _super);
    function LevelInfoUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //关卡
        _this.curLevelLabel = null;
        _this.nextLevelLabel = null;
        //关卡进度
        _this.levelProgressBar = null;
        _this.targetProgress = 0;
        //金币
        _this.curGoldLabel = null;
        _this.curGold = 0;
        _this.paused = false;
        return _this;
    }
    Object.defineProperty(LevelInfoUI.prototype, "uiType", {
        get: function () { return GlobalEnum_1.GlobalEnum.UI.levelInfo; },
        enumerable: true,
        configurable: true
    });
    LevelInfoUI.prototype.init = function () {
        // this.levelProgressBar.progress = 0;
        // this.curGoldLabel.string = "0";
        this.onEvents();
    };
    LevelInfoUI.prototype.onEvents = function () {
    };
    LevelInfoUI.prototype.reset = function () {
        this.resetGold();
        this.resetProgress();
    };
    LevelInfoUI.prototype.resetGold = function () {
        this.curGold = 0;
        this.updateGoldLabel();
    };
    LevelInfoUI.prototype.resetProgress = function () {
        this.targetProgress = 0;
        // this.levelProgressBar.progress = 0;
    };
    LevelInfoUI.prototype.show = function (levelData) {
        this.node.active = true;
        this.reset();
        this.setData(levelData);
    };
    LevelInfoUI.prototype.hide = function () {
        this.node.active = false;
    };
    /**
     * 获取关卡信息数据
     */
    LevelInfoUI.prototype.getData = function () {
        return {
            baseGold: 0,
            speGold: 0,
            gold: 0
        };
    };
    LevelInfoUI.prototype.setData = function (data) {
        // let lv = PlayerData.getData("gameData.curLevel");
        // this.curLevelLabel.string = lv.toString();
        // this.nextLevelLabel.string = (lv + 1).toString();
    };
    LevelInfoUI.prototype.updateProgress = function () {
        if (this.targetProgress > 1) {
            this.targetProgress = 1;
        }
    };
    //增加金币
    LevelInfoUI.prototype.addGold = function (gold) {
        this.curGold += gold;
        this.updateGoldLabel();
    };
    LevelInfoUI.prototype.updateGoldLabel = function () {
        // this.curGoldLabel.string = this.convertToString(this.curGold);
    };
    LevelInfoUI.prototype.convertToString = function (v) {
        if (v < 1100)
            return v.toString();
        if (v < 1100000)
            return (v * 0.001).toFixed(1) + "K";
        return (v * 0.000001).toFixed(1) + "M";
    };
    // public update(dt: number) {
    //     let offset = this.targetProgress - this.levelProgressBar.progress;
    //     if (offset < 0) {
    //         this.levelProgressBar.progress = this.targetProgress;
    //         return;
    //     }
    //     if (offset == 0) return;
    //     offset *= 0.1;
    //     if (offset < 0.001) {
    //         offset = this.targetProgress - this.levelProgressBar.progress;
    //     }
    //     this.levelProgressBar.progress += offset;
    // }
    //测试用：重置关卡
    LevelInfoUI.prototype.onBtnReplay = function () {
        this.emit(GameEventType_1.EventType.DirectorEvent.replayCurLevel);
    };
    LevelInfoUI.prototype.onBtnPause = function () {
        if (this.paused) {
            this.paused = false;
            this.emit(GameEventType_1.EventType.DirectorEvent.resumeLevel);
        }
        else {
            this.paused = true;
            this.emit(GameEventType_1.EventType.DirectorEvent.pauseLevel);
        }
    };
    LevelInfoUI.prototype.onBtnLobby = function () {
        this.emit(GameEventType_1.EventType.DirectorEvent.enterLobby);
    };
    __decorate([
        property(cc.Label)
    ], LevelInfoUI.prototype, "curLevelLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LevelInfoUI.prototype, "nextLevelLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], LevelInfoUI.prototype, "levelProgressBar", void 0);
    __decorate([
        property(cc.Label)
    ], LevelInfoUI.prototype, "curGoldLabel", void 0);
    LevelInfoUI = __decorate([
        ccclass
    ], LevelInfoUI);
    return LevelInfoUI;
}(yyComponent_1.default));
exports.default = LevelInfoUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxMZXZlbEluZm9VSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBR2hELHdEQUF1RDtBQUN2RCw4REFBeUQ7QUFHekQsYUFBYTtBQUNQLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVc7SUFEcEQ7UUFBQSxxRUEySEM7UUF0SEcsSUFBSTtRQUVNLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRS9CLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQzFDLE1BQU07UUFFSSxzQkFBZ0IsR0FBbUIsSUFBSSxDQUFDO1FBQ3hDLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBRXJDLElBQUk7UUFFTSxrQkFBWSxHQUFhLElBQUksQ0FBQztRQUM5QixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBMkZwQixZQUFNLEdBQVksS0FBSyxDQUFDOztJQWN0QyxDQUFDO0lBeEhHLHNCQUFXLCtCQUFNO2FBQWpCLGNBQXNCLE9BQU8sdUJBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFrQmhELDBCQUFJLEdBQVg7UUFDSSxzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ1MsOEJBQVEsR0FBbEI7SUFDQSxDQUFDO0lBQ00sMkJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNTLCtCQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDUyxtQ0FBYSxHQUF2QjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFD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dkIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQTBIL0I7SUFBRCxrQkFBQztDQTFIRCxBQTBIQyxDQTFId0MscUJBQVcsR0EwSG5EO2tCQTFIb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5eUNvbXBvbmVudCBmcm9tIFwiLi4vQ29tbW9uL3l5Q29tcG9uZW50XCI7XG5pbXBvcnQgeyBJVUkgfSBmcm9tIFwiLi4vVUkvSVVJXCI7XG5pbXBvcnQgR2xvYmFsUG9vbCBmcm9tIFwiLi4vQ29tbW9uL0dsb2JhbFBvb2xcIjtcbmltcG9ydCB7IEdsb2JhbEVudW0gfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2xvYmFsRW51bVwiO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcbmltcG9ydCBQbGF5ZXJEYXRhIGZyb20gXCIuLi9Db21tb24vUGxheWVyRGF0YVwiO1xuXG4vL+WFs+WNoei/m+W6puWIhuaVsOetieS/oeaBr1VJXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxJbmZvVUkgZXh0ZW5kcyB5eUNvbXBvbmVudCBpbXBsZW1lbnRzIElVSSB7XG5cbiAgICBwdWJsaWMgZ2V0IHVpVHlwZSgpIHsgcmV0dXJuIEdsb2JhbEVudW0uVUkubGV2ZWxJbmZvOyB9XG5cbiAgICAvL+WFs+WNoVxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcm90ZWN0ZWQgY3VyTGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcm90ZWN0ZWQgbmV4dExldmVsTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICAvL+WFs+WNoei/m+W6plxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBwcm90ZWN0ZWQgbGV2ZWxQcm9ncmVzc0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuICAgIHByb3RlY3RlZCB0YXJnZXRQcm9ncmVzczogbnVtYmVyID0gMDtcblxuICAgIC8v6YeR5biBXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByb3RlY3RlZCBjdXJHb2xkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgY3VyR29sZDogbnVtYmVyID0gMDtcblxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMubGV2ZWxQcm9ncmVzc0Jhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgIC8vIHRoaXMuY3VyR29sZExhYmVsLnN0cmluZyA9IFwiMFwiO1xuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkV2ZW50cygpIHtcbiAgICB9XG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnJlc2V0R29sZCgpO1xuICAgICAgICB0aGlzLnJlc2V0UHJvZ3Jlc3MoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHJlc2V0R29sZCgpIHtcbiAgICAgICAgdGhpcy5jdXJHb2xkID0gMDtcbiAgICAgICAgdGhpcy51cGRhdGVHb2xkTGFiZWwoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHJlc2V0UHJvZ3Jlc3MoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0UHJvZ3Jlc3MgPSAwO1xuICAgICAgICAvLyB0aGlzLmxldmVsUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAwO1xuICAgIH1cbiAgICBwdWJsaWMgc2hvdyhsZXZlbERhdGE/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKGxldmVsRGF0YSk7XG4gICAgfVxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5YWz5Y2h5L+h5oGv5pWw5o2uXG4gICAgICovXG4gICAgcHVibGljIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYXNlR29sZDogMCxcbiAgICAgICAgICAgIHNwZUdvbGQ6IDAsXG4gICAgICAgICAgICBnb2xkOiAwXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldERhdGEoZGF0YT86IGFueSkge1xuICAgICAgICAvLyBsZXQgbHYgPSBQbGF5ZXJEYXRhLmdldERhdGEoXCJnYW1lRGF0YS5jdXJMZXZlbFwiKTtcbiAgICAgICAgLy8gdGhpcy5jdXJMZXZlbExhYmVsLnN0cmluZyA9IGx2LnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIHRoaXMubmV4dExldmVsTGFiZWwuc3RyaW5nID0gKGx2ICsgMSkudG9TdHJpbmcoKTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVQcm9ncmVzcygpIHtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXRQcm9ncmVzcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvZ3Jlc3MgPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/lop7liqDph5HluIFcbiAgICBwcm90ZWN0ZWQgYWRkR29sZChnb2xkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdXJHb2xkICs9IGdvbGQ7XG4gICAgICAgIHRoaXMudXBkYXRlR29sZExhYmVsKCk7XG5cbiAgICB9XG4gICAgcHJvdGVjdGVkIHVwZGF0ZUdvbGRMYWJlbCgpIHtcbiAgICAgICAgLy8gdGhpcy5jdXJHb2xkTGFiZWwuc3RyaW5nID0gdGhpcy5jb252ZXJ0VG9TdHJpbmcodGhpcy5jdXJHb2xkKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGNvbnZlcnRUb1N0cmluZyh2OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAodiA8IDExMDApIHJldHVybiB2LnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh2IDwgMTEwMDAwMCkgcmV0dXJuICh2ICogMC4wMDEpLnRvRml4ZWQoMSkgKyBcIktcIjtcbiAgICAgICAgcmV0dXJuICh2ICogMC4wMDAwMDEpLnRvRml4ZWQoMSkgKyBcIk1cIjtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpIHtcbiAgICAvLyAgICAgbGV0IG9mZnNldCA9IHRoaXMudGFyZ2V0UHJvZ3Jlc3MgLSB0aGlzLmxldmVsUHJvZ3Jlc3NCYXIucHJvZ3Jlc3M7XG4gICAgLy8gICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgLy8gICAgICAgICB0aGlzLmxldmVsUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLnRhcmdldFByb2dyZXNzO1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGlmIChvZmZzZXQgPT0gMCkgcmV0dXJuO1xuICAgIC8vICAgICBvZmZzZXQgKj0gMC4xO1xuICAgIC8vICAgICBpZiAob2Zmc2V0IDwgMC4wMDEpIHtcbiAgICAvLyAgICAgICAgIG9mZnNldCA9IHRoaXMudGFyZ2V0UHJvZ3Jlc3MgLSB0aGlzLmxldmVsUHJvZ3Jlc3NCYXIucHJvZ3Jlc3M7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGhpcy5sZXZlbFByb2dyZXNzQmFyLnByb2dyZXNzICs9IG9mZnNldDtcbiAgICAvLyB9XG5cblxuICAgIC8v5rWL6K+V55So77ya6YeN572u5YWz5Y2hXG4gICAgcHJvdGVjdGVkIG9uQnRuUmVwbGF5KCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkRpcmVjdG9yRXZlbnQucmVwbGF5Q3VyTGV2ZWwpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwYXVzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgb25CdG5QYXVzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnJlc3VtZUxldmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuRGlyZWN0b3JFdmVudC5wYXVzZUxldmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJ0bkxvYmJ5KCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkRpcmVjdG9yRXZlbnQuZW50ZXJMb2JieSk7XG4gICAgfVxufVxuIl19