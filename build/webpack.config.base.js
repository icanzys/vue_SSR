const path = require('path')

const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', //development || production (webpack4)
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'), //__dirname代表文件所在的目录,path.join把地址做一个拼接
  output: {
    filename: 'bundle.js', //输出的文件名
    path: path.join(__dirname, '../dist') //输出的路径
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ //忽略
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] 
      },
      {
        test: /\.(jpg|svg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',//可以将这些转化为base64代码写到文件中，这样就不用请求
            options: {
              limit: 1024,//这个选项将小于1024的文件转化为base64
              name: 'resources/[path][name].[hash:8].[ext]'//ext是扩展名
            }
          }
        ]
      }
    ]
  }
}

module.exports = config