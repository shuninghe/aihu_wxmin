// components/customer-navbar/index.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isFixed: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    navigationBarHeight: 0
  },
  lifetimes:{
    attached: function(){
      this.setData({
        statusBarHeight: app.globalData.systemInfo.statusBarHeight,
        navigationBarHeight: app.globalData.systemInfo.navigationBarHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toBack(){
      wx.navigateBack()
    }
  }
})