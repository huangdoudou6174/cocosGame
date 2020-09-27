import LevelManager from "./LevelManager";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import Loader from "../../Script/Common/Loader";
import GlobalPool from "../../Script/Common/GlobalPool";
import LevelCamera from "./LevelCamera";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MyLevelManager extends LevelManager {

    /**************************************************通用流程**************************************************/
    //#region 初始化
    public init() {
        this.initCamera();
        this.initCustomUpdateState();
        this.initLevelTimer();
        this.initActMng();
        this.initEnterLobbyState();
        this.loadLobbyItems();

        this.registAllCustomUpdate();
        this.onEvents();

    }
    protected registAllCustomUpdate() {
        //通用状态
        this.registCustomUpdate(GlobalEnum.LevelState.playing, this.stepLevelPlaying);
        this.registCustomUpdate(GlobalEnum.LevelState.win, this.stepLevelWin);
        this.registCustomUpdate(GlobalEnum.LevelState.lose, this.stepLevelLose);
        this.registCustomUpdate(GlobalEnum.LevelState.lobby, this.stepLobby);

        //其他状态

    }
    protected onEvents() {
        //游戏总流程相关
        this.on(EventType.DirectorEvent.pauseLevel, this.pause, this);
        this.on(EventType.DirectorEvent.resumeLevel, this.resume, this);

        //游戏玩法相关

        this.on(EventType.LevelEvent.testLose, this.onTestLose, this);
        this.on(EventType.LevelEvent.testWin, this.onTestWin, this);

    }
    /**加载进入首页时必须显示的内容 */
    protected loadLobbyItems() {

    }
    //#endregion

    //#region 重置
    public reset() {
        this.resetCamera();
        this.resetCustomUpdateState();
        this.resetLevelTimer();
    }
    //#endregion

    /**************************************************对外功能**************************************************/
    //#region 进入关卡
    //进入关卡，设置关卡数据，启动关卡控制器，开始游戏
    public enterLevel(levelData) {
        this.node.active = true;
        if (this.needLoadCount <= 0) {
            this.reset();
            this.levelData = levelData;
            this._enterLevel();
        } else {
            this.levelData = levelData;
            this.nextState = GlobalEnum.LevelState.playing;
        }
    }
    protected _enterLevel() {
        this.setData();
        this.startLevel();
    }

    protected setData() {
        //关卡内容

        //玩家

        //相机

    }
    //#endregion

    //#region 教学脚本
    public setTeachCmp(js) {
    }
    //#endregion

    //#region 进入首页
    /**设置在首页中作为背景时需要显示的内容 */
    protected setEnterLobbyData() {
    }
    //#endregion

    /**************************************************管理对象**************************************************/
    //#region  玩家
    // protected player:Player = null;
    protected initPlayer() {

    }
    protected resetPlayer() {

    }
    protected setPlayer() {

    }
    protected updatePlayer(dt: number) {

    }
    //#endregion

    //#region 相机
    @property(LevelCamera)
    protected camera: LevelCamera = null;
    protected initCamera() {
        this.camera.init();
    }
    protected resetCamera() {
        this.camera.reset();
    }
    protected updateCamera(dt: number) {
        this.camera.customUpdate(dt);
    }
    //#endregion

    /**************************************************流程**************************************************/
    //#region 游戏中
    protected stepLevelPlaying(dt: number) {
        this.updateCamera(dt);
        this.updatePlayer(dt);

    }
    //#endregion

    //#region 胜利
    protected stepLevelWin(dt: number) {
    }
    /**关卡胜利的成绩 */
    protected getWinData() {
        let data: any = {};
        data.lv = this.levelData.lv;

        return data;
    }
    //#endregion

    //#region 失败
    protected stepLevelLose(dt: number) {
    }
    //#endregion

    //#region 状态：首页中
    protected stepLobby(dt: number) {
        // this.updateCamera(dt);
    }
    //#endregion

    /**************************************************事件**************************************************/
    protected onTestWin() {
        this.win();
    }
    protected onTestLose() {
        this.lose();
    }

}
