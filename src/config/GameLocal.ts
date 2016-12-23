/**
 * GameLocal
 * @Author Ace.c
 * @Create 2016-12-12 19:36
 */
class GameLocal {

    //游戏存储key
    static get localKey(): string {
        var key: string = "mqbj-";
        switch (game.gameType) {
            case GameType.sichuan:
                key += "mj-" + game.gameType;
                break;
        }
        return key + "-";
    }

    //登录Code
    static loginCode: string = "loginCode";

    //风格
    static style: string = "style";
    //颜色
    static color: string = "color";

    //音乐
    static music: string = "music";
    //音乐音量
    static musicVolume: string = "musicVolume";
    //音效
    static sound: string = "sound";
    //音效音量
    static soundVolume: string = "soundVolume";

    static init() {
        if (!GameLocal.getData(GameLocal.style)) GameLocal.setData(GameLocal.style, 1);
        if (!GameLocal.getData(GameLocal.color)) GameLocal.setData(GameLocal.color, 1);
        if (!GameLocal.getData(GameLocal.music)) GameLocal.setData(GameLocal.music, 1);
        if (!GameLocal.getData(GameLocal.sound)) GameLocal.setData(GameLocal.sound, 1);
        if (!GameLocal.getData(GameLocal.musicVolume)) GameLocal.setData(GameLocal.musicVolume, 0.2);
        if (!GameLocal.getData(GameLocal.soundVolume)) GameLocal.setData(GameLocal.soundVolume, 0.5);
    }

    //读取数据
    static getData(key: string) {
        return egret.localStorage.getItem(this.localKey + key);
    }

    //储存数据
    static setData(key: string, value: any): void {
        egret.localStorage.setItem(this.localKey + key, value);
    }
}