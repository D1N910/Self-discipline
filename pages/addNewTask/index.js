// pages/addNewTask/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskData:{
      startData: '',
      endData: ''
    },
    days:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var nowDate = new Date();
    var newTask = {
      id: nowDate.getTime(),
      content: e.detail.value.content,
      success:[],
      startAt: sRDate.getTime(),
      endAt: eRDate.getTime(),
      otherOpations:{}
    }
    var allTasks = wx.getStorageSync('allTasks')
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