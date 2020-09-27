import yyComponent from "../../Script/Common/yyComponent";
import PlayerData from "../../Script/Common/PlayerData";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import Action3dManager, { ActionMngType } from "../../Script/Common/Action3dManager";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";

const { ccclass, property } = cc._decorator;
/**关卡选择界面 */
@ccclass
export default class ChooseLevelUI extends yyComponent {

    public init() {
        this.initUnlockEffect();
        this.initComponents();
        this.initItems();
        this.initPage();
    }

    public reset() {
        this.resetUnlockEffect();
    }

    public show() {
        this.node.active = true;
        // this.curPage = 0;
        let curLevel = PlayerData.getData("gameData.curLevel");
        if (undefined === curLevel) {
            this.curPage = 0;
        } else {
            this.curPage = Math.floor((curLevel - 1) / this.countPerPage);
        }
        this.showRecords(this.curPage);
        this.updateBtnState();
        this.playPlane();
    }

    @property(cc.Node)
    protected plane: cc.Node = null;
    protected playPlane() {
        let b = 0;
        let wg = this.plane.getComponent(cc.Widget);
        if (!!wg) {
            b = wg.bottom;
            wg.enabled = false;
        }
        let h = this.plane.height * this.plane.anchorY;
        let y = 0;
        if (!!wg) {
            y = -this.node.height * this.node.anchorY + b + h;
        } else {
            y = this.node.height * (1 - this.node.anchorY) - this.plane.height * (1 - this.plane.anchorY);
        }

        this.plane.setPosition(0, h + this.node.height * (1 - this.node.anchorY), 0);
        let move = Action3dManager.moveTo(1, 0, y, 0);
        move.easing(Action3dManager.easeElasticOut(0.35));
        Action3dManager.getMng(ActionMngType.UI).runAction(this.plane, move);
    }

    /*****************************************************************关卡项*****************************************************************/
    @property(cc.Node)
    protected itemLayer: cc.Node = null;
    /**关卡项背景图 */
    protected levelItemSprites: cc.Sprite[] = [];

    /**已过关背景图 */
    @property(cc.SpriteFrame)
    protected passItem: cc.SpriteFrame = null;
    /**未解锁背景图 */
    @property(cc.SpriteFrame)
    protected clockItem: cc.SpriteFrame = null;

    @property(cc.Node)
    protected levelLayer: cc.Node = null;
    /**关卡序号 */
    protected levelLabels: cc.Label[] = [];

    protected initItems() {
        this.countPerPage = this.itemLayer.childrenCount;
        this.levelItemSprites = [];
        for (let i = 0; i < this.countPerPage; ++i) {
            this.itemLayer.children[i].on("touchend", () => {
                this.onChooseLevel(i);
            }, this);
            this.levelItemSprites.push(this.itemLayer.children[i].getComponent(cc.Sprite));
        }
        this.levelLabels = [];
        for (let i = 0; i < this.countPerPage; ++i) {
            this.levelLabels.push(this.levelLayer.children[i].getComponent(cc.Label));
        }
    }
    /**选择关卡项 */
    protected onChooseLevel(index: number) {
        this.emit(EventType.AudioEvent.playClickBtn);
        let level = this.curPage * this.countPerPage + index + 1;
        let curLevel = PlayerData.getData("gameData.curLevel");
        if (level <= curLevel) {
            this.emit(EventType.DirectorEvent.enterChosedLevel, level);
        }
    }

    /*****************************************************************关卡页面*****************************************************************/
    /**每页包含的关卡项数量 */
    protected countPerPage: number = 16;
    /**当前显示在第几页，从0开始计数 */
    protected curPage: number = 0;
    /**可显示的最大页数 */
    protected maxPage: number = 62;
    protected initPage() {
        let c = this.itemLayer.childrenCount;
        this.maxPage = Math.floor(1000 / c);
    }
    protected showRecords(page?: number) {
        if (undefined === page) {
            page = this.curPage;
        }
        // let data = PlayerData.getData("gameData.levelRecords");
        let curLevel = PlayerData.getData("gameData.curLevel");
        let startLevel = page * this.countPerPage + 1;
        for (let i = 0; i < this.countPerPage; ++i) {
            let level = startLevel + i;
            // if (level > curLevel) {
            //     this.levelItemSprites[i].spriteFrame = this.clockItem;
            //     this.levelLabels[i].string = "";
            // } else if (level === curLevel) {
            //     this.levelItemSprites[i].spriteFrame = this.passItem;
            //     this.levelLabels[i].string = level.toString();
            // } else {
            //     let star = data[level];
            //     //理论上star绝对大于0
            //     if (!!star) {
            //         this.levelItemSprites[i].spriteFrame = this.passItem;
            //         this.levelLabels[i].string = (startLevel + i).toString();
            //     } else {
            //         this.levelItemSprites[i].spriteFrame = this.clockItem;
            //         this.levelLabels[i].string = "";
            //     }
            // }

            if (level > curLevel) {
                this.levelItemSprites[i].spriteFrame = this.clockItem;
                this.levelLabels[i].string = "";
            } else {
                this.levelItemSprites[i].spriteFrame = this.passItem;
                this.levelLabels[i].string = level.toString();
            }
        }
    }

