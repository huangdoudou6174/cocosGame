import RecommendImageManager from "../../Script/Recommend/RecommendImageManager";
import MyAtlasSprite from "../../Script/Recommend/MyAtlasSprite";
import RecommendItem from "./RecommendItem";

const { ccclass, property } = cc._decorator;
/**
 * 推荐游戏节点
 */
@ccclass
export default class RecommendItem_iconBg extends RecommendItem {

    public setData(data: { id: number, logo: string, title: string, p?: cc.Vec2 }) {
        let recommendData = data;
        this.recommendData = recommendData;
        if (undefined !== data.p) {
            this.setPosition(data.p);
        } else {
            this.setPosition(cc.v2(0, 0));
        }
        //图标
        this.setGameIcon(recommendData.logo);
        //todo:背景放在额外的图层
    }

}
