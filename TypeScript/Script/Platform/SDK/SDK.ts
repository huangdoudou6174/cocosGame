import EventManager from "../../Common/EventManager";
import { EventType } from "../../GameSpecial/GameEventType";
import GamePlatform from "../GamePlatform";
import GameConfig from "../../GameSpecial/GameConfig";
import { GlobalEnum } from "../../GameSpecial/GlobalEnum";
import GamePlatformConfig from "../GamePlatformConfig";
import { AdConfig } from "../../GameSpecial/AdConfig";

export default class SDK {
    /**
     * 分享游戏时的描述
     */
    protected shareTitleArr = [
        '',
        ''
    ]
    /**
     * 分享游戏时的图片
     */
    protected shareImgArr = [
        '',
        ''
    ]

    /**
     * 当前平台api
     */
    protected api: any;

    public config: GamePlatformConfig;
    /**进入游戏的时间 */
    protected enterTime: number;
    public onshow_time: number;
    public onhide_time: number;

    /**系统信息 */
    public systemInfo: any;
    /**手机操作系统类型 */
    protected platform: Platform = null;
    /**手机操作系统版本号 */
    protected systemVersion: string;
    /**SDK版本号 */
    protected sdkVersion: string;
    /**
     * 记录SDK与系统信息
     * 
     * 将不同平台的系统信息中通用的内容用统一的字段存储
     * @param platform      SDK获取的系统信息中的操作系统
     * @param version       SDK获取的系统信息中的操作系统版本号
     * @param sdkVersion    SDK获取的系统信息中的SDK版本号
     */
    protected setSystemInfo(platform: string, systemVersion: string, sdkVersion: string) {
        this.systemVersion = systemVersion;
        this.sdkVersion = sdkVersion;
        let str = platform.toUpperCase();
        switch (str) {
            case Platform.ios: {
                this.platform = Platform.ios;
                break;
            }
            case Platform.android: {
                this.platform = Platform.android;
                break;
            }
            default: {
                this.platform = Platform.pc;
                break;
            }
        }
    }
    /**手机操作系统是否低于指定版本 */
    protected systemLessThan(v: string) {
        return this.lessThan(this.systemVersion, v);
    }
    /**平台sdk是否低于指定版本 */
    protected sdkLessThan(v: string) {
        return this.lessThan(this.sdkVersion, v);
    }
    /**比较版本号v1是否低于v2 */
    protected lessThan(v1: string, v2: string) {
        let arr1 = v1.split('.');
        let arr2 = v2.split('.');
        const len = Math.max(arr2.length, arr2.length);
        while (arr1.length < len) {
            arr1.push('0');
        }
        while (arr2.length < len) {
            arr2.push('0');
        }
        for (let i = 0; i < len; i++) {
            const num1 = parseInt(arr1[i]);
            const num2 = parseInt(arr2[i]);
            if (num1 < num2) {
                return true;
            } else if (num1 > num2) {
                return false;
            }
        }
        return false;
    }
    /**判断基础库版本号 */
    protected compareVersion(v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        const len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i]);
            const num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            } else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    }

    /**
     * 初始化
     */
    public init() {
        EventManager.emit(EventType.SDKEvent.inited);
    }

    public onEvents() {
        EventManager.on(EventType.SDKEvent.showBanner, this.showBanner, this);
        EventManager.on(EventType.SDKEvent.hideBanner, this.removeBanner, this);
        EventManager.on(EventType.SDKEvent.showVideo, this.showVideo, this);
        EventManager.on(EventType.SDKEvent.startRecord, this.startRecord, this);
        EventManager.on(EventType.SDKEvent.pauseRecord, this.pauseRecord, this);
        EventManager.on(EventType.SDKEvent.resumeRecord, this.resumeRecord, this);
        EventManager.on(EventType.SDKEvent.stopRecord, this.stopRecord, this);
        EventManager.on(EventType.SDKEvent.shareRecord, this.shareRecord, this);
        EventManager.on(EventType.SDKEvent.showMsg, this.showMessage, this);
        EventManager.on(EventType.SDKEvent.showInsertAd, this.showInterstitialAd, this);
        EventManager.on(EventType.SDKEvent.navigateToMiniProgram, this.navigateToMiniProgram, this);
        EventManager.on(EventType.SDKEvent.vibrateLong, this.onVibrateLong, this);
        EventManager.on(EventType.SDKEvent.vibrateShort, this.onVibrateShort, this);
        EventManager.on(EventType.SDKEvent.show, this.onShow, this);
        EventManager.on(EventType.SDKEvent.hide, this.onHide, this);
        EventManager.on(EventType.SDKEvent.showInsertByPauseLevel, this.showInsertAdByPauseLevel, this);
        EventManager.on(EventType.SDKEvent.triggerGC, this.triggerGC, this);
        EventManager.on(EventType.SDKEvent.showNativeAd, this.showNativeAd, this);
        EventManager.on(EventType.SDKEvent.hideNativeAd, this.hideNativeAd, this);
        EventManager.on(EventType.SDKEvent.hideAllNativeAd, this.hideAllNativeAd, this);
        EventManager.on(EventType.SDKEvent.quickShowNativeAd, this.quickShowNativeAd, this);
        EventManager.on(EventType.SDKEvent.quickHideNativeAd, this.quickHideNativeAd, this);


        //qq平台功能：
        EventManager.on(EventType.SDKEvent.showAppBox, this.showAppBox, this);
        EventManager.on(EventType.SDKEvent.showBlockAd, this.showBlockAd, this);
        EventManager.on(EventType.SDKEvent.addColorSign, this.addColorSign, this);
        EventManager.on(EventType.SDKEvent.subscribeMsg, this.subscribeMsg, this);

    }
    public triggerGC() { }

    /**暂停游戏时显示插屏，插屏显示失败时不显示banner */
    protected showInsertAdByPauseLevel() {
        this.showInterstitialAd(false);
    }

    //广告记录
    public loadRecord() {
        let data = {
            video: null,
            banner: null,
            insert: null,
            recordVideoData: null,
            time: 0,
        };
        let record = cc.sys.localStorage.getItem("AdRecord");
        if (!!record) {
            let d = JSON.parse(record);
            let now = new Date();
            let old = new Date(d.time);
            if (now.getMonth() == old.getMonth() && now.getDate() == old.getDate()) {
                data = d;
            }
        }
        this.bannerRecord = new AdRecord(data.banner);
        this.videoRecord = new AdRecord(data.video);
        this.insertAdRecord = new AdRecord(data.insert);
        this.recordVideoData = new RecordVideoData(data.recordVideoData);
    }
    public saveRecord() {
        let data = {
            video: this.videoRecord,
            banner: this.bannerRecord,
            insert: this.insertAdRecord,
            recordVideoData: this.recordVideoData,
            time: Date.now(),
        };
        cc.sys.localStorage.setItem("AdRecord", JSON.stringify(data));
    }

    /*******************************************录屏*******************************************/
    //开始录屏（头条）
    protected startRecord() {
        this.recordVideo("start");
        this.recordVideoData.onStart();
    }
    protected pauseRecord() {
        this.recordVideo("pause");
    }
    protected resumeRecord() {
        this.recordVideo("resume");
    }
    //停止录屏（头条）
    protected stopRecord() {
        this.recordVideoData.onEnd();
        this.recordVideo("stop");
    }
    //分享录屏（头条）
    protected shareRecord(success: Function, fail: Function = null) {
        this.shareRecordVideo(success, fail);
    }

    /*******************************************视频广告*******************************************/
    protected videoAd: any;
    protected videoRecord: AdRecord = null;
    /**
     * 视频广告
     * @param success   广告观看完毕的回调
     * @param quit      中途退出广告观看的回调
     * @param fail      广告加载失败的回调
     */
    public showVideo(success: Function | {
        success: Function,
        quit?: Function,
        fail?: Function,
        page?: number,
        battle?: number,
        videoName?: typeof GlobalEnum.VideoName,
    }, quit?: Function, fail?: Function, videoName?: typeof GlobalEnum.VideoName) {
        this.videoTongJi = null;
        if (!this.canApiUseVideo()) {
            if (typeof success === "object") {
                if (!!success.page) {
                    EventManager.emit(EventType.TongJi.video, {
                        type: success.page,
                        subType: GlobalEnum.VideoSubType.videoFail,
                        battle: success.battle
                    });
                }
                if (!!success.fail) {
                    success.fail();
                }
            } else if (!!fail) {
                fail();
            }
            return;
        }
        this.resetVideoCb();
        if (typeof success === "object") {
            this.videoSuccess = success.success;
            this.videoQuit = success.quit;
            this.videoFail = success.fail;
            if (undefined !== success.page) {
                this.videoTongJi = {
                    type: success.page,
                    battle: success.battle,
                }
            }
            videoName = success.videoName;
        } else {
            this.videoSuccess = success;
            this.videoQuit = quit;
            this.videoFail = fail;
        }
        if (!this.videoFail) {
            this.videoFail = this.tipVideoFail.bind(this);
        }
        this.sendVideoTongJi(GlobalEnum.VideoSubType.clickBtnVideo);
        this.onVideoStart();
        if (!this.getVideoAdUnitId()) {
            setTimeout(this.onVideoSuccess.bind(this), 0);
        } else {
            this.showVideoAd(videoName);
        }
    }
    /**视频广告开始播放时，处理与游戏逻辑相关的事件 */
    protected onVideoStart() {
        EventManager.emit(EventType.AudioEvent.pause);
        EventManager.emit(EventType.DirectorEvent.pauseLevel);
        EventManager.emit(EventType.UIEvent.showTouchMask);
    }
    /**视频广告播放结束或加载失败后，处理与游戏逻辑相关的事件 */
    protected onVideoEnd() {
        EventManager.emit(EventType.AudioEvent.resume);
        EventManager.emit(EventType.DirectorEvent.resumeLevel);
        EventManager.emit(EventType.UIEvent.hideTouchMask);
    }
    /**能否使用api：video ，子类实现 */
    protected canApiUseVideo() { return true; }
    protected tipVideoFail() {
        this.showMessage("视频加载失败，请稍后再试~");
    }
    public showVideoAd(videoName?: typeof GlobalEnum.VideoName) {
        this.onVideoSuccess();
    }
    /**获取视频广告id */
    protected getVideoAdUnitId(videoName?: number): string {
        // return AdConfig.videoID[videoName];
        // if (!GamePlatform.instance.Config.video) {
        //     console.log("广告开关未打开");
        //     return null;
        // }
        if (!GamePlatform.instance.Config.videoAdUnitId || !GamePlatform.instance.Config.videoAdUnitId[0]) {
            console.log("广告参数未填写");
            return null;
        }
        // if (undefined === videoName) {
            return GamePlatform.instance.Config.videoAdUnitId[0];
        // }
        // if (videoName >= GamePlatform.instance.Config.videoAdUnitId.length) {
        //     return GamePlatform.instance.Config.videoAdUnitId[0];
        // }
        // return GamePlatform.instance.Config.videoAdUnitId[videoName];
    }
    protected onVideoShow() {
        console.log("视频广告展示成功");
        this.videoRecord.onShow();
    }
    protected onVideoHide() {
        console.log("视频广告未播放完即被关闭");
        this.videoRecord.onHide();
    }
    /**视频广告观看完毕回调 */
    protected videoSuccess: Function;
    /**视频广告加载失败回调 */
    protected videoFail: Function;
    /**视频广告中途退出回调 */
    protected videoQuit: Function;
    /**数据分析工具使用的数据 */
    protected videoTongJi: { type: number, battle?: number } = null;
    protected onVideoSuccess() {
        console.log("视频广告观看成功！");
        this.sendVideoTongJi(GlobalEnum.VideoSubType.videoSuc);
        this.onVideoEnd();
        let cb = this.videoSuccess;
        this.resetVideoCb();
        if (!!cb) {
            cb();
        }
    }
    protected onVideoFail(err?: any) {
        console.log("视频广告加载出错  ", err);
        this.sendVideoTongJi(GlobalEnum.VideoSubType.videoFail);
        this.onVideoEnd();
        let cb = this.videoFail;
        this.resetVideoCb();
        if (!!cb) {
            cb();
        }
    }
    protected onVideoQuit() {
        console.log("视频广告观看未完成");
        this.sendVideoTongJi(GlobalEnum.VideoSubType.videoQuit);
        this.onVideoEnd();
        let cb = this.videoQuit;
        this.resetVideoCb();
        if (!!cb) {
            cb();
        }
    }
    /**发送视频数据进行统计 */
    protected sendVideoTongJi(subType: number) {
        if (!!this.videoTongJi) {
            EventManager.emit(EventType.TongJi.video, {
                type: this.videoTongJi.type,
                subType: subType,
                battle: this.videoTongJi.battle,
            });
        }
    }
    protected resetVideoCb() {
        this.videoSuccess = null;
        this.videoQuit = null;
        this.videoFail = null;
    }

    /*******************************************banner*******************************************/
    protected bannerRecord: AdRecord = null;
    /**当前是否显示了banner(部分平台关闭banner无回调) */
    protected bannerShowing: boolean = false;
    public showBanner(ui?) { }
    /**能否使用api：banner ，子类实现 */
    protected canApiUseBanner() { return true; }
    public removeBanner() { }
    protected getBannerId(ui?: string) {
        return AdConfig.bannerID[ui];
        // if (!GamePlatform.instance.Config.banner) {
        //     console.log("banner开关未打开");
        //     return null;
        // }
        // if (!GamePlatform.instance.Config.BannerAdUnitId || !GamePlatform.instance.Config.BannerAdUnitId[0]) {
        //     console.log("banner ID 未填写");
        //     return null;
        // }
        // return GamePlatform.instance.Config.BannerAdUnitId[0];
    }
    protected onBannerShow() {
        console.log("banner 显示成功");
        this.bannerRecord.onShow();
        this.bannerShowing = true;
        EventManager.emit(EventType.SDKEvent.showBannerFinish);
    }
    protected onBannerHide() {
        console.log("banner 广告隐藏");
        this.bannerRecord.onHide();
        this.bannerShowing = false;
    }
    protected onBannerErr(err) {
        console.log('banner 显示失败:', JSON.stringify(err));
        this.bannerRecord.isShowing = false;
    }
    public preCreateBanner(id) { }

    /*******************************************插屏*******************************************/
    protected insertAdRecord: AdRecord = null;
    /**
     * 插屏广告
     * @param banner    插屏显示失败时是否显示banner
     */
    public showInterstitialAd(banner?: boolean) { }
    /**能否使用api：insert ，子类实现 */
    protected canApiUseInsert() { return true; }
    /**获取插屏广告id */
    protected getInsertAdUnitId(): string {
        if (!GamePlatform.instance.Config.interstitial) {
            console.log("插屏广告开关未打开");
            return null;
        }
        if (!GamePlatform.instance.Config.InterstitialAdUnitId || !GamePlatform.instance.Config.InterstitialAdUnitId[0]) {
            console.log("插屏广告参数未填写");
            return null;
        }
        return GamePlatform.instance.Config.InterstitialAdUnitId[0];
    }
    protected onInsertShow() {
        console.log("插屏显示成功");
        this.insertAdRecord.onShow();
    }
    protected onInsertHide() {
        console.log("关闭插屏");
        this.insertAdRecord.onHide();
    }
    protected onInsertErr(err) {
        console.log("插屏广告加载失败：" + JSON.stringify(err));
        this.insertAdRecord.isShowing = false;
    }
    /**插屏显示失败时，是否使用banner代替 */
    protected useBannerInsteadInsert: boolean = false;
    protected showBannerInsteadInsert() {
        if (this.useBannerInsteadInsert) {
            console.log("显示banner代替插屏");
            this.showBanner();
        }
        this.useBannerInsteadInsert = false;
    }

    /*******************************************震动*******************************************/
    /**短震动 */
    public onVibrateShort() {
        if (!GameConfig.driveConfig.vibrate) return;
        this.vibrateShort();
    }
    public vibrateShort() { }
    /**长震动 */
    public onVibrateLong() {
        if (!GameConfig.driveConfig.vibrate) return;
        this.vibrateLong();
    }
    public vibrateLong() { }


    /*******************************************分享*******************************************/
    /**无激励分享&&带参分享 */
    public shareAppMessage(query: string = '') { }
    /**激励分享&&带参分享 */
    public shareToAnyOne(success: Function, fail?: Function, query: string = '') { success() }

    /**弹出消息 */
    public showMessage(msg: string, icon: string = 'none') {
        EventManager.emit(EventType.UIEvent.showTip, msg);
    }

    protected recordVideoData: RecordVideoData = null;
    /**录屏功能 */
    public recordVideo(type: string = 'start') { }
    /**录屏分享 */
    public shareRecordVideo(success: Function, fail?: Function) { }

    /*******************************************跳转*******************************************/
    /**跳转到其他小游戏 */
    public navigateToMiniProgram(data: any) {
        console.log("跳转小游戏，子类实现，data:", data);
    }

    /**游戏切到后台 */
    public onHide() { }
    /**从后台回到游戏 */
    public onShow() { }

    //QQ平台功能：

    /*******************************************盒子广告*******************************************/
    public showAppBox() { }
    protected getAppBoxId() {
        if (!GamePlatform.instance.Config.appBoxUnitId || !GamePlatform.instance.Config.appBoxUnitId[0]) {
            console.log("盒子广告参数未填写");
            return null;
        }
        return GamePlatform.instance.Config.appBoxUnitId[0];
    }
    /*******************************************积木广告*******************************************/
    public showBlockAd() { }
    protected getBlockAdId() {
        if (!GamePlatform.instance.Config.blockAdUnitId || !GamePlatform.instance.Config.blockAdUnitId[0]) {
            console.log("积木广告参数未填写");
            return null;
        }
        return GamePlatform.instance.Config.blockAdUnitId[0];
    }

    /*******************************************彩签*******************************************/
    public addColorSign(data?: any) { }
    public subscribeMsg(data?: any) { }

    /*******************************************原生广告*******************************************/
    /**原生广告id */
    public getNativeAdId() {
        if (!GamePlatform.instance.Config.nativeAdUnitId[0]) {
            console.log("原生广告参数未填写");
            return null;
        }
        return GamePlatform.instance.Config.nativeAdUnitId[0];
    }
    public getAllNativeAdIds() {
        if (!GamePlatform.instance.Config.nativeAdUnitId[0]) {
            console.log("原生广告参数未填写");
            return [];
        }
        return GamePlatform.instance.Config.nativeAdUnitId;
    }
    /**显示原生广告 */
    public showNativeAd(data?) { }
    public hideNativeAd(data?) { }
    public hideAllNativeAd(data?) { }
    public quickShowNativeAd(data?) { }
    public quickHideNativeAd(data?) { }
}

