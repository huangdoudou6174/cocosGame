
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/PlayerData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1e722Rb695IIarrenLJuY0d', 'PlayerData');
// myGame/Script/Common/PlayerData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = require("./EventManager");
var PlayerDataTemplate_1 = require("../GameSpecial/PlayerDataTemplate");
var GameConfig_1 = require("../GameSpecial/GameConfig");
var GameEventType_1 = require("../GameSpecial/GameEventType");
//玩家数据管理器
var PlayerData = /** @class */ (function () {
    function PlayerData() {
    }
    PlayerData.init = function () {
        this.Data = PlayerDataTemplate_1.default.getData();
        cc.sys.localStorage.removeItem(GameConfig_1.default.gameName + "PlayerData");
        var v = cc.sys.localStorage.getItem(GameConfig_1.default.gameName + "PlayerData");
        if (!!v) {
            v = JSON.parse(v);
            this.copyObject(this.Data, v);
        }
        this.onEvents();
    };
    PlayerData.copyObject = function (target, src) {
        for (var key in src) {
            switch (typeof src[key]) {
                case "number":
                case "boolean":
                case "string": {
                    target[key] = src[key];
                    break;
                }
                case "object": {
                    if (Array.isArray(src[key])) {
                        target[key] = [].concat(src[key]);
                    }
                    else {
                        if (undefined == target[key])
                            target[key] = {};
                        this.copyObject(target[key], src[key]);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    };
    PlayerData.onEvents = function () {
        EventManager_1.default.on(GameEventType_1.EventType.PlayerDataEvent.updatePlayerData, this.onUpdatePlayerData, this);
    };
    /**
     * 更新玩家数据
     * @param data
     * @param {string} [data.type] 数据类型
     * @param {string} [data.attribute] 要修改的数据的字段名称，用“.”号分割多级子属性，例如“gameData.curLevel”
     * @param {number|string} [data.value] 属性改变的量
     * @param {string} [data.mode] 数据修改方式
     */
    PlayerData.onUpdatePlayerData = function (data) {
        if (data.attribute.indexOf(".") < 0) {
            this.updateData(this.Data, data.attribute, data.value, data.mode);
        }
        else {
            var str = data.attribute.split(".");
            var playerData = this.Data;
            for (var i = 0; i < str.length - 1; ++i) {
                if (undefined != playerData[str[i]]) {
                    playerData = playerData[str[i]];
                }
                else {
                    cc.log("修改玩家数据失败，玩家数据未定义对应属性：" + str[i]);
                    cc.log(data);
                    return;
                }
            }
            this.updateData(playerData, str[str.length - 1], data.value, data.mode);
        }
        this.saveData();
        //数据更新后发送事件，UI组件自动处理
        EventManager_1.default.emit(GameEventType_1.EventType.PlayerDataEvent.playerDataChanged, {
            type: data.type,
            attribute: data.attribute,
            value: this.getData(data.attribute),
        });
    };
    /**
     * 更新对象的字段值
     * @param data      字段所属对象
     * @param attribute 字段名称
     * @param value     要改变的值
     * @param mode      改变方式
     */
    PlayerData.updateData = function (data, attribute, value, mode) {
        switch (mode) {
            case "+": {
                data[attribute] += parseFloat(value);
                break;
            }
            case "-": {
                data[attribute] -= parseFloat(value);
                break;
            }
            case "*": {
                data[attribute] *= parseFloat(value);
                break;
            }
            case "=": {
                data[attribute] = parseFloat(value);
                break;
            }
            case "push": {
                data[attribute].push(value);
                break;
            }
            default: {
                cc.log("数据修改失败，未定义的数据修改方式：" + mode);
                break;
            }
        }
    };
    /**
     * 获取玩家数据
     * @param attribute 字段名称，用“.”号分割多级子属性，例如“gameData.curLevel”
     */
    PlayerData.getData = function (attribute) {
        if (!attribute) {
            return this.Data;
        }
        if (attribute.indexOf(".") < 0) {
            return this.Data[attribute];
        }
        var str = attribute.split(".");
        var playerData = this.Data;
        for (var i = 0; i < str.length; ++i) {
            if (undefined != playerData[str[i]]) {
                playerData = playerData[str[i]];
            }
            else {
                return playerData;
            }
        }
        return playerData;
    };
    //存储数据，将在本地存储，并发送给服务端
    PlayerData.saveData = function () {
        cc.sys.localStorage.setItem(GameConfig_1.default.gameName + "PlayerData", JSON.stringify(this.Data));
        //todo: 发送给服务端
    };
    PlayerData.Data = {};
    return PlayerData;
}());
exports.default = PlayerData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcUGxheWVyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLHdFQUFtRTtBQUNuRSx3REFBbUQ7QUFDbkQsOERBQXlEO0FBRXpELFNBQVM7QUFDVDtJQUFBO0lBc0lBLENBQUM7SUFwSWlCLGVBQUksR0FBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLDRCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxvQkFBVSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsb0JBQVUsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDYyxxQkFBVSxHQUF6QixVQUEwQixNQUFXLEVBQUUsR0FBUTtRQUMzQyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNqQixRQUFRLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLFNBQVMsQ0FBQztnQkFDZixLQUFLLFFBQVEsQ0FBQyxDQUFDO29CQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FB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LFNBQVMsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkM7aUJBQU07Z0JBQ0gsT0FBTyxVQUFVLENBQUM7YUFDckI7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxxQkFBcUI7SUFDTixtQkFBUSxHQUF2QjtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBVSxDQUFDLFFBQVEsR0FBRyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRixjQUFjO0lBQ2xCLENBQUM7SUFwSWMsZUFBSSxHQUFRLEVBQUUsQ0FBQztJQXFJbEMsaUJBQUM7Q0F0SUQsQUFzSUMsSUFBQTtrQkF0SW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gXCIuL0V2ZW50TWFuYWdlclwiO1xuaW1wb3J0IFBsYXllckRhdGFUZW1wbGF0ZSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvUGxheWVyRGF0YVRlbXBsYXRlXCI7XG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUNvbmZpZ1wiO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcblxuLy/njqnlrrbmlbDmja7nrqHnkIblmahcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckRhdGEge1xuICAgIHByaXZhdGUgc3RhdGljIERhdGE6IGFueSA9IHt9O1xuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5EYXRhID0gUGxheWVyRGF0YVRlbXBsYXRlLmdldERhdGEoKTtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEdhbWVDb25maWcuZ2FtZU5hbWUgKyBcIlBsYXllckRhdGFcIik7XG4gICAgICAgIGxldCB2ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKEdhbWVDb25maWcuZ2FtZU5hbWUgKyBcIlBsYXllckRhdGFcIik7XG4gICAgICAgIGlmICghIXYpIHtcbiAgICAgICAgICAgIHYgPSBKU09OLnBhcnNlKHYpO1xuICAgICAgICAgICAgdGhpcy5jb3B5T2JqZWN0KHRoaXMuRGF0YSwgdik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkV2ZW50cygpO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBjb3B5T2JqZWN0KHRhcmdldDogYW55LCBzcmM6IGFueSkge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3JjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBzcmNba2V5XSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjoge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNyY1trZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBbXS5jb25jYXQoc3JjW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PSB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weU9iamVjdCh0YXJnZXRba2V5XSwgc3JjW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBvbkV2ZW50cygpIHtcbiAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS5QbGF5ZXJEYXRhRXZlbnQudXBkYXRlUGxheWVyRGF0YSwgdGhpcy5vblVwZGF0ZVBsYXllckRhdGEsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmm7TmlrDnjqnlrrbmlbDmja5cbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2RhdGEudHlwZV0g5pWw5o2u57G75Z6LXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkYXRhLmF0dHJpYnV0ZV0g6KaB5L+u5pS555qE5pWw5o2u55qE5a2X5q615ZCN56ew77yM55So4oCcLuKAneWPt+WIhuWJsuWkmue6p+WtkOWxnuaAp++8jOS+i+WmguKAnGdhbWVEYXRhLmN1ckxldmVs4oCdXG4gICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbZGF0YS52YWx1ZV0g5bGe5oCn5pS55Y+Y55qE6YePXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkYXRhLm1vZGVdIOaVsOaNruS/ruaUueaWueW8j1xuICAgICAqL1xuICAgIHN0YXRpYyBvblVwZGF0ZVBsYXllckRhdGEoZGF0YTogeyB0eXBlOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBtb2RlOiBzdHJpbmcgfSkge1xuICAgICAgICBpZiAoZGF0YS5hdHRyaWJ1dGUuaW5kZXhPZihcIi5cIikgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEodGhpcy5EYXRhLCBkYXRhLmF0dHJpYnV0ZSwgZGF0YS52YWx1ZSwgZGF0YS5tb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdHIgPSBkYXRhLmF0dHJpYnV0ZS5zcGxpdChcIi5cIik7XG4gICAgICAgICAgICBsZXQgcGxheWVyRGF0YSA9IHRoaXMuRGF0YTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT0gcGxheWVyRGF0YVtzdHJbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllckRhdGEgPSBwbGF5ZXJEYXRhW3N0cltpXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5L+u5pS5546p5a625pWw5o2u5aSx6LSl77yM546p5a625pWw5o2u5pyq5a6a5LmJ5a+55bqU5bGe5oCn77yaXCIgKyBzdHJbaV0pO1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEocGxheWVyRGF0YSwgc3RyW3N0ci5sZW5ndGggLSAxXSwgZGF0YS52YWx1ZSwgZGF0YS5tb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgICAgIC8v5pWw5o2u5pu05paw5ZCO5Y+R6YCB5LqL5Lu277yMVUnnu4Tku7boh6rliqjlpITnkIZcbiAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnRUeXBlLlBsYXllckRhdGFFdmVudC5wbGF5ZXJEYXRhQ2hhbmdlZCwge1xuICAgICAgICAgICAgdHlwZTogZGF0YS50eXBlLCAgICAgICAgICAgICAgICAgICAgICAgIC8v5pWw5o2u57G75Z6LXG4gICAgICAgICAgICBhdHRyaWJ1dGU6IGRhdGEuYXR0cmlidXRlLCAgICAgICAgICAgICAgLy/mlbDmja7lkI3np7BcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdldERhdGEoZGF0YS5hdHRyaWJ1dGUpLCAgICAvL+WPmOabtOWQjueahOaVsOaNruWAvFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pu05paw5a+56LGh55qE5a2X5q615YC8XG4gICAgICogQHBhcmFtIGRhdGEgICAgICDlrZfmrrXmiYDlsZ7lr7nosaFcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlIOWtl+auteWQjeensFxuICAgICAqIEBwYXJhbSB2YWx1ZSAgICAg6KaB5pS55Y+Y55qE5YC8XG4gICAgICogQHBhcmFtIG1vZGUgICAgICDmlLnlj5jmlrnlvI9cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVEYXRhKGRhdGE6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBhbnksIG1vZGU6IHN0cmluZykge1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCIrXCI6IHtcbiAgICAgICAgICAgICAgICBkYXRhW2F0dHJpYnV0ZV0gKz0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiLVwiOiB7XG4gICAgICAgICAgICAgICAgZGF0YVthdHRyaWJ1dGVdIC09IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcIipcIjoge1xuICAgICAgICAgICAgICAgIGRhdGFbYXR0cmlidXRlXSAqPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCI9XCI6IHtcbiAgICAgICAgICAgICAgICBkYXRhW2F0dHJpYnV0ZV0gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJwdXNoXCI6IHtcbiAgICAgICAgICAgICAgICBkYXRhW2F0dHJpYnV0ZV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5pWw5o2u5L+u5pS55aSx6LSl77yM5pyq5a6a5LmJ55qE5pWw5o2u5L+u5pS55pa55byP77yaXCIgKyBtb2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bnjqnlrrbmlbDmja5cbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlIOWtl+auteWQjeensO+8jOeUqOKAnC7igJ3lj7fliIblibLlpJrnuqflrZDlsZ7mgKfvvIzkvovlpoLigJxnYW1lRGF0YS5jdXJMZXZlbOKAnVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXREYXRhKGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5EYXRhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRyaWJ1dGUuaW5kZXhPZihcIi5cIikgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5EYXRhW2F0dHJpYnV0ZV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0ciA9IGF0dHJpYnV0ZS5zcGxpdChcIi5cIik7XG4gICAgICAgIGxldCBwbGF5ZXJEYXRhID0gdGhpcy5EYXRhO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPSBwbGF5ZXJEYXRhW3N0cltpXV0pIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJEYXRhID0gcGxheWVyRGF0YVtzdHJbaV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGxheWVyRGF0YTtcbiAgICB9XG4gICAgLy/lrZjlgqjmlbDmja7vvIzlsIblnKjmnKzlnLDlrZjlgqjvvIzlubblj5HpgIHnu5nmnI3liqHnq69cbiAgICBwcml2YXRlIHN0YXRpYyBzYXZlRGF0YSgpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKEdhbWVDb25maWcuZ2FtZU5hbWUgKyBcIlBsYXllckRhdGFcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5EYXRhKSk7XG4gICAgICAgIC8vdG9kbzog5Y+R6YCB57uZ5pyN5Yqh56uvXG4gICAgfVxufVxuIl19