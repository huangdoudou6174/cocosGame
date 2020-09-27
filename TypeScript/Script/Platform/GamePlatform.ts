import GamePlatformConfig from "./GamePlatformConfig";
import { GamePlatformType } from "./GamePlatformType";
import SDK from "./SDK/SDK";
import WXSDK from "./SDK/WXSDK";
import TTSDK from "./SDK/TTSDK";
import OPPOSDK from "./SDK/OPPOSDK";
import VIVOSDK from "./SDK/VIVOSDK";
import QQSDK from "./SDK/QQSDK";
import PCSDK from "./SDK/PCSDK";


export default class GamePlatform {
    private static _instance: GamePlatform;
    public static get instance(): GamePlatform {
        if (!GamePlatform._instance) {
            GamePlatform._instance = new GamePlatform();
        }
        return GamePlatform._instance;
    }

    /**
     * 平台设置参数
     */
    public get Config(): GamePlatformConfig {
        return this._config;
    }
    private _config: GamePlatformConfig = null;

    /**
     * SDK
     */
    public static get SDK(): SDK {
        if (!GamePlatform.instance._sdk) {
            GamePlatform.instance.setDefaultSdk();
        }
        return GamePlatform.instance._sdk;
    }
    private _sdk: SDK = null;

    /**
     * 初始化SDK
     */
    public init(param: GamePlatformConfig) {
        console.log(param);
        this._config = param;
        switch (param.type) {
            case GamePlatformType.PC:
                this._sdk = new PCSDK();
                break;
            case GamePlatformType.WX:
                this._sdk = new WXSDK();
                break;
            
            default: {
                this._sdk = new PCSDK();
                break;
            }
        }

        this._sdk.config = this._config;
        this._sdk.init();
        this._sdk.onEvents();
        this._sdk.loadRecord();
    }

    /**
     * 设置默认sdk[PC];
     */
    private setDefaultSdk() {
        var param: GamePlatformConfig = new GamePlatformConfig();
        param.type = GamePlatformType.PC;
        param.appId = "";
        param.secret = "";
        param.share = true;
        param.video = true;
        param.banner = false;
        param.interstitial = false;
        param.vibrate = true;
        param.videoAdUnitId = [""];
        param.BannerAdUnitId = [""];
        param.InterstitialAdUnitId = [""];
        param.appBoxUnitId = [""];
        param.blockAdUnitId = [""];

        this.init(param);
    }
}
