/**
  * 游戏配置文件
  */
var GameConfig = (function () {
    function GameConfig() {
    }
    Object.defineProperty(GameConfig, "name", {
        //游戏名称
        get: function () {
            var name;
            switch (game.gameType) {
                case GameType.sichuan:
                    name = "欢乐四川麻将";
                    break;
                case GameType.shenyang:
                    name = "沈阳麻将";
                    break;
            }
            return name;
        },
        enumerable: true,
        configurable: true
    });
    //协议类型
    GameConfig.protocolType = "https://";
    //游戏域名
    GameConfig.domainName = "weixinhlmj.37gjw.com/";
    //游戏地址
    GameConfig.clientUrl = GameConfig.protocolType + GameConfig.domainName + "chuanma/game.html";
    //分享默认图
    GameConfig.shareImgUrl = GameConfig.protocolType + GameConfig.domainName + "chuanma/share.png";
    //中心服务器地址 注意：这两个更换测试服 一定要改
    GameConfig.address_center = { ip: "sichuan01.37gjw.com", port: 10416 }; //dbmj01.h5sd.com   lyqptest.h5sd.com
    //HTTP服务器地址
    GameConfig.address_http = { ip: "sichuan01.37gjw.com", port: 9009 };
    //游戏服务器地址
    GameConfig.address_game = { ip: "sichuan01.37gjw.com", port: 10415 };
    //测试游戏服务器地址
    GameConfig.address_test = { ip: "192.168.2.22", port: 10415 };
    //TODO 微信
    //公众号的唯一标识
    GameConfig.appid = "wx1310f5f590acf9d5";
    //TODO 常规设置
    //默认字体
    GameConfig.defaultFont = "微软雅黑";
    //换三张的限制时间(单位:秒)
    GameConfig.ChangeThreeTime = 60;
    return GameConfig;
}());
//# sourceMappingURL=GameConfig.js.map