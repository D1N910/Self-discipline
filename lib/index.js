/*
  常用函数
 */

/**
 * 更新主题和标题内容
 * @param that 目标页的this
 * @param title 目标页的标题
 */
function toUpdateTheme(that, title, themeColor){
  that.setData({
    themeColor: themeColor
  });

  wx.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: that.data.themeColor,
  });

  wx.setNavigationBarTitle({
    title: title,
  });
}

module.exports = {
  toUpdateTheme: toUpdateTheme
}

