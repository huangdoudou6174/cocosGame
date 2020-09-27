import yyComponent from "../../Script/Common/yyComponent";
import Action3dManager, { ActionMngType } from "../../Script/Common/Action3dManager";

const { ccclass, property } = cc._decorator;
/**关卡中使用的3D相机 */
@ccclass
export default class LevelCamera extends yyComponent {

    /**相机组件 */
    @property(cc.Camera)
    public camera: cc.Camera = null;
    /**相机组件所在节点 */
    @property(cc.Node)
    protected cameraNode: cc.Node = null;
    /**相机朝向的节点 */
    @property(cc.Node)
    protected anchorNode: cc.Node = null;
    protected _originalPos: cc.Vec3;
    protected _originalEulerAngles: cc.Vec3;
    protected initOriginalTransform() {
        this._originalPos = cc.v3();
        this.cameraNode.getPosition(this._originalPos);
        this._originalEulerAngles = cc.v3();
        this._originalEulerAngles.set(this.cameraNode.eulerAngles);
    }
    /**恢复到原始视角 */
    public resumeOriginalTransform(duration: number = 0, cb?: Function) {
        if (!duration) {
            this.cameraNode.setPosition(this._originalPos);
            this.cameraNode.eulerAngles = this._originalEulerAngles;
            return;
        }
        this.changeCamera({
            duration: duration,
            pos: this._originalPos,
            angle: this._originalEulerAngles,
            cb: cb
        });
    }
    /**视角切换 */
    public changeCamera(data: { duration?: number, pos?: cc.Vec3, angle?: cc.Vec3, cb?: Function }) {
        if (!data.duration) {
            if (!!data.pos) this.cameraNode.setPosition(data.pos);
            if (!!data.angle) this.cameraNode.eulerAngles = data.angle;
            if (!!data.cb) data.cb();
            return;
        }
        let move = null;
        let rotate = null;
        if (!!data.pos) {
            move = Action3dManager.moveTo(data.duration, data.pos);
        }
        if (!!data.angle) {
            rotate = Action3dManager.rotateTo(data.duration, data.angle);
        }
        let spawn = null;
        if (!!move && !!rotate) {
            spawn = Action3dManager.spawn(move, rotate);
        } else if (!!move) {
            spawn = Action3dManager.spawn(move);
        } else if (!!rotate) {
            spawn = Action3dManager.spawn(rotate);
        }
        let actMng = Action3dManager.getMng(ActionMngType.Level);
        if (!!spawn && !!data.cb) {
            let callFun = Action3dManager.callFun(data.cb);
            let sequence = Action3dManager.sequence(spawn, callFun);
            actMng.runAction(this.cameraNode, sequence);
        } else if (!!spawn) {
            actMng.runAction(this.cameraNode, spawn);
        } else if (!!data.cb) {
            data.cb();
        }
    }

    /**跟随的目标节点 */
    protected followTarget: cc.Node;

    public init() {
        this.anchorNode = this.node;
        this.camera = this.node.getComponentInChildren(cc.Camera);
        this.cameraNode = this.camera.node;
        this.customStep = this.stepSlowFollow;
        this.adaptViewForWidth();
        this.initOriginalTransform();
    }
    //按宽度适配，保持水平方向的视野范围不变
    protected adaptViewForWidth() {
        let p = cc.v3();
        this.cameraNode.getPosition(p);
        let L1 = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        let H2 = cc.find("Canvas").height;
        let fov = this.camera.fov;
        let h = L1 * Math.tan(fov * 0.5 * 0.017453);
        h = h * H2 / 1334;//1334：设计分辨率
        let f2 = Math.atan2(h, L1) * 2 * 57.3;
        this.camera.fov = f2;
    }

    public reset() {
        this.followTarget = null;
        this.resumeOriginalTransform();
    }
    public setTarget(followTarget: cc.Node) {
        this.followTarget = followTarget;
        // let pos = cc.v3();
        // this.followTarget.getPosition(pos);
        // this.anchorNode.setPosition(pos);
        this.anchorNode.setPosition(this.followTarget.x, 0, this.followTarget.z);
    }

    protected stepSlowFollow(dt: number) {
        if (!this.followTarget) return;

        //无缓动跟随：
        // this.anchorNode.setPosition(this.followTarget.x, this.followTarget.y, this.followTarget.z);
        this.anchorNode.setPosition(this.followTarget.x, 0, this.followTarget.z);

        // let pos = cc.v3();
        // this.followTarget.getPosition(pos);
        // this.convertWorldToScreen(pos);

        //缓动跟随：
        // let p1 = cc.v3();
        // this.followTarget.getPosition(p1);
        // let p2 = cc.v3();
        // this.anchorNode.getPosition(p2);
        // let offset = p1.subtract(p2);
        // // offset.multiplyScalar(dt);//todo:是否缓动跟随
        // this.anchorNode.setPosition(p2.addSelf(offset));
    }

