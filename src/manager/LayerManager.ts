/**
* 游戏容器类
* EgerPro显示对象层级
* Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
*/
class LayerManager extends eui.UILayer {

    private static _i: LayerManager;

    //游戏容器管理器单例
    static gameLayer(): LayerManager {
        return this._i || (this._i = new LayerManager());
    }

    // 主界面
    public sceneLayer: eui.UILayer = new eui.UILayer();
    // 麻将
    public mainLayer: eui.UILayer = new eui.UILayer();
    // 特效层 如 闪烁、飘字之类的  (目前是放喇叭  鼠标事件是没有的)
    public effectLayer: eui.UILayer = new eui.UILayer();
    // 弹窗
    public panelLayer: eui.UILayer = new eui.UILayer();
    // 通讯遮罩层 和服务器通讯UI
    public maskLayer: eui.UILayer = new eui.UILayer();
    // 加载遮罩层 场景切换的时候加载资源UI
    public loadLayer: eui.UILayer = new eui.UILayer();

    //装喇叭的容器
    public hornGroup: eui.Group;

    //构造方法
    public constructor() {
        super();
        this.init();
    }

    //初始化场景类
    public init(): void {
        this.touchThrough = true;
        this.sceneLayer.touchThrough = true;
        this.panelLayer.touchThrough = true;
        this.mainLayer.touchThrough = true;
        this.effectLayer.touchThrough = true;
        this.maskLayer.touchThrough = true;
        this.loadLayer.touchThrough = true;
        this.addChild(this.sceneLayer);
        this.addChild(this.mainLayer);
        this.addChild(this.maskLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.loadLayer);

        this.setLayerVisible(false, "mainLayer");

        this.hornGroup = new eui.Group();
        this.hornGroup.horizontalCenter = 0;
        this.hornGroup.top = 150;
        this.hornGroup.width = 718;
        this.hornGroup.height = 38;

        this.effectLayer.addChild(this.hornGroup);

        this.effectLayer.touchEnabled = false;

        this.effectLayer.touchChildren = false;

        this.loadLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoad, this);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpen, this);
    }

    private onOpen(): void {
        GameMusic.PlaySound("music_scene");
    }

    private onClickLoad(): void {
        Global.showShare();
    }

    /**
     * 打开麻将界面层级，将自动关闭主界面层级
     */
    public openMainLayer(): void {
        this.setLayerVisible(false, "sceneLayer");
        this.setLayerVisible(true, "mainLayer");
        GSController.i.jiesuanData = null;
    }

    /**
     * 打开主界面层级，将自动关闭麻将层级
     */
    public openSceneLayer(): void {
        this.setLayerVisible(true, "sceneLayer");
        this.setLayerVisible(false, "mainLayer");

        Weixin.onMenuShareAppMessage();

        Weixin.onMenuShareTimeline();
    }

    /**
     * 设置层级可见
     * @param t      true为可见  false为不可见
     * @param name   要操作的层级的名字
     */
    public setLayerVisible(t: boolean = false, name: string): void {
        if (this["" + name]) {
            this["" + name].visible = t;
        }
        else {
            EffectUtils.showTips("未找到这个场景类", 5);
        }
    }
}