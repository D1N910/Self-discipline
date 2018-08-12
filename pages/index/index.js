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
    switch (nowDate.getDay()){
      case 0:
        nowDate = '日';
        break;
      case 1:
        nowDate = '一';
        break;
      case 2:
        nowDate = '二';
        break;
      case 3:
        nowDate = '三';
        break;
      case 4:
        nowDate = '四';
        break;
      case 5:
        nowDate = '五';
        break;
      case 6:
        nowDate = '六';
        break;
    }
    
    this.setData({
      nowDate: nowDate
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
    console.log(e.currentTarget.dataset.nowdate)
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