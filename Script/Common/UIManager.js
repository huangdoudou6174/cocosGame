
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a631Zg5tdBK4qe5kWMWoPA', 'UIManager');
// myGame/Script/Common/UIManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameEventType_1 = require("../GameSpecial/GameEventType");
var Loader_1 = require("./Loader");
var EventManager_1 = require("./EventManager");
/**UI管理器 */
var UIManager = /** @class */ (function () {
    function UIManager() {
    }
    UIManager.init = function (node) {
        this.node = node;
        this.UIs = {};
        this.onEvents();
    };
    UIManager.onEvents = function () {
        EventManager_1.default.on(GameEventType_1.EventType.UIEvent.enter, this.enterUI, this);
        EventManager_1.default.on(GameEventType_1.EventType.UIEvent.exit, this.exitUI, this);
    };
    /**获取指定UI脚本 */
    UIManager.getUI = function (type) {
        if (!this.UIs[type]) {
            console.warn("UI尚未加载，无法获取：", type);
            return null;
        }
        return this.UIs[type];
    };
    UIManager.enterUI = function (ui, data) {
        var iui = this.UIs[ui];
        if (null === iui)
            return;
        if (!!iui) {
            this.showUI(ui, data);
        }
        else {
            this.loadUI(ui, data);
        }
    };
    UIManager.showUI = function (ui, data) {
        var js = this.UIs[ui];
        if (!!js) {
            js.show(data);
            EventManager_1.default.emit(GameEventType_1.EventType.UIEvent.entered, ui);
        }
    };
    UIManager.loadUI = function (ui, data) {
        var _this = this;
        var js = cc.find("Canvas").getComponentInChildren(ui);
        if (!!js) {
            this.UIs[ui] = js;
            this.showUI(ui, data);
        }
        else {
            Loader_1.default.loadRes("myGame/Prefab/UI/" + ui, function (res) {
                if (!res) {
                    _this.UIs[ui] = null;
                    console.error("要显示的界面预制不存在：", ui);
                    return;
                }
                var node = cc.instantiate(res);
                _this.node.getChildByName(ui).addChild(node);
                var wg = node.getComponent(cc.Widget);
                if (!!wg) {
                    wg.updateAlignment();
                }
                var ly = node.getComponent(cc.Layout);
                if (!!ly) {
                    ly.updateLayout();
                }
                var js = node.getComponent(ui);
                js.init();
                _this.UIs[ui] = js;
                _this.showUI(ui, data);
            });
        }
    };
    UIManager.exitUI = function (ui) {
        var js = this.UIs[ui];
        if (!!js) {
            js.hide();
            EventManager_1.default.emit(GameEventType_1.EventType.UIEvent.exited, ui);
        }
    };
    return UIManager;
}());
exports.default = UIManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcVUlNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw4REFBeUQ7QUFDekQsbUNBQThCO0FBQzlCLCtDQUEwQztBQUUxQyxXQUFXO0FBQ1g7SUFBQTtJQTJFQSxDQUFDO0lBeEVpQixjQUFJLEdBQWxCLFVBQW1CLElBQWE7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNnQixrQkFBUSxHQUF6QjtRQUNJLHNCQUFZLENBQUMsRUFBRSxDQUFDLHlCQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELHNCQUFZLENBQUMsRUFBRSxDQUFDLHlCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxjQUFjO0lBQ0EsZUFBSyxHQUFuQixVQUFvQixJQUFtQjtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFZ0IsaUJBQU8sR0FBeEIsVUFBeUIsRUFBaUIsRUFBRSxJQUFVO1FBQ2xELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLEtBQUssR0FBRztZQUFFLE9BQU87UUFDekIsSUFB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LCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElVSSB9IGZyb20gXCIuLi9VSS9JVUlcIjtcclxuaW1wb3J0IHsgR2xvYmFsRW51bSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HbG9iYWxFbnVtXCI7XHJcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HYW1lRXZlbnRUeXBlXCI7XHJcbmltcG9ydCBMb2FkZXIgZnJvbSBcIi4vTG9hZGVyXCI7XHJcbmltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSBcIi4vRXZlbnRNYW5hZ2VyXCI7XHJcblxyXG4vKipVSeeuoeeQhuWZqCAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1hbmFnZXIge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBub2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBVSXM6IHsgW3R5cGU6IHN0cmluZ106IElVSSB9O1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0KG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMuVUlzID0ge307XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBvbkV2ZW50cygpIHtcclxuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLlVJRXZlbnQuZW50ZXIsIHRoaXMuZW50ZXJVSSwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS5VSUV2ZW50LmV4aXQsIHRoaXMuZXhpdFVJLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bmjIflrppVSeiEmuacrCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRVSSh0eXBlOiBHbG9iYWxFbnVtLlVJKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlVJc1t0eXBlXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVSeWwmuacquWKoOi9ve+8jOaXoOazleiOt+WPlu+8mlwiLCB0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLlVJc1t0eXBlXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGVudGVyVUkodWk6IEdsb2JhbEVudW0uVUksIGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgaXVpID0gdGhpcy5VSXNbdWldO1xyXG4gICAgICAgIGlmIChudWxsID09PSBpdWkpIHJldHVybjtcclxuICAgICAgICBpZiAoISFpdWkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VUkodWksIGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFVJKHVpLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHNob3dVSSh1aTogR2xvYmFsRW51bS5VSSwgZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBqcyA9IHRoaXMuVUlzW3VpXTtcclxuICAgICAgICBpZiAoISFqcykge1xyXG4gICAgICAgICAgICBqcy5zaG93KGRhdGEpO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZW1pdChFdmVudFR5cGUuVUlFdmVudC5lbnRlcmVkLCB1aSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBsb2FkVUkodWk6IEdsb2JhbEVudW0uVUksIGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQganMgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4odWkpO1xyXG4gICAgICAgIGlmICghIWpzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVUlzW3VpXSA9IGpzO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dVSSh1aSwgZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9hZGVyLmxvYWRSZXMoXCJteUdhbWUvUHJlZmFiL1VJL1wiICsgdWksIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VSXNbdWldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6KaB5pi+56S655qE55WM6Z2i6aKE5Yi25LiN5a2Y5Zyo77yaXCIsIHVpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodWkpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdnID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICghIXdnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2cudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbHkgPSBub2RlLmdldENvbXBvbmVudChjYy5MYXlvdXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhbHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBseS51cGRhdGVMYXlvdXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBqcyA9IG5vZGUuZ2V0Q29tcG9uZW50KHVpKTtcclxuICAgICAgICAgICAgICAgIGpzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlzW3VpXSA9IGpzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VUkodWksIGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGV4aXRVSSh1aTogR2xvYmFsRW51bS5VSSkge1xyXG4gICAgICAgIGxldCBqcyA9IHRoaXMuVUlzW3VpXTtcclxuICAgICAgICBpZiAoISFqcykge1xyXG4gICAgICAgICAgICBqcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KEV2ZW50VHlwZS5VSUV2ZW50LmV4aXRlZCwgdWkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=