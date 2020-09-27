
type Vec3 = {
    x: number,
    y: number,
    z: number
}

/**动作管理器类型 */
export enum ActionMngType {
    /**UI动作管理器 */
    UI = "UI",
    /**关卡动作管理器 */
    Level = "Level",

}

/**3D动画管理器 */
export default class Action3dManager {

    protected static allMngs: { [type: string]: Action3dManager } = {};
    /**
     * 获取指定类型的动作管理器，用于专门管理某一类对象的动作
     * @param type 管理器的类型，可以是枚举值，也可以自定义一个新的名称，获取新的管理器
     */
    public static getMng(type) {
        if (!this.allMngs[type]) {
            this.allMngs[type] = new Action3dManager();
        }
        return this.allMngs[type];
    }

    public constructor() {
        this.allActions = [];
    }
    protected allActions: Action3d[] = [];

    public update(dt: number) {
        for (let i = this.allActions.length - 1; i >= 0; --i) {
            let act = this.allActions[i];
            if (!act) {
                continue;
            }
            act.update(dt);
            if (act.finished) {
                let index = i;
                if (index >= this.allActions.length) {
                    index = this.allActions.length - 1;
                }
                for (; index >= 0; --index) {
                    if (this.allActions[index].Id == act.Id) {
                        this.allActions.splice(index, 1);
                        break;
                    }
                }
            }
        }
    }
    public runAction(node: cc.Node, action: Action3d) {
        this.stopAllActions(node);
        action.resetFinishState();
        action.setTarget(node);
        this.allActions.push(action);
    }
    public stopAllActions(node: cc.Node) {
        for (let i = this.allActions.length - 1; i >= 0; --i) {
            if (this.allActions[i].node == node) {
                this.allActions.splice(i, 1);
            }
        }
    }

    public static delay(duration: number) {
        return new DelayTime(duration);
    }
    public static moveTo(duration: number, x: number | Vec3, y?: number, z?: number): Action3d {
        return new MoveTo3d(duration, x, y, z);
    }
    public static moveBy(duration: number, x: number | Vec3, y?: number, z?: number): Action3d {
        return new MoveBy3d(duration, x, y, z);
    }
    public static scaleTo(duration: number, x: number | Vec3, y?: number, z?: number): Action3d {
        return new ScaleTo3d(duration, x, y, z);
    }
    public static rotateTo(duration: number, x: number | Vec3, y?: number, z?: number): Action3d {
        return new RotateTo3d(duration, x, y, z);
    }
    public static rotateBy(duration: number, x: number | Vec3, y?: number, z?: number): Action3d {
        return new RotateBy3d(duration, x, y, z);
    }
    public static rotateTo2d(duration: number, angle: number) {
        return new RotateTo2d(duration, angle);
    }
    public static rotateBy2d(duration: number, angle: number) {
        return new RotateBy2d(duration, angle);
    }
    public static fadeTo(duration: number, opacity: number): Action3d {
        return new FadeTo(duration, opacity);
    }
    public static fadeBy(duration: number, opacity: number): Action3d {
        return new FadeBy(duration, opacity);
    }

    /**
     * 按目标值的方式修改对象的任意属性值
     * @param duration 动作持续的时间
     * @param attribute 变量名称
     * @param value 变化的相对值
     * @param newAttribute 值变化时是否需要新建属性再给目标对象赋值，例如要修改节点的position属性时应该为true
     */
    public static tweenTo(duration: number, attribute: string, value: any, newAttribute: boolean = false) {
        return new TweenTo(duration, attribute, value, newAttribute);
    }
    /**
     * 按相对值的方式修改对象的任意属性值
     * @param duration 动作持续的时间
     * @param attribute 变量名称
     * @param value 变化的相对值
     * @param newAttribute 值变化时是否需要新建属性再给目标对象赋值，例如要修改节点的position属性时应该为true
     */
    public static tweenBy(duration: number, attribute: string, value: any, newAttribute: boolean = false) {
        return new TweenBy(duration, attribute, value, newAttribute);
    }

    public static callFun(cb: Function, target?: any, data?: any): Action3d {
        return new CallFun3d(cb, target, data);
    }

    public static sequence(...actions): Action3d {
        return new Sequence3d(actions);
    }

    public static spawn(...actions): Action3d {
        return new Spawn3d(actions);
    }

    public static repeatForever(action: Action3d) {
        return new RepeatForever(action);
    }

