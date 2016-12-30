/**
 * 主界面
 */

class MainScene extends eui.Component {
    /**
     * 功能小按钮列表
     */
    private iconList: any =
    {
        1: {source: "shop_icon", click: "", name: "shop"},
        2: {source: "set_icon", click: "", name: "set"},
        3: {source: "rule_icon", click: "", name: "rule"}
    };

    private btn_create: mui.EButton;
    private btn_join: mui.EButton;
    private btn_record: mui.EButton;
    private btn_assess: mui.EButton;
    public btn_shiming: mui.EButton;
    private btn_add: eui.Image;

    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.skinName = "MainSceneSkin";

        this.touchChildren = true;
    }

    head_group: eui.Group;
    icon_group: eui.Group;

    _money: eui.Image;
    _money_text: eui.Label;
    _name: eui.Label;

    // _head_click: eui.Image;
    // _head: eui.Image;

    head: HeadIcon;

    _uid: eui.Label;

    bg_img: eui.Image;

    onComplete() {
        this.initIconList();

        this.btn_create = new mui.EButton("blue_game_btn");
        this.btn_create.horizontalCenter = -180;
        this.btn_create.verticalCenter = 30;
        this.addChildAt(this.btn_create, this.numChildren - 1);

        this.btn_join = new mui.EButton("red_game_btn");
        this.btn_join.horizontalCenter = 180;
        this.btn_join.verticalCenter = 30;
        this.addChildAt(this.btn_join, this.numChildren - 1);

        this.btn_record = new mui.EButton("yellow_game_btn");
        this.btn_record.horizontalCenter = 407;
        this.btn_record.verticalCenter = -134;
        this.addChildAt(this.btn_record, this.numChildren - 1);

        this.btn_assess = new mui.EButton("btn_thumbs_up");
        this.btn_assess.horizontalCenter = 407;
        this.btn_assess.verticalCenter = 0;
        this.addChildAt(this.btn_assess, this.numChildren - 1);

        this.btn_shiming = new mui.EButton("btn_shiming");
        this.btn_shiming.horizontalCenter = -407;
        this.btn_shiming.verticalCenter = -134;
        this.btn_shiming.visible = false;
        this.addChildAt(this.btn_shiming, this.numChildren - 1);

        this.head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_shiming.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_create.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_join.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_record.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_assess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e:egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.head:
                var d: RoleInfoPanel = StackManager.findDialog(RoleInfoPanel, "RoleInfoPanel");
                if (d) {
                    d.show();
                    d.refreshRole();
                }
                break;
            case this.btn_add:
                StackManager.open(TipsPanel, "TipsPanel");
                break;
            case this.btn_shiming:
                StackManager.open(RealPanel, "RealPanel");
                break;
            case this.btn_create:
                StackManager.open(CreatePanel, "CreatePanel");
                break;
            case this.btn_join:
                StackManager.open(JoininPanel, "JoininPanel");
                break;
            case this.btn_record:
                StackManager.open(RecordPanel, "RecordPanel");
                break;
            case this.btn_assess:
                StackManager.open(AssessPanel, "AssessPanel");
                break;
        }
    }

    /**
     * 初始化功能小按钮
     */
    private initIconList(): void {
        for (var k in this.iconList) {
            var some = this.iconList[k];

            var lb: mui.EButton = new mui.EButton(some.source + "", "");
            this.icon_group.addChild(lb);
            lb.x += +k * 80;   //80  95
            lb.name = some["name"];
            lb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    }

    /**
     * 功能小按钮点击效果
     * @param e
     */
    private onClick(e: egret.TouchEvent): void {
        var n = e.currentTarget.name;

        switch (n) {
            case "shop":
                StackManager.open(ActivityPanel, "ActivityPanel");
                break;
            case "set":
                StackManager.open(SettingPanel, "SettingPanel");
                break;
            case "rule":
                StackManager.open(RulePanel, "RulePanel");
                break;
        }
    }

    childrenCreated() {
        super.childrenCreated();

        GameMusic.play("music_scene");

        this.update();

        if (game.roomid && String(game.roomid).length >= 4) {
            game.manager.socketManager.send(3, {
                args: {
                    roomid: +game.roomid,
                    pass: "0"
                }
            });
        }

        var num: number = Math.floor(Math.random() * TextConfig.notices.length);
        game.noticeList.push(TextConfig.notices[num]);

        egret.setTimeout(this.onWeiJs, this, 1000);
    }

    private onWeiJs(): void {
        Weixin.onMenuShareAppMessage();
        Weixin.onMenuShareTimeline();
        Weixin.hideMenuItems();
    }

    public update(): void {

        var player: PlayerVo = game.player;

        this._money_text.text = "" + player.cur;

        this._name.text = "" + player.nick;

        this._uid.text = "ID：" + player.uid;

        if (player.name && player.id_no) {
            this.btn_shiming.visible = false;
        }
        else {
            this.btn_shiming.visible = true;
        }

        this.head.setHeadImg(player.pic);
    }
}