import RecommendContainer from "../../Script/Recommend/RecommendContainer";

const { ccclass, property } = cc._decorator;
/**水平滚动显示的互推列表*/
@ccclass
export default class RecommendBanner_H extends RecommendContainer {

    protected moveLeft: boolean = true;
    protected recommendMoveSpd: number = 50;
    protected updateRecommendH(dt: number) {
        if (this.content.width <= this.content.parent.width) {
            return;
        }

        let x;
        if (this.moveLeft) {
            x = this.content.x - dt * this.recommendMoveSpd;
            if (x + this.content.width <= this.content.parent.width) {
                x = this.content.parent.width - this.content.width;
                this.moveLeft = false;
            }
        } else {
            x = this.content.x + dt * this.recommendMoveSpd;
            if (x >= 0) {
                x = 0;
                this.moveLeft = true;
            }
        }
        this.content.setPosition(x, 0);
    }

    update(dt) {
        this.updateRecommendH(dt);
    }
}
