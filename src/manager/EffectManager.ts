/**
 * EffectManager
 * @Author Ace.c
 * @Create 2016-12-05 16:00
 */
class EffectManager extends BaseManager {

    private changeThreeView: ChangeThreeView;
    private changeThreeAnimation: ChangeThreeCompleteView;
    private queView: QueView;
    private queCompleteView: QueCompleteView;
    private xiayuView: XiayuView;
    private guafengView: GuafengView;
    private gangshangkaihuaView: GangshangkaihuaView;
    private hujiaozhuanyiView: HujiaozhuanyiView;
    private yipaoduoxiangView: YipaoduoxiangView;
    private scoreView: ScoreView;

    public constructor() {
        super();
    }


    init() {
        super.init();

        this.changeThreeView = new ChangeThreeView();
        this.changeThreeAnimation = new ChangeThreeCompleteView();
        this.queView = new QueView();
        this.queCompleteView = new QueCompleteView();
        this.xiayuView = new XiayuView();
        this.guafengView = new GuafengView();
        this.hujiaozhuanyiView = new HujiaozhuanyiView();
        this.gangshangkaihuaView = new GangshangkaihuaView();
        this.yipaoduoxiangView = new YipaoduoxiangView();
        this.scoreView = new ScoreView();

        this.gameManager.addEventListener(EffectEvent.CleanAll, this.onCleanAll, this);
        this.gameManager.addEventListener(EffectEvent.ChangeThree, this.onChangeThree, this);
        this.gameManager.addEventListener(EffectEvent.ChangeThreeComplete, this.onChangeThreeComplete, this);
        this.gameManager.addEventListener(EffectEvent.Que, this.onQue, this);
        this.gameManager.addEventListener(EffectEvent.QueComplete, this.onQueComplete, this);
        this.gameManager.addEventListener(EffectEvent.CardRaise, this.onCardRaise, this);
        this.gameManager.addEventListener(EffectEvent.CardThrow, this.onCardThrow, this);
        this.gameManager.addEventListener(EffectEvent.CardThrowTips, this.onCardThrowTips, this);
        this.gameManager.addEventListener(EffectEvent.Xiayu, this.onRaining, this);
        this.gameManager.addEventListener(EffectEvent.Guafeng, this.onWindy, this);
        this.gameManager.addEventListener(EffectEvent.Hujiaozhuanyi, this.onHujiaozhuanyi, this);
        this.gameManager.addEventListener(EffectEvent.Gangshangkaihua, this.onGangshangkaihua, this);
        this.gameManager.addEventListener(EffectEvent.Yipaoduoxiang, this.onYipaoduoxiang, this);
        this.gameManager.addEventListener(EffectEvent.ScoreTips, this.onScoreTips, this);

    }

    private onScoreTips(scores: any) {
        this.scoreView.play(scores);
    }

    private onGangshangkaihua(dir: Dir4) {
        this.gangshangkaihuaView.play(dir);
    }

    private onYipaoduoxiang(dirs: Dir4[]) {
        this.yipaoduoxiangView.play(dirs);
    }

    private onHujiaozhuanyi(dirs: Dir4[]) {
        this.hujiaozhuanyiView.play(dirs);
    }

    private onRaining(dir: Dir4) {
        this.xiayuView.play(dir);
    }

    private onWindy(dir: Dir4) {
        this.guafengView.play(dir);
    }

    private onCleanAll() {
        this.changeThreeView.hide();
        this.changeThreeAnimation.hide();

        this.queView.hide();

        GSController.i.gsView.updateState();
    }

    private onChangeThree() {
        GSController.i.gsView.updateState();

        this.changeThreeView.show();
        this.onCardRaise(CardRaiseMode.changeThree);
    }

    private onChangeThreeComplete(type: ChangeThreeType) {
        this.changeThreeAnimation.setType(type);
        this.changeThreeAnimation.show();
    }

    private onCardRaise(type: CardRaiseMode) {
        if (type != undefined) {
            CardRaiseEffect.play(type);
        }
        else {
            CardRaiseEffect.stop();
        }
    }

    private onQue() {
        if (game.isChangeThree == false && game.isQue) {
            this.queView.show();
        }
    }

    private onQueComplete() {
        this.queCompleteView.show();
    }

    private onCardThrow(arr: any[]) {
        if (arr && arr.length == 2) {
            ChupaiEffect.play(arr[0], arr[1]);
        }
        else {
            ChupaiEffect.stop(true);
        }
    }

    private onCardThrowTips(arr: any[]) {
        if (arr && arr.length == 2) {
            ChupaiTipsEffect.play(arr[1], (arr[0] == 1 || arr[0] == 3) ? 2 : 0);
        }
        else {
            ChupaiTipsEffect.stop();
        }
    }
}