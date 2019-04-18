const app = getApp()
const words = require(`../../i18n/${app.lang}/wordList.js`);
const pageContent = require(`../../i18n/${app.lang}/pages/unfinishedTaskList.js`);

Page({
  data: {
    words: words,
    i18n: pageContent.wxml,

    unfinishedTaskLists:[],
    themeColor: []
  },

  // 刷新页面
  Refresh: function (options) {
    this.data.unfinishedTaskLists = []
    // 获取当前时间
    var thisDate = new Date()
    var thisD = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate())
    // 获取当前时间戳
    var thisTime = thisD.getTime()
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
        unfinishedTaskListsItem.otherOpations = allTasks[i].otherOpations
        // 转换时间
        unfinishedTaskListsItem.startAt = `${allTaskStart.getFullYear()}${words.year}${allTaskStart.getMonth() + 1}${words.month}${allTaskStart.getDate()}${words.day}`
        unfinishedTaskListsItem.endAt = `${allTaskEnd.getFullYear()}${words.year}${allTaskEnd.getMonth() + 1}${words.month}${allTaskEnd.getDate()}${words.day}`

        // 完成时间
        var doneDay = (allTasks[i].endAt - allTasks[i].startAt)/86400000 + 1
        
        var doneNumber = 0
        // 任务进度
        for (let j in allTasks[i].success){
          if (allTasks[i].success[j] >= allTasks[i].startAt && allTasks[i].success[j] <= allTasks[i].endAt){
            doneNumber ++
          }
        }
        unfinishedTaskListsItem.speedOfProgress = parseInt(doneNumber / doneDay * 100)
        this.data.unfinishedTaskLists.push(unfinishedTaskListsItem)
      }
    }
    this.setData({
      unfinishedTaskLists: this.data.unfinishedTaskLists
    })
  },

  
  onShow: function () {
    this.Refresh();
    app.lib.toUpdateTheme(this, app.titles.unfinishedTaskList, app.globalData.themeColor);
  },

  
  delateItem(e) {
    console.log(e)
    var _this = this


    wx.showModal({
      title: words.confirmDelete.title,
      content: words.confirmDelete.content,
      confirmText: words.confirm,

      cancelColor: this.data.themeColor,
      success: function (res) {
        if (res.confirm) {
          var allTasks = wx.getStorageSync('allTasks')
          for (let i in allTasks) {
            if (allTasks[i].id == e.target.dataset.taskid){
              allTasks.splice(i,1)
              break
            }
          }
          wx.setStorageSync('allTasks', allTasks)
          _this.Refresh()
          wx.showToast({
            title: words.deleted,
            icon: 'none'
          })
        }
      }
    })
  }
})