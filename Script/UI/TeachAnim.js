
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/TeachAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f0fbaB6UyBN9qTudBp6oMyu', 'TeachAnim');
// myGame/Script/UI/TeachAnim.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameConfig_1 = require("../GameSpecial/GameConfig");
var GameEventType_1 = require("../GameSpecial/GameEventType");
//教学动画
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TeachAnim = /** @class */ (function (_super) {
    __extends(TeachAnim, _super);
    function TeachAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tip = null;
        return _this;
    }
    TeachAnim.prototype.onLoad = function () {
        this.onEvents();
        this.play();
    };
    TeachAnim.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.DirectorEvent.playerWin, this.hide, this);
        this.on(GameEventType_1.EventType.DirectorEvent.playerLose, this.hide, this);
        this.on(GameEventType_1.EventType.CtrlEvent.ctrlStart, this.show, this);
    };
    TeachAnim.prototype.hide = function () {
        cc.sys.localStorage.setItem(GameConfig_1.default.gameName + "teached", JSON.stringify(true));
        this.stop();
        this.node.active = false;
    };
    TeachAnim.prototype.show = function () {
        this.node.active = true;
        this.play();
    };
    TeachAnim.prototype.onTouchEnd = function () {
        this.teachFinish();
    };
    TeachAnim.prototype.teachFinish = function () {
        cc.sys.localStorage.setItem(GameConfig_1.default.gameName + "teached", JSON.stringify(true));
        this.hide();
    };
    TeachAnim.prototype.play = function () {
        // this.tip.stopAllActions();
        // this.tip.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(1), cc.fadeOut(1))));
    };
    TeachAnim.prototype.stop = function () {
        // this.tip.stopAllActions();
    };
    __decorate([
        property(cc.Node)
    ], TeachAnim.prototype, "tip", void 0);
    TeachAnim = __decorate([
        ccclass
    ], TeachAnim);
    return TeachAnim;
}(yyComponent_1.default));
exports.default = TeachAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxUZWFjaEFuaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCx3REFBbUQ7QUFDbkQsOERBQXlEO0FBRXpELE1BQU07QUFDQSxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFXO0lBRGxEO1FBQUEscUVBdUNDO1FBbkNhLFNBQUcsR0FBWSxJQUFJLENBQUM7O0lBbUNsQyxDQUFDO0lBakNVLDBCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDUyw0QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTVELENBQUM7SUFDTSx3QkFBSSxHQUFYO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFVLENBQUMsUUFBUSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFDTSx3QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ1MsOEJBQVUsR0FBcEI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNTLCtCQUFXLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFVLENBQUMsUUFBUSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDUyx3QkFBSSxHQUFkO1FBQ0ksNkJBQTZCO1FBQzdCLGtGQUFrRjtJQUN0RixDQUFDO0lBQ1Msd0JBQUksR0FBZDtRQUNJLDZCQUE2QjtJQUNqQyxDQUFDO0lBbENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ1k7SUFIYixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBc0M3QjtJQUFELGdCQUFDO0NBdENELEFBc0NDLENBdENzQyxxQkFBVyxHQXNDakQ7a0JBdENvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HYW1lQ29uZmlnXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuXG4vL+aVmeWtpuWKqOeUu1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYWNoQW5pbSBleHRlbmRzIHl5Q29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByb3RlY3RlZCB0aXA6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHVibGljIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50cygpO1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uRXZlbnRzKCkge1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnBsYXllcldpbiwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuRGlyZWN0b3JFdmVudC5wbGF5ZXJMb3NlLCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5DdHJsRXZlbnQuY3RybFN0YXJ0LCB0aGlzLnNob3csIHRoaXMpO1xuICAgICAgICBcbiAgICB9XG4gICAgcHVibGljIGhpZGUoKSB7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShHYW1lQ29uZmlnLmdhbWVOYW1lICsgXCJ0ZWFjaGVkXCIsIEpTT04uc3RyaW5naWZ5KHRydWUpKTtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgcHVibGljIHNob3coKSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uVG91Y2hFbmQoKSB7XG4gICAgICAgIHRoaXMudGVhY2hGaW5pc2goKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHRlYWNoRmluaXNoKCkge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oR2FtZUNvbmZpZy5nYW1lTmFtZSArIFwidGVhY2hlZFwiLCBKU09OLnN0cmluZ2lmeSh0cnVlKSk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgcGxheSgpIHtcbiAgICAgICAgLy8gdGhpcy50aXAuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgLy8gdGhpcy50aXAucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuZmFkZUluKDEpLCBjYy5mYWRlT3V0KDEpKSkpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgc3RvcCgpIHtcbiAgICAgICAgLy8gdGhpcy50aXAuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9XG59XG4iXX0=