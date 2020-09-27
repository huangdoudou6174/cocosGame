import SDK from "./SDK";
import GamePlatform from "../GamePlatform";
export default class QQSDK extends SDK {
    protected apiName: string = 'qq';

    public init() {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log("QQ小游戏系统信息：");
        console.log(this.systemInfo);
        this.api.showShareMenu({ withShareTicket: false });
    }

    /**
     * 视频广告
     */
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
        let rewardedVideoAd = this.api.createRewardedVideoAd({
            adUnitId: id,
        });

        rewardedVideoAd.onLoad(this.onVideoShow.bind(this));

        rewardedVideoAd.onError(this.onVideoFail.bind(this));
        let closefun = ((res) => {
            rewardedVideoAd.offLoad(this.onVideoShow.bind(this));
            rewardedVideoAd.offError(this.onVideoFail.bind(this));
            rewardedVideoAd.offClose(closefun);
            rewardedVideoAd = null;
            if (res && res.isEnded) {
                this.onVideoSuccess();
            } else {
                this.onVideoQuit();
                this.onVideoHide();
            }
        });
        rewardedVideoAd.onClose(closefun);
        //开始加载视频广告
        rewardedVideoAd.load().then(() => {
            rewardedVideoAd.show().catch(err => {
                this.onVideoFail(err);
                rewardedVideoAd.offLoad(this.onVideoShow.bind(this));
                rewardedVideoAd.offError(this.onVideoFail.bind(this));
                rewardedVideoAd.offClose(closefun);
                rewardedVideoAd = null;
            });
        });

    }
    /**能否使用api：video */
    protected canApiUseVideo(): boolean {
        return true;
    }

    //当前广告。
    private _bannerAd: any;
    /**
     * 打开banner
     */
    public showBanner() {
        if (!this.canApiUseBanner()) {
            return;
        }
        // if (this.insertAdRecord.isShowing) {
        //     console.log("有插屏显示，不再显示banner");
        //     this.removeBanner();
        //     return;
        // }
        if (!!this._bannerAd) {
            this._bannerAd.show().then(this.onBannerShow.bind(this));
            return;
        }
        let id = this.getBannerId();
        if (!id) return;
        // this.removeBanner();
        let banner = this.createBanner(id);
        banner.show().then(this.onBannerShow.bind(this));
    }
    /**能否使用api：banner */
    protected canApiUseBanner() {
        return true;
    }
    protected createBanner(id: string) {
        this._bannerAd = this.api.createBannerAd({
            adUnitId: id,
            style: {
                left: 0,
                top: this.systemInfo.screenHeight - 130,
                width: this.systemInfo.screenWidth + 50,
            }
        });

        this._bannerAd.onError(this.onBannerErr.bind(this));
        // this._bannerAd.show().then(this.onBannerShow.bind(this));

        this._bannerAd.onResize(res => {
            if (this.systemInfo.platform == "ios" && cc.visibleRect["height"] / cc.visibleRect["width"] >= 2) {
                console.log("苹果刘海屏手机调用banner");
                this._bannerAd.style.top = this.systemInfo.screenHeight - res.height - 20;
            } else {
                this._bannerAd.style.top = this.systemInfo.screenHeight - res.height;
            }
        });
        return this._bannerAd;
    }

    /**
     * 关闭广告
     */
    public removeBanner() {
        if (this._bannerAd) {
            this._bannerAd.offError(this.onBannerErr.bind(this));
            this._bannerAd.offResize();
            this._bannerAd.destroy(); //要先把旧的广告给销毁，不然会导致其监听的事件无法释放，影响性能
            this._bannerAd = null;
        }
        //销毁当前banner后，立即创建新的banner，但不显示出来
        let id = this.getBannerId();
        if (!id) return;
        this.createBanner(id);
    }


    /**
     * 插屏广告
     */
    public showInterstitialAd(banner: boolean = false) {
        this.showBanner();
        return;
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
        let ad = this.api.createInterstitialAd({ adUnitId: id });
        // ad.show().then(() => {
        //     this.removeBanner();
        //     this.onInsertShow();
        // });
        try {
            ad.show().then(() => {
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
        ad.onClose(() => {
            this.onInsertHide();
            ad.destroy();
        });
        ad.onError((err) => {
            this.onInsertErr(err);
            this.showBannerInsteadInsert();
        });
    }
    /**能否使用api：insert */
    protected canApiUseInsert() {
        const version = this.systemInfo.SDKVersion;
        if (this.lessThan(version, '1.12.0')) {
            console.log('基础库版本低于1.12.0，插屏无法显示');
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
    shareAppMessage(query: string = "") {
        let index: number = Math.floor((Math.random() * this.shareTitleArr.length));
        let indeximg: number = Math.floor((Math.random() * this.shareImgArr.length));
        this.api.shareAppMessage({
            title: `${this.shareTitleArr[index]}`,
            imageUrl: `${this.shareImgArr[indeximg]}`,
            query: `${query}`,
        });
    }

    /**
     * 激励分享&&带参分享
     */
    shareToAnyOne(success: Function, fail?: Function, query: string = '') {
        if (!GamePlatform.instance.Config.share) {
            // success();
            return;
        }
        this.shareAppMessage(query);
        success();
    }

    //订阅
    public subscribeMsg(data?: {
        tmplIds?: string[],     //需订阅的消息模板的id的集合，一次调用最多可订阅3条消息。
        subscribe: boolean,     //true:订阅,false:取消订阅
        success: (res) => void, //接口调用成功回调
        fail: (res) => void,    //接口调用失败回调
    }) {
        if (undefined === data) {
            data = {
                subscribe: true,
                success: (res) => {
                    console.log("订阅成功");
                },
                fail: (res) => {
                    console.log("订阅失败");
                },
            };
        }
        this.api.subscribeAppMsg(data);
    }
    //彩签
    public addColorSign(data?: {
        success: (res) => void,
        fail: (res) => void,
        complete: (res) => void,
    }) {
        if (this.lessThan(this.systemInfo.SDKVersion, "1.10.0")) {
            console.log("基础库版本低于1.10.0，无法使用彩签功能");
            return;
        }
        if (undefined === data) {
            data = {
                success: (res) => {
                    console.log("彩签添加成功,", res);
                },
                fail: (res) => {
                    console.log("彩签添加失败,", res);
                },
                complete: (res) => {
                    console.log("彩签接口调用完成，", res);
                }
            };
        }
        this.api.addColorSign(data);
    }
    //盒子广告
    protected appBox: any = null;
    public showAppBox() {
        if (this.lessThan(this.systemInfo.SDKVersion, "1.7.1")) {
            console.log("基础库版本低于1.7.1，盒子广告无法显示");
            return;
        }
        if (!!this.appBox) {
            this.appBox.show();
            return;
        }
        let id = this.getAppBoxId();
        let appBox = this.api.createAppBox({
            adUnitId: id,
        });
        appBox.load().then(() => {
            console.log("盒子广告加载完成");
            appBox.show();
            console.log("盒子广告显示成功");
        }).catch((err) => {
            console.log("盒子广告加载失败：", err);
            appBox.destroy();
            this.appBox = null;
        });
        this.appBox = appBox;
    }

    //积木广告
    public showBlockAd() {

    }

}
