
/**游戏流程相关的事件,从 1000 开始 */
enum DirectorEvent {
    startIndex = 1000,
    enterLobby,             //进入游戏大厅(首页)
    hideGameLobby,          //隐藏首页
    startGame,              //开始游戏（点击首页按钮“开始游戏”）
    startLevel,             //开始关卡
    enterChosedLevel,       //进入选择的关卡
    exitLevel,              //退出关卡
    playNextLevel,          //继续下一关
    replayCurLevel,         //重玩当前关
    playerWin,              //关卡胜利
    playerLose,             //关卡失败
    pauseLevel,             //暂停游戏
    resumeLevel,            //恢复游戏
    matchPlayerFinish,      //玩家匹配完成
    chooseTrySkinFinish,    //选择试用皮肤结束
    enterFightScene,        //战斗过渡页动画完成后，进入战斗场景
    enterFightLoading,      //直接进入战斗过渡页面（用于组装完成后）
}
/**资源加载相关事件，从 2000 开始 */
enum LoadAssetEvent {
    startIndex = 2000,
    showProgress,           //显示资源加载进度
    hideProgress,           //隐藏资源加载进度
    updateProgress,         //更新资源加载进度
}
/**游戏数据相关事件，从 3000 开始 */
enum PlayerDataEvent {
    startIndex = 3000,
    dataLoaded,             //服务端数据拉取成功
    updatePlayerData,       //修改玩家数据
    playerDataChanged,      //玩家数据有变动
    trySkinEnd,             //皮肤试用结束
}
/**SDK相关事件 */
enum SDKEvent {
    startIndex = 4000,
    inited,                 //初始化并从服务端获取数据完成
    showMsg,
    showVideo,          //激励视频
    showBanner,
    hideBanner,
    showBannerFinish,       //banner显示成功
    showInsertAd,           //插屏广告
    startRecord,            //头条：开始录屏
    pauseRecord,            //头条：暂停录屏
    resumeRecord,           //头条：继续录屏
    stopRecord,             //头条：结束录屏
    recordSaved,            //头条：录制视频保存成功
    recordError,            //头条：录屏错误
    shareRecord,            //头条：分享录屏
    bannerResize,           //底部广告栏尺寸更新，传递参数：广告栏顶部与屏幕底部的距离
    navigateToMiniProgram,  //跳转到其他小游戏
    vibrateShort,           //短震动
    vibrateLong,            //长震动
    hide,                   //游戏进入后台
    show,                   //后台回到游戏
    showInsertByPauseLevel, //暂停游戏，显示插屏(乐游SDK将对其单独处理)
    triggerGC,              //垃圾回收
    showNativeAd,           //显示原生广告，需要传入父节点及其他参数
    hideNativeAd,
    hideAllNativeAd,
    quickShowNativeAd,
    quickHideNativeAd,

    //安卓/苹果端原生包SDK事件：
    callJSVideoSuccess,     //原生回调：视频观看成功
    callJSVideoFail,        //原生回调：视频观看未完成
    callJSVideoError,       //原生回调：视频加载错误
    callJSFullVideoSuccess, //原生回调：全屏视频观看成功
    callJSFullVideoFail,    //原生回调：全屏视频观看未完成
    callJSFullVideoError,   //原生回调：全屏视频加载错误

    //QQ平台：
    showAppBox,             //盒子广告
    showBlockAd,            //积木广告
    subscribeMsg,           //订阅
    addColorSign,           //添加彩签
}
/**UI相关事件 */
enum UIEvent {
    startIndex = 5000,
    playGoldAnim,           //得到金币动画
    goldAnimPlayFinish,     //金币动画播放完毕
    showTip,                //显示提示信息
    showTouchMask,          //显示触摸遮罩，屏蔽玩家触摸操作
    hideTouchMask,          //隐藏触摸遮罩

    enter,                  //请求进入UI，传递参数UI类型
    entered,                //已进入UI
    exit,                   //请求退出UI
    exited,                 //已退出UI

    touchBannerFinish,      //误触页操作完成
}
/**音效事件 */
enum AudioEvent {
    startIndex = 6000,
    playBGM,
    playEffect,
    playClickBtn,
    stopBGM,
    changeConfig,
    pause,
    resume,
}
/**阿拉丁数据统计事件 */
enum ALDEvent {
    startIndex = 7000,
    levelStart,         //关卡开始
    levelWin,           //关卡成功
    levelLose,          //关卡失败
    levelExit,          //中途退出
}
/**互推相关事件 */
enum RecommendEvent {
    startIndex = 8000,
    assetLoadFinish,       //互推配置表加载完成
    clickRecommendItem,     //点击了其他游戏icon
    clickBtnRecommend_TT,   //点击头条平台的更多游戏按钮
    hideRecommend,          //隐藏互推内容

