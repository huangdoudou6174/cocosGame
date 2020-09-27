import GlobalPool from "../../Script/Common/GlobalPool";
import Loader from "../../Script/Common/Loader";
import yyComponent from "../../Script/Common/yyComponent";

const { ccclass, property } = cc._decorator;
/**商城的商品展示台 */
@ccclass
export default class ShopStage extends yyComponent {

    public init() {
        this.initComponents();
        this.initDisplayStage();
        this.initSprite();
    }
    public reset() {
        this.resetDisplayStage();
        this.resetSprite();
    }

    //2D展示方式：
    /**展示商品详情的图片精灵 */
    @property(cc.Sprite)
    protected displaySprite: cc.Sprite = null;
    protected initSprite() {
        if (!this.displaySprite) return;
        this.displaySprite.spriteFrame = null;
    }
    protected resetSprite() {
        if (!this.displaySprite) return;
        this.displaySprite.spriteFrame = null;
    }
    protected showGoodsImg(img: string) {
        if (!this.displaySprite) return;
        Loader.loadBundleRes("Skin", img, (res) => {
            if (this.displaySprite.isValid) {
                this.displaySprite.spriteFrame = res;
            }
        }, cc.SpriteFrame, false);
    }

    //3D展示方式：
    /**商品展示台 */
    @property(cc.Node)
    protected displayStage: cc.Node = null;
    /**展示3D模型节点的父节点 */
    @property(cc.Node)
    protected modelStage: cc.Node = null;
    /**商品展示台相机 */
    @property(cc.Camera)
    protected camera: cc.Camera = null;
    /**当前用来展示的3D模型节点 */
    protected curItemModel: cc.Node = null;
    /**3D模型动作 */
    protected modelTween: cc.Tween = null;
    protected initDisplayStage() {
        if (!this.displayStage) return;
        let wg = this.displayStage.getComponent(cc.Widget);
        if (!!wg) {
            wg.updateAlignment();
        }
        let y = this.displayStage.y;
        let rate = y / cc.find("Canvas").height;
        this.camera.rect = cc.rect(0, rate, 1, 1);
    }
    protected resetDisplayStage() {
        if (!this.displayStage) return;
        if (!!this.modelTween) {
            this.modelTween.stop();
            this.modelTween = null;
        }
        if (!!this.curItemModel) {
            GlobalPool.put(this.curItemModel);
            this.curItemModel = null;
        }
    }

    /**展示商品详情 */
    public showItemData(data) {
        //图片展示方式：
        this.showGoodsImg(data.displayUrl);
        //3D模型展示方式：
        // this.showGoodsModel(data.model, data.skin);

    }

    /**3D模型展示 */
    protected showGoodsModel(model: string, skin: string) {
        if (!this.displayStage) return;
        let angle = cc.v3();
        if (!!this.modelTween) {
            this.modelTween.stop();
            this.modelTween = null;
        }
        if (!!this.curItemModel) {
            angle.set(this.curItemModel.eulerAngles);
            GlobalPool.put(this.curItemModel);
            this.curItemModel = null;
        }
        this.curItemModel = GlobalPool.get(model);

        let url = skin;
        Loader.loadBundleRes("Skin", url, (res) => {
            if (!this.node.active || !this.node.isValid) return;
            let mesh = this.curItemModel.getComponentInChildren(cc.MeshRenderer);
            let sf;
            if (res instanceof cc.SpriteFrame) {
                sf = res;
            } else if (res instanceof cc.Texture2D) {
                sf = new cc.SpriteFrame(res);
            }
            mesh.getMaterial(0).setProperty("diffuseTexture", sf);
        }, false);

        this.modelStage.addChild(this.curItemModel);
        this.curItemModel.setPosition(cc.v3(0, 0, 0));
        this.curItemModel.eulerAngles = angle;
        this.modelTween = cc.tween(this.curItemModel).repeatForever(cc.tween(this.curItemModel).by(2, { eulerAngles: cc.v3(0, 90, 0) })).union().start();
    }

}
