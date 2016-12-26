import Player = egret.sys.Player;
/**
 * Created by Administrator on 2016/11/19.
 */
//数据代理
class GSDataProxy {

    static _i: GSDataProxy;

    static get i() {

        return GSDataProxy._i || (GSDataProxy._i = new GSDataProxy);
    }

    gData: GSData;

    constructor() {
        this.gData = GSData.i;
    }

    //断线重连
    S2C_RebackData(obj: any) {

        this.gData.rebackData = obj;

        game.roomid = obj.roomid;

        PublicVal.i.bao = obj.bao;

        this.gData.turnPos = obj.turn;

        this.gData.zhuangPos = obj.zhuang;

        this.gData.lastZhuangPos = obj.zhuang;

        this.gData.backTing = obj.ting;

        game.roomPaidui = obj.dui_num;

        game.roomRoundCur = obj.cur_round;

        game.roomRoundMax = obj.max_round;

        switch (this.gData.rebackData.ex_status) {
            case 0://初始化
                break;
            case 1://换三张
                game.status = GameStatus.changeThree;
                break;
            case 2://订缺
                game.status = GameStatus.missing;
                break;
            case 3://游戏开始
                game.status = GameStatus.gamestart;
                break;
        }

        //步骤大于4，表示过了开局杠牌时间
        /*if (obj.step > 4) {
         this.gData.isZhuangPush = true;
         this.gData.gang_end = true;
         }*/

        switch (obj.status) {
            case "wait_for_join":
                this.gData.rebackStatus = 1;
                break;
            case "wait_for_play":
            case "wait_for_deal":
            case "wait_for_resume":
            case "wait_for_dismiss":
            case "wait_for_wake":
                this.gData.rebackStatus = 3;
                break;
            case "wait_for_continue":
                this.gData.rebackStatus = 2;
                this.gData.roundStarted = true;
        }

        game.manager.socketManager.send(25, {args: {type: 3}});
    }


