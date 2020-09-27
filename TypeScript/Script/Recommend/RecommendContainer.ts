import yyComponent from "../Common/yyComponent";
import GlobalPool from "../Common/GlobalPool";
import { GlobalEnum } from "../GameSpecial/GlobalEnum";

//互推游戏节点容器
const { ccclass, property } = cc._decorator;

@ccclass
export default class RecommendContainer extends yyComponent {

    @property(cc.Node)
    protected content: cc.Node = null;    //存放互推节点的父节点
    protected data: any;//互推数据，包含容器节点的布局，互推节点类型，互推游戏数据等

    public init(data?: any) {
        this.onEvents();
        if (!!data) {
            this.setData(data);
        }
    }
    public reset() {
        this.resetItems();
    }
    protected resetItems() {
        GlobalPool.putAllChildren(this.content);
    }
    public reuse(data: any) {
        this.reset();
        this.setData(data);
    }

    public unuse() {
        this.reset();
    }

    /**设置互推游戏内容 */
    public setRecommendData(items: any[]) {
        if (this.node.activeInHierarchy && this.content.childrenCount == 0) {
            this.data.items = items;
            this.addItems(items, this.data.itemType);
            this.content.getComponent(cc.Layout).updateLayout();
        }
    }
    /**刷新互推内容，随机排序后再显示 */
    public refreshRecommendData() {
        // let items = this.data.items;
        // let arr = [];
        // for (let i = items.length - 1; i >= 0; --i) {
        //     let index = Math.round(Math.random() * (items.length - 1));
        //     arr.push(items[index]);
        //     items.splice(index, 1);
        // }
        // this.resetItems();
        // this.setRecommendData(arr);
        if (!this.node.activeInHierarchy) return;

        let nodes = [].concat(this.content.children);
        this.content.removeAllChildren(false);
        for (let i = nodes.length - 1; i >= 0; --i) {
            let index = Math.round(Math.random() * (nodes.length - 1));
            this.content.addChild(nodes[index]);
            nodes.splice(index, 1);
        }

    }

    protected setData(data: any) {
        this.data = data;
        this.setNodeWidget();
        if (!!data.items && data.items.length > 0) {
            let items = data.items;
            this.addItems(items, data.itemType);
            this.content.getComponent(cc.Layout).updateLayout();
            this.content.setPosition(0, 0);
        }
    }
    /**根据容器布局属性设置容器大小、坐标 */
    protected setNodeWidget() {
        if (undefined != this.data.scale) {
            this.node.setScale(this.data.scale);
        }
        if (undefined != this.data.pos) {
            this.node.setPosition(this.data.pos);
        }
        if (undefined != this.data.widget) {
            this.setWidget(this.node.children[0], this.data.widget, cc.find("Canvas/Recommend"));
        }
    }

    //添加互推游戏节点
    protected addItems(data: any[], type = GlobalEnum.RecommendItemType.icon) {
        let prefabName = "RecommendItem_" + type;
        for (let i = 0, count = data.length; i < count; ++i) {
            let item = this.getItem(prefabName, data[i]);
            this.content.addChild(item);
        }
    }
    /**根据类型获取对应的预制件 */
    protected getItem(prefabName, data: any) {
        return GlobalPool.get(prefabName, data);
    }

    //设置布局组件
    protected setWidget(node: cc.Node, widget: any, targetNode?: cc.Node) {
        let wg = node.getComponent(cc.Widget);
        if (!wg) {
            wg = node.addComponent(cc.Widget);
        }
        wg.isAbsoluteBottom = true;
        wg.isAbsoluteLeft = true;
        wg.isAbsoluteRight = true;
        wg.isAbsoluteTop = true;
        wg.isAbsoluteHorizontalCenter = true;
        wg.isAbsoluteVerticalCenter = true;
        if (!widget) return;
        if (!!targetNode) {
            wg.target = targetNode;
        } else {
            wg.target = node.parent;
        }
        //上
        if (undefined != widget.top) {
            wg.isAlignTop = true;
            wg.top = parseFloat(widget.top);
            wg.isAbsoluteTop = widget.top > 1;
        } else {
            wg.isAlignTop = false;
        }
        //下
        if (undefined != widget.bottom) {
            wg.isAlignBottom = true;
            wg.bottom = parseFloat(widget.bottom);
            wg.isAbsoluteBottom = widget.bottom > 1;
        } else {
            wg.isAlignBottom = false;
        }
        //左
        if (undefined != widget.left) {
            wg.isAlignLeft = true;
            wg.left = parseFloat(widget.left);
            wg.isAbsoluteLeft = widget.left > 1;
        } else {
            wg.isAlignLeft = false;
        }
        //右
        if (undefined != widget.right) {
            wg.isAlignRight = true;
            wg.right = parseFloat(widget.right);
            wg.isAbsoluteRight = widget.right > 1;
        } else {
            wg.isAlignRight = false;
        }

        wg.isAlignHorizontalCenter = !!widget.horizontalCenter;
        wg.isAlignVerticalCenter = !!widget.verticalCenter;
        this.updateWidget(node);
    }
    protected updateWidget(node: cc.Node) {
        let wg = node.getComponent(cc.Widget);
        if (!!wg) {
            wg.updateAlignment();
        }
        for (let i = node.childrenCount - 1; i >= 0; --i) {
            this.updateWidget(node.children[i]);
        }
    }
}
