const fs = require('fs');
const Client = require('ftp');
const {FTPConnection, PCPath, FTPPath} = require('./ftp-config');

const c = new Client();

// 监听 FTP 连接的 ready 事件
c.on('ready', () => {
    // 向 FTP 服务器推送文件
    c.put(
        // 本地文件地址
        PCPath,
        // 服务器地址
        FTPPath,
        (err) => {
            if (err) {
                throw err;
            }
            // 断开连接
            c.end();
        });
});

// 建立连接
c.connect(FTPConnection);
