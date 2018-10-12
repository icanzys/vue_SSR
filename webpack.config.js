const path = require('path')
//判断环境，区分打包
const webpack = require('webpack')
//自动帮助插入html入口
const HTMLPlugin = require('html-webpack-plugin')
//Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//非js单独打包,分离css
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: {
    main: path.join(__dirname, 'src/index.js') //__dirname代表文件所在的目录,path.join把地址做一个拼接
  },
  output: {
    filename: 'bundle.js', //输出的文件名
    path: path.join(__dirname, 'dist') //输出的路径
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
              name: '[name]-aaa.[ext]'//ext是扩展名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //判断环境变量，区分打包
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin()
  ]
}
if (isDev) {
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader', 
          //因为使用stylus会自动生成sourceMap,这里就让postcss直接使用
          options: {sourceMap: true}
        },
          'stylus-loader'
        ]
    }
  )
  //对代码做映射，方便我们看得懂
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    //端口号
    port: 8000,
    //主机名
    host: '127.0.0.1',
    //编译过程中有任何错误显示出来
    overlay: {
      errors: true
    },
    //自动打开页面
    open: true,
    //只加载当前页面（修改后）
    hot: true,
  },
  config.plugins.push(
    //配置hot更新这个模块
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  //在生产环境将vue，vue-router，等第三方类库拆分成一个单独的js文件（因为这种文件都比较稳定）
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']//这里到时候添加想要单独打包出去的第三方类库
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader', 
            //因为使用stylus会自动生成sourceMap,这里就让postcss直接使用
            options: {sourceMap: true}
          },
          'stylus-loader'
          ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config