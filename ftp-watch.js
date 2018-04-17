/**
 * @description 监听 FTP 指定目录文件的变化
 * @param c FTP 连接的 Client
 * @param FTPContent 监听的 FTP 目录
 * @param cd 回调函数，将发生变化的文件名传过去
 */
function watchFTPContent(c, FTPContent, cd) {
    const zipTimeMap = new Map();
    let isInit = true;
    setInterval(() => {
        c.list(FTPContent, function (err, list) {
            if (err) {
                return cd(err);
            }
            for (const item of list) {
                // console.log(JSON.stringify(item));
                if (zipTimeMap.has(item.name)) {
                    if (zipTimeMap.get(item.name) !== new Date(item.date).getTime()) {
                        // 当 FTP 指定目录下的文件发生改变时，将出发会掉函数，并将文件名传出去
                        cd(null, item.name);
                        // 更新 Map 的时间映射
                        zipTimeMap.set(item.name, new Date(item.date).getTime());
                    }
                } else {
                    // 如果没有对应的 Map ，则进一步判断
                    if (!isInit) {
                        // 如果 isInit 是 false ，说明不是初始化，就将该新天加的文件传出
                        cd(null, item.name);
                    }
                    zipTimeMap.set(item.name, new Date(item.date).getTime());
                }
            }
            isInit = false;
            // c.end();
        });
    }, 15000);
}

module.exports = watchFTPContent;
