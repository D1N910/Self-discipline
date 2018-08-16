// pages/completedTaskList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unfinishedTaskLists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
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
        // 转换时间
        unfinishedTaskListsItem.startAt = `${allTaskStart.getFullYear()}年${allTaskStart.getMonth() + 1}月${allTaskStart.getDate()}日`
        unfinishedTaskListsItem.endAt = `${allTaskEnd.getFullYear()}年${allTaskEnd.getMonth() + 1}月${allTaskEnd.getDate()}日`

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
      title: '当这任务没有存在过',
      content: '是否继续',
      cancelColor: '#fc7070',
      confirmColor:'#000000',
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