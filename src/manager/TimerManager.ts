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

    public constructor() {
        super();

        this.notice_time = game.notice_time;

        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.start();
    }

    private onTimerHandler() {
        this.dispatchEvent(TimerManager.Second);

        this.notice();
    }


    private notice_time: number = 0;
    private notice_index: number = 0;

    private notice() {

        if (game.notice_list.length) {
            if (++this.notice_time >= game.notice_time) {

                game.notice_list_play.push(game.notice_list[this.notice_index++]);

                this.notice_time = 0;
                this.notice_index = this.notice_index >= game.notice_list.length ? 0 : this.notice_index;
            }

            if (game.notice_list_play.length > 0) {
                Global.showHorn(20, 0x40f8ff);
            }
        }
    }
}