/**
 * CreateShenyangView
 * @Author Ace.c
 * @Create 2016-12-06 18:24
 */
class CreateShenyangView extends CreateBaseView {

    private btn_quan_2: eui.RadioButton;
    private btn_quan_4: eui.RadioButton;
    private btn_quan_8: eui.RadioButton;

    private btn_rule_1: eui.CheckBox;
    private btn_rule_2: eui.CheckBox;
    private btn_rule_3: eui.CheckBox;
    private btn_rule_4: eui.CheckBox;
    private btn_rule_5: eui.CheckBox;

    public constructor() {
        super();

        this.skinName = "CreateShenyangViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    getQuan() {
        if (this.btn_quan_8.selected) {
            return 8;
        }
        else if (this.btn_quan_4.selected) {
            return 4;
        }
        else if (this.btn_quan_2.selected) {
            return 2;
        }
    }

    getRule() {
        var rule: any[] = [];

        var box: eui.CheckBox;
        for (var i: number = 0; i <= 5; i++) {
            box = this["btn_rule_" + i];
            if (box && box.selected) {
                switch (i) {
                    case 0:
                        rule.push(RuleType.baoyijia);
                        break;
                    case 1:
                        rule.push(RuleType.zerenzhi);
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