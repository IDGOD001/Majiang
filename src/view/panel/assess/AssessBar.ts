/**
 * AssessBar
 * @Author Ace.c
 * @Create 2016-12-30 13:17
 */
class AssessBar extends BaseGameSprite {

    private backGroup: eui.Group;
    private foreGroup: eui.Group;
    private foreGroupMask: egret.Shape;

    cai: number = 0;
    zan: number = 0;
    zong: number;
    rate: number;
    level: number;

    constructor() {
        super();

        this.skinName = "AssessBarSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.foreGroup.mask = this.foreGroupMask;

        this.updateView();
    }

    update(cai: number, zan: number) {

        this.cai = !cai ? 0 : cai;
        this.zan = !zan ? 0 : zan;

        this.zong = this.cai + this.zan;
        this.level = this.getLevel();

        this.updateView();
    }

    updateView() {
        var index: number = Math.ceil(this.level / 5);
        var len: number = this.level % 5;
        len = len == 0 ? 5 : len;

        this.backGroup.removeChildren();
        this.foreGroup.removeChildren();

        var ico: eui.Image;
        for (var i: number = 0; i < len; i++) {
            ico = new eui.Image();
            ico.source = "ico_evaluate_" + index + "_0";
            this.backGroup.addChild(ico);

            ico = new eui.Image();
            ico.source = "ico_evaluate_" + index;
            this.foreGroup.addChild(ico);
        }

        this.rate = this.zong == 0 ? 0 : ((this.cai * 2) / this.zong);
        this.rate = this.rate > 1 ? 1 : this.rate;

        this.foreGroupMask.width = (1 - this.rate) * this.width;
    }

    //获取等级
    getLevel() {
        var conf: any = RES.getRes("credit");
        if (conf) {
            var data: any;
            for (var key in conf) {
                data = conf[key];
                if (data.mini <= this.zong && data.maxi >= this.zong) {
                    return data.lv;
                }
            }
        }
    }
}