    //解析离线数据
    parseRebackPai() {

        this.gData.turnDir = this.gData.getDir(this.gData.turnPos);

        this.gData.zhuangDir = this.gData.getDir(this.gData.zhuangPos);

        PublicVal.i.zhuangFlag = 1 << this.gData.zhuangDir;

        var persons = this.gData.rebackData.person;
        var lastPai = this.gData.rebackData.draw;

        for (var i: number = 0; i < persons.length; i++) {

            var person = persons[i];
            var pos = person.pos;
            var dir = this.gData.getDir(pos);
            var men = person.men;
            var shou = person.shou;
            var wai = person.wai;
            var cur = person.cur;

            var hu = person.hu;
            if (hu && hu.length) {
                var mjview: MJView = GSController.i.gsView.MJViews[dir];
                for (var j: number = 0; j < hu.length; j++) {
                    mjview.pushHu(hu[j]);
                }

                if (dir == 1) {
                    game.isHu = true;

                    if (lastPai && lastPai != "no") {
                        egret.setTimeout(function () {
                            game.manager.socketManager.send(4, {"args": lastPai});
                        }, this, 2000);
                    }
                }
            }

            //判断自己的状态进度
            if (dir == 1) {
                if (game.status != GameStatus.gamestart) {
                    game.statusComplete = person.process == 1;
                }
            }

            if (game.status == GameStatus.gamestart) {
                game.roomQue[dir] = person.que;
            }

            GSData.i.gangCurs[dir] = cur;

            if (Object.keys(men).length > 0) {//解析功能牌

                var funcPais = PublicVal.i.getFuncPais(dir);

                if (men[1]) {
                    for (var k: number = 0; k < men[1].length; k++) {
                        this.gData.addFuncPai(4, dir, 1, men[1][k]);
                    }
                }
                if (men[2]) {
                    for (var k: number = 0; k < men[2].length; k++) {
                        this.gData.addFuncPai(5, dir, 2, men[2][k]);
                    }
                }
                if (men[22]) {//幺九杠
                    for (var k1 = 0; k1 < men[22].length; k1++) {
                        var menK1 = men[22][k1];
                        var num = menK1[0].number;
                        var pais = menK1.slice(-3);
                        menK1.length -= 3;
                        var ever = [1, 1, 1];
                        for (var k: number = 0; k < menK1.length; k++) {
                            ever[menK1[k].type - 1]++;
                        }
                        funcPais.push({sort: 3, action: 22, pais: [{pai: pais, number: num, ever: ever}]});
                    }
                }
                if (men[23]) {//旋风杠
                    for (var k: number = 1; k < men[23].length; k++) {
                        this.gData.addFuncPai(2, dir, 23, men[23][k]);
                    }
                    this.gData.addFuncPai(2, dir, 23, men[23][0]);
                }
                if (men[24]) {//暗杠
                    for (var k: number = 0; k < men[24].length; k++) {
                        this.gData.addFuncPai(1, dir, 24, men[24][k]);
                    }
                }
                if (men[25]) {//明杠
                    for (var k: number = 0; k < men[25].length; k++) {
                        this.gData.addFuncPai(2, dir, 25, men[25][k]);
                    }
                }
                if (men[26]) {//中发白杠
                    var pais = men[26].slice(-3);
                    men[26].length -= 3;
                    var ever = [1, 1, 1];
                    for (var k: number = 0; k < men[26].length; k++) {
                        ever[men[26][k].number - 1]++;
                    }
                    funcPais.push({sort: 0, action: 26, pais: [{pai: pais, number: 0, ever: ever}]});
                }
            }

            if (shou > 0) {//其他人的牌
                this.gData.setHandPais(dir, new Array(shou));
            }
            else {//自己的牌
                //判断长度
                if (GSConfig.handLens[shou.length]) {
                    var zhuangpai = null;
                    if (person.draw == "no") {
                        zhuangpai = (this.gData.rebackData.step == 5 ? person.zhuangpai : null);
                    } else {
                        zhuangpai = person.draw;
                    }

                    if (zhuangpai) {
                        FashionTools.removePai(shou, zhuangpai);
                        FashionTools.sortPai(shou);
                        shou.push(zhuangpai);
                        this.gData.setCatchPai(1, zhuangpai);

                    } else {
                        FashionTools.sortPai(shou);
                        this.gData.setCatchPai(1, shou[shou.length - 1]);
                    }
                } else {
                    FashionTools.sortPai(shou);
                }
                this.gData.setHandPais(1, shou);
            }

            if (wai.length > 0) {//池牌
                wai.reverse();
                this.gData.setPoolPais(dir, wai);
            }
        }
    }


    //删除手牌
    S2C_DeletePai(pos: number, pai: any) {
        var dir = this.gData.getDir(pos);
        //this.gData.removeHandPai(dir, pai);
        PublicVal.i.removeHandPai(dir, pai);

        if (dir == 1) FashionTools.sortPai(PublicVal.i.getHandPais(dir));

        GSController.i.updateMJView(dir);
    }

