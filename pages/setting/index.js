// pages/setting/in de.js
const app = getApp()
const words = require(`../../i18n/${app.lang}/wordList.js`);
const pageContent = require(`../../i18n/${app.lang}/pages/setting.js`);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: words,
    i18n: pageContent.wxml,

    weekTypeArray: pageContent.weeklyExpressions,
    weekTypeIndex:0,
    programIndex: 0,
    themeColorIndex: 0,
    programArray:['小朋友','大朋友'],//这个没用上？
    themeColorArray: pageContent.themes,
    themeColor: '#ff7199'
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
          title: words.finished
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
    app.lib.toUpdateTheme(this, app.titles.setting, app.globalData.themeColor);
  },

  
})