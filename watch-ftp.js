const Client = require('ftp');
const {FTPConnection, FTPContents} = require('./ftp-config');

const c = new Client();
c.on('ready', function () {
    setInterval(() => {
        c.list(FTPContents, function (err, list) {
            if (err) {
                throw err;
            }
            const date = list.find(i => i.name === 'provinceLogin.zip');
            const targetFile = list.find(i => i.name === 'classifyManage.zip');
            console.log(targetFile.date === date.date);
            console.log(targetFile);
            console.log('##############');
            // c.end();
        });
    }, 3000);

});
// connect to localhost:21 as anonymous
c.connect({
    ...FTPConnection,
    keepalive: 30000,
});
