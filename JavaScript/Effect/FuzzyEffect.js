
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Effect/FuzzyEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7cc19OOXpNMSpLv0lZIMHkL', 'FuzzyEffect');
// myGame/Script/Effect/FuzzyEffect.ts

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var fuzzyTime = "time";
var FuzzyEffect = /** @class */ (function (_super) {
    __extends(FuzzyEffect, _super);
    function FuzzyEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mesh = null;
        _this.fuzzyMat = null;
        _this.spd = 0.5;
        _this._playing = false;
        _this.elapse = -1;
        return _this;
    }
    FuzzyEffect.prototype.onLoad = function () {
        this.fuzzyMat = this.mesh.getMaterial(0);
        this.stop();
        this.clear();
    };
    /**设置模糊效果的播放速度 */
    FuzzyEffect.prototype.setSpeed = function (spd) {
        if (undefined !== spd)
            this.spd = spd;
    };
    Object.defineProperty(FuzzyEffect.prototype, "playing", {
        get: function () { return this._playing; },
        enumerable: true,
        configurable: true
    });
    FuzzyEffect.prototype.play = function (spd) {
        this._playing = true;
        if (undefined !== spd) {
            this.spd = spd;
        }
        this.elapse = -1;
    };
    /**停止播放模糊效果，但不会清除当前已渲染的模糊效果 */
    FuzzyEffect.prototype.stop = function () {
        this._playing = false;
    };
    /**清空模糊效果 */
    FuzzyEffect.prototype.clear = function () {
        this.elapse = -1.0;
        this.fuzzyMat.setProperty(fuzzyTime, this.elapse);
    };
    FuzzyEffect.prototype.update = function (dt) {
        if (!this._playing)
            return;
        this.elapse += dt * this.spd;
        this.fuzzyMat.setProperty(fuzzyTime, this.elapse);
    };
    __decorate([
        property(cc.MeshRenderer)
    ], FuzzyEffect.prototype, "mesh", void 0);
    FuzzyEffect = __decorate([
        ccclass
    ], FuzzyEffect);
    return FuzzyEffect;
}(cc.Component));
exports.default = FuzzyEffect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEVmZmVjdFxcRnV6enlFZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7O0FBRTVFLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBRXpCO0lBQXlDLCtCQUFZO0lBRHJEO1FBQUEscUVBMkNDO1FBdkNhLFVBQUksR0FBb0IsSUFBSSxDQUFDO1FBQzdCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBTzdCLFNBQUcsR0FBVyxHQUFHLENBQUM7UUFNbEIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQW1CMUIsWUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFDOztJQU1sQyxDQUFDO0lBckNHLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBR0QsaUJBQWlCO0lBQ1YsOEJBQVEsR0FBZixVQUFnQixHQUFXO1FBQ3ZCLElBQUksU0FBUyxLQUFLLEdBQUc7WUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUMxQyxDQUFDO0lBR0Qsc0JBQVcsZ0NBQU87YUFBbEIsY0FBdUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDdkMsMEJBQUksR0FBWCxVQUFZLEdBQVk7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsOEJBQThCO0lBQ3ZCLDBCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBQ0QsWUFBWTtJQUNMLDJCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUdELDRCQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMzQixJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQXRDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDOzZDQUNhO0lBSHRCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EwQy9CO0lBQUQsa0JBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ3dDLEVBQUUsQ0FBQyxTQUFTLEdBMENwRDtrQkExQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgZnV6enlUaW1lID0gXCJ0aW1lXCI7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1enp5RWZmZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTWVzaFJlbmRlcmVyKVxyXG4gICAgcHJvdGVjdGVkIG1lc2g6IGNjLk1lc2hSZW5kZXJlciA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgZnV6enlNYXQ6IGNjLk1hdGVyaWFsID0gbnVsbDtcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmZ1enp5TWF0ID0gdGhpcy5tZXNoLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3BkOiBudW1iZXIgPSAwLjU7XHJcbiAgICAvKirorr7nva7mqKHns4rmlYjmnpznmoTmkq3mlL7pgJ/luqYgKi9cclxuICAgIHB1YmxpYyBzZXRTcGVlZChzcGQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IHNwZCkgdGhpcy5zcGQgPSBzcGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9wbGF5aW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ2V0IHBsYXlpbmcoKSB7IHJldHVybiB0aGlzLl9wbGF5aW5nOyB9XHJcbiAgICBwdWJsaWMgcGxheShzcGQ/OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9wbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBzcGQpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGQgPSBzcGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxhcHNlID0gLTE7XHJcbiAgICB9XHJcbiAgICAvKirlgZzmraLmkq3mlL7mqKHns4rmlYjmnpzvvIzkvYbkuI3kvJrmuIXpmaTlvZPliY3lt7LmuLLmn5PnmoTmqKHns4rmlYjmnpwgKi9cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKua4heepuuaooeeziuaViOaenCAqL1xyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuZWxhcHNlID0gLTEuMDtcclxuICAgICAgICB0aGlzLmZ1enp5TWF0LnNldFByb3BlcnR5KGZ1enp5VGltZSwgdGhpcy5lbGFwc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBlbGFwc2U6IG51bWJlciA9IC0xO1xyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5aW5nKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5lbGFwc2UgKz0gZHQgKiB0aGlzLnNwZDtcclxuICAgICAgICB0aGlzLmZ1enp5TWF0LnNldFByb3BlcnR5KGZ1enp5VGltZSwgdGhpcy5lbGFwc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==