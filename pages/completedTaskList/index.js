const app = getApp()
const words = require(`../../i18n/${app.lang}/wordList.js`);

Page({

  data: {
    endTaskLists: [],
    
    words: words
  },

  onShow: function () {
    this.Refresh()
    app.lib.toUpdateTheme(this, app.titles.completedTaskList, app.globalData.themeColor);
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
        endTaskListsItem.startAt = `${allTaskStart.getFullYear()}${words.year}${allTaskStart.getMonth() + 1}${words.month}${allTaskStart.getDate()}${words.day}`
        endTaskListsItem.endAt = `${allTaskEnd.getFullYear()}${words.year}${allTaskEnd.getMonth() + 1}${words.month}${allTaskEnd.getDate()}${words.day}`

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
   * 用户点击删除任务
   */
  delateItem(e) {
    console.log(e)
    var _this = this
    wx.showModal({
      title: words.confirmDelete.title,
      content: words.confirmDelete.content,
      cancelColor: this.data.themeColor,
      confirmText: words.confirm,
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
        }
      }
    })
  }
})