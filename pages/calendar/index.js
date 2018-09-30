// pages/calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showYear:'2018',
    List: [],
    weekArray: [],
    current:0
  },

  /**
   * 更改时间现实
   */
  bindshowYearChange(e) {
    this.setData({
      showYear: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowDate = new Date()
    var monthArray = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    var value = wx.getStorageSync('weekType')
    if (value) {
      if (value == 0) {
        var weekArray = ['日', '一', '二', '三', '四', '五', '六'];
      } else if (value == 1) {
        var weekArray = ['日', '月', '火', '水', '木', '金', '土'];
      } else if (value == 2) {
        var weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
      }
    } else {
      wx.setStorageSync('weekType', 0)
      var weekArray = ['日', '一', '二', '三', '四', '五', '六'];
    }
    this.setData({
      nowMonth: monthArray[nowDate.getMonth()],
      weekArray
    })
  
    // 月份的天数
    var m_days = new Array(31, 28 + this.is_leap(nowDate.getFullYear()), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);

    var List = []
    var j = 0
    // 遍历获得初始化的日历表
    for (let i in monthArray) {
      List[j] = {}
      List[j].monthName = monthArray[i]
      List[j].monthDay = m_days[i]
      List[j].date = []      
      // 存储日期
      for (let date = 0; date < m_days[i];date ++){
        List[j].date[date] = {}
        List[j].date[date].name = date+1
      }
      let getStartDate = new Date(this.data.showYear, i, 1)
      let getEndDate = new Date(this.data.showYear, i, m_days[i])
      console.log(getStartDate.getDay())
      // 存储开头日期
      for (let date = 0; date < getStartDate.getDay(); date++) {
        List[j].date[date] = {}
        List[j].date[date].name = date + 1
      }
      console.log(getEndDate.getDay())
      j++      
    }    
    this.setData({
      List
    })
  },

  /**
   * 判断是不是闰年
   */
  is_leap(year) {
    var res;
    return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
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
  changeWeekShow(event) {
    this.setData({
      showCurrent: event.detail.current
    }, () => {
      this.setData({
        scrollLeft: this.data.windowWidth / 2 + (event.detail.current - 6) * (this.data.rect[0].width) - this.data.rect[0].width / 2
      })
    })
  }
})