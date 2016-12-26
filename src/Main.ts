class Main extends eui.UILayer {

    /**
     * 构造函数解析URL
     */
    public constructor() {
        super();

        // var str:string = '{"sequence":11,"data":{"turn":1,"pai":[{"type":5,"number":1},{"type":5,"number":2},{"type":5,"number":3},{"type":5,"number":4}],"ex_hu_type":[],"cur":{"4":0,"3":0,"2":0,"1":0},"action":23},"code":0}';
        // console.log(JSON.parse(str));
        // console.log(eval('(' + str + ')'));
        // console.log( (new Function("return " + str))());

        var variables: egret.URLVariables = new egret.URLVariables(location.search);
        var accessType = variables.variables["accessType"];
        var roomid = variables.variables["roomid"];
        var user = variables.variables["users"];
        var ip = variables.variables["ip"];
        var port = variables.variables["port"];
        var code = variables.variables["code"];

        user = user == "" ? null : user;
        ip = ip == "" ? null : ip;
        port = port == "" ? null : port;
        code = code == "" ? null : code;

        console.log(roomid, user, code, accessType);

        game.roomid = roomid;
        game.user = user;
        game.ip = ip;
        game.port = port;

        GameConfig.code = code;

        if (user) {
            GameConfig.address_game.ip = GameConfig.address_test.ip;
            GameConfig.address_game.port = GameConfig.address_test.port;
            return;
        }

        //TODO 动态修改游戏地址访问地址
        if (accessType == "test") {//测试
            GameConfig.clientUrl = GameConfig.protocolType + GameConfig.domainName + "chuanma/test.html";
        }
        else {//正式
            GameConfig.clientUrl = GameConfig.protocolType + GameConfig.domainName + "chuanma/game.html";
        }

        //本地存储code比对, 如果相同则视为无效登录
        if (GameLocal.getData(GameLocal.loginCode) == code) {
            code = null;
        }

        if (!user && !code) {
            Weixin.getAccessCode(GameConfig.appid, GameConfig.clientUrl, roomid);
            return;
        }

        GameLocal.setData(GameLocal.loginCode, code);

        var _this = this;
        HttpNetwork.pull(GameConfig.protocolType + GameConfig.address_center.ip + ":" + GameConfig.address_center.port + "/", function (obj) {
            GameConfig.address_http.ip = obj.addrr;
            GameConfig.address_http.port = obj.auth_port;
            GameConfig.address_game.ip = obj.addrr;
            GameConfig.address_game.port = obj.port;

            _this.wxConfig();
        }, this, "action=serverlist");
    }

    private wxConfig() {
        var sss: any = {"role": "user", "mod": "mod_auths", "fun": "auth_signature", "args": {}};

        var arr: Array<string> = ["closeWindow", "hideMenuItems", "onMenuShareAppMessage", "onMenuShareTimeline", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"];

        HttpNetwork.pull(GameConfig.protocolType + GameConfig.address_http.ip + ":" + GameConfig.address_http.port, function (obj) {
            if (obj.message != "error") {
                var data:any = JSON.parse(obj.message);
                Weixin.config(
                    GameConfig.appid,
                    data.timestamp,
                    data.noncestr,
                    data.signature,
                    arr
                );
            }
        }, this, "action=" + JSON.stringify(sss));
    }

    protected createChildren(): void {
        super.createChildren();

        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        this.startGame();

        // RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        // RES.loadGroup("loading");
    }

    /**
     * 资源加载完成
     * @param e
     */
    private onResourceLoadComplete(e: RES.ResourceEvent): void {
        if (e.groupName == "loading") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

            this.startGame();
        }
    }

    private startGame() {
        game.init(this.stage);
        SceneManager.open("LoadingScene");
    }
}