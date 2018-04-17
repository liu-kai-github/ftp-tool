// FTP 连接配置
const FTPConnection = {
    host: '120.55.192.189',
    port: '2100',
    user: 'ZhaoHP',
    password: 'BJjl2015',
};

// 开发者要上传的部署文件
const PCPath = '/Users/kai/workspace/nicezhuanye/classadmin/classifyManage.zip';
// FTP 服务器路径
// const FTPPath = '/shuojia.liu/classifyManage.zip';
const FTPContent = '/shuojia.liu/';
// 要部署到的服务器路径
const serverContent = '/Users/kai/Desktop/aaa/';

module.exports = {
    FTPConnection,
    PCPath,
    // FTPPath,
    FTPContent,
    serverContent,
};
