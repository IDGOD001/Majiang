/**
 * 结算当单个人
 */
class GSTotlePerson extends eui.Component {
    //玩家头像
    private head: HeadIcon;
    //赞
    private zan: eui.Image;
    //大赢家
    private win: eui.Image;
    //最佳炮手
    private pao: eui.Image;

    //奖励显示容器
    private card_group: eui.Group;

    //玩家数据
    public person: any;

    constructor(p: any) {
        super();

        this.person = p;
    }

    createChildren() {
        super.createChildren();

        game.manager.addEventListener(SynchroEvent.Assess, this.onUpdate, this);
    }

    private onUpdate(data: any) {
        var appraise: any = data;
        if (appraise && appraise.hasOwnProperty(this.person.uid)) {
            this.zan.source = appraise[this.person.uid] == 1 ? "ico_thumbs_up_4" : "ico_thumbs_down_4";
        }
    }

    refresh() {
        this.removeChildren();

        var data = game.roomPlayers[this.person.uid];
        this.person.cai = data.cai;
        this.person.zan = data.zan;

        var pos: number = +this.person.pos;

        this.head = new HeadIcon();
        this.head.touchEnabled = false;
        this.head.touchChildren = false;
        this.head.skinState = "intheend";
        // this.head.x = 40;
        this.head.y = 20;
        this.addChild(this.head);

        this.head.update(this.person);

        this.zan = new eui.Image();
        this.zan.source = "ico_thumbs_up_4";
        this.zan.x = this.head.x + this.head.width;
        this.zan.y = this.head.y + 50;
        this.addChild(this.zan);

        this.zan.visible = this.person.uid != game.player.uid;

        this.win = new eui.Image();

        if (this.person["win"]) {
            this.win.visible = true;
        }
        else {
            this.win.visible = false;
        }

        this.win.source = "sptWin";

        this.pao = new eui.Image();
        this.pao.source = "sptFangPao";
        this.pao.visible = this.person["ispao"];

        var new_card: number = this.person.new_card;

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

            if (+pos == 1) {//房主奖励
                timg.source = "card_jiangli2";
            }
            else {//新人奖励
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
            this.person.zimo_num,
            this.person.paorcv_num,
            this.person.pao_num,
            this.person.gang_an_num,
            this.person.gang_ming_num,
            this.person.chajiao_num,
            this.person.cur
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
                label.y = 145 + ((label.textHeight + 20) * i) + 20;

                this.win.y = label.y - 20;

                if (this.card_group) this.card_group.y = label.y + 30;
            }
            else {
                label.y = 145 + ((label.textHeight + 20) * i);
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