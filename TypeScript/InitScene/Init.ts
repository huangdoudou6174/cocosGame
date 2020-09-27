import { GamePlatformType } from "../Script/Platform/GamePlatformType";
import EventManager from "../Script/Common/EventManager";
import { EventType } from "../Script/GameSpecial/GameEventType";
import GamePlatform from "../Script/Platform/GamePlatform";
import GamePlatformConfig from "../Script/Platform/GamePlatformConfig";
import Loader from "../Script/Common/Loader";
import PlayerData from "../Script/Common/PlayerData";
import GameConfig from "../Script/GameSpecial/GameConfig";
import http_request from "../Script/Common/http_request";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Init extends cc.Component {
    @property({ type: cc.Enum(GamePlatformType) })
    public type: GamePlatformType = GamePlatformType.PC;

    @property(cc.Node)
    public platformConfig: cc.Node = null;

    @property(cc.Node)
    protected bar: cc.Node = null;
    @property
    protected totalLength: number = 0;
    protected initProgressBar() {
        if (this.totalLength == 0) {
            this.totalLength = this.bar.getComponent(cc.Sprite).spriteFrame.getOriginalSize().width;
        }
        this.bar.setPosition(-0.5 * this.totalLength, this.bar.y);
        this.bar.width = 0;
    }
    protected onUpdateProgress(rate: number) {
        this.bar.width = this.totalLength * rate;
    }

    protected onEvents() {
        EventManager.on(EventType.LoadAssetEvent.updateProgress, this.onUpdateProgress, this);
        EventManager.once(EventType.SDKEvent.inited, this.onSDKInited, this);
        EventManager.once(EventType.PlayerDataEvent.dataLoaded, this.onPlayerDataLoaded, this);
    }
    protected offEvents() {
        EventManager.off(EventType.LoadAssetEvent.updateProgress, this.onUpdateProgress, this);
    }

    protected findConfig() {
        let nodes = this.platformConfig.children;
        for (let i = nodes.length - 1; i >= 0; --i) {
            let js = nodes[i].getComponent(GamePlatformConfig);
            if (js.type == this.type) {
                return js;
            } else {
                let n = nodes[i];
                n.removeFromParent();
                n.destroy();
            }
        }
        console.error("没有设置对应平台的配置！");
        return null;
    }

    //服务端数据拉取成功后，拉取游戏存档数据
    protected onSDKInited() {
        PlayerData.init();
    }

    start() {
        this.initProgressBar();
        this.onEvents();

        //平台配置
        cc.game.addPersistRootNode(this.platformConfig);
        let js = this.findConfig();
        GamePlatform.instance.init(js);

        //加载进入主场景前必需的资源包
        for (let i = this.necessaryBundleList.length - 1; i >= 0; --i) {
            Loader.loadSubpackage(this.necessaryBundleList[i], () => {
                this.loadOneSubpackage(this.necessaryBundleList[i]);
            }, true);
        }
        //预加载其他资源包
        for (let i = 0, c = this.preBundleList.length; i < c; ++i) {
            Loader.loadBundle(this.preBundleList[i], null, false, false);
        }
    }
    /**所有资源包都可记录在本数组中，用于预加载，可尽量将更早需要使用的资源包放在更前 */
    protected preBundleList: string[] = [
        "Recommend",
        "PlayerSkeleton",
        "LobbyUI",
        "AssembleScene",
        "EnterFightLoading",
        "LevelScene",    //若主页中无背景图，直接以关卡场景为背景，则Level优先于LobbyUI加载，否则在其后加载
        "LevelUI",
        "Audio",
    ];

    /**进入主场景前必须加载完成的子包列表 */
    protected necessaryBundleList: string[] = [
        "MainScene",
    ];
    //子包加载状态
    protected bundleLoadState = {};
    loadOneSubpackage(n: string) {
        this.bundleLoadState[n] = true;
        this.loadMainScene();
    }

    protected playerDataLoaded: boolean = false;
    protected onPlayerDataLoaded() {
        this.playerDataLoaded = true;
        this.loadMainScene();
    }
    loadMainScene() {
        if (!this.playerDataLoaded) return;
        for (let i = this.necessaryBundleList.length - 1; i >= 0; --i) {
            if (!this.bundleLoadState[this.necessaryBundleList[i]]) {
                return;
            }
        }
        Loader.loadBundleScene("MainScene", "MainScene", (res) => {
            this.offEvents();
            cc.director.runScene(res);
        }, false);
    }


}