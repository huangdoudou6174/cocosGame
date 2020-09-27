
const { ccclass, property } = cc._decorator;

@ccclass
export default class MyAtlasSprite extends cc.Sprite {
    constructor() {
        super();
        this._assembler = new MyAtlasAssembler();
        this._assembler.init(this);
    }

    public setAtlasData(data: { spriteFrame: cc.SpriteFrame, texture: cc.Texture2D, uv, width: number, height: number }) {
        this.trim = false;
        this.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        if (undefined !== data.width) {
            this.node.width = data.width;
        } else {

            this.node.width = data.uv.width;
        }
        if (undefined !== data.height) {
            this.node.height = data.height;
        } else {
            this.node.height = data.uv.height;
        }
        this.spriteFrame = data.uv.originalSpriteFrame;
        // this.spriteFrame = data.spriteFrame;
        // this._assembler.setAtlasUV(data.uv);
    }
}

export class MyAtlasAssembler extends cc.Assembler {
    protected _renderData;
    floatsPerVert = 5;

    verticesCount = 4;
    indicesCount = 6;

    uvOffset = 2;
    colorOffset = 4;
    _local;

    constructor() {
        super();
        this._renderData = new cc.RenderData();
        this._renderData.init(this);

        this.initData();
        this.initLocal();
    }

    get verticesFloats() {
        return this.verticesCount * this.floatsPerVert;
    }

    initData() {
        let data = this._renderData;
        data.createQuadData(0, this.verticesFloats, this.indicesCount);
    }
    initLocal() {
        this._local = [0, 0, 0, 0];
    }

    updateColor(comp, color) {
        let uintVerts = this._renderData.uintVDatas[0];
        if (!uintVerts) return;
        color = color != null ? color : comp.node.color._val;
        let floatsPerVert = this.floatsPerVert;
        let colorOffset = this.colorOffset;
        for (let i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
            uintVerts[i] = color;
        }
    }

    getBuffer(renderer) {
        return cc.renderer._handle._meshBuffer;
    }

    updateWorldVerts(comp) {
        let local = this._local;
        let verts = this._renderData.vDatas[0];

        let matrix = this._renderComp.node._worldMatrix;
        let matrixm = matrix.m,
            a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5],
            tx = matrixm[12], ty = matrixm[13];

        let vl = local[0], vr = local[2],
            vb = local[1], vt = local[3];

        let justTranslate = a === 1 && b === 0 && c === 0 && d === 1;

        if (justTranslate) {
            // left bottom
            verts[0] = vl + tx;
            verts[1] = vb + ty;
            // right bottom
            verts[5] = vr + tx;
            verts[6] = vb + ty;
            // left top
            verts[10] = vl + tx;
            verts[11] = vt + ty;
            // right top
            verts[15] = vr + tx;
            verts[16] = vt + ty;
        } else {
            let al = a * vl, ar = a * vr,
                bl = b * vl, br = b * vr,
                cb = c * vb, ct = c * vt,
                db = d * vb, dt = d * vt;

            // left bottom
            verts[0] = al + cb + tx;
            verts[1] = bl + db + ty;
            // right bottom
            verts[5] = ar + cb + tx;
            verts[6] = br + db + ty;
            // left top
            verts[10] = al + ct + tx;
            verts[11] = bl + dt + ty;
            // right top
            verts[15] = ar + ct + tx;
            verts[16] = br + dt + ty;
        }
    }

    fillBuffers(comp, renderer) {
        if (renderer.worldMatDirty) {
            this.updateWorldVerts(comp);
        }

        let renderData = this._renderData;
        let vData = renderData.vDatas[0];
        let iData = renderData.iDatas[0];

        let buffer = this.getBuffer(renderer);
        let offsetInfo = buffer.request(this.verticesCount, this.indicesCount);

        // buffer data may be realloc, need get reference after request.

        // fill vertices
        let vertexOffset = offsetInfo.byteOffset >> 2,
            vbuf = buffer._vData;

        if (vData.length + vertexOffset > vbuf.length) {
            vbuf.set(vData.subarray(0, vbuf.length - vertexOffset), vertexOffset);
        } else {
            vbuf.set(vData, vertexOffset);
        }

        // fill indices
        let ibuf = buffer._iData,
            indiceOffset = offsetInfo.indiceOffset,
            vertexId = offsetInfo.vertexOffset;
        for (let i = 0, l = iData.length; i < l; i++) {
            ibuf[indiceOffset++] = vertexId + iData[i];
        }
    }


    updateVerts() {
        let node = this._renderComp.node,
            cw = node.width, ch = node.height,
            appx = node.anchorX * cw, appy = node.anchorY * ch,
            l, b, r, t;

        l = -appx;
        b = -appy;
        r = cw - appx;
        t = ch - appy;

        let local = this._local;
        local[0] = l;
        local[1] = b;
        local[2] = r;
        local[3] = t;
        this.updateWorldVerts(this._renderComp);
    }

    public setAtlasUV(uv) {
        this.updateVerts();
        let vData = this._renderData.vDatas[0];
        let floatsPerVert = this.floatsPerVert;
        let offset = this.uvOffset;
        vData[offset] = uv.left;
        vData[offset + 1] = uv.bottom;

        offset += floatsPerVert;
        vData[offset] = uv.right;
        vData[offset + 1] = uv.bottom;

        offset += floatsPerVert;
        vData[offset] = uv.left;
        vData[offset + 1] = uv.top;

        offset += floatsPerVert;
        vData[offset] = uv.right;
        vData[offset + 1] = uv.top;
    }
}
// cc.Assembler.register(MyAtlasSprite, MyAtlasAssembler);
