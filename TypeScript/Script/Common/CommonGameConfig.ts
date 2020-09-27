
/**
 * 全局使用的游戏配置，只包含静态数据
 * 
 * 基类中包含了适用于框架的游戏通用的配置，可在子类中根据实际游戏自定义新的属性
 */
export default class CommonGameConfig {

    /**游戏名称字符串 */
    public static gameName: string = "myGame";

    //音效设置
    //#region 音效设置
    protected static _audioConfig: AudioConfig = null;
    protected static initAudioConfig() {
        if (!this._audioConfig) {
            let config = cc.sys.localStorage.getItem("audioConfig");
            if (!!config) {
                this._audioConfig = JSON.parse(config);
            } else {
                this._audioConfig = new AudioConfig();
            }
        }
    }
    public static get audioConfig() {
        this.initAudioConfig();
        return this._audioConfig;
    }
    public static set audioConfig(config) {
        this.initAudioConfig();
        this._audioConfig.bgm = !!config.bgm;
        this._audioConfig.effect = !!config.effect;
        cc.sys.localStorage.setItem("audioConfig", JSON.stringify(this._audioConfig));
    }
    //#endregion

    //#region 与设备相关的设置
    protected static _driveConfig: DriveConfig = null;
    protected static initDriveConfig() {
        if (!this._driveConfig) {
            let config = cc.sys.localStorage.getItem("driveConfig");
            if (!!config) {
                this._driveConfig = JSON.parse(config);
            } else {
                this._driveConfig = new DriveConfig();
            }
        }
    }
    public static get driveConfig() {
        this.initDriveConfig();
        return this._driveConfig;
    }
    public static set driveConfig(config) {
        this.initDriveConfig();
        this._driveConfig.vibrate = !!config.vibrate;
        cc.sys.localStorage.setItem("driveConfig", JSON.stringify(this._driveConfig));
    }
    //#endregion

}
/**音效配置 */
class AudioConfig {
    /**是否可播放背景音乐 */
    public bgm: boolean = true;
    /**是否可播放特效 */
    public effect: boolean = true;
}
class DriveConfig {
    public vibrate: boolean = true;
}