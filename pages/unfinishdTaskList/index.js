// pages/completedTaskList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unfinishedTaskLists:[

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    var thisDate = new Date()
    // 获取当前时间戳
    var thisTime = thisDate.getTime()
    // 获取所有任务
    var allTasks = wx.getStorageSync('allTasks')

    // 遍历所有任务
    for (let i in wx.getStorageSync('allTasks')) {
      // 如果结束时间大于等于当前时间，说明是在进行中的任务
      if (thisTime <= allTasks[i].endAt) {
        // 先得到任务开始/结束时间
        var allTaskStart = new Date(allTasks[i].startAt)
        var allTaskEnd = new Date(allTasks[i].endAt)

        // 任务子项目
        let unfinishedTaskListsItem = {}
        // 赋值
        unfinishedTaskListsItem.id = allTasks[i].id
        unfinishedTaskListsItem.content = allTasks[i].content
        // 转换时间
        unfinishedTaskListsItem.startAt = `${allTaskStart.getFullYear()}年${allTaskStart.getMonth() + 1}月${allTaskStart.getDate()}日`
        unfinishedTaskListsItem.endAt = `${allTaskEnd.getFullYear()}年${allTaskEnd.getMonth() + 1}月${allTaskEnd.getDate()}日`

        // 完成时间
        var doneDay = (allTasks[i].endAt - allTasks[i].startAt)/86400000 + 1
        // 任务进度
        unfinishedTaskListsItem.speedOfProgress =parseInt(allTasks[i].success.length / doneDay * 100)
        this.data.unfinishedTaskLists.push(unfinishedTaskListsItem)
      }
    }
    this.setData({
      unfinishedTaskLists: this.data.unfinishedTaskLists
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})