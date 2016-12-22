/**
 * 心跳
 */
class S18 {
    public parseData(obj: any) {
        console.log("------------------------砰------------------------");
        game.manager.socketManager.send(18, {});
    }
}