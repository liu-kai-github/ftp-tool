const Client = require('ftp');
const {FTPContent, FTPConnection, serverContent} = require('./ftp-config');
const watchFTPContent = require('./ftp-watch');
const downloadFTPFile = require('./ftp-download');
const uploadFile = require('./ftp-upload');

const c = new Client();
c.connect({
    ...FTPConnection,
    keepalive: 0,
});

c.on('ready', () => {
    console.log('正在监听 FTP ' + FTPContent + ' 目录......');
    // 开始监听文件
    watchFTPContent(c, FTPContent, (error, fileName) => {
        console.log(fileName, 'FFFFFFFFFFFFFF');
        if (error) {
            return console.log(error, '监听文件出问题')
        }
        // 如果变动的不是 *.zip 文件，不做处理
        if (!fileName.endsWith('.zip')) {
            // return console.log(fileName + '发生了变化');
            return;
        }
        console.log(fileName + ' 发生了变化');
        setTimeout(() => {
            console.log('继续监听......');
        }, 30000);
        // console.log(fileName, FTPContent + fileName, serverContent + fileName, 'FFFFFFFFFFFFF');
        // 开始下载文件
        downloadFTPFile(
            c,
            FTPContent + fileName,
            serverContent + fileName,
            (error) => {
                if (error) {
                    // 开始上传提示文件
                    uploadFile(
                        c,
                        serverContent + 'error.txt',
                        FTPContent + fileName + ' upZip fail.txt',
                        (error) => {
                            if (error) {
                                return console.log(error, '上传' + fileName + ' upZip fail.txt' + '文件出问题');
                            } else {
                                return console.log('上传' + fileName + ' upZip fail.txt' + '文件成功');
                            }
                        });
                    return console.log(error, '下载 ' + serverContent + fileName + ' 文件出问题');
                } else {
                    // 开始上传提示文件
                    uploadFile(
                        c,
                        serverContent + 'error.txt',
                        FTPContent + fileName + ' upZip success.txt',
                        (error) => {
                            if (error) {
                                return console.log(error, '上传' + fileName + ' upZip success.txt' + '文件出问题');
                            } else {
                                return console.log('上传' + fileName + ' upZip success.txt' + '文件成功');
                            }
                        });
                    return console.log('下载 ' + serverContent + fileName + ' 文件成功');
                }

            }
        );
    });

});
