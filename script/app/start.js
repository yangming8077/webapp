// 定义环境变量，这样读它的任何代码都知道正确的环境。
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
// 使脚本在未处理的拒绝中崩溃，而不是默默地忽略它们。
// 未处理的承诺拒绝将以非零退出代码终止Node.js进程。
process.on('unhandledRejection', err => {
  throw err;
});
// 引入webpack配置
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config/webpack.conf.dev'); // webpack配置
const createDevServerConfig = require('./config/webpack.server.conf'); // 服务器配置
// 引入 react-dev-utils
const openBrowser = require('react-dev-utils/openBrowser'); // 打开浏览器
const clearConsole = require('react-dev-utils/clearConsole'); // 清除控制
// 检查必要文件是否存在，警告并崩溃
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles'); 
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}
// 引入开发服务所需函数
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils'); 
// 引入路径配置
const paths = require('./config/paths.doc');
// node命令行输出颜色
const color = require('colors-cli/safe')
// 判断控制台信息是否处于TTY上下文。
const isInteractive = process.stdout.isTTY;

// 配置端口号及IP地址
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 7777;
const HOST = process.env.HOST || '0.0.0.0';

// 判断
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      // 我们还没有找到一个端口。
      return;
    }
    // 设置http协议类型
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    // 设置app名称
    const appName = require(paths.appPackage).name;
    // 设置url
    const urls = prepareUrls(protocol, HOST, port);

    // 创建配置有自定义消息的Webpack编译器。
    const compiler = createCompiler(webpack, config, appName, urls);
    // 通过Web服务器提供由编译器生成的webpack资源
    const serverConfig = createDevServerConfig(
      urls.lanUrlForConfig
    );
    // 创建devServer
    const devServer = new WebpackDevServer(compiler, serverConfig);

    // 创建一个端口并监听
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      // 判断控件台中是否有信息，如果有清除信息
      if (isInteractive) {
        clearConsole();
      }
      // 打印控制台信息
      console.log(color.cyan('正在启动开发服务器 请稍等...\n'));
      // 打开浏览器
      openBrowser(urls.localUrlForBrowser);
    });
    // 监听WebSocket SIGINT,SIGTERM 事件,并退出
    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close();
        process.exit();
      });
    });

  })
  // 打印错误并退出
  .catch(err => {
    if (err && err.message) {
      console.log(err, err.message);
    }
    process.exit(1);
  });