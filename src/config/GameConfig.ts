/**
  * 游戏配置文件
  */
class gameConfig {

    //协议类型
    static protocolType: string = "https://";
    //游戏域名
    static domainName: string = "weixinhlmj.37gjw.com/";
    //游戏地址
    static clientUrl: string = gameConfig.protocolType + gameConfig.domainName + "chuanma/game.html";
    //分享默认图
    static shareImgUrl:string = gameConfig.protocolType + gameConfig.domainName + "chuanma/share.png";

    //TODO 微信
    //公众号的唯一标识
    static appid: string = "wx1310f5f590acf9d5";
    //回调code
    static code: string;

    //是否在线
    static isOnLine: boolean = navigator.onLine;

    //中心服务器地址 注意：这两个更换测试服 一定要改
    static address_center: any = {ip: "sichuan01.37gjw.com", port: 10416};   //dbmj01.h5sd.com   lyqptest.h5sd.com
    //HTTP服务器地址
    static address_http: any = {ip: "sichuan01.37gjw.com", port: 9009};
    //游戏服务器地址
    static address_game: any = {ip: "sichuan01.37gjw.com", port: 10415};
    //测试游戏服务器地址
    static address_test: any = {ip: "192.168.2.251", port: 10615};

    //TODO 常规设置
    //通用字体
    static FontFamily: string = "微软雅黑";

    //游戏提示
    static gamewarmList: string[] = [
        "推广员咨询请联系微信：hlscmj01；关注微信公众号【欢乐川麻】，领取房卡奖励；文明娱乐，禁止赌博。"
    ];

    //消息提示  0正常无提示
    static msgList: any = {
        1: "人已经满了！",
        2: "牌局已经开始了！",
        3: "房间不存在或已过期！",
        4: "参数不合法",
        5: "状态不合法",
        6: "已经在房间里了",
        7: "查无此人",
        8: "不能绑定你自己",
        9: "你已经有代理了",
        10: "不支持此房间类型",
        11: "未定义的code",
        12: "未定义的code",
        13: "您的房卡不够",
        14: "记录已过期",
        17: "您已经投过票了"
    };

    //聊天内容
    static chat: any = {
        0: {"text": "你太牛了！", "id": 0},
        1: {"text": "哈哈，手气真好。", "id": 1},
        2: {"text": "快点出牌呀。", "id": 2},
        3: {"text": "今天真高兴。", "id": 3},
        4: {"text": "你放炮，我不胡！", "id": 4},
        5: {"text": "你家里是开银行的吧？", "id": 5},
        6: {"text": "不好意思，我有事要先走一步啦。", "id": 6},
        7: {"text": "你的牌打的太好了。", "id": 7},
        8: {"text": "大家好，很高兴见到各位", "id": 8},
        9: {"text": "怎么又断线了，网络怎么这么差呀？", "id": 9}
    };
}