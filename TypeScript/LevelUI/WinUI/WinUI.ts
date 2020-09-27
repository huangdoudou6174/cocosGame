import yyComponent from "../../Script/Common/yyComponent";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import Action3dManager from "../../Script/Common/Action3dManager";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import UIManager from "../../Script/Common/UIManager";
import GamePlatform from "../../Script/Platform/GamePlatform";
import { GamePlatformType } from "../../Script/Platform/GamePlatformType";
import WinAnim from "./WinAnim";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WinUI extends yyComponent {

    /**场景/UI类型 */
    public get uiType() { return GlobalEnum.UI.winUI; }

    @property(cc.Node)
    protected bg: cc.Node = null;

    @property(WinAnim)
    protected winAnim: WinAnim = null;

    //关卡奖励的金币    
    /**显示关卡奖励的金币的节点层 */
    @property(cc.Node)
    protected levelGoldLayer: cc.Node = null;
    @property(cc.Label)
    protected goldLabel: cc.Label = null;

    protected baseGold: number = 0;
    protected speGold: number = 0;

    //视频与普通领取分开的方案：
    /**单倍领取 */
    @property(cc.Node)
    protected btnGetAwardSingle: cc.Node = null;
    /**视频领取 */
    @property(cc.Node)
    protected btnVideo: cc.Node = null;

    /**下一关按钮 */
    @property(cc.Node)
    protected btnNextLevel: cc.Node = null;
    @property(cc.Node)
    protected btnLobby: cc.Node = null;
    //头条分享录屏
    @property(cc.Node)
    protected btnShareVideo: cc.Node = null;
    @property(cc.Label)
    protected shareGold: cc.Label = null;
    /**分享录屏奖励的金币量 */
    protected shareVideoAwardGold: number = 100;

    protected data: any;

    public reset() {
        this.hideBtnGetAward();
        this.hideBtnLobby();
        this.hideBtnShareVideo();
        this.hideLevelGold();
    }
    /**
     * 显示UI
     * @param data 关卡成绩
     */
    public show(data?: any) {
        this.reset();
        if (undefined === data) {
            let ui = UIManager.getUI(GlobalEnum.UI.levelInfo);
            data = ui.getData();
        }

        this.node.active = true;
        this.setData(data);
        this.winAnim.play(this.onWinAnimFinished.bind(this));
    }
    protected onWinAnimFinished() {
        this.emit(EventType.SDKEvent.stopRecord);
        this.stepShowBtnGetAward();
    }

    protected stepShowBtnGetAward() {
        this.showBtnShareVideo();
        this.showBtnGetAward();
        this.showLevelGold();
    }

    protected stepShowBtnLobby() {
        this.showBtnLobby();
    }

    /**显示分享录屏按钮 */
    protected showBtnShareVideo(): boolean {
        if (!this.btnShareVideo) return false;
        if (GamePlatform.instance.Config.type != GamePlatformType.TT) return false;

        if (!!this.shareGold) {
            this.shareGold.node.parent.active = true;
            this.shareGold.string = "+" + this.shareVideoAwardGold;
        }

        this.btnShareVideo.active = true;
        return true;
    }
    /**隐藏分享录屏按钮 */
    protected hideBtnShareVideo() {
        if (!!this.shareGold) this.shareGold.node.parent.active = false;
        if (!!this.btnShareVideo) {
            // this.btnShareVideo.stopAllActions();
            this.btnShareVideo.active = false;
        }
    }
    /**显示领取奖励按钮 */
    protected showBtnGetAward() {
        if (!!this.btnGetAwardSingle) this.btnGetAwardSingle.active = true;
        if (!!this.btnVideo) this.btnVideo.active = true;
    }
    /**隐藏领取奖励按钮 */
    protected hideBtnGetAward() {
        if (!!this.btnGetAwardSingle) this.btnGetAwardSingle.active = false;
        if (!!this.btnVideo) this.btnVideo.active = false;
    }
    /**显示关卡金币奖励 */
    protected showLevelGold() {
        if (!!this.levelGoldLayer) this.levelGoldLayer.active = true;
    }
    /**隐藏关卡金币奖励 */
    protected hideLevelGold() {
        if (!!this.levelGoldLayer) this.levelGoldLayer.active = false;
    }
    //返回、下一关等按钮
    protected showBtnLobby() {
        if (!!this.btnNextLevel) this.btnNextLevel.active = true;
        if (!!this.btnLobby) this.btnLobby.active = true;
    }
    protected hideBtnLobby() {
        if (!!this.btnNextLevel) this.btnNextLevel.active = false;
        if (!!this.btnLobby) this.btnLobby.active = false;
    }

    public hide() {
        this.node.active = false;
    }

    protected setData(data: { gold: number }) {
        this.data = data;

        this.baseGold = data.gold;
        this.goldLabel.string = (this.baseGold + this.speGold).toString();
    }

    protected getTotalGold(): number {
        return this.baseGold + this.speGold;
    }

    //视频三倍
    protected onBtnVideo() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.SDKEvent.showVideo, this.onVideoFinish.bind(this));
    }
    protected onVideoFinish() {
        this.hideLevelGold();
        this.addGold(this.getTotalGold() * 3, this.onGetGoldFinish.bind(this));
    }
    //普通领取
    protected onBtnGetGold() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.hideLevelGold();
        this.addGold(this.getTotalGold(), this.onGetGoldFinish.bind(this));
    }

    //返回首页
    protected onBtnLobby() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.DirectorEvent.enterLobby);
    }

    /**下一关 */
    protected onBtnNextLevel() {
        this.emit(EventType.AudioEvent.playClickBtn);
        this.emit(EventType.DirectorEvent.playNextLevel);
        // this.emit(EventType.DirectorEvent.enterLobby);
    }

    //金币领取完成后显示下一关和返回首页按钮
    protected onGetGoldFinish() {
        this.hideLevelGold();
        this.hideBtnGetAward();
        this.stepShowBtnLobby();
    }

    /**设置按钮坐标为常规状态 */
    protected setBtnsPosNormal() {
        // this.btnNextLevel.y = 310 + this.btnNextLevel.height * this.btnNextLevel.anchorY - this.node.height * this.node.anchorY;
    }

    /**播放金币动画获得金币 */
    protected addGold(gold: number, cb?: Function) {
        let pos = this.levelGoldLayer.convertToWorldSpaceAR(cc.v2());
        let cvs = cc.find("Canvas");
        pos.x -= cvs.width * 0.5;
        pos.y -= cvs.height * 0.5;
        this.emit(EventType.UIEvent.playGoldAnim, {
            startPos: pos,
            cb: () => {
                this.emit(EventType.PlayerDataEvent.updatePlayerData, {
                    attribute: "gameData.asset.gold",
                    value: gold,
                    mode: "+"
                });
                !!cb && cb();
            },
            gold: gold,
        })
    }

    //头条平台录屏分享
    protected onBtnShareVideo() {
        this.emit(EventType.SDKEvent.shareRecord, this.onShareVideoFinish.bind(this), this.onShareVideoFail.bind(this));
    }
    protected onShareVideoFinish() {
        this.hideBtnShareVideo();
        // this.addGold(this.shareVideoAwardGold);
        this.emit(EventType.AssetEvent.getPower, 2);
        this.emit(EventType.UIEvent.showTip, "分享成功，获得体力奖励！");
    }
    protected onShareVideoFail() {

    }

}
