import SDK, { Platform } from "./SDK";
import GamePlatform from "../GamePlatform";
import EventManager from "../../Common/EventManager";
import { EventType } from "../../GameSpecial/GameEventType";

export default class TTSDK extends SDK {
    private apiName: string = 'tt';

    protected appName: AppName = null;
    /**
     * 记录字节跳动平台下的应用程序的类型，
     * 参考文档：https://microapp.bytedance.com/dev/cn/mini-app/develop/basic-library/compatibility-description
     */
    protected initAppType() {
        let appName = this.systemInfo.appName.toUpperCase();
        switch (appName) {
            case "TOUTIAO": {
                this.appName = AppName.touTiao;
                break;
            }
            case "DOUYIN": {
                this.appName = AppName.douYin;
                break;
            }
            case "XIGUA": {
                this.appName = AppName.xiGua;
                break;
            }
            case "NEWS_ARTICLE_LITE": {
                this.appName = AppName.jiSuTT;
                break;
            }
            default: {
                this.appName = AppName.devtools;
                break;
            }
        }
    }

    public init() {
        this.api = window[this.apiName];

        this.systemInfo = this.api.getSystemInfoSync();
        this.initAppType();
        this.setSystemInfo(this.systemInfo.platform, this.systemInfo.version, this.systemInfo.SDKVersion);
        console.log("系统信息：");
        console.log(JSON.stringify(this.systemInfo));

        this.api.showShareMenu({ withShareTicket: false });

        this.preCreateBanner();
    }


    //video
    public showVideoAd(videoName?: any) {
        if (!this.canApiUseVideo()) {
            this.onVideoSuccess();
            return;
        }
        let id = this.getVideoAdUnitId(videoName);
        if (!id) {
            this.onVideoFail("获取视频id失败");
            return;
        }
        //不支持在开发工具运行，只能在真机运行 返回值是个单例
        var rewardedVideoAd = this.api.createRewardedVideoAd({ adUnitId: id });
        let load = (() => {
            this.onVideoShow();
        })
        rewardedVideoAd.onLoad(load);
        let error = ((err) => {
            this.onVideoFail(err);
        })
        rewardedVideoAd.onError(error);
        let closefun = ((res) => {
            rewardedVideoAd.offLoad(load);
            rewardedVideoAd.offError(error);
            rewardedVideoAd.offClose(closefun);
            rewardedVideoAd = null;
            if (res && res.isEnded || res === undefined) {
                this.onVideoSuccess();
            } else {
                this.onVideoQuit();
                this.onVideoHide();
            }
        })
        rewardedVideoAd.onClose(closefun);
        //开始加载视频广告
        rewardedVideoAd.load().then(() => {
            rewardedVideoAd.show().catch(
                err => {
                    this.onVideoFail(err);
                    rewardedVideoAd.offLoad(load);
                    rewardedVideoAd.offError(error);
                    rewardedVideoAd.offClose(closefun);
                    rewardedVideoAd = null;
                });
        });
    }
    /**能否使用api：video */
    protected canApiUseVideo(): boolean {
        if (this.appName == AppName.devtools) {
            console.log("开发者工具上无法显示视频广告");
            return false;
        }
        return true;
    }

    //当前广告
    private _bannerAd: any;
    /**
     * 打开banner广告
     */
    public showBanner(cb?: Function) {
        if (!this.canApiUseBanner()) {
            return;
        }
        if (this.insertAdRecord.isShowing) {
            console.log("有插屏显示，不再显示banner");
            this.removeBanner();
            return;
        }
        if (this.bannerRecord.getShowSpaceTime() < 1) {
            console.log("距离上次显示banner时间小于1s，不再创建");
            return;
        }
        if (this.bannerShowing) return;
        //已经创建了banner：
        if (!!this._bannerAd) {
            //创建的banner已经加载成功，直接显示：
            if (this.bannerLoaded) {
                this._bannerAd.show().then(() => {
                    this.onBannerShow();
                    this.bannerShowing = true;
                    if (!!cb) {
                        cb();
                    }
                });
            } else {
                //创建的banner还没加载完成时，设置标记，使其在加载完成后显示
                this.needShowBanner = true;
            }
        } else {
            //尚未创建banner，则设置标记，创建banner，并使其在加载完成后显示
            this.needShowBanner = true;
            this.preCreateBanner();
        }
    }
    /**能否使用api：banner */
    protected canApiUseBanner() {
        if (this.appName == AppName.douYin) {
            console.log("抖音平台无banner");
            return false;
        }
        return true;
    }

