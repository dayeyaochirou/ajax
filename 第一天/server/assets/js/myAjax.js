// 1. 创建异步对象
// 2. 设置请求行
// 3. 设置请求头

// 4. 设置请求体
// 5. 监视异步对象的状态 

// 这种方式不太好
// 1. 参数固定死了,不灵活，顺序只能是这样
// 2. ajax是一个函数，如果引入到别的文件当中，有可能会靠变量或函数的污染
// 3. ajax是一个功能,如果用到其它的功能，最是好在自己对象内部
// function ajax(params){
//   // 2.1 创建异步对象
//   var xhr = new XMLHttpRequest()
//   // 2.2 设置请求行
//   xhr.open('post', 'http://127.0.0.1:3002/getStudentsJSON')
//   // 2.3 设置请求头

//   // 2.4 设置请求体
//   xhr.send(null)
//   // 2.5 监视异步对象的状态 
//   xhr.onreadystatechange = function () {
//     if (xhr.status == 200 && xhr.readyState == 4) {
//       // console.log(xhr.responseText);
//       // console.log(typeof xhr.responseText);
//       var obj = JSON.parse(xhr.responseText)
//       console.log(obj);
//       console.log(typeof obj);
//       if (obj.code == 100) {

//         renderPage(obj);// 当数据回来之后，直接调用函数进行后续处理，至于怎么处理，那是一个单独的业务功能，与异步对象没有关系

//       } // if obj.code
//     } // if xhr
//   }
// }

var $ = {
  convertTostring:function(obj) {
    var str = ''
    for (var key in obj) {
      str += key + '=' + obj[key] + '&'
    }
    // str = str.slice(0, -1);
    // return str;
    return str.slice(0, -1); // // 'name=tom&age=20gender=男&address=天河区'
  },
  ajax:function(params){ // 传入的参数是一个对象
    // 这个params对象里面应该包括: type,url,data,callback
    // 2.0 定义变量获取数据
    var type = params.type || 'get' // 获取请求的方式 
    var url = params.url || location.href // 获取要发送的目标地址
    var data = this.convertTostring(params.data||{}) // 获取要发送的数据
    var success = params.success
    var dataType = params.dataType || 'text/plain'
    // 2.1 创建异步对象
    var xhr = new XMLHttpRequest()
    // 2.2 设置请求行
    if(type=='get'){
      url = url + '?' + data; // http://127.0.0.1:3002/submit?name=tom&age=20gender=男&address=天河区
      data = null;
    }
    xhr.open(type, url)
    // 2.3 设置请求头
    if(type=='post'){
      // 只有post请求的时候，才需要设置请求头
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    }
    // 2.4 设置请求体
    xhr.send(data)
    // 2.5 监视异步对象的状态 
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {      
        var res;
        if(dataType=='json'){
          res = JSON.parse(xhr.responseText)// 将接收到的json形式的字符串转换成对象
        }else if(dataType=='xml'){
          res = xhr.responseXML;
        }else {
          res = xhr.responseText  // 当成纯文本字符串来接收
        }   
       success(res);// 当数据回来之后，直接调用函数进行后续处理，至于怎么处理，那是一个单独的业务功能，与异步对象没有关系

      } // if xhr
    }
  }
}

// var obj = {
//   type: 'get',
//   url: 'http://127.0.0.1:3002/submit',
//   data: { // 外部传入 进来的数据，为了书写方便，这里用一个对象来设置
//     userName: 'tom',
//     userPwd: 123
//   },
//   dataType:'xml',
//   success: function () {

//   }
// }
// $.ajax(obj)



