
/**
 * Created by Administrator on 2016/10/25.
 */
class TestBall extends egret.Sprite{

    private ball:egret.Sprite;

    constructor()
    {
        super();

        this.graphics.clear();
        this.graphics.beginFill(0xaaffcc, 1);
        this.graphics.drawRect(0, 0, 640, 960);
        this.graphics.endFill();

        this.ball = new egret.Sprite();
        this.ball.graphics.clear();
        this.ball.graphics.beginFill(0xffaacc, 1);
        this.ball.graphics.drawCircle(0, 0, 30);
        this.ball.graphics.endFill();
        this.addChild(this.ball);

        this.ball.x = this.width / 2 - this.ball.width / 2;
        this.ball.y = this.height / 2 - this.ball.height / 2;

        this.touchChildren = true;
        this.touchEnabled = true;

        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    }

    private onFrame(e:egret.Event):void
    {
        this.ball.rotation += 2;
    }
}