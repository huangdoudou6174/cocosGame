
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/PowerManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7ce098nY5dGqKFFp2ce9UCQ', 'PowerManager');
// myGame/Script/Common/PowerManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameEventType_1 = require("../GameSpecial/GameEventType");
var EventManager_1 = require("./EventManager");
var GameConfig_1 = require("../GameSpecial/GameConfig");
//体力管理器
var PowerManager = /** @class */ (function () {
    function PowerManager() {
    }
    PowerManager.init = function () {
        this.data = this.loadOldData();
        this.startAutoRecoverPower();
        this.onEvents();
    };
    PowerManager.loadOldData = function () {
        var data = new PowerData();
        var oldData = cc.sys.localStorage.getItem(GameConfig_1.default.gameName + "PowerData");
        if (!!oldData) {
            oldData = JSON.parse(oldData);
            data.curPower = oldData.curPower;
            data.lastSaveTime = oldData.lastSaveTime;
        }
        return data;
    };
    PowerManager.startAutoRecoverPower = function () {
        var _this = this;
        var lastTime = this.data.lastSaveTime;
        var now = Date.now();
        var d1 = new Date(lastTime).getDate();
        var d2 = new Date(now).getDate();
        if (d2 > d1) {
            //隔天恢复满体力
            this.data.lastSaveTime = now;
            this.addPower(this.data.maxPower);
            setInterval(this.recoverPower.bind(this), this.data.recoverPowerInterval, this.data.recoverPowerValue);
        }
        else {
            //补充离线时间恢复的体力
            var passTime = now - lastTime;
            var power = Math.floor(passTime / this.data.recoverPowerInterval) * this.data.recoverPowerValue;
            var delay = passTime % this.data.recoverPowerInterval;
            if (power > 0) {
                this.data.lastSaveTime = now - delay;
                this.addPower(power);
            }
            setTimeout(function () {
                setInterval(_this.recoverPower.bind(_this), _this.data.recoverPowerInterval, _this.data.recoverPowerValue);
            }, delay);
        }
    };
    PowerManager.recoverPower = function () {
        this.data.addPower(this.data.recoverPowerValue);
        this.data.updateLastSaveTime();
        this.saveData();
        this.emit(GameEventType_1.EventType.AssetEvent.powerChanged, this.data.curPower);
    };
    PowerManager.onEvents = function () {
        EventManager_1.default.on(GameEventType_1.EventType.AssetEvent.consumePower, this.onConsumePower, this);
        EventManager_1.default.on(GameEventType_1.EventType.AssetEvent.getPower, this.addPower, this);
    };
    /**
     * 获取体力数据
     */
    PowerManager.getData = function () {
        return {
            //能够拥有的最大体力值
            maxPower: this.data.maxPower,
            //当前体力值
            curPower: this.data.curPower,
            //恢复体力需要的总时间，单位：秒
            totalTime: Math.floor(this.data.recoverPowerInterval * 0.001),
            //当前已经过的时间，单位：秒
            curTime: Math.floor((Date.now() - this.data.lastSaveTime) * 0.001),
        };
    };
    PowerManager.saveData = function () {
        cc.sys.localStorage.setItem(GameConfig_1.default.gameName + "powerData", JSON.stringify(this.data));
    };
    PowerManager.addPower = function (v) {
        if (v === void 0) { v = 1; }
        this.data.addPower(v);
        this.saveData();
        this.emit(GameEventType_1.EventType.AssetEvent.powerChanged, this.data.curPower);
    };
    PowerManager.subPower = function (v) {
        if (this.data.subPower(v)) {
            this.saveData();
            this.emit(GameEventType_1.EventType.AssetEvent.powerChanged, this.data.curPower);
        }
    };
    /**
     * 扣除体力，执行回调
     * @param data
     * @param [data.cb]     回调函数
     * @param [data.power]  需要扣除的体力，默认为1
     */
    PowerManager.onConsumePower = function (data) {
        var power = data.power;
        if (undefined == data.power) {
            power = 1;
        }
        if (this.data.subPower(power)) {
            !!data.cb && data.cb();
        }
        else {
            this.tipPowerUnEnough();
        }
    };
    PowerManager.tipPowerUnEnough = function () {
        this.emit(GameEventType_1.EventType.AssetEvent.powerUnEnough, this.data.curPower);
    };
    PowerManager.emit = function (eventType, data) {
        EventManager_1.default.emit(eventType, data);
    };
    PowerManager.data = null;
    return PowerManager;
}());
exports.default = PowerManager;
var PowerData = /** @class */ (function () {
    function PowerData() {
        /**最大体力值 */
        this.maxPower = 10;
        /**体力自动恢复的时间间隔，单位：毫秒 */
        this.recoverPowerInterval = 300000;
        /**体力自动恢复的量 */
        this.recoverPowerValue = 1;
        /**当前体力值 */
        this.curPower = 10;
        /**最后一次恢复体力的时间 */
        this.lastSaveTime = 0;
        this.curPower = 10;
        this.lastSaveTime = Date.now();
    }
    PowerData.prototype.addPower = function (v) {
        if (v === void 0) { v = 1; }
        this.curPower += v;
        if (this.curPower > this.maxPower) {
            this.curPower = this.maxPower;
        }
    };
    PowerData.prototype.subPower = function (v) {
        if (this.curPower < v)
            return false;
        this.curPower -= v;
        return true;
    };
    PowerData.prototype.updateLastSaveTime = function () {
        this.lastSaveTime = Date.now();
    };
    return PowerData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcUG93ZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBeUQ7QUFDekQsK0NBQTBDO0FBQzFDLHdEQUFtRDtBQUVuRCxPQUFPO0FBQ1A7SUFBQTtJQTRHQSxDQUFDO0lBeEdpQixpQkFBSSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ2Msd0JBQVcsR0FBMUI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzNCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBVSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDWCxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNjLGtDQUFxQixHQUFwQztRQUFBLGlCQXVCQztRQXRCRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsSUFBSSxFQUFF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bkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNNLHNDQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFDTCxnQkFBQztBQUFELENBL0JBLEFBK0JDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuaW1wb3J0IEV2ZW50TWFuYWdlciBmcm9tIFwiLi9FdmVudE1hbmFnZXJcIjtcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuLi9HYW1lU3BlY2lhbC9HYW1lQ29uZmlnXCI7XG5cbi8v5L2T5Yqb566h55CG5ZmoXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3dlck1hbmFnZXIge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGF0YTogUG93ZXJEYXRhID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5sb2FkT2xkRGF0YSgpO1xuICAgICAgICB0aGlzLnN0YXJ0QXV0b1JlY292ZXJQb3dlcigpO1xuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRPbGREYXRhKCk6IFBvd2VyRGF0YSB7XG4gICAgICAgIGxldCBkYXRhID0gbmV3IFBvd2VyRGF0YSgpO1xuICAgICAgICBsZXQgb2xkRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShHYW1lQ29uZmlnLmdhbWVOYW1lICsgXCJQb3dlckRhdGFcIik7XG4gICAgICAgIGlmICghIW9sZERhdGEpIHtcbiAgICAgICAgICAgIG9sZERhdGEgPSBKU09OLnBhcnNlKG9sZERhdGEpO1xuICAgICAgICAgICAgZGF0YS5jdXJQb3dlciA9IG9sZERhdGEuY3VyUG93ZXI7XG4gICAgICAgICAgICBkYXRhLmxhc3RTYXZlVGltZSA9IG9sZERhdGEubGFzdFNhdmVUaW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBzdGFydEF1dG9SZWNvdmVyUG93ZXIoKSB7XG4gICAgICAgIGxldCBsYXN0VGltZSA9IHRoaXMuZGF0YS5sYXN0U2F2ZVRpbWU7XG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZDEgPSBuZXcgRGF0ZShsYXN0VGltZSkuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgZDIgPSBuZXcgRGF0ZShub3cpLmdldERhdGUoKTtcbiAgICAgICAgaWYgKGQyID4gZDEpIHtcbiAgICAgICAgICAgIC8v6ZqU5aSp5oGi5aSN5ruh5L2T5YqbXG4gICAgICAgICAgICB0aGlzLmRhdGEubGFzdFNhdmVUaW1lID0gbm93O1xuICAgICAgICAgICAgdGhpcy5hZGRQb3dlcih0aGlzLmRhdGEubWF4UG93ZXIpO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5yZWNvdmVyUG93ZXIuYmluZCh0aGlzKSwgdGhpcy5kYXRhLnJlY292ZXJQb3dlckludGVydmFsLCB0aGlzLmRhdGEucmVjb3ZlclBvd2VyVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/ooaXlhYXnprvnur/ml7bpl7TmgaLlpI3nmoTkvZPliptcbiAgICAgICAgICAgIGxldCBwYXNzVGltZSA9IG5vdyAtIGxhc3RUaW1lO1xuICAgICAgICAgICAgbGV0IHBvd2VyID0gTWF0aC5mbG9vcihwYXNzVGltZSAvIHRoaXMuZGF0YS5yZWNvdmVyUG93ZXJJbnRlcnZhbCkgKiB0aGlzLmRhdGEucmVjb3ZlclBvd2VyVmFsdWU7XG4gICAgICAgICAgICBsZXQgZGVsYXkgPSBwYXNzVGltZSAlIHRoaXMuZGF0YS5yZWNvdmVyUG93ZXJJbnRlcnZhbDtcbiAgICAgICAgICAgIGlmIChwb3dlciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEubGFzdFNhdmVUaW1lID0gbm93IC0gZGVsYXk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb3dlcihwb3dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLnJlY292ZXJQb3dlci5iaW5kKHRoaXMpLCB0aGlzLmRhdGEucmVjb3ZlclBvd2VySW50ZXJ2YWwsIHRoaXMuZGF0YS5yZWNvdmVyUG93ZXJWYWx1ZSk7XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVjb3ZlclBvd2VyKCkge1xuICAgICAgICB0aGlzLmRhdGEuYWRkUG93ZXIodGhpcy5kYXRhLnJlY292ZXJQb3dlclZhbHVlKTtcbiAgICAgICAgdGhpcy5kYXRhLnVwZGF0ZUxhc3RTYXZlVGltZSgpO1xuICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQXNzZXRFdmVudC5wb3dlckNoYW5nZWQsIHRoaXMuZGF0YS5jdXJQb3dlcik7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIG9uRXZlbnRzKCkge1xuICAgICAgICBFdmVudE1hbmFnZXIub24oRXZlbnRUeXBlLkFzc2V0RXZlbnQuY29uc3VtZVBvd2VyLCB0aGlzLm9uQ29uc3VtZVBvd2VyLCB0aGlzKTtcbiAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS5Bc3NldEV2ZW50LmdldFBvd2VyLCB0aGlzLmFkZFBvd2VyLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bkvZPlipvmlbDmja5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldERhdGEoKTogeyBtYXhQb3dlcjogbnVtYmVyLCBjdXJQb3dlcjogbnVtYmVyLCB0b3RhbFRpbWU6IG51bWJlciwgY3VyVGltZTogbnVtYmVyIH0ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLy/og73lpJ/mi6XmnInnmoTmnIDlpKfkvZPlipvlgLxcbiAgICAgICAgICAgIG1heFBvd2VyOiB0aGlzLmRhdGEubWF4UG93ZXIsXG4gICAgICAgICAgICAvL+W9k+WJjeS9k+WKm+WAvFxuICAgICAgICAgICAgY3VyUG93ZXI6IHRoaXMuZGF0YS5jdXJQb3dlcixcbiAgICAgICAgICAgIC8v5oGi5aSN5L2T5Yqb6ZyA6KaB55qE5oC75pe26Ze077yM5Y2V5L2N77ya56eSXG4gICAgICAgICAgICB0b3RhbFRpbWU6IE1hdGguZmxvb3IodGhpcy5kYXRhLnJlY292ZXJQb3dlckludGVydmFsICogMC4wMDEpLFxuICAgICAgICAgICAgLy/lvZPliY3lt7Lnu4/ov4fnmoTml7bpl7TvvIzljZXkvY3vvJrnp5JcbiAgICAgICAgICAgIGN1clRpbWU6IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSB0aGlzLmRhdGEubGFzdFNhdmVUaW1lKSAqIDAuMDAxKSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBzYXZlRGF0YSgpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKEdhbWVDb25maWcuZ2FtZU5hbWUgKyBcInBvd2VyRGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhZGRQb3dlcih2OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHRoaXMuZGF0YS5hZGRQb3dlcih2KTtcbiAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkFzc2V0RXZlbnQucG93ZXJDaGFuZ2VkLCB0aGlzLmRhdGEuY3VyUG93ZXIpO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBzdWJQb3dlcih2OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5zdWJQb3dlcih2KSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5Bc3NldEV2ZW50LnBvd2VyQ2hhbmdlZCwgdGhpcy5kYXRhLmN1clBvd2VyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmiaPpmaTkvZPlipvvvIzmiafooYzlm57osINcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKiBAcGFyYW0gW2RhdGEuY2JdICAgICDlm57osIPlh73mlbBcbiAgICAgKiBAcGFyYW0gW2RhdGEucG93ZXJdICDpnIDopoHmiaPpmaTnmoTkvZPlipvvvIzpu5jorqTkuLoxXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgb25Db25zdW1lUG93ZXIoZGF0YTogeyBjYjogRnVuY3Rpb24sIHBvd2VyPzogbnVtYmVyIH0pIHtcbiAgICAgICAgbGV0IHBvd2VyID0gZGF0YS5wb3dlcjtcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PSBkYXRhLnBvd2VyKSB7XG4gICAgICAgICAgICBwb3dlciA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5zdWJQb3dlcihwb3dlcikpIHtcbiAgICAgICAgICAgICEhZGF0YS5jYiAmJiBkYXRhLmNiKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpcFBvd2VyVW5Fbm91Z2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyB0aXBQb3dlclVuRW5vdWdoKCkge1xuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkFzc2V0RXZlbnQucG93ZXJVbkVub3VnaCwgdGhpcy5kYXRhLmN1clBvd2VyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBlbWl0KGV2ZW50VHlwZTogYW55LCBkYXRhPzogYW55KSB7XG4gICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KGV2ZW50VHlwZSwgZGF0YSk7XG4gICAgfVxufVxuXG5jbGFzcyBQb3dlckRhdGEge1xuICAgIC8qKuacgOWkp+S9k+WKm+WAvCAqL1xuICAgIHB1YmxpYyBtYXhQb3dlcjogbnVtYmVyID0gMTA7XG4gICAgLyoq5L2T5Yqb6Ieq5Yqo5oGi5aSN55qE5pe26Ze06Ze06ZqU77yM5Y2V5L2N77ya5q+r56eSICovXG4gICAgcHVibGljIHJlY292ZXJQb3dlckludGVydmFsOiBudW1iZXIgPSAzMDAwMDA7XG4gICAgLyoq5L2T5Yqb6Ieq5Yqo5oGi5aSN55qE6YePICovXG4gICAgcHVibGljIHJlY292ZXJQb3dlclZhbHVlOiBudW1iZXIgPSAxO1xuICAgIC8qKuW9k+WJjeS9k+WKm+WAvCAqL1xuICAgIHB1YmxpYyBjdXJQb3dlcjogbnVtYmVyID0gMTA7XG4gICAgLyoq5pyA5ZCO5LiA5qyh5oGi5aSN5L2T5Yqb55qE5pe26Ze0ICovXG4gICAgcHVibGljIGxhc3RTYXZlVGltZTogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jdXJQb3dlciA9IDEwO1xuICAgICAgICB0aGlzLmxhc3RTYXZlVGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFBvd2VyKHY6IG51bWJlciA9IDEpIHtcbiAgICAgICAgdGhpcy5jdXJQb3dlciArPSB2O1xuICAgICAgICBpZiAodGhpcy5jdXJQb3dlciA+IHRoaXMubWF4UG93ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VyUG93ZXIgPSB0aGlzLm1heFBvd2VyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBzdWJQb3dlcih2OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuY3VyUG93ZXIgPCB2KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMuY3VyUG93ZXIgLT0gdjtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVMYXN0U2F2ZVRpbWUoKSB7XG4gICAgICAgIHRoaXMubGFzdFNhdmVUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG59Il19