    /*****************************************************************翻页按钮*****************************************************************/
    /**上一页按钮 */
    @property(cc.Button)
    protected btnPrePage: cc.Button = null;
    /**下一页按钮 */
    @property(cc.Button)
    protected btnNextPage: cc.Button = null;
    /**更新按钮的可点击状态 */
    protected updateBtnState() {
        this.btnPrePage.interactable = this.curPage > 0;
        this.btnNextPage.interactable = this.curPage < this.maxPage;
    }
    /**上一页 */
    protected onBtnPrePage() {
        this.emit(EventType.AudioEvent.playClickBtn);
        if (this.curPage <= 0) return;
        this.curPage -= 1;
        this.showRecords(this.curPage);
        this.updateBtnState();
    }
    /**下一页 */
    protected onBtnNextPage() {
        this.emit(EventType.AudioEvent.playClickBtn);
        if (this.curPage >= this.maxPage) return;
        this.curPage += 1;
        this.showRecords(this.curPage);
        this.updateBtnState();
    }

    protected onBtnClose() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.UIEvent.exit, GlobalEnum.UI.chooseLevel);
    }

    /*****************************************************************解锁/进入按钮*****************************************************************/
    protected onBtnUnclock() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.SDKEvent.showVideo, {
            success: this.unlockLevel.bind(this),
        });
    }
    protected unlockLevel() {
        let page = this.curPage;
        let curLevel = PlayerData.getData("gameData.curLevel");
        if (undefined === curLevel) {
            page = 0;
        } else {
            page = Math.floor((curLevel) / this.countPerPage);
        }
        if (page != this.curPage) {
            this.curPage = page;
            this.showRecords(this.curPage);
        }
        let index = curLevel % this.countPerPage;
        let p = this.plane.convertToNodeSpaceAR(this.itemLayer.children[index].convertToWorldSpaceAR(cc.v2(0, 38)));
        this.showUnlockEffect(p);
    }

    @property(cc.Node)
    protected unlockEffectMask: cc.Node = null;
    @property(cc.Node)
    protected unlockGuang: cc.Node = null;
    protected initUnlockEffect() {
        this.unlockEffectMask.active = false;
        this.unlockGuang.active = false;
    }
    protected resetUnlockEffect() {
        Action3dManager.getMng(ActionMngType.UI).stopAllActions(this.unlockEffectMask);
        Action3dManager.getMng(ActionMngType.UI).stopAllActions(this.unlockGuang);
        this.unlockEffectMask.active = false;
        this.unlockGuang.active = false;
    }
    protected showUnlockEffect(p?: cc.Vec2) {
        this.emit(EventType.UIEvent.showTouchMask);

        if (undefined === p) {
            let curLevel = PlayerData.getData("gameData.curLevel");
            let index = curLevel % this.countPerPage;
            p = this.plane.convertToNodeSpaceAR(this.itemLayer.children[index].convertToWorldSpaceAR(cc.v2(0, 38)));
        }

        this.unlockEffectMask.active = true;
        this.unlockEffectMask.setPosition(p);
        this.unlockEffectMask.opacity = 50;

        let fadeIn = Action3dManager.fadeTo(1, 255);
        fadeIn.easing(Action3dManager.easeSinIn());
        let cb = Action3dManager.callFun(this.onUnlockEffectFadeIn.bind(this), this);
        let delay = Action3dManager.delay(0.3);
        let fadeOut = Action3dManager.fadeTo(0.5, 0);
        let finish = Action3dManager.callFun(this.onUnlockEffectFadeOut, this);
        let seq = Action3dManager.sequence(fadeIn, cb, delay, fadeOut, finish);
        Action3dManager.getMng(ActionMngType.UI).runAction(this.unlockEffectMask, seq);
    }
    protected onUnlockEffectFadeIn() {
        this.emit(EventType.PlayerDataEvent.updatePlayerData, {
            type: "gameData",
            attribute: "gameData.curLevel",
            value: 1,
            mode: "+",
        });
        this.showRecords(this.curPage);
        this.updateBtnState();
    }
    protected onUnlockEffectFadeOut() {
        Action3dManager.getMng(ActionMngType.UI).stopAllActions(this.unlockGuang);
        this.unlockEffectMask.active = false;
        this.unlockGuang.active = false;
        this.emit(EventType.UIEvent.hideTouchMask);
    }
}
