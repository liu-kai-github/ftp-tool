/**
 * @description 要 FTP 删除文件
 * @param c FTP 连接的 Client
 * @param FTPPath 要删除的文件路径
 * @returns {Promise<any>}
 */
function deleteFTPFile(c, FTPPath, cd) {
    // 向 FTP 服务器发送删除文件信息
    c.delete(
        // 服务器地址
        FTPPath,
        (err) => {
            if (err) {
                cd(err);
            }
            cd();
        });

}

module.exports = deleteFTPFile;
