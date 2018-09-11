// pages/setting/in de.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekTypeArray: ['中式(日...六)', '日语(日...土)','英语(Sun...Sat)'],
    weekTypeIndex:0,
    programIndex: 0,
    themeColorIndex: 0,
    programArray:['小朋友','大朋友'],
    themeColorArray: ['#ff7199 粉[默认]', '#2d2d2d 黑', '#f1453d 红', '#ffc041 黄','#85c35c 绿','#1297ec 蓝','#a129aa 紫'],
    themeColor: '#ff7199'
  },

  /**
   * 更新主题
   */
  toUpdateTheme() {
    this.setData({
      themeColor: app.globalData.themeColor
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.themeColor,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      themeColor: app.globalData.themeColor
    })
    var weekTypeIndex = wx.getStorageSync('weekType')
    var Setting = {}
    // 在此新增设置
    Setting['weekTypeIndex'] = wx.getStorageSync('weekType') == '' ? 0 : wx.getStorageSync('weekType')
    Setting['programIndex'] = wx.getStorageSync('program') == '' ? 0 : wx.getStorageSync('program')
    Setting['themeColorIndex'] = wx.getStorageSync('themeColor') == '' ? 0 : wx.getStorageSync('themeColor')
    console.log(Setting['themeColorIndex'])
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
    console.log(e.currentTarget.dataset.arrayname)
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
    if (e.currentTarget.dataset.arrayname === 'themeColor') {
      console.log(this.data.themeColorArray[parseInt(e.detail.value)])
      let themeColor = this.data.themeColorArray[parseInt(e.detail.value)].split(' ')[0]
      wx.setStorage({
        key: 'themeColorSet',
        data: themeColor,
        success() {
          app.toUpdate()
        }
      })
      this.setData({
        themeColor
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.toUpdateTheme()
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
   * 
   */
})