class DissolutionDialog extends BaseDialog
{
    private m_UI:DissolutionUI;

    public plist:any = {};

    public isClick:boolean = false;

    public constructor()
    {
        super("diss_title", 670, 388);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new DissolutionUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        this.m_UI.btn_true.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.m_UI.btn_false.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuxiao, this);

        this.m_UI.time_text.text = "若无人拒绝，则房间将在05:00后自动解散";

        this.m_dialog.btn_close.visible = false;

    }

    public clear():void
    {
        this.isClick = false;

        this.plist = {};

        this.hide();
    }

    private onQuxiao():void
    {
        if(this.isClick)
        {
            EffectUtils.showTips("您已经选择过了", 5);
            return;
        }

        SocketManager.getInstance().getGameConn().send(14, {"args":{"answer":0}});  //发起解散房子

        this.isClick = true;
    }


    private onClick(e:egret.TouchEvent):void
    {
        if(this.isClick)
        {
            EffectUtils.showTips("您已经选择过了", 5);
            return;
        }
        SocketManager.getInstance().getGameConn().send(14, {"args":{"answer":1}});  //发起解散房子

        this.isClick = true;
    }

    public refresh():void
    {
        if(!this.plist) return;

        var my = this;

        if(this.isClick)
        {
            this.m_UI.btn_false.visible = false;
            this.m_UI.btn_true.visible = false;
            this.m_UI._desc.visible = true;

        }
        else
        {
            this.m_UI.btn_false.visible = true;
            this.m_UI.btn_true.visible = true;
            this.m_UI._desc.visible = false;
        }

        var index:number = 1;

        var num:number = 0;

        var isan:string;

        for(var k in GSData.i.roomPlayerMap)
        {
            var p:RoomPlayer = GSData.i.roomPlayerMap[k];

            var label:eui.Label = this.m_UI["_label" + index];

            var arrt:Array<any> = [];

            arrt.push({text:p.nick,style: { "textColor":0xA07A4B,"fontFamily": "Microsoft YaHei","size":20}});

            if(p.status == "offline")
            {
                arrt.push({text:"（离线）",style: { "textColor":0xE7432A,"fontFamily": "Microsoft YaHei","size":18}});
            }
            else if(p.status == "online")
            {
                arrt.push({text:"（在线）",style: { "textColor":0x4BA05F,"fontFamily": "Microsoft YaHei","size":18}});
            }
            else if(p.status == "leave")
            {
                arrt.push({text:"（离开）",style: { "textColor":0x7B7978,"fontFamily": "Microsoft YaHei","size":18}});
            }

            label.textFlow = <Array < egret.ITextElement >>arrt;

            var img:eui.Image = this.m_UI["_img"+index];

            img.visible = false;

            index++;

            if(this.plist[k] >= 0)
            {
                img.visible = true;

                var n:number = +this.plist[k];

                if(n == 1)
                {
                    img.source = "diss_dui";
                }
                else
                {
                    img.source = "diss_cuo";
                    isan = "" + p.nick;
                }

                num ++;
            }
            else
            {
                img.visible = false;
            }
        }

        if(isan)
        {
            my.clear();

            EffectUtils.showTips(isan + "不同意解散房间", 5);
        }
        else
        {
            if(num >= 4)
            {
                egret.setTimeout(function ()
                {
                    my.clear();

                    EffectUtils.showTips("房间解散成功", 5);

                },this, 1000);
            }
        }
    }

    /**
     * 添加面板方法
     * dark        		背景是否变黑
     * popUpWidth      	指定弹窗宽度，定位使用
     * popUpHeight      指定弹窗高度，定位使用
     * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public show(): void
    {
        super.show(true, this.width, this.height, 1, false);
    }

    /**
     * 面板弹出之前处理
     */
    public beforShow(): void
    {
        super.beforShow();
    }

    /**
     * 初始化面板ui
     */
    public initUI(): void
    {
        super.initUI();
    }


    /**
     * 初始化面板数据
     */
    public initData(): void
    {
        super.initData();
    }


    /**
     * 移除面板方法
     * panel       		面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public hide(): void
    {
        super.hide(1);
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void
    {
        super.destroy();
    }
}