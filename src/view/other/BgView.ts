/**
 * BgView
 * @Author Ace.c
 * @Create 2016-12-12 14:28
 */
class BgView extends BaseGameSprite {

    private curtain: eui.Image;
    private title: eui.Image;
    private close: eui.Button;

    private callback: Function;
    private thisobj: any;

    constructor() {
        super();

        this.skinName = "BgViewSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.setType(BgViewType.pattern);

        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    }

    private closeHandler() {
        if (this.callback) {
            this.thisobj ? this.callback.call(this.thisobj) : this.callback();
        }
    }

    addCallback(callback: Function, thisobj?: any) {
        this.callback = callback;
        this.thisobj = thisobj;
    }

    /**
     * 隐藏关闭按钮
     */
    hideClose() {
        this.close.visible = false;
    }

    /**
     * 显示关闭按钮
     */
    showClose() {
        this.close.visible = true;
    }

    /**
     * 设置显示
     * @param type
     */
    setType(type: BgViewType) {
        switch (type) {
            case BgViewType.normal:
                this.skinState = "normal";
                break;
            case BgViewType.pattern:
                this.skinState = "pattern";
                break;
            case BgViewType.tapered:
                this.skinState = "tapered";
                break;
            case BgViewType.tapegreen:
                this.skinState = "tapegreen";
                break;
        }
    }

    /**
     * 设置title
     * @param source
     */
    setTitle(source: egret.Texture | string) {
        this.title.source = source;
    }
}

/**
 * 布幔类型
 */
enum CurtainType {
    green, red
}

/**
 * 类型
 */
enum BgViewType {
    normal, pattern, tapered, tapegreen
}