    showLittlePage,         //显示小全导页
    showBigPage,            //显示大全导页
    closeLittlePage,        //关闭了小全屏页
    closeBigPage,           //关闭了大全屏页


    openDrawer,             //打开抽屉
    drawerStartOpen,        //抽屉开始打开动画
    drawerOpened,           //抽屉已打开

    closeDrawer,            //关闭抽屉
    drawerStartClose,       //抽屉开始关闭动画
    drawerClosed,           //抽屉已关闭
}
/**玩家资产事件 */
enum AssetEvent {
    startIndex = 9000,
    powerChanged,       //体力值变化
    powerUnEnough,      //体力不足提示
    consumePower,       //请求消耗体力执行某事
    getPower,           //得到体力奖励
}
/**后台开关事件，从10000开始 */
enum AdvertSwitchEvent {
    startIndex = 10000,

    loadConfigSuccess,  //后台配置拉取成功
    changeScene,        //场景切换（显示全屏互推节点并暂停关卡）
    closeFullRecommend, //关闭全屏互推节点，继续关卡运行
    onBtnFadeExit,      //点击假的退出按钮，显示全屏互推节点并暂停关卡
}
/**触摸控制器事件，适用于只有一个节点接收触摸操作的场景，从11000开始 */
enum CtrlEvent {
    startIndex = 11000,
    ctrlStart,       //关卡开始，开始关卡操作
    ctrlEnd,         //关卡结束，停止关卡操作

    touchStart,         //按下
    touchMove,          //移动
    touchEnd,           //松开
    touchStay,          //持续按住
}
/**商城相关事件，从12000开始 */
enum ShopEvent {
    startIndex = 12000,

    chooseItem,         //选中了商品项

    changeDisplayItem,  //
}
/**乐游SDK专属事件，从13000开始 */
enum LeYouRecommend {
    startIndex = 13000,
    /**底部猜你喜欢互推 */
    showMoreGameByBanner,
    /**单个图标的互推 */
    showMoreGameByIcon,
    /**更多游戏互推 */
    showMoreGame,
    /**侧边栏互推 */
    showMoreGameSide,
    /**中间水平滚动的互推 */
    showMoreGameMiddle,
}
/**数据统计事件，从14000开始 */
enum TongJi {
    startIndex = 14000,
    /**用户事件漏斗（进区服事件） */
    appOnce,
    /**分享出日志 */
    sharedOut,
    /**通过分享进入 */
    sharedIn,
    /**视频广告事件 */
    video,
    /**升级 */
    levelUp,
    /**完成任务 */
    task,
    /**自定义行为 */
    action,
    /**充值 */
    pay,
    /**money日志 */
    money,
    /**道具 */
    item,
    /**闯关 */
    battle,
    /**装备日志 */
    equip,
    /**装备升级 */
    equipLevel,
    /**装备升阶 */
    equipDegree,
    /**装备玩法 */
    equipPlayWay,
    /**自定义事件 */
    event,
    /**清除云存储数据 */
    clear,
    /**广告错误日志 */
    error,
    /**解锁皮肤事件 */
    unlockSkin,
}

/**柚子互推专属事件，从15000开始 */
enum YouZiRecommend {
    startIndex = 15000,
    /**显示全屏落地推广页 */
    showFullScreenIcon,
    /**显示游戏合集 */
    showYouziGameCollectionPage,
}
/**
 * 适用于框架的通用事件类型
 * 
 * 在子类中添加游戏专属的事件时， startIndex 从 100000 开始
 */
export default class CommonEventType {
    static DirectorEvent = DirectorEvent;
    static LoadAssetEvent = LoadAssetEvent;
    static PlayerDataEvent = PlayerDataEvent;
    static SDKEvent = SDKEvent;
    static UIEvent = UIEvent;
    static AudioEvent = AudioEvent;
    static ALDEvent = ALDEvent;
    static RecommendEvent = RecommendEvent;
    static AssetEvent = AssetEvent;
    static AdvertSwitchEvent = AdvertSwitchEvent;
    static CtrlEvent = CtrlEvent;
    static ShopEvent = ShopEvent;
    static LeYouRecommend = LeYouRecommend;
    static TongJi = TongJi;
    static YouZiRecommend = YouZiRecommend;
}
