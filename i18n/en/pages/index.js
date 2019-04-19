//其实用JSON文件也可以这样写，但是使用js写json数据节省了处理JSON文件的过程，我觉得可以这样做。
module.exports = {
  wxml: {
    cheerupTip: 'Let\'s finish our task!'
  },
  //座右铭这个，你都起了云函数了，其实也可以存在数据集里嘛，这里我给你做在本地了作为一个示例
  motto: function () {
    let mottos = [
      'Everything is based on ideals and results from practice.',
      'As long as the work is deep, the pestle is ground into a needle.',
      'Self-discipline brings self-confidence',
      'It\'s time to read.',
      'The sea comes from mountain streams',
      'Do not climb mountains, do not know the height of the sky',
      'Not facing the deep stream, not knowing the depth of the land',
      'A gentleman is erudite and considerate',
      'Mountains are built up with soil, and storms are thriving.',
      'Waterlogged into a deep ocean, Jiaolong Shengyan',
      'Accumulate good and become virtuous, while the God is complacent.',
      'No step, no mile.',
      'No stream, no river or sea',
      'Ten horses and ten horses, with constant merit',
      'Persistence and perseverance can be carved with gold and stone',
      'Time, like water in sponge',
      'Reading should be self-thinking and self-determination.',
      'Everything is based on ideals and results from practice.',
      'Interesting, from the love of life',
      'Let me give you a hug.',
      'Towards peace and prosperity in persistence'
    ]
    let pos = parseInt((Math.random() * (mottos.length - 1)).toFixed(0).toString());
    return mottos[pos];
  },

  //所有和showToast和showModal的都放在这里，可以起别名，也可以排号，增加减少项目也比较简单
  tips:{
    //欢迎新人
    welcome: {
      title: 'Welcome!',
      content: 'Dear self-discipliner,\r\nWelcome to Self-discipline Project! Click btton in the lower right to create new self-discipline task!'
    },
    //可喜可贺
    medetashi: {
      title: 'Congratulation!'
    }
  }
}