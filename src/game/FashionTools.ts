/**
 * Created by Administrator on 2016/11/26.
 */
class FashionTools {

    //自动出牌
    static autoPush() {
        if (GSConfig.auto) {
            var pai = GSData.i.getCatchPai(1);
            game.manager.socketManager.send(4, {"args": pai});
        }
    }

    //自动过
    static autoPass() {
        if (GSConfig.auto) {
            game.manager.socketManager.send(15, {"args": {"action": 0, "pai": []}});

            GSController.i.hideFuncSelectMenu();

            var pais = PublicVal.i.getHandPais(1);
            if (pais) {
                if (GSConfig.handLens[pais.length]) {
                    FashionTools.autoPush();
                }
            }
        }
    }

    /**
     * 设置麻将风格(标准/精致)
     * @param type
     */
    static setPaiStyle(type: number) {
        if (type == 1) {
            GSConfig.posRulePlus[1] = GSConfig.posRule[1];
            GSConfig.handPosPlus[1] = GSConfig.gameHandPos[1];
        } else {
            GSConfig.posRulePlus[1] = GSConfig.posRule[5];
            GSConfig.handPosPlus[1] = GSConfig.gameHandPos[5];
        }
        GSController.i.updateHandViewSize();
    }

    /**
     * 设置麻将颜色
     * @param type
     */
    static setPaiColor(type: number) {
        if (type == 1) {
            GSConfig.card_bg_style = GSConfig.soft_card_bg_style;
            GSConfig.table_bg_res = GSConfig.soft_table_bg_res;
        } else {
            GSConfig.card_bg_style = GSConfig.normal_card_bg_style;
            GSConfig.table_bg_res = GSConfig.normal_table_bg_res;
        }
        GSController.i.updateGameStyle();
    }

    /**
     * 格式化牌型
     * @param type
     * @param paiNums
     * @returns {Array}
     */
    static formatPai(type: number, paiNums: number[]) {
        var arr = [];
        if (paiNums) {
            for (var i: number = 0; i < paiNums.length; i++) {
                arr.push({type: type, number: paiNums[i]});
            }
        }
        return arr;
    }

    /**
     * 排序手牌
     * @param pais
     */
    static sortPai(pais: any = null) {
        //if(pais == null) pais = PublicVal.i.allPais[1].handPais;

        pais.sort((a, b)=> {
            var _a = a.type * 10 + a.number;
            var _b = b.type * 10 + b.number;

            if (a.type == game.roomQue[1]) {
                _a += 100;
            }

            if (b.type == game.roomQue[1]) {
                _b += 100;
            }

            if (_a > _b) {
                return 1;
            }
            else if (_a == _b) {
                return 0;
            }
            else if (_a < _b) {
                return -1;
            }
        });
    }

    /**
     * 移除队列某张牌
     * @param list
     * @param pai
     */
    static removePai(list: any, pai: any) {
        // console.log(list, pai);
        for (var i: number = 0; i < list.length; i++) {
            if (list[i].type == pai.type && list[i].number == pai.number) {
                list.splice(i, 1);
                break;
            }
        }
    }
}