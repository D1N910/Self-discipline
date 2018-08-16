// pages/addNewTask/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskData: {
      startData: '',
      endData: ''
    },
    days: '',
    editTasks:{},
    edit: 0,
    changeTime: 0,
    submitText: '添加任务'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if(options.id){
      var allTasks = wx.getStorageSync('allTasks')
      console.log('编辑页面')
      wx.setNavigationBarTitle({
        title: '修改任务'
      })
      this.setData({
        submitText: '修改'
      })
      var haveId = 0
      for (let i in allTasks) {
        if (allTasks[i].id == options.id){
          // 先得到任务开始/结束时间
          var allTaskStart = new Date(allTasks[i].startAt)
          var allTaskEnd = new Date(allTasks[i].endAt)

          // 转换时间
          this.data.taskData.startData = `${allTaskStart.getFullYear()}-${(allTaskStart.getMonth() + 1) < 10 ? '0' + (allTaskStart.getMonth() + 1) : (allTaskStart.getMonth() + 1)}-${allTaskStart.getDate() < 10 ? '0' + allTaskStart.getDate() : allTaskStart.getDate()}`
          this.data.taskData.endData = `${allTaskEnd.getFullYear()}-${(allTaskEnd.getMonth() + 1) < 10 ? '0' + (allTaskEnd.getMonth() + 1) : (allTaskEnd.getMonth() + 1)}-${allTaskEnd.getDate() < 10 ? '0' + allTaskEnd.getDate() : allTaskEnd.getDate()}`

          this.setData({
            editTasks: { ...allTasks[i] },
            taskData: this.data.taskData,
            edit: 1
          },()=>{
            this.getDays()
          })
          console.log(this.data.taskData)
          haveId = 1       
          break
        }
      }
      if (!haveId) {
        wx.showToast({
          title: '发生错误，该任务不存在',
          icon:'none'
        })
        setTimeout(()=>{
          this.cancel()
        }, 1000)
      }
      return false
    }

    var startData = new Date();
    this.data.taskData.startData = `${startData.getFullYear()}-${(startData.getMonth() + 1) < 10 ? ('0' + (startData.getMonth() + 1)) : (startData.getMonth() + 1)}-${(startData.getDate()) < 10 ? ('0' + (startData.getDate())) : (startData.getDate())}`;
    this.data.taskData.endData = `${startData.getFullYear()}-${(startData.getMonth() + 1) < 10 ? ('0' + (startData.getMonth() + 1)) : (startData.getMonth() + 1)}-${(startData.getDate()) < 10 ? ('0' + (startData.getDate())) : (startData.getDate())}`;
    this.setData({
      taskData: this.data.taskData
    },()=>{
      this.getDays();      
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
   * 修改时间
   */
  bindDateChange(e){
    this.data.changeTime = 1
    this.data.taskData[e.currentTarget.dataset.indata] = e.detail.value
  
    this.setData({
      taskData: this.data.taskData
    },()=>{
      this.getDays();
    })

  },

  // 计算持续时间
  getDays(){
    var sArr = this.data.taskData.startData.split("-");
    var eArr = this.data.taskData.endData.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var days = (eRDate - sRDate) / (24 * 60 * 60 * 1000)+1; 
    this.setData({
      days: days      
    })
  },

  /**
   * 添加任务
   */
  formSubmit(e){
    console.log(e)
    if (e.detail.value.content==''){
      wx.showToast({
        title: '任务内容不能为空哦',
        icon:"none"
      })
      return false;
    }
    if (this.data.days<=0){
      wx.showToast({
        title: '请检查时间设置',
        icon: "none"
      })
      return false;
    }

    var sArr = this.data.taskData.startData.split("-");
    var eArr = this.data.taskData.endData.split("-");
    var sRDate = new Date(sArr[0], sArr[1] - 1, sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1] - 1, eArr[2]);
    console.log(sRDate.getTime());
    console.log(eRDate.getTime());

    var allTasks = wx.getStorageSync('allTasks')

    // 如果是在编辑状态
    if (this.data.edit) {
      this.data.editTasks.startAt = sRDate.getTime()
      this.data.editTasks.endAt = eRDate.getTime()
      this.data.editTasks.content = e.detail.value.content
      for (let i in allTasks) {
        if (this.data.editTasks.id == allTasks[i].id){
          allTasks[i] = this.data.editTasks
          break          
        }
      }
      wx.setStorageSync('allTasks', allTasks)

      wx.showToast({
        title: '修改任务成功'
      })

      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1000)

      return false
    }

    var nowDate = new Date();
    var newTask = {
      id: nowDate.getTime(),
      content: e.detail.value.content,
      success:[],
      startAt: sRDate.getTime(),
      endAt: eRDate.getTime(),
      otherOpations:{}
    }
    if (allTasks != '') {
      allTasks.push(newTask)
      // Do something with return value
      wx.setStorageSync('allTasks', allTasks)
    }else{
      allTasks = []
      allTasks.push(newTask)
      wx.setStorageSync('allTasks', allTasks)
    }

    wx.showToast({
      title: '创建任务成功'
    })

    setTimeout(()=>{
      wx.navigateBack({
        delta: 1,
      })
    },1000)

  },

  /**
   * 取消
   */
  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  }
})