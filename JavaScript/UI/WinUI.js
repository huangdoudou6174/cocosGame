
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/WinUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e9725uMNIlP/YFRH4XwxDJT', 'WinUI');
// myGame/Script/UI/WinUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var GamePlatform_1 = require("../Platform/GamePlatform");
var GamePlatformType_1 = require("../Platform/GamePlatformType");
var BtnGetAwardByVideo_1 = require("./BtnGetAwardByVideo");
var UIManager_1 = require("../Common/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WinUI = /** @class */ (function (_super) {
    __extends(WinUI, _super);
    function WinUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uiType = GlobalEnum_1.GlobalEnum.UI.winUI;
        /**金币 */
        _this.baseGoldLabel = null;
        _this.speGoldLabel = null;
        _this.totalGoldLabel = null;
        //一个按钮根据是否勾选选择视频领取的方案：
        /**领取按钮 */
        _this.btnGetAwardNode = null;
        //视频与普通领取分开的方案：
        /**单倍领取 */
        _this.btnGetAwardSingle = null;
        /**视频领取 */
        _this.btnVideo = null;
        /**下一关按钮 */
        _this.btnNextLevel = null;
        _this.btnComeBackLobby = null;
        _this.btnShareVideo = null;
        _this.shareGold = null;
        _this.acceptedGold = false;
        return _this;
    }
    Object.defineProperty(WinUI.prototype, "uiType", {
        /**场景/UI类型 */
        get: function () { return this._uiType; },
        enumerable: true,
        configurable: true
    });
    WinUI.prototype.init = function () {
        this.acceptedGold = false;
        if (!!this.btnGetAwardNode) {
            this.btnGetAward = this.btnGetAwardNode.getComponent(BtnGetAwardByVideo_1.default);
            this.btnGetAward.init({
                cb: this.onBtnGetAward,
                target: this
            });
        }
        var wg = this.btnNextLevel.getComponent(cc.Widget);
        if (!!wg) {
            wg.isAlignBottom = false;
            wg.isAlignVerticalCenter = false;
        }
    };
    WinUI.prototype.reset = function () {
        this.acceptedGold = false;
    };
    /**
     * 显示UI
     * @param data 关卡成绩
     */
    WinUI.prototype.show = function (data) {
        this.reset();
        if (!data) {
            var ui = UIManager_1.default.getUI(GlobalEnum_1.GlobalEnum.UI.levelInfo);
            if (!ui) {
                console.error("获取关卡信息UI脚本失败，无法显示胜利界面！");
            }
            else {
                data = ui.getData();
            }
        }
        this.node.active = true;
        this.btnNextLevel.active = false;
        this.btnComeBackLobby.active = false;
        var toBig = cc.scaleTo(0.5, 1, 1);
        toBig.easing(cc.easeInOut(2));
        var toSmall = cc.scaleTo(0.5, 0.9, 0.9);
        toSmall.easing(cc.easeInOut(2));
        //头条平台打开分享录屏按钮
        if (!!this.btnShareVideo) {
            if (GamePlatform_1.default.instance.Config.type == GamePlatformType_1.GamePlatformType.TT) {
                this.btnShareVideo.active = true;
                this.btnShareVideo.setScale(1, 1);
                this.btnShareVideo.runAction(cc.repeatForever(cc.sequence(toBig.clone(), toSmall.clone())));
            }
            else {
                this.btnShareVideo.active = false;
            }
        }
        //领取按钮:
        this.showBtnGetAward();
        this.setData(data);
        this.emit(GameEventType_1.EventType.UIEvent.entered, this.uiType);
    };
    WinUI.prototype.showBtnGetAward = function () {
        if (!!this.btnGetAward) {
            this.btnGetAward.show();
        }
        else {
            this.btnGetAwardSingle.active = true;
            this.btnVideo.active = true;
        }
    };
    WinUI.prototype.hideBtnGetAward = function () {
        if (!!this.btnGetAward) {
            this.btnGetAward.hide();
        }
        else {
            this.btnGetAwardSingle.active = false;
            this.btnVideo.active = false;
        }
    };
    WinUI.prototype.hide = function () {
        if (!!this.btnShareVideo) {
            this.btnShareVideo.stopAllActions();
        }
        this.node.active = false;
        this.emit(GameEventType_1.EventType.UIEvent.exited, this.uiType);
    };
    WinUI.prototype.setData = function (data) {
        this.data = data;
        this.baseGold = data.baseGold;
        this.baseGoldLabel.string = this.baseGold.toString();
        this.speGold = data.speGold;
        this.speGoldLabel.string = this.speGold.toString();
        this.totalGoldLabel.string = this.getTotalGold().toString();
    };
    WinUI.prototype.getTotalGold = function () {
        return this.baseGold + this.speGold;
    };
    /**
     * 领取按钮点击回调
     * @param showVideo 是否观看视频领取三倍奖励
     */
    WinUI.prototype.onBtnGetAward = function (showVideo) {
        if (!!showVideo) {
            if (GamePlatform_1.default.instance.Config.video) {
                this.onBtnVideo();
            }
            else {
                this.emit(GameEventType_1.EventType.UIEvent.showTip, "暂时没有视频哦~");
                this.onBtnGetGold();
            }
        }
        else {
            this.onBtnGetGold();
        }
    };
    //视频三倍
    WinUI.prototype.onBtnVideo = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.emit(GameEventType_1.EventType.SDKEvent.showVideo, this.onVideoFinish.bind(this));
    };
    WinUI.prototype.onVideoFinish = function () {
        this.addGold(this.getTotalGold() * 5, this.onGetGoldFinish.bind(this));
    };
    //普通领取
    WinUI.prototype.onBtnGetGold = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.addGold(this.getTotalGold(), this.onGetGoldFinish.bind(this));
    };
    //下一关
    WinUI.prototype.onBtnNextLevel = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.emit(GameEventType_1.EventType.DirectorEvent.playNextLevel);
    };
    //金币领取完成后显示下一关和返回首页按钮
    WinUI.prototype.onGetGoldFinish = function () {
        // this.btnGetAwardNode.active = false;
        this.hideBtnGetAward();
        this.btnNextLevel.active = true;
        this.btnComeBackLobby.active = true;
        this.setBtnsPosNormal();
        this.showBannerOrInsertAd();
    };
    /**显示banner或插屏广告 */
    WinUI.prototype.showBannerOrInsertAd = function () {
        this.emit(GameEventType_1.EventType.SDKEvent.showBanner);
    };
    /**设置按钮坐标为常规状态 */
    WinUI.prototype.setBtnsPosNormal = function () {
        this.btnNextLevel.y = 310 + this.btnNextLevel.height * this.btnNextLevel.anchorY - this.node.height * this.node.anchorY;
    };
    /**播放金币动画获得金币 */
    WinUI.prototype.addGold = function (gold, cb) {
        var _this = this;
        if (this.acceptedGold) {
            !!cb && cb();
            return;
        }
        this.acceptedGold = true;
        this.emit(GameEventType_1.EventType.UIEvent.playGoldAmin, {
            cb: function () {
                _this.emit(GameEventType_1.EventType.PlayerDataEvent.updatePlayerData, {
                    type: "gameData",
                    attribute: "gameData.asset.gold",
                    value: gold,
                    mode: "+"
                });
                !!cb && cb();
            }
        });
    };
    //返回首页
    WinUI.prototype.onBtnReturnLobby = function () {
        var _this = this;
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.addGold(this.getTotalGold(), function () {
            _this.emit(GameEventType_1.EventType.DirectorEvent.enterLobby, _this);
        });
    };
    //头条平台录屏分享
    WinUI.prototype.onBtnShareVideo = function () {
        this.emit(GameEventType_1.EventType.SDKEvent.shareRecord, this.onShareVideoFinish.bind(this));
    };
    WinUI.prototype.onShareVideoFinish = function () {
        this.btnShareVideo.stopAllActions();
        this.btnShareVideo.active = false;
    };
    __decorate([
        property(cc.Label)
    ], WinUI.prototype, "baseGoldLabel", void 0);
    __decorate([
        property(cc.Label)
    ], WinUI.prototype, "speGoldLabel", void 0);
    __decorate([
        property(cc.Label)
    ], WinUI.prototype, "totalGoldLabel", void 0);
    __decorate([
        property(cc.Node)
    ], WinUI.prototype, "btnGetAwardNode", void 0);
    __decorate([
        property(cc.Node)
    ], WinUI.prototype, "btnGetAwardSingle", void 0);
    __decorate([
        property(cc.Node)
    ], WinUI.prototype, "btnVideo", void 0);
    __decorate([
        property(cc.Node)
    ], WinUI.prototype, "btnNextLevel", void 0);
    __decorate([
        property(cc.Node)
    ], WinUI.prototype, "btnComeBackLobby", void 0);
    __decorate([
        property(cc.Node)
    ], WinUI.prototype, "btnShareVideo", void 0);
    __decorate([
        property(cc.Label)
    ], WinUI.prototype, "shareGold", void 0);
    WinUI = __decorate([
        ccclass
    ], WinUI);
    return WinUI;
}(yyComponent_1.default));
exports.default = WinUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxXaW5VSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDhEQUF5RDtBQUd6RCx3REFBdUQ7QUFDdkQseURBQW9EO0FBQ3BELGlFQUFnRTtBQUNoRSwyREFBc0Q7QUFDdEQsaURBQTRDO0FBRXRDLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBbUMseUJBQVc7SUFEOUM7UUFBQSxxRUEyT0M7UUF0T2EsYUFBTyxHQUFrQix1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFFdkQsUUFBUTtRQUVFLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBSS9CLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBSTlCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBRTFDLHNCQUFzQjtRQUN0QixVQUFVO1FBRUEscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFHMUMsZUFBZTtRQUNmLFVBQVU7UUFFQSx1QkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDNUMsVUFBVTtRQUVBLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFbkMsV0FBVztRQUVELGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUVqQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLGtCQUFZLEdBQVksS0FBSyxDQUFDOztJQWdNNUMsQ0FBQztJQXZPRyxzQkFBVyx5QkFBTTtRQURqQixhQUFhO2FBQ2IsY0FBc0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUEyQ3JDLG9CQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxX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UyxrQ0FBa0IsR0FBNUI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBaE9EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ3NCO0lBSXpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ3FCO0lBSXhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ3VCO0lBSzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ3dCO0lBTTFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQzBCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ2lCO0lBSW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ3FCO0lBRXZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ3lCO0lBRTNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ3NCO0lBRXhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NENBQ2tCO0lBeENwQixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBME96QjtJQUFELFlBQUM7Q0ExT0QsQUEwT0MsQ0ExT2tDLHFCQUFXLEdBME83QztrQkExT29CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeXlDb21wb25lbnQgZnJvbSBcIi4uL0NvbW1vbi95eUNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcbmltcG9ydCB7IElVSSB9IGZyb20gXCIuL0lVSVwiO1xuaW1wb3J0IFBsYXllckRhdGEgZnJvbSBcIi4uL0NvbW1vbi9QbGF5ZXJEYXRhXCI7XG5pbXBvcnQgeyBHbG9iYWxFbnVtIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dsb2JhbEVudW1cIjtcbmltcG9ydCBHYW1lUGxhdGZvcm0gZnJvbSBcIi4uL1BsYXRmb3JtL0dhbWVQbGF0Zm9ybVwiO1xuaW1wb3J0IHsgR2FtZVBsYXRmb3JtVHlwZSB9IGZyb20gXCIuLi9QbGF0Zm9ybS9HYW1lUGxhdGZvcm1UeXBlXCI7XG5pbXBvcnQgQnRuR2V0QXdhcmRCeVZpZGVvIGZyb20gXCIuL0J0bkdldEF3YXJkQnlWaWRlb1wiO1xuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vQ29tbW9uL1VJTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luVUkgZXh0ZW5kcyB5eUNvbXBvbmVudCBpbXBsZW1lbnRzIElVSSB7XG5cbiAgICAvKirlnLrmma8vVUnnsbvlnosgKi9cbiAgICBwdWJsaWMgZ2V0IHVpVHlwZSgpIHsgcmV0dXJuIHRoaXMuX3VpVHlwZTsgfVxuICAgIHByb3RlY3RlZCBfdWlUeXBlOiBHbG9iYWxFbnVtLlVJID0gR2xvYmFsRW51bS5VSS53aW5VSTtcblxuICAgIC8qKumHkeW4gSAqL1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcm90ZWN0ZWQgYmFzZUdvbGRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIHByb3RlY3RlZCBiYXNlR29sZDogbnVtYmVyO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByb3RlY3RlZCBzcGVHb2xkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgc3BlR29sZDogbnVtYmVyO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByb3RlY3RlZCB0b3RhbEdvbGRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy/kuIDkuKrmjInpkq7moLnmja7mmK/lkKbli77pgInpgInmi6nop4bpopHpooblj5bnmoTmlrnmoYjvvJpcbiAgICAvKirpooblj5bmjInpkq4gKi9cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcm90ZWN0ZWQgYnRuR2V0QXdhcmROb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgYnRuR2V0QXdhcmQ6IEJ0bkdldEF3YXJkQnlWaWRlbztcblxuICAgIC8v6KeG6aKR5LiO5pmu6YCa6aKG5Y+W5YiG5byA55qE5pa55qGI77yaXG4gICAgLyoq5Y2V5YCN6aKG5Y+WICovXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIGJ0bkdldEF3YXJkU2luZ2xlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAvKirop4bpopHpooblj5YgKi9cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcm90ZWN0ZWQgYnRuVmlkZW86IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLyoq5LiL5LiA5YWz5oyJ6ZKuICovXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIGJ0bk5leHRMZXZlbDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIGJ0bkNvbWVCYWNrTG9iYnk6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByb3RlY3RlZCBidG5TaGFyZVZpZGVvOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJvdGVjdGVkIHNoYXJlR29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIGFjY2VwdGVkR29sZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGRhdGE6IGFueTtcblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmFjY2VwdGVkR29sZCA9IGZhbHNlO1xuICAgICAgICBpZiAoISF0aGlzLmJ0bkdldEF3YXJkTm9kZSkge1xuICAgICAgICAgICAgdGhpcy5idG5HZXRBd2FyZCA9IHRoaXMuYnRuR2V0QXdhcmROb2RlLmdldENvbXBvbmVudChCdG5HZXRBd2FyZEJ5VmlkZW8pO1xuICAgICAgICAgICAgdGhpcy5idG5HZXRBd2FyZC5pbml0KHtcbiAgICAgICAgICAgICAgICBjYjogdGhpcy5vbkJ0bkdldEF3YXJkLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdnID0gdGhpcy5idG5OZXh0TGV2ZWwuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XG4gICAgICAgIGlmICghIXdnKSB7XG4gICAgICAgICAgICB3Zy5pc0FsaWduQm90dG9tID0gZmFsc2U7XG4gICAgICAgICAgICB3Zy5pc0FsaWduVmVydGljYWxDZW50ZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYWNjZXB0ZWRHb2xkID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaYvuekulVJXG4gICAgICogQHBhcmFtIGRhdGEg5YWz5Y2h5oiQ57upXG4gICAgICovXG4gICAgcHVibGljIHNob3coZGF0YT86IGFueSkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgbGV0IHVpID0gVUlNYW5hZ2VyLmdldFVJKEdsb2JhbEVudW0uVUkubGV2ZWxJbmZvKTtcbiAgICAgICAgICAgIGlmICghdWkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6I635Y+W5YWz5Y2h5L+h5oGvVUnohJrmnKzlpLHotKXvvIzml6Dms5XmmL7npLrog5zliKnnlYzpnaLvvIFcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB1aS5nZXREYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYnRuTmV4dExldmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ0bkNvbWVCYWNrTG9iYnkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGxldCB0b0JpZyA9IGNjLnNjYWxlVG8oMC41LCAxLCAxKTtcbiAgICAgICAgdG9CaWcuZWFzaW5nKGNjLmVhc2VJbk91dCgyKSk7XG4gICAgICAgIGxldCB0b1NtYWxsID0gY2Muc2NhbGVUbygwLjUsIDAuOSwgMC45KTtcbiAgICAgICAgdG9TbWFsbC5lYXNpbmcoY2MuZWFzZUluT3V0KDIpKTtcbiAgICAgICAgLy/lpLTmnaHlubPlj7DmiZPlvIDliIbkuqvlvZXlsY/mjInpkq5cbiAgICAgICAgaWYgKCEhdGhpcy5idG5TaGFyZVZpZGVvKSB7XG4gICAgICAgICAgICBpZiAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy50eXBlID09IEdhbWVQbGF0Zm9ybVR5cGUuVFQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNoYXJlVmlkZW8uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNoYXJlVmlkZW8uc2V0U2NhbGUoMSwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TaGFyZVZpZGVvLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKHRvQmlnLmNsb25lKCksIHRvU21hbGwuY2xvbmUoKSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TaGFyZVZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v6aKG5Y+W5oyJ6ZKuOlxuICAgICAgICB0aGlzLnNob3dCdG5HZXRBd2FyZCgpO1xuXG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5VSUV2ZW50LmVudGVyZWQsIHRoaXMudWlUeXBlKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHNob3dCdG5HZXRBd2FyZCgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5idG5HZXRBd2FyZCkge1xuICAgICAgICAgICAgdGhpcy5idG5HZXRBd2FyZC5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ0bkdldEF3YXJkU2luZ2xlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJ0blZpZGVvLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIGhpZGVCdG5HZXRBd2FyZCgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5idG5HZXRBd2FyZCkge1xuICAgICAgICAgICAgdGhpcy5idG5HZXRBd2FyZC5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ0bkdldEF3YXJkU2luZ2xlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5idG5WaWRlby5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICBpZiAoISF0aGlzLmJ0blNoYXJlVmlkZW8pIHtcbiAgICAgICAgICAgIHRoaXMuYnRuU2hhcmVWaWRlby5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5VSUV2ZW50LmV4aXRlZCwgdGhpcy51aVR5cGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXREYXRhKGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmJhc2VHb2xkID0gZGF0YS5iYXNlR29sZDtcbiAgICAgICAgdGhpcy5iYXNlR29sZExhYmVsLnN0cmluZyA9IHRoaXMuYmFzZUdvbGQudG9TdHJpbmcoKTtcblxuICAgICAgICB0aGlzLnNwZUdvbGQgPSBkYXRhLnNwZUdvbGQ7XG4gICAgICAgIHRoaXMuc3BlR29sZExhYmVsLnN0cmluZyA9IHRoaXMuc3BlR29sZC50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMudG90YWxHb2xkTGFiZWwuc3RyaW5nID0gdGhpcy5nZXRUb3RhbEdvbGQoKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRUb3RhbEdvbGQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZUdvbGQgKyB0aGlzLnNwZUdvbGQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aKG5Y+W5oyJ6ZKu54K55Ye75Zue6LCDXG4gICAgICogQHBhcmFtIHNob3dWaWRlbyDmmK/lkKbop4LnnIvop4bpopHpooblj5bkuInlgI3lpZblirFcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25CdG5HZXRBd2FyZChzaG93VmlkZW86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCEhc2hvd1ZpZGVvKSB7XG4gICAgICAgICAgICBpZiAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy52aWRlbykge1xuICAgICAgICAgICAgICAgIHRoaXMub25CdG5WaWRlbygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlVJRXZlbnQuc2hvd1RpcCwgXCLmmoLml7bmsqHmnInop4bpopHlk6Z+XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMub25CdG5HZXRHb2xkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uQnRuR2V0R29sZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/op4bpopHkuInlgI1cbiAgICBwcm90ZWN0ZWQgb25CdG5WaWRlbygpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlDbGlja0J0bik7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0RLRXZlbnQuc2hvd1ZpZGVvLCB0aGlzLm9uVmlkZW9GaW5pc2guYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvblZpZGVvRmluaXNoKCkge1xuICAgICAgICB0aGlzLmFkZEdvbGQodGhpcy5nZXRUb3RhbEdvbGQoKSAqIDUsIHRoaXMub25HZXRHb2xkRmluaXNoLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICAvL+aZrumAmumihuWPllxuICAgIHByb3RlY3RlZCBvbkJ0bkdldEdvbGQoKSB7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQXVkaW9FdmVudC5wbGF5Q2xpY2tCdG4pO1xuICAgICAgICB0aGlzLmFkZEdvbGQodGhpcy5nZXRUb3RhbEdvbGQoKSwgdGhpcy5vbkdldEdvbGRGaW5pc2guYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLy/kuIvkuIDlhbNcbiAgICBwcm90ZWN0ZWQgb25CdG5OZXh0TGV2ZWwoKSB7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQXVkaW9FdmVudC5wbGF5Q2xpY2tCdG4pO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkRpcmVjdG9yRXZlbnQucGxheU5leHRMZXZlbCk7XG4gICAgfVxuXG4gICAgLy/ph5HluIHpooblj5blrozmiJDlkI7mmL7npLrkuIvkuIDlhbPlkozov5Tlm57pppbpobXmjInpkq5cbiAgICBwcm90ZWN0ZWQgb25HZXRHb2xkRmluaXNoKCkge1xuICAgICAgICAvLyB0aGlzLmJ0bkdldEF3YXJkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlQnRuR2V0QXdhcmQoKTtcbiAgICAgICAgdGhpcy5idG5OZXh0TGV2ZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idG5Db21lQmFja0xvYmJ5LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0QnRuc1Bvc05vcm1hbCgpO1xuICAgICAgICB0aGlzLnNob3dCYW5uZXJPckluc2VydEFkKCk7XG4gICAgfVxuICAgIC8qKuaYvuekumJhbm5lcuaIluaPkuWxj+W5v+WRiiAqL1xuICAgIHByb3RlY3RlZCBzaG93QmFubmVyT3JJbnNlcnRBZCgpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TREtFdmVudC5zaG93QmFubmVyKTtcbiAgICB9XG5cbiAgICAvKirorr7nva7mjInpkq7lnZDmoIfkuLrluLjop4TnirbmgIEgKi9cbiAgICBwcm90ZWN0ZWQgc2V0QnRuc1Bvc05vcm1hbCgpIHtcbiAgICAgICAgdGhpcy5idG5OZXh0TGV2ZWwueSA9IDMxMCArIHRoaXMuYnRuTmV4dExldmVsLmhlaWdodCAqIHRoaXMuYnRuTmV4dExldmVsLmFuY2hvclkgLSB0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLmFuY2hvclk7XG4gICAgfVxuXG4gICAgLyoq5pKt5pS+6YeR5biB5Yqo55S76I635b6X6YeR5biBICovXG4gICAgcHJvdGVjdGVkIGFkZEdvbGQoZ29sZDogbnVtYmVyLCBjYjogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuYWNjZXB0ZWRHb2xkKSB7XG4gICAgICAgICAgICAhIWNiICYmIGNiKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY2NlcHRlZEdvbGQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlVJRXZlbnQucGxheUdvbGRBbWluLCB7XG4gICAgICAgICAgICBjYjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUGxheWVyRGF0YUV2ZW50LnVwZGF0ZVBsYXllckRhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJnYW1lRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IFwiZ2FtZURhdGEuYXNzZXQuZ29sZFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZ29sZCxcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCIrXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAhIWNiICYmIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy/ov5Tlm57pppbpobVcbiAgICBwcm90ZWN0ZWQgb25CdG5SZXR1cm5Mb2JieSgpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlDbGlja0J0bik7XG4gICAgICAgIHRoaXMuYWRkR29sZCh0aGlzLmdldFRvdGFsR29sZCgpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkRpcmVjdG9yRXZlbnQuZW50ZXJMb2JieSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5aS05p2h5bmz5Y+w5b2V5bGP5YiG5LqrXG4gICAgcHJvdGVjdGVkIG9uQnRuU2hhcmVWaWRlbygpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TREtFdmVudC5zaGFyZVJlY29yZCwgdGhpcy5vblNoYXJlVmlkZW9GaW5pc2guYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvblNoYXJlVmlkZW9GaW5pc2goKSB7XG4gICAgICAgIHRoaXMuYnRuU2hhcmVWaWRlby5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLmJ0blNoYXJlVmlkZW8uYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=