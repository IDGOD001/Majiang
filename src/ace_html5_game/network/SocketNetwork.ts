/**
 * SocketNetwork
 * @Author Ace.c
 * @Create 2016-12-21 11:38
 */
class SocketNetwork {

    private socket: egret.WebSocket;
    private ip: string;
    private port: number;
    private linkType: number;
    private socketType: string;

    protected data: any;

    constructor() {
    }

    /**
     * 关闭socket
     */
    close() {
        this.socket.close();
        console.log("关闭Socket连接!");
    }

    /**
     * 连接socket
     * @param ip
     * @param port
     * @param linkType 1https连接 2http连接
     * @param socketType
     */
    connect(ip: string, port: number, linkType: number = 1, socketType: string = egret.WebSocket.TYPE_STRING) {
        this.ip = ip;
        this.port = port;
        this.linkType = linkType;
        this.socketType = socketType;

        if (!this.socket) {
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.Event.CONNECT, this.connectHandler, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.closeHandler, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.dataHandler, this);
        }

        this.socket.type = this.socketType;

        switch (this.linkType) {
            case 1:
                this.socket.connectByUrl("wss://" + this.ip + ":" + this.port);
                console.log("url=", "wss://" + this.ip + ":" + this.port);
                break;
            case 2:
                this.socket.connect(this.ip, this.port);
                console.log("url=", ip + ":" + port);
                break;
        }
        console.log("Socket连接中...", this.linkType);
    }

    connectHandler() {
        console.log("Socket连接成功!");
    }

    closeHandler() {
        this.socket.close();
        console.log("Socket连接关闭!");
    }

    dataHandler() {
        switch (this.socketType) {
            case egret.WebSocket.TYPE_STRING:
                this.readUTF();
                break;
            case egret.WebSocket.TYPE_BINARY:
                this.readBytes();
                break;
        }
    }

    /**
     * 发送数据
     * @param data
     */
    send(data: any) {
        if (data && data != "") {
            switch (this.socketType) {
                case egret.WebSocket.TYPE_STRING:
                    this.socket.writeUTF(data);
                    break;
                case egret.WebSocket.TYPE_BINARY:
                    this.socket.writeBytes(data);
                    break;
            }
        }
    }

    /**
     * 读取字符串数据
     */
    readUTF() {
        this.data = this.socket.readUTF();
    }

    /**
     * 读取套接字数据
     */
    readBytes() {
        this.socket.readBytes(this.data);
    }

    /**
     * socket是否处于连接状态
     * @returns {boolean}
     */
    get connected() {
        return this.socket.connected;
    }
}