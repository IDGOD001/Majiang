class HeadIcon extends BaseGameSprite {

    private img_head: eui.Image;
    private img_kuang_normal: eui.Image;
    private img_kuang_owner: eui.Image;
    private img_zhuang: eui.Image;
    private img_que: eui.Image;
    private img_ting: eui.Image;
    private lab_nick: eui.Label;
    private lab_uid: eui.Label;
    private lab_fen: eui.Label;
    private btn_kill: eui.Button;

    private img_headMask: egret.Shape;

    private _isOwner: boolean = false;
    private _isZhuang: boolean = false;
    private _isOffline: boolean = false;
    private _que: PaiType = PaiType.unknow;

    dir: Dir4;
    player: PlayerVo;

    constructor(dir: Dir4 = Dir4.bottom) {
        super();
        this.skinName = "HeadIconSkin";
        this.dir = dir;
    }

    childrenCreated() {
        super.childrenCreated();

        this.img_headMask = new egret.Shape;
        this.img_headMask.graphics.beginFill(0);
        this.img_headMask.graphics.drawRoundRect(4, 4, 73, 73, 20, 20);
        this.addChild(this.img_headMask);

        this.img_head.mask = this.img_headMask;

        this.clean();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        if (PublicVal.state == StateType.replay) {
            return;
        }
        switch (e.target) {
            case this.btn_kill:
                if (this.player) {
                    game.manager.socketManager.send(22, {"args": {"pos": this.player.pos}});
                }
                break;
            default:
                var roleInfoPanel: RoleInfoPanel = StackManager.findDialog(RoleInfoPanel, "RoleInfoPanel");
                if (roleInfoPanel && this.player) {
                    roleInfoPanel.show();
                    roleInfoPanel.refreshRole(this.player);
                }
                break;
        }
    }

    update(player: PlayerVo) {
        this.player = player;

        if (player) {

            this.updateHeadImg();

            this.lab_nick.text = "" + this.player.nick;
            this.lab_uid.text = "" + this.player.uid;
            this.isOwner = this.player.pos == 1;
            this.que = game.roomQue[player.dir];

            if (this.player && PublicVal.state == StateType.ready) {
                this.btn_kill.visible = this.player && PublicVal.state == StateType.ready && game.isRoomOwner && this.player.pos != 1;
            }
            else {
                this.btn_kill.visible = false;
            }
        }
        else {
            this.clean();
        }
    }

    updateHeadImg() {
        this.img_head.source = null;

        if (!this.player) {
            this.img_head.source = "game_head_null";
        } else if (this.player.status == "offline") {
            this.img_head.source = "game_head_lixian";
        }
        else {
            this.setHeadImg(this.player.pic);
        }
    }

    set isZhuang(value: boolean) {
        this._isZhuang = value;
        this.img_zhuang.visible = value;
    }

    set isOwner(value: boolean) {
        this._isOwner = value;
        this.img_kuang_owner.visible = value;
        this.img_kuang_normal.visible = !value;
    }

    set que(value: PaiType) {
        this._que = value;

        this.img_que.visible = true;

        switch (value) {
            case PaiType.wan:
                this.img_que.source = "img_dq_1";
                break;
            case PaiType.tiao:
                this.img_que.source = "img_dq_2";
                break;
            case PaiType.tong:
                this.img_que.source = "img_dq_3";
                break;
            default:
                this.img_que.source = "";
                this.img_que.visible = false;
                break;
        }
    }

    getScore() {
        return Number(this.lab_fen.text);
    }

    setScore(score: number) {
        this.lab_fen.text = "" + score;
    }

    setHeadImg(source: string|egret.Texture) {
        if (typeof source == "string") {
            if (source != "") {
                var _this = this;
                RES.getResByUrl(GameConfig.protocolType + source.toString().split("//")[1], function (t) {
                    _this.img_head.source = t;
                }, this, RES.ResourceItem.TYPE_IMAGE)
            }
            else {
                this.img_head.source = "game_head_null";
            }
        }
        else {
            this.img_head.source = source;
        }
    }

    set isTing(va: boolean) {
        switch (this.dir) {
            case 3:
                this.img_ting.horizontalCenter = -65;
                this.img_ting.verticalCenter = 0;
                break;
            default:
                this.img_ting.horizontalCenter = 0;
                this.img_ting.verticalCenter = -55;
                break;
        }
        this.img_ting.visible = va;
    }

    setState(state: HeadIconState) {
        switch (state) {
            case HeadIconState.normal:
                this.skinState = "normal";
                break;
            case HeadIconState.ingame:
                this.skinState = "ingame";
                break;
            case HeadIconState.intable:
                this.skinState = "intable";
                break;
        }
    }

    reset() {
        this.isZhuang = false;
        this.que = PaiType.unknow;
    }

    clean() {
        this.isZhuang = false;
        this.isOwner = false;
        this.isTing = false;
        this.que = PaiType.unknow;
        this.player = null;
        this.img_head.source = "game_head_null";
        this.lab_nick.text = "";
        this.lab_uid.text = "";
        this.lab_fen.text = "";
        this.btn_kill.visible = false;
    }
}

enum HeadIconState {
    normal, ingame, intable
}