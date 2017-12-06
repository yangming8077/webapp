const path = require('path');
const webpack = require('webpack');
//模板文件插件
const HtmlwebpackPlugin = require('html-webpack-plugin');
//代码抽离插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//目录设置
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  //入口文件配置
  entry: {
    'index': [
      'webpack-dev-server/client?http://localhost:9999/',
      './app/entry/index.sample.js'
    ]
  },
  //出口文件配置  
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  //文件Map配置    
  devtool: '#source-map',
  //目录配置      
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      //示例目录配置
      'sample': path.resolve(__dirname, 'app/containers/sample'),
      //基础组件目录配置
      'base': path.resolve(__dirname, 'app/components/base'),
      //业务组件目录配置
      'mbank': path.resolve(__dirname, 'app/components/mbank'),
      //配置公共方法目录
      'util': path.resolve(__dirname, 'app/util'),
      'api': path.resolve(__dirname, 'app/constants/api.js'),
      'fetch': path.resolve(__dirname, 'app/util/fetch.js'),
      'native': path.resolve(__dirname, 'app/util/native.js')
    }
  },
  //模块配置        
  module: {
    loaders: [{
        //babel-loader配置
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
        //样式loader配置
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              //css设置
              options: {
                //启用/禁用 css-modules 模式
                modules: true,
                //在 css-loader 前应用的 loader 的数
                importLoaders: 1,
                //启用/禁用 压缩
                minimize: true,
                //启用/禁用 Sourcemaps
                sourceMap: true,
                //导出以驼峰化命名的类名
                camelCase: false,
                localIdentName: '[local]',
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
        //图片loader配置
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url?limit=8192&name=static/images/[hash:8].[name].[ext]'
        // 大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。
      }
    ]
  },
  //插件配置
  plugins: [
    //模板文件配置
    new HtmlwebpackPlugin({
      title: 'test',
      template: APP_PATH + '/entry/index.sample.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      //压缩HTML配置-移除属性的引号等优化
      minify: {
        removeAttributeQuotes: true
      },
      hash: true
    }),
    //样式文件抽离配置
    new ExtractTextPlugin('[name].css'),
    //热加载插件
    new webpack.HotModuleReplacementPlugin(),
  ],
  //服务配置
  devServer: {
    historyApiFallback: true,
    //设置为true，当源文件改变时会自动刷新页面
    hot: true,
    //设置默认监听端口，如果省略，默认为”8080“
    port: 9999,
    //inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)
    inline: true,
    //是否显示打包进度
    progress: true,
    //只在发生错误时输出
    stats: 'errors-only',
    //当有编译错误或者警告的时候显示一个全屏overlay
    overlay: {
      errors: true,
      warnings: true,
    },
    //http代理
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock
      '/mock': {
        target: 'http://localhost:3000',
        secure: false
      }
    },
  },
}