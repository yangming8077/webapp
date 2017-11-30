module.exports = {
  plugins: [
    require('autoprefixer')({browsers: ['last 2 versions'] }),
    // 新增 ***** 定义公共 PX 转换 REM （remUnit值根据设计稿定义）
    require('postcss-px2rem')({remUnit: 75})
  ]
}