import SDK from "./SDK";
import GamePlatform from "../GamePlatform";
import EventManager from "../../Common/EventManager";
import { EventType } from "../../GameSpecial/GameEventType";

export default class OPPOSDK extends SDK {
    private apiName: string = 'qg';

    /**
     * 初始化
     */
    public init() {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log("系统信息：");
        console.log(JSON.stringify(this.systemInfo));
        // this.setSystemInfo(this.systemInfo.platformVersionName, this.systemInfo.system)
        this.enterTime = Date.now();
        if (this.enterTime.toString().length === 10) {
            this.enterTime *= 1000;
        }
        //初始化信息
        let self = this;
        // this.api.setLoadingProgress({
        //     progress: 0
        // });
        this.api.setEnableDebug({
            enableDebug: false, // true 为打开，false 为关闭
            // enableDebug: true, // true 为打开，false 为关闭
            success: function () {
                console.log('oppo信息', JSON.stringify(self.systemInfo))
            },
            complete: function () {
            },
            fail: function () {
            }
        });
        // 初始化广告。
        // if (GamePlatform.instance.Config.video || GamePlatform.instance.Config.videoAdUnitId[0] != '') {
        //     this.api.initAdService({
        //         appId: GamePlatform.instance.Config.videoAdUnitId[0],
        //         isDebug: true,
        //         success: function (res) {
        //             console.log("初始化广告success");
        //         },
        //         fail: function (res) {
        //             console.log("初始化广告fail:" + res.code + res.msg);
        //         },
        //         complete: function (res) {
        //             console.log("complete");
        //         }
        //     })
        // }
        this.reportMonitor();

        //预先拉取原生广告数据
        setTimeout(() => {
            this.preCreateNativeAd();
        }, 11000);
    }

    //video
    public showVideoAd(videoName?: any) {
        console.log("展示激励视频");
        if (this.systemInfo.platformVersion < 1040) {
            this.onVideoFail('视频广告播放失败：平台版本过低');
            return;
        }
        let id = this.getVideoAdUnitId(videoName);
        if (!id) {
            this.onVideoFail("获取视频id失败");
            return;
        }

        if (this.videoAd) {
            this.videoAd.destroy();
        }
        this.videoAd = this.api.createRewardedVideoAd({ posId: id });
        this.videoAd.load();
        this.videoAd.onLoad(() => {
            this.videoAd.show();
            this.onVideoShow();
        });
        this.videoAd.onClose((res) => {
            if (res.isEnded) {
                this.onVideoSuccess();
            } else {
                this.onVideoHide();
                this.onVideoQuit();
            }
        });
        this.videoAd.onError((err) => {
            this.onVideoFail(err);
        });
    }

    //banner
    /**oppo文档说明：创建 Banner 广告组件，如果已经创建过 Banner 广告组件，则会使用已创建的广告组件对象 */
    protected bannerAd: any;
    public showBanner() {
        console.log("展示banner");
        if (this.insertAdRecord.isShowing) {
            console.log("插屏广告正在显示，无法同时显示banner");
            this.removeBanner();
            return;
        }
        if (!!this.bannerShowing) {
            console.log("banner尚未隐藏，无需再次显示");
            return;
        }
        let t = Date.now();
        if (t.toString().length === 10) {
            t *= 1000;
        }
        if (Date.now() - this.enterTime < 10000) {
            console.log("为避免闪屏页出现banner，进入游戏10秒后才可以显示banner");
            return;
        }
        if (this.bannerRecord.dayHideCount >= 5) {
            console.log("用户当天已主动关闭banner达到" + this.bannerRecord.dayHideCount + "次，不再显示banner");
            return;
        }
        if (this.systemInfo.platformVersion < '1031') {
            console.log('平台版本过低');
            return;
        }
        let id = this.getBannerId();
        if (!!id) this.createBanner(id);
    }
    protected createBanner(id: string) {
        let banner = this.api.createBannerAd({ posId: id });
        if (!this.bannerAd) {
            this.bannerAd = banner;
            this.bannerAd.onShow(this.onBannerShow.bind(this));
            this.bannerAd.onError(this.onBannerErr.bind(this));
            this.bannerAd.onHide(this.onBannerHide.bind(this));
        }
        this.bannerAd.show();
        this.bannerShowing = true;
    }
    public removeBanner() {
        if (this.bannerAd) {
            this.bannerAd.hide();
            //非玩家点击关闭按钮，还原关闭次数的记录
            this.bannerRecord.dayHideCount -= 1;
            this.bannerRecord.gameHideCount -= 1;
        }
        this.bannerShowing = false;
    }

