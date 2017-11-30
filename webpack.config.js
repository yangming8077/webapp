const path = require('path');
const webpack = require('webpack');
//模板文件插件
const HtmlwebpackPlugin = require('html-webpack-plugin');
//文件抽离插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//目录设置
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  //入口文件配置
  entry: {
    'index': [
      './app/templet/index.jsx'
    ],
  },
  //出口文件配置
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  //enable dev source map
  devtool: 'eval-source-map',
  //加载各种扩展名配置
  resolve: {
    extensions: ['.js', '.jsx'],
    //配置组件目录
    alias: {
      'base': path.resolve(__dirname, 'app/components/base'),
      'mbank': path.resolve(__dirname, 'app/components/mbank')
    }
  },
  //babel重要的loader在这里
  module: {
    loaders: [
      {
        //正则表达式，代表js或者jsx后缀的文件要使用下面的loader
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: APP_PATH,
        query: {
          //添加两个presents 使用这两种presets处理js或者jsx文件
          presets: ['es2015', 'react']
        }
      },
      {
        //样式文件loader配置
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              //css设置
              options: {
                //启用/禁用 css-modules 模式
                modules: true,
                //在 css-loader 前应用的 loader 的数
                importLoaders: 1,
                //启用/禁用 压缩
                minimize:true,
                //启用/禁用 Sourcemaps
                sourceMap:true,
                //导出以驼峰化命名的类名
                camelCase:false
              },
            },
            {
              //样式文件优化(配置文件./postcss.config.js)
              loader: 'postcss-loader',
            },
            {
              //less
              loader: 'less-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        //图片文件loader配置
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url?limit=8192&name=static/images/[hash:8].[name].[ext]'
        // 大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。
      }
    ]
  },
  plugins: [
    //模板文件配置
    new HtmlwebpackPlugin({
      title: 'test',
      template: APP_PATH + '/templet/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
      //压缩HTML配置-移除属性的引号等优化
      minify: {
        removeAttributeQuotes: true
      },
      hash: true
    }),
    //样式文件抽离配置
    new ExtractTextPlugin('[name].[chunkhash:8].css'),
  ],
  //开发服务器配置
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    port: 9999,
  },
}