
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/Action3dManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '45238fHaTdO5YKqjUB+mxIU', 'Action3dManager');
// myGame/Script/Common/Action3dManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**3D动画管理器 */
var Action3dManager = /** @class */ (function () {
    function Action3dManager() {
    }
    Action3dManager.update = function (dt) {
        for (var i = this.allActions.length - 1; i >= 0; --i) {
            this.allActions[i].update(dt);
            if (this.allActions[i].finished) {
                this.allActions.splice(i, 1);
            }
        }
    };
    Action3dManager.runAction = function (node, action) {
        this.stopAllActions(node);
        if (action.binded) {
            // let a = action.clone();
            console.warn("3D动作对象已绑定其他节点，当前节点无法运行该动作");
        }
        else {
            action.setTarget(node);
            this.allActions.push(action);
        }
    };
    Action3dManager.stopAllActions = function (node) {
        if (!!node) {
            for (var i = this.allActions.length - 1; i >= 0; --i) {
                if (this.allActions[i].node == node) {
                    this.allActions.splice(i, 1);
                }
            }
        }
        else {
            this.allActions = [];
        }
    };
    Action3dManager.moveTo = function (duration, x, y, z) {
        return new MoveTo3d(duration, x, y, z);
    };
    Action3dManager.moveBy = function (duration, x, y, z) {
        return new MoveBy3d(duration, x, y, z);
    };
    Action3dManager.scaleTo = function (duration, x, y, z) {
        return new ScaleTo3d(duration, x, y, z);
    };
    Action3dManager.rotateTo = function (duration, x, y, z) {
        return new RotateTo3d(duration, x, y, z);
    };
    Action3dManager.rotateBy = function (duration, x, y, z) {
        return new RotateBy3d(duration, x, y, z);
    };
    Action3dManager.callFun = function (cb, target, data) {
        return new CallFun3d(cb, target, data);
    };
    Action3dManager.sequence = function () {
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i] = arguments[_i];
        }
        return new Sequence3d(actions);
    };
    Action3dManager.spawn = function () {
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i] = arguments[_i];
        }
        return new Spawn3d(actions);
    };
    //缓动动作
    Action3dManager.easeIn = function (rate) {
        return new EaseIn(rate);
    };
    Action3dManager.easeOut = function (rate) {
        return new EaseOut(rate);
    };
    Action3dManager.easeInOut = function (rate) {
        return new EaseInOut(rate);
    };
    Action3dManager.easeOutIn = function (rate) {
        return new EaseOutIn(rate);
    };
    Action3dManager.easeExponentialIn = function () {
        return new EaseExponentialIn();
    };
    Action3dManager.easeExponentialOut = function () {
        return new EaseExponentialOut();
    };
    Action3dManager.easeExponentialInOut = function () {
        return new EaseExponentialInOut();
    };
    Action3dManager.allActions = [];
    return Action3dManager;
}());
exports.default = Action3dManager;
//动作基类
var Action3d = /** @class */ (function () {
    function Action3d() {
    }
    Object.defineProperty(Action3d.prototype, "binded", {
        get: function () { return !!this.node; },
        enumerable: true,
        configurable: true
    });
    Action3d.prototype.setTarget = function (node) {
        this.node = node;
    };
    Action3d.prototype.easing = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._easeList = [];
        for (var i = 0, c = args.length; i < c; ++i) {
            this._easeList.push(args[i]);
        }
        return this;
    };
    /**缓动动作时间缩放 */
    Action3d.prototype.computeEaseTime = function (dt) {
        var locList = this._easeList;
        if ((!locList) || (locList.length === 0)) {
            return dt;
        }
        for (var i = 0, n = locList.length; i < n; i++) {
            dt = locList[i].easing(dt);
        }
        return dt;
    };
    Object.defineProperty(Action3d.prototype, "finished", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Action3d.prototype.update = function (dt) { };
    return Action3d;
}());
exports.Action3d = Action3d;
//有限时长的动作
var FiniteTimeAction3d = /** @class */ (function (_super) {
    __extends(FiniteTimeAction3d, _super);
    function FiniteTimeAction3d(duration) {
        var _this = _super.call(this) || this;
        _this._paused = false;
        _this.duration = duration;
        _this.elapse = 0;
        return _this;
    }
    Object.defineProperty(FiniteTimeAction3d.prototype, "finished", {
        get: function () { return this.elapse >= this.duration; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FiniteTimeAction3d.prototype, "paused", {
        get: function () { return this._paused; },
        enumerable: true,
        configurable: true
    });
    FiniteTimeAction3d.prototype.update = function (dt) {
        var rate = this.addElapseTime(dt);
        this.step(rate);
    };
    FiniteTimeAction3d.prototype.addElapseTime = function (dt) {
        this.elapse += dt;
        var rate = 1;
        if (this.duration > 0) {
            rate = this.elapse / this.duration;
            if (rate > 1)
                rate = 1;
        }
        rate = this.computeEaseTime(rate);
        return rate;
    };
    FiniteTimeAction3d.prototype.step = function (rate) {
    };
    FiniteTimeAction3d.prototype.interpolation = function (min, max, rate) {
        return min + (max - min) * rate;
    };
    return FiniteTimeAction3d;
}(Action3d));
exports.FiniteTimeAction3d = FiniteTimeAction3d;
//移动
var MoveTo3d = /** @class */ (function (_super) {
    __extends(MoveTo3d, _super);
    function MoveTo3d(duration, x, y, z) {
        var _this = _super.call(this, duration) || this;
        if (typeof x === "number") {
            _this.target = {
                x: x,
                y: y,
                z: z
            };
        }
        else {
            _this.target = x;
        }
        return _this;
    }
    MoveTo3d.prototype.setTarget = function (node) {
        this.node = node;
        this.original = {
            x: node.x,
            y: node.y,
            z: node.z
        };
    };
    MoveTo3d.prototype.step = function (rate) {
        this.node.x = this.interpolation(this.original.x, this.target.x, rate);
        this.node.y = this.interpolation(this.original.y, this.target.y, rate);
        this.node.z = this.interpolation(this.original.z, this.target.z, rate);
    };
    return MoveTo3d;
}(FiniteTimeAction3d));
exports.MoveTo3d = MoveTo3d;
var MoveBy3d = /** @class */ (function (_super) {
    __extends(MoveBy3d, _super);
    function MoveBy3d(duration, x, y, z) {
        var _this = _super.call(this, duration) || this;
        if (typeof x === "number") {
            _this.target = {
                x: x,
                y: y,
                z: z
            };
        }
        else {
            _this.target = x;
        }
        return _this;
    }
    MoveBy3d.prototype.setTarget = function (node) {
        this.node = node;
        this.original = {
            x: node.x,
            y: node.y,
            z: node.z
        };
    };
    MoveBy3d.prototype.step = function (rate) {
        this.node.x = this.original.x + this.target.x * rate;
        this.node.y = this.original.y + this.target.y * rate;
        this.node.z = this.original.z + this.target.z * rate;
    };
    return MoveBy3d;
}(FiniteTimeAction3d));
exports.MoveBy3d = MoveBy3d;
//缩放
var ScaleTo3d = /** @class */ (function (_super) {
    __extends(ScaleTo3d, _super);
    function ScaleTo3d(duration, x, y, z) {
        var _this = _super.call(this, duration) || this;
        if (typeof x === "number") {
            _this.target = {
                x: x,
                y: y,
                z: z
            };
        }
        else {
            _this.target = x;
        }
        return _this;
    }
    ScaleTo3d.prototype.setTarget = function (node) {
        this.node = node;
        this.original = {
            x: node.scaleX,
            y: node.scaleY,
            z: node.scaleZ
        };
    };
    ScaleTo3d.prototype.step = function (rate) {
        var x = this.interpolation(this.original.x, this.target.x, rate);
        var y = this.interpolation(this.original.y, this.target.y, rate);
        var z = this.interpolation(this.original.z, this.target.z, rate);
        this.node.setScale(x, y, z);
    };
    return ScaleTo3d;
}(FiniteTimeAction3d));
exports.ScaleTo3d = ScaleTo3d;
//旋转
var RotateTo3d = /** @class */ (function (_super) {
    __extends(RotateTo3d, _super);
    function RotateTo3d(duration, x, y, z) {
        var _this = _super.call(this, duration) || this;
        if (typeof x === "number") {
            _this.target = {
                x: x,
                y: y,
                z: z
            };
        }
        else {
            _this.target = x;
        }
        return _this;
    }
    RotateTo3d.prototype.setTarget = function (node) {
        this.node = node;
        this.original = {
            x: node.eulerAngles.x,
            y: node.eulerAngles.y,
            z: node.eulerAngles.z
        };
    };
    RotateTo3d.prototype.step = function (rate) {
        var x = this.interpolation(this.original.x, this.target.x, rate);
        var y = this.interpolation(this.original.y, this.target.y, rate);
        var z = this.interpolation(this.original.z, this.target.z, rate);
        this.node.eulerAngles = cc.v3(x, y, z);
    };
    return RotateTo3d;
}(FiniteTimeAction3d));
exports.RotateTo3d = RotateTo3d;
var RotateBy3d = /** @class */ (function (_super) {
    __extends(RotateBy3d, _super);
    function RotateBy3d(duration, x, y, z) {
        var _this = _super.call(this, duration) || this;
        if (typeof x === "number") {
            _this.target = {
                x: x,
                y: y,
                z: z
            };
        }
        else {
            _this.target = x;
        }
        return _this;
    }
    RotateBy3d.prototype.setTarget = function (node) {
        this.node = node;
        this.original = {
            x: node.eulerAngles.x,
            y: node.eulerAngles.y,
            z: node.eulerAngles.z
        };
    };
    RotateBy3d.prototype.step = function (rate) {
        var x = this.original.x + this.target.x * rate;
        var y = this.original.y + this.target.y * rate;
        var z = this.original.z + this.target.z * rate;
        this.node.eulerAngles = cc.v3(x, y, z);
    };
    return RotateBy3d;
}(FiniteTimeAction3d));
exports.RotateBy3d = RotateBy3d;
//回调函数
var CallFun3d = /** @class */ (function (_super) {
    __extends(CallFun3d, _super);
    function CallFun3d(cb, target, data) {
        var _this = _super.call(this) || this;
        _this._finished = false;
        _this.cb = cb;
        _this.target = target;
        _this.data = data;
        return _this;
    }
    Object.defineProperty(CallFun3d.prototype, "finished", {
        get: function () { return this._finished; },
        enumerable: true,
        configurable: true
    });
    CallFun3d.prototype.update = function (dt) {
        if (this.finished)
            return;
        if (!!this.target) {
            this.cb.call(this.target, this.data || null);
        }
        else {
            this.cb(this.data || null);
        }
        this._finished = true;
    };
    return CallFun3d;
}(Action3d));
exports.CallFun3d = CallFun3d;
//队列动作
var Sequence3d = /** @class */ (function (_super) {
    __extends(Sequence3d, _super);
    function Sequence3d(actions) {
        var _this = _super.call(this) || this;
        _this.curActionPtr = 0;
        _this.actions = [].concat(actions);
        return _this;
    }
    Object.defineProperty(Sequence3d.prototype, "finished", {
        get: function () { return this.curActionPtr >= this.actions.length; },
        enumerable: true,
        configurable: true
    });
    Sequence3d.prototype.setTarget = function (node) {
        this.node = node;
        for (var i = this.actions.length - 1; i >= 0; --i) {
            this.actions[i].setTarget(node);
        }
    };
    Sequence3d.prototype.update = function (dt) {
        if (this.finished)
            return;
        var action = this.actions[this.curActionPtr];
        action.update(dt);
        if (action.finished) {
            this.curActionPtr++;
        }
    };
    return Sequence3d;
}(Action3d));
exports.Sequence3d = Sequence3d;
//同步动作
var Spawn3d = /** @class */ (function (_super) {
    __extends(Spawn3d, _super);
    function Spawn3d(actions) {
        var _this = _super.call(this) || this;
        _this.actions = [].concat(actions);
        _this.remainCount = _this.actions.length;
        return _this;
    }
    Object.defineProperty(Spawn3d.prototype, "finished", {
        get: function () {
            return this.remainCount <= 0;
        },
        enumerable: true,
        configurable: true
    });
    Spawn3d.prototype.setTarget = function (node) {
        this.node = node;
        for (var i = this.actions.length - 1; i >= 0; --i) {
            this.actions[i].setTarget(node);
        }
    };
    Spawn3d.prototype.update = function (dt) {
        if (this.finished)
            return;
        for (var i = this.actions.length - 1; i >= 0; --i) {
            if (!this.actions[i].finished) {
                this.actions[i].update(dt);
                if (this.actions[i].finished) {
                    this.remainCount--;
                }
            }
        }
    };
    return Spawn3d;
}(Action3d));
exports.Spawn3d = Spawn3d;
//缓动曲线
var Ease = /** @class */ (function () {
    function Ease() {
    }
    Ease.prototype.easing = function (dt) {
        return dt;
    };
    return Ease;
}());
var EaseIn = /** @class */ (function (_super) {
    __extends(EaseIn, _super);
    function EaseIn(rate) {
        var _this = _super.call(this) || this;
        _this._rate = rate;
        return _this;
    }
    EaseIn.prototype.easing = function (dt) {
        return Math.pow(dt, this._rate);
    };
    return EaseIn;
}(Ease));
var EaseOut = /** @class */ (function (_super) {
    __extends(EaseOut, _super);
    function EaseOut(rate) {
        var _this = _super.call(this) || this;
        _this._rate = rate;
        return _this;
    }
    EaseOut.prototype.easing = function (dt) {
        return Math.pow(dt, 1 / this._rate);
    };
    return EaseOut;
}(Ease));
var EaseInOut = /** @class */ (function (_super) {
    __extends(EaseInOut, _super);
    function EaseInOut(rate) {
        var _this = _super.call(this) || this;
        _this._rate = rate;
        return _this;
    }
    EaseInOut.prototype.easing = function (dt) {
        dt *= 2;
        if (dt < 1)
            return 0.5 * Math.pow(dt, this._rate);
        else
            return 1.0 - 0.5 * Math.pow(2 - dt, this._rate);
    };
    return EaseInOut;
}(Ease));
var EaseOutIn = /** @class */ (function (_super) {
    __extends(EaseOutIn, _super);
    function EaseOutIn(rate) {
        var _this = _super.call(this) || this;
        _this._rate = rate;
        return _this;
    }
    EaseOutIn.prototype.easing = function (dt) {
        dt *= 2;
        if (dt < 1)
            return 1.0 - 0.5 * Math.pow(2 - dt, this._rate);
        else
            return 0.5 * Math.pow(dt, this._rate);
    };
    return EaseOutIn;
}(Ease));
/**指数函数缓动进入 */
var EaseExponentialIn = /** @class */ (function (_super) {
    __extends(EaseExponentialIn, _super);
    function EaseExponentialIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EaseExponentialIn.prototype.easing = function (dt) {
        return dt === 0 ? 0 : Math.pow(2, 10 * (dt - 1));
    };
    return EaseExponentialIn;
}(Ease));
/**指数函数缓动退出 */
var EaseExponentialOut = /** @class */ (function (_super) {
    __extends(EaseExponentialOut, _super);
    function EaseExponentialOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EaseExponentialOut.prototype.easing = function (dt) {
        return dt === 1 ? 1 : (-(Math.pow(2, -10 * dt)) + 1);
    };
    return EaseExponentialOut;
}(Ease));
/**指数函数缓动进入——退出 */
var EaseExponentialInOut = /** @class */ (function (_super) {
    __extends(EaseExponentialInOut, _super);
    function EaseExponentialInOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EaseExponentialInOut.prototype.easing = function (dt) {
        if (dt !== 1 && dt !== 0) {
            dt *= 2;
            if (dt < 1)
                return 0.5 * Math.pow(2, 10 * (dt - 1));
            else
                return 0.5 * (-Math.pow(2, -10 * (dt - 1)) + 2);
        }
        return dt;
    };
    return EaseExponentialInOut;
}(Ease));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcQWN0aW9uM2RNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxhQUFhO0FBQ2I7SUFBQTtJQXlGQSxDQUFDO0lBckZpQixzQkFBTSxHQUFwQixVQUFxQixFQUFVO1FBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBQ2EseUJBQVMsR0FBdkIsVUFBd0IsSUFBYSxFQUFFLE1BQWdCO1FBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsMEJBQTBCO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUM3QzthQUFNO1lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFDYSw4QkFBYyxHQUE1QixVQUE2QixJQUFjO1FBQ3ZDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNSLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFB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YixVQUFjLEVBQVU7UUFDcEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDdEIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNSLElBQUksRUFBRSxHQUFHLENBQUM7Z0JBQ04sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUV4QyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN2RDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FYQSxBQVdDLENBWGtDLElBQUksR0FXdEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxudHlwZSBWZWMzID0ge1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgejogbnVtYmVyXHJcbn1cclxuXHJcbi8qKjNE5Yqo55S7566h55CG5ZmoICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbjNkTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWxsQWN0aW9uczogQWN0aW9uM2RbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5hbGxBY3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsQWN0aW9uc1tpXS51cGRhdGUoZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbGxBY3Rpb25zW2ldLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEFjdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBydW5BY3Rpb24obm9kZTogY2MuTm9kZSwgYWN0aW9uOiBBY3Rpb24zZCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEFsbEFjdGlvbnMobm9kZSk7XHJcbiAgICAgICAgaWYgKGFjdGlvbi5iaW5kZWQpIHtcclxuICAgICAgICAgICAgLy8gbGV0IGEgPSBhY3Rpb24uY2xvbmUoKTtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiM0TliqjkvZzlr7nosaHlt7Lnu5Hlrprlhbbku5boioLngrnvvIzlvZPliY3oioLngrnml6Dms5Xov5DooYzor6XliqjkvZxcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWN0aW9uLnNldFRhcmdldChub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5hbGxBY3Rpb25zLnB1c2goYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHN0b3BBbGxBY3Rpb25zKG5vZGU/OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKCEhbm9kZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5hbGxBY3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGxBY3Rpb25zW2ldLm5vZGUgPT0gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsQWN0aW9ucy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsbEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG8oZHVyYXRpb246IG51bWJlciwgeDogbnVtYmVyIHwgVmVjMywgeT86IG51bWJlciwgej86IG51bWJlcik6IEFjdGlvbjNkIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vdmVUbzNkKGR1cmF0aW9uLCB4LCB5LCB6KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZUJ5KGR1cmF0aW9uOiBudW1iZXIsIHg6IG51bWJlciB8IFZlYzMsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpOiBBY3Rpb24zZCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb3ZlQnkzZChkdXJhdGlvbiwgeCwgeSwgeik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlVG8oZHVyYXRpb246IG51bWJlciwgeDogbnVtYmVyIHwgVmVjMywgeT86IG51bWJlciwgej86IG51bWJlcik6IEFjdGlvbjNkIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNjYWxlVG8zZChkdXJhdGlvbiwgeCwgeSwgeik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHJvdGF0ZVRvKGR1cmF0aW9uOiBudW1iZXIsIHg6IG51bWJlciB8IFZlYzMsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpOiBBY3Rpb24zZCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSb3RhdGVUbzNkKGR1cmF0aW9uLCB4LCB5LCB6KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlQnkoZHVyYXRpb246IG51bWJlciwgeDogbnVtYmVyIHwgVmVjMywgeT86IG51bWJlciwgej86IG51bWJlcik6IEFjdGlvbjNkIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJvdGF0ZUJ5M2QoZHVyYXRpb24sIHgsIHksIHopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2FsbEZ1bihjYjogRnVuY3Rpb24sIHRhcmdldD86IGFueSwgZGF0YT86IGFueSk6IEFjdGlvbjNkIHtcclxuICAgICAgICByZXR1cm4gbmV3IENhbGxGdW4zZChjYiwgdGFyZ2V0LCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNlcXVlbmNlKC4uLmFjdGlvbnMpOiBBY3Rpb24zZCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTZXF1ZW5jZTNkKGFjdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3Bhd24oLi4uYWN0aW9ucyk6IEFjdGlvbjNkIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNwYXduM2QoYWN0aW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v57yT5Yqo5Yqo5L2cXHJcbiAgICBwdWJsaWMgc3RhdGljIGVhc2VJbihyYXRlOiBudW1iZXIpOiBFYXNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVhc2VJbihyYXRlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZWFzZU91dChyYXRlOiBudW1iZXIpOiBFYXNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVhc2VPdXQocmF0ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGVhc2VJbk91dChyYXRlOiBudW1iZXIpOiBFYXNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVhc2VJbk91dChyYXRlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZWFzZU91dEluKHJhdGU6IG51bWJlcik6IEVhc2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgRWFzZU91dEluKHJhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZWFzZUV4cG9uZW50aWFsSW4oKTogRWFzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFYXNlRXhwb25lbnRpYWxJbigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBlYXNlRXhwb25lbnRpYWxPdXQoKTogRWFzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFYXNlRXhwb25lbnRpYWxPdXQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZWFzZUV4cG9uZW50aWFsSW5PdXQoKTogRWFzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFYXNlRXhwb25lbnRpYWxJbk91dCgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG4vL+WKqOS9nOWfuuexu1xyXG5leHBvcnQgY2xhc3MgQWN0aW9uM2Qge1xyXG4gICAgcHVibGljIG5vZGU6IGNjLk5vZGU7XHJcbiAgICBwdWJsaWMgZ2V0IGJpbmRlZCgpOiBib29sZWFuIHsgcmV0dXJuICEhdGhpcy5ub2RlOyB9XHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgfVxyXG4gICAgLyoq57yT5Yqo5Yqo55S755qE5q+U546H6L2s5o2i5Ye95pWwICovXHJcbiAgICBwcm90ZWN0ZWQgX2Vhc2VMaXN0OiBFYXNlW107XHJcbiAgICBwdWJsaWMgZWFzaW5nKC4uLmFyZ3M6IEVhc2VbXSkge1xyXG4gICAgICAgIHRoaXMuX2Vhc2VMaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSBhcmdzLmxlbmd0aDsgaSA8IGM7ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lYXNlTGlzdC5wdXNoKGFyZ3NbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKue8k+WKqOWKqOS9nOaXtumXtOe8qeaUviAqL1xyXG4gICAgcHJvdGVjdGVkIGNvbXB1dGVFYXNlVGltZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGxvY0xpc3QgPSB0aGlzLl9lYXNlTGlzdDtcclxuICAgICAgICBpZiAoKCFsb2NMaXN0KSB8fCAobG9jTGlzdC5sZW5ndGggPT09IDApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBsb2NMaXN0Lmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBkdCA9IGxvY0xpc3RbaV0uZWFzaW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGR0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBmaW5pc2hlZCgpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKSB7IH1cclxufVxyXG5cclxuLy/mnInpmZDml7bplb/nmoTliqjkvZxcclxuZXhwb3J0IGNsYXNzIEZpbml0ZVRpbWVBY3Rpb24zZCBleHRlbmRzIEFjdGlvbjNkIHtcclxuICAgIC8qKuWKqOS9nOaMgee7reeahOaAu+aXtumXtCAqL1xyXG4gICAgcHJvdGVjdGVkIGR1cmF0aW9uOiBudW1iZXI7XHJcbiAgICAvKirliqjkvZzntK/orqHlt7Lov5DooYznmoTml7bpl7QgKi9cclxuICAgIHByb3RlY3RlZCBlbGFwc2U6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGZpbmlzaGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5lbGFwc2UgPj0gdGhpcy5kdXJhdGlvbjsgfVxyXG4gICAgcHJvdGVjdGVkIF9wYXVzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBnZXQgcGF1c2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcGF1c2VkOyB9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGR1cmF0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB0aGlzLmVsYXBzZSA9IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcmF0ZSA9IHRoaXMuYWRkRWxhcHNlVGltZShkdCk7XHJcbiAgICAgICAgdGhpcy5zdGVwKHJhdGUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFkZEVsYXBzZVRpbWUoZHQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy5lbGFwc2UgKz0gZHQ7XHJcbiAgICAgICAgbGV0IHJhdGUgPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLmR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgICAgICByYXRlID0gdGhpcy5lbGFwc2UgLyB0aGlzLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICBpZiAocmF0ZSA+IDEpIHJhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByYXRlID0gdGhpcy5jb21wdXRlRWFzZVRpbWUocmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIHJhdGU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc3RlcChyYXRlOiBudW1iZXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGludGVycG9sYXRpb24obWluOiBudW1iZXIsIG1heDogbnVtYmVyLCByYXRlOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbWluICsgKG1heCAtIG1pbikgKiByYXRlO1xyXG4gICAgfVxyXG59XHJcbi8v56e75YqoXHJcbmV4cG9ydCBjbGFzcyBNb3ZlVG8zZCBleHRlbmRzIEZpbml0ZVRpbWVBY3Rpb24zZCB7XHJcbiAgICAvKirliJ3lp4vlgLwgKi9cclxuICAgIHByaXZhdGUgb3JpZ2luYWw6IFZlYzM7XHJcbiAgICAvKirnm67moIflgLwgKi9cclxuICAgIHByaXZhdGUgdGFyZ2V0OiBWZWMzO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGR1cmF0aW9uOiBudW1iZXIsIHg6IG51bWJlciB8IFZlYzMsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICB6OiB6XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSB7XHJcbiAgICAgICAgICAgIHg6IG5vZGUueCxcclxuICAgICAgICAgICAgeTogbm9kZS55LFxyXG4gICAgICAgICAgICB6OiBub2RlLnpcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGVwKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubm9kZS54ID0gdGhpcy5pbnRlcnBvbGF0aW9uKHRoaXMub3JpZ2luYWwueCwgdGhpcy50YXJnZXQueCwgcmF0ZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLmludGVycG9sYXRpb24odGhpcy5vcmlnaW5hbC55LCB0aGlzLnRhcmdldC55LCByYXRlKTtcclxuICAgICAgICB0aGlzLm5vZGUueiA9IHRoaXMuaW50ZXJwb2xhdGlvbih0aGlzLm9yaWdpbmFsLnosIHRoaXMudGFyZ2V0LnosIHJhdGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBNb3ZlQnkzZCBleHRlbmRzIEZpbml0ZVRpbWVBY3Rpb24zZCB7XHJcbiAgICAvKirliJ3lp4vlgLwgKi9cclxuICAgIHByaXZhdGUgb3JpZ2luYWw6IFZlYzM7XHJcbiAgICAvKirnm67moIflgLwgKi9cclxuICAgIHByaXZhdGUgdGFyZ2V0OiBWZWMzO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGR1cmF0aW9uOiBudW1iZXIsIHg6IG51bWJlciB8IFZlYzMsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICB6OiB6XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSB7XHJcbiAgICAgICAgICAgIHg6IG5vZGUueCxcclxuICAgICAgICAgICAgeTogbm9kZS55LFxyXG4gICAgICAgICAgICB6OiBub2RlLnpcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGVwKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubm9kZS54ID0gdGhpcy5vcmlnaW5hbC54ICsgdGhpcy50YXJnZXQueCAqIHJhdGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLm9yaWdpbmFsLnkgKyB0aGlzLnRhcmdldC55ICogcmF0ZTtcclxuICAgICAgICB0aGlzLm5vZGUueiA9IHRoaXMub3JpZ2luYWwueiArIHRoaXMudGFyZ2V0LnogKiByYXRlO1xyXG4gICAgfVxyXG59XHJcbi8v57yp5pS+XHJcbmV4cG9ydCBjbGFzcyBTY2FsZVRvM2QgZXh0ZW5kcyBGaW5pdGVUaW1lQWN0aW9uM2Qge1xyXG4gICAgLyoq5Yid5aeL5YC8ICovXHJcbiAgICBwcml2YXRlIG9yaWdpbmFsOiBWZWMzO1xyXG4gICAgLyoq55uu5qCH5YC8ICovXHJcbiAgICBwcml2YXRlIHRhcmdldDogVmVjMztcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkdXJhdGlvbjogbnVtYmVyLCB4OiBudW1iZXIgfCBWZWMzLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoZHVyYXRpb24pO1xyXG4gICAgICAgIGlmICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgejogelxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0geDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRhcmdldChub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsID0ge1xyXG4gICAgICAgICAgICB4OiBub2RlLnNjYWxlWCxcclxuICAgICAgICAgICAgeTogbm9kZS5zY2FsZVksXHJcbiAgICAgICAgICAgIHo6IG5vZGUuc2NhbGVaXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RlcChyYXRlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgeCA9IHRoaXMuaW50ZXJwb2xhdGlvbih0aGlzLm9yaWdpbmFsLngsIHRoaXMudGFyZ2V0LngsIHJhdGUpO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy5pbnRlcnBvbGF0aW9uKHRoaXMub3JpZ2luYWwueSwgdGhpcy50YXJnZXQueSwgcmF0ZSk7XHJcbiAgICAgICAgbGV0IHogPSB0aGlzLmludGVycG9sYXRpb24odGhpcy5vcmlnaW5hbC56LCB0aGlzLnRhcmdldC56LCByYXRlKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0U2NhbGUoeCwgeSwgeik7XHJcbiAgICB9XHJcbn1cclxuLy/ml4vovaxcclxuZXhwb3J0IGNsYXNzIFJvdGF0ZVRvM2QgZXh0ZW5kcyBGaW5pdGVUaW1lQWN0aW9uM2Qge1xyXG4gICAgLyoq5Yid5aeL5YC8ICovXHJcbiAgICBwcml2YXRlIG9yaWdpbmFsOiBWZWMzO1xyXG4gICAgLyoq55uu5qCH5YC8ICovXHJcbiAgICBwcml2YXRlIHRhcmdldDogVmVjMztcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkdXJhdGlvbjogbnVtYmVyLCB4OiBudW1iZXIgfCBWZWMzLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoZHVyYXRpb24pO1xyXG4gICAgICAgIGlmICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgejogelxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0geDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSB7XHJcbiAgICAgICAgICAgIHg6IG5vZGUuZXVsZXJBbmdsZXMueCxcclxuICAgICAgICAgICAgeTogbm9kZS5ldWxlckFuZ2xlcy55LFxyXG4gICAgICAgICAgICB6OiBub2RlLmV1bGVyQW5nbGVzLnpcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGVwKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB4ID0gdGhpcy5pbnRlcnBvbGF0aW9uKHRoaXMub3JpZ2luYWwueCwgdGhpcy50YXJnZXQueCwgcmF0ZSk7XHJcbiAgICAgICAgbGV0IHkgPSB0aGlzLmludGVycG9sYXRpb24odGhpcy5vcmlnaW5hbC55LCB0aGlzLnRhcmdldC55LCByYXRlKTtcclxuICAgICAgICBsZXQgeiA9IHRoaXMuaW50ZXJwb2xhdGlvbih0aGlzLm9yaWdpbmFsLnosIHRoaXMudGFyZ2V0LnosIHJhdGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ldWxlckFuZ2xlcyA9IGNjLnYzKHgsIHksIHopO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBSb3RhdGVCeTNkIGV4dGVuZHMgRmluaXRlVGltZUFjdGlvbjNkIHtcclxuICAgIC8qKuWIneWni+WAvCAqL1xyXG4gICAgcHJpdmF0ZSBvcmlnaW5hbDogVmVjMztcclxuICAgIC8qKuebruagh+WAvCAqL1xyXG4gICAgcHJpdmF0ZSB0YXJnZXQ6IFZlYzM7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoZHVyYXRpb246IG51bWJlciwgeDogbnVtYmVyIHwgVmVjMywgeT86IG51bWJlciwgej86IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgIHo6IHpcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUYXJnZXQobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbCA9IHtcclxuICAgICAgICAgICAgeDogbm9kZS5ldWxlckFuZ2xlcy54LFxyXG4gICAgICAgICAgICB5OiBub2RlLmV1bGVyQW5nbGVzLnksXHJcbiAgICAgICAgICAgIHo6IG5vZGUuZXVsZXJBbmdsZXMuelxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0ZXAocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLm9yaWdpbmFsLnggKyB0aGlzLnRhcmdldC54ICogcmF0ZTtcclxuICAgICAgICBsZXQgeSA9IHRoaXMub3JpZ2luYWwueSArIHRoaXMudGFyZ2V0LnkgKiByYXRlO1xyXG4gICAgICAgIGxldCB6ID0gdGhpcy5vcmlnaW5hbC56ICsgdGhpcy50YXJnZXQueiAqIHJhdGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmV1bGVyQW5nbGVzID0gY2MudjMoeCwgeSwgeik7XHJcbiAgICB9XHJcbn1cclxuLy/lm57osIPlh73mlbBcclxuZXhwb3J0IGNsYXNzIENhbGxGdW4zZCBleHRlbmRzIEFjdGlvbjNkIHtcclxuICAgIHByaXZhdGUgdGFyZ2V0OiBhbnk7XHJcbiAgICBwcml2YXRlIGNiOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgZGF0YTogYW55O1xyXG4gICAgcHJvdGVjdGVkIF9maW5pc2hlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGdldCBmaW5pc2hlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZpbmlzaGVkOyB9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNiOiBGdW5jdGlvbiwgdGFyZ2V0PzogYW55LCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbmlzaGVkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCEhdGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudGFyZ2V0LCB0aGlzLmRhdGEgfHwgbnVsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYih0aGlzLmRhdGEgfHwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2ZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuLy/pmJ/liJfliqjkvZxcclxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlM2QgZXh0ZW5kcyBBY3Rpb24zZCB7XHJcbiAgICAvKirliqjkvZzliJfooaggKi9cclxuICAgIHByb3RlY3RlZCBhY3Rpb25zOiBBY3Rpb24zZFtdO1xyXG4gICAgLyoq5b2T5YmN5omn6KGM55qE5Yqo5L2c57Si5byVICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyQWN0aW9uUHRyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ2V0IGZpbmlzaGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5jdXJBY3Rpb25QdHIgPj0gdGhpcy5hY3Rpb25zLmxlbmd0aDsgfVxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFjdGlvbjNkW10pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY3VyQWN0aW9uUHRyID0gMDtcclxuICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXS5jb25jYXQoYWN0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmFjdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW2ldLnNldFRhcmdldChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5maW5pc2hlZCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSB0aGlzLmFjdGlvbnNbdGhpcy5jdXJBY3Rpb25QdHJdO1xyXG4gICAgICAgIGFjdGlvbi51cGRhdGUoZHQpO1xyXG4gICAgICAgIGlmIChhY3Rpb24uZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJBY3Rpb25QdHIrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy/lkIzmraXliqjkvZxcclxuZXhwb3J0IGNsYXNzIFNwYXduM2QgZXh0ZW5kcyBBY3Rpb24zZCB7XHJcbiAgICAvKirliqjkvZzliJfooaggKi9cclxuICAgIHByb3RlY3RlZCBhY3Rpb25zOiBBY3Rpb24zZFtdO1xyXG4gICAgLyoq5Ymp5L2Z5pyq5a6M5oiQ55qE5Yqo5L2cICovXHJcbiAgICBwcml2YXRlIHJlbWFpbkNvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ2V0IGZpbmlzaGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbWFpbkNvdW50IDw9IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYWN0aW9uczogQWN0aW9uM2RbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gW10uY29uY2F0KGFjdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucmVtYWluQ291bnQgPSB0aGlzLmFjdGlvbnMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFRhcmdldChub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5hY3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tpXS5zZXRUYXJnZXQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmluaXNoZWQpIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5hY3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hY3Rpb25zW2ldLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbaV0udXBkYXRlKGR0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnNbaV0uZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbkNvdW50LS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v57yT5Yqo5puy57q/XHJcbmNsYXNzIEVhc2Uge1xyXG4gICAgcHVibGljIGVhc2luZyhkdDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gZHQ7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgRWFzZUluIGV4dGVuZHMgRWFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX3JhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihyYXRlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3JhdGUgPSByYXRlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGVhc2luZyhkdDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3coZHQsIHRoaXMuX3JhdGUpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVhc2VPdXQgZXh0ZW5kcyBFYXNlIHtcclxuICAgIHByb3RlY3RlZCBfcmF0ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fcmF0ZSA9IHJhdGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZWFzaW5nKGR0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdyhkdCwgMSAvIHRoaXMuX3JhdGUpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVhc2VJbk91dCBleHRlbmRzIEVhc2Uge1xyXG4gICAgcHJvdGVjdGVkIF9yYXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yYXRlID0gcmF0ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBlYXNpbmcoZHQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgZHQgKj0gMjtcclxuICAgICAgICBpZiAoZHQgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coZHQsIHRoaXMuX3JhdGUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDEuMCAtIDAuNSAqIE1hdGgucG93KDIgLSBkdCwgdGhpcy5fcmF0ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEVhc2VPdXRJbiBleHRlbmRzIEVhc2Uge1xyXG4gICAgcHJvdGVjdGVkIF9yYXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yYXRlID0gcmF0ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBlYXNpbmcoZHQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgZHQgKj0gMjtcclxuICAgICAgICBpZiAoZHQgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gMS4wIC0gMC41ICogTWF0aC5wb3coMiAtIGR0LCB0aGlzLl9yYXRlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdyhkdCwgdGhpcy5fcmF0ZSk7XHJcbiAgICB9XHJcbn1cclxuLyoq5oyH5pWw5Ye95pWw57yT5Yqo6L+b5YWlICovXHJcbmNsYXNzIEVhc2VFeHBvbmVudGlhbEluIGV4dGVuZHMgRWFzZSB7XHJcbiAgICBwdWJsaWMgZWFzaW5nKGR0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBkdCA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqIChkdCAtIDEpKTtcclxuICAgIH1cclxufVxyXG4vKirmjIfmlbDlh73mlbDnvJPliqjpgIDlh7ogKi9cclxuY2xhc3MgRWFzZUV4cG9uZW50aWFsT3V0IGV4dGVuZHMgRWFzZSB7XHJcbiAgICBwdWJsaWMgZWFzaW5nKGR0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBkdCA9PT0gMSA/IDEgOiAoLShNYXRoLnBvdygyLCAtMTAgKiBkdCkpICsgMSk7XHJcbiAgICB9XHJcbn1cclxuLyoq5oyH5pWw5Ye95pWw57yT5Yqo6L+b5YWl4oCU4oCU6YCA5Ye6ICovXHJcbmNsYXNzIEVhc2VFeHBvbmVudGlhbEluT3V0IGV4dGVuZHMgRWFzZSB7XHJcbiAgICBwdWJsaWMgZWFzaW5nKGR0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChkdCAhPT0gMSAmJiBkdCAhPT0gMCkge1xyXG4gICAgICAgICAgICBkdCAqPSAyO1xyXG4gICAgICAgICAgICBpZiAoZHQgPCAxKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKGR0IC0gMSkpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKC1NYXRoLnBvdygyLCAtMTAgKiAoZHQgLSAxKSkgKyAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGR0O1xyXG4gICAgfVxyXG59Il19