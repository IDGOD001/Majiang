/**
 * SoundPlayer
 * @Author Ace.c
 * @Create 2017-01-10 14:52
 */
class SoundPlayer {

    private names: string[] = [];

    private volume: number;

    constructor() {
    }

    play(name, volume: number) {

        this.volume = volume;

        if (typeof name == "string") {
            this.playSound(name);
        }
        else {
            this.names = name;
            this.playSound(this.names.shift());
        }
    }

    private playSound(name: string) {
        if (RES.hasRes(name)) {

            var _this = this;

            RES.getResAsync(name, function () {

                var sound = RES.getRes(name);

                var soundChannel = sound.play(0, 1);
                soundChannel.volume = +_this.volume;

                if (_this.names.length) {
                    soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                        _this.playSound(_this.names.shift());
                    }, _this);
                }
            }, _this);
        }
    }
}