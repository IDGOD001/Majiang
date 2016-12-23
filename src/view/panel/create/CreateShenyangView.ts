/**
 * CreateShenyangView
 * @Author Ace.c
 * @Create 2016-12-06 18:24
 */
class CreateShenyangView extends CreateBaseView {

    private btn_quan_1: eui.RadioButton;
    private btn_quan_2: eui.RadioButton;

    private btn_rule_1: eui.CheckBox;
    private btn_rule_2: eui.CheckBox;
    private btn_rule_3: eui.CheckBox;
    private btn_rule_4: eui.CheckBox;
    private btn_rule_5: eui.CheckBox;

    //圈数
    private quan: number = 1;
    //番数
    private rate: number = 2;

    private ruleVo: GameRuleVo;

    public constructor() {
        super();

        this.skinName = "CreateXuezhanViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

    }

    getQuan() {
        if (this.btn_quan_1.selected) {
            return 1;
        }
        else if (this.btn_quan_2.selected) {
            return 2;
        }
    }

    getRule() {
        var rule: any[] = [];

        // rule.push(RuleType.shenyangmajiang);

        var box: eui.CheckBox;
        for (var i: number = 1; i <= 8; i++) {
            box = this["btn_rule_" + i];
            if (box && box.selected) {
                switch (i) {
                    case 1:
                        rule.push(RuleType.baosanjia);
                        break;
                    case 2:
                        rule.push(RuleType.baijia);
                        break;
                    case 3:
                        rule.push(RuleType.chikaimen);
                        break;
                    case 4:
                        rule.push(RuleType.menhu);
                        break;
                    case 5:
                        rule.push(RuleType.baotingjiabei);
                        break;
                }
            }
        }

        return rule;
    }
}