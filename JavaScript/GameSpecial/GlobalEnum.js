
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/GameSpecial/GlobalEnum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc2f50+C5JGKIafK+2WvkHL', 'GlobalEnum');
// myGame/Script/GameSpecial/GlobalEnum.ts

Object.defineProperty(exports, "__esModule", { value: true });
//全局使用的枚举
var GlobalEnum;
(function (GlobalEnum) {
    //音效文件
    var AudioClip;
    (function (AudioClip) {
        AudioClip["clickBtn"] = "Common/Audio/clickBtn";
        AudioClip["win"] = "Common/Audio/win";
        AudioClip["lose"] = "Common/Audio/lose";
        AudioClip["BGM"] = "myGame/Audio/BGM1";
    })(AudioClip = GlobalEnum.AudioClip || (GlobalEnum.AudioClip = {}));
    /**UI类型，枚举值与对应UI预制件、脚本名称相同 */
    var UI;
    (function (UI) {
        UI["lobby"] = "GameLobby";
        UI["playerAssetBar"] = "PlayerAssetBar";
        UI["getPower"] = "GetPowerUI";
        UI["tipPower"] = "TipPowerUI";
        UI["shop"] = "ShopUI";
        UI["levelInfo"] = "LevelInfoUI";
        UI["levelTeach"] = "TeachAnim";
        UI["winUI"] = "WinUI";
        UI["loseUI"] = "LoseUI";
    })(UI = GlobalEnum.UI || (GlobalEnum.UI = {}));
    /**场景类型 */
    var Scene;
    (function (Scene) {
        Scene[Scene["any"] = 1] = "any";
        Scene[Scene["lobby"] = 2] = "lobby";
        Scene[Scene["level"] = 3] = "level";
    })(Scene = GlobalEnum.Scene || (GlobalEnum.Scene = {}));
    /**关卡状态 */
    var LevelState;
    (function (LevelState) {
        LevelState[LevelState["inited"] = 1] = "inited";
        LevelState[LevelState["showingPlace"] = 2] = "showingPlace";
        LevelState[LevelState["playing"] = 3] = "playing";
        LevelState[LevelState["win"] = 4] = "win";
        LevelState[LevelState["lose"] = 5] = "lose";
    })(LevelState = GlobalEnum.LevelState || (GlobalEnum.LevelState = {}));
    /**触摸控制器状态 */
    var CtrlState;
    (function (CtrlState) {
        CtrlState[CtrlState["none"] = 1] = "none";
        CtrlState[CtrlState["touched"] = 2] = "touched";
    })(CtrlState = GlobalEnum.CtrlState || (GlobalEnum.CtrlState = {}));
    /**游戏数据类型 */
    var GameDataType;
    (function (GameDataType) {
        /**关卡数据 */
        GameDataType["levelData"] = "LevelData";
    })(GameDataType = GlobalEnum.GameDataType || (GlobalEnum.GameDataType = {}));
    /**资源路径，可为本地路径或远程路径 */
    var UrlPath;
    (function (UrlPath) {
        //皮肤资源：
        /**皮肤资源根路径 */
        UrlPath["skinRootUrl"] = "myGame/Img/Skin/";
        /**皮肤贴图文件夹名 */
        UrlPath["skinTextureDir"] = "Textures";
        /**皮肤在商城的商品项显示图片的文件夹名 */
        UrlPath["skinItemDir"] = "Item";
        /**皮肤商品选中时在展示台显示的图片的文件夹名 */
        UrlPath["skinDisplayDir"] = "Display";
    })(UrlPath = GlobalEnum.UrlPath || (GlobalEnum.UrlPath = {}));
    /**商店中商品项的类型 */
    var GoodsType;
    (function (GoodsType) {
        /**主角皮肤 */
        GoodsType["playerSkin"] = "PlayerSkin";
    })(GoodsType = GlobalEnum.GoodsType || (GlobalEnum.GoodsType = {}));
    //通过全局对象池管理的预制件名称与对应的脚本名称
    var LevelPrefab;
    (function (LevelPrefab) {
        LevelPrefab["goldIcon"] = "GoldIcon";
    })(LevelPrefab = GlobalEnum.LevelPrefab || (GlobalEnum.LevelPrefab = {}));
})(GlobalEnum = exports.GlobalEnum || (exports.GlobalEnum = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEdhbWVTcGVjaWFsXFxHbG9iYWxFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTO0FBQ1QsSUFBYyxVQUFVLENBNkV2QjtBQTdFRCxXQUFjLFVBQVU7SUFFcEIsTUFBTTtJQUNOLElBQVksU0FNWDtJQU5ELFdBQVksU0FBUztRQUNqQiwrQ0FBa0MsQ0FBQTtRQUNsQyxxQ0FBd0IsQ0FBQTtRQUN4Qix1Q0FBMEIsQ0FBQTtRQUMxQixzQ0FBeUIsQ0FBQTtJQUU3QixDQUFDLEVBTlcsU0FBUyxHQUFULG9CQUFTLEtBQVQsb0JBQVMsUUFNcEI7SUFFRCw2QkFBNkI7SUFDN0IsSUFBWSxFQVVYO0lBVkQsV0FBWSxFQUFFO1FBQ1YseUJBQW1CLENBQUE7UUFDbkIsdUNBQWlDLENBQUE7UUFDakMsNkJBQXVCLENBQUE7UUFDdkIsNkJBQXVCLENBQUE7UUFDdkIscUJBQWUsQ0FBQTtRQUNmLCtCQUF5QixDQUFBO1FBQ3pCLDhCQUF3QixDQUFBO1FBQ3hCLHFCQUFlLENBQUE7UUFDZix1QkFBaUIsQ0FBQTtJQUNyQixDQUFDLEVBVlcsRUFBRSxHQUFGLGFBQUUsS0FBRixhQUFFLFFBVWI7SUFFRCxVQUFVO0lBQ1YsSUFBWSxLQUlYO0lBSkQsV0FBWSxLQUFLO1FBQ2IsK0JBQU8sQ0FBQTtRQUNQLG1DQUFLLENBQUE7UUFDTCxtQ0FBSyxDQUFBO0lBQ1QsQ0FBQyxFQUpXLEtBQUssR0FBTCxnQkFBSyxLQUFMLGdCQUFLLFFBSWhCO0lBRUQsVUFBVTtJQUNWLElBQVksVUFNWDtJQU5ELFdBQVksVUFBVTtRQUNsQiwrQ0FBVSxDQUFBO1FBQ1YsMkRBQVksQ0FBQTtRQUNaLGlEQUFPLENBQUE7UUFDUCx5Q0FBRyxDQUFBO1FBQ0gsMkNBQUksQ0FBQTtJQUNSLENBQUMsRUFOVyxVQUFVLEdBQVYscUJBQVUsS0FBVixxQkFBVSxRQU1yQjtJQUVELGFBQWE7SUFDYixJQUFZLFNBR1g7SUFIRCxXQUFZLFNBQVM7UUFDakIseUNBQVEsQ0FBQTtRQUNSLCtDQUFPLENBQUE7SUFDWCxDQUFDLEVBSFcsU0FBUyxHQUFULG9CQUFTLEtBQVQsb0JBQVMsUUFHcEI7SUFFRCxZQUFZO0lBQ1osSUFBWSxZQUlYO0lBSkQsV0FBWSxZQUFZO1FBQ3BCLFVBQVU7UUFDVix1Q0FBdUIsQ0FBQTtJQUUzQixDQUFDLEVBSlcsWUFBWSxHQUFaLHVCQUFZLEtBQVosdUJBQVksUUFJdkI7SUFFRCxzQkFBc0I7SUFDdEIsSUFBWSxPQVVYO0lBVkQsV0FBWSxPQUFPO1FBQ2YsT0FBTztRQUNQLGFBQWE7UUFDYiwyQ0FBZ0MsQ0FBQTtRQUNoQyxjQUFjO1FBQ2Qsc0NBQTJCLENBQUE7UUFDM0Isd0JBQXdCO1FBQ3hCLCtCQUFvQixDQUFBO1FBQ3BCLDJCQUEyQjtRQUMzQixxQ0FBMEIsQ0FBQTtJQUM5QixDQUFDLEVBVlcsT0FBTyxHQUFQLGtCQUFPLEtBQVAsa0JBQU8sUUFVbEI7SUFFRCxlQUFlO0lBQ2YsSUFBWSxTQUdYO0lBSEQsV0FBWSxTQUFTO1FBQ2pCLFVBQVU7UUFDVixzQ0FBeUIsQ0FBQTtJQUM3QixDQUFDLEVBSFcsU0FBUyxHQUFULG9CQUFTLEtBQVQsb0JBQVMsUUFHcEI7SUFFRCx5QkFBeUI7SUFDekIsSUFBWSxXQUVYO0lBRkQsV0FBWSxXQUFXO1FBQ25CLG9DQUFxQixDQUFBO0lBQ3pCLENBQUMsRUFGVyxXQUFXLEdBQVgsc0JBQVcsS0FBWCxzQkFBVyxRQUV0QjtBQUVMLENBQUMsRUE3RWEsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUE2RXZCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/lhajlsYDkvb/nlKjnmoTmnprkuL5cbmV4cG9ydCBtb2R1bGUgR2xvYmFsRW51bSB7XG4gICAgXG4gICAgLy/pn7PmlYjmlofku7ZcbiAgICBleHBvcnQgZW51bSBBdWRpb0NsaXAge1xuICAgICAgICBjbGlja0J0biA9IFwiQ29tbW9uL0F1ZGlvL2NsaWNrQnRuXCIsXG4gICAgICAgIHdpbiA9IFwiQ29tbW9uL0F1ZGlvL3dpblwiLFxuICAgICAgICBsb3NlID0gXCJDb21tb24vQXVkaW8vbG9zZVwiLFxuICAgICAgICBCR00gPSBcIm15R2FtZS9BdWRpby9CR00xXCIsXG5cbiAgICB9XG5cbiAgICAvKipVSeexu+Wei++8jOaemuS4vuWAvOS4juWvueW6lFVJ6aKE5Yi25Lu244CB6ISa5pys5ZCN56ew55u45ZCMICovXG4gICAgZXhwb3J0IGVudW0gVUkge1xuICAgICAgICBsb2JieSA9IFwiR2FtZUxvYmJ5XCIsICAgICAgICAgICAgICAgIC8v6aaW6aG1XG4gICAgICAgIHBsYXllckFzc2V0QmFyID0gXCJQbGF5ZXJBc3NldEJhclwiLCAgLy/njqnlrrbotYTkuqfkv6Hmga/mnaFcbiAgICAgICAgZ2V0UG93ZXIgPSBcIkdldFBvd2VyVUlcIiwgICAgICAgICAgICAvL+iOt+WPluS9k+WKm+eVjOmdolxuICAgICAgICB0aXBQb3dlciA9IFwiVGlwUG93ZXJVSVwiLCAgICAgICAgICAgIC8v5L2T5Yqb5LiN6Laz5o+Q56S655WM6Z2iXG4gICAgICAgIHNob3AgPSBcIlNob3BVSVwiLCAgICAgICAgICAgICAgICAgICAgLy/llYbln47nlYzpnaJcbiAgICAgICAgbGV2ZWxJbmZvID0gXCJMZXZlbEluZm9VSVwiLCAgICAgICAgICAvL+WFs+WNoeS/oeaBr1xuICAgICAgICBsZXZlbFRlYWNoID0gXCJUZWFjaEFuaW1cIiwgICAgICAgICAgIC8v5YWz5Y2h5pWZ5a2m55WM6Z2iXG4gICAgICAgIHdpblVJID0gXCJXaW5VSVwiLCAgICAgICAgICAgICAgICAgICAgLy/og5zliKnnlYzpnaJcbiAgICAgICAgbG9zZVVJID0gXCJMb3NlVUlcIiwgICAgICAgICAgICAgICAgICAvL+Wksei0peeVjOmdolxuICAgIH1cblxuICAgIC8qKuWcuuaZr+exu+WeiyAqL1xuICAgIGV4cG9ydCBlbnVtIFNjZW5lIHtcbiAgICAgICAgYW55ID0gMSwgICAgLy/ku7vmhI/lnLrmma9cbiAgICAgICAgbG9iYnksICAgICAgLy/pppbpobVcbiAgICAgICAgbGV2ZWwsICAgICAgLy/lhbPljaHkuK1cbiAgICB9XG5cbiAgICAvKirlhbPljaHnirbmgIEgKi9cbiAgICBleHBvcnQgZW51bSBMZXZlbFN0YXRlIHtcbiAgICAgICAgaW5pdGVkID0gMSwgICAgIC8v5YWz5Y2h5bey5Yid5aeL5YyW5a6M5oiQ77yM5L2G6L+Y5pyq5byA5aeL5ri45oiPXG4gICAgICAgIHNob3dpbmdQbGFjZSwgICAvL+i9puS9jeWxleekuui/h+eoi1xuICAgICAgICBwbGF5aW5nLCAgICAgICAgLy/lhbPljaHov5vooYzkuK1cbiAgICAgICAgd2luLCAgICAgICAgICAgIC8v546p5a625bey6IOc5YipXG4gICAgICAgIGxvc2UsICAgICAgICAgICAvL+eOqeWutuW3suWksei0pVxuICAgIH1cblxuICAgIC8qKuinpuaRuOaOp+WItuWZqOeKtuaAgSAqL1xuICAgIGV4cG9ydCBlbnVtIEN0cmxTdGF0ZSB7XG4gICAgICAgIG5vbmUgPSAxLFxuICAgICAgICB0b3VjaGVkLCAgICAvL+aMieS9j+eKtuaAgVxuICAgIH1cblxuICAgIC8qKua4uOaIj+aVsOaNruexu+WeiyAqL1xuICAgIGV4cG9ydCBlbnVtIEdhbWVEYXRhVHlwZSB7XG4gICAgICAgIC8qKuWFs+WNoeaVsOaNriAqL1xuICAgICAgICBsZXZlbERhdGEgPSBcIkxldmVsRGF0YVwiLFxuXG4gICAgfVxuXG4gICAgLyoq6LWE5rqQ6Lev5b6E77yM5Y+v5Li65pys5Zyw6Lev5b6E5oiW6L+c56iL6Lev5b6EICovXG4gICAgZXhwb3J0IGVudW0gVXJsUGF0aCB7XG4gICAgICAgIC8v55qu6IKk6LWE5rqQ77yaXG4gICAgICAgIC8qKuearuiCpOi1hOa6kOaguei3r+W+hCAqL1xuICAgICAgICBza2luUm9vdFVybCA9IFwibXlHYW1lL0ltZy9Ta2luL1wiLFxuICAgICAgICAvKirnmq7ogqTotLTlm77mlofku7blpLnlkI0gKi9cbiAgICAgICAgc2tpblRleHR1cmVEaXIgPSBcIlRleHR1cmVzXCIsXG4gICAgICAgIC8qKuearuiCpOWcqOWVhuWfjueahOWVhuWTgemhueaYvuekuuWbvueJh+eahOaWh+S7tuWkueWQjSAqL1xuICAgICAgICBza2luSXRlbURpciA9IFwiSXRlbVwiLFxuICAgICAgICAvKirnmq7ogqTllYblk4HpgInkuK3ml7blnKjlsZXnpLrlj7DmmL7npLrnmoTlm77niYfnmoTmlofku7blpLnlkI0gKi9cbiAgICAgICAgc2tpbkRpc3BsYXlEaXIgPSBcIkRpc3BsYXlcIixcbiAgICB9XG5cbiAgICAvKirllYblupfkuK3llYblk4HpobnnmoTnsbvlnosgKi9cbiAgICBleHBvcnQgZW51bSBHb29kc1R5cGUge1xuICAgICAgICAvKirkuLvop5Lnmq7ogqQgKi9cbiAgICAgICAgcGxheWVyU2tpbiA9IFwiUGxheWVyU2tpblwiLFxuICAgIH1cblxuICAgIC8v6YCa6L+H5YWo5bGA5a+56LGh5rGg566h55CG55qE6aKE5Yi25Lu25ZCN56ew5LiO5a+55bqU55qE6ISa5pys5ZCN56ewXG4gICAgZXhwb3J0IGVudW0gTGV2ZWxQcmVmYWIge1xuICAgICAgICBnb2xkSWNvbiA9IFwiR29sZEljb25cIixcbiAgICB9XG5cbn1cbiJdfQ==