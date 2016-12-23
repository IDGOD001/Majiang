/**
 * 按钮
 */
module mui
{
    export class EButton extends eui.Component
    {
        public textField: eui.Label;
        private btnImg:eui.Image;
        public textImg:eui.Image;
        private startX:number = -1;
        private startY:number = -1;
        public _sounds:string = "btn_click";

        // private fun:string;
        // private thisobj:any;
        /**
         *
         * @param imgName  图片资源
         * @param descStr  显示文字
         * @param fontSize 文字大小
         * @param tc       文字颜色
         * @param sd       文字描边规格{q:1, c:0x0} 即为强度为1，颜色为黑的描边
         */
        public constructor(imgName: string, descStr:string = "", fontSize: number = 24, tc:number = 0xffffff, sd:any = null)
        {
            super();

            this.btnImg = new eui.Image();

            this.btnImg.source = imgName;

            this.addChild(this.btnImg);

            this.textImg = new eui.Image();

            this.addChild(this.textImg);

            this.textImg.verticalCenter = 0;

            this.textImg.horizontalCenter = 0;

            this.textImg.touchEnabled = false;

            if (descStr != "")
            {
                this.textField = new eui.Label();
                this.textField.size = fontSize;
                this.textField.textColor = tc;
                this.textField.textAlign = "center";
                this.textField.bold = true;
                this.textField.fontFamily = "Microsoft YaHei";
                if(sd)
                {
                    this.textField.stroke = sd["q"];
                    this.textField.strokeColor = sd["c"];
                }

                this.textField.stroke = 1;
                this.textField.strokeColor = 0x000000;

                this.textField.text = descStr;
                this.textField.horizontalCenter = 0;
                this.textField.verticalCenter = 0;
                this.addChild(this.textField);
            }

            this.touchEnabled = true;
            this.touchChildren = false;

            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        // public addFunctions(fun:string, thisObj:any):void
        // {
        //     this.fun = fun;
        //     this.thisobj = thisObj;
        // }

        private onTouch(e:egret.TouchEvent):void
        {
            var my = this;
            switch (e.type)
            {
                case "touchBegin":
                    GameSound.play("" + this._sounds);
                    this.addStage();
                    my.startX = my.x;
                    my.startY = my.y;

                    var tox:number = my.x + my.width * 0.025;
                    var toy:number = my.y + my.height * 0.025;

                    my.scaleX = 0.95;
                    my.scaleY = 0.95;

                    my.x = tox;

                    my.y = toy;
                    break;
                case "touchEnd":
                    this.removeStage();
                    this.onMove();
                    break;
                case "touchMove":

                    break;
                case "touchTap":
                    break;
            }
        }

        private onMove(e:egret.Event = null):void
        {
            if(this.startX == -1 && this.startY == -1) return;

            if(!e || e.target != this)
            {
                this.scaleX = 1;
                this.scaleY = 1;
                this.x = this.startX;
                this.y = this.startY;
            }
        }

        private addStage():void
        {
            game.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
            game.stage.addEventListener(egret.Event.LEAVE_STAGE, this.onMove, this);
        }

        private removeStage():void
        {
            game.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
            game.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.onMove, this);
        }

        public getSource()
        {
            if(this.btnImg) return this.btnImg.source;
        }

        public setSource(s:string = "")
        {
            if(this.btnImg) this.btnImg.source = s;
        }
    }
}
   