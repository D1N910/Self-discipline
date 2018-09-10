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
    rect:[],
    nowTimeInTop:1,
    nowTimeShow: '',
    nowTimeWord: '',
    minTransform: 'transform:rotate(0deg);',
    hourTransform: 'transform:rotate(0deg);'
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
    var thisVision = 'v0.2.14'
    var getVision = wx.getStorageSync('vision')
    if(getVision){
      if (thisVision != getVision){
        wx.showModal({
          title: `版本${thisVision}更新`,
          content: '奖励小红花有了动画效果(｀・ω・´)；现在首页可以点击右上角转发分享［自律表］给你的朋友了╮(￣▽￣)╭ 提醒功能等v0.2.2的时候更新(´；ω；`)',
          showCancel:false,
          confirmColor:'#fc7070'
        })
        wx.setStorageSync('vision', thisVision)        
      }
    }else{
      wx.showModal({
        title:'欢迎自律新人',
        content: '亲爱的自律者，欢迎来到自律表，点击［右下角］的按钮来新建自律项目吧',
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
    },()=>{
      if (this.data.List[e.currentTarget.dataset.listid].thingList[e.currentTarget.dataset.item].success){
        // 鲜花动效
        var flowerShowAnimationData = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease',
        })

        this.flowerShowAnimationData = flowerShowAnimationData

        flowerShowAnimationData.scale(2).rotate(180).step()

        this.setData({
          [`List[${e.currentTarget.dataset.listid}].thingList[${e.currentTarget.dataset.item}].flowerShow`]: flowerShowAnimationData.export()
        })
        setTimeout(function () {
          flowerShowAnimationData.scale(1).rotate(-180).step()
          this.setData({
            [`List[${e.currentTarget.dataset.listid}].thingList[${e.currentTarget.dataset.item}].flowerShow`]: flowerShowAnimationData.export()
          })
          wx.showToast({
            title: '可喜可贺，奖励一朵大红花',
            icon: 'none'
          })
        }.bind(this), 300)
      }
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
  //生成从minNum到maxNum的随机数
  randomNum(minNum, maxNum){
    switch(arguments.length) { 
        case 1:
    return parseInt(Math.random() * minNum + 1, 10);
    break;
    case 2:
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    break;
    default: 
                return 0;
    break;
    } 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var nowTimeWord = ['自律带来自信', '三更灯火五更鸡，正是读书时', '大海源于山溪', '不登高山，不知天之高', '不临深溪，不知地之厚', '君子博学而日参省乎己', '积土成山，风雨兴焉', '积水成渊，蛟龙生焉', '积善成德，而神明自得', '不积跬步，无以至千里', '不积小流，无以成江海', '驽马十驾，功在不舍', '锲而不舍，金石可镂', '时间，就像海棉里的水', '读书应自己思索，自己做主。', '凡事以理想为因，实行为果。', '有趣， 源于对生活的热爱', '我给你一个拥抱','在坚持中走向富有和平和']
    this.setData({
      nowTimeWord:nowTimeWord[this.randomNum(0, nowTimeWord.length - 1)]
    })
    var nowDate = new Date()
    // var testDate = new Date()
    // var nowDate = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate() + 4);
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
          // 鲜花动效
          newtask.flowerShow = {}
          if (allTasks[i].otherOpations.doneTime) {
            newtask.allDay = allTasks[i].otherOpations.doneTime.allDay
            if (!newtask.allDay){
              let setGetDate = new Date('2017/01/01')
              let thisStarDate = new Date(setGetDate.getTime() + allTasks[i].otherOpations.doneTime.startTime)
              newtask.startTimeAt = `${thisStarDate.getHours() < 10 ? '0' + thisStarDate.getHours() : thisStarDate.getHours()}:${thisStarDate.getMinutes() < 10 ? '0' + thisStarDate.getMinutes() : thisStarDate.getMinutes()}`

              // 当前时长
              let timeDifference = (allTasks[i].otherOpations.doneTime.endTime - allTasks[i].otherOpations.doneTime.startTime) / 1000 / 60 / 60
              if (parseInt(timeDifference)!=0){
                newtask.needDoneTime = `${parseInt(timeDifference)}小时${(parseFloat(timeDifference - parseInt(timeDifference)) * 60).toFixed()}分钟`
              }else{
                newtask.needDoneTime = `${(parseFloat(timeDifference - parseInt(timeDifference)) * 60).toFixed()}分钟`
              }
            }
          } else {
            newtask.allDay = 1
          }
          if (!newtask.allDay){
            List[j].thingList.unshift(newtask)
          }else{
            List[j].thingList.push(newtask)       
          }
        }

      }
    }

    // 当前时间
    let nowYMD = new Date(`${nowDate.getFullYear()}/${(nowDate.getMonth() + 1 < 10) ? ('0' + (nowDate.getMonth() + 1)) : nowDate.getMonth() + 1}/${nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()}`)
    let NowTime = nowDate.getTime() - nowYMD.getTime()
    this.data.nowTimeShow = `${nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours()}:${nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes()}`
    this.data.nowTimeInTop = 1

    // 时钟时针旋转角度
    this.data.hourTransform = `transform:rotate(${(360 * nowDate.getHours() / 12) + (30*nowDate.getMinutes() / 60)}deg);`
    // 时钟分针旋转角度
    this.data.minTransform = `transform:rotate(${360 * nowDate.getMinutes() / 60}deg);`

    // 根据时间排序
    for (let i in List){
      let allDayList = []
      let setDateList = []
      let sorSetDateList = []
      for(let j in List[i].thingList ){
        if (List[i].thingList[j].allDay){
          allDayList.push(List[i].thingList[j])
        }else{
          setDateList.push(List[i].thingList[j])
        }
      }
      sorSetDateList = setDateList.sort(function (a, b) { return a.otherOpations.doneTime.startTime - b.otherOpations.doneTime.startTime; })
      for (let j = sorSetDateList.length-1; j>=0;j--){
        if (sorSetDateList[j].otherOpations.doneTime.startTime < NowTime){
          sorSetDateList[j].nearlyTime = 1
          this.data.nowTimeInTop = 0
          break          
        }
      }
      List[i].thingList = [...sorSetDateList, ...allDayList]      
    }
    console.log(List)
    var that = this
    this.setData({
      List: List,
      nowTimeInTop: this.data.nowTimeInTop,
      nowTimeShow: this.data.nowTimeShow,
      minTransform: this.data.minTransform,
      hourTransform: this.data.hourTransform
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
    this.setData({
      showCurrent: event.detail.current
    },()=>{
      this.setData({
        scrollLeft: this.data.windowWidth / 2 + (event.detail.current - 6) * (this.data.rect[0].width) - this.data.rect[0].width/2
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `${this.data.nowTimeWord}`,
      path: `/pages/index/index`,
      imageUrl: '../../static/share.jpg',
      success(e) {
        console.log('转发成功')
      }
    }
  }
})