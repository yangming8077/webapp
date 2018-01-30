// 引入node path函数
const path = require('path');
// 引入node fs函数
const fs = require('fs');
// 引入node url函数
const url = require('url');
/*
 * 获取文件路径
 * appDirectory当前目录 process.cwd()返回进程的当前目录（绝对路径）
*/
const appDirectory = fs.realpathSync(process.cwd());
// 将相对路径转为绝对路径。
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;
const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

// 我们用` public_url `环境变量或“homepage”字段来推断“public path”的应用程序服务。
// Webpack需要知道它将正确的<script> hrefs放入HTML中，即使在可以为 /todo/42 等嵌套URL提供index.html的单页应用中也是如此。
// 我们不能在HTML中使用相对路径，因为我们不想加载像/todos/42/static/js/bundle.7289d.js这样的东西。 我们必须知道根。
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// 获取组件库所有路径的Array,用于Webpack配置中
function readSrcSync(filepath, ret) {
  ret = ret || [];
  let files = fs.readdirSync(filepath);
  for (var i = 0; i < files.length; i++) {
    let curPath = path.resolve(filepath, files[i]);
    if (isDir(curPath)) {
      if (files[i] !== 'style' && files[i] !== 'font' && files[i] !== '__test__') {
        readSrcSync(curPath, ret);
      }
    } else if (/\.(js)$/.test(files[i])) {
      ret.push(curPath);
    }
  }
  return ret;
}
//判断是不是目录
function isDir(_path) {
  return exists(_path) && fs.statSync(_path).isDirectory();
}
//检查指定路径的文件或者目录是否存在
function exists(_path) {
  return fs.existsSync(_path);
}

module.exports = {
  appPackage: resolveApp('package.json'),
  // 公共资源目录
  appPublic: resolveApp('script/doc/public'),
  // 生产打包目录
  appBuild: resolveApp('dist/docs'),
  // 公共文件目录
  appManifestDir: resolveApp('dll'),
  // 应用程序清单
  appManifest: resolveApp('dll/vendor-manifest.json'),
  // 文档工程目录
  appDocs: resolveApp('docs'),
  // 项目图标文件
  appFavicon: resolveApp('docs/assets/favicon.png'),
  // 项目开发HTML模板文件
  appHtml: resolveApp('docs/entrys/index.html'),
  // 项目生产HTML模板文件
  appBuildHtml: resolveApp('docs/entrys/index.html'),
  // 项目入口文件
  appIndexJs: resolveApp('docs/entrys/index.js'),
  // 项目开发目录
  appSrc: resolveApp('app'),
  // 项目组件目录
  appComponents: resolveApp('app/components/base'),
  // 项目公共文件目录
  appLib: resolveApp('lib'),
  // node 模块目录
  appNodeModules: resolveApp('node_modules'),
  // 公共URL文件
  publicUrl: getPublicUrl(resolveApp('package.json')),
  // 服务目录
  servedPath: getServedPath(resolveApp('package.json')),
  // 组件目录
  readSrcSync: readSrcSync,
};