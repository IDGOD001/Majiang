/**
 * gameLocal
 * @Author Ace.c
 * @Create 2016-12-12 19:36
 */
class gameLocal {

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
        if (!gameLocal.getData(gameLocal.style)) gameLocal.setData(gameLocal.style, 1);
        if (!gameLocal.getData(gameLocal.color)) gameLocal.setData(gameLocal.color, 1);
        if (!gameLocal.getData(gameLocal.music)) gameLocal.setData(gameLocal.music, 1);
        if (!gameLocal.getData(gameLocal.sound)) gameLocal.setData(gameLocal.sound, 1);
        if (!gameLocal.getData(gameLocal.musicVolume)) gameLocal.setData(gameLocal.musicVolume, 0.2);
        if (!gameLocal.getData(gameLocal.soundVolume)) gameLocal.setData(gameLocal.soundVolume, 0.5);
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