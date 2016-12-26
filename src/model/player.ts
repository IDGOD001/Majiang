/**
 *
 * @undefined
 *
 */
class Player
{
    /**
     * 当前平台
     */
    public channel:string;

    /**
     * code
     */
    public code:string;

    /**
     * 版本号
     */
    public version:string;

    /**
     * 玩家的平台开放编号
     */
    public openid:string;

    /**
     * 玩家游戏中的唯一标识
     */
    public uid:string;

    /**
     * 玩家昵称
     */
    public nick:string;

    /**
     * 玩家头像链接
     */
    public pic:string = "";

    /**
     * 玩家IP
     */
    public ip:string = "192.168.2.1";

    /**
     * 当前房卡数量
     */
    public cur:number;

    /**
     * 玩家总共拥有过的房卡数量
     */
    public zong:number;

    /**
     * 实名
     */
    public name:string;

    /**
     * 身份证
     */
    public id_no:string;

    /**
     * 绑定的上线玩家
     */
    public agent:number = 0;

    /**
     * 玩家性别
     * @type {number}
     */
    public sex:number = 0;

    /**
     * 掉线率
     */
    public drop_rate:number;

    /**
     * 游戏次数
     * @type {Array}
     */
    public game_times:number;


    public playerInfo:Array<any> = [];


    /**
     * 头像数据
     */
    public playerHeadTexture:egret.Texture;


    public constructor()
    {
        
    }

    public update(obj:any):void
    {
        if(!obj) return;

        for(var k in obj)
        {
            if(k == "pic")
            {
                var pic:string = obj[k]+"";
                if(pic.indexOf("http") > -1)
                {
                    pic = pic.replace("http", "https");
                }
                this[k] = pic;
            }
            else
            {
                this[k] = obj[k];
            }
        }

        this.sex = (this.sex == 1 ? 1 : 0);
    }
}