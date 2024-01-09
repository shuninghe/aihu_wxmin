module.exports = Behavior({
  behaviors: [],
  properties: {
  },
  data: {
  },
  attached: function(){},
  methods: {
    onPageScroll(event){
      if(event.scrollTop > 0 && !this.data.isFixed){
        this.setData({
          isFixed: true
        })
      }else if(event.scrollTop <= 0 && this.data.isFixed){
        this.setData({
          isFixed: false
        })
      }
    }
  }
})