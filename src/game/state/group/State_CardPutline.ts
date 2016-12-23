/**
 * Created by Administrator on 2016/10/30.
 */
class State_CardPutline extends BaseState {

    mjviews: any;

    showIndex: number;

    showDelayTime: number = 60;

    moveDownTime: number = 220;

    //显示计数器
    showTime: number;

    level: number = 0;


    play() {

        super.play();

        GSController.i.createAllHandPai();
        this.mjviews = GSController.i.gsView.MJViews;
    }

    update(advanceTime: number, timeStamp?: number): void {

        if (this.completed) return;

        if (this.level == 1) {
            this.showTime += advanceTime;

            if (this.showTime >= this.showDelayTime) {
                GameSound.play("sound_card_hover");

                for (var i: number = 1; i <= 4; i++) {
                    var cardView: CardView = this.mjviews[i].getHandCard(this.showIndex);
                    cardView.visible = true;
                    cardView.x = GSConfig.width >> 1;
                    cardView.y = GSConfig.height >> 1;
                    cardView.scaleX = cardView.scaleY = .1;

                    egret.Tween.get(cardView).to({
                        x: cardView.pos.x,
                        y: cardView.pos.y,
                        scaleX: 1,
                        scaleY: 1
                    }, this.moveDownTime).call(this.tweenEnd, this, [cardView]);
                }

                this.showTime = 0;
                this.showIndex++;

                if (this.showIndex >= game.roomZhang) {
                    this.delay(2, 500);
                }
            }
        }

        if (this.level == 2) {
            for (var i: number = 0; i < game.roomZhang; i++) {
                var cardView: CardView = this.mjviews[1].getHandCard(i);
                cardView.changeStyle(5);
            }

            this.delay(3, 300);
        }

        if (this.level == 3) {
            var handPais = PublicVal.i.getHandPais(1);
            FashionTools.sortPai(handPais);
            for (var i: number = 0; i < game.roomZhang; i++) {
                var cardView: CardView = this.mjviews[1].getHandCard(i);
                cardView.changeStyle(1, false);
                cardView.changePai(handPais[i]);
                cardView.activate();
            }

            this.delay(4, 300);
        }

        if (this.level == 4) {
            this.exit();
            game.manager.socketManager.send(25, {args: {type: 3}});
        }
    }

    delay(nextLevel: number, time: number) {
        this.level = 0;
        egret.setTimeout(_=> {
            this.level = nextLevel
        }, this, time);
    }

    tweenEnd(view) {
        egret.Tween.removeTweens(view);
    }

    reset() {
        super.reset();
        this.showIndex = 0;
        this.showTime = 0;
        this.level = 1;
    }
}