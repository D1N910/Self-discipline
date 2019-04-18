//其实用JSON文件也可以这样写，但是使用js写json数据节省了处理JSON文件的过程，我觉得可以这样做。
module.exports = {
  wxml: {
    cheerupTip: '加油完成自律任务吧！'
  },
  //座右铭这个，你都起了云函数了，其实也可以存在数据集里嘛，这里我给你做在本地了作为一个示例
  motto: function () {
    let mottos = [
      '凡事以理想为因，实行为果',
      '只要功夫深，铁杵磨成针',
      '自律带来自信',
      '三更灯火五更鸡，正是读书时',
      '大海源于山溪',
      '不登高山，不知天之高',
      '不临深溪，不知地之厚',
      '君子博学而日参省乎己',
      '积土成山，风雨兴焉',
      '积水成渊，蛟龙生焉',
      '积善成德，而神明自得',
      '不积跬步，无以至千里',
      '不积小流，无以成江海',
      '驽马十驾，功在不舍',
      '锲而不舍，金石可镂',
      '时间，就像海棉里的水',
      '读书应自己思索，自己做主。',
      '凡事以理想为因，实行为果。',
      '有趣， 源于对生活的热爱',
      '我给你一个拥抱',
      '在坚持中走向富有和平和'
    ]
    let pos = parseInt((Math.random() * (mottos.length - 1)).toFixed(0).toString());
    return mottos[pos];
  },

  //所有和showToast和showModal的都放在这里，可以起别名，也可以排号，增加减少项目也比较简单
  tips:{
    //欢迎新人
    welcome: {
      title: '欢迎自律新人',
      content: '亲爱的自律者，欢迎来到自律表，点击［右下角］的按钮来新建自律项目吧（点击右下角-设置-【主题颜色】即可更改颜色）'
    },
    //可喜可贺
    medetashi: {
      title: '可喜可贺，奖励一朵大红花'
    }
  }
}