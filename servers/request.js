import APIS from "./apis.js"
import config from "./config"
let methods = {}
Object.keys(APIS).map((method, index)=>{
  Object.keys(APIS[method]).map((url, index)=>{
    methods[url] = (data, header)=>{
      return new Promise((resolve, reject)=>{
        wx.request({
          url: config.baseUrl + APIS[method][url],
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
            'Authorization': getApp().globalData.token,
            ...header
          },
          method: method,
          data: data,
          success: res => {
            if (res.statusCode == 200 && res.data) {
              resolve(res.data);
            } else {
              reject(res);
              wx.hideLoading();
            }
          },
          fail: res => {
            reject(res);
            wx.hideLoading();
          }
        });
      })
    }
  })
})

export default methods