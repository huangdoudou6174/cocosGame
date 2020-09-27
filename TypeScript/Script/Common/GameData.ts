import { GlobalEnum } from "../GameSpecial/GlobalEnum";
import LevelDataTemplate from "../GameSpecial/LevelDataTemplate";

/**游戏JSON数据管理器 */
export default class GameData {
    /**
     * 记录所有游戏数据，
     * key:数据类型枚举值；
     * value:数据
     */
    private static data: { [key: string]: any } = {};
    public static init() {
        this.data = {};
        //一些常见的数据类型，使用默认数据进行初始化
        //关卡：
        this.data[GlobalEnum.GameDataType.levelData] = LevelDataTemplate.getData();

    }

    public static setData(res: any[], urls: string[]) {
        for (let key in GlobalEnum.GameDataType) {
            let index = this.getUrlsIndex(GlobalEnum.GameDataType[key], urls);
            if (index >= 0) {
                this.data[GlobalEnum.GameDataType[key]] = res[index].json;
            } else {
                console.warn("数据类型不存在：", GlobalEnum.GameDataType[key]);
            }
        }
        //数据从数组转换为对象
        for (let key in GlobalEnum.GameDataType) {
            let type = GlobalEnum.GameDataType[key];
            if (!!this.data[type] && Array.isArray(this.data[type])) {
                let arr = this.data[type];
                let d = {};
                for (let i = arr.length - 1; i >= 0; --i) {
                    d[arr[i].id] = arr[i];
                }
                this.data[type] = d;
            }
        }
    }
    /**获取数据类型字符串在资源url数组中的索引 */
    private static getUrlsIndex(name: string, urls: string[]): number {
        for (let i = urls.length - 1; i >= 0; --i) {
            if (urls[i].indexOf(name) >= 0) {
                return i;
            }
        }
        return -1;
    }

    /**添加记录数据 */
    public static addData(type, data: any) {
        if (!!this.data[type]) {
            console.warn("对应类型的数据已经存在，请检查类型是否重名:", type);
            return;
        }
        this.data[type] = data;
    }

    /**
     * 获取游戏数据
     * @param type  数据类型枚举值
     * @param key   需要的具体数据
     */
    public static getData(type, key?: any) {
        if (undefined === this.data[type]) {
            console.warn("不存在对应类型的数据：", type);
            return null;
        }
        if (undefined === key) {
            return this.data[type];
        } else {
            return this.data[type][key];
        }
    }

    //一些常见的数据的快捷获取方法
    /**关卡数据 */
    public static getLevelData(lv: number) {
        let data = this.data[GlobalEnum.GameDataType.levelData];
        if (!data) {
            cc.log("不存在关卡数据，使用示例数据");
            return LevelDataTemplate.getData();//不存在关卡数据时，使用示例关卡数据
        }
        //超出关卡数时随机
        if (!data[lv]) {
            let keys = Object.keys(data);
            let index = Math.round(Math.random() * (keys.length - 1));
            if (parseInt(keys[index]) <= 3) {
                cc.log("关卡" + lv + "不存在数据，使用随机关卡数据：" + keys[keys.length - 1]);
                return data[keys[keys.length - 1]];
            } else {
                cc.log("关卡" + lv + "不存在数据，使用随机关卡数据：" + keys[index]);
                return data[keys[index]];
            }
        } else {
            return data[lv];
        }
    }

}