import yyComponent from "../../Script/Common/yyComponent";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseLevelUI extends yyComponent {

    public show() {
        if (this.node.active) return;
        this.node.active = true;
        this.emit(EventType.DirectorEvent.pauseLevel);
        this.emit(EventType.SDKEvent.showInsertByPauseLevel);
    }
    public hide() {
        if (!this.node.active) return;
        this.node.active = false;
        this.emit(EventType.DirectorEvent.resumeLevel);
    }

    /**返回首页 */
    protected onBtnLobby() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.UIEvent.exit, GlobalEnum.UI.pauseLevel);
        this.emit(EventType.DirectorEvent.enterLobby);
    }
    /**继续游戏 */
    protected onBtnResume() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.UIEvent.exit, GlobalEnum.UI.pauseLevel);
    }
    /**重新开始当前关卡 */
    protected onBtnReplay() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.UIEvent.exit, GlobalEnum.UI.pauseLevel);
        this.emit(EventType.DirectorEvent.replayCurLevel);
    }
}
