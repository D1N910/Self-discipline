// pages/setting/in de.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekTypeArray: ['中式(日...六)', '日语(日...土)','英语(Sun...Sat)'],
    weekTypeIndex:0,
    programIndex: 0,
    programArray:['小朋友','大朋友']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var weekTypeIndex = wx.getStorageSync('weekType')
    var Setting = {}
    // 在此新增设置
    Setting['weekTypeIndex'] = wx.getStorageSync('weekType')
    Setting['programIndex'] = wx.getStorageSync('program')
    // 在此更新设置设置
    for(let i in Setting){
      if (Setting[i]) {
        this.setData({
          [i]: Setting[i]
        })
      } else {
        wx.setStorageSync(i.split('Index')[0], 0)
      }
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
    // console.log(e)
    // return false

    this.setData({
      [e.currentTarget.dataset.arrayname+'Index']: e.detail.value
    })
    wx.setStorage({
      key: e.currentTarget.dataset.arrayname,
      data: parseInt(e.detail.value),
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