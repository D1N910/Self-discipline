const app = getApp()

Page({
  onShow: function () {
    app.lib.toUpdateTheme(this, app.titles.startupPage, app.globalData.themeColor);
  },
})