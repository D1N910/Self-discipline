// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processing: '',
    over: '',
    getRed: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var allTasks = wx.getStorageSync('allTasks')
    var nowDate = new Date();
    

    var thisDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate());
    var processing = 0;
    var getRed = 0;
    for (let i in allTasks) {
      if (thisDate.getTime() <= allTasks[i].endAt) {
        processing++
      }
      getRed += allTasks[i].success.length
    }
    var over = allTasks.length - processing
    this.setData({
      processing: processing,
      over: over,
      getRed: getRed
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})