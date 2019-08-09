//app.js
App({
  onLaunch: function() {
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     this.ajax({
    //       method: "POST",
    //       url: "/api/user/token",
    //       data: {
    //         code: res.code
    //       }
    //     }).then((result) => {
    //       wx.setStorageSync("token", result.token);
    //     });
    //   }
    // })
  },
  // 公共数据
  globalData: {
    userInfo: null,
    url: 'http://localhost:3000',
  },
  // option:{method,url,data,config}
  ajax(option) {
    let token = wx.getStorageSync("token");
    token = token ? `Bearer ${token}` : '';
    let headerConfig = { // 默认header ticket、token、params参数是每次请求需要携带的认证信息
      Authorization: token,
      'content-type': 'application/x-www-form-urlencoded'
    };
    wx.showLoading({
      title: '加载中',
    })
    // method默认
    option.method = option.method || "POST";
    //拼接url
    option.url = this.globalData.url + option.url;
    //返回Promise对象
    return new Promise(function(resolve) {
      wx.request({
        method: option.method,
        url: option.url,
        data: option.data,
        header: Object.assign({}, headerConfig, option.config), // 合并传递进来的配置
        success: (res) => {
          wx.hideLoading();
          if (res.statusCode == 200) {
            resolve(res.data);
          } else {
            //错误信息处理
            wx.showModal({
              title: '提示',
              content: '服务器错误，请联系客服',
              showCancel: false,
            })
          }
        }
      })
    })
  }
})