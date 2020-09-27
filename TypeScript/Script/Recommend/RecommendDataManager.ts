import RecommendConfig from "./RecommendConfig";
import EventManager from "../Common/EventManager";
import { EventType } from "../GameSpecial/GameEventType";
import GamePlatform from "../Platform/GamePlatform";
import { GamePlatformType } from "../Platform/GamePlatformType";
import GlobalPool from "../Common/GlobalPool";
import Loader from "../Common/Loader";
import { AdConfig } from "../GameSpecial/AdConfig";
import http_request from "../Common/http_request";
import CryptoAes from "../Common/CryptoAes";
/**互推需要的资源类型 */
let AssetType = {
    config: 1,          //互推配置表
    prefab: 2,          //互推预制件
}
//互推配置数据管理器
export default class RecommendDataManager {
    /**互推数据 */
    protected static data: any = {};
    /**互推配置 */
    protected static config: any;
    /**记录所有互推需要的资源是否已加载完成 */
    protected static assetState: { [key: number]: boolean };
    protected static allAssetLoadFinish: boolean = false;
    public static init(node?: cc.Node) {
        this.assetState = {};
        let str = this.getJsonName(node);
        if (!!str) {
            Loader.loadBundle("Recommend", () => {
                this.loadConfig(str);
                this.loadPrefab();
            }, false);
        }
    }

    /**根据游戏平台获取互推配置文件名 */
    protected static getJsonName(node?: cc.Node): string {
        let config: RecommendConfig = null;
        if (!!node) {
            config = node.getComponent(RecommendConfig);
        }
        if (!config) {
            switch (GamePlatform.instance.Config.type) {
                case GamePlatformType.OPPO: return "RecommendConfig_OPPO";
                case GamePlatformType.QQ: return null;
                case GamePlatformType.TT: return "RecommendConfig_TT";
                case GamePlatformType.WX: return "RecommendConfig_WX";
                case GamePlatformType.PC: return "RecommendConfig_WX";
                case GamePlatformType.VIVO: return null;
                default: return null;
            }
        } else {
            switch (config.type) {
                case RecommendConfig.recommendPlatformType.OPPO: return "RecommendConfig_OPPO";
                case RecommendConfig.recommendPlatformType.QQ: return null;
                case RecommendConfig.recommendPlatformType.TT: return "RecommendConfig_TT";
                case RecommendConfig.recommendPlatformType.WX: return "RecommendConfig_WX";
                case RecommendConfig.recommendPlatformType.PC: return "RecommendConfig_WX";
                case RecommendConfig.recommendPlatformType.VIVO: return null;
                case RecommendConfig.recommendPlatformType.Youzi: return "RecommendConfig_Youzi";

                default: return null;
            }
        }
    }
    /**资源加载完成回调 */
    protected static loadFinish(key: number) {
        this.assetState[key] = true;
        //若全部资源加载完成，则发送事件，通知互推节点更新内容
        let finish = true;
        for (let key in AssetType) {
            if (!this.assetState[AssetType[key]]) {
                finish = false;
                break;
            }
        }
        if (finish) {
            this.allAssetLoadFinish = true;
            this.assetState = null;
            EventManager.emit(EventType.RecommendEvent.assetLoadFinish);
        }
    }

    /**加载互推配置表 */
    protected static loadConfig(str: string) {
        Loader.loadBundleRes("Recommend", "Config/" + str, (res) => {
            if (null === res) {
                console.log("互推配置表加载失败：", str);
                return;
            }
            this.config = res.json;
            this.loadFinish(AssetType.config);
        }, cc.JsonAsset, false);
    }

    /**加载互推使用的所有预制件 */
    protected static loadPrefab() {
        let url = "Prefab";
        Loader.loadBundleDir("Recommend", url, (res) => {
            if (null === res) {
                console.log("互推预制件加载失败:", url);
                return;
            }
            for (let i = res.length - 1; i >= 0; --i) {
                let prefab: cc.Prefab = res[i];
                GlobalPool.createPool(prefab.name, prefab, prefab.name);
            }
            this.loadFinish(AssetType.prefab);
        }, cc.Prefab, false);
    }

    /**
     * 从服务端拉取互推数据
     * @param AdID  互推位置
     * @param cb    数据拉取成功后的回调
     */
    public static loadAdData(AdID: string, cb?: (data: []) => void) {
        if (!!cb && !!this.data[AdID]) {
            cb(this.data[AdID]);
            return;
        }
        let data = { softid: GamePlatform.instance.Config.appId, locationid: AdConfig.AdID[AdID] };
        http_request.getInstance().postRequest(http_request.url_ad + "v1.2/api/getAdv.html", data, (response) => {
            let msg = JSON.parse(CryptoAes.aesDecrypt(response.result));
            this.data[AdID] = msg;
            if (!!cb) cb(this.data[AdID]);
        });
    }
    public static getRecommendData(AdID: string) {
        return this.data[AdID];
    }
    /**获取UI互推配置 */
    public static getConfig(ui) {
        if (!this.allAssetLoadFinish) {
            return null;
        }
        return this.config[ui];
    }
}