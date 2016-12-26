import HttpRequest = egret.HttpRequest;
/**
 * 主界面
 */

class GameMainScene extends eui.Component
{
    /**
     * 功能小按钮列表
     */
    private iconList:any =
    {
        1:{source:"shop_icon", click:"", name:"shop"},
        2:{source:"set_icon", click:"", name:"set"},
        3:{source:"rule_icon", click:"", name:"rule"}
    };

    private btn_create:mui.EButton;

    private btn_join:mui.EButton;

    private btn_record:mui.EButton;

    public btn_shiming:mui.EButton;

    private btn_add:eui.Image;

    public constructor()
    {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);

        this.skinName = "mainSkin";

        this.touchChildren = true;

        var sss:any = {"role":"user","mod":"mod_auths","fun":"auth_signature","args":{}};

        var arr:Array<string> = ["closeWindow","hideMenuItems","onMenuShareAppMessage","onMenuShareTimeline","startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"];

        HttpHandler.sendMsgCallBack("https://" + GameConfig.http_address.ip + ":" + GameConfig.http_address.port, "action=" + JSON.stringify(sss), function (obj)
        {
            if(obj.message != "error")
            {
                var some = JSON.parse(obj.message);

                GameConfig.pushData(some);

                Weixin.config(GameConfig.appid, Number(GameConfig.timestamp), GameConfig.noncestr, GameConfig.signature, arr);
            }
        }, egret.URLRequestMethod.POST, this);
    }

    head_group:eui.Group;
    icon_group:eui.Group;

    _money:eui.Image;
    _money_text:eui.Label;
    _name:eui.Label;

    _head_click:eui.Image;
    _head:eui.Image;

    _uid:eui.Label;

    bg_img:eui.Image;

    onComplete()
    {
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

        this.btn_shiming = new mui.EButton("btn_shiming");
        this.btn_shiming.horizontalCenter = -407;
        this.btn_shiming.verticalCenter = -134;
        this.btn_shiming.visible = false;
        this.addChildAt(this.btn_shiming, this.numChildren - 1);

        /**
         * 打开加入游戏
         */
        this.btn_join.addEventListener(egret.TouchEvent.TOUCH_TAP, function ()
        {
            StackManager.open(JoinDialog, "JoinDialog");

        }, this);

        /**
         * 打开创建游戏
         */
        this.btn_create.addEventListener(egret.TouchEvent.TOUCH_TAP, function ()
        {
            StackManager.open(CreateDialog, "CreateDialog");

        }, this);

        /**
         * 打开战绩
         */
        this.btn_record.addEventListener(egret.TouchEvent.TOUCH_TAP, function ()
        {
            SocketManager.getInstance().getGameConn().send(19,{});
        }, this);

        /**
         * 打开说明
         */
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, function ()
        {
            StackManager.open(TipsDialog, "TipsDialog");
            
        }, this);

        /**
         * 打开玩家信息
         */
        this._head_click.addEventListener(egret.TouchEvent.TOUCH_TAP, function ()
        {
            var d:RoleInfoDialog = StackManager.findDialog(RoleInfoDialog, "RoleInfoDialog");
            if(d)
            {
                d.show();
                d.refreshRole();
            }
        },this);

        /**
         * 打开实名认证
         */
        this.btn_shiming.addEventListener(egret.TouchEvent.TOUCH_TAP, function ()
        {
            StackManager.open(IDCardDialog, "IDCardDialog");
        }, this);

        /**
         * 添加金钱说明
         */
        //TipsManager.addTips(this._money,"再点也不会变多 <(￣︶￣)>！", 1);

        //this.bg_img.width = GameConfig.curWidth();

        //this.bg_img.height = GameConfig.curHeight();

        var system1;
        var texture1 = RES.getRes("snow2_png");
        var config1 = RES.getRes("snow2_json");
        system1 = new particle.GravityParticleSystem(texture1, config1);
        system1.start();
        this.addChildAt(system1, 1);

        var system2;
        var texture2 = RES.getRes("snow1_png");
        var config2 = RES.getRes("snow1_json");
        system2 = new particle.GravityParticleSystem(texture2, config2);
        system2.start();
        this.addChild(system2);
    }

    /**
     * 初始化功能小按钮
     */
    private initIconList():void
    {
        for(var k in this.iconList)
        {
            var some = this.iconList[k];

            var lb:mui.EButton = new mui.EButton(some.source+"", "");
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
    private onClick(e:egret.TouchEvent):void
    {
        var n = e.currentTarget.name;

        switch (n)
        {
            case "shop":
                StackManager.open(ShopDialog, "ShopDialog");
                break;
            case "set":
                StackManager.open(SettingDialog, "SettingDialog");
                break;
            case "rule":
                StackManager.open(RuleDialog, "RuleDialog");
                break;
        }
    }

    createChildren()
    {
        super.createChildren();

        var _shpBeMask:egret.Shape = new egret.Shape();
        _shpBeMask.graphics.lineStyle( 0x000000 );
        _shpBeMask.graphics.beginFill(0xffffff, 1);
        _shpBeMask.graphics.drawRoundRect( 2, 2, this._head.width - 4, this._head.height - 4, 30, 30);
        _shpBeMask.graphics.endFill();
        _shpBeMask.x = this._head.x;
        _shpBeMask.y = this._head.y;
        this.head_group.addChild(_shpBeMask);
        this._head.mask = _shpBeMask;

        GameMusic.PlaySound("music_scene");

        this.update();

        if(GameConfig.roomid)
        {
            GSData.i.roomID = +GameConfig.roomid;
            SocketManager.getInstance().getGameConn().send(3, {"args":{"roomid":+GameConfig.roomid, "pass":"0"}});
        }

        var num:number = Math.floor(Math.random() * GlobalData.getInstance().gamewarmList.length);
        GlobalData.getInstance().hornList.push(GlobalData.getInstance().gamewarmList[num]);

        egret.setTimeout(this.onWeiJs, this, 1000);
    }

    private onWeiJs():void
    {
        Weixin.onMenuShareAppMessage();
        Weixin.onMenuShareTimeline();
        Weixin.hideMenuItems();
    }
    
    public update():void
    {
        var my = this;

        var player:Player = GlobalData.getInstance().player;

        this._money_text.text = "" + player.cur;

        this._name.text = "" + player.nick;

        this._uid.text = "ID：" + player.uid;

        if(player.name && player.id_no)
        {
            this.btn_shiming.visible = false;
        }
        else
        {
            this.btn_shiming.visible = true;
        }


        RES.getResByUrl(GlobalData.getInstance().player.pic, function(t:egret.Texture)
        {
            if(t)
            {
                GlobalData.getInstance().player.playerHeadTexture = t;
                my._head.source = t;
            }
            else
            {
                my._head.source = "head_001";

                GlobalData.getInstance().player.playerHeadTexture = my._head.texture;
            }

            my._head.width = my._head.height = 77;

        }, this, RES.ResourceItem.TYPE_IMAGE);
    }
}
