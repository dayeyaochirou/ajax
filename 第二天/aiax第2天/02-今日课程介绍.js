/**
 * 1. 获取json形式的字符串并进行解析
 * 2. 获取xml格式的字符串进行解析
 * 3. 封装ajax 
 * 4. 使用jQuery中的ajax来发送请求
 */

 $.ajax({
   type:'get',
   url:'http://127.0.0.1:3001/getCode',
   data:{
     'name':'tom',
     'pass':123
   },
   success:function(res){
     // 进行业务的后续处理
   }
 })