const latest = {
  version: 'v0.2.7',
  information: '去掉了花里胡哨的启动页；现在右下角的设置按钮可以移动了；现在可以在设置里找到客服了'
}

const history = [
  {
    versionId: 'v0.2.1',
    authorSaid: '阿修罗肝地狱',
    content: '添加时间；时间排序；显示当前时间；显示小时钟；优化样式；鲜花动效；能够转发【自律表】；【主题颜色】能够更改。',
    feedback: 'wyd1n910@gmail.com',
    author: 'D1N910',
    thanks: '灰者；Kajweb',
    open: 'https://github.com/D1N910/Self-discipline'
  },
  {
    versionId: 'v0.2.0',
    authorSaid: '写轮眼之术。。。',
    content: '首页页面样式/整体样式大改',
    feedback: 'wyd1n910@gmail.com',
    author: 'D1N910',
    thanks: 'bilibili app客户端 追番时间表的设计者',
    open: 'https://github.com/D1N910/Self-discipline'
  },
  {
    versionId: 'v0.1.4',
    authorSaid: '大朋友也可以用啦，要好好爱小朋友哦',
    content: '新增［设置］－［自律方案］',
    feedback: 'wyd1n910@gmail.com',
    author: 'D1N910',
    thanks: '穗，Kingna',
    open: 'https://github.com/D1N910/Self-discipline'
  },
  {
    versionId: 'v0.1.3',
    authorSaid: '可以设置中文、日本語和English的星期名啦；新增欢迎词和版本更新公告。',
    content: '新增设置，可以设置日历语言',
    feedback: 'wyd1n910@gmail.com',
    author: 'D1N910',
    thanks: 'B站：qsdafqr，小小的肉丸one',
    open: 'https://github.com/D1N910/Self-discipline'
  }
]

module.exports = {
  updateInfo: {
    version: latest.version,
    title: `Update to version ${ latest.version }`,
    content: latest.information
  },
  
  history: history
}