    /*
     更新功能菜单，吃蹦杠
     */
    S2C_Function(obj: any) {

        //准备听的状态，忽略其他人上线刷新的功能菜单
        if (GSData.i.readyTing) return;

        //不能操作出牌
        this.gData.isShowFunc = true;

        this.gData.funcSelects = [{index: 0, action: 0, pai: null}];

        if (obj[1]) {

            var pais = obj[1];

            var group = [];

            for (var i: number = 0; i < pais.length; i += 3) {

                group.push({action: 1, pai: pais.slice(i, i + 3)});

            }
            this.gData.funcSelects.push({index: 1, group: group});
        }
        if (obj[2]) {

            this.gData.funcSelects.push({index: 2, action: 2, pai: obj[2]});
        }
        if (obj[22] || obj[23] || obj[24] || obj[25] || obj[26]) {

            var group = [];

            if (obj[22]) {//幺九杠

                var pais = obj[22];

                for (var i: number = 0; i < pais.length; i += 3) {

                    group.push({action: 22, pai: pais.slice(i, i + 3)});

                }
            }
            if (obj[23]) {//旋风杠
                group.push({action: 23, pai: obj[23]});
            }
            if (obj[24]) {//暗杠

                var pais = obj[24];

                for (var i: number = 0; i < pais.length; i += 4) {

                    group.push({action: 24, pai: pais.slice(i, i + 4)});
                }
            }

            if (obj[25]) {//明杠

                var pais = obj[25];

                for (var i: number = 0; i < pais.length; i++) {

                    group.push({action: 25, pai: pais[i]});

                }
            }
            if (obj[26]) {//中发白杠
                group.push({action: 26, pai: obj[26]});

            }
            this.gData.funcSelects.push({index: 3, group: group});
        }

        if (obj[27] || obj[28]) {

            var group = [];

            if (obj[27]) {//幺九杠 补蛋

                var pais = obj[27];

                var add: any = {};

                for (var i: number = 0; i < pais.length; i++) {

                    var flag: number = pais[i].type << 8 | pais[i].number;

                    if (!add[flag]) {
                        group.push({action: 27, pai: pais[i]});
                        add[flag] = true;
                    }
                }
            }

            if (obj[28]) {//中发白  补蛋

                var add: any = {};

                var pais = obj[28];

                for (var i: number = 0; i < pais.length; i++) {

                    var flag: number = pais[i].type << 8 | pais[i].number;

                    if (!add[flag]) {
                        group.push({action: 28, pai: pais[i]});
                        add[flag] = true;
                    }
                }
            }
            this.gData.funcSelects.push({index: 4, group: group});
        }

        if (obj[4]) {//听 group 数组对象[{play,hu[]},...];

            this.gData.funcSelects.push({index: 5, action: 4, group: obj[4]});

        }
        if (obj[99]) {//胡

            //this.gData.funcSelects.push({index: 5, action: 4, pai: obj[4]});

            this.gData.funcSelects.push({index: 6, action: 99, pai: obj[99]});

            if (game.isHu) {

            }
        }

        //断线重连上来的情况
        if (this.gData.rebackData) {
            this.gData.rebackViewFuncs.push(GSController.i.showFuncSelectMenu);
        } else {
            GSController.i.showFuncSelectMenu();
        }

        //GSData.i.roundStartHasFunction = true;

        //GSController.i.showFuncSelectMenu();

        FashionTools.autoPass();


    }

    //轮到哪个方向出牌
    S2C_TurnDir(pos: number, dui_num: number, gang_end: any = null) {

        GSController.i.clearDelayPushInterval();

        this.gData.turnDir = this.gData.getDir(pos);
        console.log("轮到 " + this.gData.turnDir + " 抓牌");

        game.roomPaidui = dui_num;

        if (this.gData.turnDir != 1 && PublicVal.state != StateType.shuffle) {// && this.gData.isZhuangPush) {
            //轮到他人的时候，并且庄家出完牌,进行假象牌的添加
            this.gData.pushHandPai(this.gData.turnDir, null);
            GSController.i.catchCard(this.gData.turnDir);
        }

        GSController.i.setArrowDir(this.gData.turnDir);
        GSController.i.updateCenterInfo();
        GSController.i.gsView.updateRoom();
        GSController.i.gsView.resetAllChildrenTouch();
    }

    //更新自己抓牌
    S2C_OwnCatch(pai: any, dui_num: number, fen: boolean = false) {

        this.gData.setCatchPai(1, pai);

        this.gData.pushHandPai(1, pai);

        game.roomPaidui = dui_num;

        this.gData.turnDir = (fen ? 0 : 1);

        if (fen) {
            console.log("尾局分张");
            PublicVal.state = StateType.fen;
        }

        GSController.i.catchCard(1);

        GSController.i.updateCenterInfo();

        GameSound.play("sound_card_hover");

        FashionTools.autoPush();
    }

