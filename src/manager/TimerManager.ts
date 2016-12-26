/**
 * TimerManager
 * @Author Ace.c
 * @Create 2016-11-08 16:52
 */
class TimerManager extends BaseDispatcher {

    private static _i: TimerManager;

    static get i(): TimerManager {
        return this._i || (this._i = new TimerManager());
    }

    static Second: string = "Second";

    private timer: egret.Timer;

    private testHorn: number = 0;

    public constructor() {
        super();

        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.start();
    }

    private onTimerHandler() {
        this.dispatchEvent(TimerManager.Second);


        this.testHorn++;

        if (this.testHorn >= 120) {
            this.testHorn = 0;

            game.noticeList.push(TextConfig.notices[game.noticeIndex]);

            game.noticeIndex++;

            if (game.noticeIndex >= TextConfig.notices.length) {
                game.noticeIndex = 0;
            }
        }

        if (game.noticeList.length > 0) {
            Global.showHorn(20, 0x40f8ff);
        }
    }
}