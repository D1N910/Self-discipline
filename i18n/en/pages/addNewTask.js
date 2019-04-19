module.exports = {
  wxml:{
    //原文是选怎自律项目，可是这里没有选择内容，还是填写更适合些
    selectSelfDisciplineItem: 'Fill in the table',
    selfDisciplineItem:{
      name: {
        text: 'Task Name:',
        placeholder: 'Self-discipline brings self-confidence'
      },
      note: {
        text: 'Notes',
        placeholder: 'Let\'s try to finishe it!'
      },
    },

    duration: {
      label: 'Duration',
      count: 'Number of Days',
      first: 'First Date',
      last: 'Last Date'
    },

    period: {
      label: 'Period',
      wholeday: 'All Day Task',
      start: 'Start Time',
      end: 'End Time',
      text: 'Pick a time'
    }
  },

  //在data中出现的文本操作
  data: {
    submitText: editMode => { return editMode? 'Modify' : 'Add'},

  },

  
  ////showToast提示
  haveNoId: {
    title: '*ERROR*: Task not exists!'
  },
  haveNoTime: {
    title: '*ERROR*: Please recheck your period form.'
  },
  haveNoDays: {
    title: '*ERROR*: Please recheck your duration form.'
  },
  modified: {
    title: 'Done!'
  },
  created: {
    title: 'Done!'
  },
  deleted: {
    title: 'Done!'
  },

  //删除确认提示文本是可以复用的，应该放到wordList的confirmDelete中
}