import yyComponent from "../../Script/Common/yyComponent";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import GlobalPool from "../../Script/Common/GlobalPool";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import Loader from "../../Script/Common/Loader";
import GameData from "../../Script/Common/GameData";
import PlayerData from "../../Script/Common/PlayerData";
import ShopItem from "./ShopItem";
import ShopStage from "./ShopStage";

const { ccclass, property } = cc._decorator;
/**皮肤商城UI*/
@ccclass
export default class ShopUI extends yyComponent {

    /**场景/UI类型 */
    protected _uiType = GlobalEnum.UI.shop;
    public get uiType() { return this._uiType; }

    @property(cc.ToggleContainer)
    protected goodsTypeToggles: cc.ToggleContainer = null;

    /**页面滚动视图 */
    @property(cc.PageView)
    protected pageView: cc.PageView = null;
    protected initPage() {
        GlobalPool.createPool(this.shopItemPerfab.name, this.shopItemPerfab, this.shopItemPerfab.name);
        GlobalPool.createPool(this.storePage.name, this.storePage);
    }
    protected resetPage() {
        let pages = this.pageView.getPages();
        for (let i = pages.length - 1; i >= 0; --i) {
            GlobalPool.putAllChildren(pages[i]);
        }
        this.pageView.removeAllPages();
    }
    /**单个商品页面的预制件 */
    @property(cc.Prefab)
    protected storePage: cc.Prefab = null; //商城页面
    /**当前商品的价格 */
    @property(cc.Label)
    protected price: cc.Label = null;
    /**商品项 */
    @property(cc.Prefab)
    protected shopItemPerfab: cc.Prefab = null;
    /**商品展示台 */
    @property(ShopStage)
    protected stage: ShopStage = null;
    protected initDisplayStage() {
        this.stage.init();
    }
    protected resetDisplayStage() {
        this.stage.reset();
    }


    public init() {
        this.curItem = null;
        this.curType = null;
        this.initComponents();
        this.initDisplayStage();
        this.initPage();
        this.onEvents();
    }
    protected onEvents() {
        this.on(EventType.ShopEvent.chooseItem, this.onChooseItem, this);
    }
    public reset() {
        this.curItem = null;
        this.curType = null;
        this.resetDisplayStage();
        this.resetPage();
    }

    public show() {
        this.node.active = true;
        this.reset();
        this.setData();
    }

    protected setData() {
        let toggles = this.goodsTypeToggles.toggleItems;
        if (toggles.length > 0) {
            toggles[0].isChecked = true;
            let handler = toggles[0].checkEvents[0];
            if (!handler) {
                console.warn("商品类型分页标签未绑定回调函数");
                return;
            }
            let type = handler.customEventData;
            Loader.loadBundleDir("Skin", type + "/Item", () => {
                this.showGoods(type);
            }, cc.SpriteFrame, true);
        }
    }
    public hide() {
        this.reset();
        this.node.active = false;
    }

    /**当前选中的商品分页的类型 */
    protected curType;
    protected onChooseType(e, type) {
        if (this.curType == type) return;
        Loader.loadBundleDir("Skin", type + "/Item", () => {
            this.showGoods(type);
        }, cc.SpriteFrame, true);
    }
    /**
     * 显示商品
     * 应当新建一个展示台的类，负责根据实际游戏展示对应的商品模型或图片
     */
    protected showGoods(type) {
        this.resetPage();
        this.curType = type;
        let goodsData = GameData.getData(type);
        let maxCount = 6;
        let unlockSkins = PlayerData.getData("gameData." + type + ".owned");
        let curSkin = PlayerData.getData("gameData." + type + ".cur");
        if (typeof curSkin === "number") {
            curSkin = curSkin.toString();
        }
        let page: cc.Node = cc.instantiate(this.storePage);
        this.pageView.addPage(page);
        let displayPath = this.curType + "/Display/";
        let itemPath = this.curType + "/Item/";
        let pageIndex = 0;
        for (let key in goodsData) {
            if (page.childrenCount >= maxCount) {
                page = cc.instantiate(this.storePage);
                this.pageView.addPage(page);
            }
            let data = JSON.parse(JSON.stringify(goodsData[key]));
            data.itemUrl = itemPath + data.itemUrl;
            data.displayUrl = displayPath + data.displayUrl;
            data.unlock = unlockSkins.indexOf(parseInt(key)) >= 0;
            let node = GlobalPool.get(this.shopItemPerfab.name, data);
            if (key == curSkin) {
                let item = node.getComponent(ShopItem);
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
    }

    /**当前选中的商品项 */
    protected curItem: ShopItem = null;
    protected onChooseItem(item: ShopItem) {
        if (!!this.curItem) {
            if (this.curItem.Id === item.Id) return;
            this.curItem.isChecked = false;
        }
        this.curItem = item;
        if (this.curItem.data.unlock) {
            this.setCurSkin(this.curType, this.curItem.data.id);
        }
        this.showItemData(item.data);
    }
    /**展示商品详情 */
    protected showItemData(data) {
        this.stage.showItemData(data);
        if (data.unlock) {
            this.showUsing();
        } else {
            this.showPrice(data.price);
        }
    }

    protected showPrice(price: number) {
        this.price.string = price.toString();
    }
    protected showUsing() {
        this.price.string = "使用中";
    }

    /**退出商城 */
    protected onBtnExit() {
        this.emit(EventType.UIEvent.exit, this.uiType);
    }
    /**购买 */
    protected onBtnBuy() {
        if (!this.curItem) return;
        if (this.curItem.data.unlock) return;
        let price = this.curItem.data.price;
        let gold = PlayerData.getData("gameData.asset.gold");
        if (gold < price) {
            this.tipGoldUnenough();
        } else {
            this.subGold(price);
            this.unlockSkin(this.curType, this.curItem.data.id);
            this.setCurSkin(this.curType, this.curItem.data.id);
            this.curItem.data.unlock = true;
            this.curItem.unlock = true;
            this.showUsing();
        }
    }
    protected subGold(gold: number) {
        this.emit(EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData.asset.gold",
            value: gold,
            mode: "-",
            save: false,
        });
    }
    /**
     * 解锁皮肤
     * @param type 皮肤类型
     * @param id 皮肤id
     */
    protected unlockSkin(type, id) {
        this.emit(EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData." + type + ".owned",
            value: parseInt(id),
            mode: "push"
        });
    }
    /**
     * 设置当前使用的皮肤
     * @param type 皮肤类型
     * @param id 皮肤id
     */
    protected setCurSkin(type, id) {
        this.emit(EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData." + type + ".cur",
            value: parseInt(id),
            mode: "="
        });
    }
    /** 提示金币不足 */
    protected tipGoldUnenough() {
        this.emit(EventType.UIEvent.showTip, "金币不足");
    }
    /**观看视频 */
    onBtnVideo() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.SDKEvent.showVideo, () => {
            this.emit(EventType.UIEvent.playGoldAnim, {
                cb: () => {
                    this.emit(EventType.PlayerDataEvent.updatePlayerData, {
                        type: "gameData",
                        attribute: "gameData.asset.gold",
                        value: 200,
                        mode: "+"
                    });
                },
                gold: 200,
            })
        });
    }

}
