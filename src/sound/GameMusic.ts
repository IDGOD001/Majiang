module GameMusic
{
    export var SoundDict = {};

    export var SoundPlayed = {};

    export var _volume:number = 1;

    /**
     * 加载过的资源
     */
    export var loadList = {};

    /**
     * @param name  音乐文件名
     * @param loops  播放次数<= 0循环播放，>0播放该次数,默认为0
     * @param startTime 开始播放的时间 默认是0
     * @constructor
     */
    export function PlaySound(name:string, loops:number = 0, startTime:number = 0)
    {
        if(NativeApi.getLocalData("music"))
        {
            var _switch:number = +NativeApi.getLocalData("music");
            if(+_switch == 0) return;
        }

        if(GameMusic.SoundPlayed[name]) return;

        //if(!GameMusic.SoundLoaded[name]) return;

        var SoundDict = GameMusic.SoundDict;

        var sound:egret.Sound;
        var channel:egret.SoundChannel;

        GameMusic.CloseAllSound();

        if(!SoundDict[name])
        {
            sound = RES.getRes("" + name);

            if(!sound)
            {
                if(!GameSound.loadList[name]) GameMusic.loadMusic(name);
                return;
            }
        }
        else
        {
            sound = SoundDict[name]["s"];
            channel = SoundDict[name]["c"];
        }

        channel = sound.play(startTime,loops);

        channel.volume = GameMusic._volume;

        SoundDict[name] = {"s":sound,"c":channel};

        GameMusic.SoundPlayed[name] = true;
    }

    export function CloseAllSound():void
    {
        var SoundDict = GameMusic.SoundDict;

        for(var name in SoundDict)
        {
            var channel:egret.SoundChannel = SoundDict[name]["c"];

            if(channel) channel.stop();
        }
    }

    export function checkMusic(name:string = ""):boolean
    {
        var SoundDict = GameMusic.SoundDict;

        if(SoundDict[name]["c"])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    export function CloseSound(name:string):void
    {

        if(!SoundDict[name]) return;

        var channel:egret.SoundChannel = SoundDict[name]["c"];

        if(channel) channel.stop();
    }

    export function loadMusic(name:string):void
    {
        GameSound.loadList[name] = name;

        if(RES.hasRes(name))
        {
            RES.getResAsync(name,function ()
            {
                if(GameConfig.systemType() == "ios")
                {

                }
                else
                {
                    GameMusic.PlaySound(name);
                }
            },this);
        }
    }

    export function setSoundVolume(volume:number = 0):void
    {
        GameMusic._volume = volume;

        var SoundDict = GameMusic.SoundDict;

        for(var name in SoundDict)
        {
            var channel:egret.SoundChannel = SoundDict[name]["c"];

            if(channel && channel.position > 0)
            {
                channel.volume = volume;
            }
        }
    }
}
