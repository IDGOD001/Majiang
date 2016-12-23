class GameMusic {

    private static sound: egret.Sound;
    private static soundChannel: egret.SoundChannel;
    private static soundPlaying: boolean = false;

    /**
     * 播放
     * @param name  音乐文件名
     * @param startTime 开始播放的时间 默认是0
     * @param loops  播放次数<= 0循环播放，>0播放该次数,默认为0
     * @constructor
     */
    static play(name: string, startTime: number = 0, loops: number = 0) {

        //检测是否关闭
        if (+gameLocal.getData(gameLocal.music) == 0) {
            this.stop();
            return;
        }

        if (!this.sound) {
            if (RES.hasRes(name)) {
                var _this = this;
                RES.getResAsync(name, function () {
                    _this.sound = RES.getRes(name);
                }, this);
            }
            return;
        }

        if (this.soundPlaying) {
            return;
        }

        this.soundChannel = this.sound.play(startTime, loops);
        this.soundVolume = +gameLocal.getData(gameLocal.musicVolume);

        this.soundPlaying = true;
    }

    /**
     * 关闭
     */
    static stop() {
        if (this.soundChannel) {
            this.soundChannel.stop();
        }

        this.sound = null;
        this.soundChannel = null;
        this.soundPlaying = false;
    }

    /**
     * 设置音量
     * @param va
     */
    static set soundVolume(va) {
        if (this.soundChannel) {
            this.soundChannel.volume = +va;
        }
    }
}