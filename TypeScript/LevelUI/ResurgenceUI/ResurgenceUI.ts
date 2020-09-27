import yyComponent from "../../Script/Common/yyComponent";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import PlayerData from "../../Script/Common/PlayerData";
import UIManager from "../../Script/Common/UIManager";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResurgenceUI extends yyComponent {

    public init() {
        this.initComponents();
        this.initTimer();
        this.hideBtnCancel();
    }
    public reset() {
        this.resetTimer();
        this.hideBtnCancel();
        this.unschedule(this.showBtnCancel);
    }

    @property(cc.Node)
    protected btnCancel: cc.Node = null;
    protected hideBtnCancel() {
        this.btnCancel.active = false;
    }
    protected showBtnCancel() {
        this.btnCancel.active = true;
    }

    @property(cc.Label)
    protected curScore: cc.Label = null;
    @property(cc.Label)
    protected maxScore: cc.Label = null;

    @property(cc.Label)
    protected timer: cc.Label = null;
    protected t: number = 0;
    protected initTimer() {

    }
    protected resetTimer() {
        this.t = 10;
        this.timer.string = this.t.toString();
        this.stopTimer();
    }
    protected updateTimer() {
        this.t -= 1;
        if (this.t <= 0) {
            this.t = 0;
            this.waitingTimeOver();
        }
        this.timer.string = this.t.toString();
    }
    protected waitingTimeOver() {
        this.stopTimer();
        this.cancelFuHuo();
    }
    protected startTimer() {
        this.schedule(this.updateTimer, 1);
    }
    protected stopTimer() {
        this.unschedule(this.updateTimer);
    }

    public show() {
        this.node.active = true;
        this.reset();
        this.scheduleOnce(this.showBtnCancel, 2);
        this.startTimer();

        // let v = PlayerData.getData("gameData.maxScore");
        // this.maxScore.string = v.toString();
        // let ui = UIManager.getUI(GlobalEnum.UI.levelInfo);
        // let data = ui.getData();
        // this.curScore.string = data.gold.toString();
    }

    protected onBtnFuHuo() {
        this.stopTimer();
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.SDKEvent.showVideo, {
            success: this.fuHuo.bind(this),
            fail: this.startTimer.bind(this),
            quit: this.startTimer.bind(this),
        });
    }
    protected onBtnCancel() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.cancelFuHuo();
    }

    protected cancelFuHuo() {
        this.emit(EventType.UIEvent.exit, GlobalEnum.UI.resurgence);
        this.emit(EventType.LevelEvent.cancelResurgence);
    }
    protected fuHuo() {
        this.emit(EventType.UIEvent.exit, GlobalEnum.UI.resurgence);
        this.emit(EventType.LevelEvent.resurgence);
    }
}
