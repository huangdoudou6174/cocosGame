import EventManager from "../Common/EventManager";
import Loader from "../Common/Loader";
import { AdConfig } from "../GameSpecial/AdConfig";
import { EventType } from "../GameSpecial/GameEventType";
import GamePlatform from "../Platform/GamePlatform";
import { GamePlatformType } from "../Platform/GamePlatformType";

/**根据配置文件设置各场景/UI的广告显隐 */
export default class AdvertManager {
    /**显示广告的场景/UI，使用堆栈来管理 */
    protected static sceneStack: string[];
    protected static initSceneStack() {
        this.sceneStack = [];
    }
    protected static resetSceneStack() {
        this.sceneStack = [];
    }

    /**是否已作出计划要根据场景更新广告内容 */
    protected static scheduledAdvert: boolean;

    /**全部场景/UI的广告配置 */
    protected static advertConfig: { [scene: string]: { [advert: string]: boolean } } = null;
    protected static initAdvertConfig() {
        let url = "AdvertConfig";
        switch (GamePlatform.instance.Config.type) {
            case GamePlatformType.PC: {
                return;
            }
            case GamePlatformType.WX: {
                url += "_WX";
                break;
            }
            case GamePlatformType.OPPO: {
                url += "_OPPO";
                break;
            }
            default: {
                break;
            }
        }

        Loader.loadBundleRes("MainScene", "JSONData/" + url, (res) => {
            if (!res) {
                console.error("广告配置文件加载失败，将无法显示部分场景的广告");
                return;
            }
            this.advertConfig = res.json;
        }, cc.JsonAsset, false);
    }
    /**获取指定场景/UI的广告配置 */
    protected static getAdvertConfig(scene) {
        if (!this.advertConfig) return null;
        return this.advertConfig[scene];
    }
    /**当前显示的广告状态 */
    protected static curAdvertState: { [advert: string]: boolean } = null;
    /**当前是否有banner实例展示出来 */
    protected static initCurAdvertState() {
        this.curAdvertState = {};
    }
    protected static resetCurAdvertState() {
        this.curAdvertState = {};
    }

    public static init() {
        this.scheduledAdvert = false;
        this.initAdvertConfig();
        this.initCurAdvertState();
        this.initSceneStack();

        this.onEvents();
    }
    protected static onEvents() {
        EventManager.on(EventType.UIEvent.entered, this.onEnterScene, this);
        EventManager.on(EventType.UIEvent.exited, this.onExitScene, this);
        EventManager.on(EventType.RecommendEvent.drawerStartOpen, this.onDrawerStartOpen, this);
        EventManager.on(EventType.RecommendEvent.drawerClosed, this.onDrawerClosed, this);
    }

    public static reset() {
        this.scheduledAdvert = false;
        this.resetCurAdvertState();
        this.resetSceneStack();
    }

    /**进入需要显示广告的场景/UI */
    protected static onEnterScene(scene) {
        if (undefined === scene || null === scene) return;
        //未对该场景进行广告配置时，不对其进行记录
        let config = this.getAdvertConfig(scene);
        if (undefined === config) return;
        let curScene = this.getCurScene();
        if (curScene == scene) return;
        for (let i = this.sceneStack.length - 1; i >= 0; --i) {
            if (this.sceneStack[i] == scene) {
                this.sceneStack.splice(i, 1);
                break;
            }
        }
        this.sceneStack.push(scene);
        this.updateAdverts();
    }
    /**获取当前显示在最上层的场景/UI */
    protected static getCurScene() {
        let count = this.sceneStack.length;
        if (count == 0) return null;
        return this.sceneStack[count - 1];
    }
    /**退出需要显示广告的场景/UI */
    protected static onExitScene(scene) {
        if (undefined === scene || null === scene) return;
        //未对该场景进行广告配置时，不需要进行处理
        let config = this.getAdvertConfig(scene);
        if (undefined === config) return;
        let curScene = this.getCurScene();
        if (curScene == scene) {
            this.sceneStack.pop();
            this.updateAdverts();
        } else {
            for (let i = this.sceneStack.length - 1; i >= 0; --i) {
                if (this.sceneStack[i] == scene) {
                    this.sceneStack.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**切换UI/场景，显示对应的广告内容 */
    protected static updateAdverts() {
        //使用计时器，到下一帧才更新广告内容，
        //避免游戏中执行初始化、重置等流程时场景/UI切换过多，
        //需要在一帧中反复显隐广告内容
        if (this.scheduledAdvert) return;
        setTimeout(this.showCurSceneAdvert.bind(this), 0);
        this.scheduledAdvert = true;
    }
    /**根据显示在最上层的场景/UI，显示相应的广告内容 */
    protected static showCurSceneAdvert() {
        this.scheduledAdvert = false;
        let config = null;
        //todo:理论上，sceneStack中保存的都是有对应配置的页面，可以直接取最上一层的页面的配置
        for (let i = this.sceneStack.length - 1; i >= 0; --i) {
            let scene = this.sceneStack[i];
            config = this.getAdvertConfig(scene);
            if (!!config) {
                break;
            }
        }
        if (!config) return;    //可能会出现未配置对应场景的广告内容、广告配置文件尚未加载完成的情况
        //记录当前广告状态
        this.curAdvertState = config;
        //暂时只有banner是通过配置文件确定的：
        this.processBannerConfig(config);

        //原生广告
        // this.processNativeAd(config);
    }
    //banner的显隐
    protected static processBannerConfig(config) {
        if (undefined === config.banner || !config.banner.visble) {
            this.hideBanner();
            return;
        }
        let id = AdConfig.bannerID[config.banner.bannerID];
        if (!id) return;
        this.showBanner({
            id: id,
            style: config.banner.style,
        });
    }
    protected static showBanner(data) {
        console.log("广告管理器：显示banner,", data);
        EventManager.emit(EventType.SDKEvent.showBanner, data);
    }
    protected static hideBanner() {
        console.log("广告管理器：隐藏banner");
        EventManager.emit(EventType.SDKEvent.hideBanner);
    }


    //原生广告
    protected static curNativeAdData: any = null;
    protected static processNativeAd(config) {
        if (undefined === config.nativeAd) {
            EventManager.emit(EventType.SDKEvent.hideAllNativeAd);
            this.curNativeAdData = null;
            return;
        }
        if (null !== this.curNativeAdData && this.curNativeAdData.type !== config.nativeAd.type) {
            EventManager.emit(EventType.SDKEvent.hideNativeAd, this.curNativeAdData.type);
        }
        this.curNativeAdData = config.nativeAd;
        EventManager.emit(EventType.SDKEvent.showNativeAd, config.nativeAd);
    }
    protected static onDrawerStartOpen() {
        if (null !== this.curNativeAdData) {
            EventManager.emit(EventType.SDKEvent.quickHideNativeAd, this.curNativeAdData.type);
        }
    }
    protected static onDrawerClosed() {
        if (null !== this.curNativeAdData) {
            EventManager.emit(EventType.SDKEvent.quickShowNativeAd, this.curNativeAdData);
        }
    }
}
