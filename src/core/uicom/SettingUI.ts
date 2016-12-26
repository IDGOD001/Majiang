class SettingUI extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "SettingSkin";

        this.touchChildren = true;
    }

    public _btn_sound:mui.EButton;  //音效按钮
    public _btn_music:mui.EButton;  //音乐按钮
    public _btn_pai:eui.Image;   //手牌按钮
    public _btn_color:eui.Image; //手牌颜色

    public _ver:eui.Label;

    public _txt_sound:eui.Label;
    public _txt_music:eui.Label;

    onComplete()
    {
        this._btn_sound = new mui.EButton("sound_open_btn");
        this._btn_sound.x = 353;
        this._btn_sound.y = 190;
        this.addChild(this._btn_sound);

        this._btn_music = new mui.EButton("sound_open_btn");
        this._btn_music.x = 353;
        this._btn_music.y = 100;
        this.addChild(this._btn_music);


        this._btn_pai = new eui.Image();
        this._btn_pai.source = "sound_open_btn";
        this._btn_pai.x = 530;
        this._btn_pai.y = 100;
        this.addChild(this._btn_pai);

        this._btn_color = new eui.Image();
        this._btn_color.source = "card_style_green";
        this._btn_color.x = 530;
        this._btn_color.y = 185;
        this.addChild(this._btn_color);

        this._txt_music = new eui.Label();
        this._txt_music.size = 18;
        this._txt_music.textColor = 0xA97144;
        this._txt_music.fontFamily = "微软雅黑";
        this._txt_music.bold = true;
        this._txt_music.x = this._btn_music.x - 12;
        this._txt_music.y = this._btn_music.y + 54;
        this.addChild(this._txt_music);

        this._txt_music.text = "点击关闭";

        this._txt_sound = new eui.Label();
        this._txt_sound.size = 18;
        this._txt_sound.textColor = 0xA97144;
        this._txt_sound.fontFamily = "微软雅黑";
        this._txt_sound.x = this._btn_sound.x - 12;
        this._txt_sound.y = this._btn_sound.y + 54;
        this._txt_sound.bold = true;
        this.addChild(this._txt_sound);

        this._txt_sound.text = "点击打开";
    }

    createChildren()
    {
        super.createChildren();
    }
}
