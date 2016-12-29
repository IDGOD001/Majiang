/**
 * 结算当单个人
 */
class GSTotlePerson extends eui.Component {
    //玩家头像
    private head: HeadIcon;
    //赞
    private zan: eui.Image;
    //玩家姓名
    private nick: eui.Label;
    //大赢家
    private win: eui.Image;
    //最佳炮手
    private pao: eui.Image;

    //奖励显示容器
    private card_group: eui.Group;

    //玩家数据
    public pserson: any;

    constructor(p: any) {
        super();

        this.pserson = p;
    }

    createChildren() {
        super.createChildren();

        game.manager.addEventListener(SynchroEvent.Assess, this.onUpdate, this);
    }

    private onUpdate(data: any) {
        var appraise: any = data.appraise;
        if (appraise && appraise[this.pserson.uid]) {
            this.zan.source = appraise[this.pserson.uid] == 1 ? "ico_thumbs_up_4" : "ico_thumbs_down_4";
        }
    }

    refresh() {
        this.removeChildren();

        var nick = this.pserson.nick;
        var pic: string = this.pserson.pic;
        var pos: number = +this.pserson.pos;

        this.head = new HeadIcon();
        // this._head.x = 40;
        this.head.y = 20;
        this.addChild(this.head);

        RES.getResByUrl(pic, function (t: egret.Texture) {
            if (t) this.head.setHeadImg(t);
        }, this, RES.ResourceItem.TYPE_IMAGE);

        this.zan = new eui.Image();
        this.zan.source = "ico_thumbs_up_4";
        this.zan.x = this.head.x + this.head.width;
        this.zan.y = this.head.y + 50;
        this.addChild(this.zan);

        this.nick = new eui.Label();
        this.addChild(this.nick);
        this.nick.text = "" + nick;
        this.nick.size = 20;
        this.nick.textAlign = "center";
        this.nick.textColor = 0xffffff;
        this.nick.fontFamily = gameConfig.FontFamily;

        this.nick.y = 110;
        this.nick.x = 40 - this.nick.textWidth * 0.5;

        this.win = new eui.Image();

        if (this.pserson["win"]) {
            this.win.visible = true;
        }
        else {
            this.win.visible = false;
        }

        this.win.source = "sptWin";

        this.pao = new eui.Image();
        this.pao.source = "sptFangPao";
        this.pao.visible = this.pserson["ispao"];

        this.head.isOwner = pos == 1;

        var new_card: number = this.pserson.new_card;

        console.log(">>  " + new_card);

        if (new_card > 0) {
            this.card_group = new eui.Group();

            var layout: eui.HorizontalLayout = new eui.HorizontalLayout();
            layout.horizontalAlign = "center";
            layout.verticalAlign = "middle";
            this.card_group.layout = layout;
            this.addChild(this.card_group);

            var timg: eui.Image = new eui.Image();
            var cardimg: eui.Image = new eui.Image();
            cardimg.source = "money_icon";
            var cardcha: eui.Image = new eui.Image();
            cardcha.source = "card_cha";

            if (+pos == 1)   //房主奖励
            {
                this.head.isOwner = true;

                timg.source = "card_jiangli2";
            }
            else   //新人奖励
            {
                timg.source = "card_jiangli1";
            }

            this.card_group.addChild(timg);
            this.card_group.addChild(cardimg);
            this.card_group.addChild(cardcha);

            var new_cardstr: string = "" + new_card;
            for (var n = 0; n < new_cardstr.length; n++) {
                var new_s: string = new_cardstr.charAt(n);

                var numimg: eui.Image = new eui.Image();
                numimg.source = "card_" + new_s;
                this.card_group.addChild(numimg);
            }
        }


        var numlist: number[] = [
            this.pserson.zimo_num,
            this.pserson.paorcv_num,
            this.pserson.pao_num,
            this.pserson.gang_an_num,
            this.pserson.gang_ming_num,
            this.pserson.chajiao_num,
            this.pserson.cur
        ];

        var txtList: string[] = [
            "自  摸",
            "接  炮",
            "点  炮",
            "暗  杠",
            "明  杠",
            "查大叫",
            "积  分"
        ];

        for (var i = 0; i < numlist.length; i++) {
            var label: eui.Label = new eui.Label();
            this.addChild(label);
            label.text = txtList[i] + "：" + numlist[i];
            label.size = 20;
            label.textColor = 0xffffff;
            label.fontFamily = gameConfig.FontFamily;
            label.x = 40 - label.textWidth * 0.5;

            if (i == (numlist.length - 1)) {
                label.y = 140 + ((label.textHeight + 20) * i) + 20;

                this.win.y = label.y - 20;

                if (this.card_group) this.card_group.y = label.y + 30;
            }
            else {
                label.y = 140 + ((label.textHeight + 20) * i);
            }

            if (i == 2) this.pao.y = label.y - 20;
        }

        this.addChild(this.pao);
        this.addChild(this.win);

        this.win.x = -10;
        this.pao.x = -5;

        this.win.alpha = 0.6;
        this.pao.alpha = 0.6;

        if (this.card_group) this.card_group.x = -45;
    }
}