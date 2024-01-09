const app = getApp()
Component({
  data: {
    active: 0,
    list:[
      {
        pagePath: "/pages/tabbar/home/index",
        iconPath: "/assets/img/tabbar/un-home.png",
        selectedIconPath: "/assets/img/tabbar/home.png",
        text: "首页"
      },{
        pagePath: "/pages/tabbar/notice/index",
        iconPath: "/assets/img/tabbar/un-notice.png",
        selectedIconPath: "/assets/img/tabbar/notice.png",
        text: "通知"
      },{
        pagePath: "/pages/tabbar/publish/index",
        iconPath: "/assets/img/tabbar/un-publish.png",
        selectedIconPath: "/assets/img/tabbar/publish.png",
        text: "发布"
      },{
        pagePath: "/pages/tabbar/show/index",
        iconPath: "/assets/img/tabbar/un-show.png",
        selectedIconPath: "/assets/img/tabbar/show.png",
        text: "秀一秀"
      },{
        pagePath: "/pages/tabbar/my/index",
        iconPath: "/assets/img/tabbar/un-my.png",
        selectedIconPath: "/assets/img/tabbar/my.png",
        text: "我的"
      }
    ]
  },
  methods:{
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      app.globalData.currentTab = event.detail
      wx.switchTab({
        url: this.data.list[event.detail].pagePath.startsWith('/') ? this.data.list[event.detail].pagePath : `/${this.data.list[event.detail].pagePath}`
      })
    },
    init(){
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
          (item.pagePath.startsWith('/') ? item.pagePath.substr(1) : item.url) ===
          `${route}`,
      );
      console.log('------', this.data.active)
      this.setData({ active });
      console.log('------', this.data.active)
    }
  }
})