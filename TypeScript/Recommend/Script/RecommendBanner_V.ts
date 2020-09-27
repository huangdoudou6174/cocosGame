import RecommendContainer from "../../Script/Recommend/RecommendContainer";

const { ccclass, property } = cc._decorator;
/**垂直滚动显示的互推列表*/
@ccclass
export default class RecommendBanner_V extends RecommendContainer {

    protected moveUp: boolean = true;
    protected recommendMoveSpd: number = 50;
    protected updateRecommendV(dt: number) {
        if (this.content.height <= this.content.parent.height) {
            return;
        }

        let y;
        if (this.moveUp) {
            y = this.content.y + dt * this.recommendMoveSpd;
            if (y - this.content.height + this.content.parent.height >= 0) {
                y = this.content.height - this.content.parent.height;
                this.moveUp = false;
            }
        } else {
            y = this.content.y - dt * this.recommendMoveSpd;
            if (y <= 0) {
                y = 0;
                this.moveUp = true;
            }
        }
        this.content.setPosition(0, y);
    }

    update(dt) {
        this.updateRecommendV(dt);
    }
}