    /**创建新的banner的时间 */
    protected createBannerTime: number = 0;
    /**banner加载成功后是否需要立即显示 */
    protected needShowBanner: boolean = false;
    /**banner是否已加载完毕 */
    protected bannerLoaded: boolean = false;
    /**预先创建banner，创建的banner在加载完成时，会根据 needShowBanner 确定是否需要立即显示 */
    public preCreateBanner() {
        let id = this.getBannerId();
        if (!id) return null;
        let targetBannerAdWidth = 200;
        this._bannerAd = this.api.createBannerAd({
            adUnitId: id,
            style: {
                width: targetBannerAdWidth,
                top: this.systemInfo.windowHeight - (targetBannerAdWidth / 16 * 9), // 根据系统约定尺寸计算出广告高度
            }
        });
        this._bannerAd.onError((err) => {
            this.onBannerErr(err);
            this.destroyBanner();
        });
        // 尺寸调整时会触发回调，通过回调拿到的广告真实宽高再进行定位适配处理
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        this._bannerAd.onResize(size => {
            // good
            this._bannerAd.style.top = this.systemInfo.windowHeight - size.height;
            this._bannerAd.style.left = (this.systemInfo.windowWidth - size.width) / 2;
            // bad，会触发死循环
            // bannerAd.style.width++;
        });
        this._bannerAd.onLoad(() => {
            this.bannerLoaded = true;
            if (this.needShowBanner) {
                this.showBanner();
                this.needShowBanner = false;
            }
        });
        this.createBannerTime = Date.now();
        return this._bannerAd;
    }
    /**
     * 关闭banner广告
     */
    public removeBanner() {
        if (this._bannerAd) {
            let t = Date.now();
            if (t - this.createBannerTime > 60000) {
                console.log("距上次显示banner已超过60秒，创建新的banner");
                this.destroyBanner();
                this.preCreateBanner();
            } else {
                this._bannerAd.hide();
            }
        }
        this.bannerShowing = false;
        this.needShowBanner = false;
    }
    /**销毁banner */
    protected destroyBanner() {
        if (this._bannerAd) {
            // this._bannerAd.offLoad();
            // this._bannerAd.offError();
            // this._bannerAd.offResize();
            this._bannerAd.destroy(); //要先把旧的广告给销毁，不然会导致其监听的事件无法释放，影响性能
            this._bannerAd = null;
        }
        this.bannerLoaded = false;
    }

    //插屏
    protected insertAd: any = null;
    public showInterstitialAd(banner?: boolean) {
        this.useBannerInsteadInsert = banner;
        if (!this.canApiUseInsert()) {
            this.showBannerInsteadInsert();
            return;
        }
        let id = this.getInsertAdUnitId();
        if (!id) {
            this.showBannerInsteadInsert();
            return;
        }
        if (!!this.insertAd) {
            this.insertAd.destroy();
            this.insertAd = null;
        }
        let interstitialAd = this.api.createInterstitialAd({ adUnitId: id });
        if (!interstitialAd) {
            this.onInsertErr("插屏创建失败");
            this.showBannerInsteadInsert();
            return;
        }
        this.insertAd = interstitialAd;
        interstitialAd.onClose(this.onInsertHide.bind(this));
        interstitialAd.onError((err) => {
            this.onInsertErr(err);
            this.showBannerInsteadInsert();
        });
        interstitialAd.load().then(() => {
            try {
                interstitialAd.show().then(() => {
                    this.removeBanner();
                    this.onInsertShow();
                }).catch((err) => {
                    this.onInsertErr(err);
                    this.showBannerInsteadInsert();
                });
            } catch (err) {
                this.onInsertErr(err);
                this.showBannerInsteadInsert();
            }
        });
    }
    /**能否是否api：insert */
    protected canApiUseInsert() {
        //插屏只支持安卓头条客户端
        if (this.appName !== AppName.touTiao
            || this.platform == Platform.ios) {
            return false;
        }
        return true;
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
        let index: number = Math.floor((Math.random() * this.shareTitleArr.length));
        let indeximg: number = Math.floor((Math.random() * this.shareImgArr.length));
        let self = this
        this.api.shareAppMessage({
            title: `${this.shareTitleArr[index]}`,
            imageUrl: `${this.shareImgArr[indeximg]}`,
            query: query,
            success: function (res) {
                self.showMessage('分享成功');
            },
            fail: function (res) {
                self.showMessage('分享失败');
            },
        });
    }

    /**
     * 激励分享&&带参分享
     */
    public shareToAnyOne(success: Function, fail?: Function, query: string = '') {
        let index: number = Math.floor((Math.random() * this.shareTitleArr.length));
        let indeximg: number = Math.floor((Math.random() * this.shareImgArr.length));
        let self = this
        this.api.shareAppMessage({
            title: `${this.shareTitleArr[index]}`,
            imageUrl: `${this.shareImgArr[indeximg]}`,
            query: query,
            success: function (res) {
                self.showMessage('分享成功');
                success();
            },
            fail: function (res) {
                self.showMessage('分享失败');
                fail && fail();
            },
        });
    }

