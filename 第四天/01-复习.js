/**
 * 1. jQuery中ajax的使用  
 *     $.ajax({
 *        type: 发送请求的方式get/post,
 *        url: 目标地址或目标接口
 *        data: 对象,还支持拼接好的字符串  "name=tom&age=10&address=天河区"
 *        dataType: 用什么样的方式来处理后端响应回来的数据
 *        success: 请求成功之后的回调
 *        error:   请求失败后的回调  做一下提示或后续其它处理
 *        timeout: 设置超时时间 
 *        beforeSend: 在发送请求之前执行的函数,在这里可以进行一些数据的较验 return false来阻止请求的发送
 *        complate: 无论成功还是失败都会执行的函数  进行页面的重置
 *        contentType: 设置post请求发送数据时的编码方式  "application/x-www-form-urlencoded" 
 *              当前端向后端发送文件的时候,是以二进制的格式来发送,不是以字符串来发送,
 *              因此不需要进行urlencoded编码,二进制数据编码之后会报错发不过去
 *              所以二进制的数据不需要这种编码,只需要设置false
 *        processData: 如果发送给后端服务器的是文件,本质是以二进制的方式来发送,所以不需要转换成字符串
 *              只需要将此属性设置为false即可
 *      })
 * 
 * 2. jQuery中其它的请求方式
 *     $.get()      只能发送get请求
 *     $.post()     只能发送post请求
 *     参数是一模一样的
 *      url:  必写的  发送给后端的目标地址
 *      data:  可选，发送给后端服务器的数据
 *      callback: 可选，请求成功后的回调
 *      dataType: 可选，请求成功后如何处理响应回来的数据
 * 
 * 3. form标签的submit事件  
 *     1. submit事件是给form标签注册的
 *     2. 必须通过submit按钮来触发
 *         <button>立即注册</button>
 *        <input type="submit" value="保存" />
 * 
 * 4. 表单序列化 serialize() 
 *     会将form标签中具有name属性的input标签的值一次性获取到并拼接成字符串 "name=tom&age=10&address=天河区"
 *      select  textarea 也可以
 * 
 * 5. 模板引擎  art-template 
 *      1. 引入模板文件
 *      2. 设置模板    需要渲染数据的部分做为模板
 *      3. 调用template生成模板字符串  其实就是html标签
 *      4. 将模板字符串渲染到页面上
 */