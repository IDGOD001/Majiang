class CreateUI extends eui.Component
{
    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "CreateSkin";

        this.touchChildren = true;
    }

    public btn_start:mui.EButton;

    public btn_fanxuan:mui.EButton;

    public _lef_btn:eui.Image;

    public _center_btn:eui.Image;

    public _riado:eui.Image;

    public _edit:eui.Label;

    public _tq1:eui.Label;
    public _tq2:eui.Label;

    public _tg2:eui.Label;
    public _tg1001:eui.Label;
    public _tg1004:eui.Label;
    public _tg6:eui.Label;
    public _tg1003:eui.Label;
    public _tg1002:eui.Label;

    onComplete()
    {
        this.btn_start = new mui.EButton("game_create");
        this.btn_start.x = 284;
        this.btn_start.y = 390;
        this.addChild(this.btn_start);

        this.btn_fanxuan = new mui.EButton("create_btn_img");
        this.btn_fanxuan.x = 550;
        this.btn_fanxuan.y = 288;
        this.addChild(this.btn_fanxuan);
        this.btn_fanxuan.textImg.source = "create_xz1";

        this._tq1.textColor = 0xff2f19;

    }

    createChildren()
    {
        super.createChildren();
    }
}