    S2C_Bao(obj: any) {

        console.log("换宝!");

        //this.gData.baoPai = obj.bao;

        PublicVal.i.bao = obj.bao;

        game.roomPaidui = obj.dui_num;

        GSController.i.playBao();
    }

    //更新结果 cur是当前分数
    S2C_FuncResult(data: any) {
        var action = data.action;
        var pai = data.pai;
        var pos = data.turn;
        var cur = data.cur;
        var dir = this.gData.getDir(pos);

        this.gData.isShowFunc = false;

        var poolPai: any = null;

        switch (action) {
            case 1://吃
                game.manager.soundPlay(InterruptType.chi, pos);
                this.gData.addFuncPai(5, dir, action, pai);
                if (dir == 1) {
                    //删除手牌数据
                    this.gData.removeOwnHandPais([pai[0], pai[2]]);
                } else {
                    //删除手上两张牌
                    this.gData.removeOtherHandPai(dir, 2);
                }
                poolPai = pai[1];
                break;
            case 2://碰
                game.manager.soundPlay(InterruptType.peng, pos);
                this.gData.addFuncPai(4, dir, action, pai);
                if (dir == 1) {
                    //删除手牌数据
                    this.gData.removeOwnHandPais([pai[0], pai[2]]);
                } else {
                    //删除手上两张牌
                    this.gData.removeOtherHandPai(dir, 2);
                }
                poolPai = pai[1];
                break;
            case 4://听牌
                game.manager.soundPlay(InterruptType.ting, pos);
                var head:HeadIcon = GSController.i.gsView.getHeadView(dir);
                head.isTing = true;
                break;
            case 22://幺九杠
            // GameSound.play((pai[0].number == 1 ? "yaogang_" : "jiugang_") + this.gData.getSexByPos(pos));
            // this.gData.addFuncPai(3, dir, action, pai, pai[0].number, true);
            // if (dir == 1) {
            //     //删除手牌数据 3
            //     this.gData.removeOwnHandPais([pai[0], pai[1], pai[2]]);
            // } else {
            //     this.gData.removeOtherHandPai(dir, 3);
            //
            // GameSound.play("sound_down");
            //              break;
            case 23://旋风杠
                game.manager.soundPlay(InterruptType.fenggang, pos);

                this.gData.addFuncPai(2, dir, action, {type: 5, number: 2});
                this.gData.addFuncPai(2, dir, action, {type: 5, number: 3});
                this.gData.addFuncPai(2, dir, action, {type: 5, number: 4});
                this.gData.addFuncPai(2, dir, action, {type: 5, number: 1});

                if (dir == 1) {
                    this.gData.removeOwnHandPais(pai);
                }
                else {
                    this.gData.removeOtherHandPai(dir, 4);
                }
                break;
            case 24://暗杠
                game.manager.soundPlay(InterruptType.angang, pos);
                this.gData.addFuncPai(1, dir, action, pai);
                //删除手牌数据 3
                if (dir == 1) {
                    //删除手牌数据 4
                    this.gData.removeOwnHandPais([pai[0], pai[1], pai[2], pai[3]]);
                } else {
                    this.gData.removeOtherHandPai(dir, 4);
                }

                game.manager.dispatchEvent(EffectEvent.Xiayu, dir);//下雨特效
                break;
            case 25://明杠分(两种 1.3张手牌杠池牌 2.已经碰牌再明杠)
                game.manager.soundPlay(InterruptType.minggang, pos);
                this.gData.addFuncPai(2, dir, action, pai);

                var tmpPai = pai[0];
                //有碰就删除掉
                var removeLen = PublicVal.i.removePengFunc(dir, tmpPai) ? 1 : 3;

                if (dir == 1) {
                    if (removeLen == 1) {
                        this.gData.removeOwnHandPais([tmpPai]);
                    }
                    else {
                        this.gData.removeOwnHandPais([tmpPai, tmpPai, tmpPai]);
                    }
                } else {
                    this.gData.removeOtherHandPai(dir, removeLen);
                }
                if (removeLen == 3) poolPai = tmpPai;

                game.manager.dispatchEvent(EffectEvent.Guafeng, dir);//刮风特效
                break;
            case 26://中发白杠
                game.manager.soundPlay(InterruptType.zigang, pos);

                this.gData.addFuncPai(0, dir, action, pai, 0, true);
                if (dir == 1) {
                    this.gData.removeOwnHandPais([pai[0], pai[1], pai[2]]);
                } else {
                    this.gData.removeOtherHandPai(dir, 3);
                }
                break;
            case 27://幺九杠 补蛋
                // GameSound.play("bugang_" + this.gData.getSexByPos(pos));
                // pai.length -= 3;
                // var everPai = PublicVal.i.getPai(dir, 22, pai[0].number);
                // var everSrc = [1, 1, 1];
                // for (var i: number = 0; i < pai.length; i++) {
                //     everSrc[pai[i].type - 1]++;
                //
                // }
                // everPai.ever = everSrc;
                // if (dir == 1) {
                //     //删除手牌数据 3
                //     this.gData.removeOwnHandPais([pai[0]]);
                // } else {
                //     this.gData.removeOtherHandPai(dir, 1);
                // }
                // GameSound.play("sound_down");
                break;
            case 28://中发白  补蛋
                // GameSound.play("bugang_" + this.gData.getSexByPos(pos));
                // pai.length -= 3;
                // var everPai = PublicVal.i.getPai(dir, 26);
                // var everSrc = [1, 1, 1];
                // for (var i: number = 0; i < pai.length; i++) {
                //     everSrc[pai[i].number - 1]++;
                // }
                // everPai.ever = everSrc;
                // if (dir == 1) {
                //     //删除手牌数据 3
                //     this.gData.removeOwnHandPais([pai[0]]);
                // } else {
                //     this.gData.removeOtherHandPai(dir, 1);
                // }
                // GameSound.play("sound_down");
                break;
            case 99://胡牌
                var mjview: MJView = GSController.i.gsView.MJViews[dir];
                mjview.pushHu(pai);

                var hu_types: any[] = data.ex_hu_type;
                if (hu_types && hu_types.length) {
                    for (var i: number = 0; i < hu_types.length; i++) {
                        var val: any = hu_types[i];
                        if (val == 19) {//杠上开花
                            game.manager.soundPlay(InterruptType.gangshangkaihua, data.turn);
                        }
                        else if (val[0] == 41) {//呼叫转移
                            game.manager.soundPlay(InterruptType.hujiaozhuanyi, data.turn, this.gData.getDir(val[1]));
                        }
                        else if (val[0] == 40) {//一炮多响
                            var posArr: any = val[1];
                            var dirArr: any = [];
                            for (var j: number = 0; j < posArr.length; j++) {
                                dirArr.push(this.gData.getDir(posArr[j]));
                                if (dir != this.gData.getDir(posArr[j])) {
                                    mjview = GSController.i.gsView.MJViews[this.gData.getDir(posArr[j])];
                                    mjview.pushHu(pai);
                                }
                                if (this.gData.getDir(posArr[j]) == 1) {
                                    game.isHu = true;
                                }
                            }

                            game.manager.soundPlay(InterruptType.yipaoduoxiang, posArr[i], dirArr);
                        }
                    }
                }
                else {
                    game.manager.soundPlay(InterruptType.hu, data.turn, this.gData.turnDir == dir);
                }

                if (this.gData.turnDir != dir) {//接炮胡
                    poolPai = pai;
                }

                if (this.gData.getDir(pai.pos) == dir) {
                    if (dir == 1) {
                        this.gData.removeOwnHandPais([pai]);
                    }
                    else {
                        this.gData.removeOtherHandPai(dir, 1);
                    }
                }

                if (dir == 1) {
                    game.isHu = true
                }
                break;
            default:
                console.log("未解析的功能菜单", action);
                break;
        }

        this.gData.turnDir = dir;

        if (cur != null) {
            for (var k in cur) {
                this.gData.gangCurs[this.gData.getDir(Number(k))] = cur[k];
            }

            GSController.i.updateGangCur((action == 24 || action == 25 || action == 99) ? true : false);
        }

        //删除池子牌显示
        if (poolPai && poolPai.pos > 0) {
            PublicVal.i.popPoolPai(GSData.i.getDir(poolPai.pos));
            GSController.i.removePoolCard(GSData.i.getDir(poolPai.pos));
        }

        GSController.i.setArrowDir(dir);
        GSController.i.updateMJView(dir);
        // GSController.i.soundPlay(dir, action);

        GSController.i.playTimeEffect(true, dir == 1);
    }

