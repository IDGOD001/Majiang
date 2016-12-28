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
                break;
        }
    }

    update(data: any) {

    }

    private setThumbs(img: eui.Image, thumbsup: boolean) {
        img.source = thumbsup ? "ico_thumbs_up_3" : "ico_thumbs_down_3";
    }
}