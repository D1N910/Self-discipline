var app = getApp()

// pages/unfinishdTaskList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTaskLists: []  
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
    this.toUpdateTheme()
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
    this.Refresh()
    this.toUpdateTheme()    
  },
  // 刷新页面
  Refresh: function (options) {
    this.data.endTaskLists = []
    // 获取当前时间
    var thisDate = new Date()
    var thisD = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate())
    // 获取当前时间戳
    var thisTime = thisD.getTime()
    // 获取所有任务
    var allTasks = wx.getStorageSync('allTasks')

    // 遍历所有任务
    for (let i in wx.getStorageSync('allTasks')) {
      // 如果结束时间大于等于当前时间，说明是已结束的任务
      if (thisTime > allTasks[i].endAt) {
        // 先得到任务开始/结束时间
        var allTaskStart = new Date(allTasks[i].startAt)
        var allTaskEnd = new Date(allTasks[i].endAt)

        // 任务子项目
        let endTaskListsItem = {}
        // 赋值
        endTaskListsItem.id = allTasks[i].id
        endTaskListsItem.content = allTasks[i].content
        endTaskListsItem.otherOpations = allTasks[i].otherOpations
        // 转换时间
        endTaskListsItem.startAt = `${allTaskStart.getFullYear()}年${allTaskStart.getMonth() + 1}月${allTaskStart.getDate()}日`
        endTaskListsItem.endAt = `${allTaskEnd.getFullYear()}年${allTaskEnd.getMonth() + 1}月${allTaskEnd.getDate()}日`

        // 完成时间
        var doneDay = (allTasks[i].endAt - allTasks[i].startAt) / 86400000 + 1

        var doneNumber = 0

        endTaskListsItem.redNum = allTasks[i].success.length
        this.data.endTaskLists.push(endTaskListsItem)
      }
    }
    this.setData({
      endTaskLists: this.data.endTaskLists
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
  
  },


  /**
   * 用户点击删除任务
   */
  delateItem(e) {
    console.log(e)
    var _this = this
    wx.showModal({
      title: '将永久删除此任务',
      content: '是否继续',
      cancelColor: this.data.themeColor,
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          var allTasks = wx.getStorageSync('allTasks')
          for (let i in allTasks) {
            if (allTasks[i].id == e.target.dataset.taskid) {
              allTasks.splice(i, 1)
              break
            }
          }
          wx.setStorageSync('allTasks', allTasks)
          _this.Refresh()
          wx.showToast({
            title: '删除啦',
            icon: 'none'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '刚刚的事情当作没发生过',
            icon: 'none'
          })
        }
      }
    })
  }
})