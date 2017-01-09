class GameSound {

    static isTinging:boolean = false;

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
            return;
        }

        if (RES.hasRes(name)) {
            RES.getResAsync(name, function () {
                var sound = RES.getRes(name);
                var soundChannel = sound.play(startTime, loops);
                soundChannel.volume = +GameLocal.getData(GameLocal.soundVolume);
            }, this);
        }
    }
}