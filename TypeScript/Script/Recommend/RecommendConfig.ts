
const { ccclass, property } = cc._decorator;
/**使用Youzi互推时，管理后台提供的平台渠道 默认微信 */
const PLAT_TYPE_CHANNELID = {
    Test: 1001, //测试也用微信，此处为避免cc.Enum报错，使用1001,，get访问时会自动变为1002
    WeChat: 1002, //微信
    Oppo: 8001,  //oppo小游戏
    TouTiao: 11001 //头条小游戏
};

/**互推配置脚本，挂载在互推根节点上 */
@ccclass
export default class RecommendConfig extends cc.Component {

    public static recommendPlatformType = cc.Enum({
        PC: 0,
        WX: -1,
        TT: -1,
        QQ: -1,
        OPPO: -1,
        VIVO: -1,
        XiaoMi: -1,
        LeYou: -1,
        DYB_QQ: -1,
        Blue_Android: -1,
        Blue_IOS: -1,
        Youzi: -1,
    });

    @property({
        type: RecommendConfig.recommendPlatformType,
        tooltip: "互推类型",
    })
    public type: number = RecommendConfig.recommendPlatformType.PC;
    @property({
        tooltip: "使用Youzi互推时，渠道提供的appid 如果是微信渠道 填写微信后台提供的appid。"
    })
    public Youzi_Appid: string = "";
    @property({
        tooltip: "使用Youzi互推时，中心化资源版本 中心化提供的资源版本号 向中心化对接组咨询 默认'1.00.00'。"
    })
    public Youzi_ResVersion: string = "1.00.00";
    public static YouziChannelType = cc.Enum(PLAT_TYPE_CHANNELID);
    @property({
        type: RecommendConfig.YouziChannelType,
        tooltip: "使用Youzi互推时，管理后台提供的平台渠道 默认微信",
        visible: true,
    })
    protected _Youzi_ChannelId: number = RecommendConfig.YouziChannelType.WeChat;
    public get Youzi_ChannelId() {
        if (this._Youzi_ChannelId == PLAT_TYPE_CHANNELID.Test) {
            return PLAT_TYPE_CHANNELID.WeChat;
        } else {
            return this._Youzi_ChannelId;
        }
    }


}

