// 1. 引入内置核心模块
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const urlModule = require('url')

// 引入第三方模块
const formidable = require('formidable')

// 2. 向外暴露数据
module.exports = {
  // 显示index页面
  showIndexPage(req, res) {
    res.render('index')
  },
  // 显示注册页面
  showRegisterPage(req, res) {
    res.render('register')
  },
  // 显示获取学生json数据的页面
  showStudentsJSONPage(req, res) {
    res.render('studentsJSON')
  },
  // 显示获取学生XML数据的页面
  showStudentsXMLPage(req, res) {
    res.render('studentsXML')
  },
  // 显示水果超市主页面
  showFruitsPage(req,res){
    res.render('fruits')
  },
  // 获取所有的水果数据
  getAllFruitsData(req,res){
    fs.readFile(path.join(__dirname,'./fruits.json'),'utf-8',(err,data)=>{
      if (err) return res.end('404')
      res.json({
        "code": 200,
        "des": "请求成功",
        "data": JSON.parse(data)
      })
    })
  },
  // 显示水果详情页面
  showDetailPage(req,res){
    res.render('detail')
  },
  // 根据id获取某个水果详情
  getOneFruitById(req,res){
    fs.readFile(path.join(__dirname, 'fruits.json'), 'utf-8', (err, data) => {
      if (err) return console.log(err.message);
      let arr = JSON.parse(data);
      let flag = true;
      var fruit;
      arr.some(item => {
        if (req.query.id == item.id) {
          flag = false
          fruit = item
          return true;
        }
      })
      if (flag) return res.json({
        "code": 201,
        "msg": "抱歉没找到"
        
      })

      res.json({
        "code": 200,
        "data": fruit
      })
    })
  },
  // GET方式获取数据
  getDataOfGet(req, res) {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) return res.end('404')
      res.json({
        "code": 200,
        "des": "请求成功",
        "data": JSON.parse(data)
      })
    })
  },
  // POST方式获取数据
  getDataOfPost(req, res) {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) return res.end('404')
      res.json({
        "code": 200,
        "des": "请求成功",
        "data": JSON.parse(data)
      })
    })
  },
  // GET方式提交注册的数据
  submitUserOfGet(req, res) {
    let { userName, userPwd } = req.query
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) return res.end('404')
      let arr = JSON.parse(data);
      let flag = true;
      arr.some(item => {
        if (userName == item.userName) {
          flag = false;
          return true;
        }
      })
      if (flag) {
        arr.push(req.query);
        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(arr, null, ' '), err => {
          res.writeHeader(200, {
            "Content-Type": "text/plain;charset=utf-8",
            "refresh": "3;url=/index.html"
          })
          res.json({
            "code": 200,
            "msg": "恭喜你,注册成功"
          })
        })

      } else {
        res.writeHeader(200, {
          "Content-Type": "text/plain;charset=utf-8",
          "refresh": "3;url=/register.html"
        })
        res.json({
          "code": 201,
          "msg": "你好倒霉啊,用户名已经被占用,亲,换一个吧"
        })
      }
    })
  },
  // POST方式提交注册的数据
  submitUserOfPost(req, res) {
    req.on('end', () => {
      let user = req.body
      // let user = querystring.parse(str);// 将post过来的数据转换成对象
      fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        let arr = JSON.parse(data)
        let flag = true;
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
            res.json({
              "code": 200,
              "msg": "恭喜你,注册成功"
            })
          })
        } else {
          res.writeHeader(200, {
            "Content-Type": "text/plain;charset=utf-8",
            "refresh": "3;url=/register.html"
          })
          res.json({
            "code": 201,
            "msg": "你好倒霉啊,用户名已经被占用,亲,换一个吧"
          })
        }
      })
    })
  },
  // 验证GET方式提交过来的数据
  validateOfGet(req, res) {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) return console.log(err.message);
      let arr = JSON.parse(data);
      let flag = true;
      arr.some(item => {
        if (req.query.userName == item.userName) {
          flag = false
          return true;
        }
      })
      if (flag) return res.json({
        "code": 200,
        "msg": "恭喜你,用户名可以使用"
      })

      res.json({
        "code": 201,
        "msg": "抱歉,用户名已经被占用,请更换一个"
      })
    })
  },
  // 验证POST方式提交过来的数据
  validateOfPost(req, res) {
    req.on('end', () => {
      let user = req.body;// 将post过来的数据转换成对象
      console.log(user);
      fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        let arr = JSON.parse(data)
        let flag = true;
        arr.some(item => {
          if (item.userName == user.userName) {
            flag = false;
            return true;
          }
        })
        console.log(112233);
        if (flag) return res.json({
          "code": 200,
          "msg": "恭喜你,用户名可以使用"
        })

        res.json({
          "code": 201,
          "msg": "抱歉,用户名已经被占用,请更换一个"
        })
      })
    })

  },
  // GET方式获取学生json数据
  getStudentsJSONDataOfGet(req, res) {
    // 读取数据返回给前端页面
    fs.readFile(path.join(__dirname, './students.json'), 'utf-8', (err, data) => {
      if (err) return res.end('error')
      // 注意读取到的数据是字符串,返回给前台要有一定的数据格式,要有状态码和状态描述 
      var arr = JSON.parse(data);
      // res.writeHeader(200,{
      //   "Access-Control-Allow-Origin":"*"
      // })
      res.json({
        "code": 100,
        "des": "数据查询成功",
        "data": arr
      })// 将数据返回给前端页面
    })
  },
  // POST方式获取学生json数据
  getStudentsJSONDataOfPost(req, res) {
    // 读取数据返回给前端页面
    fs.readFile(path.join(__dirname, './students.json'), 'utf-8', (err, data) => {
      if (err) return res.end('error')
      // 注意读取到的数据是字符串,返回给前台要有一定的数据格式,要有状态码和状态描述 
      var arr = JSON.parse(data);
      res.json({
        "code": 100,
        "des": "数据查询成功",
        "data": arr
      })// 将数据返回给前端页面
    })
  },
  // GET方式获取学生xml数据
  getStudentsXMLDataOfGet(req, res) {
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
  },
  // POST方式获取学生xml数据
  getStudentsXMLDataOfPost(req, res) {
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
  },
  // 加载静态资源 
  loadStaticResource(req, res) {
    fs.readFile(path.join(__dirname, req.pathname), (err, data) => {
      if (err) return console.log(err.message);
      res.end(data)
    })
  },
  // 获取验证码
  getCode(req, res) {
    var arr = ['12345', '23456', '34567', '45678']

    var index = Math.floor(Math.random() * arr.length)

    res.end(arr[index])
  },
  // 带有延迟的获取验证码 延迟5秒后发送
  getDelayCode(req, res) {
    var arr = ['12345', '23456', '34567', '45678']

    var index = Math.floor(Math.random() * arr.length)
    // 延迟5秒后返回验证码
    let timeId = setTimeout(() => {
      res.end(arr[index])
      clearTimeout(timeId)
    }, 5000);
  },
  // 注册案例之验证用户名
  validateName(req, res) {
      let obj = req.query
      fs.readFile(path.join(__dirname, './data.json'), 'utf-8', (err, data) => {
        if (err) return res.end('error');

        var dataObj = JSON.parse(data);// 将读取到的字符串转换成数组对象对象

        var flag = false;
        dataObj.some(item => {
          if (item.userName == obj.userName) {
            flag = true;
            return true;// 说明账号已经被注册了不能使用
          }
        })
        if (flag) return res.json({
          "code": 201,
          "msg": "账号已经被占用,请更换一个"
        })
        
        res.json({
          "code": 200,
          "msg": "恭喜你,账号可以使用..."
        })

      })

  },
  // 注册案例之注册用户
  registerUser(req,res){
    req.on('end',()=>{
      let newObj = req.body
      // 先将数据读出来 
      fs.readFile(path.join(__dirname, './data.json'), 'utf-8', (err, data) => {
        if (err) return res.json({
          "code":500,
          "msg":"服务器错误"
        });
        var arr = JSON.parse(data);// 将读取到的数据转换成对象
        arr.push(newObj);
        var str = JSON.stringify(arr, null, "  ");// 再将数组转换成字符串

        fs.writeFile(path.join(__dirname, './data.json'), str, (err) => {
          if (err) return res.json({
            "code": 500,
            "msg": "服务器错误"
          });
          res.json({
            "code": 200,
            "msg": "注册成功"
          });
        })
      })
    })
  },
  // 带有延迟5秒的注册用户
  registerUserDelay(req,res){
    req.on('end', () => {
      let newObj = req.body
      // 先将数据读出来 
      fs.readFile(path.join(__dirname, './data.json'), 'utf-8', (err, data) => {
        if (err) return res.json({
          "code": 500,
          "msg": "服务器错误"
        });
        var arr = JSON.parse(data);// 将读取到的数据转换成对象
        arr.push(newObj);
        var str = JSON.stringify(arr, null, "  ");// 再将数组转换成字符串

        fs.writeFile(path.join(__dirname, './data.json'), str, (err) => {
          if (err) return res.json({
            "code": 500,
            "msg": "服务器错误"
          });
          setTimeout(() => {
            res.json({
              "code": 200,
              "msg": "注册成功"
            });
          }, 5000);
        })
      })
    })
  },
  // 上传文件
  uploadFile(req,res){
    // 使用formidable接收上传过来的文件
    // 1. 创建对象
    var form = new formidable.IncomingForm()

    // 2.设置编码方式  因为formidable这个模块非常强大,不但可以处理上传过来的文件,还可以处理上传过来的json形式的字符串数据
    form.encoding = 'utf-8';

    // 3. 设置图片上传过来后的存储路径
    form.uploadDir = "./assets/uploads";
    // 当前的这个./不是以当前的控制器文件为参考点,而是以项目文件夹为参考

    // 4. 是否保留上传文件的后缀  true 保留   false不保留 
    form.keepExtensions = true;

    // 5. 设置上传字段的大小  json形式的字符串
    form.maxFieldsSize = 20 * 1024 * 1024;

    // 6.设置上传文件的大小
    form.maxFileSize = 200 * 1024 * 1024;

    // 7. 设置上传字段的对数 
    form.maxFields = 1000;

    // 8. 调用parse方法对上传过来的数据进行处理
    form.parse(req, function (err, fields, files) {
      /**
       * 1. 上传过来的数据都在req这个对象里面
       * 2. parse方法会对req这个对象进行处理
       * 3. 如果上传成功err是一个null,否则是一个错误对象
       * 4. 如果上传成功fields里面存储的是上传过来的字符串数据
       * 5. 如果上传成功files里面存储的是上传过来的文件数据
       */

      if (err) return res.json({
        "code": 1,
        "msg": "上传失败"
      })

      res.json({
        "code": 0,
        "msg": "上传成功",
        "src": files.avatar.path
      })
    });
  }
}