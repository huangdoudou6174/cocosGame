import yyComponent from "../../Script/Common/yyComponent";
import Action3dManager, { ActionMngType } from "../../Script/Common/Action3dManager";
import { EventType } from "../../Script/GameSpecial/GameEventType";

//信息提示节点
const { ccclass, property } = cc._decorator;

@ccclass
export default class TipMessage extends yyComponent {

    @property(cc.Label)
    private msg: cc.Label = null;

    private action = null;

    public init() {
        this.node = this.node;

        let delay0 = Action3dManager.delay(0.01);
        let fadeIn = Action3dManager.fadeTo(0, 255);
        let delay = Action3dManager.delay(1);
        let fadeOut = Action3dManager.fadeTo(0.5, 0);
        let cb = Action3dManager.callFun(this.onFadeOut, this);
        let seq = Action3dManager.sequence(delay0, fadeIn, delay, fadeOut, cb);
        this.action = seq;

        this.setMsg("");
        this.onEvents();
    }
    protected onEvents() {
        this.on(EventType.UIEvent.showTip, this.show, this);
    }
    public reset() {
        this.node.opacity = 0;
    }
    public show(msg: string) {
        this.node.active = true;
        this.reset();
        this.setMsg(msg);
        Action3dManager.getMng(ActionMngType.UI).runAction(this.node, this.action);
    }
    public hide() {
        this.node.active = false;
    }
    private setMsg(msg: string) {
        this.msg.string = msg;
    }
    private onFadeOut() {
        this.hide();
    }
}
