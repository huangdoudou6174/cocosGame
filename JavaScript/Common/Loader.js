
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/Loader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a955/QqF9EL5cMcrfgxR6s', 'Loader');
// myGame/Script/Common/Loader.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = require("./EventManager");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var GameConfig_1 = require("../GameSpecial/GameConfig");
var GamePlatform_1 = require("../Platform/GamePlatform");
var GamePlatformType_1 = require("../Platform/GamePlatformType");
//本地/远程资源加载器
var Loader = /** @class */ (function () {
    function Loader() {
    }
    Loader.init = function () {
        this.dirAsset = {};
        this.singleAsset = {};
        this.serverAsset = {};
        this.subpackageRecords = {};
        this.rootUrl = GameConfig_1.default.resourceUrl + GameConfig_1.default.serverGameName + "/";
        this.onEvents();
    };
    Loader.onEvents = function () {
    };
    /**显示进度条：发送事件，通知UI节点显示进度 */
    Loader.showProgressBar = function (rate) {
        if (undefined === rate) {
            rate = 0;
        }
        this.showMask();
        EventManager_1.default.emit(GameEventType_1.EventType.LoadAssetEvent.showProgress, rate);
    };
    /**
     * 根据资源加载进度更新进度条
     * @param completedCount    已加载完成的资源数量
     * @param totalCount        要加载的资源总数量
     * @param item              当前加载完成的资源
     */
    Loader.updateProgress = function (completedCount, totalCount, item) {
        var rate = completedCount / totalCount;
        if (rate > 1)
            rate = 1;
        EventManager_1.default.emit(GameEventType_1.EventType.LoadAssetEvent.updateProgress, rate);
    };
    Loader.hideProgressBar = function (count) {
        if (count === void 0) { count = 1; }
        EventManager_1.default.emit(GameEventType_1.EventType.LoadAssetEvent.hideProgress);
        this.hideMask(count);
    };
    //显示遮罩，只屏蔽触摸事件，不显示进度条，不变暗屏幕
    Loader.showMask = function (count) {
        if (count === void 0) { count = 1; }
        EventManager_1.default.emit(GameEventType_1.EventType.UIEvent.showTouchMask, count);
    };
    Loader.hideMask = function (count) {
        if (count === void 0) { count = 1; }
        EventManager_1.default.emit(GameEventType_1.EventType.UIEvent.hideTouchMask, count);
    };
    /**
    * 加载单个资源
    * @param url    资源完整的路径名称，不包含后缀
    * @param cb     资源加载完成后的回调
    * @param mask   加载过程中是否阻挡玩家触摸操作，默认阻挡
    */
    Loader.loadRes = function (url, cb, mask) {
        var _this = this;
        if (!!this.singleAsset[url]) {
            setTimeout(function () {
                cb(_this.singleAsset[url]);
            }, 0);
        }
        else {
            if (undefined === mask) {
                mask = true;
            }
            if (mask) {
                this.showMask();
            }
            cc.loader.loadRes(url, function (err, res) {
                if (mask) {
                    _this.hideMask();
                }
                if (err) {
                    cc.error(err.message || err);
                    cb(null);
                    return;
                }
                _this.singleAsset[url] = res;
                cb(res);
            });
        }
    };
    /**
     * 加载整个文件夹内的资源
     * @param dir   文件夹路径
     * @param cb    加载完成回调
     * @param type  资源类型
     * @param mask  加载过程中是否显示加载进度并阻挡玩家触摸操作，默认为true
     */
    Loader.loadResDir = function (dir, cb, type, mask) {
        var _this = this;
        if (!!this.dirAsset[dir]) {
            setTimeout(function () {
                cb(_this.dirAsset[dir]);
            }, 0);
            return;
        }
        var assetType = null;
        if (undefined === type) {
            mask = true;
        }
        else if (typeof type === "boolean") {
            mask = !!type;
        }
        else {
            assetType = type;
            if (undefined === mask) {
                mask = true;
            }
        }
        if (mask) {
            this.showProgressBar();
        }
        if (!!assetType) {
            cc.loader.loadResDir(dir, assetType, this.updateProgress.bind(this), function (err, arr, urls) {
                if (mask) {
                    _this.hideProgressBar();
                }
                if (err) {
                    cc.log(err);
                    cb(null);
                    return;
                }
                _this.dirAsset[dir] = arr;
                for (var i = arr.length - 1; i >= 0; --i) {
                    _this.singleAsset[urls[i]] = arr[i];
                }
                cb(_this.dirAsset[dir]);
            });
        }
        else {
            cc.loader.loadResDir(dir, this.updateProgress.bind(this), function (err, arr, urls) {
                if (mask) {
                    _this.hideProgressBar();
                }
                if (err) {
                    cc.log(err);
                    cb(null);
                    return;
                }
                _this.dirAsset[dir] = arr;
                for (var i = arr.length - 1; i >= 0; --i) {
                    _this.singleAsset[urls[i]] = arr[i];
                }
                cb(_this.dirAsset[dir]);
            });
        }
    };
    /**加载资源数组 */
    Loader.loadResArray = function (urls, cb, mask) {
        var _this = this;
        var assets = [];
        var arr = [];
        for (var i = urls.length - 1; i >= 0; --i) {
            var res = this.getAsset(urls[i]);
            if (!!res) {
                assets.push(res);
            }
            else {
                arr.push(urls[i]);
            }
        }
        if (arr.length == 0) {
            setTimeout(function () {
                cb(assets);
            }, 0);
            return;
        }
        if (undefined === mask) {
            mask = true;
        }
        if (mask) {
            this.showProgressBar();
        }
        cc.loader.loadResArray(arr, this.updateProgress.bind(this), function (err, res) {
            if (mask) {
                _this.hideProgressBar();
            }
            if (!!err) {
                console.log(err);
                cb(null);
                return;
            }
            for (var i = arr.length - 1; i >= 0; --i) {
                _this.singleAsset[arr[i]] = res[i];
                assets.push(res[i]);
            }
            cb(assets);
        });
    };
    /**
     * 从远程地址加载单个资源
     * @param serverUrl 远程资源所属分类枚举值，与资源所在路径一致
     * @param url 资源名称，需包含文件类型后缀
     * @param cb 资源加载完成后的回调，需自行判定asset类型
     */
    Loader.load = function (serverUrl, url, cb, mask) {
        var _this = this;
        if (!!this.serverAsset[serverUrl] && !!this.serverAsset[serverUrl][url]) {
            setTimeout(function () {
                cb(_this.serverAsset[serverUrl][url]);
            }, 0);
        }
        else {
            if (!this.serverAsset[serverUrl])
                this.serverAsset[serverUrl] = {};
            if (undefined === mask) {
                mask = true;
            }
            if (mask) {
                this.showMask();
            }
            cc.loader.load(this.rootUrl + serverUrl + url, function (err, res) {
                if (mask) {
                    _this.hideMask();
                }
                if (!!err) {
                    console.warn("资源下载失败，");
                    console.warn(err);
                    cb(null);
                    return;
                }
                _this.serverAsset[serverUrl][url] = res;
                cb(res);
            });
        }
    };
    /**
     * 从远程地址加载多个资源
     * @param serverUrl 远程资源所属分类枚举值，与资源所在路径一致
     * @param urls 资源名称数组，需包含文件类型后缀
     * @param cb 资源加载完成后的回调，需注意：assets数组中资源的顺序与urls的顺序可能不一致
     */
    Loader.loadArray = function (serverUrl, urls, cb, mask) {
        var _this = this;
        var assets = [];
        var arr = [];
        var tempUrls = [];
        var root = this.rootUrl + serverUrl;
        if (!!this.serverAsset[serverUrl]) {
            for (var i = urls.length - 1; i >= 0; --i) {
                var res = this.serverAsset[serverUrl][urls[i]];
                if (!!res) {
                    assets.push(res);
                }
                else {
                    arr.push(root + urls[i]);
                    tempUrls.push(urls[i]);
                }
            }
        }
        else {
            for (var i = urls.length - 1; i >= 0; --i) {
                arr.push(root + urls[i]);
            }
            tempUrls = [].concat(urls);
        }
        if (arr.length == 0) {
            setTimeout(function () {
                cb(assets);
            }, 0);
            return;
        }
        if (undefined === mask) {
            mask = true;
        }
        if (mask) {
            this.showProgressBar();
        }
        if (undefined === this.serverAsset[serverUrl])
            this.serverAsset[serverUrl] = {};
        cc.loader.load(arr, this.updateProgress.bind(this), function (err, res) {
            if (mask) {
                _this.hideProgressBar();
            }
            if (!!err) {
                console.log(err);
                cb(null);
                return;
            }
            for (var i = tempUrls.length - 1; i >= 0; --i) {
                var asset = res.getContent(tempUrls[i]);
                _this.serverAsset[serverUrl][tempUrls[i]] = asset;
                assets.push(asset);
            }
            cb(assets);
        });
    };
    /**
     * 获取已加载的资源
     * @param url 资源路径
     * @param serverUrl 资源为从远程服务端加载时，需指定远程资源分类
     */
    Loader.getAsset = function (url, serverUrl) {
        if (undefined === serverUrl) {
            if (!this.singleAsset[url]) {
                console.warn("尚未加载资源：", url);
                return null;
            }
            return this.singleAsset[url];
        }
        else {
            if (!this.serverAsset[serverUrl] || !this.serverAsset[serverUrl][url]) {
                console.warn("尚未加载资源：", serverUrl + " " + url);
                return null;
            }
            return this.serverAsset[serverUrl][url];
        }
    };
    /**
     * 获取已加载的文件夹下的全部资源
     * @param url 文件夹路径
     * @param serverUrl 若资源是从远程服务端下载的，需指定远程服务端的文件夹名称
     */
    Loader.getAssets = function (url, serverUrl) {
        var assets = [];
        if (undefined === serverUrl) {
            //从本地获取的资源
            for (var key in this.singleAsset) {
                var index = key.indexOf(url);
                if (index >= 0) {
                    assets.push(this.singleAsset[key]);
                }
            }
            return assets;
        }
        else {
            //从服务器获取的资源
            if (this.serverAsset[serverUrl]) {
                for (var key in this.serverAsset[serverUrl]) {
                    if (key.indexOf(url) >= 0) {
                        assets.push(this.serverAsset[serverUrl][key]);
                    }
                }
            }
            return assets;
        }
    };
    /**
     * 获取SpriteFrame资源
     * @param url 本地资源：完整的资源路径和资源文件名，不需要后缀；远程资源：资源名称，带后缀
     * @param serverUrl 若资源是从远程服务端下载的，需指定远程服务端的文件夹名称
     */
    Loader.getSpriteFrame = function (url, serverUrl) {
        var res = this.getAsset(url, serverUrl);
        if (!res) {
            return;
        }
        if (res instanceof cc.Texture2D) {
            return new cc.SpriteFrame(res);
        }
        else if (res instanceof cc.SpriteFrame) {
            return res;
        }
        else {
            console.log("指定的资源不是图片类型");
            return null;
        }
    };
    /**
       * 获取整个文件夹下的全部spriteFrame
       * @param url 本地资源：完整的资源路径和资源文件名，不需要后缀；远程资源：资源名称，带后缀
       * @param serverUrl 若资源是从远程服务端下载的，需指定远程服务端的文件夹名称
       */
    Loader.getSpriteFrameList = function (url, serverUrl) {
        var data = {};
        if (undefined === serverUrl) {
            //从本地获取的资源
            for (var key in this.singleAsset) {
                var index = key.indexOf(url);
                if (index >= 0) {
                    var res = this.singleAsset[key];
                    if (res instanceof cc.Texture2D) {
                        data[key] = new cc.SpriteFrame(res);
                    }
                    else if (res instanceof cc.SpriteFrame) {
                        data[key] = res;
                    }
                }
            }
        }
        else {
            //从服务器获取的资源
            if (this.serverAsset[serverUrl]) {
                for (var key in this.serverAsset[serverUrl]) {
                    var index = key.indexOf(url);
                    if (index >= 0) {
                        var res = this.serverAsset[serverUrl][key];
                        if (res instanceof cc.Texture2D) {
                            data[key] = new cc.SpriteFrame(res);
                        }
                        else if (res instanceof cc.SpriteFrame) {
                            data[key] = res;
                        }
                    }
                }
            }
        }
        return data;
    };
    /**
     * 加载子包资源
     * @param name 子包名称
     * @param cb 回调函数，只需后台预加载资源时，传入null即可
     * @param mask 加载过程中是否需要显示进度条并阻断玩家触摸操作，当需要加载完成后立刻使用子包中的资源时，请传入true
     */
    Loader.loadSubpackage = function (name, cb, mask) {
        var _this = this;
        switch (GamePlatform_1.default.instance.Config.type) {
            case GamePlatformType_1.GamePlatformType.WX: {
                break;
            }
            default: {
                setTimeout(function () {
                    if (!!cb)
                        cb();
                }, 0);
                return;
            }
        }
        if (undefined === mask) {
            mask = false;
        }
        var record = this.subpackageRecords[name];
        if (!record) {
            record = new SubpackageRecord(name, cb);
            this.subpackageRecords[name] = record;
        }
        //加载中，添加回调
        if (record.loading) {
            if (mask)
                this.showSubpackageProgress();
            record.pushCb(cb, mask);
            return;
        }
        //加载完成，执行回调
        if (record.finished) {
            setTimeout(function () {
                cb();
            }, 0);
            return;
        }
        //尚未加载，开始加载
        if (record.inited) {
            if (mask)
                this.showSubpackageProgress();
            record.loadStart();
            cc.loader.downloader.loadSubpackage(name, function (err) {
                if (err) {
                    cc.error(err);
                    return;
                }
                console.log("子包加载完成：", name);
                _this.hideSubpackageProgress();
                // let count = record.maskCount;
                // if (count > 0) this.hideProgressBar(count);
                record.loadFinish();
            });
            return;
        }
    };
    /**显示子包加载进度条 */
    Loader.showSubpackageProgress = function () {
        if (null === this.subpackageProgressTimer) {
            this.showProgressBar();
            this.subpackageProgress = 0;
            this.subpackageProgressTimer = setInterval(this.updateSubpackageProgress.bind(this), 100);
        }
    };
    Loader.updateSubpackageProgress = function () {
        this.subpackageProgress += 0.03;
        if (this.subpackageProgress >= 1) {
            this.subpackageProgress = 0;
        }
        EventManager_1.default.emit(GameEventType_1.EventType.LoadAssetEvent.updateProgress, this.subpackageProgress);
    };
    Loader.hideSubpackageProgress = function () {
        if (null !== this.subpackageProgressTimer) {
            clearInterval(this.subpackageProgressTimer);
            this.subpackageProgressTimer = null;
            this.subpackageProgress = 0;
            this.hideProgressBar();
        }
    };
    /**子包加载状态记录 */
    Loader.subpackageRecords = {};
    Loader.subpackageProgressTimer = null;
    Loader.subpackageProgress = 0;
    return Loader;
}());
exports.default = Loader;
var SubpackageRecord = /** @class */ (function () {
    function SubpackageRecord(name, cb) {
        this.name = name;
        this.state = LoadState.inited;
        this.cbs = [];
        this.pushCb(cb);
        this.maskCount = 0;
    }
    SubpackageRecord.prototype.pushCb = function (cb, mask) {
        this.cbs.push(cb);
        if (!!mask)
            this.maskCount++;
    };
    SubpackageRecord.prototype.loadStart = function () {
        this.state = LoadState.loading;
    };
    SubpackageRecord.prototype.loadFinish = function () {
        while (this.cbs.length > 0) {
            var cb = this.cbs.shift();
            if (!!cb)
                cb();
        }
        this.state = LoadState.finished;
        this.maskCount = 0;
    };
    Object.defineProperty(SubpackageRecord.prototype, "inited", {
        get: function () {
            return this.state === LoadState.inited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubpackageRecord.prototype, "loading", {
        get: function () {
            return this.state === LoadState.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubpackageRecord.prototype, "finished", {
        get: function () {
            return this.state === LoadState.finished;
        },
        enumerable: true,
        configurable: true
    });
    return SubpackageRecord;
}());
/**资源加载状态 */
var LoadState;
(function (LoadState) {
    /**已准备好加载 */
    LoadState[LoadState["inited"] = 1] = "inited";
    /**正在加载中 */
    LoadState[LoadState["loading"] = 2] = "loading";
    /**已加载完成 */
    LoadState[LoadState["finished"] = 3] = "finished";
})(LoadState || (LoadState = {}));

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcTG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsOERBQXlEO0FBQ3pELHdEQUFtRDtBQUNuRCx5REFBb0Q7QUFDcEQsaUVBQWdFO0FBRWhFLFlBQVk7QUFDWjtJQUFBO0lBK2RBLENBQUM7SUFyZGlCLFdBQUksR0FBbEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQVUsQ0FBQyxXQUFXLEdBQUcsb0JBQVUsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ2dCLGVBQVEsR0FBekI7SUFDQSxDQUFDO0lBQ0QsMkJBQTJCO0lBQ1Ysc0JBQWUsR0FBaEMsVUFBaUMsSUFBYTtRQUMxQyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLHNCQUFZLENBQUMsSUFBSSxDQUFDLHlCQUFTLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDYyxxQkFBYyxHQUEvQixVQUFnQyxjQUFzQixFQUFFLFVBQWtCLEVBQUUsSUFBUztRQUNqRixJQUFJLElBQUksR0FBRyxjQUFjLEdBQUcsVUFBVSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFHLENBQUM7WUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLHNCQUFZLENB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LEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUNuQyxDQUFDO0lBQ00scUNBQVUsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQUUsRUFBRSxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELHNCQUFXLG9DQUFNO2FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyxxQ0FBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsc0NBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUNMLHVCQUFDO0FBQUQsQ0ExQ0EsQUEwQ0MsSUFBQTtBQUNELFlBQVk7QUFDWixJQUFLLFNBT0o7QUFQRCxXQUFLLFNBQVM7SUFDVixZQUFZO0lBQ1osNkNBQVUsQ0FBQTtJQUNWLFdBQVc7SUFDWCwrQ0FBTyxDQUFBO0lBQ1AsV0FBVztJQUNYLGlEQUFRLENBQUE7QUFDWixDQUFDLEVBUEksU0FBUyxLQUFULFNBQVMsUUFPYiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSBcIi4vRXZlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVDb25maWdcIjtcbmltcG9ydCBHYW1lUGxhdGZvcm0gZnJvbSBcIi4uL1BsYXRmb3JtL0dhbWVQbGF0Zm9ybVwiO1xuaW1wb3J0IHsgR2FtZVBsYXRmb3JtVHlwZSB9IGZyb20gXCIuLi9QbGF0Zm9ybS9HYW1lUGxhdGZvcm1UeXBlXCI7XG5cbi8v5pys5ZywL+i/nOeoi+i1hOa6kOWKoOi9veWZqFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGVyIHtcbiAgICAvKirorrDlvZXmlofku7blpLnot6/lvoTlr7nlupTnmoTotYTmupDmlbDnu4QgKi9cbiAgICBwcm90ZWN0ZWQgc3RhdGljIGRpckFzc2V0OiB7IFtrZXk6IHN0cmluZ106IGNjLkFzc2V0W10gfTtcbiAgICAvKirorrDlvZXmiYDmnInliqDovb3lrozmiJDnmoTotYTmupDvvIzljIXmi6zpgJrov4fmlofku7blpLnliqDovb3nmoTotYTmupAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhdGljIHNpbmdsZUFzc2V0OiB7IFtrZXk6IHN0cmluZ106IGNjLkFzc2V0IH07XG4gICAgLyoq6K6w5b2V5LuO6L+c56iL5pyN5Yqh5Zmo5LiL6L2955qE6LWE5rqQICovXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBzZXJ2ZXJBc3NldDogeyBbZGlyOiBzdHJpbmddOiB7IFtrZXk6IHN0cmluZ106IGNjLkFzc2V0IH0gfTtcbiAgICAvKirov5znqIvmnI3liqHlmajlnLDlnYAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJvb3RVcmw6IHN0cmluZztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5kaXJBc3NldCA9IHt9O1xuICAgICAgICB0aGlzLnNpbmdsZUFzc2V0ID0ge307XG4gICAgICAgIHRoaXMuc2VydmVyQXNzZXQgPSB7fTtcbiAgICAgICAgdGhpcy5zdWJwYWNrYWdlUmVjb3JkcyA9IHt9O1xuICAgICAgICB0aGlzLnJvb3RVcmwgPSBHYW1lQ29uZmlnLnJlc291cmNlVXJsICsgR2FtZUNvbmZpZy5zZXJ2ZXJHYW1lTmFtZSArIFwiL1wiO1xuICAgICAgICB0aGlzLm9uRXZlbnRzKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBzdGF0aWMgb25FdmVudHMoKSB7XG4gICAgfVxuICAgIC8qKuaYvuekuui/m+W6puadoe+8muWPkemAgeS6i+S7tu+8jOmAmuefpVVJ6IqC54K55pi+56S66L+b5bqmICovXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBzaG93UHJvZ3Jlc3NCYXIocmF0ZT86IG51bWJlcikge1xuICAgICAgICBpZiAodW5kZWZpbmVkID09PSByYXRlKSB7XG4gICAgICAgICAgICByYXRlID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dNYXNrKCk7XG4gICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KEV2ZW50VHlwZS5Mb2FkQXNzZXRFdmVudC5zaG93UHJvZ3Jlc3MsIHJhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmoLnmja7otYTmupDliqDovb3ov5vluqbmm7TmlrDov5vluqbmnaFcbiAgICAgKiBAcGFyYW0gY29tcGxldGVkQ291bnQgICAg5bey5Yqg6L295a6M5oiQ55qE6LWE5rqQ5pWw6YePXG4gICAgICogQHBhcmFtIHRvdGFsQ291bnQgICAgICAgIOimgeWKoOi9veeahOi1hOa6kOaAu+aVsOmHj1xuICAgICAqIEBwYXJhbSBpdGVtICAgICAgICAgICAgICDlvZPliY3liqDovb3lrozmiJDnmoTotYTmupBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhdGljIHVwZGF0ZVByb2dyZXNzKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSB7XG4gICAgICAgIGxldCByYXRlID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xuICAgICAgICBpZiAocmF0ZSA+IDEpIHJhdGUgPSAxO1xuICAgICAgICBFdmVudE1hbmFnZXIuZW1pdChFdmVudFR5cGUuTG9hZEFzc2V0RXZlbnQudXBkYXRlUHJvZ3Jlc3MsIHJhdGUpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgc3RhdGljIGhpZGVQcm9ncmVzc0Jhcihjb3VudDogbnVtYmVyID0gMSkge1xuICAgICAgICBFdmVudE1hbmFnZXIuZW1pdChFdmVudFR5cGUuTG9hZEFzc2V0RXZlbnQuaGlkZVByb2dyZXNzKTtcbiAgICAgICAgdGhpcy5oaWRlTWFzayhjb3VudCk7XG4gICAgfVxuICAgIC8v5pi+56S66YGu572p77yM5Y+q5bGP6JS96Kem5pG45LqL5Lu277yM5LiN5pi+56S66L+b5bqm5p2h77yM5LiN5Y+Y5pqX5bGP5bmVXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBzaG93TWFzayhjb3VudDogbnVtYmVyID0gMSkge1xuICAgICAgICBFdmVudE1hbmFnZXIuZW1pdChFdmVudFR5cGUuVUlFdmVudC5zaG93VG91Y2hNYXNrLCBjb3VudCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBzdGF0aWMgaGlkZU1hc2soY291bnQ6IG51bWJlciA9IDEpIHtcbiAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnRUeXBlLlVJRXZlbnQuaGlkZVRvdWNoTWFzaywgY291bnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIOWKoOi9veWNleS4qui1hOa6kFxuICAgICogQHBhcmFtIHVybCAgICDotYTmupDlrozmlbTnmoTot6/lvoTlkI3np7DvvIzkuI3ljIXlkKvlkI7nvIBcbiAgICAqIEBwYXJhbSBjYiAgICAg6LWE5rqQ5Yqg6L295a6M5oiQ5ZCO55qE5Zue6LCDXG4gICAgKiBAcGFyYW0gbWFzayAgIOWKoOi9vei/h+eoi+S4reaYr+WQpumYu+aMoeeOqeWutuinpuaRuOaTjeS9nO+8jOm7mOiupOmYu+aMoVxuICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUmVzKHVybDogc3RyaW5nLCBjYjogKGFzc2V0OiBhbnkpID0+IHZvaWQsIG1hc2s/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICghIXRoaXMuc2luZ2xlQXNzZXRbdXJsXSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2IodGhpcy5zaW5nbGVBc3NldFt1cmxdKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gbWFzaykge1xuICAgICAgICAgICAgICAgIG1hc2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hc2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNYXNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1hc2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSB8fCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNpbmdsZUFzc2V0W3VybF0gPSByZXM7XG4gICAgICAgICAgICAgICAgY2IocmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWKoOi9veaVtOS4quaWh+S7tuWkueWGheeahOi1hOa6kFxuICAgICAqIEBwYXJhbSBkaXIgICDmlofku7blpLnot6/lvoRcbiAgICAgKiBAcGFyYW0gY2IgICAg5Yqg6L295a6M5oiQ5Zue6LCDXG4gICAgICogQHBhcmFtIHR5cGUgIOi1hOa6kOexu+Wei1xuICAgICAqIEBwYXJhbSBtYXNrICDliqDovb3ov4fnqIvkuK3mmK/lkKbmmL7npLrliqDovb3ov5vluqblubbpmLvmjKHnjqnlrrbop6bmkbjmk43kvZzvvIzpu5jorqTkuLp0cnVlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUmVzRGlyKGRpcjogc3RyaW5nLCBjYjogKGFzc2V0czogYW55W10pID0+IHZvaWQsIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQgfCBib29sZWFuLCBtYXNrPzogYm9vbGVhbikge1xuICAgICAgICBpZiAoISF0aGlzLmRpckFzc2V0W2Rpcl0pIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNiKHRoaXMuZGlyQXNzZXRbZGlyXSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXNzZXRUeXBlID0gbnVsbDtcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gdHlwZSkge1xuICAgICAgICAgICAgbWFzayA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICBtYXNrID0gISF0eXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXNzZXRUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IG1hc2spIHtcbiAgICAgICAgICAgICAgICBtYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFhc3NldFR5cGUpIHtcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKGRpciwgYXNzZXRUeXBlLCB0aGlzLnVwZGF0ZVByb2dyZXNzLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgKGVyciwgYXJyLCB1cmxzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzc0JhcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJBc3NldFtkaXJdID0gYXJyO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNpbmdsZUFzc2V0W3VybHNbaV1dID0gYXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNiKHRoaXMuZGlyQXNzZXRbZGlyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKGRpciwgdGhpcy51cGRhdGVQcm9ncmVzcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIChlcnIsIGFyciwgdXJscykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyQXNzZXRbZGlyXSA9IGFycjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaW5nbGVBc3NldFt1cmxzW2ldXSA9IGFycltpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYih0aGlzLmRpckFzc2V0W2Rpcl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoq5Yqg6L296LWE5rqQ5pWw57uEICovXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUmVzQXJyYXkodXJsczogc3RyaW5nW10sIGNiOiAoYXNzZXRzOiBhbnlbXSkgPT4gdm9pZCwgbWFzaz86IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGFzc2V0cyA9IFtdO1xuICAgICAgICBsZXQgYXJyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSB1cmxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5nZXRBc3NldCh1cmxzW2ldKTtcbiAgICAgICAgICAgIGlmICghIXJlcykge1xuICAgICAgICAgICAgICAgIGFzc2V0cy5wdXNoKHJlcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHVybHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNiKGFzc2V0cyk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodW5kZWZpbmVkID09PSBtYXNrKSB7XG4gICAgICAgICAgICBtYXNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0FycmF5KGFyciwgdGhpcy51cGRhdGVQcm9ncmVzcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEhZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaW5nbGVBc3NldFthcnJbaV1dID0gcmVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBhc3NldHMucHVzaChyZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYihhc3NldHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS7jui/nOeoi+WcsOWdgOWKoOi9veWNleS4qui1hOa6kFxuICAgICAqIEBwYXJhbSBzZXJ2ZXJVcmwg6L+c56iL6LWE5rqQ5omA5bGe5YiG57G75p6a5Li+5YC877yM5LiO6LWE5rqQ5omA5Zyo6Lev5b6E5LiA6Ie0XG4gICAgICogQHBhcmFtIHVybCDotYTmupDlkI3np7DvvIzpnIDljIXlkKvmlofku7bnsbvlnovlkI7nvIBcbiAgICAgKiBAcGFyYW0gY2Ig6LWE5rqQ5Yqg6L295a6M5oiQ5ZCO55qE5Zue6LCD77yM6ZyA6Ieq6KGM5Yik5a6aYXNzZXTnsbvlnotcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxvYWQoc2VydmVyVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nLCBjYjogKGFzc2V0KSA9PiB2b2lkLCBtYXNrPzogYm9vbGVhbikge1xuICAgICAgICBpZiAoISF0aGlzLnNlcnZlckFzc2V0W3NlcnZlclVybF0gJiYgISF0aGlzLnNlcnZlckFzc2V0W3NlcnZlclVybF1bdXJsXSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2IodGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdW3VybF0pO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VydmVyQXNzZXRbc2VydmVyVXJsXSkgdGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdID0ge307XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBtYXNrKSB7XG4gICAgICAgICAgICAgICAgbWFzayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01hc2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHRoaXMucm9vdFVybCArIHNlcnZlclVybCArIHVybCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlTWFzaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwi6LWE5rqQ5LiL6L295aSx6LSl77yMXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdW3VybF0gPSByZXM7XG4gICAgICAgICAgICAgICAgY2IocmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS7jui/nOeoi+WcsOWdgOWKoOi9veWkmuS4qui1hOa6kFxuICAgICAqIEBwYXJhbSBzZXJ2ZXJVcmwg6L+c56iL6LWE5rqQ5omA5bGe5YiG57G75p6a5Li+5YC877yM5LiO6LWE5rqQ5omA5Zyo6Lev5b6E5LiA6Ie0XG4gICAgICogQHBhcmFtIHVybHMg6LWE5rqQ5ZCN56ew5pWw57uE77yM6ZyA5YyF5ZCr5paH5Lu257G75Z6L5ZCO57yAXG4gICAgICogQHBhcmFtIGNiIOi1hOa6kOWKoOi9veWujOaIkOWQjueahOWbnuiwg++8jOmcgOazqOaEj++8mmFzc2V0c+aVsOe7hOS4rei1hOa6kOeahOmhuuW6j+S4jnVybHPnmoTpobrluo/lj6/og73kuI3kuIDoh7RcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxvYWRBcnJheShzZXJ2ZXJVcmw6IHN0cmluZywgdXJsczogc3RyaW5nW10sIGNiOiAoYXNzZXRzOiBhbnlbXSkgPT4gdm9pZCwgbWFzaz86IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGFzc2V0cyA9IFtdO1xuICAgICAgICBsZXQgYXJyID0gW107XG4gICAgICAgIGxldCB0ZW1wVXJscyA9IFtdO1xuICAgICAgICBsZXQgcm9vdCA9IHRoaXMucm9vdFVybCArIHNlcnZlclVybDtcbiAgICAgICAgaWYgKCEhdGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdXJscy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLnNlcnZlckFzc2V0W3NlcnZlclVybF1bdXJsc1tpXV07XG4gICAgICAgICAgICAgICAgaWYgKCEhcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0cy5wdXNoKHJlcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gocm9vdCArIHVybHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wVXJscy5wdXNoKHVybHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB1cmxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2gocm9vdCArIHVybHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcFVybHMgPSBbXS5jb25jYXQodXJscyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2IoYXNzZXRzKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IG1hc2spIHtcbiAgICAgICAgICAgIG1hc2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9ncmVzc0JhcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IHRoaXMuc2VydmVyQXNzZXRbc2VydmVyVXJsXSkgdGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdID0ge307XG4gICAgICAgIGNjLmxvYWRlci5sb2FkKGFyciwgdGhpcy51cGRhdGVQcm9ncmVzcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEhZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0ZW1wVXJscy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXQgPSByZXMuZ2V0Q29udGVudCh0ZW1wVXJsc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyQXNzZXRbc2VydmVyVXJsXVt0ZW1wVXJsc1tpXV0gPSBhc3NldDtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXRzLnB1c2goYXNzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYihhc3NldHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW3suWKoOi9veeahOi1hOa6kFxuICAgICAqIEBwYXJhbSB1cmwg6LWE5rqQ6Lev5b6EXG4gICAgICogQHBhcmFtIHNlcnZlclVybCDotYTmupDkuLrku47ov5znqIvmnI3liqHnq6/liqDovb3ml7bvvIzpnIDmjIflrprov5znqIvotYTmupDliIbnsbtcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEFzc2V0KHVybDogc3RyaW5nLCBzZXJ2ZXJVcmw/OiBzdHJpbmcpOiBjYy5Bc3NldCB7XG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IHNlcnZlclVybCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNpbmdsZUFzc2V0W3VybF0pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCLlsJrmnKrliqDovb3otYTmupDvvJpcIiwgdXJsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNpbmdsZUFzc2V0W3VybF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VydmVyQXNzZXRbc2VydmVyVXJsXSB8fCAhdGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdW3VybF0pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCLlsJrmnKrliqDovb3otYTmupDvvJpcIiwgc2VydmVyVXJsICsgXCIgXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQXNzZXRbc2VydmVyVXJsXVt1cmxdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5bey5Yqg6L2955qE5paH5Lu25aS55LiL55qE5YWo6YOo6LWE5rqQXG4gICAgICogQHBhcmFtIHVybCDmlofku7blpLnot6/lvoRcbiAgICAgKiBAcGFyYW0gc2VydmVyVXJsIOiLpei1hOa6kOaYr+S7jui/nOeoi+acjeWKoeerr+S4i+i9veeahO+8jOmcgOaMh+Wumui/nOeoi+acjeWKoeerr+eahOaWh+S7tuWkueWQjeensFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QXNzZXRzKHVybDogc3RyaW5nLCBzZXJ2ZXJVcmw/OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgICAgIGxldCBhc3NldHM6IGNjLkFzc2V0W10gPSBbXTtcbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gc2VydmVyVXJsKSB7XG4gICAgICAgICAgICAvL+S7juacrOWcsOiOt+WPlueahOi1hOa6kFxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2luZ2xlQXNzZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBrZXkuaW5kZXhPZih1cmwpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0cy5wdXNoKHRoaXMuc2luZ2xlQXNzZXRba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFzc2V0cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5LuO5pyN5Yqh5Zmo6I635Y+W55qE6LWE5rqQXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2VydmVyQXNzZXRbc2VydmVyVXJsXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YodXJsKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NldHMucHVzaCh0aGlzLnNlcnZlckFzc2V0W3NlcnZlclVybF1ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXNzZXRzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WU3ByaXRlRnJhbWXotYTmupBcbiAgICAgKiBAcGFyYW0gdXJsIOacrOWcsOi1hOa6kO+8muWujOaVtOeahOi1hOa6kOi3r+W+hOWSjOi1hOa6kOaWh+S7tuWQje+8jOS4jemcgOimgeWQjue8gO+8m+i/nOeoi+i1hOa6kO+8mui1hOa6kOWQjeensO+8jOW4puWQjue8gFxuICAgICAqIEBwYXJhbSBzZXJ2ZXJVcmwg6Iul6LWE5rqQ5piv5LuO6L+c56iL5pyN5Yqh56uv5LiL6L2955qE77yM6ZyA5oyH5a6a6L+c56iL5pyN5Yqh56uv55qE5paH5Lu25aS55ZCN56ewXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRTcHJpdGVGcmFtZSh1cmw6IHN0cmluZywgc2VydmVyVXJsPzogc3RyaW5nKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBsZXQgcmVzID0gdGhpcy5nZXRBc3NldCh1cmwsIHNlcnZlclVybCk7XG4gICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIGNjLlRleHR1cmUyRCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcyBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjIflrprnmoTotYTmupDkuI3mmK/lm77niYfnsbvlnotcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAgICog6I635Y+W5pW05Liq5paH5Lu25aS55LiL55qE5YWo6YOoc3ByaXRlRnJhbWVcbiAgICAgICAqIEBwYXJhbSB1cmwg5pys5Zyw6LWE5rqQ77ya5a6M5pW055qE6LWE5rqQ6Lev5b6E5ZKM6LWE5rqQ5paH5Lu25ZCN77yM5LiN6ZyA6KaB5ZCO57yA77yb6L+c56iL6LWE5rqQ77ya6LWE5rqQ5ZCN56ew77yM5bim5ZCO57yAXG4gICAgICAgKiBAcGFyYW0gc2VydmVyVXJsIOiLpei1hOa6kOaYr+S7jui/nOeoi+acjeWKoeerr+S4i+i9veeahO+8jOmcgOaMh+Wumui/nOeoi+acjeWKoeerr+eahOaWh+S7tuWkueWQjeensFxuICAgICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRTcHJpdGVGcmFtZUxpc3QodXJsOiBzdHJpbmcsIHNlcnZlclVybD86IHN0cmluZyk6IHsgW2tleTogc3RyaW5nXTogY2MuU3ByaXRlRnJhbWUgfSB7XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IHNlcnZlclVybCkge1xuICAgICAgICAgICAgLy/ku47mnKzlnLDojrflj5bnmoTotYTmupBcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnNpbmdsZUFzc2V0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0ga2V5LmluZGV4T2YodXJsKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5zaW5nbGVBc3NldFtrZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgY2MuVGV4dHVyZTJEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMgaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/ku47mnI3liqHlmajojrflj5bnmoTotYTmupBcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZlckFzc2V0W3NlcnZlclVybF0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGtleS5pbmRleE9mKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5zZXJ2ZXJBc3NldFtzZXJ2ZXJVcmxdW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgY2MuVGV4dHVyZTJEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcyBpbnN0YW5jZW9mIGNjLlNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKuWtkOWMheWKoOi9veeKtuaAgeiusOW9lSAqL1xuICAgIHByb3RlY3RlZCBzdGF0aWMgc3VicGFja2FnZVJlY29yZHM6IHsgW25hbWU6IHN0cmluZ106IFN1YnBhY2thZ2VSZWNvcmQgfSA9IHt9O1xuICAgIC8qKlxuICAgICAqIOWKoOi9veWtkOWMhei1hOa6kFxuICAgICAqIEBwYXJhbSBuYW1lIOWtkOWMheWQjeensFxuICAgICAqIEBwYXJhbSBjYiDlm57osIPlh73mlbDvvIzlj6rpnIDlkI7lj7DpooTliqDovb3otYTmupDml7bvvIzkvKDlhaVudWxs5Y2z5Y+vXG4gICAgICogQHBhcmFtIG1hc2sg5Yqg6L296L+H56iL5Lit5piv5ZCm6ZyA6KaB5pi+56S66L+b5bqm5p2h5bm26Zi75pat546p5a626Kem5pG45pON5L2c77yM5b2T6ZyA6KaB5Yqg6L295a6M5oiQ5ZCO56uL5Yi75L2/55So5a2Q5YyF5Lit55qE6LWE5rqQ5pe277yM6K+35Lyg5YWldHJ1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFN1YnBhY2thZ2UobmFtZTogc3RyaW5nLCBjYjogRnVuY3Rpb24sIG1hc2s/OiBib29sZWFuKSB7XG4gICAgICAgIHN3aXRjaCAoR2FtZVBsYXRmb3JtLmluc3RhbmNlLkNvbmZpZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEdhbWVQbGF0Zm9ybVR5cGUuV1g6IHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhY2IpIGNiKCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IG1hc2spIHtcbiAgICAgICAgICAgIG1hc2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5zdWJwYWNrYWdlUmVjb3Jkc1tuYW1lXTtcbiAgICAgICAgaWYgKCFyZWNvcmQpIHtcbiAgICAgICAgICAgIHJlY29yZCA9IG5ldyBTdWJwYWNrYWdlUmVjb3JkKG5hbWUsIGNiKTtcbiAgICAgICAgICAgIHRoaXMuc3VicGFja2FnZVJlY29yZHNbbmFtZV0gPSByZWNvcmQ7XG4gICAgICAgIH1cbiAgICAgICAgLy/liqDovb3kuK3vvIzmt7vliqDlm57osINcbiAgICAgICAgaWYgKHJlY29yZC5sb2FkaW5nKSB7XG4gICAgICAgICAgICBpZiAobWFzaykgdGhpcy5zaG93U3VicGFja2FnZVByb2dyZXNzKCk7XG4gICAgICAgICAgICByZWNvcmQucHVzaENiKGNiLCBtYXNrKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL+WKoOi9veWujOaIkO+8jOaJp+ihjOWbnuiwg1xuICAgICAgICBpZiAocmVjb3JkLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy/lsJrmnKrliqDovb3vvIzlvIDlp4vliqDovb1cbiAgICAgICAgaWYgKHJlY29yZC5pbml0ZWQpIHtcbiAgICAgICAgICAgIGlmIChtYXNrKSB0aGlzLnNob3dTdWJwYWNrYWdlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgIHJlY29yZC5sb2FkU3RhcnQoKTtcbiAgICAgICAgICAgIGNjLmxvYWRlci5kb3dubG9hZGVyLmxvYWRTdWJwYWNrYWdlKG5hbWUsIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrZDljIXliqDovb3lrozmiJDvvJpcIiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlU3VicGFja2FnZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGNvdW50ID0gcmVjb3JkLm1hc2tDb3VudDtcbiAgICAgICAgICAgICAgICAvLyBpZiAoY291bnQgPiAwKSB0aGlzLmhpZGVQcm9ncmVzc0Jhcihjb3VudCk7XG4gICAgICAgICAgICAgICAgcmVjb3JkLmxvYWRGaW5pc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBzdGF0aWMgc3VicGFja2FnZVByb2dyZXNzVGltZXI6IG51bWJlciA9IG51bGw7XG4gICAgLyoq5pi+56S65a2Q5YyF5Yqg6L296L+b5bqm5p2hICovXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBzaG93U3VicGFja2FnZVByb2dyZXNzKCkge1xuICAgICAgICBpZiAobnVsbCA9PT0gdGhpcy5zdWJwYWNrYWdlUHJvZ3Jlc3NUaW1lcikge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc3VicGFja2FnZVByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3VicGFja2FnZVByb2dyZXNzVGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVN1YnBhY2thZ2VQcm9ncmVzcy5iaW5kKHRoaXMpLCAxMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBzdGF0aWMgc3VicGFja2FnZVByb2dyZXNzOiBudW1iZXIgPSAwO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgdXBkYXRlU3VicGFja2FnZVByb2dyZXNzKCkge1xuICAgICAgICB0aGlzLnN1YnBhY2thZ2VQcm9ncmVzcyArPSAwLjAzO1xuICAgICAgICBpZiAodGhpcy5zdWJwYWNrYWdlUHJvZ3Jlc3MgPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5zdWJwYWNrYWdlUHJvZ3Jlc3MgPSAwO1xuICAgICAgICB9XG4gICAgICAgIEV2ZW50TWFuYWdlci5lbWl0KEV2ZW50VHlwZS5Mb2FkQXNzZXRFdmVudC51cGRhdGVQcm9ncmVzcywgdGhpcy5zdWJwYWNrYWdlUHJvZ3Jlc3MpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgc3RhdGljIGhpZGVTdWJwYWNrYWdlUHJvZ3Jlc3MoKSB7XG4gICAgICAgIGlmIChudWxsICE9PSB0aGlzLnN1YnBhY2thZ2VQcm9ncmVzc1RpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3VicGFja2FnZVByb2dyZXNzVGltZXIpO1xuICAgICAgICAgICAgdGhpcy5zdWJwYWNrYWdlUHJvZ3Jlc3NUaW1lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnN1YnBhY2thZ2VQcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzc0JhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmNsYXNzIFN1YnBhY2thZ2VSZWNvcmQge1xuICAgIC8qKuWtkOWMheWQjeensCAqL1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgLyoq5Yqg6L2954q25oCBICovXG4gICAgcHVibGljIHN0YXRlOiBMb2FkU3RhdGU7XG4gICAgLyoq5Zue6LCD5pWw57uEICovXG4gICAgcHVibGljIGNiczogRnVuY3Rpb25bXTtcbiAgICBwdWJsaWMgbWFza0NvdW50OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjYjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IExvYWRTdGF0ZS5pbml0ZWQ7XG4gICAgICAgIHRoaXMuY2JzID0gW107XG4gICAgICAgIHRoaXMucHVzaENiKGNiKTtcbiAgICAgICAgdGhpcy5tYXNrQ291bnQgPSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXNoQ2IoY2I6IEZ1bmN0aW9uLCBtYXNrPzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNicy5wdXNoKGNiKTtcbiAgICAgICAgaWYgKCEhbWFzaykgdGhpcy5tYXNrQ291bnQrKztcbiAgICB9XG4gICAgcHVibGljIGxvYWRTdGFydCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IExvYWRTdGF0ZS5sb2FkaW5nO1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZEZpbmlzaCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuY2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjYiA9IHRoaXMuY2JzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoISFjYikgY2IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gTG9hZFN0YXRlLmZpbmlzaGVkO1xuICAgICAgICB0aGlzLm1hc2tDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpbml0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBMb2FkU3RhdGUuaW5pdGVkO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGxvYWRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBMb2FkU3RhdGUubG9hZGluZztcbiAgICB9XG4gICAgcHVibGljIGdldCBmaW5pc2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IExvYWRTdGF0ZS5maW5pc2hlZDtcbiAgICB9XG59XG4vKirotYTmupDliqDovb3nirbmgIEgKi9cbmVudW0gTG9hZFN0YXRlIHtcbiAgICAvKirlt7Llh4blpIflpb3liqDovb0gKi9cbiAgICBpbml0ZWQgPSAxLFxuICAgIC8qKuato+WcqOWKoOi9veS4rSAqL1xuICAgIGxvYWRpbmcsXG4gICAgLyoq5bey5Yqg6L295a6M5oiQICovXG4gICAgZmluaXNoZWQsXG59XG4iXX0=