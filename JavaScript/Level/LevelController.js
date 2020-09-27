
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Level/LevelController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8777QXxtFFMIfTv+nrn8SC', 'LevelController');
// myGame/Script/Level/LevelController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameEventType_1 = require("../GameSpecial/GameEventType");
var yyComponent_1 = require("../Common/yyComponent");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//关卡中的控制器，接收玩家操作
var LevelController = /** @class */ (function (_super) {
    __extends(LevelController, _super);
    function LevelController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelController.prototype.init = function (wgTarget) {
        if (!!wgTarget) {
            var wg = this.getComponent(cc.Widget);
            if (!!wg) {
                wg.target = wgTarget;
            }
        }
        this.initComponents();
        this.initCustomUpdateState();
        this.initTouchState();
        this.onEvents();
        this.registAllCustomUpdate();
        // this.setEnable();
    };
    LevelController.prototype.onEvents = function () {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchmove", this.onTouchMove, this);
        this.node.on("touchend", this.onTouchEnd, this);
        this.on(GameEventType_1.EventType.CtrlEvent.ctrlStart, this.setEnable, this);
        this.on(GameEventType_1.EventType.CtrlEvent.ctrlEnd, this.setDisable, this);
    };
    LevelController.prototype.registAllCustomUpdate = function () {
        this.registCustomUpdate(GlobalEnum_1.GlobalEnum.CtrlState.touched, this.stepTouchStay);
    };
    LevelController.prototype.reset = function () {
        this.resetTouchState();
    };
    LevelController.prototype.reuse = function () {
        this.reset();
    };
    LevelController.prototype.unuse = function () {
    };
    //启用触摸操作层
    LevelController.prototype.setEnable = function () {
        this.reset();
        this.node.active = true;
    };
    //禁用触摸操作层
    LevelController.prototype.setDisable = function () {
        this.reset();
        this.node.active = false;
    };
    LevelController.prototype.getTouchData = function (e) {
        return {
            startTime: this.touchStartTime,
            stayTime: this.touchStayTime,
            path: this.touchPath,
            e: e
        };
    };
    LevelController.prototype.initTouchState = function () {
        this.touched = false;
        this.touchId = -1;
        this.touchStartTime = -1;
        this.touchStayTime = 0;
        this.touchPath = [];
    };
    LevelController.prototype.resetTouchState = function () {
        this.touched = false;
        this.touchId = -1;
        this.touchStartTime = -1;
        this.touchStayTime = 0;
        this.touchPath = [];
    };
    //触摸开始
    LevelController.prototype.onTouchStart = function (e) {
        //屏蔽多点触摸
        if (this.isMultipleTouch(e))
            return;
        //记录触摸状态
        this.touched = true;
        this.touchId = e.getID();
        this.touchStartTime = Date.now();
        this.touchStayTime = 0;
        var p = e.getLocation();
        this.touchPath.push(p);
        this.emit(GameEventType_1.EventType.CtrlEvent.touchStart, this.getTouchData(e));
        this.enterCustomUpdateState(GlobalEnum_1.GlobalEnum.CtrlState.touched);
    };
    //触摸移动
    LevelController.prototype.onTouchMove = function (e) {
        if (!this.isCurTouchEvent(e))
            return;
        var p = e.getLocation();
        this.touchPath.push(p);
        this.emit(GameEventType_1.EventType.CtrlEvent.touchMove, this.getTouchData(e));
    };
    //触摸结束
    LevelController.prototype.onTouchEnd = function (e) {
        if (!this.isCurTouchEvent(e))
            return;
        var p = e.getLocation();
        this.touchPath.push(p);
        //todo:测试
        var data = this.getTouchData(e);
        data.path = [data.path[0], data.path[data.path.length - 1]];
        // this.emit(EventType.CtrlEvent.touchMove, data);
        this.emit(GameEventType_1.EventType.CtrlEvent.touchEnd, this.getTouchData(e));
        this.resetTouchState();
        this.enterCustomUpdateState(GlobalEnum_1.GlobalEnum.CtrlState.none);
    };
    /**
     * 是否多重触摸
     * @param e 触摸事件
     */
    LevelController.prototype.isMultipleTouch = function (e) {
        return e.getTouches().length > 1;
    };
    //是否当前已记录的有效的触摸事件
    LevelController.prototype.isCurTouchEvent = function (e) {
        return e.getID() == this.touchId;
    };
    LevelController.prototype.stepTouchStay = function (dt) {
        if (this.touched) {
            this.touchStayTime += dt;
            this.emit(GameEventType_1.EventType.CtrlEvent.touchStay, this.getTouchData(null));
        }
    };
    LevelController = __decorate([
        ccclass
    ], LevelController);
    return LevelController;
}(yyComponent_1.default));
exports.default = LevelController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXExldmVsXFxMZXZlbENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUF5RDtBQUN6RCxxREFBZ0Q7QUFDaEQsd0RBQXVEO0FBR2pELElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFDNUMsZ0JBQWdCO0FBRWhCO0lBQTZDLG1DQUFXO0lBQXhEOztJQTBJQSxDQUFDO0lBdklVLDhCQUFJLEdBQVgsVUFBWSxRQUFrQjtRQUMxQixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDWixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ04sRUFBRSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7YUFDeEI7U0FDSjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTdCLG9CQUFvQjtJQUN4QixDQUFDO0lBQ1Msa0NBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRCxJ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LENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0QsQ0FBQztJQUNEOzs7T0FHRztJQUNLLHlDQUFlLEdBQXZCLFVBQXdCLENBQUM7UUFDckIsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1QseUNBQWUsR0FBdkIsVUFBd0IsQ0FBQztRQUNyQixPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFTyx1Q0FBYSxHQUFyQixVQUFzQixFQUFVO1FBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNyRTtJQUNMLENBQUM7SUF6SWdCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0EwSW5DO0lBQUQsc0JBQUM7Q0ExSUQsQUEwSUMsQ0ExSTRDLHFCQUFXLEdBMEl2RDtrQkExSW9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcbmltcG9ydCB7IEdsb2JhbEVudW0gfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2xvYmFsRW51bVwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG4vL+WFs+WNoeS4reeahOaOp+WItuWZqO+8jOaOpeaUtueOqeWutuaTjeS9nFxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsQ29udHJvbGxlciBleHRlbmRzIHl5Q29tcG9uZW50IHtcblxuXG4gICAgcHVibGljIGluaXQod2dUYXJnZXQ/OiBjYy5Ob2RlKSB7XG4gICAgICAgIGlmICghIXdnVGFyZ2V0KSB7XG4gICAgICAgICAgICBsZXQgd2cgPSB0aGlzLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICAgICAgaWYgKCEhd2cpIHtcbiAgICAgICAgICAgICAgICB3Zy50YXJnZXQgPSB3Z1RhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRDb21wb25lbnRzKCk7XG4gICAgICAgIHRoaXMuaW5pdEN1c3RvbVVwZGF0ZVN0YXRlKCk7XG5cbiAgICAgICAgdGhpcy5pbml0VG91Y2hTdGF0ZSgpO1xuXG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RBbGxDdXN0b21VcGRhdGUoKTtcblxuICAgICAgICAvLyB0aGlzLnNldEVuYWJsZSgpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudHMoKSB7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2hzdGFydFwiLCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihcInRvdWNobW92ZVwiLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2hlbmRcIiwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcblxuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5DdHJsRXZlbnQuY3RybFN0YXJ0LCB0aGlzLnNldEVuYWJsZSwgdGhpcyk7XG4gICAgICAgIHRoaXMub24oRXZlbnRUeXBlLkN0cmxFdmVudC5jdHJsRW5kLCB0aGlzLnNldERpc2FibGUsIHRoaXMpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgcmVnaXN0QWxsQ3VzdG9tVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdEN1c3RvbVVwZGF0ZShHbG9iYWxFbnVtLkN0cmxTdGF0ZS50b3VjaGVkLCB0aGlzLnN0ZXBUb3VjaFN0YXkpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRUb3VjaFN0YXRlKCk7XG5cbiAgICB9XG4gICAgcHVibGljIHJldXNlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICB9XG4gICAgcHVibGljIHVudXNlKCkge1xuXG4gICAgfVxuXG4gICAgLy/lkK/nlKjop6bmkbjmk43kvZzlsYJcbiAgICBwdWJsaWMgc2V0RW5hYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICAvL+emgeeUqOinpuaRuOaTjeS9nOWxglxuICAgIHB1YmxpYyBzZXREaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+inpuaRuOaTjeS9nOWKn+iDve+8mlxuICAgIHByaXZhdGUgdG91Y2hlZDogYm9vbGVhbjsgICAgICAgLy/mmK/lkKbop6bmkbjkuK1cbiAgICBwcml2YXRlIHRvdWNoSWQ6IG51bWJlcjsgICAgICAgIC8v6Kem5pG45LqL5Lu2SUTvvIzlpJrngrnop6bmkbjml7bvvIzlj6rmnInnrKzkuIDkuKrop6bmkbjngrnmnInmlYhcbiAgICBwcml2YXRlIHRvdWNoU3RhcnRUaW1lOiBudW1iZXI7IC8v6Kem5pG45byA5aeL5pe255qE5pe26Ze0XG4gICAgcHJpdmF0ZSB0b3VjaFN0YXlUaW1lOiBudW1iZXI7ICAvL+inpuaRuOaMgee7reaXtumXtO+8jOWNleS9je+8muenklxuICAgIHByaXZhdGUgdG91Y2hQYXRoOiBjYy5WZWMyW107ICAgLy/op6bmkbjnp7vliqjnmoTot6/lvoTlnZDmoIdcbiAgICBwcml2YXRlIGdldFRvdWNoRGF0YShlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydFRpbWU6IHRoaXMudG91Y2hTdGFydFRpbWUsXG4gICAgICAgICAgICBzdGF5VGltZTogdGhpcy50b3VjaFN0YXlUaW1lLFxuICAgICAgICAgICAgcGF0aDogdGhpcy50b3VjaFBhdGgsXG4gICAgICAgICAgICBlOiBlXG4gICAgICAgIH07XG4gICAgfVxuICAgIHByaXZhdGUgaW5pdFRvdWNoU3RhdGUoKSB7XG4gICAgICAgIHRoaXMudG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvdWNoSWQgPSAtMTtcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0VGltZSA9IC0xO1xuICAgICAgICB0aGlzLnRvdWNoU3RheVRpbWUgPSAwO1xuICAgICAgICB0aGlzLnRvdWNoUGF0aCA9IFtdO1xuICAgIH1cbiAgICBwcml2YXRlIHJlc2V0VG91Y2hTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy50b3VjaGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG91Y2hJZCA9IC0xO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRUaW1lID0gLTE7XG4gICAgICAgIHRoaXMudG91Y2hTdGF5VGltZSA9IDA7XG4gICAgICAgIHRoaXMudG91Y2hQYXRoID0gW107XG4gICAgfVxuICAgIC8v6Kem5pG45byA5aeLXG4gICAgcHJpdmF0ZSBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgICAvL+Wxj+iUveWkmueCueinpuaRuFxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlVG91Y2goZSkpIHJldHVybjtcbiAgICAgICAgLy/orrDlvZXop6bmkbjnirbmgIFcbiAgICAgICAgdGhpcy50b3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b3VjaElkID0gZS5nZXRJRCgpO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy50b3VjaFN0YXlUaW1lID0gMDtcbiAgICAgICAgbGV0IHAgPSBlLmdldExvY2F0aW9uKCk7XG4gICAgICAgIHRoaXMudG91Y2hQYXRoLnB1c2gocCk7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQ3RybEV2ZW50LnRvdWNoU3RhcnQsIHRoaXMuZ2V0VG91Y2hEYXRhKGUpKTtcbiAgICAgICAgdGhpcy5lbnRlckN1c3RvbVVwZGF0ZVN0YXRlKEdsb2JhbEVudW0uQ3RybFN0YXRlLnRvdWNoZWQpO1xuICAgIH1cbiAgICAvL+inpuaRuOenu+WKqFxuICAgIHByaXZhdGUgb25Ub3VjaE1vdmUoZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDdXJUb3VjaEV2ZW50KGUpKSByZXR1cm47XG4gICAgICAgIGxldCBwID0gZS5nZXRMb2NhdGlvbigpO1xuICAgICAgICB0aGlzLnRvdWNoUGF0aC5wdXNoKHApO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkN0cmxFdmVudC50b3VjaE1vdmUsIHRoaXMuZ2V0VG91Y2hEYXRhKGUpKTtcbiAgICB9XG4gICAgLy/op6bmkbjnu5PmnZ9cbiAgICBwcml2YXRlIG9uVG91Y2hFbmQoZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDdXJUb3VjaEV2ZW50KGUpKSByZXR1cm47XG4gICAgICAgIGxldCBwID0gZS5nZXRMb2NhdGlvbigpO1xuICAgICAgICB0aGlzLnRvdWNoUGF0aC5wdXNoKHApO1xuXG4gICAgICAgIC8vdG9kbzrmtYvor5VcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldFRvdWNoRGF0YShlKTtcbiAgICAgICAgZGF0YS5wYXRoID0gW2RhdGEucGF0aFswXSwgZGF0YS5wYXRoW2RhdGEucGF0aC5sZW5ndGggLSAxXV07XG4gICAgICAgIC8vIHRoaXMuZW1pdChFdmVudFR5cGUuQ3RybEV2ZW50LnRvdWNoTW92ZSwgZGF0YSk7XG5cbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5DdHJsRXZlbnQudG91Y2hFbmQsIHRoaXMuZ2V0VG91Y2hEYXRhKGUpKTtcbiAgICAgICAgdGhpcy5yZXNldFRvdWNoU3RhdGUoKTtcbiAgICAgICAgdGhpcy5lbnRlckN1c3RvbVVwZGF0ZVN0YXRlKEdsb2JhbEVudW0uQ3RybFN0YXRlLm5vbmUpO1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaYr+WQpuWkmumHjeinpuaRuFxuICAgICAqIEBwYXJhbSBlIOinpuaRuOS6i+S7tlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNNdWx0aXBsZVRvdWNoKGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGUuZ2V0VG91Y2hlcygpLmxlbmd0aCA+IDE7XG4gICAgfVxuICAgIC8v5piv5ZCm5b2T5YmN5bey6K6w5b2V55qE5pyJ5pWI55qE6Kem5pG45LqL5Lu2XG4gICAgcHJpdmF0ZSBpc0N1clRvdWNoRXZlbnQoZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZS5nZXRJRCgpID09IHRoaXMudG91Y2hJZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0ZXBUb3VjaFN0YXkoZHQ6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy50b3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoU3RheVRpbWUgKz0gZHQ7XG4gICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkN0cmxFdmVudC50b3VjaFN0YXksIHRoaXMuZ2V0VG91Y2hEYXRhKG51bGwpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==