    //S2C 更新打入池中的牌子
    S2C_PoolPai(obj: any) {

        GameSound.play(obj.data.type + "_" + obj.data.number + "_" + this.gData.getSexByPos(obj.data.pos));
        GameSound.play("sound_throw");

        var dir = this.gData.getDir(obj.data.pos);

        this.gData.currPoolPai = obj.data;
        this.gData.currPoolPai.dir = dir;

        //添加池牌数据
        PublicVal.i.pushPoolPai(dir, this.gData.currPoolPai);

        //清除手牌数据
        if (dir == 1) {
            PublicVal.i.removeHandPai(dir, this.gData.currPoolPai);
            // GSDataProxy.i.gData.removeOwnHandPais([this.gData.currPoolPai]);
        } else {
            GSDataProxy.i.gData.removeOtherHandPai(dir, 1);
        }

        if (PublicVal.state == StateType.ting || game.isHu) {
            GSController.i.clearDelayPushInterval();
        }

        console.log("出牌人的方位:", dir);
        //触发出牌显示
        GSController.i.pushPoolCard(dir, this.gData.currPoolPai);
    }

    S2C_FinalResult(result: any) {
        this.gData.result = result;
        GSController.i.clearDelayPushInterval();

        if (PublicVal.state == StateType.fen) {//分张 延时
            egret.setTimeout(this.delay_Final, this, 1200);
            return;
        }

        this.delay_Final();
    }

