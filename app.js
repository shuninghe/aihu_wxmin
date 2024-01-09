// app.js
import API from "./servers/request.js"
import "./utils/libs/lodash/lodash.fix.js"
import _ from "./utils/libs/lodash/lodash.min.js"
wx.$http = API
wx.$_ = _
wx.$onLaunched = new Promise(resolve=>{
  return wx.$isResolve = resolve
})
App({
  globalData: {
    userInfo: {   //用户信息，后面token解析后的用户数据也会放入         
      openid: '',
      unionid: '',
    },
    token: '',              //用户token
    currentTab: 0,
    systemInfo: {},         //设备信息等
  },
  onLaunch() {
    // wx.showLoading({
    //   title: '',
    // })
    //获取设备信息
    this.getSystemInfo()
    //获取网络信息
    this.getNetWork()
    //检查小程序是否有版本可更新
    this.updateManager()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        /**
         * 从缓存获取token
         */
        try {
          var storageSchema = wx.getStorageSync('schema')
        } catch (e) {
          // Do something when ca tch error
        }
      }
    })
  },
  onShow() {
    // 监听网络变化
    wx.onNetworkStatusChange((res) => {
      let isConnected = res.isConnected;
      let networkType = res.networkType
      if (!isConnected) {
        wx.showToast({
          title: '网络不流畅，请稍后再试',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  getNetWork() {
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none' || networkType === 'unknown') {
          wx.showToast({
            title: '网络异常，请检查您的网络设置',
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail() {
        wx.showToast({
          title: '网络异常，请检查您的网络设置',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  updateManager() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          });
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '更新失败',
              content: '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开'
            })
          });
        }
      });
    }
  },
  getSystemInfo() {
    let _this = this;
    wx.getSystemInfoAsync({
      success(res) {
        //胶囊按钮布局位置
        let menuBtn = wx.getMenuButtonBoundingClientRect()
        let navigationBarHeight = (menuBtn.top - res.statusBarHeight) * 2 + menuBtn.height
        _this.globalData.systemInfo = {
          menuBtn,
          navigationBarHeight,                        //胶囊按钮高度
          statusBarHeight: res.statusBarHeight        //顶部状态栏高度
        }
        wx.$isResolve()
      }
    })
  },
  // token换取用户信息再存储
  getUserInfoByToken() {
    wx.$http.getLoginuserInfo({ host: this.globalData.host }).then(res => {
      console.log(res)
      let data = res.loginUser
      if (wx.$_.isEmpty(data)) {
        return
      }
      /**
       * 更新用户 租户和校区，以后端数据为主
       */
      try {
        data.schema && wx.setStorageSync('schema', data.schema)
        data.levelId && wx.setStorageSync('levelId', data.levelId)
      } catch (e) {
        console.log('-------放置缓存的catch-------', e)
      }
      //替换用户新token
      data.token && (this.globalData.token = data.token)
      //合并用户信息
      Object.assign(this.globalData.userInfo, data)
      //判断是否绑卡
      if (data && data.forceBindFlag === true && data.bindEcardFlag === false) {
        wx.navigateTo({
          url: '/mainFunc/pages/bindcard/bindcard',
        })
      }
      wx.hideLoading()
      wx.$isResolve()
    }).catch(err => {
    })
  }
})
