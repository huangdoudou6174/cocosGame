import CommonEventType from "../Common/CommonEventType";
/**与游戏玩法相关的游戏过程中的事件 */
enum LevelEvent {
    startIndex = 100000,
    levelSceneLoadFinish,       //在首页中作为背景时所需的预制件已全部加载完毕
    resurgence,                 //观看视频成功，复活
    cancelResurgence,           //取消复活

    testWin,                    //测试用，直接判定为关卡胜利
    testLose,                   //测试用，直接判定为关卡失败

}
export class EventType extends CommonEventType {
    static LevelEvent = LevelEvent;
}
