
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/GameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '678abCEGAFLDpOFiDZvNP+2', 'GameData');
// myGame/Script/Common/GameData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var LevelDataTemplate_1 = require("../GameSpecial/LevelDataTemplate");
/**游戏JSON数据管理器 */
var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData.init = function () {
        this.data = {};
        //一些常见的数据类型，使用默认数据进行初始化
        //关卡：
        this.data[GlobalEnum_1.GlobalEnum.GameDataType.levelData] = LevelDataTemplate_1.default.getData();
    };
    GameData.setData = function (res, urls) {
        for (var key in GlobalEnum_1.GlobalEnum.GameDataType) {
            var index = this.getUrlsIndex(GlobalEnum_1.GlobalEnum.GameDataType[key], urls);
            if (index >= 0) {
                this.data[GlobalEnum_1.GlobalEnum.GameDataType[key]] = res[index].json;
            }
            else {
                console.warn("数据类型不存在：", GlobalEnum_1.GlobalEnum.GameDataType[key]);
            }
        }
    };
    /**获取数据类型字符串在资源url数组中的索引 */
    GameData.getUrlsIndex = function (name, urls) {
        for (var i = urls.length - 1; i >= 0; --i) {
            if (urls[i].indexOf(name) >= 0) {
                return i;
            }
        }
        return -1;
    };
    /**添加记录数据 */
    GameData.addData = function (type, data) {
        if (!!this.data[type]) {
            console.warn("对应类型的数据已经存在，请检查类型是否重名:", type);
            return;
        }
        this.data[type] = data;
    };
    /**
     * 获取游戏数据
     * @param type  数据类型枚举值
     * @param key   需要的具体数据
     */
    GameData.getData = function (type, key) {
        if (undefined === this.data[type]) {
            console.warn("不存在对应类型的数据：", type);
            return null;
        }
        if (undefined === key) {
            return this.data[type];
        }
        else {
            return this.data[type][key];
        }
    };
    //一些常见的数据的快捷获取方法
    /**关卡数据 */
    GameData.getLevelData = function (lv) {
        var data = this.data[GlobalEnum_1.GlobalEnum.GameDataType.levelData];
        if (!data)
            return null;
        return data[lv];
    };
    /**获取商品(皮肤)数据 */
    GameData.getGoodsData = function (type, id) {
        if (undefined === this.data[type]) {
            console.warn("不存在对应类型的商品数据：", type);
            return null;
        }
        if (undefined === id) {
            return this.data[type];
        }
        else {
            return this.data[type][id];
        }
    };
    /**
     * 记录所有游戏数据，
     * key:数据类型枚举值；
     * value:数据
     */
    GameData.data = {};
    return GameData;
}());
exports.default = GameData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcR2FtZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUF1RDtBQUN2RCxzRUFBaUU7QUFFakUsaUJBQWlCO0FBQ2pCO0lBQUE7SUFrRkEsQ0FBQztJQTNFaUIsYUFBSSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsdUJBQXVCO1FBQ3ZCLEtBQUs7UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLDJCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRS9FLENBQUM7SUFFYSxnQkFBTyxHQUFyQixVQUFzQixHQUFVLEVBQUUsSUFBYztRQUM1QyxLQUFLLElBQUksR0FBRyxJQUFJLHVCQUFVLENBQUMsWUFBWSxFQUFFO1lBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEUsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQzdEO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLHVCQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUQ7U0FDSjtJQUNMLENBQUM7SUFDRCwyQkFBMkI7SUFDWixxQkFBWSxHQUEzQixVQUE0QixJQUFZLEVBQUUsSUFBYztRQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLENBQUM7YUFDWjtTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFRCxZQUFZO0lBQ0UsZ0JBQU8sR0FBckIsVUFBc0IsSUFBNkIsRUFBRSxJQUFTO1FBQzFELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLGdCQUFPLEdBQXJCLFVBQXNCLElBQTZCLEVBQUUsR0FBUztRQUMxRCxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDSSxxQkFBWSxHQUExQixVQUEyQixFQUFVO1FBQ2pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsZ0JBQWdCO0lBQ0YscUJBQVksR0FBMUIsVUFBMkIsSUFBMEIsRUFBRSxFQUFvQjtRQUN2RSxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBL0VEOzs7O09BSUc7SUFDWSxhQUFJLEdBQTJCLEVBQUUsQ0FBQztJQTRFckQsZUFBQztDQWxGRCxBQWtGQyxJQUFBO2tCQWxGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbEVudW0gfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2xvYmFsRW51bVwiO1xyXG5pbXBvcnQgTGV2ZWxEYXRhVGVtcGxhdGUgZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0xldmVsRGF0YVRlbXBsYXRlXCI7XHJcblxyXG4vKirmuLjmiI9KU09O5pWw5o2u566h55CG5ZmoICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICog6K6w5b2V5omA5pyJ5ri45oiP5pWw5o2u77yMXHJcbiAgICAgKiBrZXk65pWw5o2u57G75Z6L5p6a5Li+5YC877ybXHJcbiAgICAgKiB2YWx1ZTrmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIC8v5LiA5Lqb5bi46KeB55qE5pWw5o2u57G75Z6L77yM5L2/55So6buY6K6k5pWw5o2u6L+b6KGM5Yid5aeL5YyWXHJcbiAgICAgICAgLy/lhbPljaHvvJpcclxuICAgICAgICB0aGlzLmRhdGFbR2xvYmFsRW51bS5HYW1lRGF0YVR5cGUubGV2ZWxEYXRhXSA9IExldmVsRGF0YVRlbXBsYXRlLmdldERhdGEoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXREYXRhKHJlczogYW55W10sIHVybHM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEdsb2JhbEVudW0uR2FtZURhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0VXJsc0luZGV4KEdsb2JhbEVudW0uR2FtZURhdGFUeXBlW2tleV0sIHVybHMpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW0dsb2JhbEVudW0uR2FtZURhdGFUeXBlW2tleV1dID0gcmVzW2luZGV4XS5qc29uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwi5pWw5o2u57G75Z6L5LiN5a2Y5Zyo77yaXCIsIEdsb2JhbEVudW0uR2FtZURhdGFUeXBlW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5pWw5o2u57G75Z6L5a2X56ym5Liy5Zyo6LWE5rqQdXJs5pWw57uE5Lit55qE57Si5byVICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRVcmxzSW5kZXgobmFtZTogc3RyaW5nLCB1cmxzOiBzdHJpbmdbXSk6IG51bWJlciB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHVybHMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgaWYgKHVybHNbaV0uaW5kZXhPZihuYW1lKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg6K6w5b2V5pWw5o2uICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZERhdGEodHlwZTogR2xvYmFsRW51bS5HYW1lRGF0YVR5cGUsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmICghIXRoaXMuZGF0YVt0eXBlXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCLlr7nlupTnsbvlnovnmoTmlbDmja7lt7Lnu4/lrZjlnKjvvIzor7fmo4Dmn6XnsbvlnovmmK/lkKbph43lkI06XCIsIHR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YVt0eXBlXSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmuLjmiI/mlbDmja5cclxuICAgICAqIEBwYXJhbSB0eXBlICDmlbDmja7nsbvlnovmnprkuL7lgLxcclxuICAgICAqIEBwYXJhbSBrZXkgICDpnIDopoHnmoTlhbfkvZPmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXREYXRhKHR5cGU6IEdsb2JhbEVudW0uR2FtZURhdGFUeXBlLCBrZXk/OiBhbnkpIHtcclxuICAgICAgICBpZiAodW5kZWZpbmVkID09PSB0aGlzLmRhdGFbdHlwZV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwi5LiN5a2Y5Zyo5a+55bqU57G75Z6L55qE5pWw5o2u77yaXCIsIHR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbdHlwZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVt0eXBlXVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+S4gOS6m+W4uOingeeahOaVsOaNrueahOW/q+aNt+iOt+WPluaWueazlVxyXG4gICAgLyoq5YWz5Y2h5pWw5o2uICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldExldmVsRGF0YShsdjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFbR2xvYmFsRW51bS5HYW1lRGF0YVR5cGUubGV2ZWxEYXRhXTtcclxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBkYXRhW2x2XTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bllYblk4Eo55qu6IKkKeaVsOaNriAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRHb29kc0RhdGEodHlwZTogR2xvYmFsRW51bS5Hb29kc1R5cGUsIGlkPzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gdGhpcy5kYXRhW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuS4jeWtmOWcqOWvueW6lOexu+Wei+eahOWVhuWTgeaVsOaNru+8mlwiLCB0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbdHlwZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVt0eXBlXVtpZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==