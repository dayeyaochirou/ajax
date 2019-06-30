/**
 * 封装时要考虑哪些因素
 * 1. 请求的类型  get/post  type
 * 2. 请求的目标地址  url
 * 3. 请求的参数  data
 * 4. 响应回来的数据以什么方式来接收  xhr.responseText  xhr.responseXML
 *     后端开发人员会告诉我们,响应回去的数据是什么格式
 *     可以通过一个属性,人为的来指定以什么方式来处理接收的数据 dataType
 * 5. 传入一个执行函数 这个函数是根据后端响应回来的数据进行业务逻辑的处理  success
 */
var $ = {
  convertToString: function (obj) {
    var stt = "";
    for (var key in obj) {
      str += key + "==" + obj[key] + "&"
    }
    return str.slice(0, -1)
  },

  ajax: function (canshu) {
    var type = canshu.type || "get";
    // 设置url的默认值为该页面的地址location.href
    var url = canshu.url || location.href;
    // data是数据的意思,这里获取到的data是个对象
    var data = this.convertToString(canshu.data || {});
    //text/plain是完全文本的意思,改成text/html就是以标签和文本的形式发送;
    var dataType = canshu.dataType || "text/plain";
    // success是获取数据后需要调用的方法
    var success = canshu.success;



    // 建立异步对象
    var xhr = new XMLHttpRequest();
    //设置请求行
    if (type == "get") {
      url = url + "?" + data;
      data = null;
    }
    xhr.open(type, url);
    // 设置请求头
    if (type == 'post') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    //设置请求体
    xhr.send(data);
    //监视状态
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        var result;
        if (dataType == 'json') {
          result = JSON.parse(xhr.responsetext);
        } else if (dataType == 'xml') {
          result = xhr.responseXML;
        } else {
          result = xhr.responseText;
        }
        console.log(result);
        success && success(result);
      }
    }













  }
}

