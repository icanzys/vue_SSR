module.exports = (isDev) => {
  return {
    //去除空格的影响
    preserveWhitepace: true,
    //提取Vue里的CSS文件，单独打包
    extractCSS: !isDev,
    //改变css类名
    // cssModules: {
    //   localIdentName:'[path]-[name]-[hash:base64:5]',
    //   camelCase: true
    // },
    // hotReload: false,   //热重载，根据环境变量生成
    // loaders: {}   //自定义模块
  }
}