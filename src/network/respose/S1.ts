/**
 * 登陆返回
 */
class S1 {
    public parseData(obj: any) {
        if (!obj) return;

        if (obj["data"]) {
            game.connectCount = 0;

            game.player.update(obj.data);

            if (SceneManager.find("LoadingScene")) {
                SceneManager.find("LoadingScene").onIn();
            }
        }
    }
}