class CreatePanel extends BasePanel {

    private btnGroup: eui.Group;
    private btn_xuezhan: eui.Button;
    private btn_xueliu: eui.Button;
    private btn_siren2: eui.Button;
    private ruleGroup: eui.Group;
    private scroller: eui.Scroller;
    private viewGroup: eui.Group;
    private btn_start: eui.Button;

    private xuezhanView: CreateXuezhanView;
    private xueliuView: CreateXueliuView;
    private siren2View: CreateSiren2View;
    private shenyangView: CreateShenyangView;

    private playType: RuleType = RuleType.shenyangmajiang;
    private view: CreateBaseView;

    public constructor() {
        super();

        this.skinName = "CreatePanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.curtain);
        this.bgView.setTitle("create_btn");

        switch (game.gameType) {
            case GameType.sichuan:
                this.btnGroup.visible = true;
                this.ruleGroup.left = 173;
                break;
            default:
                this.width = 730;
                this.btnGroup.visible = false;
                this.ruleGroup.left = 23;
                break;
        }

        this.xuezhanView = new CreateXuezhanView();
        this.xueliuView = new CreateXueliuView();
        this.siren2View = new CreateSiren2View();
        this.shenyangView = new CreateShenyangView();

        this.update();

        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);

        this.btn_xuezhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_xueliu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_siren2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {

        var arr: any[] = [this.btn_xueliu, this.btn_xuezhan, this.btn_siren2];
        for (var i: number = 0; i < arr.length; i++) {
            arr[i].enabled = true;
        }

        var btn: eui.Button = <eui.Button>e.currentTarget;
        if (btn) {
            btn.enabled = false;
            switch (e.currentTarget) {
                case this.btn_xuezhan:
                    this.playType = RuleType.xuezhandaodi;
                    break;
                case this.btn_xueliu:
                    this.playType = RuleType.xueliuchenghe;
                    break;
                case this.btn_siren2:
                    this.playType = RuleType.siren_2;
                    break;
            }
        }

        this.update();
    }

    private update() {

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();

        this.viewGroup.removeChildren();

        switch (this.playType) {
            case RuleType.xueliuchenghe:
                this.view = this.xueliuView;
                break;
            case RuleType.xuezhandaodi:
                this.view = this.xuezhanView;
                break;
            case RuleType.sanren_2:
                break;
            case RuleType.sanren_3:
                break;
            case RuleType.siren_2:
                this.view = this.siren2View;
                break;
            case RuleType.shenyangmajiang:
                this.view = this.shenyangView;
                break;
        }

        this.viewGroup.addChild(this.view);
    }

    private startGame(): void {
        game.roomRoundMax = Number(this.view.getQuan()) * 4;

        //创建房间
        game.manager.socketManager.send(2, {
            args: {
                type: game.gameType,
                pass: "0",
                round: this.view.getQuan(),
                rules: this.view.getRule()
            }
        });
    }
}