const pages = {
  aboutSelfdis: ''
}
//其实用JSON文件也可以这样写，但是使用js写json数据节省了处理JSON文件的过程，我觉得可以这样做。
module.exports = {
  //非页面使用的提示文字都放在这里，我没用用['app.js']这种极端变态的结构，我觉得只要能看的懂就好了，你也可以为了严谨修改为['app.js']这种明确页面名称的，这样也可以直接通过一些变量获取需要的信息，其实成本是降低了的。
  tips: {
    app_js: [{
      title: 'チップズ',
      contents: 'あなたのWeChatログインする携帯電話が変えられように検出しました。今、クラウドサービスに前の自律テーブルを更新しました。このミニプログラムをも一度開けてください。',
      confirmText: '了解'
    }]
  },
}