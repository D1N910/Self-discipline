var app = getApp()

// pages/addNewTask/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array:[],
    taskData: {
      startData: '',
      endData: ''
    },
    days: '',
    editTasks:{},
    edit: 0,
    changeTime: 0,
    submitText: '添加项目',
    remarks:'',
    startTime: '',
    endTime: '',
    ifAllDay: true,
    themeColor: ''
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
    var program = wx.getStorageSync('program')
    var taskContentArray
    switch (program)
    {
      case 0:
        taskContentArray = ['按时起床', '自己洗漱', '自己吃饭', '开心上学', '专心做事', '自己睡觉', '文明礼貌', '讲卫生', '关心别人', '热爱劳动', '积极勇敢']
        break;
      case 1:
        taskContentArray = ['按时起床', '自己洗碗', '开心上班', '专心上班', '积极勇敢', '细嚼慢咽', '文明礼貌', '讲卫生', '关心别人', '关爱孩子', '不打骂孩子','讲故事','亲吻爱人','零点前睡觉']
        break;
        default:
        taskContentArray = ['按时起床', '自己洗漱', '自己吃饭', '开心上学', '专心做事', '自己睡觉', '文明礼貌', '讲卫生', '关心别人', '热爱劳动', '积极勇敢']
        wx.setStorageSync('program', 0)
        break;
    }
    this.setData({
      array: taskContentArray
    })
    // 如果是编辑页面
    if(options.id){
      var allTasks = wx.getStorageSync('allTasks')
      console.log('编辑页面')
      wx.setNavigationBarTitle({
        title: '修改项目'
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

          if (allTasks[i].otherOpations.doneTime) {
            if (!allTasks[i].otherOpations.doneTime.allDay){
              let setGetDate = new Date('2017/01/01')
              let thisStarDate = new Date(setGetDate.getTime() + allTasks[i].otherOpations.doneTime.startTime)
              this.data.startTime = `${thisStarDate.getHours() < 10 ? '0' + thisStarDate.getHours() : thisStarDate.getHours()}:${thisStarDate.getMinutes() < 10 ? '0' + thisStarDate.getMinutes() : thisStarDate.getMinutes()}`
              let thisEndDate = new Date(setGetDate.getTime() + allTasks[i].otherOpations.doneTime.endTime)
              this.data.endTime = `${thisEndDate.getHours() < 10 ? '0' + thisEndDate.getHours() : thisEndDate.getHours()}:${thisEndDate.getMinutes() < 10 ? '0' + thisEndDate.getMinutes() : thisEndDate.getMinutes()}`
              this.setData({
                ifAllDay: false,
                startTime: this.data.startTime,
                endTime: this.data.endTime
              })
            }else{
              this.setData({
                ifAllDay: true
              })
            }
          }else{
            this.setData({
              ifAllDay: true
            })
          }

          for(let t in this.data.array){
            if (this.data.array[t] == allTasks[i].content){
              this.setData({
                index:t
              })
              break
            }
          }
          if (!allTasks[i].otherOpations.remarks){
            allTasks[i].otherOpations.remarks = ''
          }
          this.setData({
            editTasks: { ...allTasks[i] },
            taskData: this.data.taskData,
            remarks: allTasks[i].otherOpations.remarks,
            edit: 1
          },()=>{
            this.getDays()
          })
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
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
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
   * 添加任务/添加项目
   */
  formSubmit(e){
    var doneTime = {}
    if (!this.data.ifAllDay){
      console.log(this.data.startTime)
      console.log(this.data.endTime)
      let useDate = new Date()
      let cocularTimeDate = new Date('2017/01/01')
      let startTimeDate = new Date(`2017/01/01 ${this.data.startTime}`)
      let endTimeDate = new Date(`2017/01/01 ${this.data.endTime}`)

      if (endTimeDate.getTime() - startTimeDate.getTime() < 0) {
        wx.showToast({
          title: '错误：请检查执行时间段设置',
          icon: "none"
        })
        return false
      }
      doneTime.allDay = 0      
      doneTime.startTime = startTimeDate.getTime() - cocularTimeDate.getTime()
      doneTime.endTime = endTimeDate.getTime() - cocularTimeDate.getTime()

    } else {
      doneTime.allDay = 1 
    }

    if (this.data.days<=0){
      wx.showToast({
        title: '错误：请检查持续天数设置',
        icon: "none"
      })
      return false;
    }

    var sArr = this.data.taskData.startData.split("-");
    var eArr = this.data.taskData.endData.split("-");
    var sRDate = new Date(sArr[0], sArr[1] - 1, sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1] - 1, eArr[2]);

    var allTasks = wx.getStorageSync('allTasks')

    // 如果是在编辑状态
    if (this.data.edit) {
      this.data.editTasks.startAt = sRDate.getTime()
      this.data.editTasks.endAt = eRDate.getTime()
      this.data.editTasks.content = this.data.array[this.data.index]
      this.data.editTasks.otherOpations.remarks = this.data.remarks
      this.data.editTasks.otherOpations.doneTime = doneTime
      for (let i in allTasks) {
        if (this.data.editTasks.id == allTasks[i].id){
          allTasks[i] = this.data.editTasks
          break          
        }
      }
      wx.setStorageSync('allTasks', allTasks)

      wx.showToast({
        title: '修改项目成功'
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
      content: this.data.array[this.data.index],
      success:[],
      startAt: sRDate.getTime(),
      endAt: eRDate.getTime(),
      otherOpations:{}
    }
    newTask.otherOpations.remarks = this.data.remarks
    newTask.otherOpations.doneTime = doneTime    
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
  },

  /**
   * 修改备注 
   */
  changeRemarks(e){
    this.data.remarks = e.detail.value
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
      confirmText:'确定',
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
          _this.cancel()
          wx.showToast({
            title: '删除啦',
            icon: 'none'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 是否全天
   */
  switch2ChangeAllDay(e){
    this.setData({
      ifAllDay: e.detail.value
    })
  },
  /**
   * 修改具体时间段时间
   */
  bindTimeChange: function (e) {
    this.setData({
      [e.target.dataset.timevalue]: e.detail.value
    })
  }
})