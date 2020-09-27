import yyComponent from "../Common/yyComponent";
import { EventType } from "../GameSpecial/GameEventType";
import GlobalPool from "../Common/GlobalPool";
import RecommendDataManager from "./RecommendDataManager";
import RecommendContainer from "./RecommendContainer";
import { AdConfig } from "../GameSpecial/AdConfig";
import { GlobalEnum } from "../GameSpecial/GlobalEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Recommend extends yyComponent {
    /**显示互推的场景/UI，使用堆栈来管理 */
    protected sceneStack;
    /**是否已作出计划要根据场景更新互推内容 */
    protected scheduledRecommend: boolean;

    public init() {
        this.scheduledRecommend = false;
        this.initSceneStack();
        this.onEvents();
    }
    protected onEvents() {
        this.once(EventType.RecommendEvent.assetLoadFinish, this.onConfigLoadFinish, this);

        this.on(EventType.RecommendEvent.clickRecommendItem, this.onClickRecommendItem, this);
        this.on(EventType.RecommendEvent.showBigPage, this.showBigPage, this);
        this.on(EventType.RecommendEvent.showLittlePage, this.showLittlePage, this);

        this.on(EventType.UIEvent.entered, this.onEnterScene, this);
        this.on(EventType.UIEvent.exited, this.onExitScene, this);

    }
    protected initSceneStack() {
        this.sceneStack = [];
    }
    /**回收所有主推游戏节点 */
    public reset() {
        this.scheduledRecommend = false;
        this.resetSceneStack();
        GlobalPool.putAllChildren(this.node);
    }
    protected resetSceneStack() {
        this.sceneStack = [];
    }


    /**进入需要显示互推的场景/UI */
    protected onEnterScene(scene) {
        if (undefined === scene || null === scene) return;
        //未对该场景进行互推配置时，不对其进行记录
        let config = RecommendDataManager.getConfig(scene);
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
        this.updateRecommends();
    }
    /**获取当前显示在最上层的互推场景/UI */
    protected getCurScene() {
        let count = this.sceneStack.length;
        if (count == 0) return null;
        return this.sceneStack[count - 1];
    }
    /**退出需要显示互推的场景/UI */
    protected onExitScene(scene) {
        if (undefined === scene || null === scene) return;
        //未对该场景进行互推配置时，不需要进行处理
        let config = RecommendDataManager.getConfig(scene);
        if (undefined === config) return;
        let curScene = this.getCurScene();
        if (curScene == scene) {
            this.sceneStack.pop();
            this.updateRecommends();
        } else {
            for (let i = this.sceneStack.length - 1; i >= 0; --i) {
                if (this.sceneStack[i] == scene) {
                    this.sceneStack.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**互推配置表加载完毕，延迟更新互推内容 */
    protected onConfigLoadFinish() {
        this.updateRecommends();
    }

    /**切换UI/场景，显示对应的互推内容 */
    protected updateRecommends() {
        //使用计时器，到下一帧才更新互推内容，
        //避免游戏中执行初始化、重置等流程时场景/UI切换过多，
        //需要在一帧中反复显隐互推内容
        if (this.scheduledRecommend) return;
        this.scheduleOnce(this.showCurSceneRecommend, 0);
        this.scheduledRecommend = true;
    }
    /**根据显示在最上层的场景/UI，显示相应的互推内容 */
    protected showCurSceneRecommend() {
        this.scheduledRecommend = false;
        GlobalPool.putAllChildren(this.node);
        let config;
        for (let i = this.sceneStack.length - 1; i >= 0; --i) {
            config = RecommendDataManager.getConfig(this.sceneStack[i]);
            if (undefined === config) {
                this.sceneStack.splice(i, 1);
            } else {
                break;
            }
        }
        if (!config) return;
        for (let i = config.length - 1; i >= 0; --i) {
            this.addRecommend(config[i]);
        }
    }
    protected addRecommend(config) {
        let data = RecommendDataManager.getRecommendData(config.AdID);
        let node = GlobalPool.get(config.name, {
            itemType: config.itemType,
            widget: config.widget,
            items: data,
            nodeWidgets: config.nodeWidgets,
        });
        this.node.addChild(node);
        if (!data || data.length == 0) {
            RecommendDataManager.loadAdData(config.AdID, (items) => {
                node.getComponent(RecommendContainer).setRecommendData(items);
            });
        }
    }

    //#region 小全导页
    protected littlePage: cc.Node = null;
    protected showLittlePage() {
        //已经显示时，随机刷新列表
        if (!!this.littlePage && this.littlePage.activeInHierarchy) {
            this.littlePage.getComponent(RecommendContainer).refreshRecommendData();
            return;
        }
        if (!this.littlePage) {
            this.littlePage = GlobalPool.get("Recommend_littlePage");
            this.littlePage.group = this.node.group;
            this.node.parent.addChild(this.littlePage);
            this.littlePage.setSiblingIndex(this.node.getSiblingIndex() + 1);
        }

        let data = RecommendDataManager.getRecommendData("littleView");
        this.littlePage.getComponent("Recommend_littlePage").show({
            items: data,
        });
        this.emit(EventType.UIEvent.entered, GlobalEnum.UI.littlePage);

        if (!data || data.length == 0) {
            RecommendDataManager.loadAdData("littleView", (items) => {
                this.littlePage.getComponent(RecommendContainer).setRecommendData(items);
            });
        }
    }
    protected hideLittlePage() {
        if (!!this.littlePage) {
            this.littlePage.active = false;
        }
        this.emit(EventType.UIEvent.exited, GlobalEnum.UI.littlePage);
    }
    //#endregion

    //#region 大全导页
    protected bigPage: cc.Node = null;
    protected showBigPage() {
        //已经显示时，随机刷新列表
        if (!!this.bigPage && this.bigPage.activeInHierarchy) {
            this.bigPage.getComponent(RecommendContainer).refreshRecommendData();
            return;
        }
        if (!this.bigPage) {
            this.bigPage = GlobalPool.get("Recommend_bigPage");
            this.bigPage.group = this.node.group;
            this.node.parent.addChild(this.bigPage);
            this.bigPage.setSiblingIndex(this.node.getSiblingIndex() + 1);
        }

        let data = RecommendDataManager.getRecommendData("bigView");
        this.bigPage.getComponent("Recommend_bigPage").show({
            items: data,
        });
        this.emit(EventType.UIEvent.entered, GlobalEnum.UI.bigPage);

        if (!data || data.length == 0) {
            RecommendDataManager.loadAdData("bigView", (items) => {
                this.bigPage.getComponent(RecommendContainer).setRecommendData(items);
            });
        }
    }
    protected hideBigPage() {
        if (!!this.bigPage) {
            this.bigPage.active = false;
        }
        this.emit(EventType.UIEvent.exited, GlobalEnum.UI.bigPage);
    }

    //#endregion


    /**玩家主动点击互推游戏节点，跳转游戏 */
    protected onClickRecommendItem(data) {
        // this.showLittlePage();
        this.emit(EventType.SDKEvent.navigateToMiniProgram, data, this.onNavigateComplate, this);
    }
    /**跳转请求回调 */
    protected onNavigateComplate(isNavigated: boolean) {
        //重新排序显示互推内容
        for (let i = this.node.childrenCount - 1; i >= 0; --i) {
            this.node.children[i].getComponent("RecommendContainer").refreshRecommendData();
        }
        if (this.littlePage && this.littlePage.activeInHierarchy) {
            this.littlePage.getComponent(RecommendContainer).refreshRecommendData();
        }
        if (this.bigPage && this.bigPage.activeInHierarchy) {
            this.bigPage.getComponent(RecommendContainer).refreshRecommendData();
        }

        //跳转失败时弹出全导页
        if (isNavigated) return;
        if (!!this.littlePage && this.littlePage.activeInHierarchy) return;
        if (!!this.bigPage && this.bigPage.activeInHierarchy) return;
        this.showLittlePage();
    }
    /**代码调用跳转到其他小游戏 */
    protected navigateGame(data: any) {
        this.emit(EventType.SDKEvent.navigateToMiniProgram, data);
    }
}
