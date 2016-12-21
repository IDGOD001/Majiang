class LoadingScene extends eui.Component {

    lab_info: eui.Label;
    lab_progress: eui.Label;
    img_icon: eui.Image;

    public constructor() {
        super();
        this.skinName = "LoadingSceneSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.touchChildren = false;

        this.lab_info.text = "正在加载游戏资源···";
        this.lab_progress.visible = false;

        var _this = this;
        egret.Tween.get(this.img_icon, {loop: true}).to({rotation: -360}, 3000).call(function () {
            _this.img_icon.rotation = 0;
        }, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

        RES.loadGroup("game");
    }

    private onResourceProgress(e: RES.ResourceEvent): void {
        if (e.groupName == "game") {
            this.lab_progress.text = "" + Math.floor(e.itemsLoaded / e.itemsTotal * 100) + "%";
            this.lab_progress.visible = true;
        }
    }

    /**
     * 资源加载完成
     * @param e
     */
    private onResourceLoadComplete(e: RES.ResourceEvent): void {
        if (e.groupName == "game") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

            this.lab_info.text = "正在拉取用户信息···";

            game.manager.socketManager.connect();
        }
    }

    public onIn(): void {
        SceneManager.open("MainScene");
    }
}