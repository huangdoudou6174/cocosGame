
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/AutoPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c54123J+uJNoaeooISOVnfk', 'AutoPool');
// myGame/Script/Common/AutoPool.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 节点对象池，对象池为空时可自动实例化新的对象
 */
var AutoNodePool = /** @class */ (function () {
    /**
     * 节点对象池，对象池为空时可自动实例化新的对象
     * @param prefab 预制
     * @param scriptName 节点挂载的脚本，管理节点进出对象池时的逻辑，必须实现接口IPoolObject
     */
    function AutoNodePool(prefab, scriptName) {
        this.prefab = prefab;
        this.scripteName = scriptName;
        this.pool = new cc.NodePool(scriptName);
    }
    /**
     * 获取实例
     * @param data 给实例赋值的数据
     */
    AutoNodePool.prototype.get = function (data) {
        var item = this.pool.get(data);
        if (!item) {
            item = cc.instantiate(this.prefab);
            if (!!this.scripteName) {
                var s = item.getComponent(this.scripteName);
                if (!!s) {
                    s.init(data);
                }
                else {
                    this.scripteName = null;
                }
            }
        }
        return item;
    };
    /**
     * 回收节点
     * @param item
     */
    AutoNodePool.prototype.put = function (item) {
        this.pool.put(item);
    };
    /**
     * 清空对象池，将销毁所有缓存的实例
     */
    AutoNodePool.prototype.clear = function () {
        this.pool.clear();
    };
    return AutoNodePool;
}());
exports.AutoNodePool = AutoNodePool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcQXV0b1Bvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztHQUVHO0FBQ0g7SUFJSTs7OztPQUlHO0lBQ0gsc0JBQVksTUFBaUIsRUFBRSxVQUFtQjtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMEJBQUcsR0FBVixVQUFXLElBQVU7UUFDakIsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztpQkFDM0I7YUFDSjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDBCQUFHLEdBQVYsVUFBVyxJQUFhO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDTCxtQkFBQztBQUFELENBakRBLEFBaURDLElBQUE7QUFqRFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9vbE9iamVjdCB9IGZyb20gXCIuL0lQb29sT2JqZWN0XCI7XG5cbi8qKlxuICog6IqC54K55a+56LGh5rGg77yM5a+56LGh5rGg5Li656m65pe25Y+v6Ieq5Yqo5a6e5L6L5YyW5paw55qE5a+56LGhXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRvTm9kZVBvb2wge1xuICAgIHByaXZhdGUgcHJlZmFiOiBjYy5QcmVmYWI7XG4gICAgcHJpdmF0ZSBzY3JpcHRlTmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcG9vbDogY2MuTm9kZVBvb2w7XG4gICAgLyoqXG4gICAgICog6IqC54K55a+56LGh5rGg77yM5a+56LGh5rGg5Li656m65pe25Y+v6Ieq5Yqo5a6e5L6L5YyW5paw55qE5a+56LGhXG4gICAgICogQHBhcmFtIHByZWZhYiDpooTliLZcbiAgICAgKiBAcGFyYW0gc2NyaXB0TmFtZSDoioLngrnmjILovb3nmoTohJrmnKzvvIznrqHnkIboioLngrnov5vlh7rlr7nosaHmsaDml7bnmoTpgLvovpHvvIzlv4Xpobvlrp7njrDmjqXlj6NJUG9vbE9iamVjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByZWZhYjogY2MuUHJlZmFiLCBzY3JpcHROYW1lPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHJlZmFiID0gcHJlZmFiO1xuICAgICAgICB0aGlzLnNjcmlwdGVOYW1lID0gc2NyaXB0TmFtZTtcbiAgICAgICAgdGhpcy5wb29sID0gbmV3IGNjLk5vZGVQb29sKHNjcmlwdE5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWunuS+i1xuICAgICAqIEBwYXJhbSBkYXRhIOe7meWunuS+i+i1i+WAvOeahOaVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQoZGF0YT86IGFueSk6IGNjLk5vZGUge1xuICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMucG9vbC5nZXQoZGF0YSk7XG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcbiAgICAgICAgICAgIGlmICghIXRoaXMuc2NyaXB0ZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgczogSVBvb2xPYmplY3QgPSBpdGVtLmdldENvbXBvbmVudCh0aGlzLnNjcmlwdGVOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoISFzKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuaW5pdChkYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcmlwdGVOYW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Zue5pS26IqC54K5XG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKi9cbiAgICBwdWJsaWMgcHV0KGl0ZW06IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5wb29sLnB1dChpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXnqbrlr7nosaHmsaDvvIzlsIbplIDmr4HmiYDmnInnvJPlrZjnmoTlrp7kvotcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMucG9vbC5jbGVhcigpO1xuICAgIH1cbn1cbiJdfQ==