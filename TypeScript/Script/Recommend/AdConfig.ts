/**
 * 广告ID/互推位置配置信息
 */
export module AdConfig {
    /**互推显示位置 */
    export let AdID = {
        /**复活 */
        resurgence: 386,

        littleView: 385,
        bigView: 384,
        gameoverFail: 383,
        gameoverWin: 382,
        friend: 381,
    }

    /**各UI对应的bannerID */
    export let bannerID = {
        loadingScene: "",
        gameScene: "",
        resurgence: "",
        pause: "",
        gameover: "",
    }

    /**视频ID */
    export let videoID = {
        startGame: "",
        resurgence: "",
        passLevel: "",
    }
}
