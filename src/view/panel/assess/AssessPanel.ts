/**
 * AssessPanel
 * @Author Ace.c
 * @Create 2016-12-28 15:53
 */
class AssessPanel extends BasePanel {

    private scroller: eui.Scroller;
    private group: eui.Group;

    private list:any[];

    constructor() {
        super();

        this.skinName = "AssessPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.tapegreen);
        this.bgView.setTitle("text_thumbsup");

        game.manager.addEventListener(SynchroEvent.AssessList, this.onUpdate, this);
    }

    onUpdate(list: any[]) {
        this.list = list;

        if (this.list) {
            this.list.sort(function (a, b) {
                if (a.time > b.time) {
                    return -1;
                }
                else {
                    return 1;
                }
            });

            this.update();
        }
    }

    update() {

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();

        this.group.removeChildren();

        var data: any;
        var item: AssessItem;
        for (var i: number = 0; i < this.list.length; i++) {
            data = this.list[i];

            item = new AssessItem();
            this.group.addChild(item);

            item.update(data, i + 1);
        }
    }

    show() {
        super.show();

        game.manager.socketManager.send(28, {});
    }
}