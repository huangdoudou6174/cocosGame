
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Utils/QuadTree.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3bf9dau2DlA0IKZpOw5Fzys', 'QuadTree');
// myGame/Script/Utils/QuadTree.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 四叉树
 * 管理的对象需要实现ITreeObj接口
 */
var QuadTree = /** @class */ (function () {
    function QuadTree() {
    }
    /**
     *
     * @param minX
     * @param maxX
     * @param minY
     * @param maxY
     * @param depth 四叉树最大深度，根据四叉树最大尺寸与碰撞体最小尺寸来设置
     * @param count 四叉树的节点包含的最大对象数，插入对象数量大于该值时，节点将分裂为4个子节点
     */
    QuadTree.init = function (minX, maxX, minY, maxY, depth, count) {
        if (!!depth && depth > 0)
            TreeNode.maxDepth = depth;
        if (!!count && count > 0)
            TreeNode.maxCount = count;
        if (!this.root) {
            this.root = Pool.get(minX, maxX, minY, maxY);
        }
        else {
            this.root.reset();
            this.root.set(minX, maxX, minY, maxY);
        }
    };
    QuadTree.reset = function () {
        if (!!this.root) {
            this.root.reset();
        }
    };
    QuadTree.removeObj = function (obj, node) {
        if (undefined === node) {
            node = this.root;
        }
        node.removeObj(obj);
    };
    QuadTree.insertObj = function (obj) {
        if (!this.root) {
            console.error("插入对象错误：四叉树未初始化！");
            return null;
        }
        var node = this.root.insertObj(obj);
        // cc.log("节点深度：", node.depth);
        return node;
    };
    QuadTree.getObjsByObj = function (obj) {
        if (undefined === obj) {
            return this.root.getObjs();
        }
        else {
            var node = this.getTreeNode(obj);
            var rect = TreeNode.getObjRect(obj);
            return node.getObjs(rect);
        }
    };
    QuadTree.getObjsByNode = function (node, obj) {
        if (undefined === obj) {
            return node.getObjs();
        }
        else {
            var rect = TreeNode.getObjRect(obj);
            return node.getObjs(rect);
        }
    };
    /**完全包含对象的树节点 */
    QuadTree.getTreeNode = function (obj) {
        if (undefined === obj) {
            return this.root;
        }
        var rect = TreeNode.getObjRect(obj);
        return this.getContainNode(this.root, rect);
    };
    QuadTree.getContainNode = function (node, rect) {
        if (!node.leaf1) {
            return node;
        }
        if (TreeNode.contain(node.leaf1, rect)) {
            return this.getContainNode(node.leaf1, rect);
        }
        if (TreeNode.contain(node.leaf2, rect)) {
            return this.getContainNode(node.leaf2, rect);
        }
        if (TreeNode.contain(node.leaf3, rect)) {
            return this.getContainNode(node.leaf3, rect);
        }
        if (TreeNode.contain(node.leaf4, rect)) {
            return this.getContainNode(node.leaf4, rect);
        }
        return node;
    };
    QuadTree.root = null;
    return QuadTree;
}());
exports.default = QuadTree;
//节点
var TreeNode = /** @class */ (function () {
    function TreeNode(minX, maxX, minY, maxY, parent) {
        this.parent = null;
        this.leaf1 = null;
        this.leaf2 = null;
        this.leaf3 = null;
        this.leaf4 = null;
        this.set(minX, maxX, minY, maxY, parent);
    }
    TreeNode.prototype.set = function (minX, maxX, minY, maxY, parent) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
        this.width = this.maxX - this.minX;
        this.height = this.maxY - this.minY;
        this.centerX = (this.minX + this.maxX) * 0.5;
        this.centerY = (this.minY + this.maxY) * 0.5;
        this.objs = {};
        this.count = 0;
        this.parent = parent;
        if (!!parent) {
            this.depth = parent.depth + 1;
        }
        else {
            this.depth = 0;
        }
    };
    TreeNode.prototype.split = function () {
        var x = this.centerX;
        var y = this.centerY;
        this.leaf1 = Pool.get(x, this.maxX, y, this.maxY, this);
        this.leaf2 = Pool.get(this.minX, x, y, this.maxY, this);
        this.leaf3 = Pool.get(this.minX, x, this.minY, y, this);
        this.leaf4 = Pool.get(x, this.maxX, this.minY, y, this);
        // for (let i = this.objs.length - 1; i >= 0; --i) {
        //     this.insertIntoChildLeaf(this.objs[i]);
        // }
        var objs = this.objs;
        this.objs = {};
        this.count = 0;
        for (var key in objs) {
            this.insertObj(objs[key]);
        }
    };
    TreeNode.prototype.removeObj = function (obj) {
        var rect = TreeNode.getObjRect(obj);
        if (!TreeNode.cross(rect, this)) {
            return;
        }
        if (!!this.objs[obj.Id]) {
            this.count -= 1;
            delete this.objs[obj.Id];
        }
        // let index = this.objs.indexOf(obj);
        // if (index >= 0) {
        //     this.objs.splice(index, 1);
        // } else 
        if (!!this.leaf1) {
            if (TreeNode.cross(rect, this.leaf1)) {
                this.leaf1.removeObj(obj);
            }
            if (TreeNode.cross(rect, this.leaf2)) {
                this.leaf2.removeObj(obj);
            }
            if (TreeNode.cross(rect, this.leaf3)) {
                this.leaf3.removeObj(obj);
            }
            if (TreeNode.cross(rect, this.leaf4)) {
                this.leaf4.removeObj(obj);
            }
        }
    };
    TreeNode.prototype.insertObj = function (obj) {
        var rect = TreeNode.getObjRect(obj);
        if (!TreeNode.cross(this, rect)) {
            // if (!!this.parent) {
            //     return this.parent.insertObj(obj);
            // } else {
            //     return null;
            // }
            cc.log("对象与节点没有相交:");
            cc.log(this.minX, this.minY, this.width, this.height);
            cc.log(rect);
        }
        else {
            if (!!this.leaf1) {
                return this.insertIntoChildLeaf(obj, rect);
            }
            else if (this.depth < TreeNode.maxDepth && this.count >= TreeNode.maxCount) {
                this.split();
                return this.insertObj(obj);
            }
            else {
                return this.insertIntoSelf(obj);
            }
        }
    };
    TreeNode.prototype.insertIntoChildLeaf = function (obj, rect) {
        if (undefined === rect) {
            rect = TreeNode.getObjRect(obj);
        }
        if (rect.minX >= this.centerX) {
            if (rect.minY >= this.centerY) {
                return this.leaf1.insertObj(obj);
            }
            else if (rect.maxY < this.centerY) {
                return this.leaf4.insertObj(obj);
            }
            else {
                this.leaf1.insertObj(obj);
                this.leaf4.insertObj(obj);
                return this.insertIntoSelf(obj);
            }
        }
        else if (rect.maxX <= this.centerX) {
            if (rect.minY >= this.centerY) {
                return this.leaf2.insertObj(obj);
            }
            else if (rect.maxY < this.centerY) {
                return this.leaf3.insertObj(obj);
            }
            else {
                this.leaf2.insertObj(obj);
                this.leaf3.insertObj(obj);
                return this.insertIntoSelf(obj);
            }
        }
        else if (rect.minY >= this.centerY) {
            this.leaf1.insertObj(obj);
            this.leaf2.insertObj(obj);
            return this.insertIntoSelf(obj);
        }
        else if (rect.maxY <= this.centerY) {
            this.leaf3.insertObj(obj);
            this.leaf4.insertObj(obj);
            return this.insertIntoSelf(obj);
        }
        else {
            this.leaf1.insertObj(obj);
            this.leaf2.insertObj(obj);
            this.leaf3.insertObj(obj);
            this.leaf4.insertObj(obj);
            return this.insertIntoSelf(obj);
        }
    };
    TreeNode.prototype.insertIntoSelf = function (obj) {
        // this.objs.push(obj);
        this.objs[obj.Id] = obj;
        this.count++;
        return this;
    };
    /**矩形1是否完全包含矩形2 */
    TreeNode.contain = function (rect1, rect2) {
        return rect1.minX <= rect1.minX
            && rect1.maxX >= rect2.maxX
            && rect1.minY <= rect2.minY
            && rect1.maxY >= rect2.maxY;
    };
    /**获取对象的矩形范围 */
    TreeNode.getObjRect = function (obj) {
        return obj.getRect();
    };
    /**
     * 获取节点内包含的对象
     * @param rect 不传参数时，默认获取节点下的全部对象，传入参数时，会先检测对象与节点及子节点是否相交，只返回相交的节点中的对象
     */
    TreeNode.prototype.getObjs = function (rect) {
        if (undefined === rect) {
            return this.getAllObjs();
        }
        else if (TreeNode.cross(rect, this)) {
            return this.getCrossObjs(rect);
        }
        else {
            return {};
        }
    };
    TreeNode.prototype.getAllObjs = function () {
        if (!this.leaf1) {
            return this.objs;
        }
        // let objs = [].concat(this.objs);
        // objs = objs.concat(this.leaf1.getObjs());
        // objs = objs.concat(this.leaf2.getObjs());
        // objs = objs.concat(this.leaf3.getObjs());
        // objs = objs.concat(this.leaf4.getObjs());
        var objs = {};
        TreeNode.copyObjs(objs, this.objs);
        var o1 = this.leaf1.getAllObjs();
        TreeNode.copyObjs(objs, o1);
        var o2 = this.leaf2.getAllObjs();
        TreeNode.copyObjs(objs, o2);
        var o3 = this.leaf3.getAllObjs();
        TreeNode.copyObjs(objs, o3);
        var o4 = this.leaf4.getAllObjs();
        TreeNode.copyObjs(objs, o4);
        return objs;
    };
    TreeNode.copyObjs = function (target, res) {
        for (var key in res) {
            target[key] = res[key];
        }
    };
    TreeNode.prototype.getCrossObjs = function (rect) {
        var objs = {};
        TreeNode.copyObjs(objs, this.objs);
        if (!this.leaf1) {
            return objs;
        }
        // let objs = [].concat(this.objs);
        // if (TreeNode.cross(rect, this.leaf1)) {
        //     objs = objs.concat(this.leaf1.getCrossObjs(rect));
        // }
        // if (TreeNode.cross(rect, this.leaf2)) {
        //     objs = objs.concat(this.leaf2.getCrossObjs(rect));
        // }
        // if (TreeNode.cross(rect, this.leaf3)) {
        //     objs = objs.concat(this.leaf3.getCrossObjs(rect));
        // }
        // if (TreeNode.cross(rect, this.leaf4)) {
        //     objs = objs.concat(this.leaf4.getCrossObjs(rect));
        // }
        // return objs;
        if (TreeNode.cross(rect, this.leaf1)) {
            var o1 = this.leaf1.getCrossObjs(rect);
            TreeNode.copyObjs(objs, o1);
        }
        if (TreeNode.cross(rect, this.leaf2)) {
            var o2 = this.leaf2.getCrossObjs(rect);
            TreeNode.copyObjs(objs, o2);
        }
        if (TreeNode.cross(rect, this.leaf3)) {
            var o3 = this.leaf3.getCrossObjs(rect);
            TreeNode.copyObjs(objs, o3);
        }
        if (TreeNode.cross(rect, this.leaf4)) {
            var o4 = this.leaf4.getCrossObjs(rect);
            TreeNode.copyObjs(objs, o4);
        }
        return objs;
    };
    TreeNode.cross = function (rect1, rect2) {
        return rect1.minX <= rect2.maxX
            && rect1.maxX >= rect2.minX
            && rect1.minY <= rect2.maxY
            && rect1.maxY >= rect2.minY;
    };
    TreeNode.prototype.reset = function () {
        this.parent = null;
        this.objs = {};
        this.count = 0;
        this.depth = 0;
        if (!!this.leaf1) {
            Pool.put(this.leaf1);
            Pool.put(this.leaf2);
            Pool.put(this.leaf3);
            Pool.put(this.leaf4);
            this.leaf1 = null;
            this.leaf2 = null;
            this.leaf3 = null;
            this.leaf4 = null;
        }
    };
    TreeNode.maxDepth = 7;
    TreeNode.maxCount = 10;
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//节点对象池
var Pool = /** @class */ (function () {
    function Pool() {
    }
    Pool.get = function (minX, maxX, minY, maxY, parent) {
        if (this.nodes.length > 0) {
            var node = this.nodes.pop();
            node.set(minX, maxX, minY, maxY, parent);
            return node;
        }
        else {
            return new TreeNode(minX, maxX, minY, maxY, parent);
        }
    };
    Pool.put = function (node) {
        node.reset();
        this.nodes.push(node);
    };
    Pool.nodes = [];
    return Pool;
}());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFV0aWxzXFxRdWFkVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7OztHQUdHO0FBQ0g7SUFBQTtJQW9GQSxDQUFDO0lBbEZHOzs7Ozs7OztPQVFHO0lBQ1csYUFBSSxHQUFsQixVQUFtQixJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYyxFQUFFLEtBQWM7UUFDckcsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDO1lBQUUsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEQsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDO1lBQUUsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBQ2EsY0FBSyxHQUFuQjtRQUNJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUNhLGtCQUFTLEdBQXZCLFVBQXdCLEdBQVMsRUFBRSxJQUFlO1FBQzlDLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNwQjtRQUNE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QUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTTtZQUNILE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0wsQ0FBQztJQUNhLFFBQUcsR0FBakIsVUFBa0IsSUFBYztRQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBYmdCLFVBQUssR0FBZSxFQUFFLENBQUM7SUFjNUMsV0FBQztDQWZELEFBZUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICog5Zub5Y+J5qCRXHJcbiAqIOeuoeeQhueahOWvueixoemcgOimgeWunueOsElUcmVlT2Jq5o6l5Y+jXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWFkVHJlZSB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJvb3Q6IFRyZWVOb2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbWluWCBcclxuICAgICAqIEBwYXJhbSBtYXhYIFxyXG4gICAgICogQHBhcmFtIG1pblkgXHJcbiAgICAgKiBAcGFyYW0gbWF4WSBcclxuICAgICAqIEBwYXJhbSBkZXB0aCDlm5vlj4nmoJHmnIDlpKfmt7HluqbvvIzmoLnmja7lm5vlj4nmoJHmnIDlpKflsLrlr7jkuI7norDmkp7kvZPmnIDlsI/lsLrlr7jmnaXorr7nva5cclxuICAgICAqIEBwYXJhbSBjb3VudCDlm5vlj4nmoJHnmoToioLngrnljIXlkKvnmoTmnIDlpKflr7nosaHmlbDvvIzmj5LlhaXlr7nosaHmlbDph4/lpKfkuo7or6XlgLzml7bvvIzoioLngrnlsIbliIboo4LkuLo05Liq5a2Q6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdChtaW5YOiBudW1iZXIsIG1heFg6IG51bWJlciwgbWluWTogbnVtYmVyLCBtYXhZOiBudW1iZXIsIGRlcHRoPzogbnVtYmVyLCBjb3VudD86IG51bWJlcikge1xyXG4gICAgICAgIGlmICghIWRlcHRoICYmIGRlcHRoID4gMCkgVHJlZU5vZGUubWF4RGVwdGggPSBkZXB0aDtcclxuICAgICAgICBpZiAoISFjb3VudCAmJiBjb3VudCA+IDApIFRyZWVOb2RlLm1heENvdW50ID0gY291bnQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gUG9vbC5nZXQobWluWCwgbWF4WCwgbWluWSwgbWF4WSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb290LnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdC5zZXQobWluWCwgbWF4WCwgbWluWSwgbWF4WSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyByZXNldCgpIHtcclxuICAgICAgICBpZiAoISF0aGlzLnJvb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290LnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVPYmoob2JqPzogYW55LCBub2RlPzogVHJlZU5vZGUpIHtcclxuICAgICAgICBpZiAodW5kZWZpbmVkID09PSBub2RlKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUucmVtb3ZlT2JqKG9iaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGluc2VydE9iaihvYmo/OiBhbnkpOiBUcmVlTm9kZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaPkuWFpeWvueixoemUmeivr++8muWbm+WPieagkeacquWIneWni+WMlu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5yb290Lmluc2VydE9iaihvYmopO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIuiKgueCuea3seW6pu+8mlwiLCBub2RlLmRlcHRoKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T2Jqc0J5T2JqKG9iaj86IGFueSkge1xyXG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290LmdldE9ianMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0VHJlZU5vZGUob2JqKTtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBUcmVlTm9kZS5nZXRPYmpSZWN0KG9iaik7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlLmdldE9ianMocmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmpzQnlOb2RlKG5vZGU6IFRyZWVOb2RlLCBvYmo/OiBhbnkpIHtcclxuICAgICAgICBpZiAodW5kZWZpbmVkID09PSBvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuZ2V0T2JqcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gVHJlZU5vZGUuZ2V0T2JqUmVjdChvYmopO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZS5nZXRPYmpzKHJlY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuWujOWFqOWMheWQq+WvueixoeeahOagkeiKgueCuSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUcmVlTm9kZShvYmo/OiBhbnkpOiBUcmVlTm9kZSB7XHJcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gb2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWN0ID0gVHJlZU5vZGUuZ2V0T2JqUmVjdChvYmopO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRhaW5Ob2RlKHRoaXMucm9vdCwgcmVjdCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGdldENvbnRhaW5Ob2RlKG5vZGU6IFRyZWVOb2RlLCByZWN0OiBSZWN0KSB7XHJcbiAgICAgICAgaWYgKCFub2RlLmxlYWYxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoVHJlZU5vZGUuY29udGFpbihub2RlLmxlYWYxLCByZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250YWluTm9kZShub2RlLmxlYWYxLCByZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFRyZWVOb2RlLmNvbnRhaW4obm9kZS5sZWFmMiwgcmVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGFpbk5vZGUobm9kZS5sZWFmMiwgcmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChUcmVlTm9kZS5jb250YWluKG5vZGUubGVhZjMsIHJlY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbnRhaW5Ob2RlKG5vZGUubGVhZjMsIHJlY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoVHJlZU5vZGUuY29udGFpbihub2RlLmxlYWY0LCByZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb250YWluTm9kZShub2RlLmxlYWY0LCByZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v6IqC54K5XHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZSB7XHJcbiAgICBwdWJsaWMgcGFyZW50OiBUcmVlTm9kZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgbGVhZjE6IFRyZWVOb2RlID0gbnVsbDtcclxuICAgIHB1YmxpYyBsZWFmMjogVHJlZU5vZGUgPSBudWxsO1xyXG4gICAgcHVibGljIGxlYWYzOiBUcmVlTm9kZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgbGVhZjQ6IFRyZWVOb2RlID0gbnVsbDtcclxuICAgIC8vIHB1YmxpYyBvYmpzOiBhbnlbXTtcclxuICAgIHB1YmxpYyBvYmpzOiB7IFtpZDogbnVtYmVyXTogYW55IH07XHJcbiAgICBwdWJsaWMgbWluWDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1heFg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtaW5ZOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbWF4WTogbnVtYmVyO1xyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY2VudGVyWDogbnVtYmVyO1xyXG4gICAgcHVibGljIGNlbnRlclk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBkZXB0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvdW50OiBudW1iZXI7Ly/lrozlhajljIXlkKvlnKjoioLngrnlhoXnmoTlr7nosaHmlbDph49cclxuICAgIHB1YmxpYyBzdGF0aWMgbWF4RGVwdGg6IG51bWJlciA9IDc7XHJcbiAgICBwdWJsaWMgc3RhdGljIG1heENvdW50OiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWluWDogbnVtYmVyLCBtYXhYOiBudW1iZXIsIG1pblk6IG51bWJlciwgbWF4WTogbnVtYmVyLCBwYXJlbnQ/OiBUcmVlTm9kZSkge1xyXG4gICAgICAgIHRoaXMuc2V0KG1pblgsIG1heFgsIG1pblksIG1heFksIHBhcmVudCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0KG1pblg6IG51bWJlciwgbWF4WDogbnVtYmVyLCBtaW5ZOiBudW1iZXIsIG1heFk6IG51bWJlciwgcGFyZW50PzogVHJlZU5vZGUpIHtcclxuICAgICAgICB0aGlzLm1pblggPSBtaW5YO1xyXG4gICAgICAgIHRoaXMubWF4WCA9IG1heFg7XHJcbiAgICAgICAgdGhpcy5taW5ZID0gbWluWTtcclxuICAgICAgICB0aGlzLm1heFkgPSBtYXhZO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLm1heFggLSB0aGlzLm1pblg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLm1heFkgLSB0aGlzLm1pblk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJYID0gKHRoaXMubWluWCArIHRoaXMubWF4WCkgKiAwLjU7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJZID0gKHRoaXMubWluWSArIHRoaXMubWF4WSkgKiAwLjU7XHJcbiAgICAgICAgdGhpcy5vYmpzID0ge307XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgaWYgKCEhcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVwdGggPSBwYXJlbnQuZGVwdGggKyAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVwdGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzcGxpdCgpIHtcclxuICAgICAgICBsZXQgeCA9IHRoaXMuY2VudGVyWDtcclxuICAgICAgICBsZXQgeSA9IHRoaXMuY2VudGVyWTtcclxuICAgICAgICB0aGlzLmxlYWYxID0gUG9vbC5nZXQoeCwgdGhpcy5tYXhYLCB5LCB0aGlzLm1heFksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubGVhZjIgPSBQb29sLmdldCh0aGlzLm1pblgsIHgsIHksIHRoaXMubWF4WSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5sZWFmMyA9IFBvb2wuZ2V0KHRoaXMubWluWCwgeCwgdGhpcy5taW5ZLCB5LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmxlYWY0ID0gUG9vbC5nZXQoeCwgdGhpcy5tYXhYLCB0aGlzLm1pblksIHksIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gdGhpcy5vYmpzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5zZXJ0SW50b0NoaWxkTGVhZih0aGlzLm9ianNbaV0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgb2JqcyA9IHRoaXMub2JqcztcclxuICAgICAgICB0aGlzLm9ianMgPSB7fTtcclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2Jqcykge1xyXG4gICAgICAgICAgICB0aGlzLmluc2VydE9iaihvYmpzW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmVPYmoob2JqPzogYW55KSB7XHJcbiAgICAgICAgbGV0IHJlY3QgPSBUcmVlTm9kZS5nZXRPYmpSZWN0KG9iaik7XHJcbiAgICAgICAgaWYgKCFUcmVlTm9kZS5jcm9zcyhyZWN0LCB0aGlzKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghIXRoaXMub2Jqc1tvYmouSWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQgLT0gMTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMub2Jqc1tvYmouSWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsZXQgaW5kZXggPSB0aGlzLm9ianMuaW5kZXhPZihvYmopO1xyXG4gICAgICAgIC8vIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMub2Jqcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIC8vIH0gZWxzZSBcclxuICAgICAgICBpZiAoISF0aGlzLmxlYWYxKSB7XHJcbiAgICAgICAgICAgIGlmIChUcmVlTm9kZS5jcm9zcyhyZWN0LCB0aGlzLmxlYWYxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWFmMS5yZW1vdmVPYmoob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoVHJlZU5vZGUuY3Jvc3MocmVjdCwgdGhpcy5sZWFmMikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVhZjIucmVtb3ZlT2JqKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFRyZWVOb2RlLmNyb3NzKHJlY3QsIHRoaXMubGVhZjMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlYWYzLnJlbW92ZU9iaihvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChUcmVlTm9kZS5jcm9zcyhyZWN0LCB0aGlzLmxlYWY0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWFmNC5yZW1vdmVPYmoob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBpbnNlcnRPYmoob2JqPzogYW55KTogVHJlZU5vZGUge1xyXG4gICAgICAgIGxldCByZWN0ID0gVHJlZU5vZGUuZ2V0T2JqUmVjdChvYmopO1xyXG4gICAgICAgIGlmICghVHJlZU5vZGUuY3Jvc3ModGhpcywgcmVjdCkpIHtcclxuICAgICAgICAgICAgLy8gaWYgKCEhdGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLnBhcmVudC5pbnNlcnRPYmoob2JqKTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuWvueixoeS4juiKgueCueayoeacieebuOS6pDpcIik7XHJcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLm1pblgsIHRoaXMubWluWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjYy5sb2cocmVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCEhdGhpcy5sZWFmMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0SW50b0NoaWxkTGVhZihvYmosIHJlY3QpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGVwdGggPCBUcmVlTm9kZS5tYXhEZXB0aCAmJiB0aGlzLmNvdW50ID49IFRyZWVOb2RlLm1heENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwbGl0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRPYmoob2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc2VydEludG9TZWxmKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaW5zZXJ0SW50b0NoaWxkTGVhZihvYmo/OiBhbnksIHJlY3Q/OiBSZWN0KSB7XHJcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gcmVjdCkge1xyXG4gICAgICAgICAgICByZWN0ID0gVHJlZU5vZGUuZ2V0T2JqUmVjdChvYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVjdC5taW5YID49IHRoaXMuY2VudGVyWCkge1xyXG4gICAgICAgICAgICBpZiAocmVjdC5taW5ZID49IHRoaXMuY2VudGVyWSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVhZjEuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjdC5tYXhZIDwgdGhpcy5jZW50ZXJZKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWFmNC5pbnNlcnRPYmoob2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVhZjEuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlYWY0Lmluc2VydE9iaihvYmopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0SW50b1NlbGYob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocmVjdC5tYXhYIDw9IHRoaXMuY2VudGVyWCkge1xyXG4gICAgICAgICAgICBpZiAocmVjdC5taW5ZID49IHRoaXMuY2VudGVyWSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVhZjIuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjdC5tYXhZIDwgdGhpcy5jZW50ZXJZKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWFmMy5pbnNlcnRPYmoob2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVhZjIuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlYWYzLmluc2VydE9iaihvYmopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0SW50b1NlbGYob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocmVjdC5taW5ZID49IHRoaXMuY2VudGVyWSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlYWYxLmluc2VydE9iaihvYmopO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWYyLmluc2VydE9iaihvYmopO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRJbnRvU2VsZihvYmopO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVjdC5tYXhZIDw9IHRoaXMuY2VudGVyWSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlYWYzLmluc2VydE9iaihvYmopO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWY0Lmluc2VydE9iaihvYmopO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRJbnRvU2VsZihvYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZjEuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZjIuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZjMuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZjQuaW5zZXJ0T2JqKG9iaik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc2VydEludG9TZWxmKG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGluc2VydEludG9TZWxmKG9iaj86IGFueSk6IFRyZWVOb2RlIHtcclxuICAgICAgICAvLyB0aGlzLm9ianMucHVzaChvYmopO1xyXG4gICAgICAgIHRoaXMub2Jqc1tvYmouSWRdID0gb2JqO1xyXG4gICAgICAgIHRoaXMuY291bnQrKztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKuefqeW9ojHmmK/lkKblrozlhajljIXlkKvnn6nlvaIyICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbnRhaW4ocmVjdDE6IFJlY3QsIHJlY3QyOiBSZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHJlY3QxLm1pblggPD0gcmVjdDEubWluWFxyXG4gICAgICAgICAgICAmJiByZWN0MS5tYXhYID49IHJlY3QyLm1heFhcclxuICAgICAgICAgICAgJiYgcmVjdDEubWluWSA8PSByZWN0Mi5taW5ZXHJcbiAgICAgICAgICAgICYmIHJlY3QxLm1heFkgPj0gcmVjdDIubWF4WTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluWvueixoeeahOefqeW9ouiMg+WbtCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmpSZWN0KG9iaj86IGFueSk6IFJlY3Qge1xyXG4gICAgICAgIHJldHVybiBvYmouZ2V0UmVjdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5boioLngrnlhoXljIXlkKvnmoTlr7nosaFcclxuICAgICAqIEBwYXJhbSByZWN0IOS4jeS8oOWPguaVsOaXtu+8jOm7mOiupOiOt+WPluiKgueCueS4i+eahOWFqOmDqOWvueixoe+8jOS8oOWFpeWPguaVsOaXtu+8jOS8muWFiOajgOa1i+WvueixoeS4juiKgueCueWPiuWtkOiKgueCueaYr+WQpuebuOS6pO+8jOWPqui/lOWbnuebuOS6pOeahOiKgueCueS4reeahOWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0T2JqcyhyZWN0PzogUmVjdCk6IHsgW2lkOiBudW1iZXJdOiBhbnkgfSB7XHJcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gcmVjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPYmpzKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChUcmVlTm9kZS5jcm9zcyhyZWN0LCB0aGlzKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDcm9zc09ianMocmVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxPYmpzKCk6IHsgW2lkOiBudW1iZXJdOiBhbnkgfSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxlYWYxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ianM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBvYmpzID0gW10uY29uY2F0KHRoaXMub2Jqcyk7XHJcbiAgICAgICAgLy8gb2JqcyA9IG9ianMuY29uY2F0KHRoaXMubGVhZjEuZ2V0T2JqcygpKTtcclxuICAgICAgICAvLyBvYmpzID0gb2Jqcy5jb25jYXQodGhpcy5sZWFmMi5nZXRPYmpzKCkpO1xyXG4gICAgICAgIC8vIG9ianMgPSBvYmpzLmNvbmNhdCh0aGlzLmxlYWYzLmdldE9ianMoKSk7XHJcbiAgICAgICAgLy8gb2JqcyA9IG9ianMuY29uY2F0KHRoaXMubGVhZjQuZ2V0T2JqcygpKTtcclxuICAgICAgICBsZXQgb2JqcyA9IHt9O1xyXG4gICAgICAgIFRyZWVOb2RlLmNvcHlPYmpzKG9ianMsIHRoaXMub2Jqcyk7XHJcbiAgICAgICAgbGV0IG8xID0gdGhpcy5sZWFmMS5nZXRBbGxPYmpzKCk7XHJcbiAgICAgICAgVHJlZU5vZGUuY29weU9ianMob2JqcywgbzEpO1xyXG4gICAgICAgIGxldCBvMiA9IHRoaXMubGVhZjIuZ2V0QWxsT2JqcygpO1xyXG4gICAgICAgIFRyZWVOb2RlLmNvcHlPYmpzKG9ianMsIG8yKTtcclxuICAgICAgICBsZXQgbzMgPSB0aGlzLmxlYWYzLmdldEFsbE9ianMoKTtcclxuICAgICAgICBUcmVlTm9kZS5jb3B5T2JqcyhvYmpzLCBvMyk7XHJcbiAgICAgICAgbGV0IG80ID0gdGhpcy5sZWFmNC5nZXRBbGxPYmpzKCk7XHJcbiAgICAgICAgVHJlZU5vZGUuY29weU9ianMob2JqcywgbzQpO1xyXG4gICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5T2Jqcyh0YXJnZXQ6IGFueSwgcmVzOiBhbnkpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcmVzKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gcmVzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENyb3NzT2JqcyhyZWN0OiBSZWN0KTogeyBbaWQ6IG51bWJlcl06IGFueSB9IHtcclxuICAgICAgICBsZXQgb2JqcyA9IHt9O1xyXG4gICAgICAgIFRyZWVOb2RlLmNvcHlPYmpzKG9ianMsIHRoaXMub2Jqcyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxlYWYxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsZXQgb2JqcyA9IFtdLmNvbmNhdCh0aGlzLm9ianMpO1xyXG4gICAgICAgIC8vIGlmIChUcmVlTm9kZS5jcm9zcyhyZWN0LCB0aGlzLmxlYWYxKSkge1xyXG4gICAgICAgIC8vICAgICBvYmpzID0gb2Jqcy5jb25jYXQodGhpcy5sZWFmMS5nZXRDcm9zc09ianMocmVjdCkpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZiAoVHJlZU5vZGUuY3Jvc3MocmVjdCwgdGhpcy5sZWFmMikpIHtcclxuICAgICAgICAvLyAgICAgb2JqcyA9IG9ianMuY29uY2F0KHRoaXMubGVhZjIuZ2V0Q3Jvc3NPYmpzKHJlY3QpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKFRyZWVOb2RlLmNyb3NzKHJlY3QsIHRoaXMubGVhZjMpKSB7XHJcbiAgICAgICAgLy8gICAgIG9ianMgPSBvYmpzLmNvbmNhdCh0aGlzLmxlYWYzLmdldENyb3NzT2JqcyhyZWN0KSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmIChUcmVlTm9kZS5jcm9zcyhyZWN0LCB0aGlzLmxlYWY0KSkge1xyXG4gICAgICAgIC8vICAgICBvYmpzID0gb2Jqcy5jb25jYXQodGhpcy5sZWFmNC5nZXRDcm9zc09ianMocmVjdCkpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyByZXR1cm4gb2JqcztcclxuXHJcbiAgICAgICAgaWYgKFRyZWVOb2RlLmNyb3NzKHJlY3QsIHRoaXMubGVhZjEpKSB7XHJcbiAgICAgICAgICAgIGxldCBvMSA9IHRoaXMubGVhZjEuZ2V0Q3Jvc3NPYmpzKHJlY3QpO1xyXG4gICAgICAgICAgICBUcmVlTm9kZS5jb3B5T2JqcyhvYmpzLCBvMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChUcmVlTm9kZS5jcm9zcyhyZWN0LCB0aGlzLmxlYWYyKSkge1xyXG4gICAgICAgICAgICBsZXQgbzIgPSB0aGlzLmxlYWYyLmdldENyb3NzT2JqcyhyZWN0KTtcclxuICAgICAgICAgICAgVHJlZU5vZGUuY29weU9ianMob2JqcywgbzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoVHJlZU5vZGUuY3Jvc3MocmVjdCwgdGhpcy5sZWFmMykpIHtcclxuICAgICAgICAgICAgbGV0IG8zID0gdGhpcy5sZWFmMy5nZXRDcm9zc09ianMocmVjdCk7XHJcbiAgICAgICAgICAgIFRyZWVOb2RlLmNvcHlPYmpzKG9ianMsIG8zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFRyZWVOb2RlLmNyb3NzKHJlY3QsIHRoaXMubGVhZjQpKSB7XHJcbiAgICAgICAgICAgIGxldCBvNCA9IHRoaXMubGVhZjQuZ2V0Q3Jvc3NPYmpzKHJlY3QpO1xyXG4gICAgICAgICAgICBUcmVlTm9kZS5jb3B5T2JqcyhvYmpzLCBvNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmpzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBjcm9zcyhyZWN0MTogUmVjdCwgcmVjdDI6IFJlY3QpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcmVjdDEubWluWCA8PSByZWN0Mi5tYXhYXHJcbiAgICAgICAgICAgICYmIHJlY3QxLm1heFggPj0gcmVjdDIubWluWFxyXG4gICAgICAgICAgICAmJiByZWN0MS5taW5ZIDw9IHJlY3QyLm1heFlcclxuICAgICAgICAgICAgJiYgcmVjdDEubWF4WSA+PSByZWN0Mi5taW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vYmpzID0ge307XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5kZXB0aCA9IDA7XHJcbiAgICAgICAgaWYgKCEhdGhpcy5sZWFmMSkge1xyXG4gICAgICAgICAgICBQb29sLnB1dCh0aGlzLmxlYWYxKTtcclxuICAgICAgICAgICAgUG9vbC5wdXQodGhpcy5sZWFmMik7XHJcbiAgICAgICAgICAgIFBvb2wucHV0KHRoaXMubGVhZjMpO1xyXG4gICAgICAgICAgICBQb29sLnB1dCh0aGlzLmxlYWY0KTtcclxuICAgICAgICAgICAgdGhpcy5sZWFmMSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubGVhZjIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWYzID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5sZWFmNCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbnR5cGUgUmVjdCA9IHtcclxuICAgIG1pblg6IG51bWJlcixcclxuICAgIG1heFg6IG51bWJlcixcclxuICAgIG1pblk6IG51bWJlcixcclxuICAgIG1heFk6IG51bWJlclxyXG59O1xyXG4vL+iKgueCueWvueixoeaxoFxyXG5jbGFzcyBQb29sIHtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgbm9kZXM6IFRyZWVOb2RlW10gPSBbXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KG1pblg6IG51bWJlciwgbWF4WDogbnVtYmVyLCBtaW5ZOiBudW1iZXIsIG1heFk6IG51bWJlciwgcGFyZW50PzogVHJlZU5vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ub2Rlcy5wb3AoKTtcclxuICAgICAgICAgICAgbm9kZS5zZXQobWluWCwgbWF4WCwgbWluWSwgbWF4WSwgcGFyZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmVlTm9kZShtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZLCBwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgcHV0KG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICAgICAgbm9kZS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxufVxyXG4iXX0=