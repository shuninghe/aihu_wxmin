// pages/home/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 0,
    navigationBarHeight: 0,
    topTabs: [{name: "广场"},{name: "排行榜"}],
    secondTabs: [
      {name: "推荐"},
      {name: "运动"},
      {name: "游戏"},
      {name: "遛娃"},
      {name: "心理辅导"},
      {name: "二手"},
      {name: "旅游"},
      {name: "运动"},
      {name: "运动"}
    ],
    leaderBoardTabs: [
      {name: "社区达人"},
      {name: "社牛邻居"},
      {name: "靠谱邻居"},
      {name: "超级街坊"}
    ],
    topActive: 0,
    actActive: 0,
    filterOption1: [
      { text: '距离最近', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    filterOption2: [
      { text: '时间最近', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    filterOption3: [
      { text: '有偿', value: 'a' },
      { text: '无偿', value: 'b' }
    ],
    value1: 0,
    value2: 'a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await wx.$onLaunched
    this.setData({
      statusBarHeight: app.globalData.systemInfo.statusBarHeight,
      navigationBarHeight: app.globalData.systemInfo.navigationBarHeight
    })
    console.log(app.globalData.systemInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onClickTopTab(event){
    console.log(event.detail.name)
    this.setData({
      topActive: event.detail.name 
    })
  },
  onClickActTab(event){
    console.log(event.detail.name)
    this.setData({
      actActive: event.detail.name 
    })
  }
})