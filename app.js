// 获取i18n文件内容，这里可以根据wx.settings获得当前语言环境，直接选择语言，不在范畴内的语言都默认用英语/中文。
// 或者指定一个默认使用的语言，然后在设置里面去修改语言环境（强烈不推荐）
// 这里我直接就默认用中文了，我懒……

// 支持的语言，这里需要与i18n/weekNames.js中的数组位置一致
const supportedLanguages = ['zh','jp','en'];
// 系统语言
let osLang;
let weekType = wx.getStorageSync('weekType');

wx.getSystemInfo({
  success: res => {
    if(supportedLanguages.indexOf(res.language) > -1){
      osLang = res.language;
    }else{
      //如果不在支持列表就显示中文
      osLang = 'zh';
    }
  },
})

//如果是从来没有使用过的用户，默认按本土语言表示星期，如果之后用户修改过了，自然也就不会走这个逻辑了
if (!weekType) {
  weekType = supportedLanguages.indexOf(osLang);
  wx.setStorageSync('weekType', weekType);
}

const base = require(`/i18n/${osLang}/index.js`);

//app.js
App({
  lang: osLang,
  lib: require('/lib/index.js'),
  titles: require(`/i18n/${osLang}/titles.js`),

  onLaunch(){
    this.toUpdate()
    // 拿到服务器原存取信息
    if (!wx.getStorageSync('allTasks')){
      // 存储信息
      wx.cloud.init({
        //env: 'koor-o-343ef5'
      })
      wx.cloud.callFunction({
        name: 'getDocTasks',
        success: function (res) {
          if(res.result.data.length>=1){
            wx.setStorageSync('allTasks', res.result.data[0].allTasks)
            wx.showModal({
              //其实单起名字也可以这里是把所有tips都通过数组保存——一个也是数组=_,=|||
              title: base.tips.app_js[0].title,
              content: base.tips.app_js[0].content,
              showCancel: false,
              confirmText: base.tips.app_js[0].confirmText
            })
          }
        },
        //水=_,=|||
        fail: console.error
      })
    }else{
      
    // 存储信息
      wx.cloud.init({
        //env: 'koor-o-343ef5'
      })
      wx.cloud.callFunction({
        name: 'getAllTasks',
        data: {
          allTasks: wx.getStorageSync('allTasks')
        }
      })
    }
  },
  /**
   * 更新主题颜色
   */
  toUpdate(){
    var themeColor = wx.getStorageSync('themeColorSet')
    if(!themeColor){
      wx.setStorageSync('themeColorSet', '#ff7199')
      wx.setStorageSync('themeColor', 0)
      this.globalData.themeColor = '#ff7199'
    }else{
      this.globalData.themeColor = themeColor
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.globalData.themeColor,
    })
  },

  globalData: {
    themeColor: '#ff7199'
  },
})