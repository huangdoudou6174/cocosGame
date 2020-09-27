import yyComponent from "../../Script/Common/yyComponent";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import Action3dManager, { ActionMngType } from "../../Script/Common/Action3dManager";
import RecommendManager from "../../Script/Recommend/RecommendManager";
import UIManager from "../../Script/Common/UIManager";
import PlayerData from "../../Script/Common/PlayerData";
import AudioManager from "../../Script/Common/AudioManager";
import GameData from "../../Script/Common/GameData";
import PowerManager from "../../Script/Common/PowerManager";
import Loader from "../../Script/Common/Loader";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import GlobalPool from "../../Script/Common/GlobalPool";
import AdvertManager from "../../Script/Advert/AdvertManager";
import AdvertSwitch from "../../Script/AdvertSwitch/AdvertSwitch";


//游戏流程管理器
const { ccclass, property } = cc._decorator;

/**
 * 游戏流程总管理器
 * 
 * 游戏流程：
 * 
 * 登录:
 * 登录账号
 * 获取玩家数据
 * 
 * 进入首页：
 * 加载首页资源
 * 显示首页UI
 * 
 * 开始游戏：
 * 加载关卡数据
 * 加载关卡资源
 * 进入关卡
 * 隐藏首页UI
 * 
 * 关卡结束：
 * 加载结算UI资源
 * 显示结算UI
 * 
 * 继续下一关：
 * 退出当前关卡
 * 回收当前关卡资源
 * 加载关卡数据
 * 加载关卡资源
 * 进入关卡
 * 
 * 重玩当前关：
 * 重置关卡状态
 * 进入关卡
 * 
 * 返回首页：
 * 退出关卡
 * 回收关卡资源
 * 显示首页UI
 */
@ccclass
export default class GameDirector extends yyComponent {

    @property(cc.Node)
    protected bg: cc.Node = null;

    start() {
        this.init();
        this.loadGameData();
    }
    update(dt) {
        this.uiActMng.update(dt);
        if (!!this.levelMng) {
            this.levelMng.running(dt);
        }
    }

    /************************************快捷方法************************************/
    //#region 触摸遮罩
    /**出没遮罩层，阻挡玩家触摸操作 */
    @property(cc.Node)
    protected touchMask: cc.Node = null;
    /**记录需要显示遮罩的次数，次数为0时隐藏遮罩层 */
    protected touchMaskCount: number;
    protected initTouchMask() {
        this.touchMask.active = false;
        this.touchMaskCount = 0;
    }
    protected resetTouchMask() {
        this.touchMask.active = false;
        this.touchMaskCount = 0;
    }
    /**显示一层遮罩，阻挡玩家操作 */
    protected showTouchMask(count: number = 1) {
        this.touchMaskCount += count;
        this.touchMask.active = true;
    }
    /**移除一层遮罩，遮罩层数为0时玩家才能进行操作 */
    protected hideTouchMask(count: number = 1) {
        this.touchMaskCount -= count;
        if (this.touchMaskCount <= 0) {
            this.touchMaskCount = 0;
            this.touchMask.active = false;
        }
    }
    //#endregion

    //#region 关卡暂停/继续快捷方法
    /**暂停关卡 */
    protected pauseLevel() {
        this.emit(EventType.DirectorEvent.pauseLevel);
    }
    /**恢复关卡 */
    protected resumeLevel() {
        this.emit(EventType.DirectorEvent.resumeLevel);
    }
    //#endregion

    //#region UI显隐快捷方法
    protected showUI(ui, data?: any) {
        this.emit(EventType.UIEvent.enter, ui, data);
    }
    protected showUIs(uis) {
        for (let i = uis.length - 1; i >= 0; --i) {
            this.emit(EventType.UIEvent.enter, uis[i]);
        }
    }
    protected hideUI(ui) {
        this.emit(EventType.UIEvent.exit, ui);
    }
    protected hideUIs(uis) {
        for (let i = uis.length - 1; i >= 0; --i) {
            this.emit(EventType.UIEvent.exit, uis[i]);
        }
    }
    //#endregion

    /************************************管理的对象************************************/
    //#region 已经存在的UI
    @property([yyComponent])
    protected defaultUIs: yyComponent[] = [];
    protected initDefaultUIs() {
        for (let i = this.defaultUIs.length - 1; i >= 0; --i) {
            this.defaultUIs[i].init();
            // this.defaultUIs[i].hide();
        }
    }
    //#endregion

