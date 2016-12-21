/**
 * Created by Administrator on 2016/11/8.
 */
//结算界面
class GSResultView extends BaseGameSprite {

    stateImgBg: eui.Image;
    stateImg: eui.Image;
    group: eui.Group;
    lab_rule: eui.Label;
    shareButton: eui.Button;
    continueButton: eui.Button;

    face: IGameTapEvent;

    baoPaiView: BaoPaiView;

    constructor() {
        super();

        this.skinName = "ResultSceneSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.baoPaiView = new BaoPaiView;
        this.baoPaiView.x = 910;
        this.baoPaiView.y = 167;
        // this.addChild(this.baoPaiView);

        this.shareButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.continueButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.shareButton:
                this.face.onShareGame();
                break;
            case this.continueButton:
                this.face.onContinue();
                break;
        }
    }

    update() {
        this.updateRule();
        this.updateState(GSData.i.resultType);

        var pai = GSData.i.result.hupai.pai;

        this.group.removeChildren();

        var personItem: PersonItem;
        var persons = GSData.i.result.person;
        var person: any;
        var line: eui.Image;
        for (var i: number = 0; i < persons.length; i++) {
            person = persons[i];

            personItem = new PersonItem();
            this.group.addChild(personItem);

            personItem.update(person);

            line = new eui.Image();
            line.source = "JS_dot";
            line.width = GSConfig.width;
            this.group.addChild(line);
        }

        this.group.removeChildAt(this.group.numElements - 1);
    }

    updateBaoPai(pai: any) {
        this.baoPaiView.updatePai(pai);
    }

    updateRule() {
        this.lab_rule.text = PublicVal.i.rules;
    }

    updateState(type: number) {
        switch (type) {
            case 1://胜利
                this.stateImgBg.source = "JS_win_bg";
                this.stateImg.source = "JS_win";
                GameSound.PlaySound("sound_win");
                break;
            case 2://失败
                this.stateImgBg.source = "JS_lose_bg";
                this.stateImg.source = "JS_lose";
                GameSound.PlaySound("sound_lost");
                break;
            case 3://流局
                this.stateImgBg.source = "JS_lose_bg";
                this.stateImg.source = "JS_liuju";
                GameSound.PlaySound("sound_huang");
                break;
        }
    }

    clear() {
    }

    //绑定回调接口
    bindInterface(face: IGameTapEvent) {
        this.face = face;
    }
}