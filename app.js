//app.js
App({
  onLaunch(){
    wx.cloud.init({
      env: 'test-all-bb8cb2'
    })
    this.toUpdate()
    wx.cloud.callFunction({
      name: 'getAllTasks',
      data:{
        allTasks: wx.getStorageSync('allTasks')
      },
      success: function (res) {
        console.log(res.result)
      },
      fail: console.error
    })
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