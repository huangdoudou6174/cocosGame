
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/yyComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd4efeSSzFdBZrKmijWVZQ1Z', 'yyComponent');
// myGame/Script/Common/yyComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = require("./EventManager");
//抽象类，自定义脚本基类，包含通用功能
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var yyComponent = /** @class */ (function (_super) {
    __extends(yyComponent, _super);
    function yyComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._customId = null;
        //通用的事件功能：
        /**
         * 记录所有事件类型与对应回调函数的字典，销毁脚本时，根据此字典注销其事件
         * key:事件类型枚举值
         * value:事件类型对应的回调函数数组
         */
        _this.events = {};
        /**
         * 记录所有只触发一次的事件类型与对应回调函数的字典
         * key:事件类型枚举值
         * value:事件类型对应的回调函数数组
         */
        _this.onceEvents = {};
        return _this;
    }
    yyComponent_1 = yyComponent;
    Object.defineProperty(yyComponent.prototype, "Id", {
        get: function () {
            if (null === this._customId) {
                this._customId = yyComponent_1._autoId++;
            }
            return this._customId;
        },
        enumerable: true,
        configurable: true
    });
    /**从数组中移除元素，只限于yyComponent的子类，返回结果是否移除成功 */
    yyComponent.prototype.removeElementInArray = function (ele, arr) {
        var id = ele.Id;
        for (var i = 0, count = arr.length; i < count; ++i) {
            if (arr[i].Id == id) {
                arr.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    //适用于自动对象池的接口函数，需在子类重写
    /**初始化数据，取代原有的onLoad方法，子类实现 */
    yyComponent.prototype.init = function (data) {
        this.initComponents();
        this.registAllCustomUpdate();
        this.onEvents();
        if (!!data)
            this.setData(data);
    };
    /**初始化脚本以外的其他组件 */
    yyComponent.prototype.initComponents = function () {
        if (!!this.node.parent) {
            var wg = this.node.getComponent(cc.Widget);
            if (!!wg) {
                wg.updateAlignment();
            }
            var ly = this.node.getComponent(cc.Layout);
            if (!!ly) {
                ly.updateLayout();
            }
        }
    };
    /**注册通过自定义事件管理器管理的事件，子类实现 */
    yyComponent.prototype.onEvents = function () { };
    /**注册所有自定义运行状态与函数，子类实现 */
    yyComponent.prototype.registAllCustomUpdate = function () { };
    /**重置状态、数据等，子类实现 */
    yyComponent.prototype.reset = function () { };
    /**设置状态、数据等，子类实现 */
    yyComponent.prototype.setData = function (data) { };
    /**从对象池中取回实例重新使用时将执行的方法，可重置状态、数据，设置新的状态、数据 */
    yyComponent.prototype.reuse = function (data) {
        this.reset();
        this.onEvents();
        if (!!data)
            this.setData(data);
    };
    /**放回对象池时将执行的方法，应当注销事件、计时器等 */
    yyComponent.prototype.unuse = function () {
        this.reset();
        this.offEvents();
    };
    Object.defineProperty(yyComponent.prototype, "customUpdateState", {
        get: function () { return this._customUpdateState; },
        enumerable: true,
        configurable: true
    });
    yyComponent.prototype.stepEmpty = function (dt) { };
    /**初始化运行状态 */
    yyComponent.prototype.initCustomUpdateState = function () {
        this._customUpdateState = null;
        this.customStep = this.stepEmpty;
        this.customUpdateMap = {};
    };
    /**重置运行状态 */
    yyComponent.prototype.resetCustomUpdateState = function () {
        this._customUpdateState = null;
        this.customStep = this.stepEmpty;
    };
    /**注册运行状态与函数，注册后，脚本切换到该状态时，自定义更新函数中将执行该方法 */
    yyComponent.prototype.registCustomUpdate = function (state, step) {
        if (!this.customUpdateMap) {
            this.customUpdateMap = {};
        }
        this.customUpdateMap[state] = step;
    };
    /**切换到指定的运行状态 */
    yyComponent.prototype.enterCustomUpdateState = function (state) {
        if (this._customUpdateState != state) {
            this._customUpdateState = state;
            if (!!this.customUpdateMap[state]) {
                this.customStep = this.customUpdateMap[state];
            }
            else {
                this.customStep = this.stepEmpty;
            }
        }
    };
    /**自定义的每帧更新函数 */
    yyComponent.prototype.customUpdate = function (dt) {
        if (!!this.customStep) {
            this.customStep(dt);
        }
    };
    /**遍历数组执行其自定义的更新函数 */
    yyComponent.prototype.runCustomUpdate = function (cps, dt) {
        for (var i = cps.length - 1; i >= 0; --i) {
            cps[i].customUpdate(dt);
        }
    };
    Object.defineProperty(yyComponent.prototype, "x", {
        //节点相关属性
        get: function () { return this.node.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(yyComponent.prototype, "y", {
        get: function () { return this.node.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(yyComponent.prototype, "z", {
        get: function () { return this.node.z; },
        enumerable: true,
        configurable: true
    });
    yyComponent.prototype.setPosition = function (pos) {
        this.node.setPosition(pos);
    };
    yyComponent.prototype.getPosition = function () {
        if (this.node.is3DNode) {
            return cc.v3(this.x, this.y, this.z);
        }
        else {
            return cc.v3(this.x, this.y);
        }
    };
    Object.defineProperty(yyComponent.prototype, "angleX", {
        get: function () { return this.node.eulerAngles.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(yyComponent.prototype, "angleY", {
        get: function () { return this.node.eulerAngles.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(yyComponent.prototype, "angleZ", {
        get: function () { return this.node.eulerAngles.z; },
        enumerable: true,
        configurable: true
    });
    yyComponent.prototype.setEulerAngles = function (eulerAngles) {
        this.node.eulerAngles = eulerAngles;
    };
    yyComponent.prototype.setScale = function (scale) {
        this.node.setScale(scale);
    };
    /**适用于UI节点，显示UI并设置UI内容 */
    yyComponent.prototype.show = function (data) {
        this.node.active = true;
        if (!!data)
            this.setData(data);
    };
    /**适用于UI节点，隐藏UI */
    yyComponent.prototype.hide = function () {
        this.node.active = false;
    };
    /**获取数据 */
    yyComponent.prototype.getData = function (data) {
        return null;
    };
    /**
     * 注册事件
     * @param {number} type 事件类型枚举值
     * @param {Function} cb 回调函数
     * @param {Object} target 函数所属对象
     */
    yyComponent.prototype.on = function (type, cb, target) {
        var h = EventManager_1.default.on(type, cb, target);
        if (!!h) {
            if (!this.events.hasOwnProperty(type)) {
                this.events[type] = [];
            }
            this.events[type].push(h);
        }
    };
    /**
     * 注册只触发一次的事件
     * @param {number} type 事件类型枚举值
     * @param {Function} cb 回调函数
     * @param {Object} target 函数所属对象
     */
    yyComponent.prototype.once = function (type, cb, target) {
        var h = EventManager_1.default.once(type, cb, target);
        if (!!h) {
            if (!this.onceEvents.hasOwnProperty(type)) {
                this.onceEvents[type] = [];
            }
            this.onceEvents[type].push(h);
        }
    };
    yyComponent.prototype.off = function (type, cb, target) {
        var events = this.events[type];
        if (!!events) {
            for (var i = events.length - 1; i >= 0; --i) {
                if (events[i].cb === cb && events[i].target === target) {
                    EventManager_1.default.off(type, events[i]);
                    events.splice(i, 1);
                }
            }
        }
        events = this.onceEvents[type];
        if (!!events) {
            for (var i = events.length - 1; i >= 0; --i) {
                if (events[i].cb === cb && events[i].target === target) {
                    EventManager_1.default.off(type, events[i]);
                    events.splice(i, 1);
                }
            }
        }
    };
    /**
     * 发送事件
     * @param {number} type 事件类型枚举值
     * @param {any} data 传给回调函数的参数
     */
    yyComponent.prototype.emit = function (type, d1, d2, d3, d4, d5) {
        if (undefined === d1) {
            EventManager_1.default.emit(type);
        }
        else if (undefined === d2) {
            EventManager_1.default.emit(type, d1);
        }
        else if (undefined === d3) {
            EventManager_1.default.emit(type, d1, d2);
        }
        else if (undefined === d4) {
            EventManager_1.default.emit(type, d1, d2, d3);
        }
        else if (undefined === d5) {
            EventManager_1.default.emit(type, d1, d2, d3, d4);
        }
        else {
            EventManager_1.default.emit(type, d1, d2, d3, d4, d5);
        }
        if (this.onceEvents.hasOwnProperty(type))
            delete this.onceEvents[type];
    };
    /**
     * 注销脚本中注册的所有事件
     */
    yyComponent.prototype.offEvents = function () {
        for (var key in this.events) {
            EventManager_1.default.offGroup(key, this.events[key]);
        }
        this.events = {};
        for (var key in this.onceEvents) {
            EventManager_1.default.offGroup(key, this.onceEvents[key]);
        }
        this.onceEvents = {};
    };
    yyComponent.prototype.onDestroy = function () {
        this.offEvents();
    };
    var yyComponent_1;
    //自动id
    yyComponent._autoId = 1;
    yyComponent = yyComponent_1 = __decorate([
        ccclass
    ], yyComponent);
    return yyComponent;
}(cc.Component));
exports.default = yyComponent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxceXlDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUF1RDtBQUd2RCxvQkFBb0I7QUFDZCxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBRHJEO1FBQUEscUVBK1BDO1FBM1BXLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFzSmpDLFVBQVU7UUFDVjs7OztXQUlHO1FBQ0ssWUFBTSxHQUFrQyxFQUFFLENBQUM7UUFDbkQ7Ozs7V0FJRztRQUNLLGdCQUFVLEdBQWtDLEVBQUUsQ0FBQzs7SUF5RjNELENBQUM7b0JBOVBvQixXQUFXO0lBSTVCLHNCQUFXLDJCQUFFO2FBQWI7WUFDSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUNELDJDQUEyQztJQUNwQywwQ0FBb0IsR0FBM0IsVUFBNEIsR0FBZ0IsRUFBRSxHQUFrQjtRQUM1RCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDaEQsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7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SSxDQUFDLFVBQVUsRUFBRTtZQUM3QixzQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7SUE1UEQsTUFBTTtJQUNTLG1CQUFPLEdBQVcsQ0FBQyxDQUFDO0lBRmxCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E4UC9CO0lBQUQsa0JBQUM7Q0E5UEQsQUE4UEMsQ0E5UHdDLEVBQUUsQ0FBQyxTQUFTLEdBOFBwRDtrQkE5UG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRNYW5hZ2VyLCB7IEhhbmRsZXIgfSBmcm9tIFwiLi9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSVBvb2xPYmplY3QgfSBmcm9tIFwiLi9JUG9vbE9iamVjdFwiO1xyXG5cclxuLy/mir3osaHnsbvvvIzoh6rlrprkuYnohJrmnKzln7rnsbvvvIzljIXlkKvpgJrnlKjlip/og71cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHl5Q29tcG9uZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IGltcGxlbWVudHMgSVBvb2xPYmplY3Qge1xyXG4gICAgLy/oh6rliqhpZFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2F1dG9JZDogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgX2N1c3RvbUlkOiBudW1iZXIgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBJZCgpIHtcclxuICAgICAgICBpZiAobnVsbCA9PT0gdGhpcy5fY3VzdG9tSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tSWQgPSB5eUNvbXBvbmVudC5fYXV0b0lkKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21JZDtcclxuICAgIH1cclxuICAgIC8qKuS7juaVsOe7hOS4reenu+mZpOWFg+e0oO+8jOWPqumZkOS6jnl5Q29tcG9uZW5055qE5a2Q57G777yM6L+U5Zue57uT5p6c5piv5ZCm56e76Zmk5oiQ5YqfICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRWxlbWVudEluQXJyYXkoZWxlOiB5eUNvbXBvbmVudCwgYXJyOiB5eUNvbXBvbmVudFtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlkID0gZWxlLklkO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBjb3VudCA9IGFyci5sZW5ndGg7IGkgPCBjb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0uSWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pgILnlKjkuo7oh6rliqjlr7nosaHmsaDnmoTmjqXlj6Plh73mlbDvvIzpnIDlnKjlrZDnsbvph43lhplcclxuICAgIC8qKuWIneWni+WMluaVsOaNru+8jOWPluS7o+WOn+acieeahG9uTG9hZOaWueazle+8jOWtkOexu+WunueOsCAqL1xyXG4gICAgcHVibGljIGluaXQoZGF0YT86IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW5pdENvbXBvbmVudHMoKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdEFsbEN1c3RvbVVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcclxuICAgICAgICBpZiAoISFkYXRhKSB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbiAgICAvKirliJ3lp4vljJbohJrmnKzku6XlpJbnmoTlhbbku5bnu4Tku7YgKi9cclxuICAgIHByb3RlY3RlZCBpbml0Q29tcG9uZW50cygpIHtcclxuICAgICAgICBpZiAoISF0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGxldCB3ZyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgaWYgKCEhd2cpIHtcclxuICAgICAgICAgICAgICAgIHdnLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBseSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcclxuICAgICAgICAgICAgaWYgKCEhbHkpIHtcclxuICAgICAgICAgICAgICAgIGx5LnVwZGF0ZUxheW91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5rOo5YaM6YCa6L+H6Ieq5a6a5LmJ5LqL5Lu2566h55CG5Zmo566h55CG55qE5LqL5Lu277yM5a2Q57G75a6e546wICovXHJcbiAgICBwcm90ZWN0ZWQgb25FdmVudHMoKSB7IH1cclxuICAgIC8qKuazqOWGjOaJgOacieiHquWumuS5iei/kOihjOeKtuaAgeS4juWHveaVsO+8jOWtkOexu+WunueOsCAqL1xyXG4gICAgcHJvdGVjdGVkIHJlZ2lzdEFsbEN1c3RvbVVwZGF0ZSgpIHsgfVxyXG4gICAgLyoq6YeN572u54q25oCB44CB5pWw5o2u562J77yM5a2Q57G75a6e546wICovXHJcbiAgICBwdWJsaWMgcmVzZXQoKSB7IH1cclxuICAgIC8qKuiuvue9rueKtuaAgeOAgeaVsOaNruetie+8jOWtkOexu+WunueOsCAqL1xyXG4gICAgcHJvdGVjdGVkIHNldERhdGEoZGF0YT86IGFueSkgeyB9XHJcbiAgICAvKirku47lr7nosaHmsaDkuK3lj5blm57lrp7kvovph43mlrDkvb/nlKjml7blsIbmiafooYznmoTmlrnms5XvvIzlj6/ph43nva7nirbmgIHjgIHmlbDmja7vvIzorr7nva7mlrDnmoTnirbmgIHjgIHmlbDmja4gKi9cclxuICAgIHB1YmxpYyByZXVzZShkYXRhPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcclxuICAgICAgICBpZiAoISFkYXRhKSB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbiAgICAvKirmlL7lm57lr7nosaHmsaDml7blsIbmiafooYznmoTmlrnms5XvvIzlupTlvZPms6jplIDkuovku7bjgIHorqHml7blmajnrYkgKi9cclxuICAgIHB1YmxpYyB1bnVzZSgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5vZmZFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iHquWumuS5ieeahOi/kOihjOeKtuaAgVxyXG4gICAgcHJvdGVjdGVkIF9jdXN0b21VcGRhdGVTdGF0ZTogYW55O1xyXG4gICAgcHVibGljIGdldCBjdXN0b21VcGRhdGVTdGF0ZSgpIHsgcmV0dXJuIHRoaXMuX2N1c3RvbVVwZGF0ZVN0YXRlOyB9XHJcbiAgICAvKirov5DooYznirbmgIHkuI7ov5DooYzlh73mlbDnmoTmmKDlsITooajvvIxrZXnvvJrov5DooYznirbmgIHmnprkuL7lgLzvvIx2YWx1Ze+8mui/kOihjOWHveaVsCAqL1xyXG4gICAgcHJvdGVjdGVkIGN1c3RvbVVwZGF0ZU1hcDtcclxuICAgIC8v5b2T5YmN54q25oCB5a+55bqU55qE5q+P5bin5pu05paw5Ye95pWwXHJcbiAgICBwcm90ZWN0ZWQgY3VzdG9tU3RlcDogKGR0OiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBwcm90ZWN0ZWQgc3RlcEVtcHR5KGR0OiBudW1iZXIpIHsgfVxyXG4gICAgLyoq5Yid5aeL5YyW6L+Q6KGM54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdEN1c3RvbVVwZGF0ZVN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbVVwZGF0ZVN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1c3RvbVN0ZXAgPSB0aGlzLnN0ZXBFbXB0eTtcclxuICAgICAgICB0aGlzLmN1c3RvbVVwZGF0ZU1hcCA9IHt9O1xyXG4gICAgfVxyXG4gICAgLyoq6YeN572u6L+Q6KGM54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRDdXN0b21VcGRhdGVTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9jdXN0b21VcGRhdGVTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXN0b21TdGVwID0gdGhpcy5zdGVwRW1wdHk7XHJcbiAgICB9XHJcbiAgICAvKirms6jlhozov5DooYznirbmgIHkuI7lh73mlbDvvIzms6jlhozlkI7vvIzohJrmnKzliIfmjaLliLDor6XnirbmgIHml7bvvIzoh6rlrprkuYnmm7TmlrDlh73mlbDkuK3lsIbmiafooYzor6Xmlrnms5UgKi9cclxuICAgIHByb3RlY3RlZCByZWdpc3RDdXN0b21VcGRhdGUoc3RhdGU6IGFueSwgc3RlcDogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tVXBkYXRlTWFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tVXBkYXRlTWFwID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VzdG9tVXBkYXRlTWFwW3N0YXRlXSA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICAvKirliIfmjaLliLDmjIflrprnmoTov5DooYznirbmgIEgKi9cclxuICAgIHByb3RlY3RlZCBlbnRlckN1c3RvbVVwZGF0ZVN0YXRlKHN0YXRlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VzdG9tVXBkYXRlU3RhdGUgIT0gc3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tVXBkYXRlU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgaWYgKCEhdGhpcy5jdXN0b21VcGRhdGVNYXBbc3RhdGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbVN0ZXAgPSB0aGlzLmN1c3RvbVVwZGF0ZU1hcFtzdGF0ZV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbVN0ZXAgPSB0aGlzLnN0ZXBFbXB0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiroh6rlrprkuYnnmoTmr4/luKfmm7TmlrDlh73mlbAgKi9cclxuICAgIHB1YmxpYyBjdXN0b21VcGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghIXRoaXMuY3VzdG9tU3RlcCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVN0ZXAoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKumBjeWOhuaVsOe7hOaJp+ihjOWFtuiHquWumuS5ieeahOabtOaWsOWHveaVsCAqL1xyXG4gICAgcHVibGljIHJ1bkN1c3RvbVVwZGF0ZShjcHM6IHl5Q29tcG9uZW50W10sIGR0OiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gY3BzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGNwc1tpXS5jdXN0b21VcGRhdGUoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iKgueCueebuOWFs+WxnuaAp1xyXG4gICAgcHVibGljIGdldCB4KCkgeyByZXR1cm4gdGhpcy5ub2RlLng7IH1cclxuICAgIHB1YmxpYyBnZXQgeSgpIHsgcmV0dXJuIHRoaXMubm9kZS55OyB9XHJcbiAgICBwdWJsaWMgZ2V0IHooKSB7IHJldHVybiB0aGlzLm5vZGUuejsgfVxyXG4gICAgcHVibGljIHNldFBvc2l0aW9uKHBvczogY2MuVmVjMykge1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFBvc2l0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuaXMzRE5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLnYzKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy52Myh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYW5nbGVYKCkgeyByZXR1cm4gdGhpcy5ub2RlLmV1bGVyQW5nbGVzLng7IH1cclxuICAgIHB1YmxpYyBnZXQgYW5nbGVZKCkgeyByZXR1cm4gdGhpcy5ub2RlLmV1bGVyQW5nbGVzLnk7IH1cclxuICAgIHB1YmxpYyBnZXQgYW5nbGVaKCkgeyByZXR1cm4gdGhpcy5ub2RlLmV1bGVyQW5nbGVzLno7IH1cclxuICAgIHB1YmxpYyBzZXRFdWxlckFuZ2xlcyhldWxlckFuZ2xlczogY2MuVmVjMykge1xyXG4gICAgICAgIHRoaXMubm9kZS5ldWxlckFuZ2xlcyA9IGV1bGVyQW5nbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTY2FsZShzY2FsZTogY2MuVmVjMykge1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZShzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6YCC55So5LqOVUnoioLngrnvvIzmmL7npLpVSeW5tuiuvue9rlVJ5YaF5a65ICovXHJcbiAgICBwdWJsaWMgc2hvdyhkYXRhPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKCEhZGF0YSkgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgLyoq6YCC55So5LqOVUnoioLngrnvvIzpmpDol49VSSAqL1xyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0RGF0YShkYXRhPzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvL+mAmueUqOeahOS6i+S7tuWKn+iDve+8mlxyXG4gICAgLyoqXHJcbiAgICAgKiDorrDlvZXmiYDmnInkuovku7bnsbvlnovkuI7lr7nlupTlm57osIPlh73mlbDnmoTlrZflhbjvvIzplIDmr4HohJrmnKzml7bvvIzmoLnmja7mraTlrZflhbjms6jplIDlhbbkuovku7ZcclxuICAgICAqIGtleTrkuovku7bnsbvlnovmnprkuL7lgLxcclxuICAgICAqIHZhbHVlOuS6i+S7tuexu+Wei+WvueW6lOeahOWbnuiwg+WHveaVsOaVsOe7hFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV2ZW50czogeyBbdHlwZTogbnVtYmVyXTogSGFuZGxlcltdIH0gPSB7fTtcclxuICAgIC8qKlxyXG4gICAgICog6K6w5b2V5omA5pyJ5Y+q6Kem5Y+R5LiA5qyh55qE5LqL5Lu257G75Z6L5LiO5a+55bqU5Zue6LCD5Ye95pWw55qE5a2X5YW4XHJcbiAgICAgKiBrZXk65LqL5Lu257G75Z6L5p6a5Li+5YC8XHJcbiAgICAgKiB2YWx1ZTrkuovku7bnsbvlnovlr7nlupTnmoTlm57osIPlh73mlbDmlbDnu4RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbmNlRXZlbnRzOiB7IFt0eXBlOiBudW1iZXJdOiBIYW5kbGVyW10gfSA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhozkuovku7ZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlIOS6i+S7tuexu+Wei+aemuS4vuWAvFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2Ig5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IOWHveaVsOaJgOWxnuWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb24odHlwZTogbnVtYmVyLCBjYjogRnVuY3Rpb24sIHRhcmdldDogT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IGg6IEhhbmRsZXIgPSBFdmVudE1hbmFnZXIub24odHlwZSwgY2IsIHRhcmdldCk7XHJcbiAgICAgICAgaWYgKCEhaCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLnB1c2goaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhozlj6rop6blj5HkuIDmrKHnmoTkuovku7ZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlIOS6i+S7tuexu+Wei+aemuS4vuWAvFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2Ig5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IOWHveaVsOaJgOWxnuWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25jZSh0eXBlOiBudW1iZXIsIGNiOiBGdW5jdGlvbiwgdGFyZ2V0OiBPYmplY3QpIHtcclxuICAgICAgICBsZXQgaDogSGFuZGxlciA9IEV2ZW50TWFuYWdlci5vbmNlKHR5cGUsIGNiLCB0YXJnZXQpO1xyXG4gICAgICAgIGlmICghIWgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm9uY2VFdmVudHMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jZUV2ZW50c1t0eXBlXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub25jZUV2ZW50c1t0eXBlXS5wdXNoKGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBvZmYodHlwZTogbnVtYmVyLCBjYjogRnVuY3Rpb24sIHRhcmdldDogT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IGV2ZW50cyA9IHRoaXMuZXZlbnRzW3R5cGVdO1xyXG4gICAgICAgIGlmICghIWV2ZW50cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gZXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzW2ldLmNiID09PSBjYiAmJiBldmVudHNbaV0udGFyZ2V0ID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub2ZmKHR5cGUsIGV2ZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBldmVudHMgPSB0aGlzLm9uY2VFdmVudHNbdHlwZV07XHJcbiAgICAgICAgaWYgKCEhZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudHNbaV0uY2IgPT09IGNiICYmIGV2ZW50c1tpXS50YXJnZXQgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vZmYodHlwZSwgZXZlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIHkuovku7ZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlIOS6i+S7tuexu+Wei+aemuS4vuWAvFxyXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGEg5Lyg57uZ5Zue6LCD5Ye95pWw55qE5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbWl0KHR5cGU6IG51bWJlciwgZDE/OiBhbnksIGQyPzogYW55LCBkMz86IGFueSwgZDQ/OiBhbnksIGQ1PzogYW55KSB7XHJcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gZDEpIHtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQodHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1bmRlZmluZWQgPT09IGQyKSB7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KHR5cGUsIGQxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHVuZGVmaW5lZCA9PT0gZDMpIHtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQodHlwZSwgZDEsIGQyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHVuZGVmaW5lZCA9PT0gZDQpIHtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQodHlwZSwgZDEsIGQyLCBkMyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1bmRlZmluZWQgPT09IGQ1KSB7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KHR5cGUsIGQxLCBkMiwgZDMsIGQ0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZW1pdCh0eXBlLCBkMSwgZDIsIGQzLCBkNCwgZDUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vbmNlRXZlbnRzLmhhc093blByb3BlcnR5KHR5cGUpKSBkZWxldGUgdGhpcy5vbmNlRXZlbnRzW3R5cGVdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jplIDohJrmnKzkuK3ms6jlhoznmoTmiYDmnInkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9mZkV2ZW50cygpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9mZkdyb3VwKGtleSwgdGhpcy5ldmVudHNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMub25jZUV2ZW50cykge1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIub2ZmR3JvdXAoa2V5LCB0aGlzLm9uY2VFdmVudHNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25jZUV2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLm9mZkV2ZW50cygpO1xyXG4gICAgfVxyXG59Il19