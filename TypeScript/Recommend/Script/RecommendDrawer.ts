import RecommendContainer from "../../Script/Recommend/RecommendContainer";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import RecommendDataManager from "../../Script/Recommend/RecommendDataManager";

const { ccclass, property } = cc._decorator;
/**抽屉状态 */
enum DrawerState {
    close,  //关闭的
    open,   //已打开
    moving, //正在移动
}
@ccclass
export default class RecommendDrawer extends RecommendContainer {
    @property(cc.Node)
    private drawer: cc.Node = null;     //抽屉
    @property(cc.Node)
    private btnDrawer: cc.Node = null;  //抽屉开关按钮
    private state: DrawerState;
    @property(cc.Node)
    private btnClose: cc.Node = null;

    private openTargetX: number;        //抽屉打开时移动到的目标点X坐标值
    private closeDis: number;            //抽屉打开/关闭时的移动距离
    private openDuration: number;       //抽屉打开动画时长
    private closeDuration: number;      //抽屉关闭动画时长
    private type;//抽屉类型

    public init(data?: any) {
        this.state = DrawerState.close;
        this.btnClose.active = false;
        // this.openTargetX = 0;//暂设为打开抽屉时移动到屏幕正中间
        let cvs = cc.find("Canvas");
        this.openTargetX = this.drawer.width * this.drawer.anchorX - cvs.width * 0.5;
        this.openDuration = 0.5;
        this.closeDuration = 0.5;
        this.initType();
        this.onEvents();
        if (!!data) {
            this.setData(data);
        }
    }
    protected initType() {
        this.type = GlobalEnum.RecommendDrawerType.left;
        this.drawer.x = -0.5 * (this.node.width + this.drawer.width);
        this.closeDis = this.drawer.x - this.openTargetX;
    }
    protected onEvents() {
        this.on(EventType.RecommendEvent.openDrawer, this.onBtnDrawer, this);
        this.on(EventType.RecommendEvent.closeDrawer, this.onBtnDrawer, this);
    }

    public reset() {
        this.state = DrawerState.close;
        this.btnClose.active = false;
    }
    /**
     * 设置抽屉的数据
     * 只记录数据，打开抽屉的时候再添加节点
     * @param data 
     * @param [data.type]       抽屉类型,GlobalEnum.RecommendDrawerType枚举值
     * @param [data.itemType]   节点类型，GlobalEnum.RecommendItemType枚举值
     * @param [data.items]      互推游戏的数据数组，包含游戏id，名字，图标文件名等信息
     */
    protected setData(data: any) {
        this.data = data;
        this.setType(data.type);
        if (undefined != this.data.scale) {
            this.drawer.setScale(this.data.scale);
        }
        if (undefined != this.data.pos) {
            this.drawer.setPosition(this.data.pos);
        }
        if (!!data.widget) {
            this.setWidget(this.drawer, data.widget);
        }
        if (!!data.btnWidget) {
            this.setWidget(this.btnDrawer, data.btnWidget);
        }
    }

    /**设置抽屉类型 */
    protected setType(type) {
        this.type = type;
        switch (type) {
            case GlobalEnum.RecommendDrawerType.left: {
                this.drawer.x = -0.5 * (this.node.width + this.drawer.width);
                break;
            }
            case GlobalEnum.RecommendDrawerType.right: {
                this.drawer.x = 0.5 * (this.node.width + this.drawer.width);
                break;
            }
            default: {
                this.type = GlobalEnum.RecommendDrawerType.left;
                this.drawer.x = -0.5 * (this.node.width + this.drawer.width);
                break;
            }
        }
        this.closeDis = this.drawer.x - this.openTargetX;
    }

    protected onBtnDrawer() {
        switch (this.state) {
            case DrawerState.close: {
                this.openDrawer();
                break;
            }
            case DrawerState.open: {
                this.closeDrawer();
                break;
            }
        }
    }

    /**打开抽屉 */
    protected openDrawer() {
        this.showMask();
        this.state = DrawerState.moving;
        this.drawer.stopAllActions();
        let items = this.data.items;
        if (!items) {
            // items = RecommendDataManager.getAllRecommendData();
        }
        this.addItems(items, this.data.itemType);
        let action = cc.moveTo(this.openDuration, this.openTargetX, this.drawer.y);
        action.easing(cc.easeOut(2));
        this.drawer.runAction(cc.sequence(action, cc.callFunc(this.onOpenDrawerFinish, this)));
        this.emit(EventType.RecommendEvent.drawerStartOpen);
    }
    protected onOpenDrawerFinish() {
        this.hideMask();
        this.state = DrawerState.open;
        this.btnClose.active = true;
        this.emit(EventType.RecommendEvent.drawerOpened);
    }

    /**关闭抽屉 */
    protected closeDrawer() {
        this.showMask();
        this.state = DrawerState.moving;
        this.drawer.stopAllActions();
        this.drawer.x = this.openTargetX;
        let action = cc.moveBy(this.closeDuration, this.closeDis, 0);
        action.easing(cc.easeIn(2));
        this.drawer.runAction(cc.sequence(action, cc.callFunc(this.onCloseDrawerFinish, this)));
        this.emit(EventType.RecommendEvent.drawerStartClose);
    }
    protected onCloseDrawerFinish() {
        this.resetItems();
        this.hideMask();
        this.state = DrawerState.close;
        this.btnClose.active = false;
        this.emit(EventType.RecommendEvent.drawerClosed);
    }

    protected showMask() {
        this.emit(EventType.UIEvent.showTouchMask);
    }
    protected hideMask() {
        this.emit(EventType.UIEvent.hideTouchMask);
    }
}
