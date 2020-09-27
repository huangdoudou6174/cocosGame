import CommonGameConfig from "../Common/CommonGameConfig";

/**
 * 全局使用的游戏配置，只包含静态数据
 */
export default class GameConfig extends CommonGameConfig {
    /**
     * 游戏规则
     */
    public static GameRule = {
        mapSize: {
            width: 400,
            height: 400,
        }
    };

}
