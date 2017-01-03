/**
 * 修改评价
 */
class _29 {
    public writeData(obj: any) {
        game.manager.dispatchEvent(SynchroEvent.Assess, obj.args.appraise);
        return JSON.stringify(obj);
    }
}