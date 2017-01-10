/**
 * GameCore
 * @Author Ace.c
 * @Create 2016-12-05 16:08
 */
class game {

    //游戏类型
    static gameType: GameType = GameType.shenyang;
    //版本号
    static version: string = "0.1.0";

    //舞台
    static stage: egret.Stage;
    //管理
    static manager: GameManager = GameManager.i;
    //询问提示面板
    static askPanel: TipsAskPanel;
    //警示提示
    static warning: TipsWarning;
    //最顶层显示面板
    static topPanel: BasePanel;
    //解散房间
    static dissolution: DissolutionVo;
    //换三张
    static changeThreeVo: ChangeThreeVo;

    //服务器地址
    static ip: any;
    //服务器端口
    static port: any;
    //用户
    static user: string;

    //牌风格
    static paiStyle: number = 1;
    //牌颜色
    static paiColor: number = 1;

    //玩家信息
    static player: PlayerVo;
    //房间-ID
    static roomid: number = 0;
    //房间-规则
    static roomRules: any[] = [];
    //房间-规则文本
    static get roomRuleText(): string {
        return RuleConfig.ruleText(this.roomRules);
    }

    //房间-番数
    static roomRate: number = 1;
    //房间-牌张(默认13张,特殊规则需要特殊处理,转至RuleConfig)
    static roomZhang: number = 13;
    //房间-最大局数
    static roomRoundMax: number;
    //房间-当前局数
    static roomRoundCur: number;
    //房间-玩家
    static roomPlayers: any = {};
    //房间-玩家最大数量
    static roomPlayerMax: number = 4;
    //房间-玩家当前数量
    static roomPlayerCur: number = 0;
    //房间-玩家离线数量
    static roomPlayerOffline: number = 0;
    //房间-玩家换三张记录
    static roomHuan: any = {};
    //房间-玩家缺门记录
    static roomQue: any = {};
//房间-玩家听牌记录
    static roomTing: any = {};
    //房间-牌堆剩余
    static roomPaidui: number;
    //房间-庄家方向
    static roomZhuangDir: Dir4;

    //是否是房主
    static isRoomOwner: boolean = false;
    //是否正在换牌中
    static isChangeThree: boolean = false;
    //是否正在订缺中
    static isQue: boolean = false;
    //是否正在胡牌中
    static isHu: boolean = false;
    //是否正在听牌中
    static isTinging: boolean = false;

    //当前状态
    static status: GameStatus = GameStatus.gamestart;
    //当前状态是否完成
    static statusComplete: boolean = false;

    //战绩详情用户列表
    static recordInfos: any;
    //广播索引
    static noticeIndex: number = 0;
    //广播内容列表
    static noticeList: string[] = [];

    static init(stage) {
        this.stage = stage;

        acekit.init(stage);
        GameLocal.init();
        this.manager.init();

        stage.addChild(LayerManager.gameLayer());
        this.askPanel = new TipsAskPanel();
        this.warning = new TipsWarning();

        game.player = new PlayerVo();

        game.changeThreeVo = new ChangeThreeVo();

        game.paiStyle = +GameLocal.getData(GameLocal.style);
        game.paiColor = +GameLocal.getData(GameLocal.color);

        switch (this.gameType) {
            case GameType.sichuan:
                GameConfig.address_test.ip = "192.168.2.251";
                GameConfig.address_test.port = 10615;
                break;
            case GameType.shenyang:
            default:
                GameConfig.address_test.ip = "192.168.2.22";
                GameConfig.address_test.port = 10415;
                break;
        }
    }

    //初始化房间方向
    static initRoomDir() {
        PublicVal.i.ownPos = game.userPos;

        var gData = GSDataProxy.i.gData;
        var a = PublicVal.i.ownPos;
        var b = 1 + (PublicVal.i.ownPos) % 4;
        var c = 1 + (PublicVal.i.ownPos + 1) % 4;
        var d = 1 + (PublicVal.i.ownPos + 2) % 4;

        gData.dir2Pos[1] = a;
        gData.dir2Pos[2] = b;
        gData.dir2Pos[3] = c;
        gData.dir2Pos[4] = d;

        gData.pos2Dir[a] = 1;
        gData.pos2Dir[b] = 2;
        gData.pos2Dir[c] = 3;
        gData.pos2Dir[d] = 4;
    }

    //房间准备
    static roomReady() {
        this.status = GameStatus.unknow;
        this.statusComplete = false;
        this.roomHuan = {};
        this.roomQue = {};
        this.roomTing = {};
        this.isHu = false;
        game.manager.dispatchEvent(EffectEvent.CleanAll);
    }

    //清理房间
    static roomClean() {
        game.roomid = 0;
        game.roomRules = [];
        game.roomPlayers = {};
    }

    //用户所在的牌桌位置
    static get userPos() {
        return this.roomPlayers[this.player.uid].pos;
    }

    //用户所在的牌桌方向
    static get userDir() {
        return GSData.i.getDir(this.roomPlayers[this.player.uid].pos);
    }

    //舞台宽度
    static get stageWidth() {
        return this.stage.stageWidth;
    }

    //舞台高度
    static get stageHeight() {
        return this.stage.stageHeight;
    }

    //房主
    static get roomOwner() {
        for (var uid in game.roomPlayers) {
            if (game.roomPlayers[uid].dir == 1) {
                return game.roomPlayers[uid];
            }
        }
    }
}