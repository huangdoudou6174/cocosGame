
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Utils/List.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a4a8GupEhFJICYQnV0lNDZ', 'List');
// myGame/Script/Utils/List.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 链表
 * 默认为双向链表，接口与数组基本一致
 */
var List = /** @class */ (function () {
    function List() {
        this._firstNode = null;
        this._lastNode = null;
        this.count = 0;
    }
    Object.defineProperty(List.prototype, "length", {
        /**链表长度 */
        get: function () { return this.count; },
        enumerable: true,
        configurable: true
    });
    /**清空链表 */
    List.prototype.clear = function () {
        this.reset();
    };
    List.prototype.reset = function () {
        var node = this.first;
        while (!!node) {
            node.prev = null;
            node = node.next;
        }
        node = this.last;
        while (!!node) {
            node.next = null;
            node = node.prev;
        }
        this._firstNode = null;
        this._lastNode = null;
        this.count = 0;
    };
    /**添加链表第一个节点 */
    List.prototype.addFirstNode = function (v) {
        if (this.count > 0) {
            console.error("list.addFirstNode error: list._firstNode is not null.");
            return;
        }
        var node = new ListNode(v);
        this._firstNode = node;
        this._lastNode = node;
        this.count = 1;
    };
    Object.defineProperty(List.prototype, "first", {
        /**链表第一个节点 */
        get: function () {
            return this._firstNode;
        },
        enumerable: true,
        configurable: true
    });
    /**在尾部添加一个节点 */
    List.prototype.push = function (v) {
        if (this.count <= 0) {
            this.addFirstNode(v);
        }
        else {
            var node = new ListNode(v);
            node.prev = this._lastNode;
            this._lastNode.next = node;
            this._lastNode = node;
            this.count++;
        }
    };
    Object.defineProperty(List.prototype, "last", {
        /**链表最后一个节点 */
        get: function () {
            return this._lastNode;
        },
        enumerable: true,
        configurable: true
    });
    /**移除并返回最后一个节点 */
    List.prototype.pop = function () {
        if (this.count == 0)
            return null;
        if (this.count == 1) {
            var node = this._firstNode;
            this.clear();
            return node;
        }
        else {
            var node = this._lastNode;
            this._lastNode = this._lastNode.prev;
            this._lastNode.next = null;
            this.count--;
            node.prev = null;
            return node;
        }
    };
    /**移除并返回链表第一个节点 */
    List.prototype.shift = function () {
        if (this.count <= 0)
            return null;
        var node = this._firstNode;
        if (this.count == 1) {
            this.clear();
            return node;
        }
        this._firstNode = this._firstNode.next;
        this._firstNode.prev = null;
        this.count--;
        node.next = null;
        return node;
    };
    /**在头部添加一个节点 */
    List.prototype.unshift = function (v) {
        if (this.count <= 0) {
            this.addFirstNode(v);
        }
        else {
            var node = new ListNode(v);
            node.next = this._firstNode;
            this._firstNode.prev = node;
            this._firstNode = node;
            this.count++;
        }
    };
    /**获取指定索引位置的节点 */
    List.prototype.at = function (index) {
        if (index < 0 || index >= this.count)
            return null;
        var node = this._firstNode;
        while (--index >= 0) {
            node = node.next;
        }
        return node;
    };
    /**获取指定索引位置的节点的值 */
    List.prototype.get = function (index) {
        var node = this.at(index);
        return !!node ? node.value : null;
    };
    /**在指定索引位置插入值 */
    List.prototype.insert = function (index, v) {
        if (index >= this.count) {
            this.push(v);
            return;
        }
        if (index <= 0) {
            this.unshift(v);
            return;
        }
        var node = this._firstNode;
        while (--index >= 0) {
            node = node.next;
        }
        var n = new ListNode(v);
        n.prev = node;
        n.next = node.next;
        node.next.prev = n;
        node.next = n;
    };
    /**移除指定节点 */
    List.prototype.remove = function (index) {
        if (typeof index === "number") {
            return this.removeByIndex(index);
        }
        else if (index instanceof ListNode && this.indexOf(index) >= 0) {
            var node = index;
            if (!node.prev) {
                node.prev.next = node.next;
            }
            if (!node.next) {
                node.next.prev = node.prev;
            }
            this.count--;
            node.prev = null;
            node.next = null;
            return node;
        }
    };
    /**
     * 移除指定节点，调用者需确保该节点属于本链表，否则将造成本链表数据丢失
     * @param node
     */
    List.prototype.removeNode = function (node) {
        if (!!node.prev) {
            node.prev.next = node.next;
        }
        if (!!node.next) {
            node.next.prev = node.prev;
        }
        node.prev = null;
        node.next = null;
        this.count--;
    };
    /**查找指定节点或值在链表中的索引位置 */
    List.prototype.indexOf = function (node) {
        if (node instanceof ListNode) {
            var index = 0;
            var n = this._firstNode;
            while (!!n && n != node) {
                n = n.next;
                index++;
            }
            return n == node ? index : -1;
        }
        else {
            var index = 0;
            var n = this._firstNode;
            while (!!n && n.value != node) {
                n = n.next;
                index++;
            }
            return n.value == node ? index : -1;
        }
    };
    List.prototype.removeByIndex = function (index) {
        if (index < 0 || index >= this.count)
            return null;
        var node = this._firstNode;
        while (--index >= 0) {
            node = node.next;
        }
        if (!node.prev) {
            node.prev.next = node.next;
        }
        if (!node.next) {
            node.next.prev = node.prev;
        }
        this.count--;
        node.prev = null;
        node.next = null;
        return node;
    };
    /**从指定索引位置开始移除一定数量的节点 */
    List.prototype.splice = function (index, count) {
        if (count === void 0) { count = 1; }
        if (index < 0 || index >= this.count)
            return;
        if (count == 1) {
            this.removeByIndex(index);
            return;
        }
        var startNode = this._firstNode;
        while (--index >= 0) {
            startNode = startNode.next;
        }
        var lastNode = startNode.next;
        while (--count > 0 && !!lastNode) {
            lastNode = lastNode.next;
        }
        if (!!startNode.prev) {
            startNode.prev.next = lastNode;
        }
        if (!!lastNode) {
            lastNode.prev = startNode.prev;
        }
        while (!!startNode) {
            startNode.prev = null;
            var n = startNode.next;
            startNode.next = null;
            startNode = n;
        }
        this.count -= count;
    };
    return List;
}());
exports.default = List;
/**链表节点 */
var ListNode = /** @class */ (function () {
    function ListNode(v) {
        /**节点中存储的值 */
        this.value = null;
        /**前一个节点 */
        this.prev = null;
        /**后一个节点 */
        this.next = null;
        this.value = v;
    }
    return ListNode;
}());
exports.ListNode = ListNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFV0aWxzXFxMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0dBR0c7QUFDSDtJQUFBO1FBQ1ksZUFBVSxHQUFnQixJQUFJLENBQUM7UUFDL0IsY0FBUyxHQUFnQixJQUFJLENBQUM7UUFDOUIsVUFBSyxHQUFXLENBQUMsQ0FBQztJQW9POUIsQ0FBQztJQWxPRyxzQkFBVyx3QkFBTTtRQURqQixVQUFVO2FBQ1YsY0FBOEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDbEQsVUFBVTtJQUNILG9CQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNNLG9CQUFLLEdBQVo7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDakIsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0QsZUFBZTtJQUNQLDJCQUFZLEdBQXBCLFVBQXFCLENBQUk7UUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLHVE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QUcsU0FBUyxDQUFDLElBQUksQ0FBQztTQUM5QjtRQUNELElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDOUIsT0FBTyxFQUFFLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUM5QixRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDbEIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ1osUUFBUSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ2hCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDdEIsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNqQjtRQUNELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0F2T0EsQUF1T0MsSUFBQTs7QUFDRCxVQUFVO0FBQ1Y7SUFPSSxrQkFBbUIsQ0FBSTtRQU52QixhQUFhO1FBQ04sVUFBSyxHQUFNLElBQUksQ0FBQztRQUN2QixXQUFXO1FBQ0osU0FBSSxHQUFnQixJQUFJLENBQUM7UUFDaEMsV0FBVztRQUNKLFNBQUksR0FBZ0IsSUFBSSxDQUFDO1FBRTVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFWWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDpk77ooahcclxuICog6buY6K6k5Li65Y+M5ZCR6ZO+6KGo77yM5o6l5Y+j5LiO5pWw57uE5Z+65pys5LiA6Ie0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0PFQ+e1xyXG4gICAgcHJpdmF0ZSBfZmlyc3ROb2RlOiBMaXN0Tm9kZTxUPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9sYXN0Tm9kZTogTGlzdE5vZGU8VD4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjb3VudDogbnVtYmVyID0gMDtcclxuICAgIC8qKumTvuihqOmVv+W6piAqL1xyXG4gICAgcHVibGljIGdldCBsZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY291bnQ7IH1cclxuICAgIC8qKua4heepuumTvuihqCAqL1xyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZmlyc3Q7XHJcbiAgICAgICAgd2hpbGUgKCEhbm9kZSkge1xyXG4gICAgICAgICAgICBub2RlLnByZXYgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gdGhpcy5sYXN0O1xyXG4gICAgICAgIHdoaWxlICghIW5vZGUpIHtcclxuICAgICAgICAgICAgbm9kZS5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucHJldjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmlyc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICB9XHJcbiAgICAvKirmt7vliqDpk77ooajnrKzkuIDkuKroioLngrkgKi9cclxuICAgIHByaXZhdGUgYWRkRmlyc3ROb2RlKHY6IFQpIHtcclxuICAgICAgICBpZiAodGhpcy5jb3VudCA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxpc3QuYWRkRmlyc3ROb2RlIGVycm9yOiBsaXN0Ll9maXJzdE5vZGUgaXMgbm90IG51bGwuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlID0gbmV3IExpc3ROb2RlPFQ+KHYpO1xyXG4gICAgICAgIHRoaXMuX2ZpcnN0Tm9kZSA9IG5vZGU7XHJcbiAgICAgICAgdGhpcy5fbGFzdE5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSAxO1xyXG4gICAgfVxyXG4gICAgLyoq6ZO+6KGo56ys5LiA5Liq6IqC54K5ICovXHJcbiAgICBwdWJsaWMgZ2V0IGZpcnN0KCk6IExpc3ROb2RlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3ROb2RlO1xyXG4gICAgfVxyXG4gICAgLyoq5Zyo5bC+6YOo5re75Yqg5LiA5Liq6IqC54K5ICovXHJcbiAgICBwdWJsaWMgcHVzaCh2OiBUKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEZpcnN0Tm9kZSh2KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBMaXN0Tm9kZSh2KTtcclxuICAgICAgICAgICAgbm9kZS5wcmV2ID0gdGhpcy5fbGFzdE5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3ROb2RlLm5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Tm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirpk77ooajmnIDlkI7kuIDkuKroioLngrkgKi9cclxuICAgIHB1YmxpYyBnZXQgbGFzdCgpOiBMaXN0Tm9kZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3ROb2RlO1xyXG4gICAgfVxyXG4gICAgLyoq56e76Zmk5bm26L+U5Zue5pyA5ZCO5LiA5Liq6IqC54K5ICovXHJcbiAgICBwdWJsaWMgcG9wKCk6IExpc3ROb2RlPFQ+IHtcclxuICAgICAgICBpZiAodGhpcy5jb3VudCA9PSAwKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5jb3VudCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5fZmlyc3ROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5fbGFzdE5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3ROb2RlID0gdGhpcy5fbGFzdE5vZGUucHJldjtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQtLTtcclxuICAgICAgICAgICAgbm9kZS5wcmV2ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq56e76Zmk5bm26L+U5Zue6ZO+6KGo56ys5LiA5Liq6IqC54K5ICovXHJcbiAgICBwdWJsaWMgc2hpZnQoKTogTGlzdE5vZGU8VD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvdW50IDw9IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5fZmlyc3ROb2RlO1xyXG4gICAgICAgIGlmICh0aGlzLmNvdW50ID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmlyc3ROb2RlID0gdGhpcy5fZmlyc3ROb2RlLm5leHQ7XHJcbiAgICAgICAgdGhpcy5fZmlyc3ROb2RlLnByZXYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY291bnQtLTtcclxuICAgICAgICBub2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgLyoq5Zyo5aS06YOo5re75Yqg5LiA5Liq6IqC54K5ICovXHJcbiAgICBwdWJsaWMgdW5zaGlmdCh2OiBUKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEZpcnN0Tm9kZSh2KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBMaXN0Tm9kZTxUPih2KTtcclxuICAgICAgICAgICAgbm9kZS5uZXh0ID0gdGhpcy5fZmlyc3ROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJzdE5vZGUucHJldiA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0Tm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bmjIflrprntKLlvJXkvY3nva7nmoToioLngrkgKi9cclxuICAgIHB1YmxpYyBhdChpbmRleDogbnVtYmVyKTogTGlzdE5vZGU8VD4ge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jb3VudCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKC0taW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluaMh+Wumue0ouW8leS9jee9rueahOiKgueCueeahOWAvCAqL1xyXG4gICAgcHVibGljIGdldChpbmRleDogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmF0KGluZGV4KTtcclxuICAgICAgICByZXR1cm4gISFub2RlID8gbm9kZS52YWx1ZSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICAvKirlnKjmjIflrprntKLlvJXkvY3nva7mj5LlhaXlgLwgKi9cclxuICAgIHB1YmxpYyBpbnNlcnQoaW5kZXg6IG51bWJlciwgdjogVCkge1xyXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLmNvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaCh2KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnVuc2hpZnQodik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKC0taW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbiA9IG5ldyBMaXN0Tm9kZTxUPih2KTtcclxuICAgICAgICBuLnByZXYgPSBub2RlO1xyXG4gICAgICAgIG4ubmV4dCA9IG5vZGUubmV4dDtcclxuICAgICAgICBub2RlLm5leHQucHJldiA9IG47XHJcbiAgICAgICAgbm9kZS5uZXh0ID0gbjtcclxuICAgIH1cclxuICAgIC8qKuenu+mZpOaMh+WumuiKgueCuSAqL1xyXG4gICAgcHVibGljIHJlbW92ZShpbmRleDogbnVtYmVyIHwgTGlzdE5vZGU8VD4pOiBMaXN0Tm9kZTxUPiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVCeUluZGV4KGluZGV4KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4IGluc3RhbmNlb2YgTGlzdE5vZGUgJiYgdGhpcy5pbmRleE9mKGluZGV4KSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGlmICghbm9kZS5wcmV2KSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW5vZGUubmV4dCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3VudC0tO1xyXG4gICAgICAgICAgICBub2RlLnByZXYgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOaMh+WumuiKgueCue+8jOiwg+eUqOiAhemcgOehruS/neivpeiKgueCueWxnuS6juacrOmTvuihqO+8jOWQpuWImeWwhumAoOaIkOacrOmTvuihqOaVsOaNruS4ouWksVxyXG4gICAgICogQHBhcmFtIG5vZGUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVOb2RlKG5vZGU6IExpc3ROb2RlPFQ+KSB7XHJcbiAgICAgICAgaWYgKCEhbm9kZS5wcmV2KSB7XHJcbiAgICAgICAgICAgIG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISFub2RlLm5leHQpIHtcclxuICAgICAgICAgICAgbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUucHJldiA9IG51bGw7XHJcbiAgICAgICAgbm9kZS5uZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvdW50LS07XHJcbiAgICB9XHJcbiAgICAvKirmn6Xmib7mjIflrproioLngrnmiJblgLzlnKjpk77ooajkuK3nmoTntKLlvJXkvY3nva4gKi9cclxuICAgIHB1YmxpYyBpbmRleE9mKG5vZGU6IExpc3ROb2RlPFQ+IHwgVCkge1xyXG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGlzdE5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgbGV0IG4gPSB0aGlzLl9maXJzdE5vZGU7XHJcbiAgICAgICAgICAgIHdoaWxlICghIW4gJiYgbiAhPSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBuID0gbi5uZXh0O1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbiA9PSBub2RlID8gaW5kZXggOiAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBsZXQgbiA9IHRoaXMuX2ZpcnN0Tm9kZTtcclxuICAgICAgICAgICAgd2hpbGUgKCEhbiAmJiBuLnZhbHVlICE9IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIG4gPSBuLm5leHQ7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuLnZhbHVlID09IG5vZGUgPyBpbmRleCA6IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVtb3ZlQnlJbmRleChpbmRleDogbnVtYmVyKTogTGlzdE5vZGU8VD4ge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5jb3VudCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKC0taW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW5vZGUucHJldikge1xyXG4gICAgICAgICAgICBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFub2RlLm5leHQpIHtcclxuICAgICAgICAgICAgbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnQtLTtcclxuICAgICAgICBub2RlLnByZXYgPSBudWxsO1xyXG4gICAgICAgIG5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvKirku47mjIflrprntKLlvJXkvY3nva7lvIDlp4vnp7vpmaTkuIDlrprmlbDph4/nmoToioLngrkgKi9cclxuICAgIHB1YmxpYyBzcGxpY2UoaW5kZXg6IG51bWJlciwgY291bnQ6IG51bWJlciA9IDEpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuY291bnQpIHJldHVybjtcclxuICAgICAgICBpZiAoY291bnQgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUJ5SW5kZXgoaW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdGFydE5vZGUgPSB0aGlzLl9maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKC0taW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxhc3ROb2RlID0gc3RhcnROb2RlLm5leHQ7XHJcbiAgICAgICAgd2hpbGUgKC0tY291bnQgPiAwICYmICEhbGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgbGFzdE5vZGUgPSBsYXN0Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISFzdGFydE5vZGUucHJldikge1xyXG4gICAgICAgICAgICBzdGFydE5vZGUucHJldi5uZXh0ID0gbGFzdE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghIWxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgIGxhc3ROb2RlLnByZXYgPSBzdGFydE5vZGUucHJldjtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKCEhc3RhcnROb2RlKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0Tm9kZS5wcmV2ID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IG4gPSBzdGFydE5vZGUubmV4dDtcclxuICAgICAgICAgICAgc3RhcnROb2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBzdGFydE5vZGUgPSBuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50IC09IGNvdW50O1xyXG4gICAgfVxyXG59XHJcbi8qKumTvuihqOiKgueCuSAqL1xyXG5leHBvcnQgY2xhc3MgTGlzdE5vZGU8VD57XHJcbiAgICAvKiroioLngrnkuK3lrZjlgqjnmoTlgLwgKi9cclxuICAgIHB1YmxpYyB2YWx1ZTogVCA9IG51bGw7XHJcbiAgICAvKirliY3kuIDkuKroioLngrkgKi9cclxuICAgIHB1YmxpYyBwcmV2OiBMaXN0Tm9kZTxUPiA9IG51bGw7XHJcbiAgICAvKirlkI7kuIDkuKroioLngrkgKi9cclxuICAgIHB1YmxpYyBuZXh0OiBMaXN0Tm9kZTxUPiA9IG51bGw7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodjogVCkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==