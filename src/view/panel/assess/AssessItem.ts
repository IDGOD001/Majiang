/**
 * AssessItem
 * @Author Ace.c
 * @Create 2016-12-28 15:54
 */
class AssessItem extends BaseGameSprite {

    private lab_rank: eui.Label;
    private lab_nick1: eui.Label;
    private lab_nick2: eui.Label;
    private lab_nick3: eui.Label;
    private img_thumbs1: eui.Image;
    private img_thumbs2: eui.Image;
    private img_thumbs3: eui.Image;
    private btn_change: eui.Button;
    private lab_roomid: eui.Label;
    private lab_time: eui.Label;

    constructor() {
        super();

        this.skinName = "AssessItemSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_change:
                var changePanel: AssessChangePanel = StackManager.findDialog(AssessChangePanel, "AssessChangePanel");
                if (changePanel) {
                    var data: any = {};
                    var obj: any = {};
                    obj.id = this.data.id;
                    obj.data = data;
                    var list: any;
                    var person: any;
                    for (var key in this.data) {
                        list = this.data[key];
                        if (typeof list == "object" && key != game.player.uid) {
                            person = {};
                            person.uid = key;
                            person.nick = list[0];
                            person.zan = list[1];
                            person.pic = list[2];
                            person.id = this.data.id;

                            data[person.uid] = person;
                        }
                    }
                    changePanel.show();
                    changePanel.update(obj);
                }
                break;
        }
    }

    update(data: any, rank: number) {
        this.data = data;

        this.lab_rank.text = "" + rank;
        this.lab_time.text = "" + StringUtils.getYTDByTimestamp(data.time * 1000) + " " + StringUtils.getHMSByTimestamp(data.time * 1000);
        this.lab_roomid.text = "房间号:" + data.roomid;

        var list: any;
        var index: number = 1;
        for (var key in data) {
            list = data[key];
            if (typeof list == "object" && key != game.player.uid) {
                this["lab_nick" + index].text = "" + list[0];
                this.setThumbs(this["img_thumbs" + index], list[1] == 1);
                index++;
            }
        }

        this.btn_change.visible = rank == 1;
    }

    private setThumbs(img: eui.Image, thumbsup: boolean) {
        img.source = thumbsup ? "ico_thumbs_up_3" : "ico_thumbs_down_3";
    }
}