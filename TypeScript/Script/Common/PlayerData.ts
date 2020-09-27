import EventManager from "./EventManager";
import PlayerDataTemplate, { UserInfo } from "../GameSpecial/PlayerDataTemplate";
import GameConfig from "../GameSpecial/GameConfig";
import { EventType } from "../GameSpecial/GameEventType";
import http_request from "./http_request";
import GamePlatform from "../Platform/GamePlatform";
import { GamePlatformType } from "../Platform/GamePlatformType";

//玩家数据管理器
export default class PlayerData {
    protected static Data: any = {};
    public static init() {
        this.Data = PlayerDataTemplate.getData();
        let resetPlayerData = cc.sys.localStorage.getItem(GameConfig.gameName + "needResetPlayerData7");
        if (!resetPlayerData || !JSON.parse(resetPlayerData)) {
            let v = cc.sys.localStorage.getItem(GameConfig.gameName + "PlayerData");
            if (!!v) {
                v = JSON.parse(v);
                this.copyObject(this.Data, v);
            }
        }
        cc.sys.localStorage.setItem(GameConfig.gameName + "needResetPlayerData7", JSON.stringify(false));

        this.resetTrySkin();
        this.onEvents();
        this.loadData();
    }
    protected static copyObject(target: any, src: any) {
        for (let key in src) {
            switch (typeof src[key]) {
                case "number":
                case "boolean":
                case "string": {
                    target[key] = src[key];
                    break;
                }
                case "object": {
                    if (Array.isArray(src[key])) {
                        target[key] = [].concat(src[key]);
                    } else {
                        if (undefined == target[key]) target[key] = {};
                        this.copyObject(target[key], src[key]);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    /**从服务端拉取数据 */
    protected static loadData() {
        if (GamePlatform.instance.Config.type == GamePlatformType.PC) {
            EventManager.emit(EventType.PlayerDataEvent.dataLoaded);
            return;
        }
        let url = "v1.1/api/Utils/getData.html";
        let sessid = UserInfo.sessid;
        http_request.getInstance().postRequest(http_request.url_login + url, { "sessid": sessid }, (userinfo_res: any) => {
            console.log('userinfo_res', userinfo_res)
            let data = userinfo_res.result.data;
            console.log('uesr data', data);
            if (data) {
                if (typeof data === "string") {
                    this.Data = JSON.parse(data);
                } else {
                    this.Data = data;
                }
            }
            this.resetTrySkin();
            if (this.Data.fristLoginTimer <= 0) {
                console.log('记录第一次登陆时间戳', Date.now());
                this.Data.fristLoginTimer = Date.now();
                this.saveData();
            }
            EventManager.emit(EventType.PlayerDataEvent.dataLoaded);
        });
    }
    protected static onEvents() {
        EventManager.on(EventType.PlayerDataEvent.updatePlayerData, this.onUpdatePlayerData, this);
        EventManager.on(EventType.PlayerDataEvent.trySkinEnd, this.onTrySkinEnd, this);

    }
    /**
     * 更新玩家数据
     * @param data 
     * @param {string} [data.attribute] 要修改的数据的字段名称，用“.”号分割多级子属性，例如“gameData.curLevel”
     * @param {number|string} [data.value] 属性改变的量
     * @param {string} [data.mode] 数据修改方式
     * @param {boolean} [data.save] 是否需要及时保存数据，默认为true
     * @param {boolean} [data.emit] 是否需要及时通知外界玩家数据已变化，默认为true
     */
    protected static onUpdatePlayerData(data: { attribute: string, value: number | string, mode: string, save?: boolean, emit?: boolean }) {
        if (data.attribute.indexOf(".") < 0) {
            this.updateData(this.Data, data.attribute, data.value, data.mode);
        } else {
            let str = data.attribute.split(".");
            let playerData = this.Data;
            for (let i = 0; i < str.length - 1; ++i) {
                if (undefined != playerData[str[i]]) {
                    playerData = playerData[str[i]];
                } else {
                    cc.log("修改玩家数据失败，玩家数据未定义对应属性：" + str[i]);
                    cc.log(data);
                    return;
                }
            }
            this.updateData(playerData, str[str.length - 1], data.value, data.mode);
        }
        if (undefined === data.save || true === data.save) {
            this.saveData();
        }
        if (undefined === data.emit || true === data.emit) {
            //数据更新后发送事件，UI组件自动处理
            EventManager.emit(EventType.PlayerDataEvent.playerDataChanged, {
                attribute: data.attribute,              //数据名称
                value: this.getData(data.attribute),    //变更后的数据值
            });
        }
    }
    /**
     * 更新对象的字段值
     * @param data      字段所属对象
     * @param attribute 字段名称
     * @param value     要改变的值
     * @param mode      改变方式
     */
    protected static updateData(data: any, attribute: string, value: any, mode: string) {
        let v = value;
        if (typeof value == "string") {
            v = parseFloat(value);
            if (isNaN(v)) {
                v = value;
            }
        }
        switch (mode) {
            case "+": {
                data[attribute] += v;
                break;
            }
            case "-": {
                data[attribute] -= v;
                break;
            }
            case "*": {
                data[attribute] *= v;
                break;
            }
            case "=": {
                data[attribute] = v;
                break;
            }
            case "push": {
                data[attribute].push(v);
                break;
            }
            default: {
                cc.log("数据修改失败，未定义的数据修改方式：" + mode);
                break;
            }
        }
    }
    /**
     * 获取玩家数据
     * @param attribute 字段名称，用“.”号分割多级子属性，例如“gameData.curLevel”
     */
    public static getData(attribute: string) {
        if (!attribute) {
            return this.Data;
        }
        if (attribute.indexOf(".") < 0) {
            return this.Data[attribute];
        }
        let str = attribute.split(".");
        let playerData = this.Data;
        for (let i = 0; i < str.length; ++i) {
            if (undefined != playerData[str[i]]) {
                playerData = playerData[str[i]];
            } else {
                return playerData;
            }
        }
        return playerData;
    }
    //存储数据，将在本地存储，并发送给服务端
    protected static saveData() {
        cc.sys.localStorage.setItem(GameConfig.gameName + "PlayerData", JSON.stringify(this.Data));
        //todo: 发送给服务端
        let url = "v1.1/api/Utils/saveData.html";
        http_request.getInstance().postRequest(http_request.url_login + url, { "sessid": UserInfo.sessid, data: JSON.stringify(this.Data) });
    }



    //一些通用的快捷方法：
    //金币
    /**增加金币 */
    public static addGold(gold: number) {
        this.Data.gameData.asset.gold += gold;
        EventManager.emit(EventType.PlayerDataEvent.playerDataChanged, {
            type: "gameData",                        //数据类型
            attribute: "gameData.asset.gold",        //数据名称
            value: this.Data.gameData.asset.gold,    //变更后的数据值
        });
    }
    /**
     * 快捷方法：减少金币
     * @param gold  减少的金币数量
     */
    public static subGold(gold: number) {
        if (gold <= this.Data.gameData.asset.gold) {
            this.Data.gameData.asset.gold -= gold;
        } else {
            this.Data.gameData.asset.gold = 0;
        }
        EventManager.emit(EventType.PlayerDataEvent.playerDataChanged, {
            type: "gameData",                        //数据类型
            attribute: "gameData.asset.gold",        //数据名称
            value: this.Data.gameData.asset.gold,    //变更后的数据值
        });
    }

    //皮肤
    /**
     * 获取当前使用的皮肤，激活了试用皮肤时，将返回试用皮肤
     * @param type 皮肤类型
     */
    public static getCurSkinId(type) {
        let data: any = this.Data.gameData[type];
        let id = data.try;
        if (id == -1) {
            id = data.cur;
        }
        return id;
    }
    /**
     * 解锁皮肤
     * @param type  皮肤类型
     * @param id    皮肤id
     */
    public static unlockSkin(type, id) {
        let data = this.Data.gameData[type];
        if (data.owned.indexOf(id) >= 0) {
            return;
        }
        data.owned.push(id);
        EventManager.emit(EventType.PlayerDataEvent.playerDataChanged, {
            type: "gameData",                           //数据类型
            attribute: "gameData." + type + ".owned",   //数据名称
            value: data.owned,                          //变更后的数据值
        });
    }
    /**
     * 设置指定皮肤为当前使用的皮肤
     * @param type  皮肤类型
     * @param id    皮肤id
     */
    public static setCurSkin(type, id) {
        let data = this.Data.gameData[type];
        if (data.cur == id) return;
        data.cur = id;
        EventManager.emit(EventType.PlayerDataEvent.playerDataChanged, {
            type: "gameData",                           //数据类型
            attribute: "gameData." + type + ".cur",   //数据名称
            value: data.cur,                          //变更后的数据值
        });
    }
    /**
     * 试用皮肤
     * @param type  皮肤类型
     * @param id    皮肤id
     */
    protected static onTrySkin(type, id) {
        this.Data.gameData[type].try = id;
    }
    /**
     * 皮肤试用结束
     * @param type  皮肤类型
     */
    protected static onTrySkinEnd(type) {
        this.Data.gameData[type].try = -1;
    }
    protected static resetTrySkin() {
        let data = this.Data.gameData;
        for (let key in data) {
            if (typeof data[key] == "object" && !!data[key].try) {
                data[key].try = -1;
            }
        }
    }


}
