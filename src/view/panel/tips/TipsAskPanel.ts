class TipsAskPanel extends BasePanel {

    private lab_description: eui.Label;
    private btn_confirm: eui.Button;
    private btn_cancel: eui.Button;

    private callback: Function;

    public constructor() {
        super();
        this.skinName = "TipsAskPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.hideClose();
        this.bgView.setTitle("msg_title");

        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        this.hide();

        switch (e.currentTarget) {
            case this.btn_cancel:
                this.callback && this.callback(false);
                break;
            case this.btn_confirm:
                this.callback && this.callback(true);
                break;
        }
    }

    public showMsg(callback: Function, text: string = "", confirm: string = null, cancel: string = null, hide: boolean = false): void {
        this.show();

        confirm = confirm == null ? "确  定" : confirm;
        cancel = cancel == null ? "取  消" : cancel;

        this.lab_description.text = text;
        this.btn_confirm.label = confirm;
        this.btn_cancel.label = cancel;

        this.callback = callback;

        if (hide) {
            this.btn_cancel.visible = false;
            this.btn_confirm.horizontalCenter = 0;
        }
        else {
            this.btn_cancel.visible = true;
            this.btn_confirm.horizontalCenter = 120;
        }
    }
}