    //只能在首页中时才显示的UI
    protected lobbyUIs = [];
    //只能在关卡中时才显示的UI
    protected levelUIs = [];
    //可在任意情况下显示的UI
    protected persistUIs = [];
    protected initUIConfig() {
        this.lobbyUIs = [];
        this.lobbyUIs.push(GlobalEnum.UI.lobby);
        this.lobbyUIs.push(GlobalEnum.UI.shop);
        this.lobbyUIs.push(GlobalEnum.UI.chooseLevel);

        this.levelUIs = [];
        this.levelUIs.push(GlobalEnum.UI.levelInfo);
        this.levelUIs.push(GlobalEnum.UI.levelTeach);
        this.levelUIs.push(GlobalEnum.UI.winUI);
        this.levelUIs.push(GlobalEnum.UI.loseUI);
        this.levelUIs.push(GlobalEnum.UI.trySkin);
        this.levelUIs.push(GlobalEnum.UI.pauseLevel);
        this.levelUIs.push(GlobalEnum.UI.resurgence);

        this.persistUIs = [];
        this.persistUIs.push(GlobalEnum.UI.playerAssetBar);
        this.persistUIs.push(GlobalEnum.UI.tipPower);
        this.persistUIs.push(GlobalEnum.UI.getPower);
        this.persistUIs.push(GlobalEnum.UI.configSetting);

    }

    /**关卡管理器 */
    protected levelMng = null;

    //#region UI动作管理器
    protected uiActMng: Action3dManager = null;
    protected initActMng() {
        this.uiActMng = Action3dManager.getMng(ActionMngType.UI);
    }
    //#endregion

    /************************************游戏流程************************************/
    //#region 脚本通用流程
    public init() {
        this.initUIConfig();
        this.initActMng();
        this.initTouchMask();
        this.initModels();
        this.initDefaultUIs();

        this.onEvents();
    }

    protected initModels() {
        //互推
        let node = this.node.getChildByName("Recommend");
        if (!!node && node.active) {
            RecommendManager.init(node);
        }
        //广告
        AdvertManager.init();
        //后台开关
        AdvertSwitch.init();
        //UI
        UIManager.init(this.node.getChildByName("UI"));

        AudioManager.init();
        GameData.init();
        PowerManager.init();
    }

    protected onEvents() {
        this.on(EventType.DirectorEvent.startGame, this.onStartGame, this);
        this.on(EventType.DirectorEvent.enterLobby, this.enterGameLobby, this);
        this.on(EventType.DirectorEvent.playNextLevel, this.onPlayNextLevel, this);
        this.on(EventType.DirectorEvent.replayCurLevel, this.onReplayCurLevel, this);
        this.on(EventType.DirectorEvent.playerWin, this.onLevelWin, this);
        this.on(EventType.DirectorEvent.playerLose, this.onLevelLose, this);
        this.on(EventType.DirectorEvent.hideGameLobby, this.hideGameLobbyUI, this);
        this.on(EventType.DirectorEvent.chooseTrySkinFinish, this.onChooseTrySkinFinish, this);

        this.on(EventType.UIEvent.showTouchMask, this.showTouchMask, this);
        this.on(EventType.UIEvent.hideTouchMask, this.hideTouchMask, this);
    }

    public reset() {
        this.exitLevel();
        this.resetTouchMask();
    }
    //#endregion

    //#region 游戏数据加载
    /**加载全部游戏数据（json文件） */
    protected loadGameData() {
        Loader.loadBundle("GameData", () => {
            Loader.loadBundleDir("GameData", "JSONData", (res) => {
                let urls = [];
                for (let i = 0, c = res.length; i < c; ++i) {
                    urls.push(res[i].name);
                }
                GameData.setData(res, urls);
                this.enterGameLobby();
            }, cc.JsonAsset, true);
        }, true, true);
    }
    //#endregion

    //#region 游戏流程：进入/退出首页
    //进入首页
    protected enterGameLobby() {
        if (!!this.levelMng) {
            this.levelMng.exit();
        }
        this.showGameLobbyUI();
    }
    //显示首页UI
    protected showGameLobbyUI() {
        this.hideUIs(this.levelUIs);
        this.hideUIs(this.persistUIs);
        this.showUI(GlobalEnum.UI.lobby);
        this.showUI(GlobalEnum.UI.playerAssetBar);
    }
    //隐藏首页UI 
    protected hideGameLobbyUI() {
        this.hideUIs(this.lobbyUIs);
        this.hideUIs(this.persistUIs);
        this.hideUI(GlobalEnum.UI.lobby);
    }
    //#endregion

