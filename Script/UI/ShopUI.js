
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/ShopUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '42dafV1kKpFNLGA7r1ghqIt', 'ShopUI');
// myGame/Script/UI/ShopUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
var Loader_1 = require("../Common/Loader");
var PlayerData_1 = require("../Common/PlayerData");
var GameData_1 = require("../Common/GameData");
var ShopItem_1 = require("./ShopItem");
var GlobalPool_1 = require("../Common/GlobalPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**皮肤商城UI*/
var ShopUI = /** @class */ (function (_super) {
    __extends(ShopUI, _super);
    function ShopUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**场景/UI类型 */
        _this._uiType = GlobalEnum_1.GlobalEnum.UI.shop;
        /**展示商品详情的图片精灵 */
        _this.displaySprite = null;
        _this.goodsTypeToggles = null;
        /**页面滚动视图 */
        _this.pageView = null;
        /**单个商品页面的预制件 */
        _this.storePage = null; //商城页面
        /**当前商品的价格 */
        _this.price = null;
        /**商品项 */
        _this.shopItemPerfab = null;
        /**使用中提示文本 */
        _this.tipCurSkin = null;
        _this.goldTip = null;
        //3D展示方式：
        /**商品展示台 */
        _this.displayStage = null;
        /**展示3D模型节点的父节点 */
        _this.modelStage = null;
        /**商品展示台相机 */
        _this.camera = null;
        /**当前用来展示的3D模型节点 */
        _this.curItemModel = null;
        /**3D模型动作 */
        _this.modelTween = null;
        /**当前选中的商品项 */
        _this.curItem = null;
        return _this;
    }
    Object.defineProperty(ShopUI.prototype, "uiType", {
        get: function () { return this._uiType; },
        enumerable: true,
        configurable: true
    });
    ShopUI.prototype.initPage = function () {
        GlobalPool_1.default.createPool(this.shopItemPerfab.name, this.shopItemPerfab, this.shopItemPerfab.name);
        GlobalPool_1.default.createPool(this.storePage.name, this.storePage);
    };
    ShopUI.prototype.resetPage = function () {
        var pages = this.pageView.getPages();
        for (var i = pages.length - 1; i >= 0; --i) {
            GlobalPool_1.default.putAllChildren(pages[i]);
        }
        this.pageView.removeAllPages();
    };
    ShopUI.prototype.initGoldTip = function () {
        this.goldTip.active = false;
    };
    ShopUI.prototype.resetGoldTip = function () {
        this.goldTip.stopAllActions();
        this.goldTip.opacity = 255;
        this.goldTip.active = false;
    };
    ShopUI.prototype.initDisplayStage = function () {
        var wg = this.displayStage.getComponent(cc.Widget);
        if (!!wg) {
            wg.updateAlignment();
        }
        var y = this.displayStage.y;
        var rate = y / cc.find("Canvas").height;
        this.camera.rect = cc.rect(0, rate, 1, 1);
    };
    ShopUI.prototype.resetDisplayStage = function () {
        if (!!this.modelTween) {
            this.modelTween.stop();
            this.modelTween = null;
        }
        if (!!this.curItemModel) {
            GlobalPool_1.default.put(this.curItemModel);
            this.curItemModel = null;
        }
    };
    ShopUI.prototype.init = function () {
        this.curItem = null;
        this.curType = null;
        this.initComponents();
        this.initDisplayStage();
        this.initGoldTip();
        this.initPage();
        this.onEvents();
    };
    ShopUI.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.ShopEvent.chooseItem, this.onChooseItem, this);
    };
    ShopUI.prototype.reset = function () {
        this.curItem = null;
        this.curType = null;
        this.resetDisplayStage();
        this.resetGoldTip();
        this.resetPage();
    };
    ShopUI.prototype.show = function () {
        this.node.active = true;
        this.reset();
        var dir = this.getRootUrl() + GlobalEnum_1.GlobalEnum.UrlPath.skinItemDir;
        Loader_1.default.loadResDir(dir, this.setData.bind(this), cc.SpriteFrame, true);
    };
    ShopUI.prototype.setData = function () {
        var toggles = this.goodsTypeToggles.toggleItems;
        if (toggles.length > 0) {
            toggles[0].isChecked = true;
            var handler = toggles[0].checkEvents[0];
            if (!handler) {
                console.warn("商品类型分页标签未绑定回调函数");
                return;
            }
            var type = handler.customEventData;
            this.showGoods(type);
        }
    };
    ShopUI.prototype.hide = function () {
        this.reset();
        this.node.active = false;
    };
    ShopUI.prototype.getRootUrl = function () {
        return GlobalEnum_1.GlobalEnum.UrlPath.skinRootUrl + this.curType + "/";
    };
    ShopUI.prototype.onChooseType = function (e, data) {
        if (this.curType == data)
            return;
        this.showGoods(data);
    };
    /**
     * 显示商品
     * 应当新建一个展示台的类，负责根据实际游戏展示对应的商品模型或图片
     */
    ShopUI.prototype.showGoods = function (type) {
        this.resetPage();
        this.curType = type;
        var goodsData = GameData_1.default.getGoodsData(type);
        var maxCount = 6;
        var unlockSkins = PlayerData_1.default.getData("gameData." + type + ".owned");
        var curSkin = PlayerData_1.default.getData("gameData." + type + ".cur");
        if (typeof curSkin === "number") {
            curSkin = curSkin.toString();
        }
        var page = cc.instantiate(this.storePage);
        this.pageView.addPage(page);
        var rootPath = this.getRootUrl();
        var displayPath = rootPath + GlobalEnum_1.GlobalEnum.UrlPath.skinDisplayDir + "/";
        var itemPath = rootPath + GlobalEnum_1.GlobalEnum.UrlPath.skinItemDir + "/";
        var pageIndex = 0;
        for (var key in goodsData) {
            if (page.childrenCount >= maxCount) {
                page = cc.instantiate(this.storePage);
                this.pageView.addPage(page);
            }
            var data = JSON.parse(JSON.stringify(goodsData[key]));
            data.itemUrl = itemPath + data.itemUrl;
            data.displayUrl = displayPath + data.displayUrl;
            data.unlock = unlockSkins.indexOf(parseInt(key)) >= 0;
            var node = GlobalPool_1.default.get(this.shopItemPerfab.name, data);
            if (key == curSkin) {
                var item = node.getComponent(ShopItem_1.default);
                item.isChecked = true;
                this.curItem = item;
                pageIndex = this.pageView.getPages().length - 1;
            }
            page.addChild(node);
        }
        this.pageView.scrollToPage(pageIndex, 0);
        if (!!this.curItem) {
            this.showItemData(this.curItem.data);
        }
    };
    ShopUI.prototype.onChooseItem = function (item) {
        if (!!this.curItem) {
            if (this.curItem.Id === item.Id)
                return;
            this.curItem.isChecked = false;
        }
        this.curItem = item;
        if (this.curItem.data.unlock) {
            this.setCurSkin(this.curType, this.curItem.data.id);
        }
        this.showItemData(item.data);
    };
    /**展示商品详情 */
    ShopUI.prototype.showItemData = function (data) {
        //图片展示方式：
        // this.showGoodsImg(data.displayUrl);
        //3D模型展示方式：
        this.showGoodsModel(data.model, data.skin);
        if (data.unlock) {
            this.showUsing();
        }
        else {
            this.showPrice(data.price);
        }
    };
    /**2D图片展示 */
    ShopUI.prototype.showGoodsImg = function (img) {
        var _this = this;
        Loader_1.default.loadRes(img, function (res) {
            if (_this.displaySprite.isValid) {
                _this.displaySprite.spriteFrame = Loader_1.default.getSpriteFrame(img);
            }
        }, false);
    };
    /**3D模型展示 */
    ShopUI.prototype.showGoodsModel = function (model, skin) {
        var _this = this;
        var angle = cc.v3();
        if (!!this.modelTween) {
            this.modelTween.stop();
            this.modelTween = null;
        }
        if (!!this.curItemModel) {
            angle.set(this.curItemModel.eulerAngles);
            GlobalPool_1.default.put(this.curItemModel);
            this.curItemModel = null;
        }
        this.curItemModel = GlobalPool_1.default.get(model);
        var url = this.getRootUrl() + GlobalEnum_1.GlobalEnum.UrlPath.skinTextureDir + "/" + skin;
        Loader_1.default.loadRes(url, function (res) {
            if (!_this.node.active || !_this.node.isValid)
                return;
            var mesh = _this.curItemModel.getComponentInChildren(cc.MeshRenderer);
            var sf;
            if (res instanceof cc.SpriteFrame) {
                sf = res;
            }
            else if (res instanceof cc.Texture2D) {
                sf = new cc.SpriteFrame(res);
            }
            mesh.getMaterial(0).setProperty("diffuseTexture", sf);
        }, false);
        this.modelStage.addChild(this.curItemModel);
        this.curItemModel.setPosition(cc.v3(0, 0, 0));
        this.curItemModel.eulerAngles = angle;
        this.modelTween = cc.tween(this.curItemModel).repeatForever(cc.tween(this.curItemModel).by(4, { eulerAngles: cc.v3(0, 180, 0) })).union().start();
    };
    ShopUI.prototype.showPrice = function (price) {
        this.price.string = price.toString();
    };
    ShopUI.prototype.showUsing = function () {
        this.price.string = "使用中";
    };
    /**退出商城 */
    ShopUI.prototype.onBtnExit = function () {
        this.emit(GameEventType_1.EventType.UIEvent.exit, this.uiType);
    };
    /**购买 */
    ShopUI.prototype.onBtnBuy = function () {
        if (!this.curItem)
            return;
        if (this.curItem.data.unlock)
            return;
        var price = this.curItem.data.price;
        var gold = PlayerData_1.default.getData("gameData.asset.gold");
        if (gold < price) {
            this.tipGoldUnenough();
        }
        else {
            this.subGold(price);
            this.unlockSkin(this.curType, this.curItem.data.id);
            this.setCurSkin(this.curType, this.curItem.data.id);
            this.curItem.data.unlock = true;
            this.curItem.unlock = true;
            this.showUsing();
        }
    };
    ShopUI.prototype.subGold = function (gold) {
        this.emit(GameEventType_1.EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData.asset.gold",
            value: gold,
            mode: "-",
        });
    };
    /**
     * 解锁皮肤
     * @param type 皮肤类型
     * @param id 皮肤id
     */
    ShopUI.prototype.unlockSkin = function (type, id) {
        this.emit(GameEventType_1.EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData." + type + ".owned",
            value: parseInt(id),
            mode: "push"
        });
    };
    /**
     * 设置当前使用的皮肤
     * @param type 皮肤类型
     * @param id 皮肤id
     */
    ShopUI.prototype.setCurSkin = function (type, id) {
        this.emit(GameEventType_1.EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData." + type + ".cur",
            value: parseInt(id),
            mode: "="
        });
    };
    /** 提示金币不足 */
    ShopUI.prototype.tipGoldUnenough = function () {
        this.goldTip.stopAllActions();
        this.goldTip.active = true;
        this.goldTip.opacity = 255;
        this.goldTip.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(1)));
    };
    /**观看视频 */
    ShopUI.prototype.clickVideoBt = function () {
        var _this = this;
        this.emit(GameEventType_1.EventType.SDKEvent.showVideo, function () {
            _this.emit(GameEventType_1.EventType.UIEvent.playGoldAmin, {
                cb: function () {
                    _this.emit(GameEventType_1.EventType.PlayerDataEvent.updatePlayerData, {
                        type: "gameData",
                        attribute: "gameData.asset.gold",
                        value: 200,
                        mode: "+"
                    });
                }
            });
        });
    };
    __decorate([
        property(cc.Sprite)
    ], ShopUI.prototype, "displaySprite", void 0);
    __decorate([
        property(cc.ToggleContainer)
    ], ShopUI.prototype, "goodsTypeToggles", void 0);
    __decorate([
        property(cc.PageView)
    ], ShopUI.prototype, "pageView", void 0);
    __decorate([
        property(cc.Prefab)
    ], ShopUI.prototype, "storePage", void 0);
    __decorate([
        property(cc.Label)
    ], ShopUI.prototype, "price", void 0);
    __decorate([
        property(cc.Prefab)
    ], ShopUI.prototype, "shopItemPerfab", void 0);
    __decorate([
        property(cc.Node)
    ], ShopUI.prototype, "tipCurSkin", void 0);
    __decorate([
        property(cc.Node)
    ], ShopUI.prototype, "goldTip", void 0);
    __decorate([
        property(cc.Node)
    ], ShopUI.prototype, "displayStage", void 0);
    __decorate([
        property(cc.Node)
    ], ShopUI.prototype, "modelStage", void 0);
    __decorate([
        property(cc.Camera)
    ], ShopUI.prototype, "camera", void 0);
    ShopUI = __decorate([
        ccclass
    ], ShopUI);
    return ShopUI;
}(yyComponent_1.default));
exports.default = ShopUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxTaG9wVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUVoRCw4REFBeUQ7QUFDekQsd0RBQXVEO0FBQ3ZELDJDQUFzQztBQUN0QyxtREFBOEM7QUFDOUMsK0NBQTBDO0FBQzFDLHVDQUFrQztBQUNsQyxtREFBOEM7QUFFeEMsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1QyxXQUFXO0FBRVg7SUFBb0MsMEJBQVc7SUFEL0M7UUFBQSxxRUFnVkM7UUE3VUcsYUFBYTtRQUNILGFBQU8sR0FBa0IsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBR3RELGlCQUFpQjtRQUVQLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLHNCQUFnQixHQUF1QixJQUFJLENBQUM7UUFFdEQsWUFBWTtRQUVGLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBWXZDLGdCQUFnQjtRQUVoQixlQUFTLEdBQWMsSUFBSSxDQUFDLENBQUMsTUFBTTtRQUNuQyxhQUFhO1FBRWIsV0FBSyxHQUFhLElBQUksQ0FBQztRQUN2QixTQUFTO1FBRVQsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFDakMsYUFBYTtRQUVILGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFVbEMsU0FBUztRQUNULFdBQVc7UUFFRCxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUN2QyxrQkFBa0I7UUFFUixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUNyQyxhQUFhO1FBRUgsWUFBTSxHQUFjLElBQUksQ0FBQztRQUNuQyxtQkFBbUI7UUFDVCxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUN2QyxZQUFZO1FBQ0YsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUF3SHRDLGNBQWM7UUFDSixhQUFPLEdBQWEsSUFBSSxDQUFDOztJQXVKdkMsQ0FBQztJQTNV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LEVBQUUsQ0FBQyxlQUFlLENBQUM7b0RBQ3lCO0lBSXREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7NENBQ2lCO0lBY3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5Q0FDSTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNhO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ21CO0lBRXJDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ2dCO0lBYWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ3FCO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ21CO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MENBQ2U7SUEzRGxCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0ErVTFCO0lBQUQsYUFBQztDQS9VRCxBQStVQyxDQS9VbUMscUJBQVcsR0ErVTlDO2tCQS9Vb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5eUNvbXBvbmVudCBmcm9tIFwiLi4vQ29tbW9uL3l5Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElVSSB9IGZyb20gXCIuL0lVSVwiO1xyXG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxFbnVtIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dsb2JhbEVudW1cIjtcclxuaW1wb3J0IExvYWRlciBmcm9tIFwiLi4vQ29tbW9uL0xvYWRlclwiO1xyXG5pbXBvcnQgUGxheWVyRGF0YSBmcm9tIFwiLi4vQ29tbW9uL1BsYXllckRhdGFcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi9Db21tb24vR2FtZURhdGFcIjtcclxuaW1wb3J0IFNob3BJdGVtIGZyb20gXCIuL1Nob3BJdGVtXCI7XHJcbmltcG9ydCBHbG9iYWxQb29sIGZyb20gXCIuLi9Db21tb24vR2xvYmFsUG9vbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoq55qu6IKk5ZWG5Z+OVUkqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wVUkgZXh0ZW5kcyB5eUNvbXBvbmVudCBpbXBsZW1lbnRzIElVSSB7XHJcblxyXG4gICAgLyoq5Zy65pmvL1VJ57G75Z6LICovXHJcbiAgICBwcm90ZWN0ZWQgX3VpVHlwZTogR2xvYmFsRW51bS5VSSA9IEdsb2JhbEVudW0uVUkuc2hvcDtcclxuICAgIHB1YmxpYyBnZXQgdWlUeXBlKCkgeyByZXR1cm4gdGhpcy5fdWlUeXBlOyB9XHJcblxyXG4gICAgLyoq5bGV56S65ZWG5ZOB6K+m5oOF55qE5Zu+54mH57K+54G1ICovXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJvdGVjdGVkIGRpc3BsYXlTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZUNvbnRhaW5lcilcclxuICAgIHByb3RlY3RlZCBnb29kc1R5cGVUb2dnbGVzOiBjYy5Ub2dnbGVDb250YWluZXIgPSBudWxsO1xyXG5cclxuICAgIC8qKumhtemdoua7muWKqOinhuWbviAqL1xyXG4gICAgQHByb3BlcnR5KGNjLlBhZ2VWaWV3KVxyXG4gICAgcHJvdGVjdGVkIHBhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFBhZ2UoKSB7XHJcbiAgICAgICAgR2xvYmFsUG9vbC5jcmVhdGVQb29sKHRoaXMuc2hvcEl0ZW1QZXJmYWIubmFtZSwgdGhpcy5zaG9wSXRlbVBlcmZhYiwgdGhpcy5zaG9wSXRlbVBlcmZhYi5uYW1lKTtcclxuICAgICAgICBHbG9iYWxQb29sLmNyZWF0ZVBvb2wodGhpcy5zdG9yZVBhZ2UubmFtZSwgdGhpcy5zdG9yZVBhZ2UpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlc2V0UGFnZSgpIHtcclxuICAgICAgICBsZXQgcGFnZXMgPSB0aGlzLnBhZ2VWaWV3LmdldFBhZ2VzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHBhZ2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbFBvb2wucHV0QWxsQ2hpbGRyZW4ocGFnZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LnJlbW92ZUFsbFBhZ2VzKCk7XHJcbiAgICB9XHJcbiAgICAvKirljZXkuKrllYblk4HpobXpnaLnmoTpooTliLbku7YgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBzdG9yZVBhZ2U6IGNjLlByZWZhYiA9IG51bGw7IC8v5ZWG5Z+O6aG16Z2iXHJcbiAgICAvKirlvZPliY3llYblk4HnmoTku7fmoLwgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaWNlOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKirllYblk4HpobkgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBzaG9wSXRlbVBlcmZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8qKuS9v+eUqOS4reaPkOekuuaWh+acrCAqL1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm90ZWN0ZWQgdGlwQ3VyU2tpbjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByb3RlY3RlZCBnb2xkVGlwOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBpbml0R29sZFRpcCgpIHtcclxuICAgICAgICB0aGlzLmdvbGRUaXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRHb2xkVGlwKCkge1xyXG4gICAgICAgIHRoaXMuZ29sZFRpcC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuZ29sZFRpcC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuZ29sZFRpcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLzNE5bGV56S65pa55byP77yaXHJcbiAgICAvKirllYblk4HlsZXnpLrlj7AgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJvdGVjdGVkIGRpc3BsYXlTdGFnZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKirlsZXnpLozROaooeWei+iKgueCueeahOeItuiKgueCuSAqL1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm90ZWN0ZWQgbW9kZWxTdGFnZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKirllYblk4HlsZXnpLrlj7Dnm7jmnLogKi9cclxuICAgIEBwcm9wZXJ0eShjYy5DYW1lcmEpXHJcbiAgICBwcm90ZWN0ZWQgY2FtZXJhOiBjYy5DYW1lcmEgPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN55So5p2l5bGV56S655qEM0TmqKHlnovoioLngrkgKi9cclxuICAgIHByb3RlY3RlZCBjdXJJdGVtTW9kZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqM0TmqKHlnovliqjkvZwgKi9cclxuICAgIHByb3RlY3RlZCBtb2RlbFR3ZWVuOiBjYy5Ud2VlbiA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdERpc3BsYXlTdGFnZSgpIHtcclxuICAgICAgICBsZXQgd2cgPSB0aGlzLmRpc3BsYXlTdGFnZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICBpZiAoISF3Zykge1xyXG4gICAgICAgICAgICB3Zy51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHkgPSB0aGlzLmRpc3BsYXlTdGFnZS55O1xyXG4gICAgICAgIGxldCByYXRlID0geSAvIGNjLmZpbmQoXCJDYW52YXNcIikuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnJlY3QgPSBjYy5yZWN0KDAsIHJhdGUsIDEsIDEpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlc2V0RGlzcGxheVN0YWdlKCkge1xyXG4gICAgICAgIGlmICghIXRoaXMubW9kZWxUd2Vlbikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsVHdlZW4uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsVHdlZW4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISF0aGlzLmN1ckl0ZW1Nb2RlbCkge1xyXG4gICAgICAgICAgICBHbG9iYWxQb29sLnB1dCh0aGlzLmN1ckl0ZW1Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VySXRlbU1vZGVsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuY3VySXRlbSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJUeXBlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluaXRDb21wb25lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RGlzcGxheVN0YWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbml0R29sZFRpcCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFBhZ2UoKTtcclxuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25FdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuU2hvcEV2ZW50LmNob29zZUl0ZW0sIHRoaXMub25DaG9vc2VJdGVtLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmN1ckl0ZW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY3VyVHlwZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yZXNldERpc3BsYXlTdGFnZSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXRHb2xkVGlwKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldFBhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgbGV0IGRpciA9IHRoaXMuZ2V0Um9vdFVybCgpICsgR2xvYmFsRW51bS5VcmxQYXRoLnNraW5JdGVtRGlyO1xyXG4gICAgICAgIExvYWRlci5sb2FkUmVzRGlyKGRpciwgdGhpcy5zZXREYXRhLmJpbmQodGhpcyksIGNjLlNwcml0ZUZyYW1lLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0RGF0YSgpIHtcclxuICAgICAgICBsZXQgdG9nZ2xlcyA9IHRoaXMuZ29vZHNUeXBlVG9nZ2xlcy50b2dnbGVJdGVtcztcclxuICAgICAgICBpZiAodG9nZ2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZXNbMF0uaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZXIgPSB0b2dnbGVzWzBdLmNoZWNrRXZlbnRzWzBdO1xyXG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuWVhuWTgeexu+Wei+WIhumhteagh+etvuacque7keWumuWbnuiwg+WHveaVsFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdHlwZTogR2xvYmFsRW51bS5Hb29kc1R5cGUgPSBoYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSBhcyBHbG9iYWxFbnVtLkdvb2RzVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93R29vZHModHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Um9vdFVybCgpIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsRW51bS5VcmxQYXRoLnNraW5Sb290VXJsICsgdGhpcy5jdXJUeXBlICsgXCIvXCI7XHJcbiAgICB9XHJcbiAgICAvKirlvZPliY3pgInkuK3nmoTllYblk4HliIbpobXnmoTnsbvlnosgKi9cclxuICAgIHByb3RlY3RlZCBjdXJUeXBlOiBHbG9iYWxFbnVtLkdvb2RzVHlwZTtcclxuICAgIHByb3RlY3RlZCBvbkNob29zZVR5cGUoZSwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1clR5cGUgPT0gZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2hvd0dvb2RzKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrllYblk4FcclxuICAgICAqIOW6lOW9k+aWsOW7uuS4gOS4quWxleekuuWPsOeahOexu++8jOi0n+i0o+agueaNruWunumZhea4uOaIj+WxleekuuWvueW6lOeahOWVhuWTgeaooeWei+aIluWbvueJh1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2hvd0dvb2RzKHR5cGU6IEdsb2JhbEVudW0uR29vZHNUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldFBhZ2UoKTtcclxuICAgICAgICB0aGlzLmN1clR5cGUgPSB0eXBlO1xyXG4gICAgICAgIGxldCBnb29kc0RhdGEgPSBHYW1lRGF0YS5nZXRHb29kc0RhdGEodHlwZSk7XHJcbiAgICAgICAgbGV0IG1heENvdW50ID0gNjtcclxuICAgICAgICBsZXQgdW5sb2NrU2tpbnMgPSBQbGF5ZXJEYXRhLmdldERhdGEoXCJnYW1lRGF0YS5cIiArIHR5cGUgKyBcIi5vd25lZFwiKTtcclxuICAgICAgICBsZXQgY3VyU2tpbiA9IFBsYXllckRhdGEuZ2V0RGF0YShcImdhbWVEYXRhLlwiICsgdHlwZSArIFwiLmN1clwiKTtcclxuICAgICAgICBpZiAodHlwZW9mIGN1clNraW4gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgY3VyU2tpbiA9IGN1clNraW4udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhZ2U6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0b3JlUGFnZSk7XHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5hZGRQYWdlKHBhZ2UpO1xyXG4gICAgICAgIGxldCByb290UGF0aCA9IHRoaXMuZ2V0Um9vdFVybCgpO1xyXG4gICAgICAgIGxldCBkaXNwbGF5UGF0aCA9IHJvb3RQYXRoICsgR2xvYmFsRW51bS5VcmxQYXRoLnNraW5EaXNwbGF5RGlyICsgXCIvXCI7XHJcbiAgICAgICAgbGV0IGl0ZW1QYXRoID0gcm9vdFBhdGggKyBHbG9iYWxFbnVtLlVybFBhdGguc2tpbkl0ZW1EaXIgKyBcIi9cIjtcclxuICAgICAgICBsZXQgcGFnZUluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZ29vZHNEYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdlLmNoaWxkcmVuQ291bnQgPj0gbWF4Q291bnQpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2UgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0b3JlUGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LmFkZFBhZ2UocGFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGdvb2RzRGF0YVtrZXldKSk7XHJcbiAgICAgICAgICAgIGRhdGEuaXRlbVVybCA9IGl0ZW1QYXRoICsgZGF0YS5pdGVtVXJsO1xyXG4gICAgICAgICAgICBkYXRhLmRpc3BsYXlVcmwgPSBkaXNwbGF5UGF0aCArIGRhdGEuZGlzcGxheVVybDtcclxuICAgICAgICAgICAgZGF0YS51bmxvY2sgPSB1bmxvY2tTa2lucy5pbmRleE9mKHBhcnNlSW50KGtleSkpID49IDA7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gR2xvYmFsUG9vbC5nZXQodGhpcy5zaG9wSXRlbVBlcmZhYi5uYW1lLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBjdXJTa2luKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5vZGUuZ2V0Q29tcG9uZW50KFNob3BJdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VySXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICBwYWdlSW5kZXggPSB0aGlzLnBhZ2VWaWV3LmdldFBhZ2VzKCkubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYWdlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZShwYWdlSW5kZXgsIDApO1xyXG4gICAgICAgIGlmICghIXRoaXMuY3VySXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dJdGVtRGF0YSh0aGlzLmN1ckl0ZW0uZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuW9k+WJjemAieS4reeahOWVhuWTgemhuSAqL1xyXG4gICAgcHJvdGVjdGVkIGN1ckl0ZW06IFNob3BJdGVtID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBvbkNob29zZUl0ZW0oaXRlbTogU2hvcEl0ZW0pIHtcclxuICAgICAgICBpZiAoISF0aGlzLmN1ckl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VySXRlbS5JZCA9PT0gaXRlbS5JZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmN1ckl0ZW0uaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VySXRlbSA9IGl0ZW07XHJcbiAgICAgICAgaWYgKHRoaXMuY3VySXRlbS5kYXRhLnVubG9jaykge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1clNraW4odGhpcy5jdXJUeXBlLCB0aGlzLmN1ckl0ZW0uZGF0YS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0l0ZW1EYXRhKGl0ZW0uZGF0YSk7XHJcbiAgICB9XHJcbiAgICAvKirlsZXnpLrllYblk4Hor6bmg4UgKi9cclxuICAgIHByb3RlY3RlZCBzaG93SXRlbURhdGEoZGF0YSkge1xyXG4gICAgICAgIC8v5Zu+54mH5bGV56S65pa55byP77yaXHJcbiAgICAgICAgLy8gdGhpcy5zaG93R29vZHNJbWcoZGF0YS5kaXNwbGF5VXJsKTtcclxuICAgICAgICAvLzNE5qih5Z6L5bGV56S65pa55byP77yaXHJcbiAgICAgICAgdGhpcy5zaG93R29vZHNNb2RlbChkYXRhLm1vZGVsLCBkYXRhLnNraW4pO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS51bmxvY2spIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VXNpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcmljZShkYXRhLnByaWNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKioyROWbvueJh+WxleekuiAqL1xyXG4gICAgcHJvdGVjdGVkIHNob3dHb29kc0ltZyhpbWc6IHN0cmluZykge1xyXG4gICAgICAgIExvYWRlci5sb2FkUmVzKGltZywgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5U3ByaXRlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVNwcml0ZS5zcHJpdGVGcmFtZSA9IExvYWRlci5nZXRTcHJpdGVGcmFtZShpbWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgLyoqM0TmqKHlnovlsZXnpLogKi9cclxuICAgIHByb3RlY3RlZCBzaG93R29vZHNNb2RlbChtb2RlbDogc3RyaW5nLCBza2luOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgYW5nbGUgPSBjYy52MygpO1xyXG4gICAgICAgIGlmICghIXRoaXMubW9kZWxUd2Vlbikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsVHdlZW4uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsVHdlZW4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISF0aGlzLmN1ckl0ZW1Nb2RlbCkge1xyXG4gICAgICAgICAgICBhbmdsZS5zZXQodGhpcy5jdXJJdGVtTW9kZWwuZXVsZXJBbmdsZXMpO1xyXG4gICAgICAgICAgICBHbG9iYWxQb29sLnB1dCh0aGlzLmN1ckl0ZW1Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VySXRlbU1vZGVsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJJdGVtTW9kZWwgPSBHbG9iYWxQb29sLmdldChtb2RlbCk7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldFJvb3RVcmwoKSArIEdsb2JhbEVudW0uVXJsUGF0aC5za2luVGV4dHVyZURpciArIFwiL1wiICsgc2tpbjtcclxuICAgICAgICBMb2FkZXIubG9hZFJlcyh1cmwsIChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlIHx8ICF0aGlzLm5vZGUuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgbWVzaCA9IHRoaXMuY3VySXRlbU1vZGVsLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTWVzaFJlbmRlcmVyKTtcclxuICAgICAgICAgICAgbGV0IHNmO1xyXG4gICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgY2MuU3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNmID0gcmVzO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcyBpbnN0YW5jZW9mIGNjLlRleHR1cmUyRCkge1xyXG4gICAgICAgICAgICAgICAgc2YgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZXNoLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiZGlmZnVzZVRleHR1cmVcIiwgc2YpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5tb2RlbFN0YWdlLmFkZENoaWxkKHRoaXMuY3VySXRlbU1vZGVsKTtcclxuICAgICAgICB0aGlzLmN1ckl0ZW1Nb2RlbC5zZXRQb3NpdGlvbihjYy52MygwLCAwLCAwKSk7XHJcbiAgICAgICAgdGhpcy5jdXJJdGVtTW9kZWwuZXVsZXJBbmdsZXMgPSBhbmdsZTtcclxuICAgICAgICB0aGlzLm1vZGVsVHdlZW4gPSBjYy50d2Vlbih0aGlzLmN1ckl0ZW1Nb2RlbCkucmVwZWF0Rm9yZXZlcihjYy50d2Vlbih0aGlzLmN1ckl0ZW1Nb2RlbCkuYnkoNCwgeyBldWxlckFuZ2xlczogY2MudjMoMCwgMTgwLCAwKSB9KSkudW5pb24oKS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93UHJpY2UocHJpY2U6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHJpY2Uuc3RyaW5nID0gcHJpY2UudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzaG93VXNpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5wcmljZS5zdHJpbmcgPSBcIuS9v+eUqOS4rVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKumAgOWHuuWVhuWfjiAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQnRuRXhpdCgpIHtcclxuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlVJRXZlbnQuZXhpdCwgdGhpcy51aVR5cGUpO1xyXG4gICAgfVxyXG4gICAgLyoq6LSt5LmwICovXHJcbiAgICBwcm90ZWN0ZWQgb25CdG5CdXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmN1ckl0ZW0pIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5jdXJJdGVtLmRhdGEudW5sb2NrKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHByaWNlID0gdGhpcy5jdXJJdGVtLmRhdGEucHJpY2U7XHJcbiAgICAgICAgbGV0IGdvbGQgPSBQbGF5ZXJEYXRhLmdldERhdGEoXCJnYW1lRGF0YS5hc3NldC5nb2xkXCIpO1xyXG4gICAgICAgIGlmIChnb2xkIDwgcHJpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy50aXBHb2xkVW5lbm91Z2goKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkdvbGQocHJpY2UpO1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja1NraW4odGhpcy5jdXJUeXBlLCB0aGlzLmN1ckl0ZW0uZGF0YS5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VyU2tpbih0aGlzLmN1clR5cGUsIHRoaXMuY3VySXRlbS5kYXRhLmlkKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJJdGVtLmRhdGEudW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJJdGVtLnVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1VzaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN1YkdvbGQoZ29sZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QbGF5ZXJEYXRhRXZlbnQudXBkYXRlUGxheWVyRGF0YSwge1xyXG4gICAgICAgICAgICB0eXBlOiBcImdhbWVEYXRhXCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogXCJnYW1lRGF0YS5hc3NldC5nb2xkXCIsXHJcbiAgICAgICAgICAgIHZhbHVlOiBnb2xkLFxyXG4gICAgICAgICAgICBtb2RlOiBcIi1cIixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6Kej6ZSB55qu6IKkXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDnmq7ogqTnsbvlnotcclxuICAgICAqIEBwYXJhbSBpZCDnmq7ogqRpZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdW5sb2NrU2tpbih0eXBlLCBpZCkge1xyXG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUGxheWVyRGF0YUV2ZW50LnVwZGF0ZVBsYXllckRhdGEsIHtcclxuICAgICAgICAgICAgdHlwZTogXCJnYW1lRGF0YVwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGU6IFwiZ2FtZURhdGEuXCIgKyB0eXBlICsgXCIub3duZWRcIixcclxuICAgICAgICAgICAgdmFsdWU6IHBhcnNlSW50KGlkKSxcclxuICAgICAgICAgICAgbW9kZTogXCJwdXNoXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5b2T5YmN5L2/55So55qE55qu6IKkXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDnmq7ogqTnsbvlnotcclxuICAgICAqIEBwYXJhbSBpZCDnmq7ogqRpZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0Q3VyU2tpbih0eXBlLCBpZCkge1xyXG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUGxheWVyRGF0YUV2ZW50LnVwZGF0ZVBsYXllckRhdGEsIHtcclxuICAgICAgICAgICAgdHlwZTogXCJnYW1lRGF0YVwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGU6IFwiZ2FtZURhdGEuXCIgKyB0eXBlICsgXCIuY3VyXCIsXHJcbiAgICAgICAgICAgIHZhbHVlOiBwYXJzZUludChpZCksXHJcbiAgICAgICAgICAgIG1vZGU6IFwiPVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKiog5o+Q56S66YeR5biB5LiN6LazICovXHJcbiAgICBwcm90ZWN0ZWQgdGlwR29sZFVuZW5vdWdoKCkge1xyXG4gICAgICAgIHRoaXMuZ29sZFRpcC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuZ29sZFRpcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ29sZFRpcC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuZ29sZFRpcC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDIpLCBjYy5mYWRlT3V0KDEpKSk7XHJcbiAgICB9XHJcbiAgICAvKirop4LnnIvop4bpopEgKi9cclxuICAgIGNsaWNrVmlkZW9CdCgpIHtcclxuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNES0V2ZW50LnNob3dWaWRlbywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlVJRXZlbnQucGxheUdvbGRBbWluLCB7XHJcbiAgICAgICAgICAgICAgICBjYjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUGxheWVyRGF0YUV2ZW50LnVwZGF0ZVBsYXllckRhdGEsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJnYW1lRGF0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IFwiZ2FtZURhdGEuYXNzZXQuZ29sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIitcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=