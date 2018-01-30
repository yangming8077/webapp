// 声明环境变量，这样读它的任何代码都知道正确的环境。
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
// 使脚本在未处理的拒绝中崩溃，而不是默默地忽略它们。
// 未处理的承诺拒绝将以非零退出代码终止Node.js进程。
process.on('unhandledRejection', err => { throw err; });
// 引入webpack
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// 打开浏览器
const openBrowser = require('react-dev-utils/openBrowser');
// 清除控制台
const clearConsole = require('react-dev-utils/clearConsole');
// 判断浏览器是否已打开
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
// 引入路径配置
const paths = require('./config/paths');
// 引入webpack开发服务器配置
const createDevServerConfig = require('./config/webpack.server.conf');
// 引入webpack配置
const config = require('./config/webpack.conf.dev');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

// 引入控制台输入文字颜色
const color = require('colors-cli/safe')

// 判断当前是否处于TTY上下文。
const isInteractive = process.stdout.isTTY;

// 如果需要的文件不存在，警告并崩溃
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// 配置IP及端口
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9999;

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    // 判断当前端口是否为空
    if (port == null) {
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackage).name;
    const urls = prepareUrls(protocol, HOST, port);

    // 配置 Webpack dev server 
    const compiler = createCompiler(webpack, config, appName, urls);
    // 通过Web服务器提供由编译器生成的webpack资源
    const serverConfig = createDevServerConfig(
      urls.lanUrlForConfig
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);

    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(color.cyan('正在启动Dev开发服务, 请稍后...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err, err.message);
    }
    process.exit(1);
  });