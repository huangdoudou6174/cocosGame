import AdvertSwitch from "../../Script/AdvertSwitch/AdvertSwitch";
import { AdConfig } from "../../Script/GameSpecial/AdConfig";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import Recommend_littlePage from "./Recommend_littlePage";

const { ccclass, property } = cc._decorator;
/**大全导页*/
@ccclass
export default class Recommend_bigPage extends Recommend_littlePage {

    //添加互推游戏节点
    protected addItems(data: any[], type) {
        let prefabName = "RecommendItem_bigPage";
        for (let i = 0, count = data.length; i < count; ++i) {
            let item = this.getItem(prefabName, data[i]);
            this.content.addChild(item);
        }
    }

    protected onBtnContinueGame() {
        //先判断后台开关
        let data = AdvertSwitch.getSwitch(GlobalEnum.AdvertSwitchType.bigPageDelayShowBanner);
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
                    let hideDelay = AdvertSwitch.getSwitch(GlobalEnum.AdvertSwitchType.bigPageDelayHideBanner);
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
        this.emit(EventType.RecommendEvent.closeBigPage);
        this.emit(EventType.UIEvent.exited, GlobalEnum.UI.bigPage);
    }

    protected moveUp: boolean = true;
    protected recommendMoveSpd: number = 50;
    protected updateRecommendV(dt: number) {
        if (this.content.height <= this.content.parent.height) {
            return;
        }

        let y;
        if (this.moveUp) {
            y = this.content.y + dt * this.recommendMoveSpd;
            if (y - this.content.height + this.content.parent.height >= 0) {
                y = this.content.height - this.content.parent.height;
                this.moveUp = false;
            }
        } else {
            y = this.content.y - dt * this.recommendMoveSpd;
            if (y <= 0) {
                y = 0;
                this.moveUp = true;
            }
        }
        this.content.setPosition(0, y);
    }

    update(dt) {
        this.updateRecommendV(dt);
    }
}
