/**
 * Created by Administrator on 2016/10/29.
 */
class GSData{

    //旋风杠、幺九杠、碰牌（万、条、饼）、吃牌（万、条、饼）

    static _i : GSData;


    static get i(){

        return GSData._i || (GSData._i = new GSData);
    }


    //------------暂时无用----------//////////
    //庄家是否出过牌
    //isZhuangPush:boolean;

    //更新轮到别人抓牌(庄家出完牌算开始抓牌!)
    //gang_end:boolean;
    //---------------------------------------




    roomPlayers:RoomPlayer[];

    //根据uid存储
    roomPlayerMap = {};

    roomID:number;

    roomPass:number = 0;

    //玩家自己的pos
    //ownPos:number;

    //leftCount:number;

    dir2Pos:any = {};

    pos2Dir:any = {};

    //庄的pos
    zhuangPos:number = -1;
    //庄的dir
    zhuangDir:number;

    //轮到哪个方位抓牌
    turnDir:number;

    fen:boolean;

    funcSelects : any;

    chiObj:any;//属于funcSelects里的

    //四方向牌
    //allPais = {};

    //当前池牌
    currPoolPai:any;

    //结算对象 存个data
    result  ;

    //baoPai:any;

    //zhuangFlag:number = 0;

    //roomOwnFlag:number = 0;

    readyFlag:number = 0;

    roomOwnDir:number = 0;

    //牌局开始过
    roundStarted:boolean;

    turnPos:number;

    //当前局数
    //cur_round:number;
    //总局数
    //max_round:number;

    //重连后上来的四方牌局

    rebackData:any;

    //重连上来的状态
    rebackStatus:number = 0;

    //重连的开始功能缓存执行显示
    rebackViewFuncs:any[] = [];


    //结算类型 1-3 :胜利 失败 流局
    resultType:number;



    //首次进入某房间
    firstInRoom:boolean;

    //开局是否有功能菜单
    //roundStartHasFunction:boolean;

    //杠的分数
    gangCurs:number[];

    //rules:string;

    //准备听牌
    readyTing:boolean;

    //牌局准备好
    roundReady:number;

    lastZhuangPos:number;
    //是否连庄
    isLianZhuang:boolean;

    //断线重连后是否听牌
    backTing:number;

    //听牌结束后摊牌亮牌
    tingEndShow:boolean;

    //是否听牌局
    hasTingRule:boolean;

    //玩家辅助数据
    playerDB : PlayerDB;

    constructor(){

        this.playerDB = new PlayerDB;

        this.clear();

    }

    //所有数据清理
    clear(){

        this.roundReset();

        PublicVal.state = 1;

        this.firstInRoom = false;

        PublicVal.i.cur_round = 1;

        this.roomPlayerMap = {};

        this.roundStarted = false;

        this.readyFlag = 0;

        this.gangCurs = [0,0,0,0,0];

        this.lastZhuangPos = 0;

        this.isLianZhuang = false;

        this.hasTingRule = false;

        this.playerDB.clearReadyFlags();

    }

    //继续回合的部分数据重置
    roundReset(){

        PublicVal.i.clear();

        this.roundReady = 0;

        PublicVal.state = 2;


        this.turnDir = 0;
        this.isShowFunc = false;

        this.fen = false;

        this.funcSelects = [];

        this.readyTing = false;

        this.backTing = 0;

        this.tingEndShow = false;

    }
    //排序手牌
/*    sortHandPai(pais:any = null){

        if(pais == null) pais = PublicVal.i.allPais[1].handPais;

        pais.sort((a,b)=>{
            var _a = a.type * 10 + a.number;
            var _b = b.type * 10 + b.number;
            if(_a > _b) return 1;
            if(_a == _b) return 0;
            if(_a<_b) return -1;
        });
    }*/

    setHandPais(dir,pais){
        PublicVal.i.allPais[dir].handPais = pais;
    }



    //添加功能牌
    pushFuncPais(dir,obj){

        var funcPais = PublicVal.i.getFuncPais(dir);

        funcPais.push(obj);

    }

