// 引入模块
const querystring = require('querystring')
const urlModule = require('url')
const fs = require('fs')
const path = require('path')

module.exports = function(req,res){
  var urlObj = urlModule.parse(req.url, true);
  var pathname = urlObj.pathname;// 获取请求路径
  var method = req.method; // 获取请求方法
  var query = urlObj.query; // 获取get请求方式发送过来的数据
  if (method == 'GET' && pathname == '/index.html') {
    res.render('index')
  } else if (method == 'GET' && pathname == '/register.html') {
    res.render('register')
  } else if (method == 'GET' && pathname == '/studentsJSON.html') {
    res.render('studentsJSON')
  } else if (method == 'GET' && pathname == '/studentsXML.html') {
    res.render('studentsXML')
  } else if (method == 'GET' && pathname == '/submit') {
    var userName = query.userName;
    var userPwd = query.userPwd;
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) return res.end('404')
      var arr = JSON.parse(data);
      var flag = true;
      arr.some(item => {
        if (userName == item.userName) {
          flag = false;
          return true;
        }
      })
      if (flag) {
        arr.push(query);
        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(arr, null, ' '), err => {
          res.writeHeader(200, {
            "Content-Type": "text/plain;charset=utf-8",
            "refresh": "3;url=/index.html"
          })
          res.end(JSON.stringify({
            "code":200,
            "msg":"恭喜你,注册成功"
          }))
        })

      } else {
        res.writeHeader(200, {
          "Content-Type": "text/plain;charset=utf-8",
          "refresh": "3;url=/register.html"
        })
        res.end(JSON.stringify({
          "code":201,
          "msg": "你好倒霉啊,用户名已经被占用,亲,换一个吧"
        }))
      }
    })
  } else if (method == 'POST' && pathname == '/submit') {
    var str = ''
    req.on('data', chunk => {
      str += chunk;
    })
    req.on('end', () => {
      var user = querystring.parse(str);// 将post过来的数据转换成对象
      fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        var arr = JSON.parse(data)
        var flag = true;
        arr.some(item => {
          if (item.userName == user.userName) {
            flag = false;
            return true;
          }
        })

        if (flag) {
          arr.push(user);
          fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(arr, null, ' '), err => {
            res.writeHeader(200, {
              "Content-Type": "text/plain;charset=utf-8",
              "refresh": "3;url=/index.html"
            })
            res.end(JSON.stringify({
              "code": 200,
              "msg": "恭喜你,注册成功"
            }))
          })
        } else {
          res.writeHeader(200, {
            "Content-Type": "text/plain;charset=utf-8",
            "refresh": "3;url=/register.html"
          })
          res.end(JSON.stringify({
            "code": 201,
            "msg": "你好倒霉啊,用户名已经被占用,亲,换一个吧"
          }))
        }
      })
    })
  } else if (method == 'GET' && pathname == '/validate') {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) return console.log(err.message);
      var arr = JSON.parse(data);
      var flag = true;
      arr.some(item => {
        if (query.userName == item.userName) {
          flag = false
          return true;
        }
      })
      if (flag) {
        res.writeHeader(200, {
          'Content-Type': 'text/plain;charset=utf-8'
        })
        res.end('恭喜你,用户名可以使用')
      } else {
        res.writeHeader(200, {
          'Content-Type': 'text/plain;charset=utf-8'
        })
        res.end('抱歉,用户名已经被占用,请更换一个')
      }
    })
  } else if (method == 'POST' && pathname == '/validate') {
    var str = ''
    req.on('data', chunk => {
      str += chunk;
    })
    req.on('end', () => {
      var user = querystring.parse(str);// 将post过来的数据转换成对象
      fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        var arr = JSON.parse(data)
        var flag = true;
        arr.some(item => {
          if (item.userName == user.userName) {
            flag = false;
            return true;
          }
        })

        if (flag) {
          res.writeHeader(200, {
            'Content-Type': 'text/plain;charset=utf-8'
          })
          res.end("恭喜你,此用户名可以使用")

        } else {
          res.writeHeader(200, {
            "Content-Type": "text/plain;charset=utf-8"
          })
          res.end('你好倒霉啊,用户名已经被占用,亲,换一个吧')
        }
      })
    })
  } else if (method == 'GET' && pathname == '/getStudentsJSON') {
    // 读取数据返回给前端页面
    fs.readFile(path.join(__dirname, './students.json'), 'utf-8', (err, data) => {
      if (err) return console.log(err.message);
      // 注意读取到的数据是字符串,返回给前台要有一定的数据格式,要有状态码和状态描述 
      var arr = JSON.parse(data);
      var obj = {
        "code": 100,
        "des": "数据查询成功",
        "data": arr
      }
      res.writeHeader(200, {
        'Content-Type': 'text/html;charset=utf-8'
      })
      res.end(JSON.stringify(obj));// 将数据返回给前端页面
    })
  } else if (method == 'POST' && pathname == '/getStudentsJSON') {
    // 读取数据返回给前端页面
    fs.readFile(path.join(__dirname, './students.json'), 'utf-8', (err, data) => {
      if (err) return console.log(err.message);
      // 注意读取到的数据是字符串,返回给前台要有一定的数据格式,要有状态码和状态描述 
      var arr = JSON.parse(data);
      var obj = {
        "code": 100,
        "des": "数据查询成功",
        "data": arr
      }
      res.writeHeader(200, {
        'Content-Type': 'text/html;charset=utf-8'
      })
      res.end(JSON.stringify(obj));// 将数据返回给前端页面
    })
  } else if (method == 'GET' && pathname == '/getStudentsXML') {
    // 读取数据返回给前端页面
    fs.readFile(path.join(__dirname, './students.xml'), 'utf-8', (err, data) => {
      if (err) return console.log(err.message);
      // 注意读取到的数据是字符串,返回给前台要有一定的数据格式,要有状态码和状态描述 
      fs.readFile(path.join(__dirname, './students.xml'), 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        res.writeHeader(200, {
          'Content-Type': 'application/xml;charset=utf-8'
        })
        res.end(data);
      })
    })
  } else if (method == 'POST' && pathname == '/getStudentsXML') {
    // 读取数据返回给前端页面
    fs.readFile(path.join(__dirname, './students.xml'), 'utf-8', (err, data) => {
      if (err) return console.log(err.message);
      // 注意读取到的数据是字符串,返回给前台要有一定的数据格式,要有状态码和状态描述 
      fs.readFile(path.join(__dirname, './students.xml'), 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        res.writeHeader(200, {
          'Content-Type': 'application/xml;charset=utf-8'
        })
        res.end(data);
      })
    })
  } else if (method == 'GET' && pathname == '/getData') {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) return res.end('404')
        res.end(JSON.stringify({
          "code": 200,
          "des": "请求成功",
          "data": JSON.parse(data)
        }))
    })
  } else if (method == 'GET' && pathname.startsWith('/assets')) {
    fs.readFile(path.join(__dirname,pathname),(err,data)=>{
      if(err) return console.log(err.message);
      res.end(data)
    })
  } else {
    res.end('404')
  }
}