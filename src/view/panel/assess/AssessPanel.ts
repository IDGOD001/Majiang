/**
 * AssessPanel
 * @Author Ace.c
 * @Create 2016-12-28 15:53
 */
class AssessPanel extends BasePanel {

    private scroller: eui.Scroller;
    private group: eui.Group;

    constructor() {
        super();

        this.skinName = "AssessPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.tapegreen);
        this.bgView.setTitle("text_thumbsup");
    }

    update() {

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();

        this.group.removeChildren();


    }

    show() {

    }
}