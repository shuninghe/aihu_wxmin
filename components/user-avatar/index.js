// components/user-avatar/index.js
import { getCurrentPageRouterName } from "../../utils/util"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    width: String,   //rpx
    height: String,   //rpx
    hasBorder: {
      type: Boolean,
      value: false,
    }, //是否带外部边框
    borderColor: {      //外边框颜色
      type: String,
      value: '#B8EC51'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toUserCallCard(){
      let name = getCurrentPageRouterName()
      if(name === 'pages/main/mycallcard/index'){
        return
      }
      wx.navigateTo({
        url: '/pages/main/mycallcard/index',
      })
    }
  }
})