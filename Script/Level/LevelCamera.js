
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Level/LevelCamera.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b39ea5oJL5MwaPdQFMH84W4', 'LevelCamera');
// myGame/Script/Level/LevelCamera.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var Action3dManager_1 = require("../Common/Action3dManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**关卡中使用的3D相机 */
var LevelCamera = /** @class */ (function (_super) {
    __extends(LevelCamera, _super);
    function LevelCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**相机组件 */
        _this.camera = null;
        /**相机组件节点 */
        _this.cameraNode = null;
        /**相机朝向的节点 */
        _this.anchorNode = null;
        return _this;
    }
    LevelCamera.prototype.init = function () {
        this.anchorNode = this.node;
        this.camera = this.node.getComponentInChildren(cc.Camera);
        this.cameraNode = this.camera.node;
        this.customStep = this.stepSlowFollow;
    };
    LevelCamera.prototype.reset = function () {
        this.followTarget = null;
    };
    LevelCamera.prototype.setTarget = function (followTarget) {
        this.followTarget = followTarget;
        var pos = cc.v3();
        this.followTarget.getPosition(pos);
        this.anchorNode.setPosition(pos);
    };
    LevelCamera.prototype.stepSlowFollow = function (dt) {
        if (!this.followTarget)
            return;
        //无缓动跟随：
        // this.anchorNode.setPosition(this.followTarget.x, this.followTarget.y, this.followTarget.z);
        this.anchorNode.setPosition(0, 0, this.followTarget.z);
        // let pos = cc.v3();
        // this.followTarget.getPosition(pos);
        // this.convertWorldToScreen(pos);
        //缓动跟随：
        // let p1 = cc.v3();
        // this.followTarget.getPosition(p1);
        // let p2 = cc.v3();
        // this.anchorNode.getPosition(p2);
        // let offset = p1.subtract(p2);
        // // offset.multiplyScalar(dt);//todo:是否缓动跟随
        // this.anchorNode.setPosition(p2.addSelf(offset));
    };
    /**移动到指定位置 */
    LevelCamera.prototype.moveTo = function (duration, pos, cb) {
        var action = Action3dManager_1.default.moveTo(duration, pos);
        action.easing(Action3dManager_1.default.easeOut(3));
        if (!!cb) {
            var callFun = Action3dManager_1.default.callFun(cb);
            Action3dManager_1.default.runAction(this.node, Action3dManager_1.default.sequence(action, callFun));
        }
        else {
            Action3dManager_1.default.runAction(this.node, action);
        }
    };
    /**世界坐标转屏幕坐标 */
    LevelCamera.prototype.convertWorldToScreen = function (pos) {
        var p = this.convertWorldToCanvas(pos);
        var cvs = cc.find("Canvas");
        p.x + cvs.width * 0.5;
        p.y += cvs.height * 0.5;
        return p;
    };
    /**世界坐标转换到Canvas节点坐标 */
    LevelCamera.prototype.convertWorldToCanvas = function (pos) {
        var p = this.convertWorldToCamera(pos);
        var angle = this.camera.fov;
        var z = p.z;
        var tan = Math.tan(angle * 0.5 * 0.017453);
        var h = Math.abs(z * tan);
        var x = p.x / h;
        var y = p.y / h;
        var cvs = cc.find("Canvas");
        y = cvs.height * 0.5 * y;
        x = cvs.height * 0.5 * x;
        return cc.v2(x, y);
    };
    /**世界坐标转换到相机坐标系 */
    LevelCamera.prototype.convertWorldToCamera = function (pos) {
        var center = this.getCameraPos();
        var eulerAngler = this.getCameraEulerAngles();
        var angle = eulerAngler.y;
        var p1 = cc.v2(pos.x - center.x, pos.z - center.z);
        p1 = this.rotatePos(p1, angle);
        angle = eulerAngler.x;
        var p2 = cc.v2(p1.y, pos.y - center.y);
        p2 = this.rotatePos(p2, angle);
        // return cc.v3(p1.x + center.x, p2.x + center.y, p2.y + center.z);
        return cc.v3(p1.x, p2.y, p2.x);
    };
    /**相机的世界坐标 */
    LevelCamera.prototype.getCameraPos = function () {
        var angle = this.node.eulerAngles.y;
        var p = this.rotatePos(cc.v2(this.cameraNode.x, this.cameraNode.z), -angle);
        return cc.v3(p.x + this.node.x, this.cameraNode.y + this.node.y, p.y + this.node.z);
    };
    /**相机在世界坐标系下的旋转角度 */
    LevelCamera.prototype.getCameraEulerAngles = function () {
        return cc.v3(this.cameraNode.eulerAngles.x, this.node.eulerAngles.y, 0);
    };
    /**
     * 旋转坐标点
     * @param p 坐标点
     * @param angle 旋转角度，负数表示顺时针旋转，正数表示逆时针旋转
     */
    LevelCamera.prototype.rotatePos = function (p, angle) {
        var radian = angle * 0.017453;
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        var x = p.x * cos - p.y * sin;
        var y = p.x * sin + p.y * cos;
        return cc.v2(x, y);
    };
    /**
     * 将节点坐标系下的坐标点转换为其父节点坐标系下的坐标
     * @param node 节点
     * @param pos 坐标点
     */
    LevelCamera.prototype.convertToParent = function (node, pos) {
        var p = cc.v3(pos.x * node.scaleX, pos.y * node.scaleY, pos.z * node.scaleZ);
        var p1 = cc.v2(p.x, p.z);
        p1 = this.rotatePos(p1, node.eulerAngles.y);
        var p2 = cc.v2(p1.y, p.y);
        p2 = this.rotatePos(p2, node.eulerAngles.x);
        p.x = p1.x + node.x;
        p.y = p2.y + node.y;
        p.z = p2.x + node.z;
        return p;
    };
    /**
     * 将子节点坐标系下的坐标点转换到根节点坐标系
     * @param root 根节点
     * @param node 子节点
     * @param pos 要转换的坐标点
     */
    LevelCamera.prototype.convertToNodePos = function (root, node, pos) {
        var p = cc.v3();
        p.set(pos);
        while (!!node && node.is3DNode && node != root) {
            p = this.convertToParent(node, p);
            node = node.parent;
        }
        return p;
    };
    __decorate([
        property(cc.Camera)
    ], LevelCamera.prototype, "camera", void 0);
    __decorate([
        property(cc.Node)
    ], LevelCamera.prototype, "cameraNode", void 0);
    __decorate([
        property(cc.Node)
    ], LevelCamera.prototype, "anchorNode", void 0);
    LevelCamera = __decorate([
        ccclass
    ], LevelCamera);
    return LevelCamera;
}(yyComponent_1.default));
exports.default = LevelCamera;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXExldmVsXFxMZXZlbENhbWVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDZEQUF3RDtBQUVsRCxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBQzVDLGdCQUFnQjtBQUVoQjtJQUF5QywrQkFBVztJQURwRDtRQUFBLHFFQWdLQztRQTdKRyxVQUFVO1FBRUgsWUFBTSxHQUFjLElBQUksQ0FBQztRQUNoQyxZQUFZO1FBRUYsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDckMsYUFBYTtRQUVILGdCQUFVLEdBQVksSUFBSSxDQUFDOztJQXFKekMsQ0FBQztJQWhKVSwwQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztJQUVNLDJCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBQ00sK0JBQVMsR0FBaEIsVUFBaUIsWUFBcUI7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7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R0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0QjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQXpKRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ21CO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ21CO0lBVnBCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0ErSi9CO0lBQUQsa0JBQUM7Q0EvSkQsQUErSkMsQ0EvSndDLHFCQUFXLEdBK0puRDtrQkEvSm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeXlDb21wb25lbnQgZnJvbSBcIi4uL0NvbW1vbi95eUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgQWN0aW9uM2RNYW5hZ2VyIGZyb20gXCIuLi9Db21tb24vQWN0aW9uM2RNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vKirlhbPljaHkuK3kvb/nlKjnmoQzROebuOacuiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbENhbWVyYSBleHRlbmRzIHl5Q29tcG9uZW50IHtcclxuXHJcbiAgICAvKirnm7jmnLrnu4Tku7YgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5DYW1lcmEpXHJcbiAgICBwdWJsaWMgY2FtZXJhOiBjYy5DYW1lcmEgPSBudWxsO1xyXG4gICAgLyoq55u45py657uE5Lu26IqC54K5ICovXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByb3RlY3RlZCBjYW1lcmFOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKuebuOacuuacneWQkeeahOiKgueCuSAqL1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm90ZWN0ZWQgYW5jaG9yTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLyoq6Lef6ZqP55qE55uu5qCH6IqC54K5ICovXHJcbiAgICBwcm90ZWN0ZWQgZm9sbG93VGFyZ2V0OiBjYy5Ob2RlO1xyXG5cclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuYW5jaG9yTm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFOb2RlID0gdGhpcy5jYW1lcmEubm9kZTtcclxuICAgICAgICB0aGlzLmN1c3RvbVN0ZXAgPSB0aGlzLnN0ZXBTbG93Rm9sbG93O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd1RhcmdldCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KGZvbGxvd1RhcmdldDogY2MuTm9kZSkge1xyXG4gICAgICAgIHRoaXMuZm9sbG93VGFyZ2V0ID0gZm9sbG93VGFyZ2V0O1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52MygpO1xyXG4gICAgICAgIHRoaXMuZm9sbG93VGFyZ2V0LmdldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgdGhpcy5hbmNob3JOb2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0ZXBTbG93Rm9sbG93KGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZm9sbG93VGFyZ2V0KSByZXR1cm47XHJcblxyXG4gICAgICAgIC8v5peg57yT5Yqo6Lef6ZqP77yaXHJcbiAgICAgICAgLy8gdGhpcy5hbmNob3JOb2RlLnNldFBvc2l0aW9uKHRoaXMuZm9sbG93VGFyZ2V0LngsIHRoaXMuZm9sbG93VGFyZ2V0LnksIHRoaXMuZm9sbG93VGFyZ2V0LnopO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yTm9kZS5zZXRQb3NpdGlvbigwLCAwLCB0aGlzLmZvbGxvd1RhcmdldC56KTtcclxuXHJcbiAgICAgICAgLy8gbGV0IHBvcyA9IGNjLnYzKCk7XHJcbiAgICAgICAgLy8gdGhpcy5mb2xsb3dUYXJnZXQuZ2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAvLyB0aGlzLmNvbnZlcnRXb3JsZFRvU2NyZWVuKHBvcyk7XHJcblxyXG4gICAgICAgIC8v57yT5Yqo6Lef6ZqP77yaXHJcbiAgICAgICAgLy8gbGV0IHAxID0gY2MudjMoKTtcclxuICAgICAgICAvLyB0aGlzLmZvbGxvd1RhcmdldC5nZXRQb3NpdGlvbihwMSk7XHJcbiAgICAgICAgLy8gbGV0IHAyID0gY2MudjMoKTtcclxuICAgICAgICAvLyB0aGlzLmFuY2hvck5vZGUuZ2V0UG9zaXRpb24ocDIpO1xyXG4gICAgICAgIC8vIGxldCBvZmZzZXQgPSBwMS5zdWJ0cmFjdChwMik7XHJcbiAgICAgICAgLy8gLy8gb2Zmc2V0Lm11bHRpcGx5U2NhbGFyKGR0KTsvL3RvZG865piv5ZCm57yT5Yqo6Lef6ZqPXHJcbiAgICAgICAgLy8gdGhpcy5hbmNob3JOb2RlLnNldFBvc2l0aW9uKHAyLmFkZFNlbGYob2Zmc2V0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq56e75Yqo5Yiw5oyH5a6a5L2N572uICovXHJcbiAgICBwdWJsaWMgbW92ZVRvKGR1cmF0aW9uOiBudW1iZXIsIHBvczogY2MuVmVjMywgY2I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBBY3Rpb24zZE1hbmFnZXIubW92ZVRvKGR1cmF0aW9uLCBwb3MpO1xyXG4gICAgICAgIGFjdGlvbi5lYXNpbmcoQWN0aW9uM2RNYW5hZ2VyLmVhc2VPdXQoMykpO1xyXG4gICAgICAgIGlmICghIWNiKSB7XHJcbiAgICAgICAgICAgIGxldCBjYWxsRnVuID0gQWN0aW9uM2RNYW5hZ2VyLmNhbGxGdW4oY2IpO1xyXG4gICAgICAgICAgICBBY3Rpb24zZE1hbmFnZXIucnVuQWN0aW9uKHRoaXMubm9kZSwgQWN0aW9uM2RNYW5hZ2VyLnNlcXVlbmNlKGFjdGlvbiwgY2FsbEZ1bikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFjdGlvbjNkTWFuYWdlci5ydW5BY3Rpb24odGhpcy5ub2RlLCBhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirkuJbnlYzlnZDmoIfovazlsY/luZXlnZDmoIcgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0V29ybGRUb1NjcmVlbihwb3M6IGNjLlZlYzMpIHtcclxuICAgICAgICBsZXQgcCA9IHRoaXMuY29udmVydFdvcmxkVG9DYW52YXMocG9zKTtcclxuICAgICAgICBsZXQgY3ZzID0gY2MuZmluZChcIkNhbnZhc1wiKTtcclxuICAgICAgICBwLnggKyBjdnMud2lkdGggKiAwLjU7XHJcbiAgICAgICAgcC55ICs9IGN2cy5oZWlnaHQgKiAwLjU7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcbiAgICAvKirkuJbnlYzlnZDmoIfovazmjaLliLBDYW52YXPoioLngrnlnZDmoIcgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0V29ybGRUb0NhbnZhcyhwb3M6IGNjLlZlYzMpIHtcclxuICAgICAgICBsZXQgcCA9IHRoaXMuY29udmVydFdvcmxkVG9DYW1lcmEocG9zKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmNhbWVyYS5mb3Y7XHJcbiAgICAgICAgbGV0IHogPSBwLno7XHJcbiAgICAgICAgbGV0IHRhbiA9IE1hdGgudGFuKGFuZ2xlICogMC41ICogMC4wMTc0NTMpO1xyXG4gICAgICAgIGxldCBoID0gTWF0aC5hYnMoeiAqIHRhbik7XHJcbiAgICAgICAgbGV0IHggPSBwLnggLyBoO1xyXG4gICAgICAgIGxldCB5ID0gcC55IC8gaDtcclxuICAgICAgICBsZXQgY3ZzID0gY2MuZmluZChcIkNhbnZhc1wiKTtcclxuICAgICAgICB5ID0gY3ZzLmhlaWdodCAqIDAuNSAqIHk7XHJcbiAgICAgICAgeCA9IGN2cy5oZWlnaHQgKiAwLjUgKiB4O1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4LCB5KTtcclxuICAgIH1cclxuICAgIC8qKuS4lueVjOWdkOagh+i9rOaNouWIsOebuOacuuWdkOagh+ezuyAqL1xyXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRXb3JsZFRvQ2FtZXJhKHBvczogY2MuVmVjMykge1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLmdldENhbWVyYVBvcygpO1xyXG4gICAgICAgIGxldCBldWxlckFuZ2xlciA9IHRoaXMuZ2V0Q2FtZXJhRXVsZXJBbmdsZXMoKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSBldWxlckFuZ2xlci55O1xyXG4gICAgICAgIGxldCBwMSA9IGNjLnYyKHBvcy54IC0gY2VudGVyLngsIHBvcy56IC0gY2VudGVyLnopO1xyXG4gICAgICAgIHAxID0gdGhpcy5yb3RhdGVQb3MocDEsIGFuZ2xlKTtcclxuXHJcbiAgICAgICAgYW5nbGUgPSBldWxlckFuZ2xlci54O1xyXG4gICAgICAgIGxldCBwMiA9IGNjLnYyKHAxLnksIHBvcy55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIHAyID0gdGhpcy5yb3RhdGVQb3MocDIsIGFuZ2xlKTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIGNjLnYzKHAxLnggKyBjZW50ZXIueCwgcDIueCArIGNlbnRlci55LCBwMi55ICsgY2VudGVyLnopO1xyXG4gICAgICAgIHJldHVybiBjYy52MyhwMS54LCBwMi55LCBwMi54KTtcclxuICAgIH1cclxuICAgIC8qKuebuOacuueahOS4lueVjOWdkOaghyAqL1xyXG4gICAgcHJvdGVjdGVkIGdldENhbWVyYVBvcygpIHtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLm5vZGUuZXVsZXJBbmdsZXMueTtcclxuICAgICAgICBsZXQgcCA9IHRoaXMucm90YXRlUG9zKGNjLnYyKHRoaXMuY2FtZXJhTm9kZS54LCB0aGlzLmNhbWVyYU5vZGUueiksIC1hbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYzKHAueCArIHRoaXMubm9kZS54LCB0aGlzLmNhbWVyYU5vZGUueSArIHRoaXMubm9kZS55LCBwLnkgKyB0aGlzLm5vZGUueik7XHJcbiAgICB9XHJcbiAgICAvKirnm7jmnLrlnKjkuJbnlYzlnZDmoIfns7vkuIvnmoTml4vovazop5LluqYgKi9cclxuICAgIHByb3RlY3RlZCBnZXRDYW1lcmFFdWxlckFuZ2xlcygpIHtcclxuICAgICAgICByZXR1cm4gY2MudjModGhpcy5jYW1lcmFOb2RlLmV1bGVyQW5nbGVzLngsIHRoaXMubm9kZS5ldWxlckFuZ2xlcy55LCAwKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5peL6L2s5Z2Q5qCH54K5XHJcbiAgICAgKiBAcGFyYW0gcCDlnZDmoIfngrlcclxuICAgICAqIEBwYXJhbSBhbmdsZSDml4vovazop5LluqbvvIzotJ/mlbDooajnpLrpobrml7bpkojml4vovazvvIzmraPmlbDooajnpLrpgIbml7bpkojml4vovaxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHJvdGF0ZVBvcyhwOiBjYy5WZWMyLCBhbmdsZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IGFuZ2xlICogMC4wMTc0NTM7XHJcbiAgICAgICAgbGV0IHNpbiA9IE1hdGguc2luKHJhZGlhbik7XHJcbiAgICAgICAgbGV0IGNvcyA9IE1hdGguY29zKHJhZGlhbik7XHJcbiAgICAgICAgbGV0IHggPSBwLnggKiBjb3MgLSBwLnkgKiBzaW47XHJcbiAgICAgICAgbGV0IHkgPSBwLnggKiBzaW4gKyBwLnkgKiBjb3M7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG6IqC54K55Z2Q5qCH57O75LiL55qE5Z2Q5qCH54K56L2s5o2i5Li65YW254i26IqC54K55Z2Q5qCH57O75LiL55qE5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0VG9QYXJlbnQobm9kZTogY2MuTm9kZSwgcG9zOiBjYy5WZWMzKSB7XHJcbiAgICAgICAgbGV0IHAgPSBjYy52Myhwb3MueCAqIG5vZGUuc2NhbGVYLCBwb3MueSAqIG5vZGUuc2NhbGVZLCBwb3MueiAqIG5vZGUuc2NhbGVaKTtcclxuICAgICAgICBsZXQgcDEgPSBjYy52MihwLngsIHAueik7XHJcbiAgICAgICAgcDEgPSB0aGlzLnJvdGF0ZVBvcyhwMSwgbm9kZS5ldWxlckFuZ2xlcy55KTtcclxuICAgICAgICBsZXQgcDIgPSBjYy52MihwMS55LCBwLnkpO1xyXG4gICAgICAgIHAyID0gdGhpcy5yb3RhdGVQb3MocDIsIG5vZGUuZXVsZXJBbmdsZXMueCk7XHJcbiAgICAgICAgcC54ID0gcDEueCArIG5vZGUueDtcclxuICAgICAgICBwLnkgPSBwMi55ICsgbm9kZS55O1xyXG4gICAgICAgIHAueiA9IHAyLnggKyBub2RlLno7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIblrZDoioLngrnlnZDmoIfns7vkuIvnmoTlnZDmoIfngrnovazmjaLliLDmoLnoioLngrnlnZDmoIfns7tcclxuICAgICAqIEBwYXJhbSByb290IOagueiKgueCuVxyXG4gICAgICogQHBhcmFtIG5vZGUg5a2Q6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gcG9zIOimgei9rOaNoueahOWdkOagh+eCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udmVydFRvTm9kZVBvcyhyb290OiBjYy5Ob2RlLCBub2RlOiBjYy5Ob2RlLCBwb3M6IGNjLlZlYzMpIHtcclxuICAgICAgICBsZXQgcCA9IGNjLnYzKCk7XHJcbiAgICAgICAgcC5zZXQocG9zKTtcclxuICAgICAgICB3aGlsZSAoISFub2RlICYmIG5vZGUuaXMzRE5vZGUgJiYgbm9kZSAhPSByb290KSB7XHJcbiAgICAgICAgICAgIHAgPSB0aGlzLmNvbnZlcnRUb1BhcmVudChub2RlLCBwKTtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19