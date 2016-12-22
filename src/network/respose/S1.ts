/**
 * 登陆返回
 */
class S1 {
    public parseData(obj: any) {
        if (!obj || !obj.data) return;

        game.player.update(obj.data);

        SceneManager.find("LoadingScene").onIn();
    }
}