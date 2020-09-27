
const space = 2;
const _textureSize = 2048;

export default class MyAtlas {

    protected _spriteFrame: cc.SpriteFrame;
    protected _texture: cc.Texture2D;
    protected _x;
    protected _y;
    protected _nexty;
    protected _width;
    protected _height;

    protected uvMap: {
        [url: string]: {
            left: number,
            right: number,
            top: number,
            bottom: number,
            width: number,
            height: number,
            originalSpriteFrame: cc.SpriteFrame,
        }
    };

    public constructor(width?: number, height?: number) {
        if (undefined === height) {
            height = _textureSize;
        }
        if (undefined === width) {
            width = _textureSize;
        }
        let texture = new cc.RenderTexture();
        texture.initWithSize(width, height);
        texture.update();

        this._texture = texture;
        this._spriteFrame = new cc.SpriteFrame(this._texture);

        this._x = space;
        this._y = space;
        this._nexty = space;

        this._width = width;
        this._height = height;

        this.uvMap = {};
    }
    public insertSpriteFrame(spriteFrame: cc.SpriteFrame, name?: string) {
        if (undefined === name) {
            name = spriteFrame._uuid;
        }
        if (!!this.uvMap[name]) {
            return this.uvMap[name];
        }
        let texture = spriteFrame._texture;
        let width = texture.width, height = texture.height;
        if ((this._x + width + space) > this._width) {
            this._x = space;
            this._y = this._nexty;
        }
        if ((this._y + height + space) > this._nexty) {
            this._nexty = this._y + height + space;
        }
        if (this._nexty > this._height) {
            console.warn("自定义图集已满");
            return null;
        }
        this._texture.drawTextureAt(texture, this._x, this._y);
        this._texture.update();
        this.uvMap[name] = {
            left: (this._x) / this._width,
            right: (this._x + width) / this._width,
            top: this._y / this._height,
            bottom: (this._y + height) / this._height,
            width: width,
            height: height,
            originalSpriteFrame: spriteFrame,
        };
        this._x += width + space;
        return this.uvMap[name];
    }
    public getUV(name: string) {
        if (!!this.uvMap[name]) {
            return this.uvMap[name];
        } else {
            // console.warn("自定义图集中不存在指定图集：", name);
            return null;
        }
    }
    public getTexture() {
        return this._texture;
    }
    public getSpriteFrame() {
        return this._spriteFrame;
    }

}