var $ = {
    convertToString: function (obj) {
        // 初始化一个字符串
        var str = "";
        // 循环遍历对象中的neirong中的data
        for (var key in obj) {
            str += key + "==" + obj[key] + "&"
        }
        return str.slice(0, -1)
    },
    ajax: function (neirong) {
        // 定义neirong的发送方式,,默认值是get
        var type = neirong.type || "get";
        // 定义路径,,,默认值是当前页
        var url = neirong.url || location.href;
        //将获取到的被解析过的responseText通过前面的解析变成字符串格式
        var data = this.convertToString(neirong.data || {});

        var dataType = neirong.dataType || "text/plain";
        var success = neirong.success;
        // 新建一个异步对象
        var xhr = new XMLHttpRequest();
        if (type == 'get') {
            url = url + '?' + data;
            data = null;
        }
        // 设置请求行
        xhr.open(type, url);
        if (type == 'post') {
            // 设置请求头
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        // 设置请求体
        xhr.send(data);
        // 监视异步对象状态
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var result;
                if (dataType == 'json') {
                    result = JSON.parse(xhr.responseText);
                } else if (dataType == 'xml') {
                    result = xhr.responseXML;
                } else {
                    result = xhr.responseText;
                }
                success && success(result);
            }
        }
    }
}