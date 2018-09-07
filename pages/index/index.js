// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:'',
    List:[],
    showCurrent:0,
    thisdata:0,
    current:1,
    scrollLeft:0,
    windowWidth: 0,
    rect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.data.windowWidth = res.windowWidth
      }
    })
    var thisVision = 'v0.2.11'
    var getVision = wx.getStorageSync('vision')
    if(getVision){
      if (thisVision != getVision){
        wx.showModal({
          title: '版本更新',
          content: `版本${thisVision}，v0.2.1迭代内容，修复了一个bug，曾导致首页显示过多自律项目时候不能滑动`,
          showCancel:false,
          confirmColor:'#fc7070'
        })
        wx.setStorageSync('vision', thisVision)        
      }
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
      current: e.currentTarget.dataset.nowindex
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

    // 生成初始化的，以当前时间为中央时间的表
  
    var arr4 = weekArray.slice(0, nowDate.getDay());
    var arr3 = weekArray.slice(nowDate.getDay(), 7);
    var arr2 = weekArray.slice(0, nowDate.getDay());
    var arr1 = weekArray.slice(nowDate.getDay() + 1, 7);
    
    var listArray = [...arr1, ...arr2, ...arr3, ...arr4]
    // 遍历获得初始化的自律表
    for (let i in listArray){

      List[j]={}

      var thisDay = nowDate.getDate() - arr1.length - (nowDate.getDay() - i);

      var lastMonthDay = m_days[nowDate.getMonth() - 1 < 0 ? 11 : nowDate.getMonth() - 1];
      var nextMonthDay = m_days[nowDate.getMonth() + 1 > 11 ? 0 : nowDate.getMonth() + 1];
      var nowMonthDay = m_days[nowDate.getMonth()];

      var ListMonth = nowDate.getMonth() + 1
      var ListYear = nowDate.getFullYear()

      if (thisDay<1){
        thisDay = lastMonthDay + thisDay
        ListMonth = ListMonth - 1 < 0 ? 12 : ListMonth - 1
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
        // 设置当前日期
        this.setData({
          showCurrent: j,
          thisdata: j,
          current: j,
        })     
      }
      List[j].weekName = weekArray[listDate.getDay()]
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
          newtask.otherOpations = allTasks[i].otherOpations
          newtask.success = thisAllTasksSuccess
          if (allTasks[i].otherOpations.doneTime) {
            newtask.allDay = allTasks[i].otherOpations.doneTime.allDay
            if (!newtask.allDay){
              let setGetDate = new Date('2017/01/01')
              let thisStarDate = new Date(setGetDate.getTime() + allTasks[i].otherOpations.doneTime.startTime)
              newtask.startTimeAt = `${thisStarDate.getHours() < 10 ? '0' + thisStarDate.getHours() : thisStarDate.getHours()}:${thisStarDate.getMinutes() < 10 ? '0' + thisStarDate.getMinutes() : thisStarDate.getMinutes()}`
            }
          } else {
            newtask.allDay = 1
          }
          if (!newtask.allDay){
            List[j].thingList.unshift(newtask)
          }else{
            List[j].thingList.push(newtask)
          }
          // var allDayList = []
          // var setDateList = []
          // var sorSetDateList = []
          // for (let w in List[j].thingList){
          //   if (!List[j].thingList[w].allDay){
          //     var allDayList = List[j].thingList.slice(0,w)    
          //     setDateList = List[j].thingList.slice(w)
          //     sorSetDateList = setDateList.sort(function (a, b) { return a.otherOpations.doneTime.startTime - b.otherOpations.doneTime.startTime; })
          //     break
          //   }
          // } 
          // console.log('***List[j].thingList****')
          // console.log(List[j].thingList)
          // console.log([...allDayList, ...sorSetDateList])
          // List[j].thingList = [...allDayList, ...sorSetDateList]
        }
      }
    }

    var that = this
    this.setData({
      List: List
    },()=>{
      wx.createSelectorQuery().selectAll('.weekItem').boundingClientRect(function (rects) {
        rects.forEach(function (rect) {
          that.data.rect[that.data.rect.length] = rect
          if (that.data.rect.length==8){
            that.setData({
              scrollLeft: that.data.windowWidth/2 - that.data.rect[0].width/2
            })
          }
        })
      }).exec()
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
  
  },
  /**
   * 滑块改变星期
   */
  changeWeekShow(event){
    console.log('ddd')
    console.log(this.data)
    this.setData({
      showCurrent: event.detail.current
    },()=>{
      this.setData({
        scrollLeft: this.data.windowWidth / 2 + (event.detail.current - 6) * (this.data.rect[0].width) - this.data.rect[0].width/2
      })
    })
  }
})