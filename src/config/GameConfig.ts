/**
  * 游戏配置文件
  */
class GameConfig {

    //协议类型
    static protocolType: string = "https://";
    //游戏域名
    static domainName: string = "mj.h5sd.com/";
    //游戏地址
    static clientUrl: string = GameConfig.protocolType + GameConfig.domainName + "shenyang/game.html";
    //分享默认图
    static shareImgUrl: string = GameConfig.protocolType + GameConfig.domainName + "shenyang/share.png";

    //中心服务器地址 注意：这两个更换测试服 一定要改
    static address_center: any = {ip: "shenyang01.h5sd.com", port: 10416};   //dbmj01.h5sd.com   lyqptest.h5sd.com
    //HTTP服务器地址
    static address_http: any = {ip: "shenyang01.h5sd.com", port: 9009};
    //游戏服务器地址
    static address_game: any = {ip: "shenyang01.h5sd.com", port: 10415};
    //测试游戏服务器地址
    static address_test: any = {ip: "192.168.2.22", port: 10415};

    //TODO 微信
    //公众号的唯一标识
    static appid: string = "wxb6349744356b5312";
    //回调code
    static code: string;

    //TODO 常规设置
    //默认字体
    static defaultFont: string = "微软雅黑";

    //换三张的限制时间(单位:秒)
    static ChangeThreeTime: number = 60;

    //游戏名称
    static get name() {
        var str: string;
        switch (game.gameType) {
            case GameType.sichuan:
                str = "欢乐四川麻将";
                break;
            case GameType.shenyang:
                str = "沈阳麻将";
                break;
        }

        return str;
    }

    //对局
    static get round() {
        var str: string = "";
        switch (game.gameType) {
            case GameType.sichuan:
                str += game.roomRoundMax + "局";
                break;
            default:
                str += (game.roomRoundMax / 4) + "圈";
                break;
        }

        return str;
    }
}