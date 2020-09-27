
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/ALD/ALDManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3f82dmDWDZCgrYflSOuXZqG', 'ALDManager');
// myGame/Script/ALD/ALDManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
//微信小游戏阿拉丁数据统计管理器
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ALDManager = /** @class */ (function (_super) {
    __extends(ALDManager, _super);
    function ALDManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiName = 'wx';
        return _this;
    }
    ALDManager.prototype.init = function () {
        this.api = window[this.apiName];
        this.onEvents();
    };
    ALDManager.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.ALDEvent.levelStart, this.onStart, this);
        this.on(GameEventType_1.EventType.ALDEvent.levelWin, this.onLevelWin, this);
        this.on(GameEventType_1.EventType.ALDEvent.levelLose, this.onLevelLose, this);
    };
    /**
     * 关卡开始
     * @param lv    关卡编号
     */
    ALDManager.prototype.onStart = function (lv) {
        var data = {
            stageId: lv.toString(),
            stageName: "第" + lv + "关",
            userId: "" //玩家id
        };
        this.api.aldStage.onStart(data);
    };
    /**
     * 关卡中事件
     * @param data
     * @param data.stageId      关卡id
     * @param data.stageName    关卡名称
     * @param data.userId       用户id
     * @param data.event        事件名称
     * @param data.params       事件参数
     * @param data.params.itemName  道具名称
     * @param data.params.itemCount 道具数量
     * @param data.params.desc      描述
     * @param data.params.itemMoney 道具价格
     */
    ALDManager.prototype.onRunning = function (data) {
        this.api.aldStage.onRunning(data);
    };
    /**
     * 关卡完成
     * @param data
     * @param data.stageId      关卡id
     * @param data.stageName    关卡名称
     * @param data.userId       用户id，可选
     * @param data.event        关卡完成  关卡进行中，用户触发的操作    该字段必传
     * @param data.params
     * @param data.params.desc  描述
     */
    ALDManager.prototype.onEnd = function (data) {
        if (null == data) {
            data = {
                stageId: "1",
                stageName: "第一关",
                event: "complete",
                params: {
                    desc: "关卡完成"
                }
            };
        }
        this.api.aldStage.onEnd(data);
    };
    /**
     * 关卡胜利
     * @param lv 关卡编号
     */
    ALDManager.prototype.onLevelWin = function (lv) {
        var data = this.convertData(lv);
        data.event = "complete";
        data.params = {
            desc: "关卡胜利",
        };
        this.api.aldStage.onEnd(data);
    };
    /**
     * 关卡失败
     * @param lv 关卡编号
     */
    ALDManager.prototype.onLevelLose = function (lv) {
        var data = this.convertData(lv);
        data.event = "fail";
        data.params = {
            desc: "关卡失败",
        };
        this.api.aldStage.onEnd(data);
    };
    /**
     * 通过关卡编号生成阿拉丁统计需要的基础数据
     * @param lv
     */
    ALDManager.prototype.convertData = function (lv) {
        return {
            stageId: lv.toString(),
            stageName: "第" + lv + "关",
            userId: "" //玩家id
        };
    };
    ALDManager = __decorate([
        ccclass
    ], ALDManager);
    return ALDManager;
}(yyComponent_1.default));
exports.default = ALDManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEFMRFxcQUxETWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDhEQUF5RDtBQUV6RCxpQkFBaUI7QUFDWCxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFXO0lBRG5EO1FBQUEscUVBc0dDO1FBcEdXLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBb0duQyxDQUFDO0lBbEdVLHlCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDUyw2QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7O09BR0c7SUFDSyw0QkFBTyxHQUFmLFVBQWdCLEVBQVU7UUFDdEIsSUFBSSxJQUFJLEdBQUc7WUFDUCxPQUFPLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN0QixTQUFTLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHO1lBQ3pCLE1BQU0sRUFBRSxFQUFFLENBQXNCLE1BQU07U0FDekMsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0ssOEJBQVMsR0FBakIsVUFBa0IsSUFBSTtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNEOzs7Ozs7Ozs7T0FTRztJQUNLLDBCQUFLLEdBQWIsVUFBYyxJQUFJO1FBQ2QsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2QsSUFBSSxHQUFHO2dCQUNILE9BQU8sRUFBRSxHQUFHO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxNQUFNO2lCQUNmO2FBQ0osQ0FBQTtTQUNKO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDSywrQkFBVSxHQUFsQixVQUFtQixFQUFVO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLElBQUksRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ssZ0NBQVcsR0FBbkIsVUFBb0IsRUFBVTtRQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixJQUFJLEVBQUUsTUFBTTtTQUNmLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGdDQUFXLEdBQW5CLFVBQW9CLEVBQVU7UUFDMUIsT0FBTztZQUNILE9BQU8sRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3RCLFNBQVMsRUFBRSxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUc7WUFDekIsTUFBTSxFQUFFLEVBQUUsQ0FBc0IsTUFBTTtTQUN6QyxDQUFDO0lBQ04sQ0FBQztJQXBHZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQXFHOUI7SUFBRCxpQkFBQztDQXJHRCxBQXFHQyxDQXJHdUMscUJBQVcsR0FxR2xEO2tCQXJHb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5eUNvbXBvbmVudCBmcm9tIFwiLi4vQ29tbW9uL3l5Q29tcG9uZW50XCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuXG4vL+W+ruS/oeWwj+a4uOaIj+mYv+aLieS4geaVsOaNrue7n+iuoeeuoeeQhuWZqFxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFMRE1hbmFnZXIgZXh0ZW5kcyB5eUNvbXBvbmVudCB7XG4gICAgcHJpdmF0ZSBhcGlOYW1lOiBzdHJpbmcgPSAnd3gnO1xuICAgIHByaXZhdGUgYXBpOiBhbnk7XG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuYXBpID0gd2luZG93W3RoaXMuYXBpTmFtZV07XG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uRXZlbnRzKCkge1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5BTERFdmVudC5sZXZlbFN0YXJ0LCB0aGlzLm9uU3RhcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5BTERFdmVudC5sZXZlbFdpbiwgdGhpcy5vbkxldmVsV2luLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuQUxERXZlbnQubGV2ZWxMb3NlLCB0aGlzLm9uTGV2ZWxMb3NlLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPljaHlvIDlp4tcbiAgICAgKiBAcGFyYW0gbHYgICAg5YWz5Y2h57yW5Y+3XG4gICAgICovXG4gICAgcHJpdmF0ZSBvblN0YXJ0KGx2OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBzdGFnZUlkOiBsdi50b1N0cmluZygpLCAgICAgICAgIC8v5YWz5Y2haWRcbiAgICAgICAgICAgIHN0YWdlTmFtZTogXCLnrKxcIiArIGx2ICsgXCLlhbNcIiwgICAgLy/lhbPljaHlkI3np7BcbiAgICAgICAgICAgIHVzZXJJZDogXCJcIiAgICAgICAgICAgICAgICAgICAgICAvL+eOqeWutmlkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXBpLmFsZFN0YWdlLm9uU3RhcnQoZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWFs+WNoeS4reS6i+S7tlxuICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAqIEBwYXJhbSBkYXRhLnN0YWdlSWQgICAgICDlhbPljaFpZFxuICAgICAqIEBwYXJhbSBkYXRhLnN0YWdlTmFtZSAgICDlhbPljaHlkI3np7BcbiAgICAgKiBAcGFyYW0gZGF0YS51c2VySWQgICAgICAg55So5oi3aWRcbiAgICAgKiBAcGFyYW0gZGF0YS5ldmVudCAgICAgICAg5LqL5Lu25ZCN56ewXG4gICAgICogQHBhcmFtIGRhdGEucGFyYW1zICAgICAgIOS6i+S7tuWPguaVsFxuICAgICAqIEBwYXJhbSBkYXRhLnBhcmFtcy5pdGVtTmFtZSAg6YGT5YW35ZCN56ewXG4gICAgICogQHBhcmFtIGRhdGEucGFyYW1zLml0ZW1Db3VudCDpgZPlhbfmlbDph49cbiAgICAgKiBAcGFyYW0gZGF0YS5wYXJhbXMuZGVzYyAgICAgIOaPj+i/sFxuICAgICAqIEBwYXJhbSBkYXRhLnBhcmFtcy5pdGVtTW9uZXkg6YGT5YW35Lu35qC8IFxuICAgICAqL1xuICAgIHByaXZhdGUgb25SdW5uaW5nKGRhdGEpIHtcbiAgICAgICAgdGhpcy5hcGkuYWxkU3RhZ2Uub25SdW5uaW5nKGRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlhbPljaHlrozmiJBcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKiBAcGFyYW0gZGF0YS5zdGFnZUlkICAgICAg5YWz5Y2haWRcbiAgICAgKiBAcGFyYW0gZGF0YS5zdGFnZU5hbWUgICAg5YWz5Y2h5ZCN56ewXG4gICAgICogQHBhcmFtIGRhdGEudXNlcklkICAgICAgIOeUqOaIt2lk77yM5Y+v6YCJXG4gICAgICogQHBhcmFtIGRhdGEuZXZlbnQgICAgICAgIOWFs+WNoeWujOaIkCAg5YWz5Y2h6L+b6KGM5Lit77yM55So5oi36Kem5Y+R55qE5pON5L2cICAgIOivpeWtl+auteW/heS8oFxuICAgICAqIEBwYXJhbSBkYXRhLnBhcmFtc1xuICAgICAqIEBwYXJhbSBkYXRhLnBhcmFtcy5kZXNjICDmj4/ov7BcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRW5kKGRhdGEpIHtcbiAgICAgICAgaWYgKG51bGwgPT0gZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBzdGFnZUlkOiBcIjFcIixcbiAgICAgICAgICAgICAgICBzdGFnZU5hbWU6IFwi56ys5LiA5YWzXCIsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IFwiY29tcGxldGVcIixcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogXCLlhbPljaHlrozmiJBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwaS5hbGRTdGFnZS5vbkVuZChkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPljaHog5zliKlcbiAgICAgKiBAcGFyYW0gbHYg5YWz5Y2h57yW5Y+3XG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkxldmVsV2luKGx2OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmNvbnZlcnREYXRhKGx2KTtcbiAgICAgICAgZGF0YS5ldmVudCA9IFwiY29tcGxldGVcIjtcbiAgICAgICAgZGF0YS5wYXJhbXMgPSB7XG4gICAgICAgICAgICBkZXNjOiBcIuWFs+WNoeiDnOWIqVwiLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFwaS5hbGRTdGFnZS5vbkVuZChkYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5YWz5Y2h5aSx6LSlXG4gICAgICogQHBhcmFtIGx2IOWFs+WNoee8luWPt1xuICAgICAqL1xuICAgIHByaXZhdGUgb25MZXZlbExvc2UobHY6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuY29udmVydERhdGEobHYpO1xuICAgICAgICBkYXRhLmV2ZW50ID0gXCJmYWlsXCI7XG4gICAgICAgIGRhdGEucGFyYW1zID0ge1xuICAgICAgICAgICAgZGVzYzogXCLlhbPljaHlpLHotKVcIixcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hcGkuYWxkU3RhZ2Uub25FbmQoZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YCa6L+H5YWz5Y2h57yW5Y+355Sf5oiQ6Zi/5ouJ5LiB57uf6K6h6ZyA6KaB55qE5Z+656GA5pWw5o2uXG4gICAgICogQHBhcmFtIGx2IFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydERhdGEobHY6IG51bWJlcik6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFnZUlkOiBsdi50b1N0cmluZygpLCAgICAgICAgIC8v5YWz5Y2haWRcbiAgICAgICAgICAgIHN0YWdlTmFtZTogXCLnrKxcIiArIGx2ICsgXCLlhbNcIiwgICAgLy/lhbPljaHlkI3np7BcbiAgICAgICAgICAgIHVzZXJJZDogXCJcIiAgICAgICAgICAgICAgICAgICAgICAvL+eOqeWutmlkXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19