    //缓动动作
    public static easeIn(rate: number): Ease {
        return new EaseIn(rate);
    }
    public static easeOut(rate: number): Ease {
        return new EaseOut(rate);
    }
    public static easeInOut(rate: number): Ease {
        return new EaseInOut(rate);
    }
    public static easeOutIn(rate: number): Ease {
        return new EaseOutIn(rate);
    }

    public static easeExponentialIn(): Ease {
        return new EaseExponentialIn();
    }
    public static easeExponentialOut(): Ease {
        return new EaseExponentialOut();
    }
    public static easeExponentialInOut(): Ease {
        return new EaseExponentialInOut();
    }

    public static easeSinIn(): Ease {
        return new EaseSinIn();
    }
    public static easeSinOut(): Ease {
        return new EaseSinOut();
    }
    public static easeSinInOut(): Ease {
        return new EaseSinInOut();
    }
    public static easeSinOutIn(): Ease {
        return new EaseSinOutIn();
    }

    /**弹性变化进入，先回弹再变快 */
    public static easeElasticIn(rate?: number) {
        return new EaseElasticIn(rate);
    }
    /**弹性变化退出，先快速到达目标值再回弹 */
    public static easeElasticOut(rate?: number) {
        return new EaseElasticOut(rate);
    }
    /**弹性变化进入再退出，在时间轴的中间部分进行回弹 */
    public static easeElasticInOut(rate?: number) {
        return new EaseElasticInOut(rate);
    }
    /**按弹跳动作进入 */
    public static easeBounceIn() {
        return new EaseBounceIn();
    }
    /**按弹跳动作退出 */
    public static easeBounceOut() {
        return new EaseBounceOut();
    }
}

//动作基类
export class Action3d {
    protected static _id: number = 0;
    protected myId: number = null;
    public get Id() {
        if (null === this.myId) {
            this.myId = Action3d._id++;
        }
        return this.myId;
    }
    public node: cc.Node;
    public get binded(): boolean { return !!this.node; }
    public setTarget(node: cc.Node) {
        this.node = node;
    }
    /**缓动动画的比率转换函数 */
    protected _easeList: Ease[];
    public easing(...args: Ease[]) {
        this._easeList = [];
        for (let i = 0, c = args.length; i < c; ++i) {
            this._easeList.push(args[i]);
        }
        return this;
    }
    /**缓动动作时间缩放 */
    protected computeEaseTime(rate: number) {
        let locList = this._easeList;
        if ((!locList) || (locList.length === 0)) {
            return rate;
        }
        for (var i = 0, n = locList.length; i < n; i++) {
            rate = locList[i].easing(rate);
        }
        return rate;
    }
    public get finished(): boolean { return false; }
    public resetFinishState() {

    }
    public update(dt: number) { }
}


//有限时长的动作
export class FiniteTimeAction3d extends Action3d {
    /**动作持续的总时间 */
    protected duration: number;
    /**动作累计已运行的时间 */
    protected elapse: number;

    public get finished(): boolean { return this.elapse >= this.duration; }
    public resetFinishState() {
        this.elapse = 0;
    }
    protected _paused: boolean = false;
    public get paused(): boolean { return this._paused; }

    public constructor(duration: number) {
        super();
        this.duration = duration;
        this.elapse = 0;
    }
    public update(dt: number) {
        let rate = this.addElapseTime(dt);
        this.step(rate);
    }
    protected addElapseTime(dt: number): number {
        this.elapse += dt;
        let rate = 1;
        if (this.duration > 0) {
            rate = this.elapse / this.duration;
            if (rate > 1) rate = 1;
        }
        rate = this.computeEaseTime(rate);
        return rate;
    }
    protected step(rate: number) {

    }

