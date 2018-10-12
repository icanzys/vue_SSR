//配置有些css属性需要加浏览器前缀，配置了这个自动帮我们加
const autoprefix = require('autoprefix')

module.exports = {
  plugins: [
    autoprefix()
  ]
}