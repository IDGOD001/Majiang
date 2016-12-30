/**
 * TipsWarning
 * @Author Ace.c
 * @Create 2016-12-30 15:42
 */
class TipsWarning extends BaseGameSprite {

    private lab_description: eui.Label;

    private list: string[] = [];
    private content: string;
    private tweening: boolean;

    constructor() {
        super();

        this.skinName = "TipsWarningSkin";
    }

    childrenCreated() {
        super.childrenCreated();
    }

    play(description: string) {

        if (!LayerManager.gameLayer().contains(this)) {
            this.y = acekit.height;
            LayerManager.gameLayer().addChild(this);
        }

        if (this.list.indexOf(description) != -1) {
            return;
        }

        this.list.push(description);

        this.excute();
    }

    private excute() {
        if (!this.tweening && this.list.length) {
            this.content = this.list[0];

            this.lab_description.text = "" + this.content;

            if (this.content.indexOf("注意：") != -1) {
                this.lab_description.textColor = Color.white;
            }

            if (this.content.indexOf("警告：") != -1) {
                this.lab_description.textColor = Color.red;
            }

            this.tweening = true;
            this.y = acekit.height;

            var _this = this;
            egret.Tween.get(this)
                .to({y: acekit.height - this.height}, 1000)
                .wait(5000)
                .to({y: acekit.height}, 1000)
                .call(function () {
                    _this.tweening = false;
                    _this.list.shift();
                    _this.excute();
                });
        }
    }
}