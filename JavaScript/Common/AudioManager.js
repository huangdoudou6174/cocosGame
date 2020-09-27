
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/myGame/Script/Common/AudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67fcbfGsZBDIqfq5H6mcUDC', 'AudioManager');
// myGame/Script/Common/AudioManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameEventType_1 = require("../GameSpecial/GameEventType");
var EventManager_1 = require("./EventManager");
var GlobalEnum_1 = require("../GameSpecial/GlobalEnum");
//音效管理器
var AudioManager = /** @class */ (function () {
    function AudioManager() {
    }
    AudioManager.init = function () {
        this.playingEffectCount = 0;
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
        this.onEvents();
    };
    AudioManager.onEvents = function () {
        EventManager_1.default.on(GameEventType_1.EventType.AudioEvent.playBGM, this.playBGM, this);
        EventManager_1.default.on(GameEventType_1.EventType.AudioEvent.playClickBtn, this.playClickBtn, this);
        EventManager_1.default.on(GameEventType_1.EventType.AudioEvent.playEffect, this.playEffect, this);
        EventManager_1.default.on(GameEventType_1.EventType.AudioEvent.stopBGM, this.stop, this);
    };
    AudioManager.playClickBtn = function () {
        this.playEffect(GlobalEnum_1.GlobalEnum.AudioClip.clickBtn);
    };
    AudioManager.playEffect = function (clip) {
        var _this = this;
        if (undefined === this.allClips[clip]) {
            cc.loader.loadRes(clip, cc.AudioClip, function (err, res) {
                if (err) {
                    _this.allClips[clip] = null;
                    cc.warn("要播放的音效资源未找到：", clip);
                    return;
                }
                _this.allClips[clip] = res;
                _this._playEffect(clip);
            });
        }
        else {
            this._playEffect(clip);
        }
    };
    AudioManager._playEffect = function (clip) {
        if (null === this.allClips[clip])
            return;
        if (this.playingEffectCount < this.maxEffectCount) {
            var id = cc.audioEngine.play(this.allClips[clip], false, 1);
            cc.audioEngine.setFinishCallback(id, this._effectFinish.bind(this));
        }
    };
    AudioManager._effectFinish = function () {
        this.playingEffectCount--;
        if (this.playingEffectCount < 0)
            this.playingEffectCount = 0;
    };
    AudioManager.playBGM = function (clip, loop) {
        var _this = this;
        if (loop === void 0) { loop = true; }
        if (undefined === this.allClips[clip]) {
            cc.loader.loadRes(clip, cc.AudioClip, function (err, res) {
                if (err) {
                    _this.allClips[clip] = null;
                    cc.warn("要播放的音效资源未找到：", clip);
                    return;
                }
                _this.allClips[clip] = res;
                _this._playBGM(clip, loop);
            });
        }
        else {
            this._playBGM(clip, loop);
        }
    };
    AudioManager._playBGM = function (clip, loop) {
        if (null === this.allClips[clip])
            return;
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.allClips[clip], loop);
    };
    AudioManager.stop = function () {
        cc.audioEngine.stopMusic();
    };
    /**音效资源 */
    AudioManager.allClips = {};
    AudioManager.playingEffectCount = 0;
    /**可同时播放的最大音效数量 */
    AudioManager.maxEffectCount = 2;
    return AudioManager;
}());
exports.default = AudioManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbXlHYW1lXFxTY3JpcHRcXENvbW1vblxcQXVkaW9NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBeUQ7QUFDekQsK0NBQTBDO0FBQzFDLHdEQUF1RDtBQUV2RCxPQUFPO0FBQ1A7SUFBQTtJQXlFQSxDQUFDO0lBbEVpQixpQkFBSSxHQUFsQjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNjLHFCQUFRLEdBQXZCO1FBQ0ksc0JBQVksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEUsc0JBQVksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUUsc0JBQVksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsc0JBQVksQ0FBQyxFQUFFLENBQUMseUJBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVjLHlCQUFZLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRWMsdUJBQVUsR0FBekIsVUFBMEIsSUFB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QUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQXZFRCxVQUFVO0lBQ0sscUJBQVEsR0FBb0MsRUFBRSxDQUFDO0lBQy9DLCtCQUFrQixHQUFXLENBQUMsQ0FBQztJQUM5QyxrQkFBa0I7SUFDSCwyQkFBYyxHQUFXLENBQUMsQ0FBQztJQW9FOUMsbUJBQUM7Q0F6RUQsQUF5RUMsSUFBQTtrQkF6RW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2FtZUV2ZW50VHlwZVwiO1xuaW1wb3J0IEV2ZW50TWFuYWdlciBmcm9tIFwiLi9FdmVudE1hbmFnZXJcIjtcbmltcG9ydCB7IEdsb2JhbEVudW0gfSBmcm9tIFwiLi4vR2FtZVNwZWNpYWwvR2xvYmFsRW51bVwiO1xuXG4vL+mfs+aViOeuoeeQhuWZqFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9NYW5hZ2VyIHtcbiAgICAvKirpn7PmlYjotYTmupAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBhbGxDbGlwczogeyBba2V5OiBzdHJpbmddOiBjYy5BdWRpb0NsaXAgfSA9IHt9O1xuICAgIHByaXZhdGUgc3RhdGljIHBsYXlpbmdFZmZlY3RDb3VudDogbnVtYmVyID0gMDtcbiAgICAvKirlj6/lkIzml7bmkq3mlL7nmoTmnIDlpKfpn7PmlYjmlbDph48gKi9cbiAgICBwcml2YXRlIHN0YXRpYyBtYXhFZmZlY3RDb3VudDogbnVtYmVyID0gMjtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5wbGF5aW5nRWZmZWN0Q291bnQgPSAwO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSgxKTtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZSgxKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50cygpO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBvbkV2ZW50cygpIHtcbiAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlCR00sIHRoaXMucGxheUJHTSwgdGhpcyk7XG4gICAgICAgIEV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUuQXVkaW9FdmVudC5wbGF5Q2xpY2tCdG4sIHRoaXMucGxheUNsaWNrQnRuLCB0aGlzKTtcbiAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS5BdWRpb0V2ZW50LnBsYXlFZmZlY3QsIHRoaXMucGxheUVmZmVjdCwgdGhpcyk7XG4gICAgICAgIEV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUuQXVkaW9FdmVudC5zdG9wQkdNLCB0aGlzLnN0b3AsIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHBsYXlDbGlja0J0bigpIHtcbiAgICAgICAgdGhpcy5wbGF5RWZmZWN0KEdsb2JhbEVudW0uQXVkaW9DbGlwLmNsaWNrQnRuKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBwbGF5RWZmZWN0KGNsaXA6IHN0cmluZykge1xuICAgICAgICBpZiAodW5kZWZpbmVkID09PSB0aGlzLmFsbENsaXBzW2NsaXBdKSB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhjbGlwLCBjYy5BdWRpb0NsaXAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxDbGlwc1tjbGlwXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLopoHmkq3mlL7nmoTpn7PmlYjotYTmupDmnKrmib7liLDvvJpcIiwgY2xpcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxDbGlwc1tjbGlwXSA9IHJlcztcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RWZmZWN0KGNsaXApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYXlFZmZlY3QoY2xpcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3BsYXlFZmZlY3QoY2xpcDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChudWxsID09PSB0aGlzLmFsbENsaXBzW2NsaXBdKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnBsYXlpbmdFZmZlY3RDb3VudCA8IHRoaXMubWF4RWZmZWN0Q291bnQpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hbGxDbGlwc1tjbGlwXSwgZmFsc2UsIDEpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RmluaXNoQ2FsbGJhY2soaWQsIHRoaXMuX2VmZmVjdEZpbmlzaC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBfZWZmZWN0RmluaXNoKCkge1xuICAgICAgICB0aGlzLnBsYXlpbmdFZmZlY3RDb3VudC0tO1xuICAgICAgICBpZiAodGhpcy5wbGF5aW5nRWZmZWN0Q291bnQgPCAwKSB0aGlzLnBsYXlpbmdFZmZlY3RDb3VudCA9IDA7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIHBsYXlCR00oY2xpcDogc3RyaW5nLCBsb29wOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBpZiAodW5kZWZpbmVkID09PSB0aGlzLmFsbENsaXBzW2NsaXBdKSB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhjbGlwLCBjYy5BdWRpb0NsaXAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxDbGlwc1tjbGlwXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCLopoHmkq3mlL7nmoTpn7PmlYjotYTmupDmnKrmib7liLDvvJpcIiwgY2xpcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxDbGlwc1tjbGlwXSA9IHJlcztcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5QkdNKGNsaXAsIGxvb3ApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYXlCR00oY2xpcCwgbG9vcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3BsYXlCR00oY2xpcDogc3RyaW5nLCBsb29wOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChudWxsID09PSB0aGlzLmFsbENsaXBzW2NsaXBdKSByZXR1cm47XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5hbGxDbGlwc1tjbGlwXSwgbG9vcCk7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIHN0b3AoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xuICAgIH1cbn1cbiJdfQ==