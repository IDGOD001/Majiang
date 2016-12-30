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

        this.update(this.cai, this.zan);
    }

    update(cai: number, zan: number) {

        this.cai = cai;
        this.zan = zan;
        this.zong = this.cai + this.zan;
        this.level = this.getLevel();

        this.updateView();

        this.rate = this.zong == 0 ? 0 : ((this.cai * 2) / this.zong);
        this.rate = this.rate > 1 ? 1 : this.rate;

        this.foreGroupMask.width = (1 - this.rate) * this.width;

        console.log(this.zan, this.cai, this.zong, this.rate);
    }

    updateView() {
        this.skinState = "level" + (this.level % 5);

        var ico: eui.Image;
        var index: number = 0;
        while (index < this.backGroup.numElements) {
            ico = <eui.Image>this.backGroup.getElementAt(index);
            ico.source = "ico_evaluate_" + Math.ceil(this.level / 5) + "_0";
            index++
        }
        index = 0;
        while (index < this.foreGroup.numElements) {
            ico = <eui.Image>this.foreGroup.getElementAt(index);
            ico.source = "ico_evaluate_" + Math.ceil(this.level / 5);
            index++
        }
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