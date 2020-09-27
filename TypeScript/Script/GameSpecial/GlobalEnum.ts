import { CommonEnum } from "../Common/CommonEnum";

/**通过全局对象池管理的预制件名称与对应的脚本名称 */
enum LevelPrefab {
    goldIcon = "GoldIcon",

    player = "Player",
    car1 = "Car1",

    standRole = "StandRole",
    walkRole = "WalkRole",
    toiletDoor = "ToiletDoor",

    shi = "Shi",
    shiParticle = "ShiParticle",
}
/**视频广告位名称 */
enum VideoName {
    /**胜利多倍领取 */
    getGoldWin,
    /**失败多倍领取 */
    getGoldLose,
    /**观看视频获取金币 */
    getGold,
    /**试用皮肤 */
    trySkin,
    /**复活 */
    fuHuo,
    /**试用剑神模式 */
    tryJianShen,
    /**道具-磁铁 */
    ciTie,
    /**道具-护盾 */
    huDun,
    /**道具-暴走 */
    baoZou,

}
export class GlobalEnum extends CommonEnum {
    static LevelPrefab = LevelPrefab;
    static VideoName = VideoName;
}
