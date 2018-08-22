// pages/setting/in de.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['中式(日...六)', '日语(日...土)','英语(Sun...Sat)'],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('weekType')
    if (value){
      this.setData({
        index: value
      })
    }else{
      wx.setStorageSync('weekType', 0)
      this.setData({
        index: 0
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 修改星期显示设置
   */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    wx.setStorage({
      key: "weekType",
      data: e.detail.value,
      success(){
        wx.showToast({
          title: '修改成功!'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})