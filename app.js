//app.js
App({
  onLaunch(){
    this.toUpdate()
  },
  /**
   * 更新主题颜色
   */
  toUpdate(){
    var themeColor = wx.getStorageSync('themeColorSet')
    if(!themeColor){
      wx.setStorageSync('themeColorSet', '#ff7199')
      wx.setStorageSync('themeColor', 0)
      this.globalData.themeColor = '#ff7199'
    }else{
      this.globalData.themeColor = themeColor
      console.log(this.globalData.themeColor)
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.globalData.themeColor,
    })
  },
  globalData:{
    themeColor: '#ff7199'
  }
})