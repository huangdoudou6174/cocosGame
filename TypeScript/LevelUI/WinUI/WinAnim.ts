import GlobalPool from "../../Script/Common/GlobalPool";
import Action3dManager, { ActionMngType } from "../../Script/Common/Action3dManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WinAnim extends cc.Component {
    @property(cc.Prefab)
    protected prefab: cc.Prefab = null;
    @property([cc.SpriteFrame])
    protected imgs: cc.SpriteFrame[] = [];

    @property(cc.Integer)
    protected minScale: number = 0.5;
    @property(cc.Integer)
    protected maxScale: number = 2;
    @property(cc.Integer)
    protected minAngle: number = 0;
    @property(cc.Integer)
    protected maxAngle: number = 180;
    @property(cc.Integer)
    protected minSkew: number = 0;
    @property(cc.Integer)
    protected maxSkew: number = 5;
    @property(cc.Integer)
    protected duration: number = 1;
    @property(cc.Integer)
    protected minSpd: number = 1500;
    @property(cc.Integer)
    protected maxSpd: number = 2500;
    @property(cc.Integer)
    protected gravity: number = -3000;
    @property(cc.Integer)
    protected count: number = 100;

    protected particles: Particle[] = [];
    protected index = 0;
    protected addItem() {
        this.index++;
        if (this.index >= this.imgs.length) {
            this.index = 0;
        }
        let node = GlobalPool.get(this.prefab.name);
        node.getComponent(cc.Sprite).spriteFrame = this.imgs[this.index];
        let scale = this.randomScope(this.minScale, this.maxScale);
        let angle = this.randomScope(this.minAngle, this.maxAngle);
        node.setScale(scale);
        node.angle = angle;

        let duration = this.duration;

        let scale1 = Action3dManager.scaleTo(duration, this.randomScope(this.minScale, this.maxScale), this.randomScope(this.minScale, this.maxScale), 1);
        let rotate1 = Action3dManager.rotateTo2d(duration, this.randomScope(this.minAngle, this.maxAngle));
        let spawn = Action3dManager.spawn(scale1, rotate1);
        Action3dManager.getMng(ActionMngType.UI).runAction(node, spawn);

        let v = cc.v2();
        let spd = this.minSpd + Math.random() * (this.maxSpd - this.minSpd);
        let radian = (Math.random() * 0.5 + 0.25) * 3.14;
        v.x = spd * Math.cos(radian);
        v.y = spd * Math.sin(radian);
        this.particles.push(new Particle(node, v, this.gravity));

        node.setPosition(0, 0);
        this.node.addChild(node);
    }
    protected randomScope(min: number, max: number) {
        return min + Math.random() * (max - min);
    }

    protected finishCallFun = null;
    public play(cb?: Function) {
        if (!!cb) this.finishCallFun = cb;
        let c = this.count;
        GlobalPool.createPool(this.prefab.name, this.prefab);
        GlobalPool.preCreate(this.prefab.name, c);
        for (let i = 0; i < this.count; ++i) {
            this.addItem();
        }
        this.schedule(this.step, 0.016);
    }
    protected step() {
        let dt = 0.016;
        for (let i = this.particles.length - 1; i >= 0; --i) {
            this.particles[i].update(dt);
            if (this.particles[i].finished) {
                GlobalPool.put(this.particles[i].node);
                this.particles.splice(i, 1);
            }
        }
        if (this.particles.length == 0) {
            this.onFinish();
        }
    }
    protected onFinish() {
        this.unscheduleAllCallbacks();
        if (!!this.finishCallFun) {
            let cb = this.finishCallFun;
            this.finishCallFun = null;
            cb();
        }
    }

}
class Particle {
    public node: cc.Node;
    public spd: cc.Vec2;
    public gravity: number;
    constructor(node: cc.Node, spd: cc.Vec2, g: number) {
        this.node = node;
        this.spd = spd;
        this.gravity = g;
    }
    public update(dt: number) {
        this.spd.y += this.gravity * dt;
        this.node.setPosition(this.node.x + this.spd.x * dt, this.node.y + this.spd.y * dt);
    }
    public get finished() {
        return this.node.y < -667;
    }
}
