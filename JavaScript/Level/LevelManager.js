
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Level/LevelManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '61d88CXLrtB8aYvNAFKFJrR', 'LevelManager');
// myGame/Script/Level/LevelManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//关卡管理器
var LevelManager = /** @class */ (function (_super) {
    __extends(LevelManager, _super);
    function LevelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**关卡中动态添加的模型节点存放层 */
        _this.levelLayer = null;
        return _this;
    }
    LevelManager.prototype.initLevelTimer = function () {
        this.elapseTimer = 0;
        this.isPaused = false;
    };
    LevelManager.prototype.resetLevelTimer = function () {
        this.elapseTimer = 0;
        this.isPaused = false;
    };
    LevelManager.prototype.init = function () {
        this.initComponents();
        this.initCustomUpdateState();
        this.initLevelTimer();
        this.registAllCustomUpdate();
        this.onEvents();
    };
    LevelManager.prototype.reset = function () {
        //回收关卡中的对象
        this.resetCustomUpdateState();
        this.resetLevelTimer();
    };
    /**暂停关卡运行 */
    LevelManager.prototype.pause = function () {
        this.isPaused = true;
    };
    /**继续关卡运行 */
    LevelManager.prototype.resume = function () {
        this.isPaused = false;
    };
    //进入关卡，设置关卡数据，启动关卡控制器，开始游戏
    LevelManager.prototype.enterLevel = function (levelData) {
        this.node.active = true;
        this.levelData = levelData;
        this.setData();
        this.startLevel();
    };
    //关卡数据设置完毕，开始运行关卡进行游戏
    LevelManager.prototype.startLevel = function () {
        this.enterCustomUpdateState(GlobalEnum_1.GlobalEnum.LevelState.playing);
        this.lastFrameTime = Date.now();
        // this.schedule(this.customUpdate, 0.016);
        this.emit(GameEventType_1.EventType.CtrlEvent.ctrlStart);
        this.emit(GameEventType_1.EventType.AudioEvent.playBGM, GlobalEnum_1.GlobalEnum.AudioClip.BGM, true);
        this.emit(GameEventType_1.EventType.SDKEvent.startRecord);
        this.emit(GameEventType_1.EventType.ALDEvent.levelStart, this.levelData.lv);
    };
    //退出关卡
    LevelManager.prototype.exit = function () {
        this.reset();
        this.node.active = false;
        // this.unschedule(this.customUpdate);
    };
    //自定义的每帧更新函数，由计时器执行
    LevelManager.prototype.customUpdate = function () {
        if (this.isPaused)
            return;
        var d = Date.now();
        var dt = d - this.lastFrameTime;
        this.lastFrameTime = d;
        if (dt > 34)
            dt = 34; //避免苹果手机打开下拉菜单再回来，dt值过大
        dt *= 0.001; //单位转换为秒
        this.elapseTimer += dt;
        if (!!this.customStep) {
            this.customStep(dt);
        }
    };
    //关卡进行中
    LevelManager.prototype.stepLevelPlaying = function (dt) {
        // console.log("关卡管理器子类未实现方法stepLevelPlaying");
    };
    //关卡胜利
    LevelManager.prototype.stepLevelWin = function (dt) {
        // console.log("关卡管理器子类未实现方法stepLevelWin");
    };
    //关卡失败
    LevelManager.prototype.stepLevelLose = function (dt) {
        // console.log("关卡管理器子类未实现方法stepLevelLose");
    };
    /**玩家胜利 */
    LevelManager.prototype.win = function () {
        this.enterCustomUpdateState(GlobalEnum_1.GlobalEnum.LevelState.win);
        this.emit(GameEventType_1.EventType.CtrlEvent.ctrlEnd);
        this.emit(GameEventType_1.EventType.DirectorEvent.playerWin);
        this.emit(GameEventType_1.EventType.AudioEvent.playBGM, GlobalEnum_1.GlobalEnum.AudioClip.win, false);
        this.emit(GameEventType_1.EventType.SDKEvent.stopRecord);
        this.emit(GameEventType_1.EventType.ALDEvent.levelWin, this.levelData.lv);
    };
    /**玩家失败 */
    LevelManager.prototype.lose = function () {
        this.enterCustomUpdateState(GlobalEnum_1.GlobalEnum.LevelState.lose);
        this.emit(GameEventType_1.EventType.CtrlEvent.ctrlEnd);
        this.emit(GameEventType_1.EventType.DirectorEvent.playerLose);
        this.emit(GameEventType_1.EventType.AudioEvent.playBGM, GlobalEnum_1.GlobalEnum.AudioClip.lose, false);
        this.emit(GameEventType_1.EventType.SDKEvent.stopRecord);
        this.emit(GameEventType_1.EventType.ALDEvent.levelLose, this.levelData.lv);
    };
    LevelManager.prototype.update = function (dt) {
        // this.customUpdate(dt);
        if (!this.isPaused && !!this.customStep) {
            this.customStep(dt);
        }
    };
    __decorate([
        property(cc.Node)
    ], LevelManager.prototype, "levelLayer", void 0);
    LevelManager = __decorate([
        ccclass
    ], LevelManager);
    return LevelManager;
}(yyComponent_1.default));
exports.default = LevelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXExldmVsXFxMZXZlbE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCx3REFBdUQ7QUFDdkQsOERBQXlEO0FBRW5ELElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFDNUMsT0FBTztBQUVQO0lBQTBDLGdDQUFXO0lBRHJEO1FBQUEscUVBOEhDO1FBN0dHLHFCQUFxQjtRQUVYLGdCQUFVLEdBQVksSUFBSSxDQUFDOztJQTJHekMsQ0FBQztJQXRIYSxxQ0FBYyxHQUF4QjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDUyxzQ0FBZSxHQUF6QjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFNTSwyQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNNLDRCQUFLLEdBQVo7UUFDSSxVQUFVO1FBRVYsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUFZO0lBQ0wsNEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxZQUFZO0lBQ0wsNkJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLEdB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O2tCQTdIb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5eUNvbXBvbmVudCBmcm9tIFwiLi4vQ29tbW9uL3l5Q29tcG9uZW50XCI7XG5pbXBvcnQgeyBHbG9iYWxFbnVtIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dsb2JhbEVudW1cIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HYW1lRXZlbnRUeXBlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG4vL+WFs+WNoeeuoeeQhuWZqFxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsTWFuYWdlciBleHRlbmRzIHl5Q29tcG9uZW50IHtcblxuICAgIHByb3RlY3RlZCBsZXZlbERhdGE6IGFueTsgICAgICAgICAgICAgLy/lvZPliY3lhbPljaHnmoTlhbPljaHmlbDmja5cblxuICAgIHByb3RlY3RlZCBlbGFwc2VUaW1lcjogbnVtYmVyOyAgICAgICAgLy/lhbPljaHnu4/ljobnmoTml7bpl7TvvIzljZXkvY0g5q+r56eSXG4gICAgcHJvdGVjdGVkIGxhc3RGcmFtZVRpbWU6IG51bWJlcjsgICAgICAvL+S4iuS4gOW4p+abtOaWsOaXtueahOaXtumXtOaIs1xuICAgIHByb3RlY3RlZCBpc1BhdXNlZDogYm9vbGVhbjsgICAgICAgICAgLy/lhbPljaHmmK/lkKbmmoLlgZznirbmgIFcbiAgICBwcm90ZWN0ZWQgaW5pdExldmVsVGltZXIoKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZXNldExldmVsVGltZXIoKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoq5YWz5Y2h5Lit5Yqo5oCB5re75Yqg55qE5qih5Z6L6IqC54K55a2Y5pS+5bGCICovXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIGxldmVsTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdENvbXBvbmVudHMoKTtcbiAgICAgICAgdGhpcy5pbml0Q3VzdG9tVXBkYXRlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5pbml0TGV2ZWxUaW1lcigpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0QWxsQ3VzdG9tVXBkYXRlKCk7XG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcbiAgICB9XG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICAvL+WbnuaUtuWFs+WNoeS4reeahOWvueixoVxuXG4gICAgICAgIHRoaXMucmVzZXRDdXN0b21VcGRhdGVTdGF0ZSgpO1xuICAgICAgICB0aGlzLnJlc2V0TGV2ZWxUaW1lcigpO1xuICAgIH1cblxuICAgIC8qKuaaguWBnOWFs+WNoei/kOihjCAqL1xuICAgIHB1YmxpYyBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKue7p+e7reWFs+WNoei/kOihjCAqL1xuICAgIHB1YmxpYyByZXN1bWUoKSB7XG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+i/m+WFpeWFs+WNoe+8jOiuvue9ruWFs+WNoeaVsOaNru+8jOWQr+WKqOWFs+WNoeaOp+WItuWZqO+8jOW8gOWni+a4uOaIj1xuICAgIHB1YmxpYyBlbnRlckxldmVsKGxldmVsRGF0YSkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZXZlbERhdGEgPSBsZXZlbERhdGE7XG4gICAgICAgIHRoaXMuc2V0RGF0YSgpO1xuICAgICAgICB0aGlzLnN0YXJ0TGV2ZWwoKTtcbiAgICB9XG4gICAgLy/lhbPljaHmlbDmja7orr7nva7lrozmr5XvvIzlvIDlp4vov5DooYzlhbPljaHov5vooYzmuLjmiI9cbiAgICBwcm90ZWN0ZWQgc3RhcnRMZXZlbCgpIHtcbiAgICAgICAgdGhpcy5lbnRlckN1c3RvbVVwZGF0ZVN0YXRlKEdsb2JhbEVudW0uTGV2ZWxTdGF0ZS5wbGF5aW5nKTtcbiAgICAgICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZSh0aGlzLmN1c3RvbVVwZGF0ZSwgMC4wMTYpO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkN0cmxFdmVudC5jdHJsU3RhcnQpO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkF1ZGlvRXZlbnQucGxheUJHTSwgR2xvYmFsRW51bS5BdWRpb0NsaXAuQkdNLCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TREtFdmVudC5zdGFydFJlY29yZCk7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQUxERXZlbnQubGV2ZWxTdGFydCwgdGhpcy5sZXZlbERhdGEubHYpO1xuICAgIH1cblxuICAgIC8v6YCA5Ye65YWz5Y2hXG4gICAgcHVibGljIGV4aXQoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnVuc2NoZWR1bGUodGhpcy5jdXN0b21VcGRhdGUpO1xuICAgIH1cblxuICAgIC8v6Ieq5a6a5LmJ55qE5q+P5bin5pu05paw5Ye95pWw77yM55Sx6K6h5pe25Zmo5omn6KGMXG4gICAgcHVibGljIGN1c3RvbVVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHJldHVybjtcbiAgICAgICAgbGV0IGQgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZHQgPSBkIC0gdGhpcy5sYXN0RnJhbWVUaW1lO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSBkO1xuXG4gICAgICAgIGlmIChkdCA+IDM0KSBkdCA9IDM0Oy8v6YG/5YWN6Iu55p6c5omL5py65omT5byA5LiL5ouJ6I+c5Y2V5YaN5Zue5p2l77yMZHTlgLzov4flpKdcbiAgICAgICAgZHQgKj0gMC4wMDE7Ly/ljZXkvY3ovazmjaLkuLrnp5JcbiAgICAgICAgdGhpcy5lbGFwc2VUaW1lciArPSBkdDtcbiAgICAgICAgaWYgKCEhdGhpcy5jdXN0b21TdGVwKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVN0ZXAoZHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/lhbPljaHov5vooYzkuK1cbiAgICBwcm90ZWN0ZWQgc3RlcExldmVsUGxheWluZyhkdDogbnVtYmVyKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5YWz5Y2h566h55CG5Zmo5a2Q57G75pyq5a6e546w5pa55rOVc3RlcExldmVsUGxheWluZ1wiKTtcbiAgICB9XG4gICAgLy/lhbPljaHog5zliKlcbiAgICBwcm90ZWN0ZWQgc3RlcExldmVsV2luKGR0OiBudW1iZXIpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlhbPljaHnrqHnkIblmajlrZDnsbvmnKrlrp7njrDmlrnms5VzdGVwTGV2ZWxXaW5cIik7XG4gICAgfVxuICAgIC8v5YWz5Y2h5aSx6LSlXG4gICAgcHJvdGVjdGVkIHN0ZXBMZXZlbExvc2UoZHQ6IG51bWJlcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWFs+WNoeeuoeeQhuWZqOWtkOexu+acquWunueOsOaWueazlXN0ZXBMZXZlbExvc2VcIik7XG4gICAgfVxuXG4gICAgLyoq546p5a626IOc5YipICovXG4gICAgcHJvdGVjdGVkIHdpbigpIHtcbiAgICAgICAgdGhpcy5lbnRlckN1c3RvbVVwZGF0ZVN0YXRlKEdsb2JhbEVudW0uTGV2ZWxTdGF0ZS53aW4pO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkN0cmxFdmVudC5jdHJsRW5kKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnBsYXllcldpbik7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQXVkaW9FdmVudC5wbGF5QkdNLCBHbG9iYWxFbnVtLkF1ZGlvQ2xpcC53aW4sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TREtFdmVudC5zdG9wUmVjb3JkKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BTERFdmVudC5sZXZlbFdpbiwgdGhpcy5sZXZlbERhdGEubHYpO1xuICAgIH1cbiAgICAvKirnjqnlrrblpLHotKUgKi9cbiAgICBwcm90ZWN0ZWQgbG9zZSgpIHtcbiAgICAgICAgdGhpcy5lbnRlckN1c3RvbVVwZGF0ZVN0YXRlKEdsb2JhbEVudW0uTGV2ZWxTdGF0ZS5sb3NlKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5DdHJsRXZlbnQuY3RybEVuZCk7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuRGlyZWN0b3JFdmVudC5wbGF5ZXJMb3NlKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlCR00sIEdsb2JhbEVudW0uQXVkaW9DbGlwLmxvc2UsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TREtFdmVudC5zdG9wUmVjb3JkKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BTERFdmVudC5sZXZlbExvc2UsIHRoaXMubGV2ZWxEYXRhLmx2KTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XG4gICAgICAgIC8vIHRoaXMuY3VzdG9tVXBkYXRlKGR0KTtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGF1c2VkICYmICEhdGhpcy5jdXN0b21TdGVwKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbVN0ZXAoZHQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==