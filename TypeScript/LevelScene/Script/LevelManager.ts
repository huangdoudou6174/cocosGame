import yyComponent from "../../Script/Common/yyComponent";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import Action3dManager, { ActionMngType } from "../../Script/Common/Action3dManager";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";

const { ccclass, property } = cc._decorator;
//关卡管理器
@ccclass
export default class LevelManager extends yyComponent {

    /**************************************************************通用流程**************************************************************/
    //#region 初始化
    public init() {
        this.initComponents();
        this.initCustomUpdateState();
        this.initLevelTimer();
        this.initActMng();
        this.initEnterLobbyState();
        this.loadLobbyItems();

        this.registAllCustomUpdate();
        this.onEvents();
        cc.warn("关卡管理器的init需由子类实现");
    }

    protected registAllCustomUpdate() {
        cc.warn("关卡管理器的registAllCustomUpdate需由子类实现");
        this.registCustomUpdate(GlobalEnum.LevelState.lobby, this.stepLobby);
        this.registCustomUpdate(GlobalEnum.LevelState.win, this.stepLevelWin);
        this.registCustomUpdate(GlobalEnum.LevelState.lose, this.stepLevelLose);
        this.registCustomUpdate(GlobalEnum.LevelState.playing, this.stepLevelPlaying);
    }

    protected onEvents() {
        cc.warn("关卡管理器的onEvents需由子类实现");
        this.on(EventType.DirectorEvent.pauseLevel, this.pause, this);
        this.on(EventType.DirectorEvent.resumeLevel, this.resume, this);
    }
    /**加载进入首页时必须显示的内容 */
    protected loadLobbyItems() {
    }
    //#endregion

    //#region 重置
    public reset() {
        //回收关卡中的对象

        this.resetCustomUpdateState();
        this.resetLevelTimer();
    }
    //#endregion

    //#region 关卡暂停/恢复
    protected isPaused: boolean;          //关卡是否暂停状态
    public get paused() { return this.isPaused; }
    protected pauseCount: number = 0;
    /**暂停关卡运行 */
    public pause(count: number = 1) {
        this.pauseCount += count;
        this.isPaused = true;
    }
    /**
     * 继续关卡运行
     * @param count 值为-1时强制恢复关卡运行
     */
    public resume(count: number = 1) {
        if (count === -1) {
            this.pauseCount = 0;
            this.isPaused = false;
        } else {
            this.pauseCount -= count;
            if (this.pauseCount <= 0) {
                this.pauseCount = 0;
                this.isPaused = false;
            }
        }
    }
    //#endregion

    //#region 关卡主循环
    protected elapseTimer: number;        //关卡经历的时间，单位 毫秒
    protected lastFrameTime: number;      //上一帧更新时的时间戳
    protected initLevelTimer() {
        this.elapseTimer = 0;
        this.isPaused = false;
        this.pauseCount = 0;
    }
    protected resetLevelTimer() {
        this.elapseTimer = 0;
        this.isPaused = false;
        this.pauseCount = 0;
    }
    //自定义的每帧更新函数，由计时器执行
    public customUpdate() {
        if (this.isPaused) return;
        let d = Date.now();
        let dt = d - this.lastFrameTime;
        this.lastFrameTime = d;

        if (dt > 34) dt = 34;//避免苹果手机打开下拉菜单再回来，dt值过大
        dt *= 0.001;//单位转换为秒
        this.elapseTimer += dt;
        if (!!this.customStep) {
            this.customStep(dt);
        }
    }

    public running(dt: number) {
        if (!this.isPaused) {
            this.updateAction(dt);
            if (!!this.customStep) this.customStep(dt);
        }
    }
    //#endregion

    /**************************************************************管理对象、数据**************************************************************/
    //#region 数据
    protected levelData: any;             //当前关卡的关卡数据
    public getLevelData() {
        return this.levelData;
    }
    //#endregion

    //#region 对象
    /**关卡中动态添加的模型节点存放层 */
    @property(cc.Node)
    protected levelLayer: cc.Node = null;
    //#endregion

    //#region 动作管理器
    protected actMng: Action3dManager = null;
    protected initActMng() {
        this.actMng = Action3dManager.getMng(ActionMngType.Level);
    }
    protected updateAction(dt) {
        this.actMng.update(dt);
    }
    //#endregion