    //设置池牌
    setPoolPais(dir,pais){

        PublicVal.i.allPais[dir].poolPais = pais;
    }


    //获取抓牌
    getCatchPai(dir:number){
        return PublicVal.i.allPais[dir].catchPai;
    }
    //赋值抓牌
    setCatchPai(dir,pai){
        PublicVal.i.allPais[dir].catchPai = pai;
    }

    //删除其他人的手牌
    removeOtherHandPai(dir:number,count:number){
        var handPais = PublicVal.i.getHandPais(dir);
        handPais.length -= count;
    }
    //手牌移除
    /*removeHandPai(dir:number,pai:any = null){

        var handPais = PublicVal.i.getHandPais(dir);

        if(dir == 1) {

            console.log("删除自己手牌:",pai.type,pai.number);

            for (var i: number = 0; i < handPais.length; i++) {

                var handPai = handPais[i];
                if (handPai.type == pai.type && handPai.number == pai.number) {

                    handPais.splice(i, 1);
                    //重新排序
                    FashionTools.sortPai(handPais);
                    break;
                }
            }
        }else{
            handPais.length --;
        }
    }*/


    //删除自己多张手牌
    removeOwnHandPais(pais:any[]){

        for(var i:number = 0 ;i < pais.length;i++){

            console.log("删除自己多张手牌:",pais[i].type,pais[i].number);
        }

        var handPais = PublicVal.i.getHandPais(1);

        while(pais.length){

            var pai = pais.shift();

            for(var i = 0;i<handPais.length;i++) {

                var handPai = handPais[i];

                if(pai.type == handPai.type && pai.number == handPai.number){

                    handPais.splice(i,1);

                    break;
                }
            }

        }
        //this.sortHandPai();
        FashionTools.sortPai(handPais);
    }

    //添加开局手牌(假象)
    pushStartHandPai(){

        var dir = this.zhuangDir;

        var catchPai = this.getCatchPai(dir);

        this.pushHandPai(dir,catchPai);

    }

    //手牌添加
    pushHandPai(dir:number,pai:any){
        var handPais = PublicVal.i.getHandPais(dir);
        handPais.push(pai);

    }


    getSexByPos(pos:number){

        return this.getRoomPlayerByPos(pos).sex == "1"? 1:0;

    }





    //往功能牌型里添加牌 排序 方位 功能 牌
    addFuncPai(sort:number,dir:number,action:number,pai:any[],number:number = 0,ever : any = null ) {

        var funcPais = PublicVal.i.getFuncPais(dir);

        if (ever != null) ever = [1, 1, 1];

        if (action == 1) {
            pai[0].number > pai[2].number && pai.reverse();
        }

        var addPaiObj: any = {pai: pai, number: number, ever: ever};

        for (var i: number = 0; i < funcPais.length; i++) {

            var obj = funcPais[i];

            if (obj.action == action) {

                obj.pais.push(addPaiObj);

                return;
            }
        }
        funcPais.push({sort: sort, action: action, pais: [addPaiObj]});
    }





    //获取功能选项存储
    getFuncSelectByIndex(index:number){

        for(var i:number = 0 ; i < this.funcSelects.length;i++){

            if(index == this.funcSelects[i].index){

                return this.funcSelects[i];
            }
        }
    }

    isShowFunc:boolean;

    //获取
    getResultPersonLeft(dir:number){

        var pos = PublicVal.i.getPlayerPos(dir);

        for(var i:number = 0 ; i < this.result.person.length;i++){

            var person = this.result.person[i];

            if(person.pos == pos) return person.left;

        }

    }

    //根据pos获取玩家信息
    getRoomPlayerByPos(pos:number):RoomPlayer{

        return this.roomPlayers[pos];

    }
    //根据dir获取玩家信息
    getRoomPlayerByDir(dir:number){

        return this.getRoomPlayerByPos(PublicVal.i.getPlayerPos(dir));

    }


}
