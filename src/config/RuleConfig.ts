
/**
 * 游戏规则
 */
enum RuleType {
    jiawu = 1, qingyise, kouting, jihujipiao, zangang, shoubayi, beikaobei, zerenzhi,
    fengding = 19, zimojiadi = 9, zimojiafan, dianganghua_pao, dianganghua_zimo, huansanzhang, yaojiujiangdui, menqingzhongzhang, tiandihu,
    paizhang = 23, kaertiao,
    xuezhandaodi = 17, xueliuchenghe, sanren_2 = 20, sanren_3, siren_2,
    baijia = 101, chikaimen, menhu, baotingjiabei, baoyijia
}

/**
 * RuleConfig
 * @Author Ace.c
 * @Create 2016-12-23 15:38
 */
class RuleConfig {

    //规则
    static rules: any = {
        1: "夹五",
        2: "清一色",
        3: "扣听",
        4: "鸡胡鸡飘",
        5: "攒杠",
        6: "手把一",
        7: "背靠背",
        8: "包三家",
        9: "自摸加底",
        10: "自摸加番",
        11: "点杠花(点炮)",
        12: "点杠花(自摸)",
        13: "换三张",
        14: "幺九将对",
        15: "门清中张",
        16: "天地胡",
        17: "血战到底",
        18: "血流成河",
        19: "封顶",
        20: "三人两房",
        21: "三人三房",
        22: "四人两房",
        23: "牌张",
        24: "卡二条",
        101: "摆夹",
        102: "吃开门",
        103: "闷胡",
        104: "报听加倍",
        105: "包一家",
    };

    //特殊规则的处理
    static checkSpecial(rules: any[]) {
        var rule: any;
        for (var i: number = 0; i < rules.length; i++) {
            rule = rules[i];
            if (typeof rule == "object") {
                switch (rule[0]) {
                    case RuleType.fengding://封顶
                        game.roomRate = rule[1];
                        break;
                    case RuleType.paizhang://牌张
                        game.roomZhang = rule[1];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    //规则文本
    static ruleText(rules: any[]): string {
        var text: string = "";
        var rule: any;
        for (var i: number = 0; i < rules.length; i++) {
            rule = rules[i];

            if (typeof rule == "object") {//特殊规则
                switch (rule[0]) {
                    case RuleType.fengding://封顶
                        text += rule[1] + "番" + this.rules[rule[0]] + " ";
                        break;
                    case RuleType.paizhang://牌张
                        break;
                    default:
                        break;
                }
                continue;
            }

            text += this.rules[rules[i]] + " ";
        }
        return text;
    }
}