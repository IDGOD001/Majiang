/**
 * Created by Administrator on 2016/11/7.
 */
class PlayerDB{

    readyFlags : any = [];

    clearReadyFlags(){
        this.setReadyFlag(1,false);
        this.setReadyFlag(2,false);
        this.setReadyFlag(3,false);
        this.setReadyFlag(4,false);
    }

    setReadyFlag(dir:number,boo:boolean){
        this.readyFlags[dir] = boo;
    }
    getReadyFlag(dir:number){
        return this.readyFlags[dir];
    }
}