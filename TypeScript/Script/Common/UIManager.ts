import { GlobalEnum } from "../GameSpecial/GlobalEnum";
import { EventType } from "../GameSpecial/GameEventType";
import Loader from "./Loader";
import EventManager from "./EventManager";

/**UI管理器 */
export default class UIManager {
    protected static node: cc.Node;
    protected static UIs;
    public static init(node: cc.Node) {
        this.node = node;
        this.UIs = {};
        this.onEvents();
    }
    protected static onEvents() {
        EventManager.on(EventType.UIEvent.enter, this.enterUI, this);
        EventManager.on(EventType.UIEvent.exit, this.exitUI, this);
    }

    /**获取指定UI脚本 */
    public static getUI(type) {
        if (!this.UIs[type]) {
            console.warn("UI尚未加载，无法获取：", type);
            return null;
        }
        return this.UIs[type];
    }

    protected static enterUI(ui, data?: any) {
        let iui = this.UIs[ui];
        if (null === iui) return;
        if (!!iui) {
            this.showUI(ui, data);
        } else {
            this.loadUI(ui, data);
        }
    }
    protected static showUI(ui, data?: any) {
        let js = this.UIs[ui];
        if (!!js) {
            js.show(data);
            EventManager.emit(EventType.UIEvent.entered, ui);
        }
    }
    protected static loadUI(ui, data?: any) {
        let js = cc.find("Canvas").getComponentInChildren(ui);
        if (!!js) {
            this.UIs[ui] = js;
            this.showUI(ui, data);
        } else {
            // this.loadLevelUI(ui, data);
            // return;
            Loader.loadBundle("LobbyUI", () => {
                Loader.loadBundleRes("LobbyUI", ui + "/" + ui, (res) => {
                    if (!res) {
                        // this.UIs[ui] = null;
                        // console.error("要显示的界面预制不存在：", ui);
                        this.loadLevelUI(ui, data);
                        return;
                    }
                    let node = cc.instantiate(res);
                    this.node.getChildByName(ui).addChild(node);
                    let wg = node.getComponent(cc.Widget);
                    if (!!wg) {
                        wg.updateAlignment();
                    }
                    let ly = node.getComponent(cc.Layout);
                    if (!!ly) {
                        ly.updateLayout();
                    }
                    let js = node.getComponent(ui);
                    js.init();
                    this.UIs[ui] = js;
                    this.showUI(ui, data);
                }, cc.Prefab, true);
            }, true);
        }
    }
    protected static loadLevelUI(ui, data?: any) {
        Loader.loadBundle("LevelUI", () => {
            Loader.loadBundleRes("LevelUI", ui + "/" + ui, (res) => {
                if (!res) {
                    this.UIs[ui] = null;
                    console.error("要显示的界面预制不存在：", ui);
                    return;
                }
                let node = cc.instantiate(res);
                this.node.getChildByName(ui).addChild(node);
                let wg = node.getComponent(cc.Widget);
                if (!!wg) {
                    wg.updateAlignment();
                }
                let ly = node.getComponent(cc.Layout);
                if (!!ly) {
                    ly.updateLayout();
                }
                let js = node.getComponent(ui);
                js.init();
                this.UIs[ui] = js;
                this.showUI(ui, data);
            }, cc.Prefab, true);
        }, true);
    }

    protected static exitUI(ui) {
        let js = this.UIs[ui];
        if (!!js) {
            js.hide();
            EventManager.emit(EventType.UIEvent.exited, ui);
        }
    }
}