    delay_Final() {
        if (PublicVal.state == StateType.ting) {
            GSData.i.tingEndShow = true;
        }

        PublicVal.state = StateType.gameover;

        this.gData.roundStarted = true;

        var hupai = this.gData.result.hupai;

        //手牌排序
        for (var i: number = 0; i < 4; i++) {
            var left = this.gData.result.person[i].left;
            FashionTools.sortPai(left);
        }

        if (hupai == 0) {//流局
            this.gData.resultType = 3;
            var fen = this.gData.result.fen;
            var fenLeft;
            if (fen[1]) {
                fenLeft = GSData.i.getResultPersonLeft(GSData.i.getDir(1));
                this.formatLeft(fenLeft, fen[1]);
            }
            if (fen[2]) {
                fenLeft = GSData.i.getResultPersonLeft(GSData.i.getDir(2));
                this.formatLeft(fenLeft, fen[2]);
            }
            if (fen[3]) {
                fenLeft = GSData.i.getResultPersonLeft(GSData.i.getDir(3));
                this.formatLeft(fenLeft, fen[3]);
            }
            if (fen[4]) {
                fenLeft = GSData.i.getResultPersonLeft(GSData.i.getDir(4));
                this.formatLeft(fenLeft, fen[4]);
            }
        }
        else if (hupai == 1) {
            var person: any;
            for (var i: number = 0; i < GSData.i.result.person.length; i++) {
                person = GSData.i.result.person[i];
                if (this.gData.getDir(person.pos) == 1 && game.gameType == GameType.sichuan) {
                    this.gData.resultType = person.hu_type.length ? 1 : 2;
                }
            }
        }
        else {
            this.gData.result.hupaiPos = hupai.pos_hu;
            var huDir = this.gData.getDir(hupai.pos_hu);
            //胡家的剩余牌
            var hu_left = GSData.i.getResultPersonLeft(huDir);
            if (huDir == 1) {
                this.gData.resultType = 1;
            } else {
                this.gData.resultType = 2;
            }
            //自胡
            var selfHu: boolean = false;
            switch (hupai.type) {
                case 17://点炮
                    this.gData.result.dianPaoPos = hupai.pos;
                    //this.gData.result.dianPaoPai = hupai.pai;
                    GameSound.play("dianpao_" + this.gData.getSexByPos(hupai.pos_hu));
                    break;
                case 29://天胡
                    GameSound.play("zimo_" + this.gData.getSexByPos(hupai.pos_hu));
                    selfHu = true;
                    break;
                case 13://摸宝
                    GameSound.play("bao_" + this.gData.getSexByPos(hupai.pos_hu));
                    selfHu = true;
                    break;
                case 7://自摸
                    GameSound.play("zimo_" + this.gData.getSexByPos(hupai.pos_hu));
                    selfHu = true;
                    break;
            }

            if (selfHu) {
                this.formatLeft(hu_left, hupai.pai);
            } else {
                hu_left.push(hupai.pai);
            }

            GSController.i.playEffect(huDir, 99);
        }
        GSController.i.hupaiShow();
    }

