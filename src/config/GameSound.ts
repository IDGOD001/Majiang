class GameSound {

    private static sound: egret.Sound;
    private static soundChannel: egret.SoundChannel;

    /**
     * 播放
     * @param name  音乐文件名
     * @param startTime 开始播放的时间 默认是0
     * @param loops  播放次数<= 0循环播放，>0播放该次数,默认为0
     * @constructor
     */
    static play(name: string, startTime: number = 0, loops: number = 1) {

        //检测是否关闭
        if (+GameLocal.getData(GameLocal.sound) == 0) {
            this.stop();
            return;
        }

        if (RES.hasRes(name)) {
            var _this = this;
            RES.getResAsync(name, function () {
                _this.sound = RES.getRes(name);
                _this.soundChannel = _this.sound.play(startTime, loops);
                _this.soundVolume = +GameLocal.getData(GameLocal.musicVolume);
            }, this);
        }
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