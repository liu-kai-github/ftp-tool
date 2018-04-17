const fs = require('fs');
const unzip = require('unzip');
const del = require('del');

/**
 * @description 下载 FTP 服务器上指定的文件，并且解压到下载目录的已压缩包命名的目录下
 * @param c FTP 连接的 Client
 * @param FTPFilePath 要下载的 FTP 上文件的路径
 * @param distFilePath 目标下载路径
 */
function downloadFTPFile(c, FTPFilePath, distFilePath, cd) {
// 获取 FTP 服务器上的文件
    c.get(
        FTPFilePath,
        (err, stream) => {
            if (err) {
                return cd(err);
                // throw err;
            }
            // 向本地写入 stream 到 zip 文件中
            stream.pipe(fs.createWriteStream(distFilePath));

            // 监听结束事件
            stream.once('close', () => {
                // 断开连接
                // c.end();
                const unZipPath = distFilePath.slice(0, -4);
                // 删除原有的已解压的目录
                del.sync([unZipPath], {force: true});
                // 解压已下载的 *.zip 文件到 *.zip 所在文件的与 zip 文件同名的目录下
                fs.createReadStream(distFilePath /*要解压的zip文件*/)
                    .pipe(unzip.Extract({path: unZipPath /*解压的目录*/}));
                console.log('解压完成');
                // 完成任务后，做回调
                cd();
            });
        });
}

module.exports = downloadFTPFile;
