import yyComponent from "../../Script/Common/yyComponent";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import GameConfig from "../../Script/GameSpecial/GameConfig";
import Action3dManager from "../../Script/Common/Action3dManager";

//关卡进度分数等信息UI
const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelInfoUI extends yyComponent {

    public get uiType() { return GlobalEnum.UI.levelInfo; }

    public init() {
        this.initCurGold();
        this.initComponents();
        this.initProgress();
        this.onEvents();
    }
    protected onEvents() {

    }

    public reset() {
        this.resetCurGold();
        this.resetProgress();
    }

    public show(levelData: any) {
        this.node.active = true;
        this.reset();
        this.setData(levelData);
    }
    public hide() {
        this.reset();
        this.node.active = false;
    }

    public getData() {
        return {
            speGold: 0,
            gold: this.curGold,
        };
    }

    protected setData(data: any) {
        if (!!this.curLevelLabel) this.curLevelLabel.string = data.lv.toString();
        if (!!this.nextLevelLabel) this.nextLevelLabel.string = (data.lv + 1).toString();
    }

    protected convertToString(v: number): string {
        if (v < 1100) return v.toString();
        if (v < 1100000) return (v * 0.001).toFixed(1) + "K";
        return (v * 0.000001).toFixed(1) + "M";
    }

    /****************************************管理对象****************************************/
    //#region 关卡进度
    @property(cc.Label)
    protected curLevelLabel: cc.Label = null;

    @property(cc.Label)
    protected nextLevelLabel: cc.Label = null;
    //关卡进度
    @property(cc.ProgressBar)
    protected levelProgressBar: cc.ProgressBar = null;
    protected initProgress() {
        if (!!this.levelProgressBar) this.levelProgressBar.progress = 0;
    }
    protected resetProgress() {
        if (!!this.levelProgressBar) this.levelProgressBar.progress = 0;
    }
    protected setProgress(r) {
        if (!!this.levelProgressBar) this.levelProgressBar.progress = r;
    }
    //#endregion

    //#region 金币
    @property(cc.Label)
    protected curGoldLabel: cc.Label = null;
    protected curGold: number = 0;
    protected initCurGold() {
        this.curGold = 0;
        this.curGoldLabel.string = this.curGold.toString();
    }
    protected resetCurGold() {
        this.curGold = 0;
        this.curGoldLabel.string = this.curGold.toString();
    }
    protected addCurGold(v) {
        this.curGold += v;
        this.curGoldLabel.string = this.curGold.toString();
    }
    protected onPlayerCollGold(count: number) {
        this.addCurGold(1);
    }
    //#endregion

    /**设置按钮 */
    protected onBtnConfigSetting() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.UIEvent.enter, GlobalEnum.UI.configSetting);
    }
    /**暂停按钮 */
    protected onBtnPause() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.UIEvent.enter, GlobalEnum.UI.pauseLevel);
    }


    //测试用：重置关卡
    protected onBtnReplay() {
        this.emit(EventType.DirectorEvent.replayCurLevel);
    }
    //测试用：返回首页
    protected onBtnLobby() {
        this.emit(EventType.DirectorEvent.enterLobby);
    }

    protected onBtnWin(){
        this.emit(EventType.LevelEvent.testWin);
    }
    protected onBtnLose(){
        this.emit(EventType.LevelEvent.testLose);
    }
    
}