    //当前录屏是否已成功发布过一次
    public isShared = false;
    //录屏错误。
    private IsRecordError: boolean = false;
    //视频地址
    private videoPath: string = '';
    protected recordMng: any = null;
    /**
     * 录屏
     */
    public recordVideo(type: string = 'start') {
        let self = this;
        if (null === this.recordMng) {
            this.recordMng = this.api.getGameRecorderManager();
            this.recordMng.onStart(res => {
                console.log('录屏开始', res);
            });
            this.recordMng.onPause((res) => {
                console.log("暂停录屏，", res);
            });
            this.recordMng.onResume((res) => {
                console.log("继续录屏", res);
            });
            this.recordMng.onStop(res => {
                console.log('监听录屏结束', res);
                self.videoPath = res.videoPath + "";
                EventManager.emit(EventType.SDKEvent.recordSaved);
            });
            this.recordMng.onError((errMsg) => {
                console.log('录屏错误：', JSON.stringify(errMsg));
                self.IsRecordError = true;
                EventManager.emit(EventType.SDKEvent.recordError);
            });
        }
        let recorder = this.recordMng;
        switch (type) {
            case "start": {
                this.IsRecordError = false;
                this.isShared = false;
                recorder.start({
                    duration: 120,
                })
                break;
            }
            case "pause": {
                recorder.pause();
                break;
            }
            case "resume": {
                recorder.resume();
                break;
            }
            case "stop": {
                recorder.stop();
                break;
            }
        }
    }

    /**分享录屏 */
    public shareRecordVideo(success: Function, fail?: Function) {
        let time = this.recordVideoData.totalTime;
        if (time <= 3) {
            this.showMessage("录屏时间短于3s不能分享哦~~");
            if (!!fail) fail();
            return;
        }
        console.log('视频地址', this.videoPath, this.IsRecordError)
        let self = this;
        if (this.videoPath && this.IsRecordError == false) {
            let index: number = Math.floor((Math.random() * this.shareTitleArr.length));
            let indeximg: number = Math.floor((Math.random() * this.shareImgArr.length));
            this.api.shareAppMessage({
                channel: 'video',
                title: `${this.shareTitleArr[index]}`,
                imageUrl: `${this.shareImgArr[indeximg]}`,
                extra: {
                    videoPath: this.videoPath,
                    // videoTopics:''
                },
                success: (res) => {
                    console.log('录屏发布成功:', JSON.stringify(res));
                    self.showMessage("发布成功");
                    if (!self.isShared) {
                        self.recordVideoData.onShare();
                        self.isShared = true;
                        success();
                    }
                },
                fail: (res) => {
                    console.log('录屏发布失败', JSON.stringify(res));
                    if (res.errMsg.indexOf("short") >= 0) {
                        self.showMessage("录屏时间短于3秒不能分享哦~~");
                    } else if (res.errMsg.indexOf("cancel") >= 0) {
                        self.showMessage("发布取消");
                    }
                    if (!!fail) fail();
                    return;
                    if (this.appName == AppName.touTiao) { //头条版
                        if (self.systemInfo.platform == "ios") { //苹果手机 安卓手机为 android
                            if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~')
                            } else {
                                self.showMessage('分享取消')
                            }
                        } else {
                            let msg = res.errMsg.split(',')[0]
                            console.log('msg', msg)
                            if (msg == 'shareAppMessage:fail video file is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~')
                            } else {
                                self.showMessage('发布取消')
                            }
                        }
                    } else if (this.appName == AppName.jiSuTT) { //头条极速版
                        if (self.systemInfo.platform == "ios") { //苹果手机 安卓手机为 android
                            if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~')
                            } else {
                                self.showMessage('发布取消')
                            }
                        } else {
                            let msg = res.errMsg.split(',')[0]
                            console.log('msg', msg)
                            if (msg == 'shareAppMessage:fail video file is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~')
                            } else {
                                self.showMessage('发布取消')
                            }
                        }
                    } else if (this.appName == AppName.douYin) {//抖音
                        if (self.systemInfo.platform == "ios") { //苹果手机 安卓手机为 android
                            if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                                self.showMessage('录屏时间短于3s不能分享哦~~')
                            } else {
                                self.showMessage('发布取消')
                            }
                        } else {
                            let msg = res.errMsg.split(',')[0]
                            console.log('msg', msg)
                            if (msg == 'shareAppMessageDirectly:fail') {
                                self.showMessage('录屏时间短于3s不能分享哦~~')
                            } else {
                                self.showMessage('发布取消')
                            }
                        }
                    } else {
                        self.showMessage('发布取消')
                    }
                }
            });
        } else {
            self.showMessage('录屏错误');
            if (!!fail) fail();
        }
    }

    // /**
    //  * 消息提示
    //  */
    // public showMessage(msg: string, icon: string = 'none') {
    //     this.api.showToast({
    //         title: msg,
    //         duration: 2000,
    //         icon: icon,
    //         success: (res) => { }
    //     });
    // }

    public navigateToMiniProgram(data: any) {
        this.api.navigateToMiniProgram({
            appId: data.gameId,
        });
    }
}

/**字节跳动平台的应用名称 */
enum AppName {
    /**开发者工具 */
    devtools,
    /**今日头条 */
    touTiao,
    /**今日头条极速版 */
    jiSuTT,
    /**抖音 */
    douYin,
    /**西瓜 */
    xiGua,
}