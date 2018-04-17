const fs = require('fs');
const Client = require('ftp');
const {FTPConnection, FTPContents, serverPath} = require('./ftp-config');

const c = new Client();
c.on('ready', function () {
    // let i = 0;
    const zipTimeMap = new Map();
    setInterval(() => {
        c.list(FTPContents, function (err, list) {
            if (err) {
                throw err;
            }
            for (const item of list) {
                if (zipTimeMap.has(item.name)) {
                    if (zipTimeMap.get(item.name) !== new Date(item.date).getTime()) {
                        // 当 FTP 指定目录下的文件发生改变时，去下载该zip包，并做进一步处理
                        console.log(item.name + ':' + zipTimeMap.get(item.name), new Date(item.date).getTime(), '*************');

                        // 更新 Map 的时间映射
                        zipTimeMap.set(item.name, new Date(item.date).getTime());
                    }
                } else {
                    // 如果没有对应的 Map ，说明是新添加的文件或者是初始化
                    console.log(item.name, '=>', new Date(item.date).getTime(), '>>>>>>>>>>>');
                    zipTimeMap.set(item.name, new Date(item.date).getTime());
                }
            }

            // console.log('##############', ++i);
            // c.end();
        });
    }, 3000);

});
// connect to localhost:21 as anonymous
c.connect({
    ...FTPConnection,
    keepalive: 0,
});
