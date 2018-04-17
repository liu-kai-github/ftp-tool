const fs = require('fs');
const Client = require('ftp');
const {FTPContents, FTPConnection} = require('./ftp-config');
const watchFTPContent = require('./watch-ftp');

const c = new Client();
c.connect({
    ...FTPConnection,
    keepalive: 0,
});

c.on('ready', () => {
    // let i = 0;
    watchFTPContent(c, FTPContents, function (fileName) {
        console.log(fileName, 'FFFFFFFFFFFFF');
    });

});
