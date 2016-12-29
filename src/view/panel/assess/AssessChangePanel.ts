/**
 * AssessChangePanel
 * @Author Ace.c
 * @Create 2016-12-28 15:53
 */
class AssessChangePanel extends BasePanel {

    private scroller: eui.Scroller;
    private group: eui.Group;
    private head_1: HeadIcon;
    private nick_1: eui.Label;
    private thumbsup_1: eui.RadioButton;
    private thumbsdown_1: eui.RadioButton;
    private head_2: HeadIcon;
    private nick_2: eui.Label;
    private thumbsup_2: eui.RadioButton;
    private thumbsdown_2: eui.RadioButton;
    private head_3: HeadIcon;
    private nick_3: eui.Label;
    private thumbsup_3: eui.RadioButton;
    private thumbsdown_3: eui.RadioButton;
    private btn_confirm: eui.Button;

    constructor() {
        super();

        this.skinName = "AssessChangePanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.normal);

        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_confirm:
                for (var i: number = 1; i <= 3; i++) {

                }
                game.manager.socketManager.send(29, {});
                break;
        }
    }

    update(obj: any) {

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();

        this.group.removeChildren();

        var person: any;
        var index: number = 1;
        for (var key in obj.data) {
            person = obj.data[key];

            this["head_" + index].setHeadImg(person.pic);
            this["nick_" + index].text = person.nick;
            this["thumbsup_" + index].selected = person.zan == 1;


            index++;
        }
    }

    show() {
        super.show();

    }
}