/**
 * @description 向 FTP 上传文件
 * @param c FTP 连接的 Client
 * @param clientPath
 * @param FTPPath 要上传的文件路径
 * @param cd 回调函数
 */
function uploadFile(c, clientPath, FTPPath, cd) {
    // 向 FTP 服务器推送文件
    c.put(
        // 本地文件地址
        clientPath,
        // 服务器地址
        FTPPath,
        (err) => {
            if (err) {
                return cd(err);
            }
            cd();
        });
}

module.exports = uploadFile;
