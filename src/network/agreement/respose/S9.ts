/**
 * 人满通知
 */
class S9 {
    public parseData(obj: any) {
        if (!obj) return;

        var type: number = +obj.data.type;

        switch (type) {
            case 1:
                break;
            case 2:
                var pos: number = +obj.data.data.pos;  //轮到pos位置出牌了

                console.log("轮到谁抓牌:", pos);

                var dui_num: number = obj.data.data.dui_num;

                var gang_end = obj.data.data.gang_end;

                GSDataProxy.i.S2C_TurnDir(pos, dui_num, gang_end);
                GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Tips);
                break;
            case 3:
                var d = obj.data.data;

                console.log("显示功能菜单:", d);

                GSDataProxy.i.S2C_Function(d);

                break;
            case 4:

                console.log("同步其他方功能牌", obj);

                GSDataProxy.i.S2C_FuncResult(obj.data.data.action, obj.data.data.pai, obj.data.data.turn, obj.data.data.cur);
                GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Point);
                GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Tips);
                break;
            case 5: // 删除手牌
                //pos pai
                console.log("删除手牌", obj);
                GSDataProxy.i.S2C_DeletePai(obj.data.data.pos, obj.data.data.pai);
                break;
            case 6:
                var dir = PublicVal.i.getPlayerDir(obj.data.data.pos);
                GameDispatcher.ins.dispatchEvent(EventType.Trigger_Play_Tips, [dir, obj.data.data.pai]);
                break;
            case 7:
                var uidArr:Array<any> = obj.data.data;
                if(!uidArr) break;
                if(uidArr.length <= 0)
                {
                    EffectUtils.showTips("有玩家网络不稳定!", 5);
                }
                else
                {
                    var username:string = "玩家 ";
                    for(var u = 0; u < uidArr.length; u++)
                    {
                        var uid = uidArr[u];

                        var nm = GSData.i.roomPlayerMap[uid].nick;

                        username += nm + " ";
                    }
                    username += "网络环境较差！";
                    EffectUtils.showTips(username, 5);
                }

                break;
        }
    }
}