
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/BtnGetAwardByVideo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c67bsmNvFKVYZe9uyGSr5D', 'BtnGetAwardByVideo');
// myGame/Script/UI/BtnGetAwardByVideo.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GamePlatform_1 = require("../Platform/GamePlatform");
//观看视频领取奖励按钮
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnGetAwardByVideo = /** @class */ (function (_super) {
    __extends(BtnGetAwardByVideo, _super);
    function BtnGetAwardByVideo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**观看视频领取多倍奖励的复选框 */
        _this.video = null;
        /**按钮的精灵组件 */
        _this.btnSprite = null;
        /**显示视频icon的按钮图片 */
        _this.showVideoIconBtn = null;
        return _this;
    }
    BtnGetAwardByVideo.prototype.init = function (handler) {
        this.handler = handler;
        this.onEvents();
    };
    BtnGetAwardByVideo.prototype.onEvents = function () {
    };
    /**按钮点击回调 */
    BtnGetAwardByVideo.prototype.onClick = function () {
        if (!!this.handler) {
            this.handler.cb.call(this.handler.target, this.video.isChecked);
        }
    };
    BtnGetAwardByVideo.prototype.show = function () {
        this.node.active = true;
        this.setData();
    };
    BtnGetAwardByVideo.prototype.setData = function () {
        var video = false;
        var str = cc.sys.localStorage.getItem("getAwardByVideo");
        if (!!str && !!JSON.parse(str)) {
            video = true;
        }
        if (!GamePlatform_1.default.instance.Config.video) {
            video = false;
        }
        this.setVideoToggle(video);
    };
    /**设置视频复选框的状态 */
    BtnGetAwardByVideo.prototype.setVideoToggle = function (checked) {
        this.video.isChecked = checked;
    };
    BtnGetAwardByVideo.prototype.onVideoToggle = function () {
        cc.sys.localStorage.setItem("getAwardByVideo", this.video.isChecked);
    };
    __decorate([
        property(cc.Toggle)
    ], BtnGetAwardByVideo.prototype, "video", void 0);
    __decorate([
        property(cc.Sprite)
    ], BtnGetAwardByVideo.prototype, "btnSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BtnGetAwardByVideo.prototype, "showVideoIconBtn", void 0);
    BtnGetAwardByVideo = __decorate([
        ccclass
    ], BtnGetAwardByVideo);
    return BtnGetAwardByVideo;
}(yyComponent_1.default));
exports.default = BtnGetAwardByVideo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxCdG5HZXRBd2FyZEJ5VmlkZW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCx5REFBb0Q7QUFFcEQsWUFBWTtBQUNOLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBZ0Qsc0NBQVc7SUFEM0Q7UUFBQSxxRUFtREM7UUFqREcsb0JBQW9CO1FBRVYsV0FBSyxHQUFjLElBQUksQ0FBQztRQUNsQyxhQUFhO1FBRUgsZUFBUyxHQUFjLElBQUksQ0FBQztRQUN0QyxtQkFBbUI7UUFFVCxzQkFBZ0IsR0FBbUIsSUFBSSxDQUFDOztJQXlDdEQsQ0FBQztJQXRDVSxpQ0FBSSxHQUFYLFVBQVksT0FBc0Q7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDUyxxQ0FBUSxHQUFsQjtJQUVBLENBQUM7SUFDRCxZQUFZO0lBQ0Ysb0NBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUVNLGlDQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDUyxvQ0FBTyxHQUFqQjtRQUNJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3JDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDakI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0I7SUFDVCwyQ0FBYyxHQUFyQixVQUFzQixPQUFnQjtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQUVTLDBDQUFhLEdBQXZCO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQTlDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ2tCO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0VBQ3lCO0lBVGpDLGtCQUFrQjtRQUR0QyxPQUFPO09BQ2Esa0JBQWtCLENBa0R0QztJQUFELHlCQUFDO0NBbERELEFBa0RDLENBbEQrQyxxQkFBVyxHQWtEMUQ7a0JBbERvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeXlDb21wb25lbnQgZnJvbSBcIi4uL0NvbW1vbi95eUNvbXBvbmVudFwiO1xuaW1wb3J0IEdhbWVQbGF0Zm9ybSBmcm9tIFwiLi4vUGxhdGZvcm0vR2FtZVBsYXRmb3JtXCI7XG5cbi8v6KeC55yL6KeG6aKR6aKG5Y+W5aWW5Yqx5oyJ6ZKuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuR2V0QXdhcmRCeVZpZGVvIGV4dGVuZHMgeXlDb21wb25lbnQge1xuICAgIC8qKuingueci+inhumikemihuWPluWkmuWAjeWlluWKseeahOWkjemAieahhiAqL1xuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXG4gICAgcHJvdGVjdGVkIHZpZGVvOiBjYy5Ub2dnbGUgPSBudWxsO1xuICAgIC8qKuaMiemSrueahOeyvueBtee7hOS7tiAqL1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJvdGVjdGVkIGJ0blNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcbiAgICAvKirmmL7npLrop4bpopFpY29u55qE5oyJ6ZKu5Zu+54mHICovXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHByb3RlY3RlZCBzaG93VmlkZW9JY29uQnRuOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgaGFuZGxlcjogeyBjYjogRnVuY3Rpb24sIHRhcmdldDogYW55IH07XG4gICAgcHVibGljIGluaXQoaGFuZGxlcjogeyBjYjogKHZpZGVvOiBib29sZWFuKSA9PiB2b2lkLCB0YXJnZXQ6IGFueSB9KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uRXZlbnRzKCkge1xuXG4gICAgfVxuICAgIC8qKuaMiemSrueCueWHu+WbnuiwgyAqL1xuICAgIHByb3RlY3RlZCBvbkNsaWNrKCkge1xuICAgICAgICBpZiAoISF0aGlzLmhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlci5jYi5jYWxsKHRoaXMuaGFuZGxlci50YXJnZXQsIHRoaXMudmlkZW8uaXNDaGVja2VkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXREYXRhKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBzZXREYXRhKCkge1xuICAgICAgICBsZXQgdmlkZW8gPSBmYWxzZTtcbiAgICAgICAgbGV0IHN0ciA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdldEF3YXJkQnlWaWRlb1wiKTtcbiAgICAgICAgaWYgKCEhc3RyICYmICEhSlNPTi5wYXJzZShzdHIpKSB7XG4gICAgICAgICAgICB2aWRlbyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnZpZGVvKSB7XG4gICAgICAgICAgICB2aWRlbyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0VmlkZW9Ub2dnbGUodmlkZW8pO1xuICAgIH1cblxuICAgIC8qKuiuvue9ruinhumikeWkjemAieahhueahOeKtuaAgSAqL1xuICAgIHB1YmxpYyBzZXRWaWRlb1RvZ2dsZShjaGVja2VkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMudmlkZW8uaXNDaGVja2VkID0gY2hlY2tlZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25WaWRlb1RvZ2dsZSgpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZ2V0QXdhcmRCeVZpZGVvXCIsIHRoaXMudmlkZW8uaXNDaGVja2VkKTtcbiAgICB9XG59XG4iXX0=