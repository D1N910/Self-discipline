// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:'',
    List:[
      {
        listId: 0,
        time:'8.6',   
        weekName:'一',
        thingList:[
          {
            id:0,
            success:0,
            content:'准备听力准备听力考试准备听力考试准备听力考试考试'
          }      
        ]
      },
      {
        listId: 1,
        time: '8.7',                                           
        weekName: '二',
        thingList: [
          {
            id: 0,
            success: 0,
            content: '准备听力准备听力考试准备听力考试准备听力考试考试'
          }   
        ]
      },
      {
        listId: 2,
        time: '8.8',                
        weekName: '三',
        thingList: [
          {
            id: 0,
            success: 0,
            content: '准备听力准备听力考试准备听力考试准备听力考试考试'
          }   
        ]
      },
      {
        listId: 3,
        time: '8.9',                        
        weekName: '四',
        thingList: [
          {
            id: 0,
            success: 0,
            content: '准备听力准备听力考试准备听力考试准备听力考试考试'
          }   
        ]
      },
      {
        listId: 4,
        time: '8.10',                                
        weekName: '五',
        thingList: [
          {
            id: 0,
            success: 0,
            content: '准备听力准备听力考试准备听力考试准备听力考试考试'
          } 
        ]
      },
      {
        listId:5,
        time: '8.11',           
        weekName: '六',
        thingList: [
          {
            id: 0,
            success: 1,
            content: '准备听力准备听力考试准备听力考试准备听力考试考试'
          },
          {
            id: 1,
            success: 1,
            content: '吃早餐'
          }
        ]
      },
      {
        listId: 6,   
        time: '8.12',                                             
        weekName: '日',
        thingList: [
          {
            id: 0,
            success: 0,
            content: '准备听力准备听力考试准备听力考试准备听力考试考试'
          }   
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('ddd');
    var nowDate = new Date();
    var weekArray=['日','一','二','三','四','五','六'];
    this.setData({
      nowDate: weekArray[nowDate.getDay()]
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
    wx.showLoading({
      title: '请等待日历加载'
    })
    console.log(wx.getStorageSync('allTasks'))

    var nowDate = new Date();

    console.log(this.is_leap(nowDate.getFullYear()));
    
    var m_days = new Array(31, 28 + this.is_leap(nowDate.getFullYear()), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);

    console.log('getMonth');
    console.log(m_days[nowDate.getMonth()]);
    console.log('getDate');
    console.log(nowDate.getDate());
    console.log('getDay');    
    console.log(nowDate.getDay());
    var weekArray = ['日', '一', '二', '三', '四', '五', '六'];
    console.log(weekArray[nowDate.getDay()]);

    var List = []
    var j = 0;
    for (let i in weekArray){

      List[j]={}

      console.log('***'+weekArray[i]+'***')

      var thisDay = nowDate.getDate() - (nowDate.getDay() - i);

      console.log(thisDay)

      List[j].listId = nowDate.getTime();

      List[j].time = `${nowDate.getMonth()+1}.${nowDate.getDate()}`;
      List[j].weekName = weekArray[i];
      List[j].thingList = [];
      j++;

    }
    console.log(List);
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