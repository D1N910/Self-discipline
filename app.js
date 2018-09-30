//app.js
App({
  onLaunch(){
    this.toUpdate()
    // 拿到服务器原存取信息
    if (!wx.getStorageSync('allTasks')){
      // 存储信息
      wx.cloud.init({
        env: 'test-all-bb8cb2'
      })
      wx.cloud.callFunction({
        name: 'getDocTasks',
        success: function (res) {
          console.log(res)
          if(res.result.data.length>=1){
            wx.setStorageSync('allTasks', res.result.data[0].allTasks)
            wx.showModal({
              title: '自律表提示',
              content: 'hey 亲爱的，你好像换了个手机登录微信，现在我们通过安全的云开发服务存储了您之前的自律表配置信息，已经更新到了目前的手机上，请重新打开自律表。',
              showCancel: false,
              confirmText:'朕知道了'
            })
          }
        },
        fail: console.error
      })
    }else{
    // 存储信息
      wx.cloud.init({
        env: 'test-all-bb8cb2'
      })
      wx.cloud.callFunction({
        name: 'getAllTasks',
        data: {
          allTasks: wx.getStorageSync('allTasks')
        },
        success: function (res) {
          console.log(res.result)
        },
        fail: console.error
      })
    }
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