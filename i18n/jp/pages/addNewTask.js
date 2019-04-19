module.exports = {
  wxml:{
    //原文是选怎自律项目，可是这里没有选择内容，还是填写更适合些
    selectSelfDisciplineItem: 'テーブルに記入すづ',
    selfDisciplineItem:{
      name: {
        text: '名前:',
        placeholder: '覚えやすい名前を付けてください'
      },
      note: {
        text: '注釈',
        placeholder: '注釈を入力してください'
      },
    },

    duration: {
      label: '存続',
      count: '日数',
      first: '初日',
      last: '最後の日'
    },

    period: {
      label: '期間',
      wholeday: '一日中',
      start: '開始日',
      end: '終了日',
      text: '時間を選べでください'
    }
  },

  //在data中出现的文本操作
  data: {
    submitText: editMode => { return editMode? '編集' : '作り'},
  },

  
  ////showToast提示
  haveNoId: {
    title: '*エラー*: この自律記録がありません!'
  },
  haveNoTime: {
    title: '*エラー*: 存続が無効です。'
  },
  haveNoDays: {
    title: '*エラー*: 期間設定が無効です。'
  },
  modified: {
    title: '編集しました!'
  },
  created: {
    title: '作りました!'
  },
  deleted: {
    title: '削除しました!'
  },

  //删除确认提示文本是可以复用的，应该放到wordList的confirmDelete中
}