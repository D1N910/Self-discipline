module.exports = {
  wxml:{
    //原文是选怎自律项目，可是这里没有选择内容，还是填写更适合些
    selectSelfDisciplineItem: '填写自律项目',
    selfDisciplineItem:{
      name: {
        text: '项目名称',
        placeholder: '自律带来自信'
      },
      note: {
        text: '备注',
        placeholder: '加油完成自律任务吧'
      },
    },

    duration: {
      label: '坚持天数',
      count: '坚持自律',
      first: '第一天',
      last: '最后一天'
    },

    period: {
      label: '执行时间段',
      wholeday: '全天',
      start: '开始时间',
      end: '结束时间',
      text: '选择时间'
    }
  },

  //在data中出现的文本操作
  data: {
    submitText: editMode => { return editMode? '修改' : '添加'},

  },

  
  ////showToast提示
  haveNoId: {
    title: '发生错误，该任务不存在'
  },
  haveNoTime: {
    title: '错误：请检查执行时间段设置'
  },
  haveNoDays: {
    title: '错误：请检查持续天数设置'
  },
  modified: {
    title: '修改项目成功'
  },
  created: {
    title: '创建任务成功'
  },
  deleted: {
    title: '删除啦'
  },

  //删除确认提示文本是可以复用的，应该放到wordList的confirmDelete中
}