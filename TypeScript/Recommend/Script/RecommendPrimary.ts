
import RecommendItem from "./RecommendItem";
import RecommendContainer from "../../Script/Recommend/RecommendContainer";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import RecommendDataManager from "../../Script/Recommend/RecommendDataManager";
//互推-主推，单个的互推节点分散在界面四周显示的互推组件
const { ccclass, property } = cc._decorator;

@ccclass
export default class RecommendPrimary extends RecommendContainer {
    //添加互推游戏节点
    protected itemPtr: number = 0;
    protected addPrimaryItems(data: any[], widgets: [], type = GlobalEnum.RecommendItemType.icon) {
        let prefabName = "RecommendItem_" + type;
        for (let i = 0, count = widgets.length; i < count; ++i) {
            if (++this.itemPtr >= data.length) {
                this.itemPtr = 0;
            }
            let item = this.getItem(prefabName, data[this.itemPtr]);
            this.content.addChild(item);
            this.setWidget(item, widgets[i]);
        }
    }
    /**设置互推游戏内容 */
    public setRecommendData(items: any[]) {
        if (this.node.activeInHierarchy && this.content.childrenCount == 0) {
            this.data.items = items;
            this.addPrimaryItems(items, this.data.nodeWidgets, this.data.itemType);
        }
    }
    protected setData(data: any) {
        this.data = data;
        let items = data.items;
        if (!!items) {
            this.addPrimaryItems(items, data.nodeWidgets, data.itemType);
        }
        //自动轮播
        if (undefined === data.autoUpdate || !!data.autoUpdate) {
            this.autoUpdateItem();
        }
    }
    public unuse() {
        this.reset();
        this.stopUpdateItem();
    }
    /**启动自动轮播 */
    protected autoUpdateItem() {
        this.schedule(this.updateItems, 3);
    }
    protected stopUpdateItem() {
        this.unschedule(this.updateItems);
    }
    /**更新主推内容(轮播) */
    protected updateItems() {
        this.resetItems();
        this.addPrimaryItems(this.data.items, this.data.nodeWidgets, this.data.itemType);
    }
}
