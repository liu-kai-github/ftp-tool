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
    watchFTPContent(c, FTPContent, function (error, fileName) {
        console.log(fileName, FTPContent + fileName, serverContent + fileName, 'FFFFFFFFFFFFF');
        downloadFTPFile(
            c,
            FTPContent + fileName,
            serverContent + fileName,
            (error) => {

            }
        );
    });

});
