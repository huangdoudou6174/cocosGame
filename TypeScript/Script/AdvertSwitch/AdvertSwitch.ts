import http_request from "../Common/http_request";
import GamePlatform from "../Platform/GamePlatform";

/**后天开关配置 */
export default class AdvertSwitch {
    protected static config = {};
    protected static enterSceneId: number = null;
    protected static sceneEnabled: boolean = false;
    public static init() {
        if (!!window["wx"]) {
            this.enterSceneId = window["wx"].getLaunchOptionsSync().scene;
            if (typeof this.enterSceneId === "string") {
                this.enterSceneId = parseInt(this.enterSceneId);
            }
            console.log("进入场景：", this.enterSceneId);
        }
        this.loadConfig();
    }

    protected static loadConfig() {
        let url = http_request.url_ad + "v1.1/api/getGameParam.html";
        http_request.getInstance().postRequest(url, {
            softid: GamePlatform.instance.Config.appId,
        }, this.saveConfig.bind(this));
    }

    protected static saveConfig(data) {
        console.log("拉取到的开关配置：", data);
        let result = data.result;
        for (let i = result.length - 1; i >= 0; --i) {
            let v = result[i].value;
            if (result[i].name == "scene_limit") {
                let arr = v.split(",");
                v = [];
                for (let j = arr.length - 1; j >= 0; --j) {
                    v.push(parseInt(arr[j]));
                }
            } else {
                v = parseFloat(v);
            }
            this.config[result[i].name] = v;
        }
        console.log("开关状态：", this.config);
        this.sceneEnabled = this.config["scene_limit"].indexOf(this.enterSceneId) < 0;
        console.log("场景enabled：", this.sceneEnabled);
    }

    /**获取开关配置 */
    public static getSwitch(type) {
        // return 1;
        if (!type) {
            return null;
        }
        if (!this.sceneEnabled) {
            return null;
        }
        // return true;//todo:测试用
        return this.config[type];
    }
    /**
     * 设置开关计数器
     * @param type  开关类型
     * @param value 值
     */
    public static setSwitchValue(type, value) {
        if (!this.sceneEnabled) return;
        if (undefined === this.config[type]) return;
        this.config[type] = value;
    }

}
