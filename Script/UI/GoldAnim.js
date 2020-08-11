
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/GoldAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d023whSohFla4AjD24Co9r', 'GoldAnim');
// myGame/Script/UI/GoldAnim.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GlobalPool_1 = require("../Common/GlobalPool");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var PlayerAssetBar_1 = require("./PlayerAssetBar");
//金币动画层
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GoldAnim = /** @class */ (function (_super) {
    __extends(GoldAnim, _super);
    function GoldAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goldLayer = null;
        _this.touchMask = null;
        _this.goldIconPrefab = null;
        return _this;
    }
    GoldAnim.prototype.start = function () {
        this.init();
    };
    GoldAnim.prototype.init = function () {
        this.targetPos = cc.v2(0, 0);
        this.cb = null;
        this.touchMask.active = false;
        GlobalPool_1.default.createPool(GlobalEnum_1.GlobalEnum.LevelPrefab.goldIcon, this.goldIconPrefab);
        this.onEvents();
    };
    GoldAnim.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.UIEvent.playGoldAmin, this.play, this);
    };
    GoldAnim.prototype.reset = function () {
        this.cb = null;
        this.touchMask.active = false;
        for (var i = this.goldLayer.childrenCount - 1; i >= 0; --i) {
            this.goldLayer.children[i].stopAllActions();
            GlobalPool_1.default.put(this.goldLayer.children[i], GlobalEnum_1.GlobalEnum.LevelPrefab.goldIcon);
        }
    };
    GoldAnim.prototype.play = function (data) {
        this.reset();
        this.touchMask.active = true;
        if (!!data.targetPos) {
            this.targetPos.set(data.targetPos);
        }
        else {
            this.targetPos.set(PlayerAssetBar_1.default.goldPos);
        }
        this.cb = data.cb;
        var x = 0;
        var y = 0;
        var duration = 0.2;
        var count = Math.round(Math.random() * 10) + 20;
        for (var i = 0; i < count; i++) {
            var item = GlobalPool_1.default.get(GlobalEnum_1.GlobalEnum.LevelPrefab.goldIcon);
            this.goldLayer.addChild(item);
            item.setPosition(0, 0);
            item.setScale(1, 1);
            var action = cc.moveTo(duration, x + (Math.random() - 0.5) * 250, y + (Math.random() - 0.5) * 250);
            action.easing(cc.easeOut(2));
            item.runAction(action);
        }
        this.scheduleOnce(this.toTarget, duration);
    };
    GoldAnim.prototype.toTarget = function () {
        var duration = 0.8;
        var action = cc.spawn(cc.scaleTo(duration, 0.5, 0.5), cc.moveTo(duration, this.targetPos));
        action.easing(cc.easeIn(2));
        var delay = 0.005;
        var totalDelay = this.goldLayer.childrenCount * delay;
        for (var i = this.goldLayer.childrenCount - 1; i >= 0; --i) {
            this.goldLayer.children[i].runAction(cc.sequence(cc.delayTime(totalDelay - i * delay), action.clone()));
        }
        this.scheduleOnce(this.playFinish, duration + totalDelay);
    };
    GoldAnim.prototype.playFinish = function () {
        if (!!this.cb) {
            this.cb();
        }
        else {
            this.emit(GameEventType_1.EventType.UIEvent.goldAnimPlayFinish);
        }
        this.reset();
    };
    __decorate([
        property(cc.Node)
    ], GoldAnim.prototype, "goldLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GoldAnim.prototype, "touchMask", void 0);
    __decorate([
        property(cc.Prefab)
    ], GoldAnim.prototype, "goldIconPrefab", void 0);
    GoldAnim = __decorate([
        ccclass
    ], GoldAnim);
    return GoldAnim;
}(yyComponent_1.default));
exports.default = GoldAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxHb2xkQW5pbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELG1EQUE4QztBQUM5Qyx3REFBdUQ7QUFDdkQsOERBQXlEO0FBQ3pELG1EQUE4QztBQUU5QyxPQUFPO0FBQ0QsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUFzQyw0QkFBVztJQURqRDtRQUFBLHFFQStFQztRQTNFYSxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsb0JBQWMsR0FBYyxJQUFJLENBQUM7O0lBdUUvQyxDQUFDO0lBbEVVLHdCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVNLHVCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzlCLG9CQUFVLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDUywyQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNNLHdCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLENBQUMs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bnQiOlsiaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcbmltcG9ydCBHbG9iYWxQb29sIGZyb20gXCIuLi9Db21tb24vR2xvYmFsUG9vbFwiO1xuaW1wb3J0IHsgR2xvYmFsRW51bSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HbG9iYWxFbnVtXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuaW1wb3J0IFBsYXllckFzc2V0QmFyIGZyb20gXCIuL1BsYXllckFzc2V0QmFyXCI7XG5cbi8v6YeR5biB5Yqo55S75bGCXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29sZEFuaW0gZXh0ZW5kcyB5eUNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcm90ZWN0ZWQgZ29sZExheWVyOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcm90ZWN0ZWQgdG91Y2hNYXNrOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHByb3RlY3RlZCBnb2xkSWNvblByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCB0YXJnZXRQb3M6IGNjLlZlYzI7XG4gICAgcHJvdGVjdGVkIGNiOiBGdW5jdGlvbjtcblxuICAgIHB1YmxpYyBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0UG9zID0gY2MudjIoMCwgMCk7XG4gICAgICAgIHRoaXMuY2IgPSBudWxsO1xuICAgICAgICB0aGlzLnRvdWNoTWFzay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgR2xvYmFsUG9vbC5jcmVhdGVQb29sKEdsb2JhbEVudW0uTGV2ZWxQcmVmYWIuZ29sZEljb24sIHRoaXMuZ29sZEljb25QcmVmYWIpO1xuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuVUlFdmVudC5wbGF5R29sZEFtaW4sIHRoaXMucGxheSwgdGhpcyk7XG4gICAgfVxuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpcy5jYiA9IG51bGw7XG4gICAgICAgIHRoaXMudG91Y2hNYXNrLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5nb2xkTGF5ZXIuY2hpbGRyZW5Db3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICB0aGlzLmdvbGRMYXllci5jaGlsZHJlbltpXS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgR2xvYmFsUG9vbC5wdXQodGhpcy5nb2xkTGF5ZXIuY2hpbGRyZW5baV0sIEdsb2JhbEVudW0uTGV2ZWxQcmVmYWIuZ29sZEljb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBsYXkoZGF0YTogeyB0YXJnZXRQb3M6IGNjLlZlYzIsIGNiOiBGdW5jdGlvbiB9KSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy50b3VjaE1hc2suYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgaWYgKCEhZGF0YS50YXJnZXRQb3MpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UG9zLnNldChkYXRhLnRhcmdldFBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFBvcy5zZXQoUGxheWVyQXNzZXRCYXIuZ29sZFBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYiA9IGRhdGEuY2I7XG4gICAgICAgIGxldCB4ID0gMDtcbiAgICAgICAgbGV0IHkgPSAwO1xuICAgICAgICBsZXQgZHVyYXRpb24gPSAwLjI7XG4gICAgICAgIGxldCBjb3VudCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKSArIDIwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gR2xvYmFsUG9vbC5nZXQoR2xvYmFsRW51bS5MZXZlbFByZWZhYi5nb2xkSWNvbik7XG4gICAgICAgICAgICB0aGlzLmdvbGRMYXllci5hZGRDaGlsZChpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgICAgICAgICBpdGVtLnNldFNjYWxlKDEsIDEpO1xuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLm1vdmVUbyhkdXJhdGlvbiwgeCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI1MCwgeSArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI1MCk7XG4gICAgICAgICAgICBhY3Rpb24uZWFzaW5nKGNjLmVhc2VPdXQoMikpO1xuICAgICAgICAgICAgaXRlbS5ydW5BY3Rpb24oYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnRvVGFyZ2V0LCBkdXJhdGlvbik7XG4gICAgfVxuICAgIHByb3RlY3RlZCB0b1RhcmdldCgpIHtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gMC44O1xuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc3Bhd24oY2Muc2NhbGVUbyhkdXJhdGlvbiwgMC41LCAwLjUpLCBjYy5tb3ZlVG8oZHVyYXRpb24sIHRoaXMudGFyZ2V0UG9zKSkgYXMgY2MuQWN0aW9uSW50ZXJ2YWw7XG4gICAgICAgIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUluKDIpKTtcbiAgICAgICAgbGV0IGRlbGF5ID0gMC4wMDU7XG4gICAgICAgIGxldCB0b3RhbERlbGF5ID0gdGhpcy5nb2xkTGF5ZXIuY2hpbGRyZW5Db3VudCAqIGRlbGF5O1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5nb2xkTGF5ZXIuY2hpbGRyZW5Db3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICB0aGlzLmdvbGRMYXllci5jaGlsZHJlbltpXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKHRvdGFsRGVsYXkgLSBpICogZGVsYXkpLCBhY3Rpb24uY2xvbmUoKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMucGxheUZpbmlzaCwgZHVyYXRpb24gKyB0b3RhbERlbGF5KTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHBsYXlGaW5pc2goKSB7XG4gICAgICAgIGlmICghIXRoaXMuY2IpIHtcbiAgICAgICAgICAgIHRoaXMuY2IoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5nb2xkQW5pbVBsYXlGaW5pc2gpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG59XG4iXX0=