    protected interpolation(min: number, max: number, rate: number) {
        return min + (max - min) * rate;
    }
}
//延迟
export class DelayTime extends FiniteTimeAction3d {

}
//移动
export class MoveTo3d extends FiniteTimeAction3d {
    /**初始值 */
    private original: Vec3;
    /**目标值 */
    private target: Vec3;
    /**当前值 */
    private curValue: Vec3;
    public constructor(duration: number, x: number | Vec3, y?: number, z?: number) {
        super(duration);
        if (typeof x === "number") {
            this.target = {
                x: x,
                y: y,
                z: z
            };
        } else {
            this.target = x;
        }
        this.curValue = {
            x: 0,
            y: 0,
            z: 0
        };
    }

    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = {
            x: node.x,
            y: node.y,
            z: node.z
        };

    }

    public step(rate: number) {
        this.curValue.x = this.interpolation(this.original.x, this.target.x, rate);
        this.curValue.y = this.interpolation(this.original.y, this.target.y, rate);
        this.curValue.z = this.interpolation(this.original.z, this.target.z, rate);
        this.node.setPosition(this.curValue.x, this.curValue.y, this.curValue.z);
    }
}
export class MoveBy3d extends FiniteTimeAction3d {
    /**初始值 */
    private original: Vec3;
    /**目标值 */
    private target: Vec3;
    /**当前值 */
    private curValue: Vec3;
    public constructor(duration: number, x: number | Vec3, y?: number, z?: number) {
        super(duration);
        if (typeof x === "number") {
            this.target = {
                x: x,
                y: y,
                z: z
            };
        } else {
            this.target = x;
        }
        this.curValue = {
            x: 0,
            y: 0,
            z: 0
        };
    }

    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = {
            x: node.x,
            y: node.y,
            z: node.z
        };
    }

    public step(rate: number) {
        this.curValue.x = this.original.x + this.target.x * rate;
        this.curValue.y = this.original.y + this.target.y * rate;
        this.curValue.z = this.original.z + this.target.z * rate;
        this.node.setPosition(this.curValue.x, this.curValue.y, this.curValue.z);
    }
}
//缩放
export class ScaleTo3d extends FiniteTimeAction3d {
    /**初始值 */
    private original: Vec3;
    /**目标值 */
    private target: Vec3;
    public constructor(duration: number, x: number | Vec3, y?: number, z?: number) {
        super(duration);
        if (typeof x === "number") {
            this.target = {
                x: x,
                y: y,
                z: z
            };
        } else {
            this.target = x;
        }
    }

    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = {
            x: node.scaleX,
            y: node.scaleY,
            z: node.scaleZ
        };
    }

    public step(rate: number) {
        let x = this.interpolation(this.original.x, this.target.x, rate);
        let y = this.interpolation(this.original.y, this.target.y, rate);
        let z = this.interpolation(this.original.z, this.target.z, rate);
        this.node.setScale(x, y, z);
    }
}
//旋转
export class RotateTo3d extends FiniteTimeAction3d {
    /**初始值 */
    private original: Vec3;
    /**目标值 */
    private target: Vec3;
    public constructor(duration: number, x: number | Vec3, y?: number, z?: number) {
        super(duration);
        if (typeof x === "number") {
            this.target = {
                x: x,
                y: y,
                z: z
            };
        } else {
            this.target = x;
        }
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = {
            x: node.eulerAngles.x,
            y: node.eulerAngles.y,
            z: node.eulerAngles.z
        };
    }

    public step(rate: number) {
        let x = this.interpolation(this.original.x, this.target.x, rate);
        let y = this.interpolation(this.original.y, this.target.y, rate);
        let z = this.interpolation(this.original.z, this.target.z, rate);
        this.node.eulerAngles = cc.v3(x, y, z);
    }
}
export class RotateBy3d extends FiniteTimeAction3d {
    /**初始值 */
    private original: Vec3;
    /**目标值 */
    private target: Vec3;
    public constructor(duration: number, x: number | Vec3, y?: number, z?: number) {
        super(duration);
        if (typeof x === "number") {
            this.target = {
                x: x,
                y: y,
                z: z
            };
        } else {
            this.target = x;
        }
    }

    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = {
            x: node.eulerAngles.x,
            y: node.eulerAngles.y,
            z: node.eulerAngles.z
        };
    }

    public step(rate: number) {
        let x = this.original.x + this.target.x * rate;
        let y = this.original.y + this.target.y * rate;
        let z = this.original.z + this.target.z * rate;
        this.node.eulerAngles = cc.v3(x, y, z);
    }
}

//2D旋转
export class RotateTo2d extends FiniteTimeAction3d {
    /**初始值 */
    private original: number;
    /**目标值 */
    private target: number;
    public constructor(duration: number, angle: number) {
        super(duration);
        this.target = angle;
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = node.angle;
    }

    public step(rate: number) {
        let angle = this.interpolation(this.original, this.target, rate);
        this.node.angle = angle;
    }
}
//2D旋转
export class RotateBy2d extends FiniteTimeAction3d {
    /**初始值 */
    private original: number;
    /**目标值 */
    private target: number;
    public constructor(duration: number, angle: number) {
        super(duration);
        this.target = angle;
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = node.angle;
    }

