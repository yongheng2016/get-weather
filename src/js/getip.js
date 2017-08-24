const http = require('http')

var getip = {
  ip: function (callback){

    http.get('http://weixin.jirengu.com/weather/ip', (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('请求失败。\n' +
                          `状态码: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' +
                          `期望 application/json 但获取的是 ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        // 消耗响应数据以释放内存
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      var a = res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          callback(parsedData.data)
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(`错误: ${e.message}`);
    });

  }
}

module.exports = getip