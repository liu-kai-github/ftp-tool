const fs = require('fs');
const Client = require('ftp');
const unzip = require('unzip');
const del = require('del');
const {FTPConnection, FTPPath, serverPath} = require('./ftp-config');

const c = new Client();

// 监听 FTP 连接的 ready 事件
c.on('ready', () => {
    // 获取 FTP 服务器上的文件
    c.get(
        FTPPath,
        (err, stream) => {
            if (err) {
                throw err;
            }

            // 监听结束事件
            stream.once('close', function () {
                // 断开连接
                c.end();
                const rootPath = serverPath.slice(0, -4);
                // 删除原有的已解压的目录
                del.sync([rootPath], {force: true});
                // 解压已下载的 *.zip 文件到 *.zip 所在文件的与 zip 文件同名的目录下
                fs.createReadStream(serverPath /*要解压的zip文件*/)
                    .pipe(unzip.Extract({path: rootPath /*解压的目录*/}));
            });

            // 向本地写入 stream 到 zip 文件中
            stream.pipe(fs.createWriteStream(serverPath));

        });
});

// 建立连接
c.connect(FTPConnection);
