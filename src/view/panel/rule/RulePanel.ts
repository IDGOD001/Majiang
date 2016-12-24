class RulePanel extends BasePanel {

    private btn_xuezhan: eui.Button;
    private btn_xueliu: eui.Button;
    private btn_siren2: eui.Button;

    private scroller: eui.Scroller;
    private group: eui.Group;
    private lab_description: eui.Label;

    private ruleType: RuleType;

    public constructor() {
        super();

        this.skinName = "RulePanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setTitle("rule_txt");

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

        this.update();

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
        btn.enabled = false;

        switch (btn) {
            case this.btn_xueliu:
                this.ruleType = RuleType.xueliuchenghe;
                break;
            case this.btn_xuezhan:
                this.ruleType = RuleType.xuezhandaodi;
                break;
            case this.btn_siren2:
                this.ruleType = RuleType.siren_2;
                break;
        }

        this.update();
    }

    public update(): void {

        var url: string;

        switch (game.gameType) {
            case GameType.sichuan:
                url = this.getSichuan();
                break;
            case GameType.shenyang:
                url = this.getShenyang();
                break;
        }

        var _this = this;
        RES.getResAsync(url, function (json, k) {
            if (k != url)return;
            if (!json) return;

            var desc: string = "";
            if (json.title && json.title != "") {
                desc += "　　" + json.title;
            }

            var rule: any;
            for (var key1 in json.content) {
                rule = json.content[key1];

                if (!rule) continue;

                desc += "\n\n　　" + rule["desc"];

                if (!rule.list) continue;

                for (var key2 in rule.list) {
                    desc += "\n　　　" + rule.list[key2];
                }
            }

            _this.lab_description.text = desc;

            _this.scroller.viewport.scrollV = 0;
            _this.scroller.validateNow();

        }, this);
    }

    //沈阳麻将
    private getShenyang() {
        return "rule_shenyang";
    }

    //四川麻将
    private getSichuan() {
        var name: string;

        switch (this.ruleType) {
            case RuleType.xueliuchenghe:
                name = "rule_xueliuchenghe";
                break;
            case RuleType.xuezhandaodi:
                name = "rule_xuezhandaodi";
                break;
            case RuleType.siren_2:
                name = "rule_sirenliangfang";
                break;
            case RuleType.sanren_2:
                break;
            case RuleType.sanren_3:
                break;
        }
        return name;
    }
}