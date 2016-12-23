/**
 * QueView
 * @Author Ace.c
 * @Create 2016-12-01 13:45
 */
class QueView extends BaseSprite {

    private btn_wan: eui.Button;
    private btn_tiao: eui.Button;
    private btn_tong: eui.Button;
    private tipGroup: eui.Group;

    private queBtn: eui.Button;

    public constructor() {
        super();

        this.skinName = "QueViewSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.anchorOffsetX = this.width >> 1;
        this.x = acekit.width >> 1;
        this.y = acekit.height / 2 + 80;

        var arr: eui.Button[] = [this.btn_wan, this.btn_tiao, this.btn_tong];
        var btn: eui.Button;
        for (var i: number = 0; i < arr.length; i++) {
            btn = arr[i];
            btn.anchorOffsetX = btn.width >> 1;
            btn.anchorOffsetY = btn.height >> 1;
            btn.x = 35 + i * 100;
            btn.y = 35;
        }

        this.btn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {

        if (game.roomPlayerOffline > 0) {
            EffectUtils.showTips("有人掉线啦，请耐心等待一下。", 5);
            return;
        }

        game.isQue = false;

        this.queBtn = e.currentTarget;

        this.selected();
    }

    private selected() {
        this.tipGroup.visible = false;

        var arr: eui.Button[] = [this.btn_wan, this.btn_tiao, this.btn_tong];
        var btn: eui.Button;
        for (var i: number = 0; i < arr.length; i++) {
            btn = arr[i];

            egret.Tween.removeTweens(btn);

            if (btn != this.queBtn) {
                egret.Tween.get(btn)
                    .to({alpha: 0}, 200);
            }
            else {
                egret.Tween.get(btn)
                    .wait(500)
                    .to({alpha: 0}, 200)
                    .wait(500)
                    .call(this.selectedComplete, this);
            }
        }
    }

    private selectedComplete() {

        this.hide();

        var type: PaiType = PaiType.unknow;

        switch (this.queBtn) {
            case this.btn_wan:
                type = PaiType.wan;
                break;
            case this.btn_tiao:
                type = PaiType.tiao;
                break;
            case this.btn_tong:
                type = PaiType.tong;
                break;
        }

        game.manager.socketManager.send(15, {
            "args": {
                "action": 9999,
                "pai": type
            }
        });
    }

    private recommend() {
        var type: PaiType = GamePai.getCtShortest();
        switch (type) {
            case PaiType.tiao:
                this.playRecommend(this.btn_tiao);
                break;
            case PaiType.tong:
                this.playRecommend(this.btn_tong);
                break;
            case PaiType.wan:
                this.playRecommend(this.btn_wan);
                break;
        }

        var types: PaiType[] = [PaiType.tong, PaiType.tiao, PaiType.wan];

        for (var i: number = 0; i < types.length; i++) {
            if (types[i] != type && GamePai.getCtLength(type) == GamePai.getCtLength(types[i])) {
                switch (types[i]) {
                    case PaiType.tiao:
                        this.playRecommend(this.btn_tiao);
                        break;
                    case PaiType.tong:
                        this.playRecommend(this.btn_tong);
                        break;
                    case PaiType.wan:
                        this.playRecommend(this.btn_wan);
                        break;
                }
            }
        }
    }

    private playRecommend(target: any) {
        egret.Tween.get(target, {loop: true})
            .to({scaleX: 1.1, scaleY: 1.1}, 300)
            .to({scaleX: 1.0, scaleY: 1.0}, 300);
    }

    show() {
        super.show();

        this.clean();
        this.recommend();

        GSController.i.gsView.updateState();

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
        var arr: eui.Button[] = [this.btn_wan, this.btn_tiao, this.btn_tong];
        var btn: eui.Button;
        for (var i: number = 0; i < arr.length; i++) {
            btn = arr[i];

            egret.Tween.removeTweens(btn);

            btn.scaleX = btn.scaleY = 1;
            btn.alpha = 1;
            btn.x = 35 + i * 100;
            btn.y = 35;
        }

        this.tipGroup.visible = true;
    }
}