    //格式下剩余牌
    formatLeft(left, pai) {
        var leftLen: number = left.length;
        for (var k: number = 0; k < leftLen; k++) {
            if (left[k].number == pai.number && left[k].type == pai.type) {
                left.splice(k, 1);
                break;
            }
        }
        if (left.length != leftLen) { //如果长度变化，说明提出了胡牌
            left.push(pai);
        }
    }

    //同步继续游戏
    S2C_ContinueGame(obj: any) {
        var dir: number = this.gData.getDir(obj.pos);
        this.gData.readyFlag |= 1 << dir;
        //玩家自己的时候刷新显示
        GSController.i.visibleReadyIcon();

        if (dir == 1) {
            GSController.i.showStateView();
        }
    }

    //同步房间玩家信息,判断方位
    S2C_RoomPlayers() {
        if (!this.gData.rebackData)this.gData.zhuangPos = 0;

        game.roomPlayerCur = 0;
        game.roomPlayerOffline = 0;
        this.gData.roomPlayers = [];

        var leave_uid = null;
        var player: PlayerVo;
        for (var uid in game.roomPlayers) {
            player = game.roomPlayers[uid];

            switch (player.status) {
                case "leave":
                    this.gData.roomPlayers[player.pos] = null;
                    leave_uid = uid;
                    //首轮开始
                    if (this.gData.roundStarted == false) {
                        if ((this.gData.readyFlag >> player.dir & 1) == 1) {
                            this.gData.readyFlag ^= 1 << player.dir;
                        }
                    }
                    break;
                case "offline":
                case "online":
                    this.gData.roomPlayers[player.pos] = player;
                    if (this.gData.roundStarted == false) {
                        this.gData.readyFlag |= 1 << player.dir;
                    }
                    game.roomPlayerCur++;
                    game.roomPlayerOffline += player.status == "offline" ? 1 : 0;
                    break;
            }
        }

        delete game.roomPlayers[leave_uid];

        Global.showIP(this.gData.roomPlayers);

        this.gData.roomOwnDir = this.gData.getDir(1);

        PublicVal.i.roomOwnFlag = 1 << this.gData.roomOwnDir;

        if (this.gData.firstInRoom) {
            this.gData.firstInRoom = false;
            //每次进房间启动游戏主界面
            GSController.i.startView();
            GSConfig.gameConfigInit();
            //设置牌面尺寸
            FashionTools.setPaiStyle(game.paiStyle);
            FashionTools.setPaiColor(game.paiColor);

            if (this.gData.rebackData) {
                //至后解析
                this.parseReback();
                this.gData.rebackData = null;
            }
            else {
                game.roomReady();
            }
        }

        GSController.i.updateRoom();

        Weixin.onMenuShareAppMessage(game.roomid + "");
        Weixin.onMenuShareTimeline(game.roomid + "");

        var diss: DissolutionPanel = StackManager.findDialog(DissolutionPanel, "DissolutionPanel");
        if (diss && LayerManager.gameLayer().panelLayer.contains(diss)) diss.refresh();
    }

