import RecommendDataManager from "./RecommendDataManager";
import Recommend from "./Recommend";
import RecommendConfig from "./RecommendConfig";
import GamePlatform from "../Platform/GamePlatform";
import { GamePlatformType } from "../Platform/GamePlatformType";


//互推管理器(仅初始化Recommend与RecommendDataManager，为避免两者相互引用而使用本脚本)
export default class RecommendManager {
    public static init(node: cc.Node) {
        let recommend = this.addRecommendComponent(node);
        if (!!recommend) {
            recommend.init();
            RecommendDataManager.init(node);
        }
    }
    public static addRecommendComponent(node: cc.Node): Recommend {
        let config: RecommendConfig = node.getComponent(RecommendConfig);
        if (!config) {
            switch (GamePlatform.instance.Config.type) {
                case GamePlatformType.OPPO:
                case GamePlatformType.PC:
                case GamePlatformType.WX: {
                    return node.addComponent(Recommend);
                }
                case GamePlatformType.TT: {
                    //头条 iOS 不支持互推
                    let systemInfo = window["tt"].getSystemInfoSync();
                    if (systemInfo.platform == "ios" || systemInfo.appName == "XiGua") {
                        return null;
                    }
                    return null;
                }
                default: {
                    return null;
                }
            }
        } else {
            switch (config.type) {
                case RecommendConfig.recommendPlatformType.PC:
                case RecommendConfig.recommendPlatformType.OPPO:
                case RecommendConfig.recommendPlatformType.WX: {
                    return node.addComponent(Recommend);
                }
                case RecommendConfig.recommendPlatformType.TT: {
                    //头条 iOS 不支持互推
                    let systemInfo = window["tt"].getSystemInfoSync();
                    if (systemInfo.platform == "ios" || systemInfo.appName == "XiGua") {
                        return null;
                    }
                    return null;
                }
              

                default: {
                    return null;
                }

            }
        }
    }
}