    public step(rate: number) {
        let angle = this.original + this.target * rate;
        this.node.angle = angle;
    }
}
//2D节点：透明度变化
export class FadeTo extends FiniteTimeAction3d {
    /**初始值 */
    private original: number;
    /**目标值 */
    private target: number;
    public constructor(duration: number, x: number) {
        super(duration);
        this.target = x;
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = node.opacity;
    }

    public step(rate: number) {
        let o = this.interpolation(this.original, this.target, rate);
        this.node.opacity = o;
    }
}
export class FadeBy extends FiniteTimeAction3d {
    /**初始值 */
    private original: number;
    /**目标值 */
    private target: number;
    public constructor(duration: number, x: number) {
        super(duration);
        this.target = x;
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        this.original = node.opacity;
    }

    public step(rate: number) {
        this.node.opacity = this.original + this.target * rate;
    }
}


//任意属性变化
class TweenTo extends FiniteTimeAction3d {

    protected obj: any;
    protected attribute: string;
    protected original: any;
    protected targetValue: any;
    protected isNumber: boolean;
    protected newAttribute: boolean;
    /**
     * 
     * @param duration 动作持续的时间
     * @param attribute 变量名称
     * @param value 变化的相对值
     * @param newAttribute 值变化时是否需要新建属性再给目标对象赋值，例如要修改节点的position属性时应该为true
     */
    public constructor(duration: number, attribute: string, value: any, newAttribute: boolean) {
        super(duration);
        this.attribute = attribute;
        this.targetValue = value;
        this.isNumber = (typeof value === "number");
        this.newAttribute = newAttribute;
    }
    public setTarget(obj: any) {
        this.obj = obj;
        if (undefined === obj[this.attribute]) {
            console.error("对象不存在属性" + this.attribute + "，动作TweenTo将无法生效");
            return;
        }
        this.original = JSON.parse(JSON.stringify(obj[this.attribute]));
    }
    public step(rate: number) {
        if (this.isNumber) {
            this.obj[this.attribute] = this.interpolation(this.original, this.targetValue, rate);
        } else if (this.newAttribute) {
            let data: any = {};
            for (let key in this.original) {
                data[key] = this.interpolation(this.original[key], this.targetValue[key], rate);
            }
            this.obj[this.attribute] = data;
        } else {
            for (let key in this.original) {
                this.obj[this.attribute][key] = this.interpolation(this.original[key], this.targetValue[key], rate);
            }
        }
    }
}
class TweenBy extends FiniteTimeAction3d {

    protected obj: any;
    protected attribute: string;
    protected original: any;
    protected targetValue: any;
    protected isNumber: boolean;
    protected newAttribute: boolean;
    /**
     * 
     * @param duration 动作持续的时间
     * @param attribute 变量名称
     * @param value 变化的相对值
     * @param newAttribute 值变化时是否需要新建属性再给目标对象赋值，例如要修改节点的position属性时应该为true
     */
    public constructor(duration: number, attribute: string, value: any, newAttribute: boolean) {
        super(duration);
        this.attribute = attribute;
        this.targetValue = value;
        this.isNumber = (typeof value === "number");
        this.newAttribute = newAttribute;
    }
    public setTarget(obj: any) {
        this.obj = obj;
        if (undefined === obj[this.attribute]) {
            console.error("对象不存在属性" + this.attribute + "，动作TweenTo将无法生效");
            return;
        }
        this.original = JSON.parse(JSON.stringify(obj[this.attribute]));
    }
    public step(rate: number) {
        if (this.isNumber) {
            this.obj[this.attribute] = this.original + this.targetValue * rate;
        } else if (this.newAttribute) {
            let data: any = {};
            for (let key in this.original) {
                data[key] = this.original[key] + this.targetValue[key] * rate;
            }
            this.obj[this.attribute] = data;
        } else {
            for (let key in this.original) {
                this.obj[this.attribute][key] = this.original[key] + this.targetValue[key] * rate;
            }
        }
    }
}


//回调函数
export class CallFun3d extends Action3d {
    private target: any;
    private cb: Function;
    private data: any;
    protected _finished: boolean = false;
    public get finished(): boolean { return this._finished; }
    public resetFinishState() {
        this._finished = false;
    }
    public constructor(cb: Function, target?: any, data?: any) {
        super();
        this.cb = cb;
        this.target = target;
        this.data = data;
    }
    public update(dt: number) {
        if (this.finished) return;
        if (!!this.target) {
            this.cb.call(this.target, this.data || null);
        } else {
            this.cb(this.data || null);
        }
        this._finished = true;
    }
}


