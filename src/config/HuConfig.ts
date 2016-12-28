/**
 * HuConfig
 * @Author Ace.c
 * @Create 2016-12-23 15:39
 */
class HuConfig {

    //胡牌结果类型名字
    static getHuTypeName(va: number) {
        var name: string = "";
        switch (va) {
            case 6:
                name = "庄家";
                break;
            case 7:
                name = "自摸";
                break;
            case 8:
                name = "站立";
                break;
            case 9:
                name = "带鸡";
                break;
            case 10:
                name = "夹胡";
                break;
            case 11:
                name = "双飘";
                if (game.gameType == GameType.shenyang)name = "双飘胡";
                break;
            case 12:
                name = "单飘";
                if (game.gameType == GameType.sichuan)name = "对对胡";
                if (game.gameType == GameType.shenyang)name = "单飘胡";
                break;
            case 13:
                name = "摸宝";
                break;
            case 14:
                name = "宝中宝";
                break;
            case 15:
                name = "通宝";
                break;
            case 16:
                name = "门清";
                break;
            case 17:
                name = "点炮";
                break;
            case 18:
                name = "清一色";
                break;
            case 19:
                name = "杠上开花";
                break;
            case 20:
                name = "暗叫";
                break;
            case 21:
                name = "扫底胡";
                if(game.gameType == GameType.shenyang)name = "海底捞月";
                break;
            case 24:
                name = "暗杠";
                break;
            case 25:
                name = "明杠";
                break;
            case 29:
                name = "天胡";
                break;
            case 30:
                name = "夹五";
                break;
            case 31:
                name = "七对";
                break;
            case 33:
                name = "258将";
                break;
            case 34:
                name = "中张";
                break;
            case 35:
                name = "换三张";
                break;
            case 36:
                name = "金钩吊";
                if (game.gameType == GameType.shenyang) name = "手把一";
                break;
            case 37:
                name = "地胡";
                break;
            case 38:
                name = "全幺九";
                break;
            case 39:
                name = "过手杠";
                break;
            case 40:
                name = "一炮多响";
                break;
            case 41:
                name = "杠上炮";
                if (game.gameType == GameType.shenyang) name = "流泪";
                break;
            case 42:
                name = "将七对";
                break;
            case 43:
                name = "龙七对";
                break;
            case 44:
                name = "抢杠胡";
                break;
            case 45:
                name = "接炮";
                break;
            case 46:
                name = "根儿";
                break;
            case 47:
                name = "查大叫";
                break;
            case 48:
                name = "卡二条";
                break;
            case 49:
                name = "点杠";
                break;
            case 51:
                name = "海底炮";
                break;
            case 52:
                name = "闷胡";
                break;
            case 53:
                name = "报听";
                break;
            case 54:
                name = "三清";
                break;
            case 55:
                name = "四清";
                break;
            case 56:
                name = "缺幺胡幺";
                break;
            case 99:
                name = "胡";
                if (game.gameType == GameType.sichuan) name = "平胡";
                break;
        }
        return name;
    }
}