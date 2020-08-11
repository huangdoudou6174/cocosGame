
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/PlayerAssetBar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c3fdAqu89OOpNYA15fZmuE', 'PlayerAssetBar');
// myGame/Script/UI/PlayerAssetBar.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var PlayerData_1 = require("../Common/PlayerData");
var GameEventType_1 = require("../GameSpecial/GameEventType");
//玩家的金币体力等资产信息条
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayerAssetBar = /** @class */ (function (_super) {
    __extends(PlayerAssetBar, _super);
    function PlayerAssetBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goldLabel = null;
        return _this;
    }
    PlayerAssetBar_1 = PlayerAssetBar;
    Object.defineProperty(PlayerAssetBar, "goldPos", {
        get: function () { return this._goldPos; },
        enumerable: true,
        configurable: true
    });
    PlayerAssetBar.prototype.init = function () {
        var pos = this.goldLabel.node.convertToWorldSpaceAR(cc.v2(0, 0));
        pos = this.node.convertToNodeSpaceAR(pos);
        PlayerAssetBar_1._goldPos.set(pos);
        this.onEvents();
    };
    PlayerAssetBar.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.PlayerDataEvent.playerDataChanged, this.onPlayerDataChanged, this);
    };
    PlayerAssetBar.prototype.reset = function () {
    };
    PlayerAssetBar.prototype.show = function () {
        this.node.active = true;
        this.setData();
        this.onEvents();
    };
    PlayerAssetBar.prototype.hide = function () {
        this.offEvents();
        this.node.active = false;
    };
    PlayerAssetBar.prototype.setData = function () {
        var data = PlayerData_1.default.getData("gameData.asset");
        this.setGold(data.gold);
    };
    PlayerAssetBar.prototype.setGold = function (gold) {
        this.goldLabel.string = this.convertToString(gold);
    };
    PlayerAssetBar.prototype.convertToString = function (v) {
        if (v < 1100)
            return v.toString();
        if (v < 1000000)
            return (v * 0.001).toFixed(1) + "K";
        return (v * 0.000001).toFixed(1) + "M";
    };
    PlayerAssetBar.prototype.onPlayerDataChanged = function (data) {
        switch (data.attribute) {
            case "gameData.asset.gold": {
                this.setGold(data.value);
                break;
            }
        }
    };
    var PlayerAssetBar_1;
    PlayerAssetBar._goldPos = cc.v2(0, 0);
    __decorate([
        property(cc.Label)
    ], PlayerAssetBar.prototype, "goldLabel", void 0);
    PlayerAssetBar = PlayerAssetBar_1 = __decorate([
        ccclass
    ], PlayerAssetBar);
    return PlayerAssetBar;
}(yyComponent_1.default));
exports.default = PlayerAssetBar;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxQbGF5ZXJBc3NldEJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBRWhELG1EQUE4QztBQUM5Qyw4REFBeUQ7QUFFekQsZUFBZTtBQUNULElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVc7SUFEdkQ7UUFBQSxxRUFvREM7UUFqRGEsZUFBUyxHQUFhLElBQUksQ0FBQzs7SUFpRHpDLENBQUM7dUJBbkRvQixjQUFjO0lBSy9CLHNCQUFrQix5QkFBTzthQUF6QixjQUF1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUV2RCw2QkFBSSxHQUFYO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxnQkFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDUyxpQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFDTSw4QkFBSyxHQUFaO0lBRUEsQ0FBQztJQUVNLDZCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDTSw2QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRVMsZ0NBQU8sR0FBakI7UUFDSSxJQUFJLElBQUksR0FBRyxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDUyxnQ0FBTyxHQUFqQixVQUFrQixJQUFZO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNTLHdDQUFlLEdBQXpCLFVBQTBCLENBQVM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsSUFBSTtZQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLE9BQU87WUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckQsT0FBTyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzNDLENBQUM7SUFFUyw0Q0FBbUIsR0FBN0IsVUFBOEIsSUFBSTtRQUM5QixRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDcEIsS0FBSyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsTUFBTTthQUNUO1NBQ0o7SUFDTCxDQUFDOztJQTlDZ0IsdUJBQVEsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUZqRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNrQjtJQUZwQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBbURsQztJQUFELHFCQUFDO0NBbkRELEFBbURDLENBbkQyQyxxQkFBVyxHQW1EdEQ7a0JBbkRvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcbmltcG9ydCB7IElVSSB9IGZyb20gXCIuL0lVSVwiO1xuaW1wb3J0IFBsYXllckRhdGEgZnJvbSBcIi4uL0NvbW1vbi9QbGF5ZXJEYXRhXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuXG4vL+eOqeWutueahOmHkeW4geS9k+WKm+etiei1hOS6p+S/oeaBr+adoVxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckFzc2V0QmFyIGV4dGVuZHMgeXlDb21wb25lbnQgaW1wbGVtZW50cyBJVUkge1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcm90ZWN0ZWQgZ29sZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9nb2xkUG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgZ29sZFBvcygpOiBjYy5WZWMyIHsgcmV0dXJuIHRoaXMuX2dvbGRQb3M7IH1cblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nb2xkTGFiZWwubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpO1xuICAgICAgICBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKTtcbiAgICAgICAgUGxheWVyQXNzZXRCYXIuX2dvbGRQb3Muc2V0KHBvcyk7XG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uRXZlbnRzKCkge1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5QbGF5ZXJEYXRhRXZlbnQucGxheWVyRGF0YUNoYW5nZWQsIHRoaXMub25QbGF5ZXJEYXRhQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuICAgIHB1YmxpYyByZXNldCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXREYXRhKCk7XG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcbiAgICB9XG4gICAgcHVibGljIGhpZGUoKSB7XG4gICAgICAgIHRoaXMub2ZmRXZlbnRzKCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0RGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBQbGF5ZXJEYXRhLmdldERhdGEoXCJnYW1lRGF0YS5hc3NldFwiKTtcbiAgICAgICAgdGhpcy5zZXRHb2xkKGRhdGEuZ29sZCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBzZXRHb2xkKGdvbGQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdvbGRMYWJlbC5zdHJpbmcgPSB0aGlzLmNvbnZlcnRUb1N0cmluZyhnb2xkKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGNvbnZlcnRUb1N0cmluZyh2OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHYgPCAxMTAwKSByZXR1cm4gdi50b1N0cmluZygpO1xuICAgICAgICBpZiAodiA8IDEwMDAwMDApIHJldHVybiAodiAqIDAuMDAxKS50b0ZpeGVkKDEpICsgXCJLXCI7XG4gICAgICAgIHJldHVybiAodiAqIDAuMDAwMDAxKS50b0ZpeGVkKDEpICsgXCJNXCI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUGxheWVyRGF0YUNoYW5nZWQoZGF0YSkge1xuICAgICAgICBzd2l0Y2ggKGRhdGEuYXR0cmlidXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZ2FtZURhdGEuYXNzZXQuZ29sZFwiOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHb2xkKGRhdGEudmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19