    /**移动到指定位置 */
    public moveTo(duration: number, pos: cc.Vec3, cb?: Function) {
        let actMng = Action3dManager.getMng(ActionMngType.Level);
        let action = Action3dManager.moveTo(duration, pos);
        action.easing(Action3dManager.easeOut(3));
        if (!!cb) {
            let callFun = Action3dManager.callFun(cb);
            actMng.runAction(this.node, Action3dManager.sequence(action, callFun));
        } else {
            actMng.runAction(this.node, action);
        }
    }

    /****************************************坐标转换****************************************/
    /**世界坐标转屏幕坐标 */
    public convertWorldToScreen(pos: cc.Vec3) {
        let p = this.convertWorldToCanvas(pos);
        let cvs = cc.find("Canvas");
        p.x + cvs.width * 0.5;
        p.y += cvs.height * 0.5;
        return p;
    }
    /**世界坐标转换到Canvas节点坐标 */
    public convertWorldToCanvas(pos: cc.Vec3) {
        let p = this.convertWorldToCamera(pos);
        let angle = this.camera.fov;
        let z = p.z;
        let tan = Math.tan(angle * 0.5 * 0.017453);
        let h = Math.abs(z * tan);
        let x = p.x / h;
        let y = p.y / h;
        let cvs = cc.find("Canvas");
        y = cvs.height * 0.5 * y;
        x = cvs.height * 0.5 * x;
        return cc.v2(x, y);
    }
    /**世界坐标转换到相机坐标系 */
    protected convertWorldToCamera(pos: cc.Vec3) {
        let center = this.getCameraPos();
        let eulerAngler = this.getCameraEulerAngles();
        let angle = eulerAngler.y;
        let p1 = cc.v2(pos.x - center.x, pos.z - center.z);
        p1 = this.rotatePos(p1, angle);

        angle = eulerAngler.x;
        let p2 = cc.v2(p1.y, pos.y - center.y);
        p2 = this.rotatePos(p2, angle);

        // return cc.v3(p1.x + center.x, p2.x + center.y, p2.y + center.z);
        return cc.v3(p1.x, p2.y, p2.x);
    }
    /**相机的世界坐标 */
    protected getCameraPos() {
        let angle = this.node.eulerAngles.y;
        let p = this.rotatePos(cc.v2(this.cameraNode.x, this.cameraNode.z), -angle);
        return cc.v3(p.x + this.node.x, this.cameraNode.y + this.node.y, p.y + this.node.z);
    }
    /**相机在世界坐标系下的旋转角度 */
    protected getCameraEulerAngles() {
        return cc.v3(this.cameraNode.eulerAngles.x, this.node.eulerAngles.y, 0);
    }
    /**
     * 旋转坐标点
     * @param p 坐标点
     * @param angle 旋转角度，负数表示顺时针旋转，正数表示逆时针旋转
     */
    protected rotatePos(p: cc.Vec2, angle: number) {
        let radian = angle * 0.017453;
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);
        let x = p.x * cos - p.y * sin;
        let y = p.x * sin + p.y * cos;
        return cc.v2(x, y);
    }

    /**
     * 将节点坐标系下的坐标点转换为其父节点坐标系下的坐标
     * @param node 节点
     * @param pos 坐标点
     */
    public convertToParent(node: cc.Node, pos: cc.Vec3) {
        let p = cc.v3(pos.x * node.scaleX, pos.y * node.scaleY, pos.z * node.scaleZ);
        let p1 = cc.v2(p.x, p.z);
        p1 = this.rotatePos(p1, node.eulerAngles.y);
        let p2 = cc.v2(p1.y, p.y);
        p2 = this.rotatePos(p2, node.eulerAngles.x);
        p.x = p1.x + node.x;
        p.y = p2.y + node.y;
        p.z = p2.x + node.z;
        return p;
    }

    /**
     * 将子节点坐标系下的坐标点转换到根节点坐标系
     * @param root 根节点
     * @param node 子节点
     * @param pos 要转换的坐标点
     */
    public convertToNodePos(root: cc.Node, node: cc.Node, pos: cc.Vec3) {
        let p = cc.v3();
        p.set(pos);
        while (!!node && node.is3DNode && node != root) {
            p = this.convertToParent(node, p);
            node = node.parent;
        }
        return p;
    }

}
