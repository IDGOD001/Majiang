/**
 * 修改评价
 */
class _29 {
    public writeData(obj: any) {
        game.manager.dispatchEvent(SynchroEvent.Assess, obj);
        return JSON.stringify(obj);
    }
}