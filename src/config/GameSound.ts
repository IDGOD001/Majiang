class GameSound {

    private static soundPlayer: SoundPlayer;

    /**
     * 播放
     * @param name  音乐文件名
     */
    static play(...name) {
        //检测是否关闭
        if (+GameLocal.getData(GameLocal.sound) == 0) {
            return;
        }

        var volume: number = +GameLocal.getData(GameLocal.soundVolume);

        if (typeof name == "string") {
            if (!this.soundPlayer)this.soundPlayer = new SoundPlayer();

            this.soundPlayer.play(name, volume);
        }
        else {
            var soundPlayer = new SoundPlayer();
            soundPlayer.play(name, volume);
        }
    }
}