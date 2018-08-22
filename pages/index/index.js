// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:'',
    List:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisVision = 'v0.1.3'
    var getVision = wx.getStorageSync('vision')
    if(getVision){
      if (thisVision != getVision){
        wx.showModal({
          title: '更新公告',
          content: `根据自律者的意见进行更新升级，现在版本为 ${thisVision}，请自律者在“关于自律表”查看更新内容`,
          showCancel:false,
          confirmColor:'#fc7070'
        })
      }
      wx.setStorageSync('vision', thisVision)
    }else{
      wx.showModal({
        title:'欢迎自律新人',
        content: '亲爱的自律者，欢迎来到自律表，点击右下角君之来新建自律项目吧',
        showCancel: false,
        confirmColor: '#fc7070'
      })
      wx.setStorageSync('vision', thisVision)      
    }
  },

  // 长按走向导航页面
  navigaToEdit(e){
    wx.navigateTo({
      url: `/pages/addNewTask/index?id=${this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].id}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 改变选中状态 
   */
  changeSuccess(e){
    console.log(this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].success);

    if (!this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].success){

      wx.showToast({
        title: '可喜可贺，奖励一朵大红花',
        icon:'none'
      })

    }else{
      
      wx.showToast({
        title: '事情未完，暂时收回大红花',
        icon: 'none'
      })

    }

    this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].success = !this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].success;

    var allTasks = wx.getStorageSync('allTasks')
    if (this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].success){
      for(let i in allTasks){
        if (allTasks[i].id == this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].id){
          var haveSame = 0
          for (let j in allTasks[i].success){
            if (allTasks[i].success[j] == this.data.List[e.currentTarget.dataset.listid].listId){
              haveSame = 1
              break
            }
          }
          if (!haveSame){
            allTasks[i].success.push(this.data.List[e.currentTarget.dataset.listid].listId)
          }
          break          
        }
      }
    }else{
      for (let i in allTasks) {
        if (allTasks[i].id == this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].id) {
          var haveSame = 0
          for (let j in allTasks[i].success) {
            if (allTasks[i].success[j] == this.data.List[e.currentTarget.dataset.listid].listId) {
              haveSame = j
              break
            }
          }
          allTasks[i].success.splice(haveSame,1)
          break
        }
      }
    }
    wx.setStorageSync('allTasks', allTasks)
    this.setData({
      List: this.data.List
    })
  },

  /**
   * 改变显示星期
   */
  changNowDate(e){
    this.setData({
      nowDate:e.currentTarget.dataset.nowdate
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
    var nowDate = new Date();
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
      nowDate: weekArray[nowDate.getDay()]
    })

    wx.showLoading({
      title: '请等待日历加载'
    })
    
    // 月份的天数
    var m_days = new Array(31, 28 + this.is_leap(nowDate.getFullYear()), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);

    var List = []
    var j = 0;

    // 遍历获得初始化的自律表
    for (let i in weekArray){

      List[j]={}

      var thisDay = nowDate.getDate() - (nowDate.getDay() - i);

      var lastMonthDay = m_days[nowDate.getMonth() - 1 < 0 ? 11 : nowDate.getMonth() - 1];
      var nextMonthDay = m_days[nowDate.getMonth() + 1 > 11 ? 0 : nowDate.getMonth() + 1];
      var nowMonthDay = m_days[nowDate.getMonth()];

      var ListMonth = nowDate.getMonth() + 1
      var ListYear = nowDate.getFullYear()

      if (thisDay<1){
        thisDay = lastMonthDay + thisDay
        ListMonth = L1istMonth - 1 < 0 ? 12 : ListMonth - 1
        if (ListMonth > nowDate.getMonth() + 1){
          ListYear = ListYear - 1;
        }  
      } else if (thisDay > nowMonthDay){
        thisDay = thisDay - nowMonthDay
        ListMonth = ListMonth + 1 > 12 ? 1 : ListMonth + 1   
        if (ListMonth < nowDate.getMonth() + 1) {
          ListYear = ListYear + 1;
        }  
      }

      var listDate = new Date(ListYear, ListMonth - 1, thisDay)
      List[j].listId = listDate.getTime();
      List[j].time = `${ListMonth}.${thisDay}`;
      if (thisDay == nowDate.getDate()){
        List[j].time = `${ListMonth}.${thisDay}今`;        
      }
      List[j].weekName = weekArray[i];
      List[j].thingList = [];
      j++;

    }
    var allTasks = wx.getStorageSync('allTasks')
    
    // 遍历所有任务
    for (let i in allTasks) {
      
      // 遍历所有自律表
      for (let j in List){

        // 如果自律表 j 的时间在 任务 i 的时间范围内 则添加
        if (List[j].listId >= allTasks[i].startAt && List[j].listId <= allTasks[i].endAt){

          let thisAllTasksSuccess = [...allTasks[i].success]
          // 遍历任务i所有完成的时间
          for (let f in thisAllTasksSuccess){

            if (thisAllTasksSuccess[f] == List[j].listId){
              thisAllTasksSuccess = 1            
              break
            }
          }
          if (thisAllTasksSuccess != 1){
            thisAllTasksSuccess = 0
          }
          var newtask = {}
          newtask.id = allTasks[i].id
          newtask.content = allTasks[i].content
          newtask.success = thisAllTasksSuccess
          List[j].thingList.push(newtask)
        }
      }
    }

    this.setData({
      List: List
    })
    wx.hideLoading();
  },

  /**
   * 判断是不是闰年
   */
  is_leap(year) {
    var res;
    return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
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
  
  }
})