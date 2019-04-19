const app = getApp()
const lib = require('../../lib/index.js');
const version = require(`../../i18n/${app.lang}/version.js`);
const pageContent = require(`../../i18n/${app.lang}/pages/aboutSelfdis.js`);

Page({
  data: {
    i18n: pageContent.wxml,
    update: version.history
  },

  onShow: function () {
    //只需要在一个生命周期里面应用颜色主题就好了，onLoad并不会看起来更“无缝”只是心理安慰,真机实测一下就明白了
    lib.toUpdateTheme(this, app.titles.aboutSelfdis, app.globalData.themeColor);
  },
})