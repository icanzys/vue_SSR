const path = require('path')
//判断环境，区分打包
const webpack = require('webpack')
//自动帮助插入html入口
const HTMLPlugin = require('html-webpack-plugin')
//Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//非js单独打包,分离css
const ExtractPlugin = require('extract-text-webpack-plugin')
//帮我们合理地合并webpack的配置
const merge = require('webpack-merge')
//引入baseconfig
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  //判断环境变量，区分打包
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  //指定模板
  new HTMLPlugin({
    template:path.join(__dirname, 'template.html')
  }),
  new VueLoaderPlugin()
]

const devServer = {
  //端口号
  port: 8000,
  //主机名
  host: '127.0.0.1',
  //编译过程中有任何错误显示出来
  overlay: {
    errors: true
  },
  //这里的位置就是模板的位置
  historyApiFallback: {
    index: '/index.html'
  },
  //自动打开页面
  open: true,
  //只加载当前页面（修改后）
  hot: true,
}

let config

if (isDev) {
  config = merge(baseConfig,{
    //对代码做映射，方便我们看得懂
    // devtool : '#cheap-module-eval-source-map', //在webpack4里面有默认的，所以这里不需要
    module: {
      rules: [
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
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      //配置hot更新这个模块
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin()   //在webpack4中取消
    ])
  })
} else {
  config = merge(baseConfig,{
    //在生产环境将vue，vue-router，等第三方类库拆分成一个单独的js文件（因为这种文件都比较稳定）
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // vendor: ['vue']//这里到时候添加想要单独打包出去的第三方类库
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
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
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },//提取第三方的js库出来单独打包
      runtimeChunk: true
    }, /*webpack4新加的配置项,runtimeChunk是webpack固定生成的一段代码，
        用来维护模块之间的以来关系的，比如给每个模块一个ID之类的，这部分代码跟你写的代码完全没有关系，
        所以单独切割出来能够防止他的变化影响你自己的代码的hash变化*/
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // })  //在webpack4里废弃掉的
    ])
  })
}

module.exports = config
