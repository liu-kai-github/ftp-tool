const Client = require('ftp');
const {FTPContent, FTPConnection, serverContent} = require('./ftp-config');
const watchFTPContent = require('./watch-ftp');
const downloadFTPFile = require('./download');

const c = new Client();
c.connect({
    ...FTPConnection,
    keepalive: 0,
});

c.on('ready', () => {
    console.log('正在监听 FTP ' + FTPContent + ' 目录');
    // 开始监听文件
    watchFTPContent(c, FTPContent, (error, fileName) => {
        if (error) {
            return console.log(error, '监听文件出问题')
        }
        // console.log(fileName, FTPContent + fileName, serverContent + fileName, 'FFFFFFFFFFFFF');
        // 开始下载文件
        downloadFTPFile(
            c,
            FTPContent + fileName,
            serverContent + fileName,
            (error) => {
                if (error) {
                    return console.log(error, '下载文件出问题');
                }
            }
        );
    });

});
