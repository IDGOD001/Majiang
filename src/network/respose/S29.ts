/**
 * 修改评价
 */
class S29 {
    public parseData(obj: any) {
        if (+obj.code != 0) return;

        game.manager.socketManager.send(28, {});
    }
}