    //插屏广告
    // protected insertAd: any;
    public showInterstitialAd(banner: boolean = false) {
        this.useBannerInsteadInsert = banner;
        //OPPO已取消插屏广告
        this.showBannerInsteadInsert();
        return;
        console.log("展示插屏");
        if (this.systemInfo.platformVersion < 1051) {
            console.log('平台版本过低');
            this.showBannerInsteadInsert();
            return;
        }
        if (this.insertAdRecord.getShowSpaceTime() < 60) {
            console.log("两次插屏展示时间小于60秒");
            this.showBannerInsteadInsert();
            return;
        }
        if (this.insertAdRecord.dayShowCount >= 8) {
            console.log("插屏广告单用户展示一天不能超过8次");
            this.showBannerInsteadInsert();
            return;
        }
        let id = this.getInsertAdUnitId();
        if (!id) return;
        this.createInsertAd(id);
    }
    protected createInsertAd(id: string) {
        // if (!!this.insertAd) {
        //     this.insertAd.show();
        //     this.onInsertShow();
        //     return;
        // }
        let ad = this.api.createInsertAd({ posId: id });//旧版API
        // let ad = this.api.createInterstitialAd({ adUnitId: id });//新版API，会报错导致游戏卡死……
        if (!ad) {
            this.showBannerInsteadInsert();
            return;
        }
        // this.insertAd = ad;
        ad.onLoad(() => {
            ad.show();
            this.removeBanner();
            this.onInsertShow();
        });
        ad.onClose(this.onInsertHide.bind(this));
        ad.onError((err) => {
            this.onInsertErr(err);
            this.showBannerInsteadInsert();
        });
        ad.load();
        return ad;
    }

    /**
     * 短震动
     */
    public vibrateShort() {
        if (GamePlatform.instance.Config.vibrate) {
            this.api.vibrateShort({});
        }
    }

    /**
     * 长震动
     */
    public vibrateLong() {
        if (GamePlatform.instance.Config.vibrate) {
            this.api.vibrateLong({});
        }
    }

    /**
     * 无激励分享&&带参分享
     */
    public shareAppMessage(query: string = '') {

    }

    /**
     * 激励分享&&带参分享
     */
    public shareToAnyOne(success: Function, fail?: Function, query: string = '') {

    }

    /**
     * 消息提示
     */
    public showMessage(msg: string, icon: string = 'none') {
        // this.api.showToast({
        //     title: msg,
        //     duration: 2000,
        //     icon: icon,
        //     success: (res) => { }
        // });
        EventManager.emit(EventType.UIEvent.showTip, msg);
    }

    public navigateToMiniProgram(data: any) {
        if (this.systemInfo.platformVersion < '1050') {
            console.log('平台版本过低');
            return;
        }
        this.api.navigateToMiniGame({
            pkgName: data.gameId,
        })
    }

    /**
     * 游戏运行中上报数据，主要监控游戏崩溃等异常, 目前只支持进入到游戏主界面时上报数据。
     * 注意：数据上报接口为平台必须接入的能力。
     * 接入后测试环境会默认弹出 "reportMonitor: 0"，正式环境下不会；
     * 并且需要在游戏加载的生命周期调用，只能调一次。
     */
    public reportMonitor() {
        if (this.systemInfo.platformVersion < '1060') {
            console.log('平台版本过低');
            return;
        }
        this.api.reportMonitor('game_scene', 0);
    }

    /*******************************************原生广告*******************************************/
    /**广告类型对应的广告信息 */
    protected nativeData: { [type: number]: NativeData } = {};
    public showNativeAd(data: {
        parent: cc.Node,    //广告节点要添加到的父节点
        type: number,       //广告类型枚举值
        widget: any,        //广告节点相对父节点的适配数据
    }) {
        let t = Date.now();
        if (t.toString().length === 10) {
            t *= 1000;
        }
        if (t - this.enterTime < 10000) return;

        if (undefined === this.nativeData[data.type]) {
            this.nativeData[data.type] = new NativeData();
            this.nativeData[data.type].type = data.type;
            this.nativeData[data.type].setParent(data);
            this.nativeData[data.type].needShow = true;
        } else {
            this.nativeData[data.type].setParent(data);
            this.nativeData[data.type].show();
        }
    }

