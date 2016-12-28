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

    private playType: RuleType = RuleType.xueliuchenghe;
    private view: CreateBaseView;

    public constructor() {
        super();

        this.skinName = "CreatePanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.tapegreen);
        this.bgView.setTitle("create_btn");

        this.xuezhanView = new CreateXuezhanView();
        this.xueliuView = new CreateXueliuView();
        this.siren2View = new CreateSiren2View();

        this.update();

        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);

        this.btn_xuezhan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_xueliu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_siren2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
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

        this.update();
    }

    private update() {

        this.clear();

        switch (this.playType) {
            case RuleType.xueliuchenghe:
                this.btn_xueliu.enabled = false;
                this.view = this.xueliuView;
                break;
            case RuleType.xuezhandaodi:
                this.btn_xuezhan.enabled = false;
                this.view = this.xuezhanView;
                break;
            case RuleType.sanren_2:
                break;
            case RuleType.sanren_3:
                break;
            case RuleType.siren_2:
                this.btn_siren2.enabled = false;
                this.view = this.siren2View;
                break;
        }

        this.viewGroup.addChild(this.view);
    }

    clear() {
        this.viewGroup.removeChildren();

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();

        var arr: any[] = [this.btn_xueliu, this.btn_xuezhan, this.btn_siren2];
        for (var i: number = 0; i < arr.length; i++) {
            arr[i].enabled = true;
        }
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