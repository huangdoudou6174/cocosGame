
//玩家数据示例
export default class PlayerDataTemplate {
    private constructor() { }
    public static getData(): any {
        return {
            //第一次登陆时间
            fristLoginTimer: 0,
            //游戏存档数据
            gameData: {
                curLevel: 1,
                //玩家资源
                asset: {
                    gold: 0,        //金币
                    power: 10,      //体力
                },
                //主角皮肤
                PlayerSkin: {
                    cur: 0,         //当前使用的皮肤
                    try: -1,        //当前试用的皮肤，-1表示无试用皮肤
                    owned: [0],     //已拥有的皮肤
                },
            },

        };
    }
}
/**用户信息 */
export class UserInfo {
    public static fristLoginTimer = 0;
    public static needuserinfo = 0;
    protected static _openid = "";
    public static get openid() {
        if (!this._openid) {
            this._openid = cc.sys.localStorage.getItem("openid");
        }
        return this._openid;
    }
    public static set openid(v) {
        this._openid = v;
        cc.sys.localStorage.getItem("openid");
    }

    public static sessid = "";
    public static userid = "";
}