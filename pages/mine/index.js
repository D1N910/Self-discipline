const app = getApp();
const words = require(`../../i18n/${app.lang}/wordList.js`);
const pageContents = require(`../../i18n/${app.lang}/pages/mine.js`);

Page({
  data: {
    words: words,
    i18n: pageContents.wxml,

    processing: '',
    over: '',
    getRed: 0
  },
  
  onShow: function () {
    app.lib.toUpdateTheme(this, app.titles.mine, app.globalData.themeColor);
    
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
})