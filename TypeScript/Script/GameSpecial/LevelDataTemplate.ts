import { GlobalEnum } from "./GlobalEnum";

//关卡数据示例
export default class LevelDataTemplate {
    private constructor() { }
    public static getData(): any {
        return {
            1: {
                id: 1,
                lv: 1,
                time: 10,                   //关卡时长，单位：秒
                playerData: {
                    p: cc.v3(),
                    e: cc.v3(0, 180, 0),
                },
                //其他数据

                //场景中的全部碰撞体
                collers: [
                    {
                        n: "WalkRole",      //对象名称，与预制件名称对应
                        p: cc.v3(3, 0, 3),  //坐标
                        e: cc.v3(),         //角度
                    }
                ],
            }
        };
    }
}
