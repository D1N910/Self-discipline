var app = getApp()
const pageContent = require(`../../i18n/${app.lang}/pages/help.js`);

Page({
  data: {
    i18n: pageContent.wxml
  },
  onShow: function () {
    app.lib.toUpdateTheme(this, app.titles.help, app.globalData.themeColor);
  },
})