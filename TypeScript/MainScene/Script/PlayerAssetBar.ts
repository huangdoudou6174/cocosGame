import yyComponent from "../../Script/Common/yyComponent";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import PlayerData from "../../Script/Common/PlayerData";
import GlobalPool from "../../Script/Common/GlobalPool";
import { GlobalEnum } from "../../Script/GameSpecial/GlobalEnum";
import Action3dManager, { ActionMngType } from "../../Script/Common/Action3dManager";

//玩家的金币体力等资产信息条
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerAssetBar extends yyComponent {

    public init() {
        this.initComponents();
        this.initGoldIcon();
        this.onEvents();
        this.setData();
    }
    protected onEvents() {
        this.on(EventType.PlayerDataEvent.playerDataChanged, this.onPlayerDataChanged, this);
        this.on(EventType.UIEvent.playGoldAnim, this.playGoldAnim, this);
    }
    public reset() {
        this.resetGoldIcon();
    }

    public show() {
        this.node.active = true;
        this.setData();
        this.onEvents();
    }
    public hide() {
        this.offEvents();
        this.node.active = false;
    }

    protected setData() {
        let data = PlayerData.getData("gameData.asset");
        this.setGold(data.gold);
    }

    protected convertToString(v: number) {
        if (v < 1100) return v.toString();
        if (v < 1000000) return (v * 0.001).toFixed(1) + "K";
        return (v * 0.000001).toFixed(1) + "M";
    }

    protected onPlayerDataChanged(data) {
        switch (data.attribute) {
            case "gameData.asset.gold": {
                this.setGold(data.value);
                break;
            }
        }
    }

    //#region 金币信息
    @property(cc.Label)
    protected goldLabel: cc.Label = null;
    protected setGold(gold: number) {
        this.goldLabel.string = this.convertToString(gold);
    }
    //#endregion

    //#region 金币动画
    @property(cc.Node)
    protected goldLayer: cc.Node = null;
    @property(cc.Prefab)
    protected goldIconPrefab: cc.Prefab = null;
    protected targetPos: cc.Vec3;
    protected cb: Function;
    protected initGoldIcon() {
        let p = this.goldLabel.node.convertToWorldSpaceAR(cc.v2(0, 0));
        p = this.node.convertToNodeSpaceAR(p);
        this.targetPos = cc.v3(p.x, p.y, 0);
        this.cb = null;
        GlobalPool.createPool(GlobalEnum.LevelPrefab.goldIcon, this.goldIconPrefab);
    }
    protected resetGoldIcon() {
        this.cb = null;
        let actMng = Action3dManager.getMng(ActionMngType.UI);
        for (let i = this.goldLayer.childrenCount - 1; i >= 0; --i) {
            actMng.stopAllActions(this.goldLayer.children[i]);
        }
        GlobalPool.putAllChildren(this.goldLayer, true);
    }
    protected playGoldAnim(data: { startPos: cc.Vec2, cb: Function, gold?: number }) {
        this.resetGoldIcon();
        this.emit(EventType.UIEvent.showTouchMask);
        this.cb = data.cb;

        let center = cc.v2();
        if (!!data.startPos) {
            center.set(data.startPos);
        }

        let duration = 0.2;
        let count = Math.round(Math.random() * 10) + 20;
        let scope = 250;
        let actMng = Action3dManager.getMng(ActionMngType.UI);
        for (let i = 0; i < count; i++) {
            let item = GlobalPool.get(GlobalEnum.LevelPrefab.goldIcon);
            this.goldLayer.addChild(item);
            item.setPosition(center);
            item.setScale(1, 1);

            let move = Action3dManager.moveTo(duration, (Math.random() - 0.5) * scope, (Math.random() - 0.5) * scope, 0);
            move.easing(Action3dManager.easeOut(2));
            actMng.runAction(item, move);
        }
        this.scheduleOnce(this.toTarget, duration);
    }
    protected toTarget() {
        let actMng = Action3dManager.getMng(ActionMngType.UI);
        let duration = 0.8;
        let delay = 0.005;
        let totalDelay = this.goldLayer.childrenCount * delay;
        for (let i = this.goldLayer.childrenCount - 1; i >= 0; --i) {
            let move = Action3dManager.moveTo(duration, this.targetPos);
            let scale = Action3dManager.scaleTo(duration, 0.5, 0.5, 1);
            let spawn = Action3dManager.spawn(move, scale);
            let d = Action3dManager.delay(delay + i * delay);
            let seq = Action3dManager.sequence(d, spawn);
            actMng.runAction(this.goldLayer.children[i], seq);
        }
        this.scheduleOnce(this.playFinish, duration + totalDelay);
    }
    protected playFinish() {
        this.emit(EventType.UIEvent.hideTouchMask);
        if (!!this.cb) {
            this.cb();
        } else {
            this.emit(EventType.UIEvent.goldAnimPlayFinish);
        }
        this.resetGoldIcon();
    }

    //#endregion

    //#region 体力信息

    //#endregion

    //#region 体力动画

    //#endregion


}
