/**
 * Created by Administrator on 2016/11/22.
 */
class FuncEffectView extends egret.DisplayObjectContainer {

    constructor() {
        super();

        this.touchChildren = false;
        this.touchEnabled = false;
    }

    play(dir: number, action: number) {

        var back: egret.Bitmap = new egret.Bitmap();
        back.texture = RES.getRes(GSConfig.funcSelectRes[GSConfig.actionPVP[action]]);
        back.x = GSConfig.funcPlayPos[dir].x;
        back.y = GSConfig.funcPlayPos[dir].y;
        this.addChild(back);

        var top: egret.Bitmap = new egret.Bitmap();
        top.texture = back.texture;
        top.x = back.x;
        top.y = back.y;
        this.addChild(top);

        back.visible = true;
        top.visible = false;

        back.scaleX = back.scaleY = 3;
        back.anchorOffsetX = top.anchorOffsetX = back.width >> 1;
        back.anchorOffsetY = top.anchorOffsetY = back.height >> 1;

        var _this = this;

        egret.Tween.get(back).to({scaleX: 1, scaleY: 1}, 300, egret.Ease.backIn).call(function () {
            top.visible = true;
            egret.Tween.get(top).to({scaleX: 3, scaleY: 3, alpha: 0}, 500).call(function () {
                _this.removeChildren();
            }, _this);
        }, _this);
    }
}