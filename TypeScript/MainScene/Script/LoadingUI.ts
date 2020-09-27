import yyComponent from "../../Script/Common/yyComponent";
import { EventType } from "../../Script/GameSpecial/GameEventType";

const { ccclass, property } = cc._decorator;
/**加载进度条UI */
@ccclass
export default class LoadingUI extends yyComponent {

    @property(cc.Node)
    protected bar: cc.Node = null;
    @property
    protected totalLength: number = 0;

    public init() {
        if (this.totalLength == 0) {
            this.totalLength = this.bar.getComponent(cc.Sprite).spriteFrame.getOriginalSize().width;
        }
        this.bar.setPosition(-0.5 * this.totalLength, this.bar.y);
        this.onEvents();
    }

    protected onEvents() {
        this.on(EventType.LoadAssetEvent.showProgress, this.onShowProgress, this);
        this.on(EventType.LoadAssetEvent.updateProgress, this.onUpdateProgress, this);
        this.on(EventType.LoadAssetEvent.hideProgress, this.onHideProgress, this);
    }

    protected onShowProgress(rate: number) {
        this.node.active = true;
        this.bar.width = this.totalLength * rate;
    }

    protected onUpdateProgress(rate: number) {
        this.bar.width = this.totalLength * rate;
    }

    protected onHideProgress() {
        this.node.active = false;
    }

}
