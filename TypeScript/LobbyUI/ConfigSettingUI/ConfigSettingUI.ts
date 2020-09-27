import yyComponent from "../../Script/Common/yyComponent";
import GameConfig from "../../Script/GameSpecial/GameConfig";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfigSettingUI extends yyComponent {
    @property(cc.Toggle)
    protected togBGM: cc.Toggle = null;
    @property(cc.Toggle)
    protected togEffect: cc.Toggle = null;
    @property(cc.Toggle)
    protected togVibrate: cc.Toggle = null;

    protected initConfig() {
        let audioConfig = GameConfig.audioConfig;
        this.togBGM.isChecked = audioConfig.bgm;
        this.togEffect.isChecked = audioConfig.effect;

        let driveConfig = GameConfig.driveConfig;
        this.togVibrate.isChecked = driveConfig.vibrate;
    }

    public init() {
        this.initComponents();
        this.initConfig();
    }

    public show() {
        if (this.node.active) return;
        this.node.active = true;
        this.emit(EventType.DirectorEvent.pauseLevel);
        this.initConfig();
    }
    public hide() {
        if (!this.node.active) return;
        this.node.active = false;
        this.emit(EventType.DirectorEvent.resumeLevel);
    }

    protected saveConfig() {
        let audioConfig = {
            bgm: this.togBGM.isChecked,
            effect: this.togEffect.isChecked,
        };
        GameConfig.audioConfig = audioConfig;

        let driveConfig = {
            vibrate: this.togVibrate.isChecked,
        };
        GameConfig.driveConfig = driveConfig;
    }

    protected onBtnClose() {
        this.saveConfig();
        this.emit(EventType.DirectorEvent.resumeLevel);
        this.emit(EventType.UIEvent.exit, GlobalEnum.UI.configSetting);
    }

    protected onCloseBGM() {
        if (!this.togBGM.isChecked) {
            this.emit(EventType.AudioEvent.stopBGM);
        } else {
            this.emit(EventType.AudioEvent.playBGM, GlobalEnum.AudioClip.BGM);
        }
    }

}
