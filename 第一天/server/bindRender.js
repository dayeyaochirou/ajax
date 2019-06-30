// 引入模块
const fs = require('fs')
const path = require('path')

// 向外暴露数据
module.exports = function (res) {
  res.render = function (fileName) {
    fs.readFile(path.join(__dirname, 'views/' + fileName + '.html'), (err, data) => {
      if (err) return res.end('404')
      res.end(data)
    })
  }
}