//队列动作
export class Sequence3d extends Action3d {
    /**动作列表 */
    protected actions: Action3d[];
    /**当前执行的动作索引 */
    protected curActionPtr: number;
    public get finished(): boolean { return this.curActionPtr >= this.actions.length; }
    public resetFinishState() {
        for (let i = this.actions.length - 1; i >= 0; --i) {
            this.actions[i].resetFinishState();
        }
        this.curActionPtr = 0;
        this.setCurActionTarget();
    }
    public constructor(actions: Action3d[]) {
        super();
        this.curActionPtr = 0;
        this.actions = [].concat(actions);
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        // for (let i = this.actions.length - 1; i >= 0; --i) {
        //     this.actions[i].setTarget(node);
        // }
        this.setCurActionTarget();
    }
    public update(dt: number) {
        if (this.finished) return;
        let action = this.actions[this.curActionPtr];
        action.update(dt);
        if (action.finished) {
            this.curActionPtr++;
            this.setCurActionTarget();
        }
    }
    /**设置当前正在执行的动作的目标节点 */
    protected setCurActionTarget() {
        if (!this.finished && !!this.node) this.actions[this.curActionPtr].setTarget(this.node);
    }

    public pushAction(action: Action3d) {
        this.actions.push(action);
    }
}
//同步动作
export class Spawn3d extends Action3d {
    /**动作列表 */
    protected actions: Action3d[];
    /**剩余未完成的动作 */
    private remainCount: number;
    public get finished(): boolean {
        return this.remainCount <= 0;
    }
    public resetFinishState() {
        for (let i = this.actions.length - 1; i >= 0; --i) {
            this.actions[i].resetFinishState();
        }
        this.remainCount = this.actions.length;
    }
    public constructor(actions: Action3d[]) {
        super();
        this.actions = [].concat(actions);
        this.remainCount = this.actions.length;
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        for (let i = this.actions.length - 1; i >= 0; --i) {
            this.actions[i].setTarget(node);
        }
    }
    public update(dt: number) {
        if (this.finished) return;
        for (let i = this.actions.length - 1; i >= 0; --i) {
            if (!this.actions[i].finished) {
                this.actions[i].update(dt);
                if (this.actions[i].finished) {
                    this.remainCount--;
                }
            }
        }
    }
    //追加一个动作
    public pushAction(action: Action3d) {
        this.actions.push(action);
        if (!!this.node) action.setTarget(this.node);
    }
}
//重复动作
export class RepeatForever extends Action3d {
    protected action: Action3d;
    public constructor(action: Action3d) {
        super();
        this.action = action;
    }
    public setTarget(node: cc.Node) {
        this.node = node;
        this.action.setTarget(node);
    }
    public update(dt: number) {
        this.action.update(dt);
        if (this.action.finished) {
            this.action.resetFinishState();
        }
    }
}


//缓动曲线
class Ease {
    public easing(rate: number): number {
        return rate;
    }
}
class EaseIn extends Ease {
    protected _rate: number;
    public constructor(rate: number) {
        super();
        this._rate = rate;
    }
    public easing(rate: number): number {
        return Math.pow(rate, this._rate);
    }
}
class EaseOut extends Ease {
    protected _rate: number;
    public constructor(rate: number) {
        super();
        this._rate = rate;
    }
    public easing(rate: number): number {
        return Math.pow(rate, 1 / this._rate);
    }
}
class EaseInOut extends Ease {
    protected _rate: number;
    public constructor(rate: number) {
        super();
        this._rate = rate;
    }
    public easing(rate: number): number {
        rate *= 2;
        if (rate < 1)
            return 0.5 * Math.pow(rate, this._rate);
        else
            return 1.0 - 0.5 * Math.pow(2 - rate, this._rate);
    }
}

