$.ajax({
  // type: 表示发送请求的方式 get/post
  // url: 发送给服务器端的地址或接口
  // data: 发送给后端服务器的数据,jQuery中的ajax支持对象和拼接好的字符串
  // dataType: 以什么样的方式解析或接收服务器端响应回来的数据,
  // success(色可赛斯): 成功时的回调
  // error(爱瑞儿): 不成功时的回调,比如说请求超时,
  // timeout: 请求超时时间,3秒
  // beforeSend: 在发送请求之前会先执行这个函数,在这个函数中可以进行一些验证
  //              return false会阻止请求的发送
  // complate(康姆普雷特---惯性力的意思): 响应完成时调,不管请求成功与否最后都会执行这个函数   
  //            可以做一些数据的重置          
})