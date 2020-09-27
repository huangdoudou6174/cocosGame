import yyComponent from "../../Script/Common/yyComponent";
import RecommendDataManager from "../../Script/Recommend/RecommendDataManager";
import { EventType } from "../../Script/GameSpecial/GameEventType";
import RecommendImageManager from "../../Script/Recommend/RecommendImageManager";
import MyAtlasSprite from "../../Script/Recommend/MyAtlasSprite";

const { ccclass, property } = cc._decorator;
/**
 * 推荐游戏节点
 */
@ccclass
export default class RecommendItem extends yyComponent {
    @property(cc.Node)
    protected gameIcon: cc.Node = null;     //游戏图标
    @property(cc.Label)
    protected gameName: cc.Label = null;      //游戏名称

    protected recommendData;    //互推数据

    public init(data?) {
        this.node.setPosition(0, 0);
        this.node.setScale(1, 1);
        this.onEvents();
        if (undefined !== data) {
            this.setData(data);
        }
    }
    protected onEvents() {
        this.node.on("touchend", this.onClick, this);
    }
    public reset() {
        this.node.setPosition(0, 0);
        this.node.setScale(1, 1);
        let wg = this.node.getComponent(cc.Widget);
        if (!!wg) {
            wg.isAbsoluteBottom = false;
            wg.isAbsoluteLeft = false;
            wg.isAbsoluteRight = false;
            wg.isAbsoluteTop = false;
        }
    }
    public reuse(data) {
        this.reset();
        this.setData(data);
    }
    public unuse() {

    }

    protected setGameIcon(gameIcon: string | string[]) {
        //本地图片：
        // this.gameIcon.getComponent(cc.Sprite).spriteFrame = RecommendDataManager.getGameIcon(gameIcon);

        let url;
        if (Array.isArray(gameIcon)) {
            url = gameIcon[0];
        } else {
            url = gameIcon;
        }
        //远程地址图片
        RecommendImageManager.load(url, (data) => {
            data.width = this.gameIcon.width;
            data.height = this.gameIcon.height;
            this.gameIcon.getComponent(MyAtlasSprite).setAtlasData(data);
        });
    }
    protected setGameName(n: string) {
        if (!!this.gameName) {
            this.gameName.string = n;
        }
    }

    //点击节点
    protected onClick() {
        this.emit(EventType.RecommendEvent.clickRecommendItem, this.recommendData);
    }
}
