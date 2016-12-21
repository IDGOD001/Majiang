/**
 *  S号打头的是收到消息的消息号
 *  _号打头的是发出去的消息号
 */
class MessageID {
    static _1: number = 1; //登录
    static S1: number = 1; //登录放回

    static _2: number = 2;  //创建房间
    static S2: number = 2;  //创建房间返回

    static _3: number = 3;  //加入房间
    static S3: number = 3;  //加入房间返回

    static _4: number = 4;  //打牌
    static S4: number = 4;  //打牌返回

    static _5: number = 5;  //TODO 待定
    static S5: number = 5;  //TODO 待定

    static _6: number = 6;  //解散房间
    static S6: number = 6;  //解散房间返回

    static _7: number = 7;  //绑定玩家
    static S7: number = 7;  //绑定返回

    static _8: number = 8;  //
    static S8: number = 8;  //房间信息同步

    static _9: number = 9;  //人满通知
    static S9: number = 9;   //通知

    static _10: number = 10;  //开始游戏
    static S10: number = 10;  //开始游戏

    static _11: number = 11;  //同步牌的信息
    static S11: number = 11;  //同步牌

    static _12: number = 12;  //离开房间
    static S12: number = 12;  //离开房间返回

    static _13: number = 13;  //游戏结束
    static S13: number = 13;  //游戏结束

    static _14: number = 14;  //解散房间投票
    static S14: number = 14;  //解散房间投票

    static _15: number = 15;  //中断处理
    static S15: number = 15;  //中断处理

    static _16: number = 16;  //局结算
    static S16: number = 16;  //局结算

    static _17: number = 17;  //再来一局
    static S17: number = 17;  //再来一局

    static _18: number = 18;  //心跳
    static S18: number = 18;  //心跳

    static _19: number = 19;  //战绩列表
    static S19: number = 19;  //战绩

    static _20: number = 20;  //获取详情
    static S20: number = 20;  //获取详情

    static _21: number = 21;  //获取回放
    static S21: number = 21;  //获取回放

    static _22: number = 22;  //踢人
    static S22: number = 22;  //踢人

    static _23: number = 23;  //被踢
    static S23: number = 23;  //被踢

    static _24: number = 24;  //房卡变化
    static S24: number = 24;  //房卡变化

    static _25: number = 25;  //广播消息
    static S25: number = 25;  //广播消息

    static _26: number = 26;  //版本号比对
    static S26: number = 26;  //版本号比对

    static _27: number = 27;  //实名认证
    static S27: number = 27;
}