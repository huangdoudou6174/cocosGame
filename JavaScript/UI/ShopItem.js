
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/ShopItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b5aeb/hZU5JrZ/u9f7wUasb', 'ShopItem');
// myGame/Script/UI/ShopItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Loader_1 = require("../Common/Loader");
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 单个商品
 */
var ShopItem = /** @class */ (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemSprite = null;
        _this.LockMask = null;
        _this._unclock = false;
        _this.chooseMask = null;
        _this._isChecked = false;
        _this.itemName = null;
        _this.price = null;
        return _this;
    }
    Object.defineProperty(ShopItem.prototype, "unlock", {
        /**商品项是否已解锁 */
        get: function () { return this._unclock; },
        set: function (v) {
            this._unclock = !!v;
            this.LockMask.active = !this._unclock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShopItem.prototype, "isChecked", {
        /**商品项是否被选中 */
        get: function () { return this._isChecked; },
        set: function (v) {
            this._isChecked = !!v;
            this.chooseMask.active = this._isChecked;
        },
        enumerable: true,
        configurable: true
    });
    ShopItem.prototype.init = function (data) {
        this.isChecked = false;
        this.onEvents();
        if (!!data)
            this.setData(data);
    };
    ShopItem.prototype.onEvents = function () {
        this.node.on("touchend", this.onTouchEnd, this);
    };
    ShopItem.prototype.reset = function () {
        this.data = null;
        this.isChecked = false;
    };
    ShopItem.prototype.reuse = function (data) {
        this.reset();
        this.setData(data);
    };
    ShopItem.prototype.unuse = function () {
        this.reset();
    };
    ShopItem.prototype.setData = function (data) {
        //数据
        this.data = data;
        //图片
        this.itemSprite.spriteFrame = Loader_1.default.getSpriteFrame(data.itemUrl);
        //名称
        this.itemName.string = data.name;
        //价格
        this.price.string = data.price.toString();
        //状态
        this.unlock = data.unlock;
    };
    ShopItem.prototype.onTouchEnd = function () {
        if (this.isChecked)
            return;
        this.isChecked = true;
        this.emit(GameEventType_1.EventType.ShopEvent.chooseItem, this);
    };
    __decorate([
        property(cc.Sprite)
    ], ShopItem.prototype, "itemSprite", void 0);
    __decorate([
        property(cc.Node)
    ], ShopItem.prototype, "LockMask", void 0);
    __decorate([
        property(cc.Node)
    ], ShopItem.prototype, "chooseMask", void 0);
    __decorate([
        property(cc.Label)
    ], ShopItem.prototype, "itemName", void 0);
    __decorate([
        property(cc.Label)
    ], ShopItem.prototype, "price", void 0);
    ShopItem = __decorate([
        ccclass
    ], ShopItem);
    return ShopItem;
}(yyComponent_1.default));
exports.default = ShopItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxTaG9wSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXNDO0FBQ3RDLHFEQUFnRDtBQUNoRCw4REFBeUQ7QUFFbkQsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1Qzs7R0FFRztBQUVIO0lBQXNDLDRCQUFXO0lBRGpEO1FBQUEscUVBMkVDO1FBeEVhLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQVMxQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQVM1QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRTFCLFdBQUssR0FBYSxJQUFJLENBQUM7O0lBK0NyQyxDQUFDO0lBbEVHLHNCQUFXLDRCQUFNO1FBRGpCLGNBQWM7YUFDZCxjQUFzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQzdDLFVBQWtCLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFDLENBQUM7OztPQUo0QztJQVU3QyxzQkFBVywrQkFBUztRQURwQixjQUFjO2FBQ2QsY0FBeUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUNsRCxVQUFxQixDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzdDLENBQUM7OztPQUppRDtJQWEzQyx1QkFBSSxHQUFYLFVBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVTLDJCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLHdCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRU0sd0JBQUssR0FBWixVQUFhLElBQVM7UUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sd0JBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBR1MsMEJBQU8sR0FBakIsVUFBa0IsSUFBbUY7UUFDakcsSUFBSTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUk7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxnQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsSUFBSTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSTtRQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBSTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRVMsNkJBQVUsR0FBcEI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBdkVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ21CO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ2lCO0lBVW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ21CO0lBVXJDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7OENBQ2lCO0lBRXBDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ2M7SUEzQmhCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EwRTVCO0lBQUQsZUFBQztDQTFFRCxBQTBFQyxDQTFFcUMscUJBQVcsR0EwRWhEO2tCQTFFb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2FkZXIgZnJvbSBcIi4uL0NvbW1vbi9Mb2FkZXJcIjtcclxuaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbi8qKlxyXG4gKiDljZXkuKrllYblk4FcclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BJdGVtIGV4dGVuZHMgeXlDb21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByb3RlY3RlZCBpdGVtU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJvdGVjdGVkIExvY2tNYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBfdW5jbG9jazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5ZWG5ZOB6aG55piv5ZCm5bey6Kej6ZSBICovXHJcbiAgICBwdWJsaWMgZ2V0IHVubG9jaygpIHsgcmV0dXJuIHRoaXMuX3VuY2xvY2s7IH1cclxuICAgIHB1YmxpYyBzZXQgdW5sb2NrKHYpIHtcclxuICAgICAgICB0aGlzLl91bmNsb2NrID0gISF2O1xyXG4gICAgICAgIHRoaXMuTG9ja01hc2suYWN0aXZlID0gIXRoaXMuX3VuY2xvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm90ZWN0ZWQgY2hvb3NlTWFzazogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgX2lzQ2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5ZWG5ZOB6aG55piv5ZCm6KKr6YCJ5LitICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzQ2hlY2tlZCgpIHsgcmV0dXJuIHRoaXMuX2lzQ2hlY2tlZDsgfVxyXG4gICAgcHVibGljIHNldCBpc0NoZWNrZWQodikge1xyXG4gICAgICAgIHRoaXMuX2lzQ2hlY2tlZCA9ICEhdjtcclxuICAgICAgICB0aGlzLmNob29zZU1hc2suYWN0aXZlID0gdGhpcy5faXNDaGVja2VkO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByb3RlY3RlZCBpdGVtTmFtZTogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJvdGVjdGVkIHByaWNlOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGRhdGE6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XHJcbiAgICAgICAgaWYgKCEhZGF0YSkgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oXCJ0b3VjaGVuZFwiLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJldXNlKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVudXNlKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIHNldERhdGEoZGF0YTogeyBpZDogbnVtYmVyLCBpdGVtVXJsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcHJpY2U6IG51bWJlciwgdW5sb2NrOiBib29sZWFuIH0pIHtcclxuICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgLy/lm77niYdcclxuICAgICAgICB0aGlzLml0ZW1TcHJpdGUuc3ByaXRlRnJhbWUgPSBMb2FkZXIuZ2V0U3ByaXRlRnJhbWUoZGF0YS5pdGVtVXJsKTtcclxuICAgICAgICAvL+WQjeensFxyXG4gICAgICAgIHRoaXMuaXRlbU5hbWUuc3RyaW5nID0gZGF0YS5uYW1lO1xyXG4gICAgICAgIC8v5Lu35qC8XHJcbiAgICAgICAgdGhpcy5wcmljZS5zdHJpbmcgPSBkYXRhLnByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy/nirbmgIFcclxuICAgICAgICB0aGlzLnVubG9jayA9IGRhdGEudW5sb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblRvdWNoRW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ2hlY2tlZCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNob3BFdmVudC5jaG9vc2VJdGVtLCB0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19