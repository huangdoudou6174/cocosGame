import yyComponent from "../../Script/Common/yyComponent";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import PlayerData from "../../Script/Common/PlayerData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLobby extends yyComponent {
    /**场景/UI类型 */
    public get uiType() { return this._uiType; }
    protected _uiType = GlobalEnum.UI.lobby;

    /**当前关卡 */
    @property(cc.Label)
    protected curLevel: cc.Label = null;

    public init() {
        this.updateCurLevel();
        this.onEvents();
    }
    protected onEvents() {
        this.on(EventType.PlayerDataEvent.playerDataChanged, this.onPlayerDataChanged, this);
    }
    public reset() {
    }

    public show() {
        this.node.active = true;
        this.emit(EventType.AudioEvent.playBGM, GlobalEnum.AudioClip.BGM, true);
    }
    public hide() {
        this.node.active = false;
    }

    protected onPlayerDataChanged(data) {
        if (data.attribute == "gameData.curLevel") {
            this.curLevel.string = data.value.toString();
        }
    }
    protected updateCurLevel() {
        let lv = PlayerData.getData("gameData.curLevel");
        this.curLevel.string = lv.toString();
    }

    protected onBtnStartGame() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.DirectorEvent.startGame);
    }

    protected onBtnShop() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.UIEvent.enter, GlobalEnum.UI.shop);
    }

}
