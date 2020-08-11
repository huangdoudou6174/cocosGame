
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/GameLobby.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bbfaeLajE1KToBOdOP0NmIq', 'GameLobby');
// myGame/Script/UI/GameLobby.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var PlayerData_1 = require("../Common/PlayerData");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameLobby = /** @class */ (function (_super) {
    __extends(GameLobby, _super);
    function GameLobby() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uiType = GlobalEnum_1.GlobalEnum.UI.lobby;
        _this.curLevel = null;
        return _this;
    }
    Object.defineProperty(GameLobby.prototype, "uiType", {
        /**场景/UI类型 */
        get: function () { return this._uiType; },
        enumerable: true,
        configurable: true
    });
    GameLobby.prototype.init = function () {
        this.updateCurLevel();
        this.onEvents();
    };
    GameLobby.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.PlayerDataEvent.playerDataChanged, this.updateCurLevel, this);
    };
    GameLobby.prototype.reset = function () {
    };
    GameLobby.prototype.show = function () {
        console.log("显示lobby");
        this.node.active = true;
        this.emit(GameEventType_1.EventType.AudioEvent.playBGM, GlobalEnum_1.GlobalEnum.AudioClip.BGM, true);
        this.emit(GameEventType_1.EventType.SDKEvent.showBanner);
        this.emit(GameEventType_1.EventType.UIEvent.entered, this.uiType);
    };
    GameLobby.prototype.hide = function () {
        this.node.active = false;
        this.emit(GameEventType_1.EventType.UIEvent.exited, this.uiType);
    };
    GameLobby.prototype.updateCurLevel = function () {
        var lv = PlayerData_1.default.getData("gameData.curLevel");
        this.curLevel.string = lv.toString();
    };
    GameLobby.prototype.onBtnStartGame = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.emit(GameEventType_1.EventType.DirectorEvent.startGame);
    };
    GameLobby.prototype.onBtnShop = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.emit(GameEventType_1.EventType.UIEvent.enter, GlobalEnum_1.GlobalEnum.UI.shop);
    };
    __decorate([
        property(cc.Label)
    ], GameLobby.prototype, "curLevel", void 0);
    GameLobby = __decorate([
        ccclass
    ], GameLobby);
    return GameLobby;
}(yyComponent_1.default));
exports.default = GameLobby;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxHYW1lTG9iYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCw4REFBeUQ7QUFDekQsbURBQThDO0FBQzlDLHdEQUF1RDtBQUVqRCxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFXO0lBRGxEO1FBQUEscUVBK0NDO1FBMUNhLGFBQU8sR0FBa0IsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBRzdDLGNBQVEsR0FBYSxJQUFJLENBQUM7O0lBdUN4QyxDQUFDO0lBM0NHLHNCQUFXLDZCQUFNO1FBRGpCLGFBQWE7YUFDYixjQUFzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQU1yQyx3QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ1MsNEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUFTLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNNLHlCQUFLLEdBQVo7SUFDQSxDQUFDO0lBRU0sd0JBQUksR0FBWDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLHVCQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ00sd0JBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVTLGtDQUFjLEdBQXhCO1FBQ0ksSUFBSSxFQUFFLEdBQUcsb0JBQVUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVTLGtDQUFjLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUFTLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFUyw2QkFBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQXJDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNpQjtJQVBuQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBOEM3QjtJQUFELGdCQUFDO0NBOUNELEFBOENDLENBOUNzQyxxQkFBVyxHQThDakQ7a0JBOUNvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HYW1lRXZlbnRUeXBlXCI7XG5pbXBvcnQgUGxheWVyRGF0YSBmcm9tIFwiLi4vQ29tbW9uL1BsYXllckRhdGFcIjtcbmltcG9ydCB7IEdsb2JhbEVudW0gfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2xvYmFsRW51bVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxvYmJ5IGV4dGVuZHMgeXlDb21wb25lbnQge1xuXG4gICAgLyoq5Zy65pmvL1VJ57G75Z6LICovXG4gICAgcHVibGljIGdldCB1aVR5cGUoKSB7IHJldHVybiB0aGlzLl91aVR5cGU7IH1cbiAgICBwcm90ZWN0ZWQgX3VpVHlwZTogR2xvYmFsRW51bS5VSSA9IEdsb2JhbEVudW0uVUkubG9iYnk7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJvdGVjdGVkIGN1ckxldmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDdXJMZXZlbCgpO1xuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuUGxheWVyRGF0YUV2ZW50LnBsYXllckRhdGFDaGFuZ2VkLCB0aGlzLnVwZGF0ZUN1ckxldmVsLCB0aGlzKTtcbiAgICB9XG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaYvuekumxvYmJ5XCIpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlCR00sIEdsb2JhbEVudW0uQXVkaW9DbGlwLkJHTSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0RLRXZlbnQuc2hvd0Jhbm5lcik7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5lbnRlcmVkLCB0aGlzLnVpVHlwZSk7XG4gICAgfVxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5leGl0ZWQsIHRoaXMudWlUeXBlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ3VyTGV2ZWwoKSB7XG4gICAgICAgIGxldCBsdiA9IFBsYXllckRhdGEuZ2V0RGF0YShcImdhbWVEYXRhLmN1ckxldmVsXCIpO1xuICAgICAgICB0aGlzLmN1ckxldmVsLnN0cmluZyA9IGx2LnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQnRuU3RhcnRHYW1lKCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkF1ZGlvRXZlbnQucGxheUNsaWNrQnRuKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5EaXJlY3RvckV2ZW50LnN0YXJ0R2FtZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQnRuU2hvcCgpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlDbGlja0J0bik7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5lbnRlciwgR2xvYmFsRW51bS5VSS5zaG9wKTtcbiAgICB9XG5cbn1cbiJdfQ==