class EaseOutIn extends Ease {
    protected _rate: number;
    public constructor(rate: number) {
        super();
        this._rate = rate;
    }
    public easing(rate: number): number {
        rate *= 2;
        if (rate < 1)
            return 1.0 - 0.5 * Math.pow(2 - rate, this._rate);
        else
            return 0.5 * Math.pow(rate, this._rate);
    }
}
/**指数函数缓动进入 */
class EaseExponentialIn extends Ease {
    public easing(rate: number): number {
        return rate === 0 ? 0 : Math.pow(2, 10 * (rate - 1));
    }
}
/**指数函数缓动退出 */
class EaseExponentialOut extends Ease {
    public easing(rate: number): number {
        return rate === 1 ? 1 : (-(Math.pow(2, -10 * rate)) + 1);
    }
}
/**指数函数缓动进入——退出 */
class EaseExponentialInOut extends Ease {
    public easing(rate: number): number {
        if (rate !== 1 && rate !== 0) {
            rate *= 2;
            if (rate < 1)
                return 0.5 * Math.pow(2, 10 * (rate - 1));
            else
                return 0.5 * (-Math.pow(2, -10 * (rate - 1)) + 2);
        }
        return rate;
    }
}

class EaseSinIn extends Ease {
    public easing(rate: number) {
        return 1 - Math.sin((1 - rate) * 1.57);
    }
}

class EaseSinOut extends Ease {
    public easing(rate: number) {
        return Math.sin(rate * 1.57);
    }
}
class EaseSinInOut extends Ease {
    public easing(rate: number) {
        return Math.sin(rate * 3.14 + 4.71) * 0.5 + 0.5;
    }
}
class EaseSinOutIn extends Ease {
    public easing(rate: number) {
        if (rate < 0.5) {
            return Math.sin(rate * 3.14) * 0.5;
        } else {
            return 1 - Math.sin((1 - rate) * 3.14) * 0.5;
        }
    }
}

//弹性变化
class EaseElasticIn extends Ease {
    protected _period: number;
    public constructor(rate?: number) {
        super();
        this._period = rate || 0.3;
    }
    public easing(rate: number): number {
        if (rate === 0 || rate === 1)
            return rate;
        rate = rate - 1;
        return -Math.pow(2, 10 * rate) * Math.sin((rate - (this._period / 4)) * Math.PI * 2 / this._period);
    }
}
class EaseElasticOut extends Ease {
    protected _period: number;
    public constructor(rate?: number) {
        super();
        this._period = rate || 0.3;
    }
    public easing(dt: number): number {
        return (dt === 0 || dt === 1) ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - (this._period / 4)) * Math.PI * 2 / this._period) + 1;
    }
}
class EaseElasticInOut extends Ease {
    protected _period: number;
    public constructor(rate?: number) {
        super();
        this._period = rate || 0.3;
    }
    public easing(dt: number): number {
        var newT = 0;
        var locPeriod = this._period;
        if (dt === 0 || dt === 1) {
            newT = dt;
        } else {
            dt = dt * 2;
            if (!locPeriod)
                locPeriod = this._period = 0.3 * 1.5;
            var s = locPeriod / 4;
            dt = dt - 1;
            if (dt < 0)
                newT = -0.5 * Math.pow(2, 10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod);
            else
                newT = Math.pow(2, -10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod) * 0.5 + 1;
        }
        return newT;
    }
}
//按弹跳动作缓动进入的动作
class EaseBounceIn extends Ease {
    public easing(dt: number): number {
        return 1 - this._bounceTime(1 - dt);
    }

    protected _bounceTime(time1) {
        if (time1 < 1 / 2.75) {
            return 7.5625 * time1 * time1;
        } else if (time1 < 2 / 2.75) {
            time1 -= 1.5 / 2.75;
            return 7.5625 * time1 * time1 + 0.75;
        } else if (time1 < 2.5 / 2.75) {
            time1 -= 2.25 / 2.75;
            return 7.5625 * time1 * time1 + 0.9375;
        }

        time1 -= 2.625 / 2.75;
        return 7.5625 * time1 * time1 + 0.984375;
    }
}

class EaseBounceOut extends Ease {
    public easing(dt: number): number {
        return this._bounceTime(dt);
    }

    protected _bounceTime(time1) {
        if (time1 < 1 / 2.75) {
            return 7.5625 * time1 * time1;
        } else if (time1 < 2 / 2.75) {
            time1 -= 1.5 / 2.75;
            return 7.5625 * time1 * time1 + 0.75;
        } else if (time1 < 2.5 / 2.75) {
            time1 -= 2.25 / 2.75;
            return 7.5625 * time1 * time1 + 0.9375;
        }

        time1 -= 2.625 / 2.75;
        return 7.5625 * time1 * time1 + 0.984375;
    }
}


