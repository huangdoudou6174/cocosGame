
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/UI/LoadingUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '080cbcgkidPf7KaORae6PIU', 'LoadingUI');
// myGame/Script/UI/LoadingUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var yyComponent_1 = require("../Common/yyComponent");
var GameEventType_1 = require("../GameSpecial/GameEventType");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**加载进度条UI */
var LoadingUI = /** @class */ (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressNode = null;
        _this.rate = null;
        _this.mask = null;
        return _this;
    }
    LoadingUI.prototype.onLoad = function () {
        this.init();
    };
    LoadingUI.prototype.init = function () {
        this.progress = this.progressNode.getComponent(cc.ProgressBar);
        this.onHideProgress();
        this.onEvents();
    };
    LoadingUI.prototype.onEvents = function () {
        this.on(GameEventType_1.EventType.LoadAssetEvent.showProgress, this.onShowProgress, this);
        this.on(GameEventType_1.EventType.LoadAssetEvent.updateProgress, this.onUpdateProgress, this);
        this.on(GameEventType_1.EventType.LoadAssetEvent.hideProgress, this.onHideProgress, this);
    };
    LoadingUI.prototype.onShowProgress = function (rate) {
        this.mask.active = true;
        this.progressNode.active = true;
        this.progress.progress = rate;
        this.rate.string = (rate * 100).toFixed(2) + "%";
    };
    LoadingUI.prototype.onUpdateProgress = function (rate) {
        this.progress.progress = rate;
        this.rate.string = (rate * 100).toFixed(2) + "%";
    };
    LoadingUI.prototype.onHideProgress = function () {
        this.mask.active = false;
        this.progressNode.active = false;
    };
    __decorate([
        property(cc.Node)
    ], LoadingUI.prototype, "progressNode", void 0);
    __decorate([
        property(cc.Label)
    ], LoadingUI.prototype, "rate", void 0);
    __decorate([
        property(cc.Node)
    ], LoadingUI.prototype, "mask", void 0);
    LoadingUI = __decorate([
        ccclass
    ], LoadingUI);
    return LoadingUI;
}(yyComponent_1.default));
exports.default = LoadingUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXFVJXFxMb2FkaW5nVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCw4REFBeUQ7QUFFbkQsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1QyxhQUFhO0FBRWI7SUFBdUMsNkJBQVc7SUFEbEQ7UUFBQSxxRUE0Q0M7UUF4Q2Esa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsVUFBSSxHQUFhLElBQUksQ0FBQztRQUV0QixVQUFJLEdBQVksSUFBSSxDQUFDOztJQW1DbkMsQ0FBQztJQWpDRywwQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFTSx3QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsNEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUFTLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUFTLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFUyxrQ0FBYyxHQUF4QixVQUF5QixJQUFZO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDckQsQ0FBQztJQUVTLG9DQUFnQixHQUExQixVQUEyQixJQUFZO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JELENBQUM7SUFFUyxrQ0FBYyxHQUF4QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQXRDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNxQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNhO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ2E7SUFSZCxTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMkM3QjtJQUFELGdCQUFDO0NBM0NELEFBMkNDLENBM0NzQyxxQkFBVyxHQTJDakQ7a0JBM0NvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHl5Q29tcG9uZW50IGZyb20gXCIuLi9Db21tb24veXlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0dhbWVTcGVjaWFsL0dhbWVFdmVudFR5cGVcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbi8qKuWKoOi9vei/m+W6puadoVVJICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIHl5Q29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByb3RlY3RlZCBwcm9ncmVzc05vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhcjtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByb3RlY3RlZCByYXRlOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByb3RlY3RlZCBtYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3NOb2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5vbkhpZGVQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMub25FdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5vbihFdmVudFR5cGUuTG9hZEFzc2V0RXZlbnQuc2hvd1Byb2dyZXNzLCB0aGlzLm9uU2hvd1Byb2dyZXNzLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5Mb2FkQXNzZXRFdmVudC51cGRhdGVQcm9ncmVzcywgdGhpcy5vblVwZGF0ZVByb2dyZXNzLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm9uKEV2ZW50VHlwZS5Mb2FkQXNzZXRFdmVudC5oaWRlUHJvZ3Jlc3MsIHRoaXMub25IaWRlUHJvZ3Jlc3MsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblNob3dQcm9ncmVzcyhyYXRlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSByYXRlO1xyXG4gICAgICAgIHRoaXMucmF0ZS5zdHJpbmcgPSAocmF0ZSAqIDEwMCkudG9GaXhlZCgyKSArIFwiJVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblVwZGF0ZVByb2dyZXNzKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSByYXRlO1xyXG4gICAgICAgIHRoaXMucmF0ZS5zdHJpbmcgPSAocmF0ZSAqIDEwMCkudG9GaXhlZCgyKSArIFwiJVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkhpZGVQcm9ncmVzcygpIHtcclxuICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==