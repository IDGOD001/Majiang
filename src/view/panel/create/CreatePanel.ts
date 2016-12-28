class CreatePanel extends BasePanel {

    private btn_xuezhan: eui.Button;
    private btn_xueliu: eui.Button;
    private btn_siren2: eui.Button;
    private scroller: eui.Scroller;
    private viewGroup: eui.Group;
    private btn_start: eui.Button;

    private xuezhanView: CreateXuezhanView;
    private xueliuView: CreateXueliuView;
    private siren2View: CreateSiren2View;
    private shenyangView: CreateShenyangView;

    private ruleType: RuleType;
    private view: CreateBaseView;

    public constructor() {
        super();

        this.skinName = "CreatePanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.tapegreen);
        this.bgView.setTitle("create_btn");

        switch (game.gameType) {
            case GameType.sichuan://四川麻将
                this.skinState = "sichuan";
                this.ruleType = RuleType.xueliuchenghe;//血流成河
                break;
            case GameType.shenyang://沈阳麻将
            default:
                this.skinState = "default";
                break;
        }

        this.xuezhanView = new CreateXuezhanView();
        this.xueliuView = new CreateXueliuView();
        this.siren2View = new CreateSiren2View();
        this.shenyangView = new CreateShenyangView();

        this.update();

        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this);

        this.btn_xuezhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_xueliu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_siren2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private startHandler(e: egret.TouchEvent): void {
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
                    this.ruleType = RuleType.xuezhandaodi;
                    break;
                case this.btn_xueliu:
                    this.ruleType = RuleType.xueliuchenghe;
                    break;
                case this.btn_siren2:
                    this.ruleType = RuleType.siren_2;
                    break;
            }
        }

        this.update();
    }

    private update() {

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();

        this.viewGroup.removeChildren();

        switch (game.gameType) {
            case GameType.sichuan:
                this.view = this.getSichuan();
                break;
            case GameType.shenyang:
                this.view = this.getShenyang();
                break;
        }

        if (this.view) {
            this.viewGroup.addChild(this.view);
        }
    }

    //沈阳麻将
    private getShenyang() {
        return this.shenyangView;
    }

    //四川麻将
    private getSichuan() {
        var view: CreateBaseView;

        switch (this.ruleType) {
            case RuleType.xueliuchenghe:
                view = this.xueliuView;
                break;
            case RuleType.xuezhandaodi:
                view = this.xuezhanView;
                break;
            case RuleType.siren_2:
                view = this.siren2View;
                break;
            case RuleType.sanren_2:
                break;
            case RuleType.sanren_3:
                break;
        }
        return view;
    }
}