class AdRecord {
    /**本游戏当天显示的总次数 */
    public dayShowCount: number;
    /**当天用户点击关闭的总次数 */
    public dayHideCount: number;
    /**从进入游戏开始展示的总次数 */
    public gameShowCount: number;
    /**进入游戏开始用户点击关闭的总次数 */
    public gameHideCount: number;
    /**上一次展示的时间戳 */
    public preShowTime: number;
    /**上一次关闭的时间戳 */
    public preHideTime: number;
    /**是否正在展示 */
    public isShowing: boolean;

    public constructor(data) {
        this.isShowing = false;
        this.gameShowCount = 0;
        this.gameHideCount = 0;
        if (!data) {
            this.dayShowCount = 0;
            this.dayHideCount = 0;
            this.preShowTime = 0;
            this.preHideTime = 0;
        } else {
            this.dayShowCount = data.dayShowCount;
            this.dayHideCount = data.dayHideCount;
            this.preShowTime = data.preShowTime;
            this.preHideTime = data.preHideTime;
        }
    }

    public onShow() {
        this.isShowing = true;
        this.dayShowCount++;
        this.gameShowCount++;
        this.preShowTime = Date.now();
    }
    public onHide() {
        this.isShowing = false;
        this.dayHideCount++;
        this.gameHideCount++;
        this.preHideTime = Date.now();
    }
    /**当前时间距离上一次展示的时间间隔，单位：秒 */
    public getShowSpaceTime() {
        let d = Date.now() - this.preShowTime;
        return d * 0.001;
    }
    /**当前时间距离上一次关闭的时间间隔，单位：秒 */
    public getHideSpaceTime() {
        let d = Date.now() - this.preHideTime;
        return d * 0.001;
    }

}
/**录屏数据记录 */
class RecordVideoData {
    public startTime: number;
    public endTime: number;
    public gameShareCount: number;
    public dayShareCount: number;
    public constructor(data) {
        this.startTime = 0;
        this.endTime = 0;
        this.gameShareCount = 0;
        if (!!data) {
            this.dayShareCount = data.dayShareCount;
        } else {
            this.dayShareCount = 0;
        }
    }
    /**录屏开始 */
    public onStart() {
        this.startTime = Date.now();
        this.endTime = Date.now();
    }
    /**录屏结束 */
    public onEnd() {
        this.endTime = Date.now();
    }
    /**录屏时长，单位：秒 */
    public get totalTime() {
        return (this.endTime - this.startTime) * 0.001;
    }
    /**分享成功 */
    public onShare() {
        this.gameShareCount++;
        this.dayShareCount++;
    }
}

/**
 * 手机平台类型
 */
export enum Platform {
    /**电脑上调试时使用 */
    pc = "PC",
    /**苹果 */
    ios = "IOS",
    /**安卓 */
    android = "ANDROID",
}