const pages = {
  aboutSelfdis: ''
}
//其实用JSON文件也可以这样写，但是使用js写json数据节省了处理JSON文件的过程，我觉得可以这样做。
module.exports = {
  //非页面使用的提示文字都放在这里，我没用用['app.js']这种极端变态的结构，我觉得只要能看的懂就好了，你也可以为了严谨修改为['app.js']这种明确页面名称的，这样也可以直接通过一些变量获取需要的信息，其实成本是降低了的。
  tips: {
    app_js: [{
      title: 'Run Tips',
      contents: 'Hey Honey, you seem to have changed your login mobile device. Now we could transfer your self-discipline tasks from cloud server. This process will be safe and private. All you need to do is just reopen this mini program again.',
      confirmText: 'Got it!'
    }]
  },
}