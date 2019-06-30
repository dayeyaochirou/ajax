/**
 * 1. 获取json形式的数据
 *    '{"code":200,"msg":"查询成功","data":[]}'
 *     xhr.reponseText来接收,接收到的是一个字符串
 *     JSON.parse(xhr.responseText)来转换成真正的JSON对象
 * 
 * 2. 接收XML格式的数据 
 *     '<?xml versiion="1.0" encoding="utf-8"?><root><items><item><name>张三</name></item></items></root>'
 *    xhr.responseXML  会将接收到的XML格式的字符串转换成类DOM对象
 *      就可以使用操作DOM的方式来操作这个类DOM对象
 * 
 * 3. 使用异步对象发送请求 
 *      1. 创建异步对象
 *      2. 设置请求行
 *      3. 设置请求头 
 *      4. 设置请求体
 *      5. 监视异步对象的状态
 * 
 * 4. 封装ajax
 *     
 * 5. 数组中的方法
 *     push是给数据添加新的数据
 *     join 是将数组中的数据连接成字符串,默认是以,连接  
 * 
 * 6. 字符串的截取  "abcdef"
 *      slice(start,end)  有两个参数
 *        第1个参数表示开始截取的索引位置
 *        第2个参数表示截取到的索引位置  不包括当前索引上的值
 *      substr(start,count) 
 *      substring(start,end) 第二个参数不可以为负数
 * 
 * 7. 将对象转换成键=值&键=值...
 *    {"name":"tom","age":10,"address":"天河区"} ====>
 *    "name=tom&age=10&address=天河区"
 * 
 * 8. 回调函数 
 *      把函数当做参数来进行传递,这样的函数称为回调函数
 *      函数里面包裹着要执行的代码，代码早就写好了，只要有数据传入进来，一调用就会执行
 */
var $ = {
  convertToString(obj){

  },
  ajax:function(params){
    var type = params.type ||'get'
    var url = params.url || location.href 
    var data = this.convertToString(params.data || {})
    var dataType = params.dataType || 'text/plain'
    var success = params.success

   // 1. 创建异步对象
   // 2. 设置请求行
   // 3. 设置请求头
   // 4. 设置请求体
   // 5. 监视异步对象的状态  
      xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState==4){
          var result;
          if(dataType=='json'){
            result = JSON.parse(xhr.reponseText)
          }else if(dataType=='xml'){
            result = xhr.responseXML
          }else {
            result = xhr.responseText
          }

          // 数据回来了,后续如何处理，是一个单独的业务功能，与异步对象或后端没有关系
          success&&success(result)
        }
      }
  }
}

$.ajax({
  type:'get',
  url:'/submit',
  data:{
    userName:'tom',
    userPwd:123
  },
  dataType:'json',
  success:function(res){
    // 进行后续的处理
  }
})