import SDK from "./SDK";
import GamePlatform from "../GamePlatform";
import EventManager from "../../Common/EventManager";
import { EventType } from "../../GameSpecial/GameEventType";

export default class VIVOSDK extends SDK {
    private apiName: string = 'qg';

    /**
     * 初始化
     */
    public init() {
        this.api = window[this.apiName];
        this.systemInfo = this.api.getSystemInfoSync();
        console.log("系统信息：");
        console.log(JSON.stringify(this.systemInfo));
    }

    //视频广告
    protected rewardedAd: any = null;
    public showVideoAd(videoName?: any) {
        if (this.systemInfo.platformVersionCode < 1041) {
            this.onVideoFail('基础库版本过低，不能使用视频功能');
            return;
        }
        let id = this.getVideoAdUnitId(videoName);
        if (!id) {
            this.onVideoFail("视频id获取失败");
            return;
        }

        if (!this.rewardedAd) {
            let rewardedAd = this.api.createRewardedVideoAd({
                posId: id,
                style: {}
            });
            rewardedAd.onClose(res => {
                if (res && res.isEnded) {
                    this.onVideoSuccess();
                } else {
                    this.onVideoQuit();
                    this.onVideoHide();
                }
            });
            rewardedAd.onError(err => {
                switch (err.errCode) {
                    case -3: {
                        console.log("激励广告加载失败---调用太频繁", JSON.stringify(err));
                        break;
                    }
                    case -4: {
                        console.log("激励广告加载失败--- 一分钟内不能重复加载", JSON.stringify(err));
                        break;
                    }
                    case 30008: {
                        // 当前启动来源不支持激励视频广告，请选择其他激励策略
                        break;
                    }
                    default: {
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("激励广告展示失败")
                        console.log(JSON.stringify(err))
                        break;
                    }
                }
                this.onVideoFail(err);
            });
            rewardedAd.onLoad(() => {
                let adshow = rewardedAd.show();
                this.onVideoShow();
                // 捕捉show失败的错误
                adshow && adshow.catch(err => {
                    this.onVideoFail(err);
                });
            });
            this.rewardedAd = rewardedAd;
        }
        let adLoad = this.rewardedAd.load();//第一次调用 可能会报-3  广告能正常展示就可以忽略
        // 捕捉load失败的错误
        !!adLoad && adLoad.catch(err => {
            this.onVideoFail(err);
        });
    }

    //当前banner
    private _bannerAd: any;
    /**
     * 打开banner广告
     */
    public showBanner() {
        if (this.systemInfo.platformVersionCode < 1031) {
            console.log("基础库版本过低，不能使用广告功能");
            return;
        }
        // if (this.insertAdRecord.isShowing) {
        //     console.log("插屏广告正在显示，无法同时显示banner");
        //     return;
        // }
        if (this.bannerRecord.getShowSpaceTime() < 12) {
            console.log("距离上一次展示banner的时间间隔小于12秒，不进行展示");
            return;
        }
        if (!!this._bannerAd) {
            console.log("上一次创建的banner未销毁，直接显示");
            this._bannerAd.show().then(() => {
                console.log("再次显示已创建的banner成功");
                this.onBannerShow();
            }).catch((err) => {
                this.onBannerErr(err);
                this.removeBanner();
                this.createBanner();
            })
        } else {
            this.removeBanner();
            this.createBanner();
        }
    }
    protected createBanner() {
        let id = this.getBannerId();
        if (!id) return;
        //style内无需设置任何字段，banner会在屏幕底部居中显示，
        // 没有style字段，banner会在上边显示
        let bannerAd = this.api.createBannerAd({
            posId: id,
            style: {}
        });
        this._bannerAd = bannerAd;
        let adshow = bannerAd.show();
        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
        if (!adshow) {
            console.log("banner show fail");
        }
        adshow && adshow.then(() => {
            console.log("banner广告展示成功");
            this.onBannerShow();
        }).catch((err) => {
            switch (err.code) {
                case 30003: {
                    console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                    break;
                }
                case 30009: {
                    console.log("10秒内调用广告次数超过1次，10秒后再调用");
                    break;
                }
                case 30002: {
                    console.log("加载广告失败，重新加载广告");
                    break;
                }
                default: {
                    // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                    console.log("banner广告展示失败");
                    console.log(JSON.stringify(err));
                    break;
                }
            }
        });
    }

    /**
     * 关闭banner广告
     */
    public removeBanner() {
        if (this._bannerAd) {
            //距离上一次创建时间少于12秒时，隐藏banner，下次需要显示时不再创建新的banner
            if (this.bannerRecord.getShowSpaceTime() < 12) {
                console.log("距离上一次创建时间少于12秒，不销毁banner，只隐藏");
                this._bannerAd.hide();
            } else {
                let addestroy = this._bannerAd.destroy();
                addestroy && addestroy.then(() => {
                    console.log("banner广告销毁成功");
                    this._bannerAd = null;
                }).catch(err => {
                    console.log("banner广告销毁失败", err);
                    this._bannerAd.hide();
                });
            }
            this.onBannerHide();
        }
    }

    /**
     * 插屏广告
     */
    public showInterstitialAd(banner: boolean = false) {
        this.useBannerInsteadInsert = banner;
        if (this.systemInfo.platformVersionCode < 1031) {
            console.log("基础库版本过低，不能使用插屏广告功能");
            this.showBannerInsteadInsert();
            return
        }
        let id = this.getInsertAdUnitId();
        if (!id) {
            this.showBannerInsteadInsert();
            return;
        }
        let interstitialAd = this.api.createInterstitialAd({
            posId: id,
            style: {}
        });
        interstitialAd.onClose(this.onInsertHide.bind(this));
        let adshow = interstitialAd.show();
        if (!adshow) {
            console.log("insertAd show fail");
            this.showBannerInsteadInsert();
            return;
        }

        // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
        !!adshow && adshow.then(() => {
            // this.removeBanner();
            this.onInsertShow();
            this.showBannerInsteadInsert();
        }).catch((err) => {
            switch (err.code) {
                case 30003: {
                    console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                    break;
                }
                case 30009: {
                    console.log("10秒内调用广告次数超过1次，10秒后再调用");
                    break;
                }
                case 30002: {
                    console.log("load广告失败，重新加载广告");
                    break;
                }
                default: {
                    // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                    console.log("插屏广告展示失败");
                    console.log(JSON.stringify(err));
                    break;
                }
            }
            this.onInsertErr(err);
            this.showBannerInsteadInsert();
        });
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
}
