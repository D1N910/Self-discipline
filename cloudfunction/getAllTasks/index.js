// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let ifhave = await db.collection('allTasksList').where({
    openId: event.userInfo.openId
  }).get()
  if (ifhave.data.length==0){
    try {
      return await db.collection('allTasksList').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          dupDateue: new Date(),
          openId: event.userInfo.openId,
          allTasks: event.allTasks
        }
      })
    } catch (e) {
      console.error(e)
    }
  }else{
    return await db.collection('allTasksList').doc(ifhave.data[0]._id).update({
      allTasks: event.allTasks
    })
  }
}