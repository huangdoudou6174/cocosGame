/**全局节点对象池 */
export default class GlobalPool {
    private static allPools: { [nodeName: string]: AutoNodePool } = {};
    /**
     * 创建新的对象池
     * @param nodeName 节点名称
     * @param prefab 节点预制资源
     * @param scriptName 节点上挂载的脚本名称，必须实现接口IPoolObject，用于处理节点进出对象池时的逻辑
     */
    public static createPool(nodeName: string, prefab: cc.Prefab, scriptName?: string): void {
        if (this.allPools.hasOwnProperty(nodeName)) {
            console.warn("已存在该名称的对象池，请确认是否名字冲突：", nodeName);
            return;
        }
        this.allPools[nodeName] = new AutoNodePool(prefab, scriptName);
    }
    /**
     * 获取实例
     * @param nodeName 要获取的节点名称
     * @param data 节点需要的数据
     * @returns {cc.Node} 按传入的数据进行设置的节点实例
     */
    public static get(nodeName: string, data?: any): cc.Node {
        if (!this.allPools[nodeName]) {
            console.error("未创建对应名称的对象池，获取实例失败：", nodeName);
            return null;
        }
        return this.allPools[nodeName].get(data);
    }
    /**
     * 回收节点
     * @param nodeName 节点名称，与节点要放回的对象池名称对应
     * @param node 回收的节点
     */
    public static put(node: cc.Node, nodeName?: string) {
        if (!nodeName) nodeName = node.name;
        if (!this.allPools[nodeName]) {
            console.warn("未创建对应名称的对象池，将销毁节点：", nodeName);
            let js = node.getComponent(nodeName);
            if (!!js && !!js.unuse) {
                js.unuse();
            }
            node.destroy();
            return;
        }
        this.allPools[nodeName].put(node);
    }
    /**
     * 回收节点的所有子节点
     * @param node 
     * @param sameNode  是否所有子节点为相同名字的节点，为true时可极轻微地加快回收速度
     */
    public static putAllChildren(node: cc.Node, sameNode: boolean = false) {
        if (node.children.length == 0) return;
        if (!!sameNode) {
            let nodeName = node.children[0].name;
            if (!!this.allPools[nodeName]) {
                let pool = this.allPools[nodeName];
                for (let i = node.children.length - 1; i >= 0; --i) {
                    pool.put(node.children[i]);
                }
            } else {
                for (let i = node.children.length - 1; i >= 0; --i) {
                    let js = node.children[i].getComponent(nodeName) as any;
                    if (!!js && !!js.unuse) {
                        js.unuse();
                    }
                    node.children[i].destroy();
                }
            }
        } else {
            for (let i = node.children.length - 1; i >= 0; --i) {
                let child = node.children[i];
                this.put(child);
            }
        }
    }
    /**
     * 清空对象池缓存，未指定名称时将清空所有的对象池
     * @param nodeName 对象池名称
     */
    public static clear(nodeName?: string) {
        if (!!nodeName) {
            if (this.allPools.hasOwnProperty(nodeName)) {
                this.allPools[nodeName].clear();
                delete this.allPools[nodeName];
            }
        } else {
            for (let key in this.allPools) {
                this.allPools[key].clear();
            }
            this.allPools = {};
        }
    }

    /**获取指定对象池中的可用对象数量 */
    public static getSize(nodeName: string) {
        if (!!this.allPools[nodeName]) {
            return this.allPools[nodeName].count;
        } else {
            return 0;
        }
    }
    /**
     * 预先创建指定数量的对象并存储在对象池中
     * @param nodeName  与预制件名称对应的对象池名称
     * @param count     要创建的对象数量
     */
    public static preCreate(nodeName: string, count: number) {
        if (!!this.allPools[nodeName]) {
            this.allPools[nodeName].preCreate(count);
        } else {
            console.warn("不存在对应名称的对象池，无法预先创建实例：", nodeName);
        }
    }
}

/**
 * 节点对象池，对象池为空时可自动实例化新的对象
 */
export class AutoNodePool {
    private prefab: cc.Prefab;
    private scripteName: string;
    private pool: cc.NodePool;
    /**
     * 节点对象池，对象池为空时可自动实例化新的对象
     * @param prefab 预制
     * @param scriptName 节点挂载的脚本，管理节点进出对象池时的逻辑，必须实现接口IPoolObject
     */
    constructor(prefab: cc.Prefab, scriptName?: string) {
        this.prefab = prefab;
        this.scripteName = scriptName;
        this.pool = new cc.NodePool(scriptName);
    }

    /**
     * 获取实例
     * @param data 给实例赋值的数据
     */
    public get(data?: any): cc.Node {
        let item: cc.Node = this.pool.get(data);
        if (!item) {
            item = cc.instantiate(this.prefab);
            if (!!this.scripteName) {
                let s: IPoolObject = item.getComponent(this.scripteName);
                if (!!s) {
                    s.init(data);
                } else {
                    this.scripteName = null;
                }
            }
        }
        return item;
    }

    /**
     * 回收节点
     * @param item
     */
    public put(item: cc.Node) {
        this.pool.put(item);
    }

    /**
     * 清空对象池，将销毁所有缓存的实例
     */
    public clear() {
        this.pool.clear();
    }

    /**对象池中已存储的对象数量 */
    public get count() {
        return this.pool.size();
    }
    /**预先创建指定数量的对象存储在对象池中 */
    public preCreate(count: number) {
        let c = count - this.count;
        if (c <= 0) return;
        for (let i = 0; i < c; ++i) {
            let item = cc.instantiate(this.prefab);
            if (!!this.scripteName) {
                let s: IPoolObject = item.getComponent(this.scripteName);
                if (!!s) {
                    s.init();
                } else {
                    this.scripteName = null;
                }
            }
            this.put(item);
        }
    }
}

//可放入对象池的对象的接口
export interface IPoolObject {
    /**
     * 对象池中创建新的实例时，将调用此函数初始化实例
     */
    init: (data?: any) => void;
    /**
     * 对象池中已经存在的实例重新取出使用时，将调用此函数
     */
    reuse: (data?: any) => void;
    /**
     * 节点放回对象池时将调用的函数
     */
    unuse: () => void;
}