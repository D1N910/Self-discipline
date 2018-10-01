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
    await db.collection('allTasksList').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          dupDateue: new Date(),
          openId: event.userInfo.openId,
          allTasks: event.allTasks
        }
      })
      return {
        status:1400,
        msg:'成功添加新记录'
      }
  }else{
    await db.collection('allTasksList').where({
      openId: event.userInfo.openId
    }).update({
      data:{
        allTasks: event.allTasks
      }
    })
    return {
      status: 200,
      msg:'更新成功'
    }
  }
}