/**
 * Created by Administrator on 2016/12/19.
 */
class FrontUIContainer extends egret.DisplayObjectContainer{

    constructor(){
        super();
        this.funcIcons = [];
        this.initView();
    }

    replayFuncView_1:egret.DisplayObjectContainer;
    replayFuncView_2:egret.DisplayObjectContainer;
    replayFuncView_3:egret.DisplayObjectContainer;
    replayFuncView_4:egret.DisplayObjectContainer;

    funcIcons:egret.Bitmap[];

    currDir:number;

    //反向查找到功能对应的index
    indexs:any;

    hand:egret.Bitmap;

    initView(){

        for(var i:number = 1 ; i <= GSConfig.playerCount;i++){

            var pos = GSConfig.replayFuncPos[i];

            var view = new egret.DisplayObjectContainer;

            view.x = pos.x;
            view.y = pos.y;
            this.addChild(view);

            this["replayFuncView_"+i] = view;

        }

        this.hand = new egret.Bitmap(GameRes.getUI("RP_hand"));

        this.hand.scaleX = this.hand.scaleY= .5;

        this.addChild(this.hand);

        this.hand.visible = false;

    }

    //手标聚焦到对应的菜单选项上
    handFocus(func:number){

        var pos = this.getFunIconPos(func);

        if(pos){

            this.hand.visible = true;

            this.hand.x = pos.x;
            this.hand.y = pos.y;

        }
        this.indexs = {};

    }

    getFunIconPos(func:number){

        var pos = GSConfig.replayFuncPos[this.currDir];

        var index = this.indexs[func];

        var returnPos :any = null;

        if(index > -1){
            returnPos = {
                x: pos.x + index * pos.dx,
                y: pos.y + index * pos.dy
            }
        }
        return returnPos;
    }

    addReplayFuncs(dir:number,funcs:any[]){

        //this["replayFuncView_"+dir].addChild();

        this.currDir = dir;



        var pos = GSConfig.replayFuncPos[dir];

        var view = this["replayFuncView_"+dir];

        this.indexs = {};
        //记录重复的index
        var indexObj = {};

        var index = 0;

        for(var i:number = 0 ; i < funcs.length;i++){

            var func:number = funcs[i];

            var resIndex = GSConfig.actionPVP[func];

            //有相同的资源
            if(indexObj[resIndex] > -1) {

                this.indexs[func] = indexObj[resIndex];

            }else{
                var bitmap = this.createIcon(func);

                bitmap.x = pos.dx * index;
                bitmap.y = pos.dy * index;

                view.addChild(bitmap);

                this.indexs[func] = index;

                indexObj[resIndex] = index;

                index++;
            }

        }
    }

    createIcon(id:number){

        var bitmap = null;

        if(this.funcIcons.length){

            bitmap = this.funcIcons.shift();
        }else{
            bitmap = new egret.Bitmap;
        }

        bitmap.texture = GameRes.getUI(GSConfig.funcSelectRes[GSConfig.actionPVP[id]]);
        bitmap.anchorOffsetX = bitmap.width >> 1;
        bitmap.anchorOffsetY = bitmap.height >> 1;
        return bitmap;
    }

    returnIcon(icon:egret.Bitmap){

        icon.texture = null;

        this.funcIcons.push(icon);
    }


    clear(){

        for(var i:number = 1 ; i <= GSConfig.playerCount;i++) {

            var view:egret.DisplayObjectContainer = this["replayFuncView_"+i];

            while(view.numChildren){

                var icon :egret.Bitmap= <egret.Bitmap> view.getChildAt(0);

                view.removeChild(icon);

                this.returnIcon(icon);
            }

        }

        this.hand.visible = false;

    }


}