
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/TipMessage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2e110zduUBEK4e/g7CUwHgG', 'TipMessage');
// myGame/Script/Common/TipMessage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("./yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
//信息提示节点
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TipMessage = /** @class */ (function (_super) {
    __extends(TipMessage, _super);
    function TipMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msg = null;
        _this.bg = null;
        _this.tipNode = null;
        _this.action = null;
        return _this;
    }
    TipMessage.prototype.onLoad = function () {
        this.init();
    };
    TipMessage.prototype.init = function () {
        this.action = cc.sequence(cc.delayTime(1), cc.fadeOut(0.5), cc.callFunc(this.onFadeOut, this));
        this.setMsg("");
        this.onEvents();
        this.hide();
    };
    TipMessage.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.UIEvent.showTip, this.show, this);
    };
    TipMessage.prototype.reset = function () {
        this.tipNode.active = true;
        this.tipNode.stopAllActions();
        this.tipNode.opacity = 0;
    };
    TipMessage.prototype.show = function (msg) {
        this.reset();
        this.node.active = true;
        this.setMsg(msg);
        this.scheduleOnce(this.play.bind(this), 0);
    };
    TipMessage.prototype.hide = function () {
        this.node.active = false;
    };
    TipMessage.prototype.setMsg = function (msg) {
        this.msg.string = msg;
    };
    TipMessage.prototype.play = function () {
        this.tipNode.opacity = 255;
        this.tipNode.runAction(this.action);
    };
    TipMessage.prototype.onFadeOut = function () {
        this.hide();
    };
    __decorate([
        property(cc.Label)
    ], TipMessage.prototype, "msg", void 0);
    __decorate([
        property(cc.Node)
    ], TipMessage.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], TipMessage.prototype, "tipNode", void 0);
    TipMessage = __decorate([
        ccclass
    ], TipMessage);
    return TipMessage;
}(yyComponent_1.default));
exports.default = TipMessage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcVGlwTWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLDhEQUF5RDtBQUV6RCxRQUFRO0FBQ0YsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUF3Qyw4QkFBVztJQURuRDtRQUFBLHFFQWlEQztRQTdDVyxTQUFHLEdBQWEsSUFBSSxDQUFDO1FBRXJCLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFFbkIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixZQUFNLEdBQWMsSUFBSSxDQUFDOztJQXVDckMsQ0FBQztJQXJDRywyQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDTSx5QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNTLDZCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ00sMEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ00seUJBQUksR0FBWCxVQUFZLEdBQVc7UUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ00seUJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU8sMkJBQU0sR0FBZCxVQUFlLEdBQVc7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFDTyx5QkFBSSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ08sOEJBQVMsR0FBakI7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQTVDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNVO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ1M7SUFFM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDYztJQVBmLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FnRDlCO0lBQUQsaUJBQUM7Q0FoREQsQUFnREMsQ0FoRHVDLHFCQUFXLEdBZ0RsRDtrQkFoRG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeXlDb21wb25lbnQgZnJvbSBcIi4veXlDb21wb25lbnRcIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HYW1lRXZlbnRUeXBlXCI7XG5cbi8v5L+h5oGv5o+Q56S66IqC54K5XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlwTWVzc2FnZSBleHRlbmRzIHl5Q29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIG1zZzogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgYmc6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdGlwTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGFjdGlvbjogY2MuQWN0aW9uID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmFjdGlvbiA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgxKSwgY2MuZmFkZU91dCgwLjUpLCBjYy5jYWxsRnVuYyh0aGlzLm9uRmFkZU91dCwgdGhpcykpO1xuICAgICAgICB0aGlzLnNldE1zZyhcIlwiKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50cygpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uRXZlbnRzKCkge1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5VSUV2ZW50LnNob3dUaXAsIHRoaXMuc2hvdywgdGhpcyk7XG4gICAgfVxuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpcy50aXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGlwTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLnRpcE5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuICAgIHB1YmxpYyBzaG93KG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0TXNnKG1zZyk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMucGxheS5iaW5kKHRoaXMpLCAwKTtcbiAgICB9XG4gICAgcHVibGljIGhpZGUoKSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE1zZyhtc2c6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1zZy5zdHJpbmcgPSBtc2c7XG4gICAgfVxuICAgIHByaXZhdGUgcGxheSgpIHtcbiAgICAgICAgdGhpcy50aXBOb2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHRoaXMudGlwTm9kZS5ydW5BY3Rpb24odGhpcy5hY3Rpb24pO1xuICAgIH1cbiAgICBwcml2YXRlIG9uRmFkZU91dCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxufVxuIl19