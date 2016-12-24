/**
 * Created by Administrator on 2016/11/8.
 */
class ResultItemView extends BaseGameSprite {

    spacing = 105;

    // private headGroup: eui.Group;
    private lab_nick: eui.Label;
    private lab_uid: eui.Label;
    private lab_description: eui.Label;
    private paiGroup: eui.Group;
    private lab_hu: eui.Label;
    private lab_gang: eui.Label;
    private lab_zong: eui.Label;

    headIcon: HeadIcon;
    cardViews: CardView[];
    pos: egret.Point;

    constructor() {
        super();

        this.skinName = "ResultItemViewSkin";

        this.cardViews = [];
    }

    childrenCreated() {
        super.childrenCreated();

        this.pos = new egret.Point();

        this.headIcon.setState(HeadIconState.ingame);
    }

    update(person: any) {
        this.pos.x = this.pos.y = 0;

        this.data = person;

        this.headIcon.update(person);
        this.headIcon.isZhuang = GSData.i.result.zhuang == person.pos;

        this.lab_uid.text = "" + this.data.uid;
        this.lab_nick.text = "" + this.data.nick;
        this.lab_description.text = "" + this.getDescription();
        this.lab_hu.text = "胡:" + this.data.cur;
        this.lab_gang.text = "杠:" + this.data.gang;
        this.lab_zong.text = "合计:" + (this.data.gang + this.data.cur);

        this.showDown();
        this.showUp();
        this.showHu();
    }

    //显示胡牌
    showHu() {
        var pai;
        var o;
        for (var i: number = 0; i < this.data.hus.length; i++) {
            pai = this.data.hus[i];
            o = GSConfig.getPosByIndex(1, 4, i);
            this.addCardView(pai, this.pos.x + o.x, this.pos.y);
        }
    }

    //显示手牌
    showUp() {

        FashionTools.sortPai(this.data.left);

        var pai;
        var o;
        for (var i: number = 0; i < this.data.left.length; i++) {
            pai = this.data.left[i];
            o = GSConfig.getPosByIndex(1, 4, i);
            this.addCardView(pai, this.pos.x + o.x, this.pos.y);
        }

        this.pos.x += o.x + 75;

        // //判断手牌长度进行间隔错位
        // if (GSConfig.handLens[this.data.left.length]) {
        //     var cardView: CardView = <CardView>this.paiGroup.getElementAt(this.paiGroup.numElements - 1);
        //     if (cardView) {
        //         cardView.posView(cardView.pos.x + this.spacing, cardView.pos.y);
        //         this.pos.x += this.spacing;
        //     }
        // }
    }

    //显示门前牌
    showDown() {
        var checks: any[] = [1, 2, 24, 25];
        for (var i: number = 0; i < checks.length; i++) {
            var type: number = checks[i];
            var group: any[] = this.data[type];
            if (group && group.length) {
                switch (type) {
                    case 1://吃
                    case 2://碰
                        for (var j: number = 0; j < group.length; j++) {
                            var pais = group[j];
                            for (var k: number = 0; k < pais.length; k++) {
                                var o = GSConfig.getPosByIndex(1, 4, k);
                                this.addCardView(pais[k], this.pos.x + o.x, this.pos.y);
                            }
                            this.pos.x += this.spacing;
                        }
                        break;
                    case 24://暗杠
                        for (var j: number = 0; j < group.length; j++) {
                            var pais = group[j];
                            var centerO: any;
                            for (var k: number = 0; k < 3; k++) {
                                var o = GSConfig.getPosByIndex(1, 4, k);
                                if (k == 1) {
                                    centerO = o;
                                }

                                this.addCardView(pais[k], this.pos.x + o.x, this.pos.y, null, 0.55, 2);
                            }

                            this.addCardView(pais[0], this.pos.x + centerO.x, this.pos.y - 10);

                            this.pos.x += this.spacing;
                        }
                        break;
                    case 25://明杠
                        for (var j: number = 0; j < group.length; j++) {
                            var pais = group[j];
                            var centerO: any;
                            for (var k: number = 0; k < 3; k++) {
                                var o = GSConfig.getPosByIndex(1, 4, k);
                                if (k == 1) {
                                    centerO = o;
                                }

                                this.addCardView(pais[k], this.pos.x + o.x, this.pos.y);
                            }

                            this.addCardView(pais[0], this.pos.x + centerO.x, this.pos.y - 10);

                            this.pos.x += this.spacing;
                        }
                        break;
                }
            }
        }
    }

    private addCardView(pai, x, y, count?, scale?, style?) {
        var card = CardView.create(1, style ? style : 4, pai, count ? count : 1);
        card.posView(x, y + 20);
        scale && (card.scaleX = card.scaleY = scale);
        this.paiGroup.addChild(card);

        this.cardViews.push(card);

        return card;
    }

    clear() {
        while (this.cardViews.length) {
            var cardView: CardView = <CardView>this.cardViews.shift();
            this.paiGroup.removeChild(cardView);

            CardView.returnCardView(cardView);
        }
    }

    private getDescription() {
        var ting_desc: string = "";
        if (GSData.i.hasTingRule) {
            ting_desc = (this.data.ting == 1 ? "听牌 " : "未听牌 ");
        }

        var hu_types: any[] = this.data.hu_type;
        var types: any;

        var hu_desc: string = "";
        for (var i: number = 0; i < hu_types.length; i++) {
            types = hu_types[i];

            if (typeof types == "number") {
                hu_desc += HuConfig.getHuTypeName(types) + " ";
                continue;
            }

            if (types.length < 2 || typeof types[1] == "object") {
                continue;
            }
            if (types[0] == 24 || types[0] == 25 || types[0] == 49) {
                hu_desc += "" + HuConfig.getHuTypeName(types[0]) + "x" + types[1] + " ";
            }
            else {
                hu_desc += "" + HuConfig.getHuTypeName(types[0]);
                hu_desc += "(";
                for (var j: number = 1; j < types.length; j++) {
                    if (types[j].length) {
                        hu_desc += HuConfig.getHuTypeName(types[j][0]) + "x" + types[j][1];
                    }
                    else {
                        hu_desc += HuConfig.getHuTypeName(types[j]);
                    }
                    if (j != types.length - 1) {
                        hu_desc += " ";
                    }
                }
                hu_desc += ") ";
            }
        }
        return ting_desc + hu_desc;
    }
}