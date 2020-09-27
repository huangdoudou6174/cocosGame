
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/GameSpecial/GameEventType.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3fbc1O7sGRMqI468GPdeEJe', 'GameEventType');
// myGame/Script/GameSpecial/GameEventType.ts

//游戏中全部使用自定义事件管理器注册的事件类型
Object.defineProperty(exports, "__esModule", { value: true });
//跟游戏玩法相关的关卡中的事件
var EventType;
(function (EventType) {
    //游戏流程相关的事件,从 1000 开始
    var DirectorEvent;
    (function (DirectorEvent) {
        DirectorEvent[DirectorEvent["startIndex"] = 1000] = "startIndex";
        DirectorEvent[DirectorEvent["enterLobby"] = 1001] = "enterLobby";
        DirectorEvent[DirectorEvent["hideGameLobby"] = 1002] = "hideGameLobby";
        DirectorEvent[DirectorEvent["startGame"] = 1003] = "startGame";
        DirectorEvent[DirectorEvent["startLevel"] = 1004] = "startLevel";
        DirectorEvent[DirectorEvent["exitLevel"] = 1005] = "exitLevel";
        DirectorEvent[DirectorEvent["playNextLevel"] = 1006] = "playNextLevel";
        DirectorEvent[DirectorEvent["replayCurLevel"] = 1007] = "replayCurLevel";
        DirectorEvent[DirectorEvent["playerWin"] = 1008] = "playerWin";
        DirectorEvent[DirectorEvent["playerLose"] = 1009] = "playerLose";
        DirectorEvent[DirectorEvent["pauseLevel"] = 1010] = "pauseLevel";
        DirectorEvent[DirectorEvent["resumeLevel"] = 1011] = "resumeLevel";
        DirectorEvent[DirectorEvent["matchPlayerFinish"] = 1012] = "matchPlayerFinish";
    })(DirectorEvent = EventType.DirectorEvent || (EventType.DirectorEvent = {}));
    //资源加载相关事件，从 2000 开始
    var LoadAssetEvent;
    (function (LoadAssetEvent) {
        LoadAssetEvent[LoadAssetEvent["startIndex"] = 2000] = "startIndex";
        LoadAssetEvent[LoadAssetEvent["showProgress"] = 2001] = "showProgress";
        LoadAssetEvent[LoadAssetEvent["hideProgress"] = 2002] = "hideProgress";
        LoadAssetEvent[LoadAssetEvent["updateProgress"] = 2003] = "updateProgress";
    })(LoadAssetEvent = EventType.LoadAssetEvent || (EventType.LoadAssetEvent = {}));
    //游戏数据相关事件，从 3000 开始
    var PlayerDataEvent;
    (function (PlayerDataEvent) {
        PlayerDataEvent[PlayerDataEvent["startIndex"] = 3000] = "startIndex";
        PlayerDataEvent[PlayerDataEvent["updatePlayerData"] = 3001] = "updatePlayerData";
        PlayerDataEvent[PlayerDataEvent["playerDataChanged"] = 3002] = "playerDataChanged";
    })(PlayerDataEvent = EventType.PlayerDataEvent || (EventType.PlayerDataEvent = {}));
    //SDK相关事件
    var SDKEvent;
    (function (SDKEvent) {
        SDKEvent[SDKEvent["startIndex"] = 4000] = "startIndex";
        SDKEvent[SDKEvent["showMsg"] = 4001] = "showMsg";
        SDKEvent[SDKEvent["showVideo"] = 4002] = "showVideo";
        SDKEvent[SDKEvent["showBanner"] = 4003] = "showBanner";
        SDKEvent[SDKEvent["hideBanner"] = 4004] = "hideBanner";
        SDKEvent[SDKEvent["showInsertAd"] = 4005] = "showInsertAd";
        SDKEvent[SDKEvent["startRecord"] = 4006] = "startRecord";
        SDKEvent[SDKEvent["stopRecord"] = 4007] = "stopRecord";
        SDKEvent[SDKEvent["shareRecord"] = 4008] = "shareRecord";
        SDKEvent[SDKEvent["bannerResize"] = 4009] = "bannerResize";
        SDKEvent[SDKEvent["navigateToMiniProgram"] = 4010] = "navigateToMiniProgram";
        SDKEvent[SDKEvent["vibrateShort"] = 4011] = "vibrateShort";
        SDKEvent[SDKEvent["vibrateLong"] = 4012] = "vibrateLong";
    })(SDKEvent = EventType.SDKEvent || (EventType.SDKEvent = {}));
    //UI相关事件
    var UIEvent;
    (function (UIEvent) {
        UIEvent[UIEvent["startIndex"] = 5000] = "startIndex";
        UIEvent[UIEvent["playGoldAmin"] = 5001] = "playGoldAmin";
        UIEvent[UIEvent["goldAnimPlayFinish"] = 5002] = "goldAnimPlayFinish";
        UIEvent[UIEvent["showTip"] = 5003] = "showTip";
        UIEvent[UIEvent["showTouchMask"] = 5004] = "showTouchMask";
        UIEvent[UIEvent["hideTouchMask"] = 5005] = "hideTouchMask";
        UIEvent[UIEvent["enter"] = 5006] = "enter";
        UIEvent[UIEvent["entered"] = 5007] = "entered";
        UIEvent[UIEvent["exit"] = 5008] = "exit";
        UIEvent[UIEvent["exited"] = 5009] = "exited";
    })(UIEvent = EventType.UIEvent || (EventType.UIEvent = {}));
    //音效事件
    var AudioEvent;
    (function (AudioEvent) {
        AudioEvent[AudioEvent["startIndex"] = 6000] = "startIndex";
        AudioEvent[AudioEvent["playBGM"] = 6001] = "playBGM";
        AudioEvent[AudioEvent["playEffect"] = 6002] = "playEffect";
        AudioEvent[AudioEvent["playClickBtn"] = 6003] = "playClickBtn";
        AudioEvent[AudioEvent["stopBGM"] = 6004] = "stopBGM";
    })(AudioEvent = EventType.AudioEvent || (EventType.AudioEvent = {}));
    //阿拉丁数据统计事件
    var ALDEvent;
    (function (ALDEvent) {
        ALDEvent[ALDEvent["startIndex"] = 7000] = "startIndex";
        ALDEvent[ALDEvent["levelStart"] = 7001] = "levelStart";
        ALDEvent[ALDEvent["levelWin"] = 7002] = "levelWin";
        ALDEvent[ALDEvent["levelLose"] = 7003] = "levelLose";
    })(ALDEvent = EventType.ALDEvent || (EventType.ALDEvent = {}));
    //玩家资产事件
    var AssetEvent;
    (function (AssetEvent) {
        AssetEvent[AssetEvent["startIndex"] = 9000] = "startIndex";
        AssetEvent[AssetEvent["powerChanged"] = 9001] = "powerChanged";
        AssetEvent[AssetEvent["powerUnEnough"] = 9002] = "powerUnEnough";
        AssetEvent[AssetEvent["consumePower"] = 9003] = "consumePower";
        AssetEvent[AssetEvent["getPower"] = 9004] = "getPower";
    })(AssetEvent = EventType.AssetEvent || (EventType.AssetEvent = {}));
    /**触摸控制器事件，适用于只有一个节点接收触摸操作的场景，从11000开始 */
    var CtrlEvent;
    (function (CtrlEvent) {
        CtrlEvent[CtrlEvent["startIndex"] = 11000] = "startIndex";
        CtrlEvent[CtrlEvent["ctrlStart"] = 11001] = "ctrlStart";
        CtrlEvent[CtrlEvent["ctrlEnd"] = 11002] = "ctrlEnd";
        CtrlEvent[CtrlEvent["touchStart"] = 11003] = "touchStart";
        CtrlEvent[CtrlEvent["touchMove"] = 11004] = "touchMove";
        CtrlEvent[CtrlEvent["touchEnd"] = 11005] = "touchEnd";
        CtrlEvent[CtrlEvent["touchStay"] = 11006] = "touchStay";
    })(CtrlEvent = EventType.CtrlEvent || (EventType.CtrlEvent = {}));
    /**商城相关时间，从12000开始 */
    var ShopEvent;
    (function (ShopEvent) {
        ShopEvent[ShopEvent["startIndex"] = 12000] = "startIndex";
        ShopEvent[ShopEvent["chooseItem"] = 12001] = "chooseItem";
    })(ShopEvent = EventType.ShopEvent || (EventType.ShopEvent = {}));
    //关卡事件，与游戏玩法相关，从 100000 开始
    var LevelEvent;
    (function (LevelEvent) {
        LevelEvent[LevelEvent["startIndex"] = 100000] = "startIndex";
    })(LevelEvent = EventType.LevelEvent || (EventType.LevelEvent = {}));
})(EventType = exports.EventType || (exports.EventType = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXEdhbWVTcGVjaWFsXFxHYW1lRXZlbnRUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdCQUF3Qjs7QUFFeEIsZ0JBQWdCO0FBQ2hCLElBQWMsU0FBUyxDQW9IdEI7QUFwSEQsV0FBYyxTQUFTO0lBQ25CLHFCQUFxQjtJQUNyQixJQUFZLGFBY1g7SUFkRCxXQUFZLGFBQWE7UUFDckIsZ0VBQWlCLENBQUE7UUFDakIsZ0VBQVUsQ0FBQTtRQUNWLHNFQUFhLENBQUE7UUFDYiw4REFBUyxDQUFBO1FBQ1QsZ0VBQVUsQ0FBQTtRQUNWLDhEQUFTLENBQUE7UUFDVCxzRUFBYSxDQUFBO1FBQ2Isd0VBQWMsQ0FBQTtRQUNkLDhEQUFTLENBQUE7UUFDVCxnRUFBVSxDQUFBO1FBQ1YsZ0VBQVUsQ0FBQTtRQUNWLGtFQUFXLENBQUE7UUFDWCw4RUFBaUIsQ0FBQTtJQUNyQixDQUFDLEVBZFcsYUFBYSxHQUFiLHVCQUFhLEtBQWIsdUJBQWEsUUFjeEI7SUFDRCxvQkFBb0I7SUFDcEIsSUFBWSxjQUtYO0lBTEQsV0FBWSxjQUFjO1FBQ3RCLGtFQUFpQixDQUFBO1FBQ2pCLHNFQUFZLENBQUE7UUFDWixzRUFBWSxDQUFBO1FBQ1osMEVBQWMsQ0FBQTtJQUNsQixDQUFDLEVBTFcsY0FBYyxHQUFkLHdCQUFjLEtBQWQsd0JBQWMsUUFLekI7SUFDRCxvQkFBb0I7SUFDcEIsSUFBWSxlQUtYO0lBTEQsV0FBWSxlQUFlO1FBQ3ZCLG9FQUFpQixDQUFBO1FBQ2pCLGdGQUFnQixDQUFBO1FBQ2hCLGtGQUFpQixDQUFBO0lBRXJCLENBQUMsRUFMVyxlQUFlLEdBQWYseUJBQWUsS0FBZix5QkFBZSxRQUsxQjtJQUVELFNBQVM7SUFDVCxJQUFZLFFBY1g7SUFkRCxXQUFZLFFBQVE7UUFDaEIsc0RBQWlCLENBQUE7UUFDakIsZ0RBQU8sQ0FBQTtRQUNQLG9EQUFTLENBQUE7UUFDVCxzREFBVSxDQUFBO1FBQ1Ysc0RBQVUsQ0FBQTtRQUNWLDBEQUFZLENBQUE7UUFDWix3REFBVyxDQUFBO1FBQ1gsc0RBQVUsQ0FBQTtRQUNWLHdEQUFXLENBQUE7UUFDWCwwREFBWSxDQUFBO1FBQ1osNEVBQXFCLENBQUE7UUFDckIsMERBQVksQ0FBQTtRQUNaLHdEQUFXLENBQUE7SUFDZixDQUFDLEVBZFcsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUFjbkI7SUFFRCxRQUFRO0lBQ1IsSUFBWSxPQVlYO0lBWkQsV0FBWSxPQUFPO1FBQ2Ysb0RBQWlCLENBQUE7UUFDakIsd0RBQVksQ0FBQTtRQUNaLG9FQUFrQixDQUFBO1FBQ2xCLDhDQUFPLENBQUE7UUFDUCwwREFBYSxDQUFBO1FBQ2IsMERBQWEsQ0FBQTtRQUViLDBDQUFLLENBQUE7UUFDTCw4Q0FBTyxDQUFBO1FBQ1Asd0NBQUksQ0FBQTtRQUNKLDRDQUFNLENBQUE7SUFDVixDQUFDLEVBWlcsT0FBTyxHQUFQLGlCQUFPLEtBQVAsaUJBQU8sUUFZbEI7SUFFRCxNQUFNO0lBQ04sSUFBWSxVQU1YO0lBTkQsV0FBWSxVQUFVO1FBQ2xCLDBEQUFpQixDQUFBO1FBQ2pCLG9EQUFPLENBQUE7UUFDUCwwREFBVSxDQUFBO1FBQ1YsOERBQVksQ0FBQTtRQUNaLG9EQUFPLENBQUE7SUFDWCxDQUFDLEVBTlcsVUFBVSxHQUFWLG9CQUFVLEtBQVYsb0JBQVUsUUFNckI7SUFFRCxXQUFXO0lBQ1gsSUFBWSxRQUtYO0lBTEQsV0FBWSxRQUFRO1FBQ2hCLHNEQUFpQixDQUFBO1FBQ2pCLHNEQUFVLENBQUE7UUFDVixrREFBUSxDQUFBO1FBQ1Isb0RBQVMsQ0FBQTtJQUNiLENBQUMsRUFMVyxRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQUtuQjtJQUVELFFBQVE7SUFDUixJQUFZLFVBTVg7SUFORCxXQUFZLFVBQVU7UUFDbEIsMERBQWlCLENBQUE7UUFDakIsOERBQVksQ0FBQTtRQUNaLGdFQUFhLENBQUE7UUFDYiw4REFBWSxDQUFBO1FBQ1osc0RBQVEsQ0FBQTtJQUNaLENBQUMsRUFOVyxVQUFVLEdBQVYsb0JBQVUsS0FBVixvQkFBVSxRQU1yQjtJQUVELHlDQUF5QztJQUN6QyxJQUFZLFNBU1g7SUFURCxXQUFZLFNBQVM7UUFDakIseURBQWtCLENBQUE7UUFDbEIsdURBQVMsQ0FBQTtRQUNULG1EQUFPLENBQUE7UUFFUCx5REFBVSxDQUFBO1FBQ1YsdURBQVMsQ0FBQTtRQUNULHFEQUFRLENBQUE7UUFDUix1REFBUyxDQUFBO0lBQ2IsQ0FBQyxFQVRXLFNBQVMsR0FBVCxtQkFBUyxLQUFULG1CQUFTLFFBU3BCO0lBRUQscUJBQXFCO0lBQ3JCLElBQVksU0FLWDtJQUxELFdBQVksU0FBUztRQUNqQix5REFBa0IsQ0FBQTtRQUVsQix5REFBVSxDQUFBO0lBRWQsQ0FBQyxFQUxXLFNBQVMsR0FBVCxtQkFBUyxLQUFULG1CQUFTLFFBS3BCO0lBRUQsMEJBQTBCO0lBQzFCLElBQVksVUFHWDtJQUhELFdBQVksVUFBVTtRQUNsQiw0REFBbUIsQ0FBQTtJQUV2QixDQUFDLEVBSFcsVUFBVSxHQUFWLG9CQUFVLEtBQVYsb0JBQVUsUUFHckI7QUFFTCxDQUFDLEVBcEhhLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBb0h0QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5ri45oiP5Lit5YWo6YOo5L2/55So6Ieq5a6a5LmJ5LqL5Lu2566h55CG5Zmo5rOo5YaM55qE5LqL5Lu257G75Z6LXG5cbi8v6Lef5ri45oiP546p5rOV55u45YWz55qE5YWz5Y2h5Lit55qE5LqL5Lu2XG5leHBvcnQgbW9kdWxlIEV2ZW50VHlwZSB7XG4gICAgLy/muLjmiI/mtYHnqIvnm7jlhbPnmoTkuovku7Ys5LuOIDEwMDAg5byA5aeLXG4gICAgZXhwb3J0IGVudW0gRGlyZWN0b3JFdmVudCB7XG4gICAgICAgIHN0YXJ0SW5kZXggPSAxMDAwLFxuICAgICAgICBlbnRlckxvYmJ5LCAgICAgICAgICAgICAvL+i/m+WFpea4uOaIj+Wkp+WOhSjpppbpobUpXG4gICAgICAgIGhpZGVHYW1lTG9iYnksICAgICAgICAgIC8v6ZqQ6JeP6aaW6aG1XG4gICAgICAgIHN0YXJ0R2FtZSwgICAgICAgICAgICAgIC8v5byA5aeL5ri45oiP77yI54K55Ye76aaW6aG15oyJ6ZKu4oCc5byA5aeL5ri45oiP4oCd77yJXG4gICAgICAgIHN0YXJ0TGV2ZWwsICAgICAgICAgICAgIC8v5byA5aeL5YWz5Y2hXG4gICAgICAgIGV4aXRMZXZlbCwgICAgICAgICAgICAgIC8v6YCA5Ye65YWz5Y2hXG4gICAgICAgIHBsYXlOZXh0TGV2ZWwsICAgICAgICAgIC8v57un57ut5LiL5LiA5YWzXG4gICAgICAgIHJlcGxheUN1ckxldmVsLCAgICAgICAgIC8v6YeN546p5b2T5YmN5YWzXG4gICAgICAgIHBsYXllcldpbiwgICAgICAgICAgICAgIC8v5YWz5Y2h6IOc5YipXG4gICAgICAgIHBsYXllckxvc2UsICAgICAgICAgICAgIC8v5YWz5Y2h5aSx6LSlXG4gICAgICAgIHBhdXNlTGV2ZWwsICAgICAgICAgICAgIC8v5pqC5YGc5ri45oiPXG4gICAgICAgIHJlc3VtZUxldmVsLCAgICAgICAgICAgIC8v5oGi5aSN5ri45oiPXG4gICAgICAgIG1hdGNoUGxheWVyRmluaXNoLCAgICAgIC8v546p5a625Yy56YWN5a6M5oiQXG4gICAgfVxuICAgIC8v6LWE5rqQ5Yqg6L2955u45YWz5LqL5Lu277yM5LuOIDIwMDAg5byA5aeLXG4gICAgZXhwb3J0IGVudW0gTG9hZEFzc2V0RXZlbnQge1xuICAgICAgICBzdGFydEluZGV4ID0gMjAwMCxcbiAgICAgICAgc2hvd1Byb2dyZXNzLCAgICAgICAgICAgLy/mmL7npLrotYTmupDliqDovb3ov5vluqZcbiAgICAgICAgaGlkZVByb2dyZXNzLCAgICAgICAgICAgLy/pmpDol4/otYTmupDliqDovb3ov5vluqZcbiAgICAgICAgdXBkYXRlUHJvZ3Jlc3MsICAgICAgICAgLy/mm7TmlrDotYTmupDliqDovb3ov5vluqZcbiAgICB9XG4gICAgLy/muLjmiI/mlbDmja7nm7jlhbPkuovku7bvvIzku44gMzAwMCDlvIDlp4tcbiAgICBleHBvcnQgZW51bSBQbGF5ZXJEYXRhRXZlbnQge1xuICAgICAgICBzdGFydEluZGV4ID0gMzAwMCxcbiAgICAgICAgdXBkYXRlUGxheWVyRGF0YSwgICAgICAgLy/kv67mlLnnjqnlrrbmlbDmja5cbiAgICAgICAgcGxheWVyRGF0YUNoYW5nZWQsICAgICAgLy/njqnlrrbmlbDmja7mnInlj5jliqhcblxuICAgIH1cblxuICAgIC8vU0RL55u45YWz5LqL5Lu2XG4gICAgZXhwb3J0IGVudW0gU0RLRXZlbnQge1xuICAgICAgICBzdGFydEluZGV4ID0gNDAwMCxcbiAgICAgICAgc2hvd01zZyxcbiAgICAgICAgc2hvd1ZpZGVvLCAgICAgICAgICAvL+a/gOWKseinhumikVxuICAgICAgICBzaG93QmFubmVyLFxuICAgICAgICBoaWRlQmFubmVyLFxuICAgICAgICBzaG93SW5zZXJ0QWQsICAgICAgIC8v5o+S5bGP5bm/5ZGKXG4gICAgICAgIHN0YXJ0UmVjb3JkLCAgICAgICAgLy/lpLTmnaHvvJrlvIDlp4vlvZXlsY9cbiAgICAgICAgc3RvcFJlY29yZCwgICAgICAgICAvL+WktOadoe+8mue7k+adn+W9leWxj1xuICAgICAgICBzaGFyZVJlY29yZCwgICAgICAgIC8v5aS05p2h77ya5YiG5Lqr5b2V5bGPXG4gICAgICAgIGJhbm5lclJlc2l6ZSwgICAgICAgLy/lupXpg6jlub/lkYrmoI/lsLrlr7jmm7TmlrDvvIzkvKDpgJLlj4LmlbDvvJrlub/lkYrmoI/pobbpg6jkuI7lsY/luZXlupXpg6jnmoTot53nprtcbiAgICAgICAgbmF2aWdhdGVUb01pbmlQcm9ncmFtLC8v6Lez6L2s5Yiw5YW25LuW5bCP5ri45oiPXG4gICAgICAgIHZpYnJhdGVTaG9ydCwgICAgICAgLy/nn63pnIfliqhcbiAgICAgICAgdmlicmF0ZUxvbmcsICAgICAgICAvL+mVv+mch+WKqFxuICAgIH1cblxuICAgIC8vVUnnm7jlhbPkuovku7ZcbiAgICBleHBvcnQgZW51bSBVSUV2ZW50IHtcbiAgICAgICAgc3RhcnRJbmRleCA9IDUwMDAsXG4gICAgICAgIHBsYXlHb2xkQW1pbiwgICAgICAgICAgIC8v5b6X5Yiw6YeR5biB5Yqo55S7XG4gICAgICAgIGdvbGRBbmltUGxheUZpbmlzaCwgICAgIC8v6YeR5biB5Yqo55S75pKt5pS+5a6M5q+VXG4gICAgICAgIHNob3dUaXAsICAgICAgICAgICAgICAgIC8v5pi+56S65o+Q56S65L+h5oGvXG4gICAgICAgIHNob3dUb3VjaE1hc2ssICAgICAgICAgIC8v5pi+56S66Kem5pG46YGu572p77yM5bGP6JS9546p5a626Kem5pG45pON5L2cXG4gICAgICAgIGhpZGVUb3VjaE1hc2ssICAgICAgICAgIC8v6ZqQ6JeP6Kem5pG46YGu572pXG5cbiAgICAgICAgZW50ZXIsICAgICAgICAgICAgICAgICAgLy/or7fmsYLov5vlhaVVSe+8jOS8oOmAkuWPguaVsFVJ57G75Z6LXG4gICAgICAgIGVudGVyZWQsICAgICAgICAgICAgICAgIC8v5bey6L+b5YWlVUlcbiAgICAgICAgZXhpdCwgICAgICAgICAgICAgICAgICAgLy/or7fmsYLpgIDlh7pVSVxuICAgICAgICBleGl0ZWQsICAgICAgICAgICAgICAgICAvL+W3sumAgOWHulVJXG4gICAgfVxuXG4gICAgLy/pn7PmlYjkuovku7ZcbiAgICBleHBvcnQgZW51bSBBdWRpb0V2ZW50IHtcbiAgICAgICAgc3RhcnRJbmRleCA9IDYwMDAsXG4gICAgICAgIHBsYXlCR00sXG4gICAgICAgIHBsYXlFZmZlY3QsXG4gICAgICAgIHBsYXlDbGlja0J0bixcbiAgICAgICAgc3RvcEJHTSxcbiAgICB9XG5cbiAgICAvL+mYv+aLieS4geaVsOaNrue7n+iuoeS6i+S7tlxuICAgIGV4cG9ydCBlbnVtIEFMREV2ZW50IHtcbiAgICAgICAgc3RhcnRJbmRleCA9IDcwMDAsXG4gICAgICAgIGxldmVsU3RhcnQsICAgICAgICAgLy/lhbPljaHlvIDlp4tcbiAgICAgICAgbGV2ZWxXaW4sICAgICAgICAgICAvL+WFs+WNoeaIkOWKn1xuICAgICAgICBsZXZlbExvc2UsICAgICAgICAgIC8v5YWz5Y2h5aSx6LSlXG4gICAgfVxuXG4gICAgLy/njqnlrrbotYTkuqfkuovku7ZcbiAgICBleHBvcnQgZW51bSBBc3NldEV2ZW50IHtcbiAgICAgICAgc3RhcnRJbmRleCA9IDkwMDAsXG4gICAgICAgIHBvd2VyQ2hhbmdlZCwgICAgICAgLy/kvZPlipvlgLzlj5jljJZcbiAgICAgICAgcG93ZXJVbkVub3VnaCwgICAgICAvL+S9k+WKm+S4jei2s+aPkOekulxuICAgICAgICBjb25zdW1lUG93ZXIsICAgICAgIC8v6K+35rGC5raI6ICX5L2T5Yqb5omn6KGM5p+Q5LqLXG4gICAgICAgIGdldFBvd2VyLCAgICAgICAgICAgLy/lvpfliLDkvZPlipvlpZblirFcbiAgICB9XG5cbiAgICAvKirop6bmkbjmjqfliLblmajkuovku7bvvIzpgILnlKjkuo7lj6rmnInkuIDkuKroioLngrnmjqXmlLbop6bmkbjmk43kvZznmoTlnLrmma/vvIzku44xMTAwMOW8gOWniyAqL1xuICAgIGV4cG9ydCBlbnVtIEN0cmxFdmVudCB7XG4gICAgICAgIHN0YXJ0SW5kZXggPSAxMTAwMCxcbiAgICAgICAgY3RybFN0YXJ0LCAgICAgICAvL+WFs+WNoeW8gOWni++8jOW8gOWni+WFs+WNoeaTjeS9nFxuICAgICAgICBjdHJsRW5kLCAgICAgICAgIC8v5YWz5Y2h57uT5p2f77yM5YGc5q2i5YWz5Y2h5pON5L2cXG5cbiAgICAgICAgdG91Y2hTdGFydCwgICAgICAgICAvL+aMieS4i1xuICAgICAgICB0b3VjaE1vdmUsICAgICAgICAgIC8v56e75YqoXG4gICAgICAgIHRvdWNoRW5kLCAgICAgICAgICAgLy/mnb7lvIBcbiAgICAgICAgdG91Y2hTdGF5LCAgICAgICAgICAvL+aMgee7reaMieS9j1xuICAgIH1cblxuICAgIC8qKuWVhuWfjuebuOWFs+aXtumXtO+8jOS7jjEyMDAw5byA5aeLICovXG4gICAgZXhwb3J0IGVudW0gU2hvcEV2ZW50IHtcbiAgICAgICAgc3RhcnRJbmRleCA9IDEyMDAwLFxuXG4gICAgICAgIGNob29zZUl0ZW0sICAgICAgICAgLy/pgInkuK3kuobllYblk4HpoblcblxuICAgIH1cblxuICAgIC8v5YWz5Y2h5LqL5Lu277yM5LiO5ri45oiP546p5rOV55u45YWz77yM5LuOIDEwMDAwMCDlvIDlp4tcbiAgICBleHBvcnQgZW51bSBMZXZlbEV2ZW50IHtcbiAgICAgICAgc3RhcnRJbmRleCA9IDEwMDAwMCxcblxuICAgIH1cblxufSJdfQ==