    /**预先拉取原生广告数据，并创建对应的节点 */
    public preCreateNativeAd() {
        let ids = this.getAllNativeAdIds();
        for (let i = ids.length - 1; i >= 0; --i) {
            setTimeout(() => {
                let id = ids[i];
                let ad = this.api.createNativeAd({
                    adUnitId: id,
                });
                ad.onLoad((res) => {
                    console.log("原生广告加载成功：" + id, res);
                    console.log("原生广告节点数据是否存在：", this.nativeData[res.adList[0].creativeType]);
                    let index = Math.round(Math.random() * (res.adList.length - 1));
                    console.log("随机index==", index);
                    let data = res.adList[index];
                    let type = data.creativeType;
                    if (undefined === this.nativeData[type]) {
                        console.log("新建原生广告节点数据,id==", id);
                        this.nativeData[type] = new NativeData();
                        this.nativeData[type].type = type;
                    }
                    this.nativeData[type].id = id;
                    this.nativeData[type].ad = ad;
                    this.nativeData[type].adData = data;
                    this.nativeData[type].dataState = 2;
                    console.log("原生广告节点状态：", this.nativeData[type].nodeState);
                    this.nativeData[type].createNode();
                    // this.nativeData[type].setNodeData();
                    if (this.nativeData[type].needShow) {
                        this.nativeData[type].showNode();
                    }
                });
                ad.onError((err) => {
                    console.error("原生广告拉取错误：" + id);
                    console.error(err);
                    ad.offLoad();
                    ad.offError();
                    ad.destroy();
                });
                ad.load();
            }, i * 33);
        }
    }

    public hideNativeAd(type: number) {
        if (undefined === this.nativeData[type]) {
            this.nativeData[type] = new NativeData();
            this.nativeData[type].type = type;
            this.nativeData[type].needShow = false;
        } else {
            this.nativeData[type].hide();
        }
    }

    public hideAllNativeAd() {
        for (let key in this.nativeData) {
            this.nativeData[key].hide();
        }
    }
    //快速显示原生广告，暂时与常规显示相同
    public quickShowNativeAd(data) {
        let t = Date.now();
        if (t.toString().length === 10) {
            t *= 1000;
        }
        if (t - this.enterTime < 10000) return;

        if (undefined === this.nativeData[data.type]) {
            this.nativeData[data.type] = new NativeData();
            this.nativeData[data.type].type = data.type;
            this.nativeData[data.type].setParent(data);
            this.nativeData[data.type].needShow = true;
        } else {
            this.nativeData[data.type].setParent(data);
            this.nativeData[data.type].quickShow();
        }
    }
    //快速隐藏原生广告，与常规隐藏相比，广告未被点击过时不会刷新数据
    public quickHideNativeAd(type) {
        if (undefined === this.nativeData[type]) {
            this.nativeData[type] = new NativeData();
            this.nativeData[type].type = type;
            this.nativeData[type].needShow = false;
        } else {
            this.nativeData[type].quickHide();
        }
    }
}

class NativeData {
    /**广告id */
    public id: string;
    /**广告类型 */
    public type: number;
    /**广告对象 */
    public ad: any;
    /**广告数据 */
    public adData: any;
    /**广告对象状态:0-未创建/已销毁，1-已创建，数据加载中，2-数据已加载完成 */
    public dataState: number = 0;
    /**广告节点 */
    public node: cc.Node;

    /**广告节点的父节点 */
    public parent: cc.Node = null;
    /**节点的适配数据 */
    public widget: any = {};

    /**节点状态：0-未创建，1-已创建，未设置数据，2-已设置数据，未显示，3-已显示，未点击，4-已被点击，5-已隐藏 */
    public nodeState: number = 0;
    /**加载数据并设置完成后是否需要立即显示 */
    public needShow: boolean;

    public constructor() {
        this.dataState = 0;
        this.nodeState = 0;
        this.needShow = false;
    }

    public setParent(data) {
        if (!data.parent) {
            this.parent = cc.find("Canvas/NativeAd");
            if (!this.parent) {
                this.parent = cc.find("Canvas");
            }
        } else {
            this.parent = data.parent;
        }
        this.widget = data.widget;
        if (!!this.node) {
            this.node.parent = this.parent;
            this.setWidget(this.node, this.widget);
        }
    }

