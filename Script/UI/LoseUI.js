
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/LoseUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '87e29KOVF1I+bunX9j/1JoS', 'LoseUI');
// myGame/Script/UI/LoseUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var GamePlatform_1 = require("../Platform/GamePlatform");
var GamePlatformType_1 = require("../Platform/GamePlatformType");
var BtnGetAwardByVideo_1 = require("./BtnGetAwardByVideo");
var UIManager_1 = require("../Common/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoseUI = /** @class */ (function (_super) {
    __extends(LoseUI, _super);
    function LoseUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uiType = GlobalEnum_1.GlobalEnum.UI.loseUI;
        _this.baseGoldLabel = null;
        /**领取按钮 */
        _this.btnGetAwardNode = null;
        _this.btnReplay = null;
        _this.btnComeBackLobby = null;
        _this.btnShareVideo = null;
        _this.shareGold = null;
        _this.acceptedGold = false;
        return _this;
    }
    Object.defineProperty(LoseUI.prototype, "uiType", {
        /**场景/UI类型 */
        get: function () { return this._uiType; },
        enumerable: true,
        configurable: true
    });
    LoseUI.prototype.init = function () {
        this.acceptedGold = false;
        this.btnGetAward = this.btnGetAwardNode.getComponent(BtnGetAwardByVideo_1.default);
        this.btnGetAward.init({
            cb: this.onBtnGetAward,
            target: this
        });
        var wg = this.btnReplay.getComponent(cc.Widget);
        if (!!wg) {
            wg.isAlignBottom = false;
            wg.isAlignVerticalCenter = false;
        }
    };
    LoseUI.prototype.reset = function () {
        this.acceptedGold = false;
    };
    /**
     * 显示UI
     * @param data 关卡成绩
     */
    LoseUI.prototype.show = function (data) {
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
        // this.btnGetGold.active = true;
        this.btnReplay.active = false;
        this.btnComeBackLobby.active = false;
        var toBig = cc.scaleTo(0.5, 1, 1);
        toBig.easing(cc.easeInOut(2));
        var toSmall = cc.scaleTo(0.5, 0.9, 0.9);
        toSmall.easing(cc.easeInOut(2));
        //头条平台打开分享录屏按钮
        if (GamePlatform_1.default.instance.Config.type == GamePlatformType_1.GamePlatformType.TT) {
            this.btnShareVideo.active = true;
            this.btnShareVideo.setScale(1, 1);
            this.btnShareVideo.runAction(cc.repeatForever(cc.sequence(toBig.clone(), toSmall.clone())));
        }
        else {
            this.btnShareVideo.active = false;
        }
        this.btnGetAward.show();
        this.setData(data);
        this.emit(GameEventType_1.EventType.UIEvent.entered, this.uiType);
    };
    LoseUI.prototype.hide = function () {
        if (this.btnShareVideo.active) {
            this.btnShareVideo.stopAllActions();
        }
        this.node.active = false;
        this.emit(GameEventType_1.EventType.UIEvent.exited, this.uiType);
    };
    LoseUI.prototype.setData = function (data) {
        this.data = data;
        this.baseGold = data.gold;
        this.baseGoldLabel.string = this.baseGold.toString();
    };
    LoseUI.prototype.getTotalGold = function () {
        return this.baseGold;
    };
    //返回首页
    LoseUI.prototype.onBtnLobby = function () {
        var _this = this;
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.addGold(this.getTotalGold(), function () {
            _this.emit(GameEventType_1.EventType.DirectorEvent.enterLobby, _this);
        });
    };
    //重玩
    LoseUI.prototype.onBtnReplay = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.emit(GameEventType_1.EventType.DirectorEvent.replayCurLevel);
    };
    /**显示banner或插屏广告 */
    LoseUI.prototype.showBannerOrInsertAd = function () {
        this.emit(GameEventType_1.EventType.SDKEvent.showBanner);
    };
    /**设置按钮坐标为常规状态 */
    LoseUI.prototype.setBtnsPosNormal = function () {
        this.btnReplay.y = 310 + this.btnReplay.height * this.btnReplay.anchorY - this.node.height * this.node.anchorY;
    };
    /**
     * 领取按钮点击回调
     * @param showVideo 是否观看视频领取三倍奖励
     */
    LoseUI.prototype.onBtnGetAward = function (showVideo) {
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
    LoseUI.prototype.onBtnVideo = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.emit(GameEventType_1.EventType.SDKEvent.showVideo, this.onVideoFinish.bind(this));
    };
    LoseUI.prototype.onVideoFinish = function () {
        this.addGold(this.getTotalGold() * 3, this.onGetGoldFinish.bind(this));
    };
    LoseUI.prototype.onGetGoldFinish = function () {
        //隐藏领取按钮，显示返回和重玩按钮
        this.btnGetAwardNode.active = false;
        this.btnReplay.active = true;
        this.btnComeBackLobby.active = true;
        this.setBtnsPosNormal();
        this.showBannerOrInsertAd();
    };
    //普通领取
    LoseUI.prototype.onBtnGetGold = function () {
        this.emit(GameEventType_1.EventType.AudioEvent.playClickBtn);
        this.addGold(this.getTotalGold(), this.onGetGoldFinish.bind(this));
    };
    LoseUI.prototype.addGold = function (gold, cb) {
        var _this = this;
        if (this.acceptedGold) {
            cb();
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
                cb();
            }
        });
    };
    //头条平台录屏分享
    LoseUI.prototype.onBtnShareVideo = function () {
        this.emit(GameEventType_1.EventType.SDKEvent.shareRecord, this.onShareVideoFinish.bind(this));
    };
    LoseUI.prototype.onShareVideoFinish = function () {
        this.btnShareVideo.stopAllActions();
        this.btnShareVideo.active = false;
    };
    __decorate([
        property(cc.Label)
    ], LoseUI.prototype, "baseGoldLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LoseUI.prototype, "btnGetAwardNode", void 0);
    __decorate([
        property(cc.Node)
    ], LoseUI.prototype, "btnReplay", void 0);
    __decorate([
        property(cc.Node)
    ], LoseUI.prototype, "btnComeBackLobby", void 0);
    __decorate([
        property(cc.Node)
    ], LoseUI.prototype, "btnShareVideo", void 0);
    __decorate([
        property(cc.Label)
    ], LoseUI.prototype, "shareGold", void 0);
    LoseUI = __decorate([
        ccclass
    ], LoseUI);
    return LoseUI;
}(yyComponent_1.default));
exports.default = LoseUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxMb3NlVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCw4REFBeUQ7QUFFekQsd0RBQXVEO0FBQ3ZELHlEQUFvRDtBQUNwRCxpRUFBZ0U7QUFDaEUsMkRBQXNEO0FBQ3RELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQW9DLDBCQUFXO0lBRC9DO1FBQUEscUVBNExDO1FBdkxhLGFBQU8sR0FBa0IsdUJBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRzlDLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBR3pDLFVBQVU7UUFFQSxxQkFBZSxHQUFZLElBQUksQ0FBQztRQUdoQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUVqQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLGtCQUFZLEdBQVksS0FBSyxDQUFDOztJQW9LNUMsQ0FBQztJQXhMRyxzQkFBVywwQkFBTTtRQURqQixhQUFhO2FBQ2IsY0FBc0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUF3QnJDLHFCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLDRCQUFrQixDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDbEIsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ3RCLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFB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Q3BDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBbkxEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ3NCO0lBS3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ3dCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ2tCO0lBRXBDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ3lCO0lBRTNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ3NCO0lBRXhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ2tCO0lBckJwQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBMkwxQjtJQUFELGFBQUM7Q0EzTEQsQUEyTEMsQ0EzTG1DLHFCQUFXLEdBMkw5QztrQkEzTG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeXlDb21wb25lbnQgZnJvbSBcIi4uL0NvbW1vbi95eUNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcbmltcG9ydCB7IElVSSB9IGZyb20gXCIuL0lVSVwiO1xuaW1wb3J0IHsgR2xvYmFsRW51bSB9IGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HbG9iYWxFbnVtXCI7XG5pbXBvcnQgR2FtZVBsYXRmb3JtIGZyb20gXCIuLi9QbGF0Zm9ybS9HYW1lUGxhdGZvcm1cIjtcbmltcG9ydCB7IEdhbWVQbGF0Zm9ybVR5cGUgfSBmcm9tIFwiLi4vUGxhdGZvcm0vR2FtZVBsYXRmb3JtVHlwZVwiO1xuaW1wb3J0IEJ0bkdldEF3YXJkQnlWaWRlbyBmcm9tIFwiLi9CdG5HZXRBd2FyZEJ5VmlkZW9cIjtcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0NvbW1vbi9VSU1hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvc2VVSSBleHRlbmRzIHl5Q29tcG9uZW50IGltcGxlbWVudHMgSVVJIHtcblxuICAgIC8qKuWcuuaZry9VSeexu+WeiyAqL1xuICAgIHB1YmxpYyBnZXQgdWlUeXBlKCkgeyByZXR1cm4gdGhpcy5fdWlUeXBlOyB9XG4gICAgcHJvdGVjdGVkIF91aVR5cGU6IEdsb2JhbEVudW0uVUkgPSBHbG9iYWxFbnVtLlVJLmxvc2VVSTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcm90ZWN0ZWQgYmFzZUdvbGRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIHByb3RlY3RlZCBiYXNlR29sZDogbnVtYmVyO1xuXG4gICAgLyoq6aKG5Y+W5oyJ6ZKuICovXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIGJ0bkdldEF3YXJkTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJvdGVjdGVkIGJ0bkdldEF3YXJkOiBCdG5HZXRBd2FyZEJ5VmlkZW87XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIGJ0blJlcGxheTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvdGVjdGVkIGJ0bkNvbWVCYWNrTG9iYnk6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByb3RlY3RlZCBidG5TaGFyZVZpZGVvOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJvdGVjdGVkIHNoYXJlR29sZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIGFjY2VwdGVkR29sZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGRhdGE6IGFueTtcblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmFjY2VwdGVkR29sZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ0bkdldEF3YXJkID0gdGhpcy5idG5HZXRBd2FyZE5vZGUuZ2V0Q29tcG9uZW50KEJ0bkdldEF3YXJkQnlWaWRlbyk7XG4gICAgICAgIHRoaXMuYnRuR2V0QXdhcmQuaW5pdCh7XG4gICAgICAgICAgICBjYjogdGhpcy5vbkJ0bkdldEF3YXJkLFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd2cgPSB0aGlzLmJ0blJlcGxheS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgaWYgKCEhd2cpIHtcbiAgICAgICAgICAgIHdnLmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcbiAgICAgICAgICAgIHdnLmlzQWxpZ25WZXJ0aWNhbENlbnRlciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hY2NlcHRlZEdvbGQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pi+56S6VUlcbiAgICAgKiBAcGFyYW0gZGF0YSDlhbPljaHmiJDnu6lcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdyhkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGxldCB1aSA9IFVJTWFuYWdlci5nZXRVSShHbG9iYWxFbnVtLlVJLmxldmVsSW5mbyk7XG4gICAgICAgICAgICBpZiAoIXVpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuiOt+WPluWFs+WNoeS/oeaBr1VJ6ISa5pys5aSx6LSl77yM5peg5rOV5pi+56S66IOc5Yip55WM6Z2i77yBXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gdWkuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLmJ0bkdldEdvbGQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idG5SZXBsYXkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnRuQ29tZUJhY2tMb2JieS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHRvQmlnID0gY2Muc2NhbGVUbygwLjUsIDEsIDEpO1xuICAgICAgICB0b0JpZy5lYXNpbmcoY2MuZWFzZUluT3V0KDIpKTtcbiAgICAgICAgbGV0IHRvU21hbGwgPSBjYy5zY2FsZVRvKDAuNSwgMC45LCAwLjkpO1xuICAgICAgICB0b1NtYWxsLmVhc2luZyhjYy5lYXNlSW5PdXQoMikpO1xuICAgICAgICAvL+WktOadoeW5s+WPsOaJk+W8gOWIhuS6q+W9leWxj+aMiemSrlxuICAgICAgICBpZiAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy50eXBlID09IEdhbWVQbGF0Zm9ybVR5cGUuVFQpIHtcbiAgICAgICAgICAgIHRoaXMuYnRuU2hhcmVWaWRlby5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5idG5TaGFyZVZpZGVvLnNldFNjYWxlKDEsIDEpO1xuICAgICAgICAgICAgdGhpcy5idG5TaGFyZVZpZGVvLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKHRvQmlnLmNsb25lKCksIHRvU21hbGwuY2xvbmUoKSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnRuU2hhcmVWaWRlby5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ0bkdldEF3YXJkLnNob3coKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlVJRXZlbnQuZW50ZXJlZCwgdGhpcy51aVR5cGUpO1xuICAgIH1cbiAgICBwdWJsaWMgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnRuU2hhcmVWaWRlby5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYnRuU2hhcmVWaWRlby5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5VSUV2ZW50LmV4aXRlZCwgdGhpcy51aVR5cGUpO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIHNldERhdGEoZGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5iYXNlR29sZCA9IGRhdGEuZ29sZDtcbiAgICAgICAgdGhpcy5iYXNlR29sZExhYmVsLnN0cmluZyA9IHRoaXMuYmFzZUdvbGQudG9TdHJpbmcoKTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRUb3RhbEdvbGQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZUdvbGQ7XG4gICAgfVxuXG4gICAgLy/ov5Tlm57pppbpobVcbiAgICBwcm90ZWN0ZWQgb25CdG5Mb2JieSgpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlDbGlja0J0bik7XG4gICAgICAgIHRoaXMuYWRkR29sZCh0aGlzLmdldFRvdGFsR29sZCgpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkRpcmVjdG9yRXZlbnQuZW50ZXJMb2JieSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL+mHjeeOqVxuICAgIHByb3RlY3RlZCBvbkJ0blJlcGxheSgpIHtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlDbGlja0J0bik7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuRGlyZWN0b3JFdmVudC5yZXBsYXlDdXJMZXZlbCk7XG4gICAgfVxuXG4gICAgLyoq5pi+56S6YmFubmVy5oiW5o+S5bGP5bm/5ZGKICovXG4gICAgcHJvdGVjdGVkIHNob3dCYW5uZXJPckluc2VydEFkKCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNES0V2ZW50LnNob3dCYW5uZXIpO1xuICAgIH1cblxuICAgIC8qKuiuvue9ruaMiemSruWdkOagh+S4uuW4uOinhOeKtuaAgSAqL1xuICAgIHByb3RlY3RlZCBzZXRCdG5zUG9zTm9ybWFsKCkge1xuICAgICAgICB0aGlzLmJ0blJlcGxheS55ID0gMzEwICsgdGhpcy5idG5SZXBsYXkuaGVpZ2h0ICogdGhpcy5idG5SZXBsYXkuYW5jaG9yWSAtIHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuYW5jaG9yWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpooblj5bmjInpkq7ngrnlh7vlm57osINcbiAgICAgKiBAcGFyYW0gc2hvd1ZpZGVvIOaYr+WQpuingueci+inhumikemihuWPluS4ieWAjeWlluWKsVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvbkJ0bkdldEF3YXJkKHNob3dWaWRlbzogYm9vbGVhbikge1xuICAgICAgICBpZiAoISFzaG93VmlkZW8pIHtcbiAgICAgICAgICAgIGlmIChHYW1lUGxhdGZvcm0uaW5zdGFuY2UuQ29uZmlnLnZpZGVvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkJ0blZpZGVvKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5zaG93VGlwLCBcIuaaguaXtuayoeacieinhumikeWTpn5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkJ0bkdldEdvbGQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25CdG5HZXRHb2xkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+inhumikeS4ieWAjVxuICAgIHByb3RlY3RlZCBvbkJ0blZpZGVvKCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkF1ZGlvRXZlbnQucGxheUNsaWNrQnRuKTtcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TREtFdmVudC5zaG93VmlkZW8sIHRoaXMub25WaWRlb0ZpbmlzaC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uVmlkZW9GaW5pc2goKSB7XG4gICAgICAgIHRoaXMuYWRkR29sZCh0aGlzLmdldFRvdGFsR29sZCgpICogMywgdGhpcy5vbkdldEdvbGRGaW5pc2guYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkdldEdvbGRGaW5pc2goKSB7XG4gICAgICAgIC8v6ZqQ6JeP6aKG5Y+W5oyJ6ZKu77yM5pi+56S66L+U5Zue5ZKM6YeN546p5oyJ6ZKuXG4gICAgICAgIHRoaXMuYnRuR2V0QXdhcmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ0blJlcGxheS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmJ0bkNvbWVCYWNrTG9iYnkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRCdG5zUG9zTm9ybWFsKCk7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lck9ySW5zZXJ0QWQoKTtcbiAgICB9XG4gICAgLy/mma7pgJrpooblj5ZcbiAgICBwcm90ZWN0ZWQgb25CdG5HZXRHb2xkKCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkF1ZGlvRXZlbnQucGxheUNsaWNrQnRuKTtcbiAgICAgICAgdGhpcy5hZGRHb2xkKHRoaXMuZ2V0VG90YWxHb2xkKCksIHRoaXMub25HZXRHb2xkRmluaXNoLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRHb2xkKGdvbGQ6IG51bWJlciwgY2I6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmFjY2VwdGVkR29sZCkge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjY2VwdGVkR29sZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuVUlFdmVudC5wbGF5R29sZEFtaW4sIHtcbiAgICAgICAgICAgIGNiOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QbGF5ZXJEYXRhRXZlbnQudXBkYXRlUGxheWVyRGF0YSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImdhbWVEYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogXCJnYW1lRGF0YS5hc3NldC5nb2xkXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBnb2xkLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIitcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy/lpLTmnaHlubPlj7DlvZXlsY/liIbkuqtcbiAgICBwcm90ZWN0ZWQgb25CdG5TaGFyZVZpZGVvKCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNES0V2ZW50LnNoYXJlUmVjb3JkLCB0aGlzLm9uU2hhcmVWaWRlb0ZpbmlzaC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uU2hhcmVWaWRlb0ZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5idG5TaGFyZVZpZGVvLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMuYnRuU2hhcmVWaWRlby5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=