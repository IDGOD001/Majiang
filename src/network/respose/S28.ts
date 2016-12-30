/**
 * 获取评价记录
 */
class S28 {
    public parseData(obj: any) {
        if (+obj.code != 0) return;

        game.manager.dispatchEvent(SynchroEvent.AssessList, obj.data);
    }
}