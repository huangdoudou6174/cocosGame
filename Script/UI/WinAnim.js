
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/WinAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58395+tbT9DEJ/2fDtTx4pV', 'WinAnim');
// myGame/Script/UI/WinAnim.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WinAnim = /** @class */ (function (_super) {
    __extends(WinAnim, _super);
    function WinAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefabs = [];
        _this.minScale = 0.5;
        _this.maxScale = 2;
        _this.minAngle = 0;
        _this.maxAngle = 180;
        _this.minSkew = 0;
        _this.maxSkew = 5;
        _this.duration = 1;
        _this.minSpd = 1500;
        _this.maxSpd = 2500;
        _this.gravity = -3000;
        _this.count = 100;
        _this.particles = [];
        _this.index = 0;
        return _this;
    }
    WinAnim.prototype.addItem = function () {
        this.index++;
        if (this.index >= this.prefabs.length) {
            this.index = 0;
        }
        var node = cc.instantiate(this.prefabs[this.index]);
        var scale = this.randomScope(this.minScale, this.maxScale);
        var angle = this.randomScope(this.minAngle, this.maxAngle);
        var skew = this.randomScope(this.minSkew, this.maxSkew);
        node.setScale(scale);
        node.angle = angle;
        node.skewX = skew;
        node.skewY = this.randomScope(this.minSkew, this.maxSkew);
        var duration = this.duration;
        node.runAction(cc.spawn(cc.scaleTo(duration, this.randomScope(this.minScale, this.maxScale), this.randomScope(this.minScale, this.maxScale)), cc.rotateTo(duration, this.randomScope(this.minAngle, this.maxAngle)), cc.skewTo(duration, this.randomScope(this.minSkew, this.maxSkew), this.randomScope(this.minSkew, this.maxSkew))));
        var v = cc.v2();
        var spd = this.minSpd + Math.random() * (this.maxSpd - this.minSpd);
        var radian = (Math.random() * 0.5 + 0.25) * 3.14;
        v.x = spd * Math.cos(radian);
        v.y = spd * Math.sin(radian);
        this.particles.push(new Particle(node, v, this.gravity));
        node.setPosition(0, 0);
        this.node.addChild(node);
    };
    WinAnim.prototype.randomScope = function (min, max) {
        return min + Math.random() * (max - min);
    };
    WinAnim.prototype.play = function () {
        for (var i = 0; i < this.count; ++i) {
            this.addItem();
        }
        this.schedule(this.step.bind(this), 0.016);
    };
    WinAnim.prototype.step = function (dt) {
        if (dt === void 0) { dt = 0.016; }
        for (var i = this.particles.length - 1; i >= 0; --i) {
            this.particles[i].update(dt);
            if (this.particles[i].finished) {
                this.particles[i].node.destroy();
                this.particles.splice(i, 1);
            }
        }
        if (this.particles.length == 0) {
            this.onFinish();
        }
    };
    WinAnim.prototype.onFinish = function () {
        this.unscheduleAllCallbacks();
    };
    __decorate([
        property([cc.Prefab])
    ], WinAnim.prototype, "prefabs", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "minScale", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "maxScale", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "minAngle", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "maxAngle", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "minSkew", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "maxSkew", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "duration", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "minSpd", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "maxSpd", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "gravity", void 0);
    __decorate([
        property(cc.Integer)
    ], WinAnim.prototype, "count", void 0);
    WinAnim = __decorate([
        ccclass
    ], WinAnim);
    return WinAnim;
}(cc.Component));
exports.default = WinAnim;
var Particle = /** @class */ (function () {
    function Particle(node, spd, g) {
        this.node = node;
        this.spd = spd;
        this.gravity = g;
    }
    Particle.prototype.update = function (dt) {
        this.spd.y += this.gravity * dt;
        this.node.setPosition(this.node.x + this.spd.x * dt, this.node.y + this.spd.y * dt);
    };
    Object.defineProperty(Particle.prototype, "finished", {
        get: function () {
            return this.node.y < -667;
        },
        enumerable: true,
        configurable: true
    });
    return Particle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxXaW5BbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBRGpEO1FBQUEscUVBd0ZDO1FBckZhLGFBQU8sR0FBZ0IsRUFBRSxDQUFDO1FBRzFCLGNBQVEsR0FBVyxHQUFHLENBQUM7UUFFdkIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLGNBQVEsR0FBVyxHQUFHLENBQUM7UUFFdkIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRXBCLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFFckIsWUFBTSxHQUFXLElBQUksQ0FBQztRQUV0QixZQUFNLEdBQVcsSUFBSSxDQUFDO1FBRXRCLGFBQU8sR0FBVyxDQUFDLElBQUksQ0FBQztRQUV4QixXQUFLLEdBQVcsR0FBRyxDQUFDO1FBRXBCLGVBQVMsR0FBZSxFQUFFLENBQUM7UUFDM0IsV0FBSyxHQUFHLENBQUMsQ0FBQzs7SUEyRHhCLENBQUM7SUExRGEseUJBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMz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Q0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFDTCxlQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luQW5pbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXHJcbiAgICBwcm90ZWN0ZWQgcHJlZmFiczogY2MuUHJlZmFiW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcclxuICAgIHByb3RlY3RlZCBtaW5TY2FsZTogbnVtYmVyID0gMC41O1xyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcm90ZWN0ZWQgbWF4U2NhbGU6IG51bWJlciA9IDI7XHJcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcclxuICAgIHByb3RlY3RlZCBtaW5BbmdsZTogbnVtYmVyID0gMDtcclxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxyXG4gICAgcHJvdGVjdGVkIG1heEFuZ2xlOiBudW1iZXIgPSAxODA7XHJcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcclxuICAgIHByb3RlY3RlZCBtaW5Ta2V3OiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcm90ZWN0ZWQgbWF4U2tldzogbnVtYmVyID0gNTtcclxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxyXG4gICAgcHJvdGVjdGVkIGR1cmF0aW9uOiBudW1iZXIgPSAxO1xyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcm90ZWN0ZWQgbWluU3BkOiBudW1iZXIgPSAxNTAwO1xyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcm90ZWN0ZWQgbWF4U3BkOiBudW1iZXIgPSAyNTAwO1xyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcm90ZWN0ZWQgZ3Jhdml0eTogbnVtYmVyID0gLTMwMDA7XHJcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcclxuICAgIHByb3RlY3RlZCBjb3VudDogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBwYXJ0aWNsZXM6IFBhcnRpY2xlW10gPSBbXTtcclxuICAgIHByb3RlY3RlZCBpbmRleCA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgYWRkSXRlbSgpIHtcclxuICAgICAgICB0aGlzLmluZGV4Kys7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gdGhpcy5wcmVmYWJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNbdGhpcy5pbmRleF0pO1xyXG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMucmFuZG9tU2NvcGUodGhpcy5taW5TY2FsZSwgdGhpcy5tYXhTY2FsZSk7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5yYW5kb21TY29wZSh0aGlzLm1pbkFuZ2xlLCB0aGlzLm1heEFuZ2xlKTtcclxuICAgICAgICBsZXQgc2tldyA9IHRoaXMucmFuZG9tU2NvcGUodGhpcy5taW5Ta2V3LCB0aGlzLm1heFNrZXcpO1xyXG4gICAgICAgIG5vZGUuc2V0U2NhbGUoc2NhbGUpO1xyXG4gICAgICAgIG5vZGUuYW5nbGUgPSBhbmdsZTtcclxuICAgICAgICBub2RlLnNrZXdYID0gc2tldztcclxuICAgICAgICBub2RlLnNrZXdZID0gdGhpcy5yYW5kb21TY29wZSh0aGlzLm1pblNrZXcsIHRoaXMubWF4U2tldyk7XHJcblxyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb247XHJcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24sIHRoaXMucmFuZG9tU2NvcGUodGhpcy5taW5TY2FsZSwgdGhpcy5tYXhTY2FsZSksIHRoaXMucmFuZG9tU2NvcGUodGhpcy5taW5TY2FsZSwgdGhpcy5tYXhTY2FsZSkpLFxyXG4gICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbiwgdGhpcy5yYW5kb21TY29wZSh0aGlzLm1pbkFuZ2xlLCB0aGlzLm1heEFuZ2xlKSksXHJcbiAgICAgICAgICAgIGNjLnNrZXdUbyhkdXJhdGlvbiwgdGhpcy5yYW5kb21TY29wZSh0aGlzLm1pblNrZXcsIHRoaXMubWF4U2tldyksIHRoaXMucmFuZG9tU2NvcGUodGhpcy5taW5Ta2V3LCB0aGlzLm1heFNrZXcpKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBsZXQgdiA9IGNjLnYyKCk7XHJcbiAgICAgICAgbGV0IHNwZCA9IHRoaXMubWluU3BkICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFNwZCAtIHRoaXMubWluU3BkKTtcclxuICAgICAgICBsZXQgcmFkaWFuID0gKE1hdGgucmFuZG9tKCkgKiAwLjUgKyAwLjI1KSAqIDMuMTQ7XHJcbiAgICAgICAgdi54ID0gc3BkICogTWF0aC5jb3MocmFkaWFuKTtcclxuICAgICAgICB2LnkgPSBzcGQgKiBNYXRoLnNpbihyYWRpYW4pO1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzLnB1c2gobmV3IFBhcnRpY2xlKG5vZGUsIHYsIHRoaXMuZ3Jhdml0eSkpO1xyXG5cclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmFuZG9tU2NvcGUobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0ZXAuYmluZCh0aGlzKSwgMC4wMTYpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN0ZXAoZHQ6IG51bWJlciA9IDAuMDE2KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpY2xlc1tpXS5maW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25GaW5pc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25GaW5pc2goKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbmNsYXNzIFBhcnRpY2xlIHtcclxuICAgIHB1YmxpYyBub2RlOiBjYy5Ob2RlO1xyXG4gICAgcHVibGljIHNwZDogY2MuVmVjMjtcclxuICAgIHB1YmxpYyBncmF2aXR5OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBzcGQ6IGNjLlZlYzIsIGc6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgdGhpcy5zcGQgPSBzcGQ7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gZztcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3BkLnkgKz0gdGhpcy5ncmF2aXR5ICogZHQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS54ICsgdGhpcy5zcGQueCAqIGR0LCB0aGlzLm5vZGUueSArIHRoaXMuc3BkLnkgKiBkdCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGZpbmlzaGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUueSA8IC02Njc7XHJcbiAgICB9XHJcbn1cclxuIl19