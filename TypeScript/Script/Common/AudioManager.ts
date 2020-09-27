import { EventType } from "../GameSpecial/GameEventType";
import EventManager from "./EventManager";
import { GlobalEnum } from "../GameSpecial/GlobalEnum";
import GameConfig from "../GameSpecial/GameConfig";
import Loader from "./Loader";

//音效管理器
export default class AudioManager {
    /**音效资源 */
    protected static allClips: { [key: string]: cc.AudioClip } = {};
    protected static playingEffectCount: number = 0;
    /**可同时播放的最大音效数量 */
    protected static maxEffectCount: number = 3;

    public static init() {
        this.playingEffectCount = 0;
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
        this.onEvents();
    }
    protected static onEvents() {
        EventManager.on(EventType.AudioEvent.playBGM, this.playBGM, this);
        EventManager.on(EventType.AudioEvent.playClickBtn, this.playClickBtn, this);
        EventManager.on(EventType.AudioEvent.playEffect, this.playEffect, this);
        EventManager.on(EventType.AudioEvent.stopBGM, this.stop, this);
        EventManager.on(EventType.AudioEvent.pause, this.pauseBGM, this);
        EventManager.on(EventType.AudioEvent.resume, this.resumeBGM, this);
    }

    protected static playClickBtn() {
        this.playEffect(GlobalEnum.AudioClip.clickBtn);
    }

    protected static playEffect(clip: string) {
        if (undefined === this.allClips[clip]) {
            Loader.loadBundle("Audio", () => {
                Loader.loadBundleRes("Audio", clip, (res) => {
                    if (!res) {
                        this.allClips[clip] = null;
                        cc.warn("要播放的音效资源未找到：", clip);
                        return;
                    }
                    this.allClips[clip] = res;
                    this._playEffect(clip);
                }, false);
            }, false);
        } else {
            this._playEffect(clip);
        }
    }
    protected static _playEffect(clip: string) {
        if (!GameConfig.audioConfig.effect) return;
        if (null === this.allClips[clip]) return;
        if (this.playingEffectCount < this.maxEffectCount) {
            this.playingEffectCount++;
            let id = cc.audioEngine.play(this.allClips[clip], false, 1);
            cc.audioEngine.setFinishCallback(id, this._effectFinish.bind(this));
        }
    }
    protected static _effectFinish() {
        this.playingEffectCount--;
        if (this.playingEffectCount < 0) this.playingEffectCount = 0;
    }
    protected static curBGM = null;
    protected static playBGM(clip: string, loop: boolean = true) {
        if (this.curBGM == clip) {
            return;
        }
        if (undefined === this.allClips[clip]) {
            Loader.loadBundle("Audio", () => {
                Loader.loadBundleRes("Audio", clip, (res) => {
                    if (!res) {
                        this.allClips[clip] = null;
                        cc.warn("要播放的音效资源未找到：", clip);
                        return;
                    }
                    this.allClips[clip] = res;
                    this._playBGM(clip, loop);
                }, false);
            }, false);
        } else {
            this._playBGM(clip, loop);
        }
    }
    protected static _playBGM(clip: string, loop: boolean) {
        if (!GameConfig.audioConfig.bgm) return;
        if (null === this.allClips[clip]) return;
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.allClips[clip], loop);
        this.curBGM = clip;
    }
    protected static stop() {
        this.curBGM = null;
        cc.audioEngine.stopMusic();
    }
    protected static pauseBGM() {
        cc.audioEngine.pauseMusic();
        console.log("暂停背景音乐");
    }
    protected static resumeBGM() {
        cc.audioEngine.resumeMusic();
        console.log("继续播放背景音乐");
    }
}
