/**
 * @description 监听 FTP 指定目录文件的变化
 * @param c FTP 连接的 Client
 * @param FTPContent 监听的 FTP 目录
 * @param cd 回调函数，将发生变化的文件名传过去
 */
function watchFTPContent(c, FTPContent, cd) {
    const zipTimeMap = new Map();
    setInterval(() => {
        c.list(FTPContent, function (err, list) {
            if (err) {
                return cd(err);
            }
            for (const item of list) {
                if (zipTimeMap.has(item.name)) {
                    if (zipTimeMap.get(item.name) !== new Date(item.date).getTime()) {
                        // 当 FTP 指定目录下的文件发生改变时，将出发会掉函数，并将文件名传出去
                        cd(null, item.name);
                        // 更新 Map 的时间映射
                        zipTimeMap.set(item.name, new Date(item.date).getTime());
                    }
                } else {
                    // 如果没有对应的 Map ，说明是新添加的文件或者是初始化
                    // console.log(item.name, '=>', new Date(item.date).getTime(), '>>>>>>>>>>>');
                    zipTimeMap.set(item.name, new Date(item.date).getTime());
                }
            }
            // c.end();
        });
    }, 3000);
}

module.exports = watchFTPContent;
