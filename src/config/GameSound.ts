class GameSound {

    static isTinging: boolean = false;

    /**
     * 播放
     * @param name  音乐文件名
     */
    static play(name: string) {

        //检测是否关闭
        if (+GameLocal.getData(GameLocal.sound) == 0) {
            return;
        }

        if (this.isTinging) {
        }

        if (RES.hasRes(name)) {
            RES.getResAsync(name, function () {
                var sound = RES.getRes(name);
                var soundChannel = sound.play(0, 1);
                soundChannel.volume = +GameLocal.getData(GameLocal.soundVolume);
            }, this);
        }
    }

    /**
     * 是否是牌的声音
     * @param name
     * @returns {boolean}
     */
    private static isPaiSound(name: string) {
        var isPai: boolean = false;
        var arr: any[] = name.split("_");
        if (arr.length == 3) {
            for (var i: number = 0; i < arr.length; i++) {

            }
        }

        return isPai;
    }
}