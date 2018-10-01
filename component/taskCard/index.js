// component/taskCard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    themeColor:{
      type: String,
      value: '#ff7199'
    },
    taskListsItem:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ifShowControl: 0,
    startMoveX: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
        confirmText: '确定',
        confirmColor: '#000',
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
            _this.triggerEvent('Refresh')
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
    },
    handleTouchstart(e){
      this.data.startMoveX = e.changedTouches[0].pageX
    },
    handleTouchend(e){
      let margin = e.changedTouches[0].pageX - this.data.startMoveX
      if (margin<0){
        if (margin < -30){
          if (this.data.ifShowControl==0){
            this.setData({
              ifShowControl: 1
            })
          }else{
            this.setData({
              ifShowControl: 0
            })
          }
        }else{
          this.setData({
            ifShowControl: 0
          })
        }
      }else{
        this.setData({
          ifShowControl: 0
        })
      }
    }
  }
})
