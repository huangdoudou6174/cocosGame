
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/GlobalPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84420SabQFAAYr0LnO7MwNk', 'GlobalPool');
// myGame/Script/Common/GlobalPool.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AutoPool_1 = require("./AutoPool");
//全局节点对象池
var GlobalPool = /** @class */ (function () {
    function GlobalPool() {
    }
    /**
     * 创建新的对象池
     * @param nodeName 节点名称
     * @param prefab 节点预制资源
     * @param scriptName 节点上挂载的脚本名称，必须实现接口IPoolObject，用于处理节点进出对象池时的逻辑
     */
    GlobalPool.createPool = function (nodeName, prefab, scriptName) {
        if (this.allPools.hasOwnProperty(nodeName)) {
            console.warn("已存在该名称的对象池，请确认是否名字冲突：", nodeName);
            return;
        }
        this.allPools[nodeName] = new AutoPool_1.AutoNodePool(prefab, scriptName);
    };
    /**
     * 获取实例
     * @param nodeName 要获取的节点名称
     * @param data 节点需要的数据
     * @returns {cc.Node} 按传入的数据进行设置的节点实例
     */
    GlobalPool.get = function (nodeName, data) {
        if (!this.allPools[nodeName]) {
            console.error("未创建对应名称的对象池，获取实例失败：", nodeName);
            return null;
        }
        return this.allPools[nodeName].get(data);
    };
    /**
     * 回收节点
     * @param nodeName 节点名称，与节点要放回的对象池名称对应
     * @param node 回收的节点
     */
    GlobalPool.put = function (node, nodeName) {
        if (!nodeName)
            nodeName = node.name;
        if (!this.allPools[nodeName]) {
            console.warn("未创建对应名称的对象池，将销毁节点：", nodeName);
            var js = node.getComponent(nodeName);
            if (!!js && !!js.unuse) {
                js.unuse();
            }
            node.destroy();
            return;
        }
        this.allPools[nodeName].put(node);
    };
    /**
     * 回收节点的所有子节点
     * @param node
     */
    GlobalPool.putAllChildren = function (node) {
        for (var i = node.childrenCount - 1; i >= 0; --i) {
            var child = node.children[i];
            this.put(child);
        }
    };
    /**
     * 清空对象池缓存，未指定名称时将清空所有的对象池
     * @param nodeName 对象池名称
     */
    GlobalPool.clear = function (nodeName) {
        if (!!nodeName) {
            if (this.allPools.hasOwnProperty(nodeName)) {
                this.allPools[nodeName].clear();
                delete this.allPools[nodeName];
            }
        }
        else {
            for (var key in this.allPools) {
                this.allPools[key].clear();
            }
            this.allPools = {};
        }
    };
    GlobalPool.allPools = {};
    return GlobalPool;
}());
exports.default = GlobalPool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcR2xvYmFsUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTBDO0FBRTFDLFNBQVM7QUFDVDtJQUFBO0lBeUVBLENBQUM7SUF2RUc7Ozs7O09BS0c7SUFDVyxxQkFBVSxHQUF4QixVQUF5QixRQUFnQixFQUFFLE1BQWlCLEVBQUUsVUFBbUI7UUFDN0UsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSx1QkFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxjQUFHLEdBQWpCLFVBQWtCLFFBQWdCLEVBQUUsSUFBVTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRDs7OztPQUlHO0lBQ1csY0FBRyxHQUFqQixVQUFrQixJQUFhLEVBQUUsUUFBaUI7UUFDOUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO2dCQUNwQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtZQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7O09BR0c7SUFDVyx5QkFBYyxHQUE1QixVQUE2QixJQUFhO1FBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM5QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csZ0JBQUssR0FBbkIsVUFBb0IsUUFBaUI7UUFDakMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ1osSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7YUFBTTtZQUNILEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQXZFYyxtQkFBUSxHQUF5QyxFQUFFLENBQUM7SUF3RXZFLGlCQUFDO0NBekVELEFBeUVDLElBQUE7a0JBekVvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0b05vZGVQb29sIH0gZnJvbSBcIi4vQXV0b1Bvb2xcIjtcclxuXHJcbi8v5YWo5bGA6IqC54K55a+56LGh5rGgXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsb2JhbFBvb2wge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWxsUG9vbHM6IHsgW25vZGVOYW1lOiBzdHJpbmddOiBBdXRvTm9kZVBvb2wgfSA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rmlrDnmoTlr7nosaHmsaBcclxuICAgICAqIEBwYXJhbSBub2RlTmFtZSDoioLngrnlkI3np7BcclxuICAgICAqIEBwYXJhbSBwcmVmYWIg6IqC54K56aKE5Yi26LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gc2NyaXB0TmFtZSDoioLngrnkuIrmjILovb3nmoTohJrmnKzlkI3np7DvvIzlv4Xpobvlrp7njrDmjqXlj6NJUG9vbE9iamVjdO+8jOeUqOS6juWkhOeQhuiKgueCuei/m+WHuuWvueixoeaxoOaXtueahOmAu+i+kVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVBvb2wobm9kZU5hbWU6IHN0cmluZywgcHJlZmFiOiBjYy5QcmVmYWIsIHNjcmlwdE5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5hbGxQb29scy5oYXNPd25Qcm9wZXJ0eShub2RlTmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwi5bey5a2Y5Zyo6K+l5ZCN56ew55qE5a+56LGh5rGg77yM6K+356Gu6K6k5piv5ZCm5ZCN5a2X5Yay56qB77yaXCIsIG5vZGVOYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFsbFBvb2xzW25vZGVOYW1lXSA9IG5ldyBBdXRvTm9kZVBvb2wocHJlZmFiLCBzY3JpcHROYW1lKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a6e5L6LXHJcbiAgICAgKiBAcGFyYW0gbm9kZU5hbWUg6KaB6I635Y+W55qE6IqC54K55ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDoioLngrnpnIDopoHnmoTmlbDmja5cclxuICAgICAqIEByZXR1cm5zIHtjYy5Ob2RlfSDmjInkvKDlhaXnmoTmlbDmja7ov5vooYzorr7nva7nmoToioLngrnlrp7kvotcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQobm9kZU5hbWU6IHN0cmluZywgZGF0YT86IGFueSk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5hbGxQb29sc1tub2RlTmFtZV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuacquWIm+W7uuWvueW6lOWQjeensOeahOWvueixoeaxoO+8jOiOt+WPluWunuS+i+Wksei0pe+8mlwiLCBub2RlTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5hbGxQb29sc1tub2RlTmFtZV0uZ2V0KGRhdGEpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlm57mlLboioLngrlcclxuICAgICAqIEBwYXJhbSBub2RlTmFtZSDoioLngrnlkI3np7DvvIzkuI7oioLngrnopoHmlL7lm57nmoTlr7nosaHmsaDlkI3np7Dlr7nlupRcclxuICAgICAqIEBwYXJhbSBub2RlIOWbnuaUtueahOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHB1dChub2RlOiBjYy5Ob2RlLCBub2RlTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmICghbm9kZU5hbWUpIG5vZGVOYW1lID0gbm9kZS5uYW1lO1xyXG4gICAgICAgIGlmICghdGhpcy5hbGxQb29sc1tub2RlTmFtZV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwi5pyq5Yib5bu65a+55bqU5ZCN56ew55qE5a+56LGh5rGg77yM5bCG6ZSA5q+B6IqC54K577yaXCIsIG5vZGVOYW1lKTtcclxuICAgICAgICAgICAgbGV0IGpzID0gbm9kZS5nZXRDb21wb25lbnQobm9kZU5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoISFqcyAmJiAhIWpzLnVudXNlKSB7XHJcbiAgICAgICAgICAgICAgICBqcy51bnVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxsUG9vbHNbbm9kZU5hbWVdLnB1dChub2RlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Zue5pS26IqC54K555qE5omA5pyJ5a2Q6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gbm9kZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwdXRBbGxDaGlsZHJlbihub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vZGUuY2hpbGRyZW5Db3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IG5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIHRoaXMucHV0KGNoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa4heepuuWvueixoeaxoOe8k+WtmO+8jOacquaMh+WumuWQjeensOaXtuWwhua4heepuuaJgOacieeahOWvueixoeaxoFxyXG4gICAgICogQHBhcmFtIG5vZGVOYW1lIOWvueixoeaxoOWQjeensFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyKG5vZGVOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCEhbm9kZU5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWxsUG9vbHMuaGFzT3duUHJvcGVydHkobm9kZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFBvb2xzW25vZGVOYW1lXS5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWxsUG9vbHNbbm9kZU5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuYWxsUG9vbHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsUG9vbHNba2V5XS5jbGVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWxsUG9vbHMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19