    parseReback() {
        switch (this.gData.rebackStatus) {
            case 1:
                PublicVal.state = StateType.ready;
                break;
            case 3:
                PublicVal.state = StateType.gamestart;
                //解析重连牌局
                this.parseRebackPai();
                GSController.i.rebackGame();
                //GSController.i.gsView.updateAllCount(this.gData);
                break;
            case 2://重连继续牌桌
                PublicVal.state = StateType.continue;
                var gContinue: any = this.gData.rebackData.continue;
                if (gContinue.length > 0) {
                    for (var i: number = 0; i < gContinue.length; i++) {
                        var pos = gContinue[i];
                        var dir = this.gData.getDir(pos);
                        this.gData.readyFlag |= 1 << dir;
                    }
                }

                //判断显示 准备按钮
                if ((this.gData.readyFlag >> 1 & 1) == 0) {
                    GSController.i.scene.readyButton.visible = true;
                }

                //断线重连继续界面
                GSController.i.startView();
                //GSController.i.visibleReadyIcon();
                break;
        }
    }

    //同步开局牌的信息(自己牌)
    S2C_OwnCardInfo(data: any) {
        console.log("开局,牌长度:", data.pai.length);

        game.roomReady();

        PublicVal.i.bao = data.bao;

        game.roomRoundMax = data.max_round;
        game.roomRoundCur = data.cur_round;
        game.roomPaidui = data.dui_num;
        game.roomZhuangDir = this.gData.getDir(data.zhuang);

        // if (!data.pai[data.pai.length - 1]) {
        //     data.pai.pop();
        // }

        PublicVal.i.allPais[1].handPais = data.pai;
        PublicVal.i.allPais[2].handPais = new Array(game.roomZhang);
        PublicVal.i.allPais[3].handPais = new Array(game.roomZhang);
        PublicVal.i.allPais[4].handPais = new Array(game.roomZhang);

        if (game.roomZhuangDir == 1) {
            PublicVal.i.allPais[1].catchPai = data.zhuangpai;
            //移除手牌里的庄牌
            FashionTools.removePai(PublicVal.i.allPais[1].handPais, data.zhuangpai);
        }
        else {
            // PublicVal.i.allPais[game.roomZhuangDir].handPais = new Array(game.roomZhang + 1);
        }

        this.gData.zhuangPos = data.zhuang;

        this.gData.zhuangDir = this.gData.getDir(data.zhuang);

        PublicVal.i.zhuangFlag = 1 << this.gData.zhuangDir;

        //判断连庄
        if (data.zhuang == this.gData.lastZhuangPos) {
            this.gData.isLianZhuang = true;
        } else {
            this.gData.isLianZhuang = false;
            this.gData.lastZhuangPos = data.zhuang;
        }

        //分数
        for (var key in data.cur) {
            GSData.i.gangCurs[GSData.i.getDir(+key)] = data.cur[+key];
        }

        PublicVal.state = StateType.gamestart;

        GSController.i.startGame();

        //执行换三张
        if (game.status == GameStatus.changeThree && !game.statusComplete) {
            game.manager.dispatchEvent(EffectEvent.ChangeThree);
        }
    }

    //牌局都准备好.可以出牌
    S2C_RoundReadyAll() {

        if (PublicVal.state == StateType.shuffle) {

            this.gData.roundReady++;

            if (this.gData.roundReady == 4) {

                GSController.i.roundPlay();

            }
        }
    }
}