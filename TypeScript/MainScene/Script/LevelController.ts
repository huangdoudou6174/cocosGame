import yyComponent from "../../Script/Common/yyComponent";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";


const { ccclass, property } = cc._decorator;
//关卡中的控制器，接收玩家操作
@ccclass
export default class LevelController extends yyComponent {

    onLoad() {
        this.init();
        this.setDisable();
    }

    public init() {
        this.initComponents();
        this.initTouchState();
        this.initCustomUpdateState();
        this.registAllCustomUpdate();
        this.onEvents();
    }
    protected onEvents() {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchmove", this.onTouchMove, this);
        this.node.on("touchend", this.onTouchEnd, this);

        this.on(EventType.CtrlEvent.ctrlStart, this.setEnable, this);
        this.on(EventType.CtrlEvent.ctrlEnd, this.setDisable, this);
    }
    protected registAllCustomUpdate() {
        this.registCustomUpdate(GlobalEnum.CtrlState.touched, this.stepTouchStay);
    }
    public reset() {
        this.resetTouchState();
    }

    //启用触摸操作层
    public setEnable() {
        this.reset();
        this.node.active = true;
    }
    //禁用触摸操作层
    public setDisable() {
        this.reset();
        this.node.active = false;
    }

    //触摸操作功能：
    private touched: boolean;       //是否触摸中
    private touchId: number;        //触摸事件ID，多点触摸时，只有第一个触摸点有效
    private touchStartTime: number; //触摸开始时的时间
    private touchStayTime: number;  //触摸持续时间，单位：秒
    private touchPath: cc.Vec2[];   //触摸移动的路径坐标
    private getTouchData(e) {
        return {
            startTime: this.touchStartTime,
            stayTime: this.touchStayTime,
            path: this.touchPath,
            e: e
        };
    }
    private initTouchState() {
        this.touched = false;
        this.touchId = -1;
        this.touchStartTime = -1;
        this.touchStayTime = 0;
        this.touchPath = [];
    }
    private resetTouchState() {
        this.touched = false;
        this.touchId = -1;
        this.touchStartTime = -1;
        this.touchStayTime = 0;
        this.touchPath = [];
    }
    //触摸开始
    private onTouchStart(e) {
        //屏蔽多点触摸
        if (this.isMultipleTouch(e)) return;
        //记录触摸状态
        this.touched = true;
        this.touchId = e.getID();
        this.touchStartTime = Date.now();
        this.touchStayTime = 0;
        let p = e.getLocation();
        // this.touchPath.push(p);
        this.touchPath[0] = p;//不需要记录触摸路径时用此方式
        this.emit(EventType.CtrlEvent.touchStart, this.getTouchData(e));
        this.enterCustomUpdateState(GlobalEnum.CtrlState.touched);
    }
    //触摸移动
    private onTouchMove(e) {
        if (!this.isCurTouchEvent(e)) return;
        let p = e.getLocation();
        // let p2 = this.touchPath[this.touchPath.length - 1];
        // if (Math.abs(p.x - p2.x) < 5 && Math.abs(p.y - p2.y) < 5) return;
        this.touchPath[1] = p;//不需要记录触摸路径时用此方式
        // this.touchPath.push(p);
        this.emit(EventType.CtrlEvent.touchMove, this.getTouchData(e));
    }
    //触摸结束
    private onTouchEnd(e) {
        if (!this.isCurTouchEvent(e)) return;
        let p = e.getLocation();
        // this.touchPath.push(p);
        this.touchPath[1] = p;//不需要记录触摸路径时用此方式

        this.emit(EventType.CtrlEvent.touchEnd, this.getTouchData(e));
        this.resetTouchState();
        this.enterCustomUpdateState(GlobalEnum.CtrlState.none);

    }
    /**
     * 是否多重触摸
     * @param e 触摸事件
     */
    private isMultipleTouch(e): boolean {
        return e.getTouches().length > 1;
    }
    //是否当前已记录的有效的触摸事件
    private isCurTouchEvent(e): boolean {
        return e.getID() == this.touchId;
    }

    private stepTouchStay(dt: number) {
        if (this.touched) {
            this.touchStayTime += dt;
            this.emit(EventType.CtrlEvent.touchStay, this.getTouchData(null));
        }
    }
}
