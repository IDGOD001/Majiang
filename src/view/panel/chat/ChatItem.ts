class ChatItem extends eui.Component {
    public clickey: number = 0;

    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.skinName = "ChatItemSkin";

        this.touchChildren = true;
    }

    public lab_content: eui.Label;

    onComplete() {

    }

    createChildren() {
        super.createChildren();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick(e: egret.TouchEvent): void {
        game.manager.socketManager.send(25, {
            args: {
                type: 1,
                chat: {
                    id: this.clickey,
                    sex: game.player.sex,
                    uid: game.player.uid
                }
            }
        });
        //GameSound.PlaySound("chat_"+game.getInstance().player.sex+"_" + this.clickey);

        StackManager.closeDialog("ChatPanel");
    }
}