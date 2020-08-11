
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/GameSpecial/PlayerDataTemplate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd1d8imA1dAd52+vZyO6i8g', 'PlayerDataTemplate');
// myGame/Script/GameSpecial/PlayerDataTemplate.ts

Object.defineProperty(exports, "__esModule", { value: true });
//玩家数据示例
var PlayerDataTemplate = /** @class */ (function () {
    function PlayerDataTemplate() {
    }
    PlayerDataTemplate.getData = function () {
        return {
            gameData: {
                curLevel: 1,
                //玩家资源
                asset: {
                    gold: 0,
                    power: 10,
                },
                //主角皮肤
                PlayerSkin: {
                    cur: 1,
                    owned: [1],
                },
            },
        };
    };
    return PlayerDataTemplate;
}());
exports.default = PlayerDataTemplate;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEdhbWVTcGVjaWFsXFxQbGF5ZXJEYXRhVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFFBQVE7QUFDUjtJQUNJO0lBQXdCLENBQUM7SUFDWCwwQkFBTyxHQUFyQjtRQUNJLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLENBQUM7Z0JBQ1gsTUFBTTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLEVBQUU7aUJBQ1o7Z0JBQ0QsTUFBTTtnQkFDTixVQUFVLEVBQUU7b0JBQ1IsR0FBRyxFQUFFLENBQUM7b0JBQ04sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNiO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy/njqnlrrbmlbDmja7npLrkvotcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckRhdGFUZW1wbGF0ZSB7XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2FtZURhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXJMZXZlbDogMSxcbiAgICAgICAgICAgICAgICAvL+eOqeWutui1hOa6kFxuICAgICAgICAgICAgICAgIGFzc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIGdvbGQ6IDAsICAgICAgICAvL+mHkeW4gVxuICAgICAgICAgICAgICAgICAgICBwb3dlcjogMTAsICAgICAgLy/kvZPliptcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8v5Li76KeS55qu6IKkXG4gICAgICAgICAgICAgICAgUGxheWVyU2tpbjoge1xuICAgICAgICAgICAgICAgICAgICBjdXI6IDEsICAgICAgICAgLy/lvZPliY3kvb/nlKjnmoTnmq7ogqRcbiAgICAgICAgICAgICAgICAgICAgb3duZWQ6IFsxXSwgICAgIC8v5bey5oul5pyJ55qE55qu6IKkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19