    public show() {
        console.log("显示原生广告方法，dataState:", this.dataState);
        switch (this.dataState) {
            case 0: {
                this.needShow = true;
                this.loadNativeAd();
                break;
            }
            case 1: {
                this.needShow = true;
                break;
            }
            case 2: {
                switch (this.nodeState) {
                    case 0: {
                        this.needShow = true;
                        break;
                    }
                    case 1: {
                        this.setNodeData();
                        this.showNode();
                        break;
                    }
                    case 2: {
                        this.showNode();
                        break;
                    }
                    case 5: {
                        this.showNode();
                        break;
                    }

                }
            }
        }
    }
    public hide() {
        this.needShow = false;
        //数据
        switch (this.dataState) {
            case 0: {
                this.loadNativeAd();
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                if (this.nodeState === 3
                    || this.nodeState === 4) {
                    this.destroyAd();
                    this.loadNativeAd();
                }
                break;
            }
        }
        //节点
        this.hideNode();
    }
    //快速显示
    public quickShow() {
        this.show();
    }
    //快速隐藏，广告未被点击过时，不会刷新数据
    public quickHide() {
        this.needShow = false;
        //数据
        switch (this.dataState) {
            case 0: {
                this.loadNativeAd();
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                if (this.nodeState === 4) {
                    this.destroyAd();
                    this.loadNativeAd();
                }
                break;
            }
        }
        //节点
        this.hideNode();
    }
    protected api: any;
    public loadNativeAd() {
        console.log("预加载下次需要显示的原生广告数据");
        let ad = window["qg"].createNativeAd({
            adUnitId: this.id,
        });
        ad.onLoad((res) => {
            console.log("原生广告加载成功：", res);
            this.dataState = 2;
            let index = Math.round(Math.random() * (res.adList.length - 1));
            let data = res.adList[index];
            this.adData = data;
            //todo:创建节点，设置数据
            this.createNode();
            this.setNodeData();
            if (this.needShow) {
                this.showNode();
            }
        });
        ad.onError((err) => {
            console.error("原生广告拉取错误：");
            console.error(err);
            this.destroyAd();
        });
        ad.load();

        this.ad = ad;
        this.dataState = 1;
    }
    public destroyAd() {
        if (!!this.ad) {
            this.ad.offLoad();
            this.ad.offError();
            this.ad.destroy();
            this.ad = null;
        }
        this.dataState = 0;
        if (!!this.node) {
            let js = this.node.getComponent("NativeAd" + this.type);
            js.reset();
            this.nodeState = 1;
        }
    }

    public setNodeData() {
        //todo
        if (!this.node) {
            return;
        }
        let js = this.node.getComponent("NativeAd" + this.type);
        js.setData(this.adData);
        this.nodeState = 2;
    }
    public showNode() {
        if (!!this.node) {
            console.log("显示原生广告节点，type==", this.type);
            this.node.active = true;
            this.node.parent = this.parent;
            this.setWidget(this.node, this.widget);
            this.nodeState = 3;
        }
    }
    public onClickNode() {
        this.ad.reportAdClick({
            adId: this.adData.adId,
        });
        this.nodeState = 4;
    }
    public hideNode() {
        if (!!this.node) {
            this.node.active = false;
        }
        this.nodeState = 5;
    }
    public createNode() {
        if (!!this.node) return;
        // return;
        cc.loader.loadRes("NativeAd/OPPO/NativeAd" + this.type, cc.Prefab, (err, res) => {
            if (!!err) {
                console.error("原生广告预制件加载失败，type：", this.type);
                console.error(err);
                return;
            }
            let node = cc.instantiate(res);
            node.on("touchend", this.onClickNode, this);
            this.node = node;
            if (!!this.parent) {
                this.node.parent = this.parent;
                this.setWidget(this.node, this.widget);
            }
            this.nodeState = 1;
            this.setNodeData();
            console.log("加载原生广告预制件" + this.type + "完成，是否显示：", this.needShow);
            if (this.needShow) {
                this.showNode();
            }
        });
    }
    //设置布局组件
    protected setWidget(node: cc.Node, widget: any, targetNode?: cc.Node) {
        let wg = node.getComponent(cc.Widget);
        if (!wg) {
            wg = node.addComponent(cc.Widget);
        }
        wg.isAbsoluteBottom = true;
        wg.isAbsoluteLeft = true;
        wg.isAbsoluteRight = true;
        wg.isAbsoluteTop = true;
        wg.isAbsoluteHorizontalCenter = true;
        wg.isAbsoluteVerticalCenter = true;
        if (!widget) return;
        if (!!targetNode) {
            wg.target = targetNode;
        } else {
            wg.target = node.parent;
        }
        if (undefined != widget.top) {
            wg.isAlignTop = true;
            wg.top = parseFloat(widget.top);
        } else {
            wg.isAlignTop = false;
        }
        if (undefined != widget.bottom) {
            wg.isAlignBottom = true;
            wg.bottom = parseFloat(widget.bottom);
        } else {
            wg.isAlignBottom = false;
        }
        if (undefined != widget.left) {
            wg.isAlignLeft = true;
            wg.left = parseFloat(widget.left);
        } else {
            wg.isAlignLeft = false;
        }
        if (undefined != widget.right) {
            wg.isAlignRight = true;
            wg.right = parseFloat(widget.right);
        } else {
            wg.isAlignRight = false;
        }
        wg.isAlignHorizontalCenter = !!widget.horizontalCenter;
        wg.isAlignVerticalCenter = !!widget.verticalCenter;
        wg.updateAlignment();
    }
}
