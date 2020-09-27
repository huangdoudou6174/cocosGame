import AdvertSwitch from "../../Script/AdvertSwitch/AdvertSwitch";
import { AdConfig } from "../../Script/GameSpecial/AdConfig";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import RecommendContainer from "../../Script/Recommend/RecommendContainer";

const { ccclass, property } = cc._decorator;
/**小全导页*/
@ccclass
export default class Recommend_littlePage extends RecommendContainer {

    /**继续游戏按钮 */
    @property(cc.Node)
    protected btnContinueGame: cc.Node = null;
    protected initBtnState() {
        this.clickCount = 0;
        // this.btnContinueGame.active = false;
    }
    protected resetBtnState() {
        this.clickCount = 0;
        // this.btnContinueGame.active = false;
    }

    public init(data?) {
        this.initBtnState();
        if (undefined !== data) {
            this.setData(data);
        }
    }
    public reset() {
        this.resetItems();
        this.resetBtnState();
    }

    public show(data?) {
        this.node.active = true;
        this.reset();
        if (undefined !== data) {
            this.setData(data);
        }
        //判断开关，是否延迟显示继续游戏按钮
        // let delay = 0;
        // if (AdvertSwitch.getSwitch(GlobalEnum.AdvertSwitchType.littlePageDelayShowBtnContinueGame)) {
        //     delay = 3000;
        // }
        // console.log("继续按钮延迟时间：", delay);
        // setTimeout(() => {
        //     this.btnContinueGame.active = true;
        // }, delay);
    }

    protected clickCount: number = 0;
    protected onBtnContinueGame() {
        //先判断后台开关
        let data = AdvertSwitch.getSwitch(GlobalEnum.AdvertSwitchType.littlePageDelayShowBanner);
        if (null === data || data == 0) {
            this.exitPage();
            return;
        }

        switch (this.clickCount) {
            case 0: {
                this.clickCount = 1;
                //延迟1秒显示banner
                setTimeout(() => {
                    console.log("延迟显示banner");
                    this.emit(EventType.SDKEvent.showBanner, {
                        id: AdConfig.bannerID.gameScene,
                        style: {
                            horizontal: "middle",
                        },
                    });
                    let hideDelay = AdvertSwitch.getSwitch(GlobalEnum.AdvertSwitchType.littlePageDelayHideBanner);
                    setTimeout(() => {
                        console.log("延迟隐藏banner");
                        this.emit(EventType.SDKEvent.hideBanner);
                        this.clickCount = 2;
                    }, hideDelay * 1000);
                }, data * 1000);
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                this.exitPage();
                break;
            }
        }
    }
    protected exitPage() {
        this.hide();
        this.emit(EventType.RecommendEvent.closeLittlePage);
        this.emit(EventType.UIEvent.exited, GlobalEnum.UI.littlePage);
    }


    protected setData(data: any) {
        this.data = data;
        if (!!data.items && data.items.length > 0) {
            let items = data.items;
            this.addItems(items, data.itemType);
            this.content.getComponent(cc.Layout).updateLayout();
        }
    }


    //添加互推游戏节点
    protected addItems(data: any[], type) {
        let prefabName = "RecommendItem_littlePage";
        for (let i = 0, count = data.length; i < count; ++i) {
            let item = this.getItem(prefabName, data[i]);
            this.content.addChild(item);
        }
    }

    protected moveLeft: boolean = true;
    protected recommendMoveSpd: number = 50;
    protected updateRecommendH(dt: number) {
        if (this.content.width <= this.content.parent.width) {
            return;
        }

        let x;
        if (this.moveLeft) {
            x = this.content.x - dt * this.recommendMoveSpd;
            if (x + this.content.width <= this.content.parent.width) {
                x = this.content.parent.width - this.content.width;
                this.moveLeft = false;
            }
        } else {
            x = this.content.x + dt * this.recommendMoveSpd;
            if (x >= 0) {
                x = 0;
                this.moveLeft = true;
            }
        }
        this.content.setPosition(x, 0);
    }

    update(dt) {
        this.updateRecommendH(dt);
    }
}
