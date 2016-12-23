/**
 * HujiaozhuanyiView
 * @Author Ace.c
 * @Create 2016-12-08 15:15
 */
class HujiaozhuanyiView extends BaseSprite {

    private icon0: eui.Image;
    private icon1: eui.Image;

    public constructor() {
        super();

        this.skinName = "HujiaozhuanyiViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.icon0.anchorOffsetX = this.icon0.width >> 1;
        this.icon0.anchorOffsetY = this.icon0.height >> 1;

        this.icon1.anchorOffsetX = this.icon1.width >> 1;
        this.icon1.anchorOffsetY = this.icon1.height >> 1;

        this.clean();
    }

    play(dirs: Dir4[]) {
        this.show();

        for (var i: number = 0; i < dirs.length; i++) {
            this.excute(i, dirs[i]);
        }
    }

    excute(index: number, dir: Dir4) {
        var target: any = this["icon" + index];

        switch (dir) {
            case Dir4.top:
                target.x = game.stage.stageWidth / 2;
                target.y = 100;
                break;
            case Dir4.bottom:
                target.x = game.stage.stageWidth / 2;
                target.y = 480;
                break;
            case Dir4.left:
                target.x = 160;
                target.y = game.stage.stageHeight / 2;
                break;
            case Dir4.right:
                target.x = game.stage.stageWidth - 160;
                target.y = game.stage.stageHeight / 2;
                break;
        }

        target.alpha = 0;
        target.visible = true;

        var tarX: number = target.x;
        target.x -= 200;

        egret.Tween.get(target)
            .to({x: target.x + 210, alpha: 1}, 150)
            .to({x: tarX, alpha: 1}, 100)
            .wait(1000)
            .call(this.hide, this);
    }

    show() {
        super.show();

        GSController.i.gsView.frontUIContainer.addChild(this);
    }

    hide() {
        super.hide();

        this.clean();

        if (GSController.i.gsView.frontUIContainer.contains(this)) {
            GSController.i.gsView.frontUIContainer.removeChild(this);
        }
    }

    clean() {
        this.icon0.alpha = 1;
        this.icon0.scaleX = this.icon0.scaleY = 1;
        this.icon0.visible = false;
        egret.Tween.removeTweens(this.icon0);
        this.icon1.alpha = 1;
        this.icon1.scaleX = this.icon1.scaleY = 1;
        this.icon1.visible = false;
        egret.Tween.removeTweens(this.icon1);
    }
}