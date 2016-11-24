class BindDialog extends BaseDialog
{

    private clickNum:Array<any> = [];

    private m_UI:JoinPasswordUI;

    public constructor()
    {
        super("bind_img", 792, 484);
    }

    createChildren()
    {
        super.createChildren();

        this.m_UI = new JoinPasswordUI();

        this.addChild(this.m_UI);

        this.m_UI.horizontalCenter = 0;

        this.m_UI.verticalCenter = 0;

        for(var i = 0; i < 12; i++)
        {
            var t:eui.Label = this.m_UI["_t" + i];

            t.name = "" + i;

            t.addEventListener(egret.TouchEvent.TOUCH_END,this.onClick, this);
            t.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this);
            t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
            t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        this.m_UI._desc.text = "绑定推荐人就可以使用商场咯";

        this.m_UI._warm.text = "请输入推荐人ID：";

        this.m_UI._t11.text = "绑定";
    }

    private onJoin():void
    {
        if(this.m_UI._edit.text == "")
        {
            EffectUtils.showTips("ID不能为空", 5);
            return;
        }

        if(!RegUtils.isNumber(this.m_UI._edit.text))
        {
            EffectUtils.showTips("ID格式不正确(只能是数字)", 5);
            return;
        }

        if(this.m_UI._edit.text.length < 5)
        {
            EffectUtils.showTips("ID长度应该为五位", 5);
            return;
        }

        SocketManager.getInstance().getGameConn().send(7, {"args":{"uid":this.m_UI._edit.text}});
    }

    private onClick(e:egret.TouchEvent):void
    {
        var i = +e.currentTarget.name;

        var t:eui.Label = e.currentTarget;

        var img:eui.Image = this.m_UI["_img" + i];

        switch (e.type)
        {
            case "touchBegin":
                this.addStage();
                img.source = "clickeff_btn";
                t.textColor = 0xffea00;
                break;
            case "touchEnd":
                this.removeStage();
                img.source = "clickeff_of_btn";
                this.clearText();
                break;
            case "touchMove":
                break;
            case "touchTap":
                if(i == 11)
                {
                    this.onJoin();
                }
                else if(i == 10)
                {
                    this.clickNum.pop();
                }
                else
                {
                    if(this.clickNum.length < 5) this.clickNum.push(i);
                }

                this.refreshText();
                break;
        }
    }

    private addStage():void
    {
        GameConfig.curStage().addEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        GameConfig.curStage().addEventListener(egret.Event.LEAVE_STAGE, this.onMove, this);
    }

    private removeStage():void
    {
        GameConfig.curStage().removeEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        GameConfig.curStage().removeEventListener(egret.Event.LEAVE_STAGE, this.onMove, this);
    }

    private onMove(e:egret.Event = null):void
    {
        this.clearText();
    }

    private clearText():void
    {
        for(var i = 0; i < 12; i++)
        {
            var t:eui.Label = this.m_UI["_t" + i];
            t.textColor = 0xffffff;

            var img:eui.Image = this.m_UI["_img" + i];
            img.source = "clickeff_of_btn";
        }
    }

    private refreshText():void
    {
        var str:string = "";

        for(var i = 0; i < this.clickNum.length; i++)
        {
            str += this.clickNum[i];
        }

        this.m_UI._edit.text = str;
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

        StackManager.closeDialog("JoinDialog");

        this.m_UI._edit.text = "";
    }


    /**
     * 移除面板方法
     * panel       		面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    public hide(): void
    {
        super.hide(1);

        this.clickNum = [];
    }


    /**
     * 面板关闭后需要销毁的对象
     */
    public destroy(): void {
        super.destroy();
    }
}