    /**************************************************************对外功能**************************************************************/
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
    //关卡数据设置完毕，开始运行关卡进行游戏
    protected startLevel() {
        this.enterCustomUpdateState(GlobalEnum.LevelState.playing);
        this.lastFrameTime = Date.now();
        // this.schedule(this.customUpdate, 0.016);
        this.emit(EventType.CtrlEvent.ctrlStart);
        this.emit(EventType.AudioEvent.playBGM, GlobalEnum.AudioClip.BGM, true);
        // this.emit(EventType.SDKEvent.startRecord);
        let lv = this.levelData.lv;
        if (undefined === lv) {
            lv = this.levelData.id;
        }
        this.emit(EventType.ALDEvent.levelStart, lv);
        this.emit(EventType.UIEvent.showTip, "关卡开始！");//todo:测试用
    }
    //#endregion

    //#region 教学脚本
    public setTeachCmp(js) { }
    //#endregion

    //#region 退出关卡
    //退出关卡
    public exit() {
        this.reset();
        // this.node.active = false;
        // this.unschedule(this.customUpdate);
    }
    //#endregion

    //#region 游戏进入首页，关卡场景作为背景
    protected nextState = null;
    protected needLoadCount: number = 0;
    protected initEnterLobbyState() {
        this.nextState = null;
        this.needLoadCount = 0;
        console.warn("进入首页必须加载的预制件数量为：", this.needLoadCount);
    }
    public enterLobby() {
        if (this.needLoadCount <= 0) {
            this.reset();
            this.setEnterLobbyData();
            this.enterCustomUpdateState(GlobalEnum.LevelState.lobby);
        } else {
            this.nextState = GlobalEnum.LevelState.lobby;
        }
    }
    protected setEnterLobbyData() {
        console.log("设置关卡场景作为首页背景时的数据，由子类实现");
    }
    protected loadLobbyItemFinish() {
        this.needLoadCount--;
        if (this.needLoadCount <= 0) {
            switch (this.nextState) {
                case GlobalEnum.LevelState.lobby: {
                    this.setEnterLobbyData();
                    this.enterCustomUpdateState(GlobalEnum.LevelState.lobby);
                    break;
                }
                case GlobalEnum.LevelState.playing: {
                    this._enterLevel();
                    break;
                }
            }
            this.emit(EventType.LevelEvent.levelSceneLoadFinish);
        }
    }
    //#endregion

    /**************************************************************流程**************************************************************/
    //#region 基础流程，子类实现
    //关卡进行中
    protected stepLevelPlaying(dt: number) {
        // console.log("关卡管理器子类未实现方法stepLevelPlaying");
    }
    //关卡胜利
    protected stepLevelWin(dt: number) {
        // console.log("关卡管理器子类未实现方法stepLevelWin");
    }
    //关卡失败
    protected stepLevelLose(dt: number) {
        // console.log("关卡管理器子类未实现方法stepLevelLose");
    }
    //游戏流程为显示首页，关卡场景作为背景
    protected stepLobby(dt: number) {
        // console.log("关卡管理器子类未实现方法stepLobby");
    }
    //#endregion

    /**************************************************************功能**************************************************************/
    //#region 结算
    /**玩家胜利 */
    protected win(data?: any) {
        this.enterCustomUpdateState(GlobalEnum.LevelState.win);
        this.emit(EventType.CtrlEvent.ctrlEnd);
        this.emit(EventType.DirectorEvent.playerWin, data);
        this.emit(EventType.AudioEvent.stopBGM);
        this.emit(EventType.AudioEvent.playEffect, GlobalEnum.AudioClip.win);
        // this.emit(EventType.SDKEvent.stopRecord);
        let lv = this.levelData.lv;
        if (undefined === lv) {
            lv = this.levelData.id;
        }
        this.emit(EventType.ALDEvent.levelWin, lv);
        this.emit(EventType.PlayerDataEvent.trySkinEnd, GlobalEnum.GoodsType.playerSkin);
    }
    /**玩家失败 */
    protected lose(data?: any) {
        this.enterCustomUpdateState(GlobalEnum.LevelState.lose);
        this.emit(EventType.CtrlEvent.ctrlEnd);
        this.emit(EventType.DirectorEvent.playerLose, data);
        this.emit(EventType.AudioEvent.stopBGM);
        this.emit(EventType.AudioEvent.playEffect, GlobalEnum.AudioClip.lose);
        // this.emit(EventType.SDKEvent.stopRecord);
        let lv = this.levelData.lv;
        if (undefined === lv) {
            lv = this.levelData.id;
        }
        this.emit(EventType.ALDEvent.levelLose, lv);
        this.emit(EventType.PlayerDataEvent.trySkinEnd, GlobalEnum.GoodsType.playerSkin);
    }
    //#endregion

}