    //#region 游戏流程：进入关卡
    //开始游戏：
    protected onStartGame() {
        if (!this.levelMng) {
            Loader.loadBundle("LevelScene", this.loadLevelCommonAsset.bind(this), true, true);
        } else {
            this.enterLevel();
        }
    }
    //加载关卡场景所需的通用资源并创建对象池
    protected loadLevelCommonAsset() {
        Loader.loadBundleDir("LevelScene", "MultiplePrefab", (assets) => {
            for (let i = assets.length - 1; i >= 0; --i) {
                let prefab: cc.Prefab = assets[i];
                GlobalPool.createPool(prefab.name, prefab, prefab.name);
            }
            this.loadLevelManager();
        });
    }
    //加载关卡场景管理器
    protected loadLevelManager() {
        Loader.loadBundleRes("LevelScene", "SinglePrefab/LevelManager", (res) => {
            let node: cc.Node = cc.instantiate(res);
            this.node.getChildByName("LevelManager").addChild(node);
            this.levelMng = node.getComponent("LevelManager");
            this.levelMng.init();
            this.enterLevel();
        });
    }
    //进入关卡
    protected enterLevel(level?: number) {
        if (!level) {
            level = this.getCurLevel();
        }
        //进入关卡:
        this.hideGameLobbyUI();
        this.hideUIs(this.levelUIs);
        let levelData = this.getLevelData(level);
        this.levelMng.enterLevel(levelData);
        this.showUI(GlobalEnum.UI.levelInfo, levelData);
        this.showUI(GlobalEnum.UI.playerAssetBar);
        // this.showTeachAnim();
        // this.showTrySkin();
    }

    //获取玩家当前能进入的关卡
    protected getCurLevel(): number {
        return PlayerData.getData("gameData.curLevel");
    }
    //获取关卡数据
    protected getLevelData(level: number) {
        // level = 2;
        let data = GameData.getLevelData(level);
        // let data = GameData.getLevelData(14);
        data.id = level;
        data.lv = level;
        return data;
    }

    //皮肤试用界面
    protected showTrySkin() {
        this.pauseLevel();
        this.showUI(GlobalEnum.UI.trySkin, GlobalEnum.GoodsType.playerSkin);
    }
    //试用皮肤流程结束(不论玩家是否选择了试用皮肤)
    protected onChooseTrySkinFinish() {
        this.hideUI(GlobalEnum.UI.trySkin);
        this.showTeachAnim();
    }

    //显示教学动画
    protected showTeachAnim() {
        // let teached = cc.sys.localStorage.getItem(GameConfig.gameName + "teached");
        // if (!!teached && !!JSON.parse(teached)) return;
        this.pauseLevel();
        this.showUI(GlobalEnum.UI.levelTeach);
    }
    //#endregion

    //#region 游戏流程：关卡胜利
    //关卡胜利
    protected winData: any;
    protected onLevelWin(data?) {
        this.winData = data;
        this.addCurLevel();
        if (AdvertSwitch.getSwitch(GlobalEnum.AdvertSwitchType.showBigPageAfterLevel)) {
            this.once(EventType.RecommendEvent.closeBigPage, this.showWinUI, this);
            this.emit(EventType.RecommendEvent.showBigPage);
        } else {
            this.showWinUI();
        }
    }
    protected showWinUI() {
        this.showUI(GlobalEnum.UI.playerAssetBar);
        this.showUI(GlobalEnum.UI.winUI, this.winData);
        this.winData = null;
    }
    //关卡进度+1
    protected addCurLevel() {
        this.emit(EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData.curLevel",
            value: 1,
            mode: "+",
        });
    }
    //#endregion

    //#region 游戏流程：胜利后继续下一关
    //继续下一关
    protected onPlayNextLevel() {
        this.exitCurLevel();
        this.putBackCurLevelAsset();
        this.enterLevel();
    }
    //退出当前关卡
    protected exitCurLevel() {
        this.levelMng.exit();
    }
    //回收当前关卡使用的资源
    protected putBackCurLevelAsset() {

    }
    //#endregion

    //#region 游戏流程：关卡失败
    //关卡失败
    protected loseData: any;
    protected onLevelLose(data) {
        this.loseData = data;
        if (AdvertSwitch.getSwitch(GlobalEnum.AdvertSwitchType.showBigPageAfterLevel)) {
            this.once(EventType.RecommendEvent.closeBigPage, this.showLoseUI, this);
            this.emit(EventType.RecommendEvent.showBigPage);
        } else {
            this.showLoseUI();
        }
    }
    protected showLoseUI() {
        this.showUI(GlobalEnum.UI.playerAssetBar);
        this.showUI(GlobalEnum.UI.loseUI, this.loseData);
    }
    //#endregion

    //#region 游戏流程：失败后重玩
    //重玩当前关卡
    protected onReplayCurLevel() {
        this.resetCurLevel();
        this.putBackCurLevelAsset();
        this.enterLevel();
    }
    //重置当前关卡状态
    protected resetCurLevel() {
        this.levelMng.reset();
    }
    //#endregion

    //#region 游戏流程：返回首页
    //返回首页
    protected onComeBackGameLobby() {
        this.exitLevel();
        this.putBackLevelAsset();
        this.showGameLobbyUI();
    }
    //彻底退出关卡场景
    protected exitLevel() {
        if (!!this.levelMng) this.levelMng.exit();
    }
    //回收关卡场景的全部资源
    protected putBackLevelAsset() {

    }
    //#endregion

}
