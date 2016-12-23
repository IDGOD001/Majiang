class SettingPanel extends BasePanel {

    private slider_music: mui.EHSlider;
    private btn_music: eui.CheckBox;
    private slider_sound: mui.EHSlider;
    private btn_sound: eui.CheckBox;
    private btn_style: eui.CheckBox;
    private btn_color: eui.CheckBox;
    private lab_version: eui.Label;

    public constructor() {
        super();

        this.skinName = "SettingPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setTitle("setting_txt");

        this.slider_music.addEventListener(egret.Event.CHANGE, this.changeMusicVolume, this);
        this.slider_sound.addEventListener(egret.Event.CHANGE, this.changeSoundVolume, this);

        this.slider_music.addEventListener(eui.UIEvent.CHANGE_END, this.changeMusicVolumeEnd, this);
        this.slider_sound.addEventListener(eui.UIEvent.CHANGE_END, this.changeSoundVolumeEnd, this);

        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_style.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_color.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private changeMusicVolume(): void {
        gameLocal.setData(gameLocal.musicVolume, this.slider_music.value / 100);
        GameMusic.soundVolume = this.slider_music.value / 100;
    }

    private changeSoundVolume(): void {
        gameLocal.setData(gameLocal.soundVolume, this.slider_sound.value / 100);
        GameSound.soundVolume = this.slider_music.value / 100;
    }

    private changeMusicVolumeEnd(): void {
        this.btn_music.selected = false;
        this.setMusic();
    }

    private changeSoundVolumeEnd(): void {
        this.btn_sound.selected = false;
        this.setSound();
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_music:
                this.setMusic();
                break;
            case this.btn_sound:
                this.setSound();
                break;
            case this.btn_style:
                this.setStyle();
                break;
            case this.btn_color:
                this.setColor();
                break;
        }
    }

    private setMusic(): void {
        gameLocal.setData(gameLocal.music, this.btn_music.selected ? 0 : 1);

        this.btn_music.selected ? GameMusic.stop() : GameMusic.play("music_scene");
        this.btn_music.label = this.btn_music.selected ? "关闭音乐" : "开启音乐";
        this.slider_music.enable = !this.btn_music.selected;
    }

    private setSound(): void {
        gameLocal.setData(gameLocal.sound, this.btn_sound.selected ? 0 : 1);

        this.btn_sound.selected && GameMusic.stop();
        this.btn_sound.label = this.btn_sound.selected ? "关闭音效" : "开启音效";
        this.slider_sound.enable = !this.btn_sound.selected;
    }

    private setStyle(): void {
        gameLocal.setData(gameLocal.style, this.btn_style.selected ? 0 : 1);

        game.paiStyle = +gameLocal.getData(gameLocal.style);

        FashionTools.setPaiStyle(game.paiStyle);
    }

    private setColor(): void {
        gameLocal.setData(gameLocal.color, this.btn_color.selected ? 0 : 1);

        game.paiColor = +gameLocal.getData(gameLocal.color);

        FashionTools.setPaiColor(game.paiColor);
    }

    public show(): void {
        super.show();

        this.btn_music.selected = +gameLocal.getData(gameLocal.music) != 1;
        this.btn_sound.selected = +gameLocal.getData(gameLocal.sound) != 1;

        this.slider_music.value = +gameLocal.getData(gameLocal.musicVolume) * 100;
        this.slider_sound.value = +gameLocal.getData(gameLocal.soundVolume) * 100;

        this.btn_music.label = this.btn_music.selected ? "关闭音乐" : "开启音乐";
        this.btn_sound.label = this.btn_sound.selected ? "关闭音效" : "开启音效";

        this.slider_music.enable = !this.btn_music.selected;
        this.slider_sound.enable = !this.btn_sound.selected;

        this.btn_style.selected = +gameLocal.getData(gameLocal.style) == 1 ? false : true;
        this.btn_color.selected = +gameLocal.getData(gameLocal.color) == 1 ? false : true;

        this.lab_version.text = "当前版本号：" + game.version + "    最新版本号：" + game.player.version;
    }
}