/**
 * GameManager
 * @Author Ace.c
 * @Create 2016-11-29 11:52
 */
class GameManager extends BaseDispatcher {

    private static _i: GameManager;

    static get i(): GameManager {
        return this._i || (this._i = new GameManager());
    }

    timerManager: TimerManager;
    effectManager: EffectManager;
    socketManager: SocketManager;

    constructor() {
        super();
    }

    init() {
        this.timerManager = TimerManager.i;
        this.effectManager = new EffectManager();
        this.socketManager = SocketManager.i;
    }

    /**
     * 中断声音播放
     * @param type
     * @param pos
     * @param args
     */
    soundPlay(type: InterruptType, pos: number, ...args) {
        var gender: Gender = GSDataProxy.i.gData.getSexByPos(pos);
        var dir: Dir4 = GSDataProxy.i.gData.getDir(pos);
        var sound: string;
        switch (type) {
            case InterruptType.chi:
                sound = "chi_" + gender;
                break;
            case InterruptType.peng:
                sound = "cha_" + gender;

                GSController.i.gsView.playFuncEffect(dir, 2);
                break;
            case InterruptType.minggang:
                if (game.gameType == GameType.sichuan) {
                    sound = "sound_guafeng";
                }
                else {
                    sound = "gang_" + gender;
                    GSController.i.gsView.playFuncEffect(dir, 25);
                }
                break;
            case InterruptType.angang:
                if (game.gameType == GameType.sichuan) {
                    sound = "sound_xiayu";
                }
                else {
                    sound = "gang_" + gender;
                    GSController.i.gsView.playFuncEffect(dir, 24);
                }
                break;
            case InterruptType.zigang:
                sound = "gang_" + gender;
                GSController.i.gsView.playFuncEffect(dir, 26);
                break;
            case InterruptType.fenggang:
                sound = "gang_" + gender;
                GSController.i.gsView.playFuncEffect(dir, 23);
                break;
            case InterruptType.ting:
                sound = "ting_" + gender;
                GSController.i.gsView.playFuncEffect(dir, 4);
                break;
            case InterruptType.hu:
                sound = (args[0] ? "zimo_" : "dianpao_") + gender;

                GSController.i.gsView.playFuncEffect(dir, 99);
                break;
            case InterruptType.gangshangkaihua:
                sound = "zimo_" + gender;

                game.manager.dispatchEvent(EffectEvent.Gangshangkaihua, dir);
                break;
            case InterruptType.yipaoduoxiang:
                sound = "dianpao_" + gender;
                game.manager.dispatchEvent(EffectEvent.Yipaoduoxiang, args[0]);
                break;
            case InterruptType.hujiaozhuanyi:
                sound = "dianpao_" + gender;

                game.manager.dispatchEvent(EffectEvent.Hujiaozhuanyi, [dir, args[0]]);
                break;
        }

        GameSound.play("sound_down");
        GameSound.play(sound);
    }
}