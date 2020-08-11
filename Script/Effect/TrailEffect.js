
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Effect/TrailEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1bcbofMMNIaoAHhPHSlezK', 'TrailEffect');
// myGame/Script/Effect/TrailEffect.ts

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TrailEffect = /** @class */ (function (_super) {
    __extends(TrailEffect, _super);
    function TrailEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.meshRenderer = null;
        _this.mesh = null;
        /**Z轴方向的曲面细分等级 */
        _this.level = 5;
        _this.soft = 5;
        /**是否跟随目标节点的角度 */
        _this.followAngle = false;
        /**拖尾头部的坐标 */
        _this.startPosition = cc.v3();
        /**拖尾尾部的坐标 */
        _this.endPosition = cc.v3();
        /**网格顶点数据 */
        _this.verts = [];
        _this._playing = false;
        return _this;
    }
    TrailEffect.prototype.initPosition = function () {
        this.startPosition = cc.v3();
        this.endPosition = cc.v3();
    };
    TrailEffect.prototype.initPolygon = function () {
        this.polygon = [];
    };
    TrailEffect.prototype.resetPolygon = function () {
        this.polygon = [];
    };
    /**设置横截面 */
    TrailEffect.prototype.setShape = function (polygon) {
        this.polygon = [].concat(polygon);
        this.createVerts();
        this.createMesh();
    };
    /**根据截面形状和拖尾位置创建网格顶点 */
    TrailEffect.prototype.createVerts = function () {
        //顶点的Z轴偏移为0
        this.verts = [];
        for (var i = 0; i <= this.level; ++i) {
            for (var j = 0, c = this.polygon.length; j < c; ++j) {
                this.verts.push(cc.v3(this.polygon[j].x, this.polygon[j].y, 0).addSelf(this.startPosition));
            }
        }
    };
    /**创建网格数据 */
    TrailEffect.prototype.createMesh = function () {
        // let gfx = cc.renderer.renderEngine.gfx;
        var gfx = cc.gfx;
        // 定义顶点数据格式，只需要指明所需的属性，避免造成存储空间的浪费
        var vfmtPosColor = new gfx.VertexFormat([
            // 用户需要创建一个三维的盒子，所以需要三个值来保存位置信息
            { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
            { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
            { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
        ]);
        this.mesh = new cc.Mesh();
        var mesh = this.mesh;
        // 初始化网格信息
        mesh.init(vfmtPosColor, this.verts.length, true);
        // 修改 position 顶点数据
        mesh.setVertices(gfx.ATTR_POSITION, this.verts);
        // 修改 color 顶点数据
        var colors = [];
        for (var i = 0, c = this.verts.length; i < c; ++i) {
            colors.push(cc.Color.WHITE);
        }
        mesh.setVertices(gfx.ATTR_COLOR, colors);
        // 修改 uv 顶点数据
        //todo:需要修改
        var uv = [];
        var nPolygon = this.polygon.length;
        for (var i = 0; i <= this.level; ++i) {
            for (var j = 0; j < nPolygon; ++j) {
                uv.push(cc.v2(1 - i / this.level, j / nPolygon));
            }
        }
        mesh.setVertices(gfx.ATTR_UV0, uv);
        // 修改索引数据
        var frag = [];
        for (var i = 0; i < this.level; ++i) {
            var maxJ = nPolygon - 1;
            for (var j = 0; j < maxJ; ++j) {
                var index = i * nPolygon;
                frag.push(index, index + 1, index + nPolygon);
                frag.push(index + 1, index + nPolygon + 1, index + nPolygon);
            }
            if (nPolygon > 2) {
                var index = i * nPolygon + maxJ;
                frag.push(index, index - maxJ, index + 1);
                frag.push(index + 1, index + maxJ + 1, index);
            }
        }
        mesh.setIndices(frag);
        this.meshRenderer.mesh = mesh;
    };
    TrailEffect.prototype.resetMesh = function () {
        var nPolygon = this.polygon.length;
        for (var i = 0; i <= this.level; ++i) {
            for (var j = 0; j < nPolygon; ++j) {
                this.verts[i * nPolygon + j].set(cc.v3(this.polygon[j].x, this.polygon[j].y, 0).addSelf(this.startPosition));
            }
        }
        this.endPosition.set(this.startPosition);
        // let gfx = cc.renderer.renderEngine.gfx;
        var gfx = cc.gfx;
        this.mesh.setVertices(gfx.ATTR_POSITION, this.verts);
    };
    /**更新网格形状 */
    TrailEffect.prototype.updateMesh = function () {
        var rate = this.soft == 0 ? 0.2 : (1 / this.soft);
        var nPolygon = this.polygon.length;
        for (var i = 1; i <= this.level; ++i) {
            var index = i * nPolygon;
            for (var j = 0; j < nPolygon; ++j) {
                var previousVert = this.verts[index - nPolygon + j];
                var nextVert = this.verts[index + j];
                this.interpolationPos(nextVert, previousVert, rate);
            }
        }
        // let gfx = cc.renderer.renderEngine.gfx;
        var gfx = cc.gfx;
        this.mesh.setVertices(gfx.ATTR_POSITION, this.verts);
    };
    TrailEffect.prototype.getInterpplation = function (a, b, r) {
        return (b - a) * r;
    };
    TrailEffect.prototype.interpolationPos = function (p1, p2, rate) {
        p1.x += this.getInterpplation(p1.x, p2.x, rate);
        p1.y += this.getInterpplation(p1.y, p2.y, rate);
        p1.z += this.getInterpplation(p1.z, p2.z, rate);
    };
    TrailEffect.prototype.init = function () {
        this.initPosition();
        this.initPolygon();
    };
    TrailEffect.prototype.reset = function () {
        this.resetMesh();
        this._playing = false;
    };
    Object.defineProperty(TrailEffect.prototype, "playing", {
        get: function () { return this._playing; },
        enumerable: true,
        configurable: true
    });
    TrailEffect.prototype.play = function (startPosition, angle) {
        if (this.polygon.length == 0) {
            cc.warn("拖尾特效未设置横截面形状！");
            return;
        }
        if (!this.target) {
            cc.warn("拖尾未设置跟随的目标节点！");
            return;
        }
        this._playing = true;
        this.startPosition.set(startPosition);
        this.resetMesh();
    };
    TrailEffect.prototype.stop = function () {
        this._playing = false;
    };
    /**设置拖尾的中心点的位置 */
    TrailEffect.prototype.moveTo = function (pos, angle) {
        this.startPosition = pos;
        if (undefined === angle) {
            // let len = pos.z - this.endPosition.z;
            for (var i = this.polygon.length - 1; i >= 0; --i) {
                this.verts[i].x = this.startPosition.x + this.polygon[i].x;
                this.verts[i].y = this.startPosition.y + this.polygon[i].y;
                this.verts[i].z = this.startPosition.z;
            }
        }
        else {
            for (var i = this.polygon.length - 1; i >= 0; --i) {
                var offset = cc.v3(this.polygon[i].x, this.polygon[i].y, 0);
                offset = this.rotatePos(offset, angle);
                this.verts[i].x = this.startPosition.x + offset.x;
                this.verts[i].y = this.startPosition.y + offset.y;
                this.verts[i].z = this.startPosition.z + offset.z;
            }
        }
        this.updateMesh();
    };
    TrailEffect.prototype.rotatePos = function (p, angle) {
        return p;
    };
    /**
     * 设置拖尾跟随的目标节点
     * @param target 目标节点，需要与本节点在同一父节点下，或者其所有父节点的坐标、角度为（0,0,0），缩放为（1,1,1）
     * @param offset 拖尾的中心点相对目标节点的坐标的偏移量
     */
    TrailEffect.prototype.setTarget = function (target, offset) {
        this.target = target;
        this.offset = offset.clone();
    };
    // //通用方法：
    // public update(dt: number) {
    //     if (!this.playing || !this.target) return;
    //     let pos = cc.v3();
    //     this.target.getPosition(pos);
    //     pos.addSelf(this.offset);
    //     if (!this.followAngle) {
    //         this.moveTo(pos);
    //     } else {
    //         this.moveTo(pos, this.target.eulerAngles);
    //     }
    // }
    //优化方法：
    TrailEffect.prototype.customUpdate = function (dt) {
        if (!this._playing) {
            this.moveTo(this.startPosition);
        }
        else {
            this.moveTo(cc.v3(0, this.target.y + 0.5, this.target.z));
        }
    };
    __decorate([
        property(cc.MeshRenderer)
    ], TrailEffect.prototype, "meshRenderer", void 0);
    __decorate([
        property(cc.Integer)
    ], TrailEffect.prototype, "level", void 0);
    __decorate([
        property(cc.Integer)
    ], TrailEffect.prototype, "soft", void 0);
    __decorate([
        property(cc.Boolean)
    ], TrailEffect.prototype, "followAngle", void 0);
    TrailEffect = __decorate([
        ccclass
    ], TrailEffect);
    return TrailEffect;
}(cc.Component));
exports.default = TrailEffect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEVmZmVjdFxcVHJhaWxFZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7O0FBRTVFLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFEckQ7UUFBQSxxRUF3T0M7UUFwT2Esa0JBQVksR0FBb0IsSUFBSSxDQUFDO1FBQ3JDLFVBQUksR0FBWSxJQUFJLENBQUM7UUFDL0IsaUJBQWlCO1FBRVAsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUdsQixVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGlCQUFpQjtRQUVQLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBRXZDLGFBQWE7UUFDSCxtQkFBYSxHQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMzQyxhQUFhO1FBQ0gsaUJBQVcsR0FBWSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFNekMsWUFBWTtRQUNGLFdBQUssR0FBYyxFQUFFLENBQUM7UUFnSXRCLGNBQVEsR0FBWSxLQUFLLENBQUM7O0lBOEV4QyxDQUFDO0lBcE5hLGtDQUFZLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQU1TLGlDQUFXLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNTLGtDQUFZLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELFdBQVc7SUFDSiw4QkFBUSxHQUFmLFVBQWdCLE9B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QUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQztJQW5PRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO3FEQUNxQjtJQUkvQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzhDQUNPO0lBRzVCO1FBRkMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7NkNBRU07SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztvREFDa0I7SUFidEIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXVPL0I7SUFBRCxrQkFBQztDQXZPRCxBQXVPQyxDQXZPd0MsRUFBRSxDQUFDLFNBQVMsR0F1T3BEO2tCQXZPb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhaWxFZmZlY3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5NZXNoUmVuZGVyZXIpXHJcbiAgICBwcm90ZWN0ZWQgbWVzaFJlbmRlcmVyOiBjYy5NZXNoUmVuZGVyZXIgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIG1lc2g6IGNjLk1lc2ggPSBudWxsO1xyXG4gICAgLyoqWui9tOaWueWQkeeahOabsumdoue7huWIhuetiee6pyAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcm90ZWN0ZWQgbGV2ZWw6IG51bWJlciA9IDU7XHJcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcclxuICAgIC8qKuaLluWwvueahOaflOi9r+W6pu+8jOWAvOi2iuWkp+WwvuW3tOi2iuaflOi9ryAqL1xyXG4gICAgcHJvdGVjdGVkIHNvZnQ6IG51bWJlciA9IDU7XHJcbiAgICAvKirmmK/lkKbot5/pmo/nm67moIfoioLngrnnmoTop5LluqYgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgcHJvdGVjdGVkIGZvbGxvd0FuZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoq5ouW5bC+5aS06YOo55qE5Z2Q5qCHICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnRQb3NpdGlvbjogY2MuVmVjMyA9IGNjLnYzKCk7XHJcbiAgICAvKirmi5blsL7lsL7pg6jnmoTlnZDmoIcgKi9cclxuICAgIHByb3RlY3RlZCBlbmRQb3NpdGlvbjogY2MuVmVjMyA9IGNjLnYzKCk7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFBvc2l0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IGNjLnYzKCk7XHJcbiAgICAgICAgdGhpcy5lbmRQb3NpdGlvbiA9IGNjLnYzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq572R5qC86aG254K55pWw5o2uICovXHJcbiAgICBwcm90ZWN0ZWQgdmVydHM6IGNjLlZlYzNbXSA9IFtdO1xyXG4gICAgLyoq5ouW5bC+5qiq5oiq6Z2i55qE6aG254K55Z2Q5qCHeOOAgXnvvIzmjInpgIbml7bpkojmjpLliJcgKi9cclxuICAgIHByb3RlY3RlZCBwb2x5Z29uOiBjYy5WZWMyW107XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFBvbHlnb24oKSB7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uID0gW107XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRQb2x5Z29uKCkge1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IFtdO1xyXG4gICAgfVxyXG4gICAgLyoq6K6+572u5qiq5oiq6Z2iICovXHJcbiAgICBwdWJsaWMgc2V0U2hhcGUocG9seWdvbjogY2MuVmVjMltdKSB7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uID0gW10uY29uY2F0KHBvbHlnb24pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmVydHMoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1lc2goKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaIqumdouW9oueKtuWSjOaLluWwvuS9jee9ruWIm+W7uue9keagvOmhtueCuSAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVZlcnRzKCkge1xyXG4gICAgICAgIC8v6aG254K555qEWui9tOWBj+enu+S4ujBcclxuICAgICAgICB0aGlzLnZlcnRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5sZXZlbDsgKytpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBjID0gdGhpcy5wb2x5Z29uLmxlbmd0aDsgaiA8IGM7ICsraikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0cy5wdXNoKGNjLnYzKHRoaXMucG9seWdvbltqXS54LCB0aGlzLnBvbHlnb25bal0ueSwgMCkuYWRkU2VsZih0aGlzLnN0YXJ0UG9zaXRpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirliJvlu7rnvZHmoLzmlbDmja4gKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVNZXNoKCkge1xyXG4gICAgICAgIC8vIGxldCBnZnggPSBjYy5yZW5kZXJlci5yZW5kZXJFbmdpbmUuZ2Z4O1xyXG4gICAgICAgIGxldCBnZnggPSBjYy5nZng7XHJcbiAgICAgICAgLy8g5a6a5LmJ6aG254K55pWw5o2u5qC85byP77yM5Y+q6ZyA6KaB5oyH5piO5omA6ZyA55qE5bGe5oCn77yM6YG/5YWN6YCg5oiQ5a2Y5YKo56m66Ze055qE5rWq6LS5XHJcbiAgICAgICAgdmFyIHZmbXRQb3NDb2xvciA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KFtcclxuICAgICAgICAgICAgLy8g55So5oi36ZyA6KaB5Yib5bu65LiA5Liq5LiJ57u055qE55uS5a2Q77yM5omA5Lul6ZyA6KaB5LiJ5Liq5YC85p2l5L+d5a2Y5L2N572u5L+h5oGvXHJcbiAgICAgICAgICAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogZ2Z4LkFUVFJfVVYwLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMiB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IGdmeC5BVFRSX0NPTE9SLCB0eXBlOiBnZnguQVRUUl9UWVBFX1VJTlQ4LCBudW06IDQsIG5vcm1hbGl6ZTogdHJ1ZSB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHRoaXMubWVzaCA9IG5ldyBjYy5NZXNoKCk7XHJcbiAgICAgICAgbGV0IG1lc2ggPSB0aGlzLm1lc2g7XHJcblxyXG4gICAgICAgIC8vIOWIneWni+WMlue9keagvOS/oeaBr1xyXG4gICAgICAgIG1lc2guaW5pdCh2Zm10UG9zQ29sb3IsIHRoaXMudmVydHMubGVuZ3RoLCB0cnVlKTtcclxuICAgICAgICAvLyDkv67mlLkgcG9zaXRpb24g6aG254K55pWw5o2uXHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlcyhnZnguQVRUUl9QT1NJVElPTiwgdGhpcy52ZXJ0cyk7XHJcbiAgICAgICAgLy8g5L+u5pS5IGNvbG9yIOmhtueCueaVsOaNrlxyXG4gICAgICAgIGxldCBjb2xvcnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRoaXMudmVydHMubGVuZ3RoOyBpIDwgYzsgKytpKSB7XHJcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKGNjLkNvbG9yLldISVRFKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlcyhnZnguQVRUUl9DT0xPUiwgY29sb3JzKTtcclxuICAgICAgICAvLyDkv67mlLkgdXYg6aG254K55pWw5o2uXHJcbiAgICAgICAgLy90b2RvOumcgOimgeS/ruaUuVxyXG4gICAgICAgIGxldCB1djogY2MuVmVjMltdID0gW107XHJcbiAgICAgICAgbGV0IG5Qb2x5Z29uID0gdGhpcy5wb2x5Z29uLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmxldmVsOyArK2kpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBuUG9seWdvbjsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICB1di5wdXNoKGNjLnYyKDEgLSBpIC8gdGhpcy5sZXZlbCwgaiAvIG5Qb2x5Z29uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlcyhnZnguQVRUUl9VVjAsIHV2KTtcclxuXHJcbiAgICAgICAgLy8g5L+u5pS557Si5byV5pWw5o2uXHJcbiAgICAgICAgbGV0IGZyYWc6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IG1heEogPSBuUG9seWdvbiAtIDE7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF4SjsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBpICogblBvbHlnb247XHJcbiAgICAgICAgICAgICAgICBmcmFnLnB1c2goaW5kZXgsIGluZGV4ICsgMSwgaW5kZXggKyBuUG9seWdvbik7XHJcbiAgICAgICAgICAgICAgICBmcmFnLnB1c2goaW5kZXggKyAxLCBpbmRleCArIG5Qb2x5Z29uICsgMSwgaW5kZXggKyBuUG9seWdvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5Qb2x5Z29uID4gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaSAqIG5Qb2x5Z29uICsgbWF4SjtcclxuICAgICAgICAgICAgICAgIGZyYWcucHVzaChpbmRleCwgaW5kZXggLSBtYXhKLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgZnJhZy5wdXNoKGluZGV4ICsgMSwgaW5kZXggKyBtYXhKICsgMSwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc2guc2V0SW5kaWNlcyhmcmFnKTtcclxuICAgICAgICB0aGlzLm1lc2hSZW5kZXJlci5tZXNoID0gbWVzaDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZXNldE1lc2goKSB7XHJcbiAgICAgICAgbGV0IG5Qb2x5Z29uID0gdGhpcy5wb2x5Z29uLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmxldmVsOyArK2kpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBuUG9seWdvbjsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRzW2kgKiBuUG9seWdvbiArIGpdLnNldChjYy52Myh0aGlzLnBvbHlnb25bal0ueCwgdGhpcy5wb2x5Z29uW2pdLnksIDApLmFkZFNlbGYodGhpcy5zdGFydFBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmRQb3NpdGlvbi5zZXQodGhpcy5zdGFydFBvc2l0aW9uKTtcclxuICAgICAgICAvLyBsZXQgZ2Z4ID0gY2MucmVuZGVyZXIucmVuZGVyRW5naW5lLmdmeDtcclxuICAgICAgICBsZXQgZ2Z4ID0gY2MuZ2Z4O1xyXG4gICAgICAgIHRoaXMubWVzaC5zZXRWZXJ0aWNlcyhnZnguQVRUUl9QT1NJVElPTiwgdGhpcy52ZXJ0cyk7XHJcbiAgICB9XHJcbiAgICAvKirmm7TmlrDnvZHmoLzlvaLnirYgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVNZXNoKCkge1xyXG4gICAgICAgIGxldCByYXRlID0gdGhpcy5zb2Z0ID09IDAgPyAwLjIgOiAoMSAvIHRoaXMuc29mdCk7XHJcbiAgICAgICAgbGV0IG5Qb2x5Z29uID0gdGhpcy5wb2x5Z29uLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLmxldmVsOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gaSAqIG5Qb2x5Z29uO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5Qb2x5Z29uOyArK2opIHtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91c1ZlcnQgPSB0aGlzLnZlcnRzW2luZGV4IC0gblBvbHlnb24gKyBqXTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0VmVydCA9IHRoaXMudmVydHNbaW5kZXggKyBqXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhdGlvblBvcyhuZXh0VmVydCwgcHJldmlvdXNWZXJ0LCByYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbGV0IGdmeCA9IGNjLnJlbmRlcmVyLnJlbmRlckVuZ2luZS5nZng7XHJcbiAgICAgICAgbGV0IGdmeCA9IGNjLmdmeDtcclxuICAgICAgICB0aGlzLm1lc2guc2V0VmVydGljZXMoZ2Z4LkFUVFJfUE9TSVRJT04sIHRoaXMudmVydHMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEludGVycHBsYXRpb24oYTogbnVtYmVyLCBiOiBudW1iZXIsIHI6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiAoYiAtIGEpICogcjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBpbnRlcnBvbGF0aW9uUG9zKHAxOiBjYy5WZWMzLCBwMjogY2MuVmVjMywgcmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgcDEueCArPSB0aGlzLmdldEludGVycHBsYXRpb24ocDEueCwgcDIueCwgcmF0ZSk7XHJcbiAgICAgICAgcDEueSArPSB0aGlzLmdldEludGVycHBsYXRpb24ocDEueSwgcDIueSwgcmF0ZSk7XHJcbiAgICAgICAgcDEueiArPSB0aGlzLmdldEludGVycHBsYXRpb24ocDEueiwgcDIueiwgcmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLmluaXRQb2x5Z29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMucmVzZXRNZXNoKCk7XHJcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBnZXQgcGxheWluZygpIHsgcmV0dXJuIHRoaXMuX3BsYXlpbmc7IH1cclxuICAgIHB1YmxpYyBwbGF5KHN0YXJ0UG9zaXRpb246IGNjLlZlYzMsIGFuZ2xlPzogY2MuVmVjMykge1xyXG4gICAgICAgIGlmICh0aGlzLnBvbHlnb24ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgY2Mud2FybihcIuaLluWwvueJueaViOacquiuvue9ruaoquaIqumdouW9oueKtu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCLmi5blsL7mnKrorr7nva7ot5/pmo/nmoTnm67moIfoioLngrnvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uLnNldChzdGFydFBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnJlc2V0TWVzaCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaLluWwvueahOS4reW/g+eCueeahOS9jee9riAqL1xyXG4gICAgcHVibGljIG1vdmVUbyhwb3M6IGNjLlZlYzMsIGFuZ2xlPzogY2MuVmVjMykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHBvcztcclxuICAgICAgICBpZiAodW5kZWZpbmVkID09PSBhbmdsZSkge1xyXG4gICAgICAgICAgICAvLyBsZXQgbGVuID0gcG9zLnogLSB0aGlzLmVuZFBvc2l0aW9uLno7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnBvbHlnb24ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVydHNbaV0ueCA9IHRoaXMuc3RhcnRQb3NpdGlvbi54ICsgdGhpcy5wb2x5Z29uW2ldLng7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRzW2ldLnkgPSB0aGlzLnN0YXJ0UG9zaXRpb24ueSArIHRoaXMucG9seWdvbltpXS55O1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0c1tpXS56ID0gdGhpcy5zdGFydFBvc2l0aW9uLno7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5wb2x5Z29uLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gY2MudjModGhpcy5wb2x5Z29uW2ldLngsIHRoaXMucG9seWdvbltpXS55LCAwKTtcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHRoaXMucm90YXRlUG9zKG9mZnNldCwgYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0c1tpXS54ID0gdGhpcy5zdGFydFBvc2l0aW9uLnggKyBvZmZzZXQueDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVydHNbaV0ueSA9IHRoaXMuc3RhcnRQb3NpdGlvbi55ICsgb2Zmc2V0Lnk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRzW2ldLnogPSB0aGlzLnN0YXJ0UG9zaXRpb24ueiArIG9mZnNldC56O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzaCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJvdGF0ZVBvcyhwOiBjYy5WZWMzLCBhbmdsZTogY2MuVmVjMyk6IGNjLlZlYzMge1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKui3n+maj+eahOebruagh+iKgueCuSAqL1xyXG4gICAgcHJvdGVjdGVkIHRhcmdldDogY2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCBvZmZzZXQ6IGNjLlZlYzM7XHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaLluWwvui3n+maj+eahOebruagh+iKgueCuVxyXG4gICAgICogQHBhcmFtIHRhcmdldCDnm67moIfoioLngrnvvIzpnIDopoHkuI7mnKzoioLngrnlnKjlkIzkuIDniLboioLngrnkuIvvvIzmiJbogIXlhbbmiYDmnInniLboioLngrnnmoTlnZDmoIfjgIHop5LluqbkuLrvvIgwLDAsMO+8ie+8jOe8qeaUvuS4uu+8iDEsMSwx77yJXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IOaLluWwvueahOS4reW/g+eCueebuOWvueebruagh+iKgueCueeahOWdkOagh+eahOWBj+enu+mHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KHRhcmdldDogY2MuTm9kZSwgb2Zmc2V0OiBjYy5WZWMzKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQuY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvL+mAmueUqOaWueazle+8mlxyXG4gICAgLy8gcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAvLyAgICAgaWYgKCF0aGlzLnBsYXlpbmcgfHwgIXRoaXMudGFyZ2V0KSByZXR1cm47XHJcbiAgICAvLyAgICAgbGV0IHBvcyA9IGNjLnYzKCk7XHJcbiAgICAvLyAgICAgdGhpcy50YXJnZXQuZ2V0UG9zaXRpb24ocG9zKTtcclxuICAgIC8vICAgICBwb3MuYWRkU2VsZih0aGlzLm9mZnNldCk7XHJcbiAgICAvLyAgICAgaWYgKCF0aGlzLmZvbGxvd0FuZ2xlKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubW92ZVRvKHBvcyk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5tb3ZlVG8ocG9zLCB0aGlzLnRhcmdldC5ldWxlckFuZ2xlcyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8v5LyY5YyW5pa55rOV77yaXHJcbiAgICBwdWJsaWMgY3VzdG9tVXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BsYXlpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlVG8odGhpcy5zdGFydFBvc2l0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVUbyhjYy52MygwLCB0aGlzLnRhcmdldC55ICsgMC41LCB0aGlzLnRhcmdldC56KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==