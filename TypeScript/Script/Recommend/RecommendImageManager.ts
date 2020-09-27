import MyAtlas from "./MyAtlas";

/**
 * 互推模块纹理管理器，将大量的小图存入同一张大的纹理中,
 * 显示图片的节点需挂载 MyAtlasSprite 取代 cc.Sprite，并调用其 setAtlasData 方法显示对应的图片
 */
export default class RecommendImageManager {

    protected static sfMap: { [url: string]: cc.SpriteFrame } = {};
    protected static _atlas: MyAtlas;
    protected static get atlas() {
        if (!this._atlas) {
            this._atlas = new MyAtlas();
        }
        return this._atlas;
    }

    /**
     * 从远程地址加载图片并添加到图集中
     * @param url 
     * @param cb 给挂载了 MyAtlasSprite 组件的节点设置要显示的图片，例如：(data) => { node.getComponent(MyAtlasSprite).setAtlasData(data); }
     */
    public static load(url: string, cb?: Function) {
        let sf = this.get(url);
        if (!!sf) {
            if (!!cb) cb(sf);
            return;
        }
        cc.assetManager.loadRemote(url, (err, res) => {
            if (!!err) {
                console.log("互推远程图片下载错误：", err);
                return;
            }
            let sf = new cc.SpriteFrame(res);
            let uv = this.atlas.insertSpriteFrame(sf, url);
            if (!!cb) cb({
                spriteFrame: this.atlas.getSpriteFrame(),
                texture: this.atlas.getTexture(),
                uv: uv,
            });
        });
    }

    /**
     * 从图集中获取小图信息
     * @param url 
     */
    public static get(url: string) {
        let uv = this.atlas.getUV(url);
        if (!uv) return null;
        return {
            spriteFrame: this.atlas.getSpriteFrame(),
            texture: this.atlas.getTexture(),
            uv: this.atlas.getUV(url),
        };
    }
    /**
     * 将已有的图片添加到图集中
     * @param sf    
     * @param url 图片名称
     * @param cb 
     */
    public static add(sf: cc.SpriteFrame, url?: string, cb?: Function) {
        let name = url;
        if (undefined === url || typeof url != "string") {
            name = sf._uuid;
        }
        let uv = this.atlas.insertSpriteFrame(sf, name);
        if (typeof url === "function") {
            cb = url;
        }
        if (!!cb) cb({
            spriteFrame: this.atlas.getSpriteFrame(),
            texture: this.atlas.getTexture(),
            uv: uv,
        });
    }
}
