class SocketManager extends SocketNetwork {

    private static _i: SocketManager;
    static get i(): SocketManager {
        return this._i || (this._i = new SocketManager());
    }

    private status: ConnectStatus;
    private timestamp: number;

    public Agree: any = {};

    constructor() {
        super();

        this.init();
    }

    init() {
        for (var name in MessageID) {
            var Clazz = egret.getDefinitionByName(name);
            if (Clazz) {
                this.Agree[name] = new Clazz;
            }
        }
    }

    closeHandler() {
        super.closeHandler();

        console.log(this.timestamp, common.timestamp);

        switch (this.status) {
            case ConnectStatus.connecting://连接中断开
                if (common.timestamp - this.timestamp < 1000) {
                    this.networkIsNot();
                }
                else {
                    this.connectTimeOut();
                }
                break;
            case ConnectStatus.connected://连接成功后断开
                this.loginConflict();
                break;
            case ConnectStatus.connectFail://连接失败后断开
                this.loginFail();
                break;
            case ConnectStatus.connectOld://游戏过程中断开
            default:
                this.networkNotgood();
                break;
        }
    }

    connect() {
        this.status = ConnectStatus.connecting;

        var linkType: number = GameConfig.protocolType == "https://" ? 1 : 2;
        var ip: string;
        var port: number;

        if (game.ip && game.port) {
            ip = game.ip;
            port = game.port;
        }
        else if (game.user) {
            linkType = 2;
            ip = GameConfig.address_test.ip;
            port = GameConfig.address_test.port;
        }
        else {
            ip = GameConfig.address_game.ip;
            port = GameConfig.address_game.port;
        }

        this.timestamp = common.timestamp;

        super.connect(ip, port, linkType);
    }

    send(messageID: number, data: any = null) {
        var request = this.Agree["_" + messageID];
        if (request) {
            if (data && messageID != 1) {
                data.sequence = messageID;
            }

            super.send(request.writeData(data));

            console.log("<<Send>>---------:  ", messageID, data);
        }
        else {
            console.log("Error messageID=" + "_" + messageID);
        }
    }

    readUTF() {
        super.readUTF();

        console.log("==================", this.data);

        switch (this.data) {
            case "start":
            case "\"start\"":
                this.status = ConnectStatus.connected;
                if (game.player.code) {
                    this.send(1, {
                        uid: game.player.uid,
                        code: game.player.code,
                        length: game.player.code.length
                    });
                }
                else {
                    this.send(1);
                }
                break;
            case "end":
            case "\"end\"":
                this.status = ConnectStatus.connectFail;
                break;
            default:
                this.status = ConnectStatus.connectOld;

                // var obj: any = JSON.parse(this.data);
                // var obj: any = eval('(' + this.data + ')');
                var obj: any = (new Function("return " + this.data))();

                if (obj.code > 0) {
                    var msg: string = TextConfig.errorCodes[obj.code];
                    EffectUtils.showTips(msg ? msg : "错误代码：" + obj.code, 5);
                    return;
                }

                var msgId = "S" + obj.sequence;
                var response = this.Agree[msgId];

                if (response) {
                    console.log(">>Read<<---------:  ", msgId, obj.data);
                    response.parseData(obj);
                }
                else {
                    console.log("Error messageID=" + msgId + ",data=", obj.data);
                }
                break;
        }
    }

    /**
     * 登录失败
     */
    private loginFail() {
        game.askPanel.showMsg(function (r: boolean) {
            if (r) {
                Weixin.getAccessCode(GameConfig.appid, GameConfig.clientUrl, game.roomid);
            }
            else {
                Weixin.closeWindow();
            }
        }, "登录失败，是否重新登录？\n取消将退出游戏。", "重新登录", "取消");
    }

    /**
     * 登录冲突
     */
    private loginConflict() {
        var _this = this;
        game.askPanel.showMsg(function (r: boolean) {
            if (r) {
                Weixin.getAccessCode(GameConfig.appid, GameConfig.clientUrl, game.roomid);
            }
            else {
                Weixin.closeWindow();
            }
        }, "登录失败，请检查是否在其他设备登录。\n取消将退出游戏", "重新登录", "取消");
    }

    /**
     * 连接超时
     */
    private connectTimeOut() {
        var _this = this;
        game.askPanel.showMsg(function (r: boolean) {
            if (r) {
                _this.connect();
            }
            else {
                Weixin.closeWindow();
            }
        }, "连接超时，是否重新连接？\n取消将退出游戏。", "重新连接", "取消");
    }

    /**
     * 网络不加
     */
    private networkNotgood() {
        var _this = this;
        game.askPanel.showMsg(function (r: boolean) {
            if (r) {
                _this.connect();
            }
            else {
                Weixin.closeWindow();
            }
        }, "您的网络不加，连接已经断开，是否重新连接？\n取消将退出游戏。", "重新连接", "取消");
    }

    /**
     * 没有网络
     */
    private networkIsNot() {
        var _this = this;
        game.askPanel.showMsg(function (r: boolean) {
            if (r) {
                _this.connect();
            }
            else {
                Weixin.closeWindow();
            }
        }, "无法检测到网络，请确认网络连接后，尝试重新连接。\n取消将退出游戏。", "重新连接", "取消");
    }
}