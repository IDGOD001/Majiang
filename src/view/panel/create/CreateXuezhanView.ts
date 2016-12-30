/**
 * CreateXuezhanView
 * @Author Ace.c
 * @Create 2016-12-06 18:24
 */
class CreateXuezhanView extends CreateBaseView {

    private btn_quan_1: eui.RadioButton;
    private btn_quan_2: eui.RadioButton;

    private btn_rate_2: eui.RadioButton;
    private btn_rate_3: eui.RadioButton;
    private btn_rate_4: eui.RadioButton;

    private btn_rule_1: eui.RadioButton;
    private btn_rule_2: eui.RadioButton;
    private btn_rule_3: eui.RadioButton;
    private btn_rule_4: eui.RadioButton;
    private btn_rule_5: eui.CheckBox;
    private btn_rule_6: eui.CheckBox;
    private btn_rule_7: eui.CheckBox;
    private btn_rule_8: eui.CheckBox;

    //圈数
    private quan: number = 1;
    //番数
    private rate: number = 2;

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

    getRate() {
        if (this.btn_rate_2.selected) {
            return 2;
        }
        else if (this.btn_rate_3.selected) {
            return 3;
        }
        else if (this.btn_rate_4.selected) {
            return 4;
        }
    }

    getRule() {
        var rule: any[] = [];

        rule.push(RuleType.xuezhandaodi);
        rule.push([RuleType.fengding, this.getRate()]);

        var box: eui.CheckBox;
        for (var i: number = 1; i <= 8; i++) {
            box = this["btn_rule_" + i];
            if (box && box.selected) {
                switch (i) {
                    case 1:
                        rule.push(RuleType.zimojiadi);
                        break;
                    case 2:
                        rule.push(RuleType.zimojiafan);
                        break;
                    case 3:
                        rule.push(RuleType.dianganghua_pao);
                        break;
                    case 4:
                        rule.push(RuleType.dianganghua_zimo);
                        break;
                    case 5:
                        rule.push(RuleType.huansanzhang);
                        break;
                    case 6:
                        rule.push(RuleType.yaojiujiangdui);
                        break;
                    case 7:
                        rule.push(RuleType.menqingzhongzhang);
                        break;
                    case 8:
                        rule.push(RuleType.tiandihu);
                        break;
                }
            }
        }

        return rule;
    }
}